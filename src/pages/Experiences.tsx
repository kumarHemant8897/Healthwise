import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Calendar, User, Filter, PlusCircle } from "lucide-react";
import { format } from "date-fns";

interface Experience {
  id: string;
  title: string;
  summary: string;
  author_name: string;
  category: string;
  likes_count: number;
  slug: string;
  created_at: string;
  image_url?: string;
}

const categories = [
  "All Categories",
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

const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const experiencesPerPage = 6;

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All Categories") {
      setFilteredExperiences(experiences);
    } else {
      setFilteredExperiences(experiences.filter(exp => exp.category === selectedCategory));
    }
    setCurrentPage(1);
  }, [selectedCategory, experiences]);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastExperience = currentPage * experiencesPerPage;
  const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage;
  const currentExperiences = filteredExperiences.slice(indexOfFirstExperience, indexOfLastExperience);
  const totalPages = Math.ceil(filteredExperiences.length / experiencesPerPage);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
          Community Experiences
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Real stories from real people. Learn from others' journeys and find inspiration for your own health path.
        </p>
        <Link to="/share-experience">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Share Your Story
          </Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
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
        <div className="text-sm text-muted-foreground flex items-center">
          Showing {filteredExperiences.length} experience{filteredExperiences.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Experiences Grid */}
      {currentExperiences.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No experiences found</h3>
          <p className="text-muted-foreground mb-4">
            {selectedCategory !== "All Categories" 
              ? `No experiences in the ${selectedCategory} category yet.`
              : "No experiences have been shared yet."
            }
          </p>
          <Link to="/share-experience">
            <Button variant="outline">Be the first to share your story</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentExperiences.map((experience) => (
            <Card key={experience.id} className="hover:shadow-lg transition-shadow">
              {experience.image_url && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={experience.image_url} 
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {experience.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-3 w-3" />
                    {experience.likes_count}
                  </div>
                </div>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/experience/${experience.slug}`}>
                    {experience.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {experience.summary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {experience.author_name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(experience.created_at), "MMM d, yyyy")}
                  </div>
                </div>
                <Link to={`/experience/${experience.slug}`}>
                  <Button variant="outline" className="w-full mt-4">
                    Read Full Story
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className="w-10"
            >
              {i + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Experiences;