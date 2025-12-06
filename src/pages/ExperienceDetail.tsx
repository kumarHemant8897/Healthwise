import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Calendar, User, MessageCircle, Share2, ArrowLeft, Facebook, Twitter } from "lucide-react";
import { format } from "date-fns";

interface Experience {
  id: string;
  title: string;
  summary: string;
  content: string;
  author_name: string;
  category: string;
  likes_count: number;
  slug: string;
  created_at: string;
  image_url?: string;
}

interface Comment {
  id: string;
  user_name: string;
  comment_text: string;
  created_at: string;
}

const ExperienceDetail = () => {
  const { slug } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [commentForm, setCommentForm] = useState({
    user_name: "",
    comment_text: ""
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchExperience();
      fetchComments();
    }
  }, [slug]);

  const fetchExperience = async () => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("slug", slug)
        .eq("status", "approved")
        .single();

      if (error) throw error;
      setExperience(data);
    } catch (error) {
      console.error("Error fetching experience:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments") 
        .select("*")
        .eq("experience_id", (await supabase.from("experiences").select("id").eq("slug", slug).single()).data?.id)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    if (!experience) return;

    try {
      const newLikesCount = liked ? experience.likes_count - 1 : experience.likes_count + 1;
      
      const { error } = await supabase
        .from("experiences")
        .update({ likes_count: newLikesCount })
        .eq("id", experience.id);

      if (error) throw error;

      setExperience(prev => prev ? { ...prev, likes_count: newLikesCount } : null);
      setLiked(!liked);
      
      toast({
        title: liked ? "Like removed" : "Thank you for liking!",
        description: liked ? "Your like has been removed." : "Your support means a lot to the author."
      });
    } catch (error) {
      console.error("Error updating likes:", error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience || !commentForm.user_name.trim() || !commentForm.comment_text.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your name and comment.",
        variant: "destructive"
      });
      return;
    }

    setSubmittingComment(true);

    try {
      const { error } = await supabase
        .from("comments")
        .insert([{
          experience_id: experience.id,
          user_name: commentForm.user_name,
          comment_text: commentForm.comment_text,
          status: "pending"
        }]);

      if (error) throw error;

      toast({
        title: "Comment Submitted!",
        description: "Your comment will be reviewed before being published."
      });

      setCommentForm({ user_name: "", comment_text: "" });
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const shareUrl = window.location.href;
  const shareText = experience ? `Check out this inspiring health story: ${experience.title}` : "";

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
        <p className="text-muted-foreground mb-6">The experience you're looking for doesn't exist or hasn't been approved yet.</p>
        <Link to="/experiences">
          <Button>Browse All Experiences</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Back Button */}
      <Link to="/experiences" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Experiences
      </Link>

      {/* Main Content */}
      <article className="mb-8">
        <header className="mb-6">
          <Badge variant="secondary" className="mb-4">
            {experience.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-4 leading-tight">{experience.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {experience.author_name}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(experience.created_at), "MMMM d, yyyy")}
            </div>
          </div>

          {experience.image_url && (
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <img 
                src={experience.image_url} 
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4 mb-6">
            {experience.summary}
          </p>
        </header>

        <div className="prose prose-lg max-w-none mb-8">
          {experience.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 py-6 border-t border-b">
          <Button 
            onClick={handleLike}
            variant={liked ? "default" : "outline"}
            className="gap-2"
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            {experience.likes_count} {experience.likes_count === 1 ? 'Like' : 'Likes'}
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Share:</span>
            <Button size="sm" variant="outline" onClick={shareOnFacebook} className="gap-1">
              <Facebook className="h-3 w-3" />
              Facebook
            </Button>
            <Button size="sm" variant="outline" onClick={shareOnTwitter} className="gap-1">
              <Twitter className="h-3 w-3" />
              Twitter
            </Button>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Leave a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user_name">Your Name *</Label>
                <Input
                  id="user_name"
                  value={commentForm.user_name}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, user_name: e.target.value }))}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comment_text">Your Comment *</Label>
                <Textarea
                  id="comment_text"
                  value={commentForm.comment_text}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, comment_text: e.target.value }))}
                  placeholder="Share your thoughts, encouragement, or similar experiences..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <Button type="submit" disabled={submittingComment}>
                {submittingComment ? "Submitting..." : "Submit Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{comment.user_name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(comment.created_at), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                  <p className="leading-relaxed">{comment.comment_text}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ExperienceDetail;