import { useState, useEffect } from "react";
import { MessageCircle, X, Send, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isEmergency?: boolean;
  relatedLinks?: Array<{
    title: string;
    url: string;
  }>;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your personalized health assistant powered by Google Gemini AI. I can help answer questions about symptoms, health conditions, and provide wellness guidance. Please remember, I provide informational guidance only and am not a substitute for professional medical advice.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Listen for search queries from the home page
  useEffect(() => {
    const handleOpenChatbot = (event: CustomEvent) => {
      if (event.detail?.query) {
        setIsOpen(true);
        setInputValue(event.detail.query);
        // Auto-send the query after a brief delay
        setTimeout(async () => {
          if (event.detail.query.trim()) {
            const userMessage: Message = {
              id: Date.now().toString(),
              content: event.detail.query,
              sender: "user",
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, userMessage]);
            setIsTyping(true);
            
            try {
              const isEmergency = detectEmergency(event.detail.query);
              const botContent = await generateResponse(event.detail.query);
              
              const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: botContent,
                sender: "bot",
                timestamp: new Date(),
                isEmergency,
                relatedLinks: !isEmergency ? [
                  { title: "Health Library", url: "/health-library" },
                  { title: "Report Analysis", url: "/report-analysis" }
                ] : undefined,
              };
              setMessages(prev => [...prev, botResponse]);
            } catch (error) {
              console.error('Auto-search error:', error);
            } finally {
              setIsTyping(false);
              setInputValue("");
            }
          }
        }, 500);
      }
    };

    window.addEventListener('openChatbot', handleOpenChatbot as EventListener);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot as EventListener);
  }, []);

  const emergencyKeywords = ["chest pain", "heart attack", "stroke", "severe bleeding", "can't breathe", "suicide", "emergency"];

  const detectEmergency = (message: string): boolean => {
    return emergencyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for emergency keywords first
    if (detectEmergency(userMessage)) {
      return "🚨 EMERGENCY ALERT: Your symptoms may require immediate medical attention. Please call emergency services (911) or go to the nearest emergency room immediately. Do not delay seeking professional medical help.";
    }

    try {
      // Call Gemini AI for personalized response
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: userMessage,
          chatHistory: messages.slice(-5) // Send last 5 messages for context
        }
      });

      if (error) throw error;

      if (data.error) {
        // If API key is not configured, use fallback response
        return data.fallbackResponse || data.error;
      }

      return data.response;
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback to basic responses if Gemini fails
      if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
        return "Fever can be a sign of infection or illness. Monitor your temperature and stay hydrated. If fever is high (over 103°F/39.4°C) or persists for more than 3 days, consult a healthcare provider.";
      }
      
      if (lowerMessage.includes('headache')) {
        return "Headaches can have various causes including stress, dehydration, or tension. Try resting in a quiet, dark room and staying hydrated. If headaches are severe, frequent, or accompanied by other symptoms, consult a healthcare provider.";
      }
      
      if (lowerMessage.includes('cough')) {
        return "Coughs can be caused by various factors including allergies, infections, or irritants. Stay hydrated and consider using a humidifier. If the cough persists for more than 2 weeks or is accompanied by blood, seek medical attention.";
      }
      
      if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
        return "Pain management depends on the type and location. Rest, ice/heat therapy, and over-the-counter pain relievers may help. If pain is severe, persistent, or interfering with daily activities, consult a healthcare provider.";
      }
      
      if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
        return "Stress and anxiety are common concerns. Try relaxation techniques like deep breathing, meditation, or regular exercise. If symptoms persist or interfere with daily life, consider speaking with a mental health professional.";
      }
      
      return "I'm here to provide general health information and guidance. For specific medical concerns, I recommend consulting with a qualified healthcare professional. (Note: Enhanced AI features require API configuration)";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Generate bot response
    try {
      const isEmergency = detectEmergency(currentInput);
      const botContent = await generateResponse(currentInput);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botContent,
        sender: "bot",
        timestamp: new Date(),
        isEmergency,
        relatedLinks: !isEmergency ? [
          { title: "Health Library", url: "/health-library" },
          { title: "Report Analysis", url: "/report-analysis" }
        ] : undefined,
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Message handling error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again or consult with a healthcare professional for immediate concerns.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    "I have a headache",
    "Check my symptoms", 
    "Analyze my report",
    "Health tips"
  ];

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-all duration-200 hero-gradient"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="health-card h-[500px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">AI Health Assistant</span>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.isEmergency
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.relatedLinks && (
                    <div className="mt-2 space-y-1">
                      {message.relatedLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="flex items-center text-xs text-accent hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="px-4 py-2 border-t">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                variant="outline"
                size="sm"
                className="text-xs h-6 px-2"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about symptoms or health..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm" disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="medical-disclaimer text-center mt-2">
            Not a substitute for professional medical advice
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChatbotWidget;