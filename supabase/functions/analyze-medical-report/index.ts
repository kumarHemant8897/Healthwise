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
    const { reportText, reportType = 'general' } = await req.json();
    const geminiApiKey = Deno.env.get('GOOGLE_GEMINI_API_KEY');

    if (!geminiApiKey) {
      console.log('Google Gemini API key not configured');
      return new Response(JSON.stringify({ 
        error: 'Google Gemini API key not configured. Please add your API key in the Supabase dashboard.',
        analysis: {
          summary: 'Medical report analysis requires API configuration.',
          keyFindings: ['API key needed for analysis'],
          recommendations: ['Please configure Google Gemini API key'],
          medications: [],
          followUp: 'Configure API key to enable report analysis'
        }
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `You are a friendly medical AI assistant helping someone understand their medical report. Your goal is to explain everything in simple, everyday language that anyone can understand.

Medical Report:
${reportText}

Please analyze this report and provide:

**SUMMARY** (2-3 sentences in simple language)
- What is this report about? What was tested or examined?
- What is the main takeaway in plain English?

**KEY FINDINGS** (list 3-5 important points)
- Explain any important results
- If something is abnormal, explain what it means in simple terms
- Use analogies or comparisons to everyday things when helpful
- Avoid medical jargon, or explain it if you must use it

**MEDICATIONS** (if mentioned)
- List any medications mentioned
- Briefly explain what each medication is for in simple terms

**RECOMMENDATIONS** (practical advice)
- What should the person do next?
- Any lifestyle changes that could help?
- What questions should they ask their doctor?

**FOLLOW-UP**
- When should they see their doctor again?
- What tests or checkups might be needed?
- Any warning signs to watch for?

Remember: 
- Use everyday language, not medical terminology
- If you must use a medical term, explain it like you are talking to a friend
- Be reassuring but honest
- Encourage them to discuss results with their doctor
- Do not diagnose, just help them understand what the report says`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      throw new Error(data.error?.message || 'Failed to analyze medical report');
    }

    const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis could not be completed.';

    // Parse the analysis into structured format
    const parseAnalysis = (text: string) => {
      const sections = {
        summary: '',
        keyFindings: [] as string[],
        medications: [] as string[],
        recommendations: [] as string[],
        followUp: ''
      };

      const lines = text.split('\n');
      let currentSection = '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.includes('**SUMMARY**')) {
          currentSection = 'summary';
        } else if (trimmed.includes('**KEY FINDINGS**')) {
          currentSection = 'keyFindings';
        } else if (trimmed.includes('**MEDICATIONS**')) {
          currentSection = 'medications';
        } else if (trimmed.includes('**RECOMMENDATIONS**')) {
          currentSection = 'recommendations';
        } else if (trimmed.includes('**FOLLOW-UP**')) {
          currentSection = 'followUp';
        } else if (trimmed && !trimmed.startsWith('**')) {
          if (currentSection === 'summary' || currentSection === 'followUp') {
            sections[currentSection] += trimmed + ' ';
          } else if (currentSection === 'keyFindings' || currentSection === 'medications' || currentSection === 'recommendations') {
            if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
              sections[currentSection].push(trimmed.substring(1).trim());
            } else {
              sections[currentSection].push(trimmed);
            }
          }
        }
      }

      return {
        summary: sections.summary.trim(),
        keyFindings: sections.keyFindings,
        medications: sections.medications,
        recommendations: sections.recommendations,
        followUp: sections.followUp.trim()
      };
    };

    const analysis = parseAnalysis(analysisText);

    return new Response(JSON.stringify({ 
      analysis,
      rawAnalysis: analysisText 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-medical-report function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      analysis: {
        summary: 'Analysis failed due to an error.',
        keyFindings: ['Error occurred during analysis'],
        recommendations: ['Please try again or consult healthcare professionals'],
        medications: [],
        followUp: 'Retry analysis or seek professional medical advice'
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});