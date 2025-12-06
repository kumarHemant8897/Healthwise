import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Users, Share2 } from "lucide-react";

const categories = [
  "Diabetes",
  "Cancer",
  "Heart Disease",
  "Mental Health",
  "Chronic Pain",
  "Arthritis",
  "Hypertension",
  "Asthma",
  "Depression",
  "Anxiety",
  "Other"
];

const ShareExperience = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    author_name: "",
    category: "",
    image_url: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to share your story publicly.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("experiences")
        .insert([{
          title: formData.title,
          summary: formData.summary,
          content: formData.content,
          author_name: formData.author_name || "Anonymous",
          category: formData.category,
          image_url: formData.image_url || null,
          status: "pending",
          slug: ""
        }]);

      if (error) throw error;

      toast({
        title: "Story Submitted Successfully!",
        description: "Thank you for sharing your experience. It will be reviewed before being published."
      });

      // Reset form
      setFormData({
        title: "",
        summary: "",
        content: "",
        author_name: "",
        category: "",
        image_url: "",
        consent: false
      });

    } catch (error) {
      console.error("Error submitting experience:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your story. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
          Share Your Health Journey
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your story could inspire and help others facing similar health challenges. 
          Share your experience and be part of our supportive community.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Inspire Others</h3>
            <p className="text-sm text-muted-foreground">Your journey can give hope to someone going through similar challenges</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Build Community</h3>
            <p className="text-sm text-muted-foreground">Connect with others and create a supportive healthcare community</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Share2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Share Knowledge</h3>
            <p className="text-sm text-muted-foreground">Help others by sharing tips and insights from your experience</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share Your Experience</CardTitle>
          <CardDescription>
            All submissions are reviewed before being published to ensure quality and appropriateness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title of Your Experience *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., How I Learned to Manage My Diabetes"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Short Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Brief overview of your experience (2-3 sentences)"
                className="min-h-[80px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Full Experience *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share your detailed story, including challenges, solutions, tips, and advice for others..."
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author_name">Your Name (Optional)</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                placeholder="Leave blank to post anonymously"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL (Optional)</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="Link to an image that represents your story"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: !!checked }))}
              />
              <Label htmlFor="consent" className="text-sm">
                I agree that my story can be publicly shared and understand it will be reviewed before publication *
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !formData.consent}
            >
              {isSubmitting ? "Submitting..." : "Submit Your Story"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareExperience;