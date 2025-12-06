import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar, User, MessageCircle, FileText, Shield } from "lucide-react";
import { format } from "date-fns";

interface Experience {
  id: string;
  title: string;
  summary: string;
  content: string;
  author_name: string;
  category: string;
  status: string;
  created_at: string;
  image_url?: string;
}

interface Comment {
  id: string;
  experience_id: string;
  user_name: string;
  comment_text: string;
  status: string;
  created_at: string;
  experiences?: {
    title: string;
  };
}

const AdminPanel = () => {
  const [pendingExperiences, setPendingExperiences] = useState<Experience[]>([]);
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingContent();
  }, []);

  const fetchPendingContent = async () => {
    try {
      // Fetch pending experiences
      const { data: experiences, error: expError } = await supabase
        .from("experiences")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (expError) throw expError;

      // Fetch pending comments with experience titles
      const { data: comments, error: commError } = await supabase
        .from("comments")
        .select(`
          *,
          experiences!inner(title)
        `)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (commError) throw commError;

      setPendingExperiences(experiences || []);
      setPendingComments(comments || []);
    } catch (error) {
      console.error("Error fetching pending content:", error);
      toast({
        title: "Error",
        description: "Failed to load pending content.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceAction = async (experienceId: string, action: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from("experiences")
        .update({ status: action })
        .eq("id", experienceId);

      if (error) throw error;

      setPendingExperiences(prev => prev.filter(exp => exp.id !== experienceId));
      
      toast({
        title: `Experience ${action}`,
        description: `The experience has been ${action}.`
      });
    } catch (error) {
      console.error(`Error ${action} experience:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action.slice(0, -1)} experience.`,
        variant: "destructive"
      });
    }
  };

  const handleCommentAction = async (commentId: string, action: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from("comments")
        .update({ status: action })
        .eq("id", commentId);

      if (error) throw error;

      setPendingComments(prev => prev.filter(comment => comment.id !== commentId));
      
      toast({
        title: `Comment ${action}`,
        description: `The comment has been ${action}.`
      });
    } catch (error) {
      console.error(`Error ${action} comment:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action.slice(0, -1)} comment.`,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Admin Panel</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Review and moderate user-submitted experiences and comments.
        </p>
      </div>

      <Tabs defaultValue="experiences" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="experiences" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Experiences ({pendingExperiences.length})
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Comments ({pendingComments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experiences" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Pending Experiences</h2>
            <p className="text-muted-foreground">
              Review user-submitted health experiences before they go live.
            </p>
          </div>

          {pendingExperiences.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No pending experiences to review.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {pendingExperiences.map((experience) => (
                <Card key={experience.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{experience.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {experience.author_name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(experience.created_at), "MMM d, yyyy")}
                          </div>
                          <Badge variant="secondary">{experience.category}</Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Summary</h4>
                        <p className="text-muted-foreground">{experience.summary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Full Experience</h4>
                        <div className="max-h-48 overflow-y-auto p-4 bg-muted rounded-lg">
                          <p className="whitespace-pre-wrap">{experience.content}</p>
                        </div>
                      </div>

                      {experience.image_url && (
                        <div>
                          <h4 className="font-semibold mb-2">Attached Image</h4>
                          <img 
                            src={experience.image_url} 
                            alt="Experience attachment"
                            className="max-w-md h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={() => handleExperienceAction(experience.id, 'approved')}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleExperienceAction(experience.id, 'rejected')}
                          className="gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="comments" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Pending Comments</h2>
            <p className="text-muted-foreground">
              Review user comments before they appear on experience posts.
            </p>
          </div>

          {pendingComments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No pending comments to review.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingComments.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Comment on: {comment.experiences?.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {comment.user_name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(comment.created_at), "MMM d, yyyy 'at' h:mm a")}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="whitespace-pre-wrap">{comment.comment_text}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleCommentAction(comment.id, 'approved')}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleCommentAction(comment.id, 'rejected')}
                          className="gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;