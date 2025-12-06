import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Search, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  content: string;
  isLoading: boolean;
  relatedTopics: string[];
  images: string[];
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [result, setResult] = useState<SearchResult>({
    content: "",
    isLoading: true,
    relatedTopics: [],
    images: []
  });

  useEffect(() => {
    if (query) {
      searchWithGemini(query);
    }
  }, [query]);

  const searchWithGemini = async (searchQuery: string) => {
    setResult(prev => ({ ...prev, isLoading: true }));
    
    try {
      console.log('Searching for:', searchQuery);
      
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: `Give me concise health information about: ${searchQuery}. Keep it brief with bullet points.`,
          chatHistory: []
        }
      });

      console.log('Gemini response:', data);

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      // Extract related topics from the response
      const responseText = data.response || data.fallbackResponse || "Unable to get detailed information at this time.";
      const relatedTopics = extractRelatedTopics(responseText);
      
      setResult({
        content: responseText,
        isLoading: false,
        relatedTopics,
        images: await generateHealthImages(searchQuery)
      });
    } catch (error) {
      console.error('Search error:', error);
      setResult({
        content: "I apologize, but I'm having trouble processing your search right now. This might be due to a temporary service issue. Please try again in a few moments or consult with a healthcare professional for immediate concerns.",
        isLoading: false,
        relatedTopics: [],
        images: []
      });
    }
  };

  const extractRelatedTopics = (content: string): string[] => {
    // Extract potential related topics from the content
    const topics = [];
    if (content.toLowerCase().includes('symptom')) topics.push('Symptoms');
    if (content.toLowerCase().includes('treatment')) topics.push('Treatments');
    if (content.toLowerCase().includes('prevention')) topics.push('Prevention');
    if (content.toLowerCase().includes('diet')) topics.push('Diet & Nutrition');
    if (content.toLowerCase().includes('exercise')) topics.push('Exercise');
    if (content.toLowerCase().includes('medication')) topics.push('Medications');
    return topics;
  };

  const generateHealthImages = async (query: string): Promise<string[]> => {
    const images = [];
    
    try {
      // Generate 2-3 AI medical diagrams/illustrations
      const imagePrompts = [
        `Medical illustration of ${query} anatomy and affected areas`,
        `Educational diagram showing ${query} symptoms and progression`,
        `Infographic about ${query} prevention and treatment options`
      ];

      // Generate images in parallel
      const imagePromises = imagePrompts.slice(0, 2).map(async (prompt) => {
        try {
          const { data, error } = await supabase.functions.invoke('generate-health-image', {
            body: { prompt }
          });

          if (error) throw error;
          return data?.imageUrl;
        } catch (err) {
          console.error('Image generation failed:', err);
          return null;
        }
      });

      const generatedImages = await Promise.all(imagePromises);
      images.push(...generatedImages.filter(Boolean));

    } catch (error) {
      console.error('Error generating health images:', error);
    }

    // Add fallback stock images if AI generation fails
    if (images.length === 0) {
      images.push(
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format'
      );
    }
    
    return images.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Search className="w-4 h-4" />
              <span className="text-sm">Search Results for:</span>
              <Badge variant="secondary" className="font-medium">
                {query}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {result.isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Searching for detailed health information...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Main Result */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span>Detailed Health Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {result.content}
                </div>
              </CardContent>
            </Card>

            {/* Related Images */}
            {result.images.length > 0 && (
              <Card className="health-card">
                <CardHeader>
                  <CardTitle>Related Health Visuals & Information</CardTitle>
                  <p className="text-sm text-muted-foreground">Visual references to help understand {query}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {result.images.map((image, index) => (
                      <div key={index} className="relative overflow-hidden rounded-xl border shadow-sm">
                        <img 
                          src={image} 
                          alt={`Health information and visual guide related to ${query}`}
                          className="w-full h-56 object-cover transition-all duration-300 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <p className="text-white text-sm font-medium">
                            {query} - Reference Image {index + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Topics */}
            {result.relatedTopics.length > 0 && (
              <Card className="health-card">
                <CardHeader>
                  <CardTitle>Related Health Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.relatedTopics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Explore More</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link to="/symptom-checker">
                      <div className="text-center">
                        <div className="text-sm font-medium">Symptom Checker</div>
                        <div className="text-xs text-muted-foreground mt-1">Check your symptoms</div>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link to="/health-library">
                      <div className="text-center">
                        <div className="text-sm font-medium">Health Library</div>
                        <div className="text-xs text-muted-foreground mt-1">Browse articles</div>
                      </div>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link to="/report-analysis">
                      <div className="text-center">
                        <div className="text-sm font-medium">Report Analysis</div>
                        <div className="text-xs text-muted-foreground mt-1">Analyze medical reports</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Medical Disclaimer */}
            <Card className="border-warning-health bg-warning-health/5">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <ExternalLink className="w-5 h-5 text-warning-health mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult with healthcare professionals for proper diagnosis and treatment.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;