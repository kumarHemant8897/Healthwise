import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import welcomingDoctor from "@/assets/welcoming-doctor.jpg";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const FormattedAIResponse = ({ content }: { content: string }) => {
  // Format text with proper line breaks, bullet points, and numbered lists
  const formatText = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        const trimmed = line.trim();
        
        // Handle numbered lists (1. 2. 3. etc.)
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <div key={index} className="flex items-start space-x-2 mb-2">
              <span className="font-semibold text-emerald-600 flex-shrink-0">
                {trimmed.match(/^\d+\./)?.[0]}
              </span>
              <span>{trimmed.replace(/^\d+\.\s/, '')}</span>
            </div>
          );
        }
        
        // Handle bullet points (- or • or *)
        if (/^[-•*]\s/.test(trimmed)) {
          return (
            <div key={index} className="flex items-start space-x-2 mb-1 ml-4">
              <span className="text-emerald-600 flex-shrink-0">•</span>
              <span>{trimmed.replace(/^[-•*]\s/, '')}</span>
            </div>
          );
        }
        
        // Handle headers (## or **text**)
        if (trimmed.startsWith('##') || (trimmed.startsWith('**') && trimmed.endsWith('**'))) {
          const headerText = trimmed.replace(/^##\s?/, '').replace(/^\*\*/, '').replace(/\*\*$/, '');
          return (
            <h3 key={index} className="font-semibold text-gray-900 mt-3 mb-2 text-base">
              {headerText}
            </h3>
          );
        }
        
        // Regular paragraphs
        if (trimmed) {
          return (
            <p key={index} className="mb-2">
              {trimmed}
            </p>
          );
        }
        
        return <br key={index} />;
      });
  };

  return <div className="space-y-1">{formatText(content)}</div>;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI Health Assistant. I can help you with health questions, symptoms, and general medical information. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: { message: inputMessage },
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm experiencing technical difficulties. Please try again later or consult with a healthcare professional for immediate concerns.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl h-screen flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center py-8 border-b border-white/20 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center space-x-6 max-w-2xl">
            {/* Doctor Image */}
            <div className="relative group">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-gradient-to-r from-blue-400/30 to-emerald-400/30 shadow-lg group-hover:scale-105 transition-all duration-500">
                <img 
                  src={welcomingDoctor} 
                  alt="AI Doctor Assistant - Professional healthcare support"
                  className="w-full h-full object-cover animate-fade-in hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <Bot className="w-3 h-3 text-white" />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent animate-fade-in">
                AI Health Assistant
              </h1>
              <p className="text-sm text-gray-600 animate-fade-in" style={{ animationDelay: "200ms" }}>
                Your trusted medical information companion
              </p>
              <div className="flex items-center justify-center mt-2 space-x-1 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-600 font-medium">Online & Ready to Help</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.isUser 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                }`}>
                  {message.isUser ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <Card className={`px-4 py-3 max-w-2xl ${
                  message.isUser
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm"
                }`}>
                  <div className={`text-sm leading-relaxed ${message.isUser ? "text-white" : "text-gray-800"}`}>
                    {message.isUser ? (
                      <p>{message.content}</p>
                    ) : (
                      <FormattedAIResponse content={message.content} />
                    )}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.isUser ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </Card>
              </div>
            </div>
          ))}

          {/* Loading Message */}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <Card className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    <p className="text-sm text-gray-600">AI is thinking...</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/20 bg-white/50 backdrop-blur-sm p-4">
          <form onSubmit={sendMessage} className="max-w-3xl mx-auto">
            <div className="relative flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me about your health concerns..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                  className="pr-12 h-12 bg-white/90 border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-sm"
                />
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={!inputMessage.trim() || isLoading}
                className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            
            {/* Disclaimer */}
            <p className="text-xs text-gray-500 mt-2 text-center">
              This AI provides general health information only. Always consult healthcare professionals for medical advice.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;