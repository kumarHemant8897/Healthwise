import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, chatHistory = [] } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      console.log('Lovable AI API key not configured');
      return new Response(JSON.stringify({ 
        error: 'AI service not available. Please try again later.',
        fallbackResponse: 'I\'m a health assistant powered by AI. I can help you with health questions, symptom analysis, and wellness guidance. The service is temporarily unavailable.'
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Format messages for Lovable AI
    const systemPrompt = `You are a helpful health assistant. Provide CONCISE, well-organized health information in a medium-length response (around 300-400 words max).

Structure your response with these short sections:
1. **Overview** - 2-3 sentences explaining the condition
2. **Key Symptoms** - 4-5 main symptoms as bullet points
3. **Common Causes** - 3-4 main causes as bullet points  
4. **Treatment Options** - 4-5 key treatments as bullet points
5. **When to See a Doctor** - 2-3 warning signs
6. **Quick Self-Care Tips** - 3-4 practical tips

Keep each section brief and to the point. Use bullet points, not paragraphs. Avoid lengthy explanations. Be helpful and accurate.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Lovable AI error:', response.status, data);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.',
          fallbackResponse: 'I\'m experiencing high demand right now. Please try your question again in a few moments.'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI service credits exhausted. Please contact support.',
          fallbackResponse: 'The AI service is temporarily unavailable. Please try again later or consult with a healthcare professional.'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(data.error?.message || 'Failed to get response from AI service');
    }

    const generatedText = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      fallbackResponse: 'I apologize, but I\'m having trouble processing your request right now. Please try again later or consult with a healthcare professional for immediate concerns.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});