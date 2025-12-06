import { useState } from "react";
import { Search, BookOpen, Filter, Calendar, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Category images
import medicalConditionsImg from "@/assets/category-medical-conditions.jpg";
import symptomsGuideImg from "@/assets/category-symptoms-guide.jpg";
import selfCareImg from "@/assets/category-self-care.jpg";
import treatmentsImg from "@/assets/category-treatments.jpg";
import preventionImg from "@/assets/category-prevention.jpg";
import mentalHealthImg from "@/assets/category-mental-health.jpg";

// Article images
import migraneImg from "@/assets/article-migraine.jpg";
import diabetesImg from "@/assets/article-diabetes.jpg";
import anxietyImg from "@/assets/article-anxiety.jpg";
import coldImg from "@/assets/article-cold.jpg";
import bloodPressureImg from "@/assets/article-blood-pressure.jpg";
import sleepImg from "@/assets/article-sleep.jpg";
import fluImg from "@/assets/article-flu.jpg";

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  lastReviewed: string;
  reviewer: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  articleCount: number;
  icon: string;
  color: string;
}

const HealthLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Helper function to get category image
  const getCategoryImage = (categoryId: string) => {
    const imageMap: { [key: string]: string } = {
      "conditions": medicalConditionsImg,
      "symptoms": symptomsGuideImg,
      "self-care": selfCareImg,
      "treatments": treatmentsImg,
      "prevention": preventionImg,
      "mental-health": mentalHealthImg
    };
    return imageMap[categoryId];
  };

  // Helper function to get article image
  const getArticleImage = (articleId: string) => {
    const imageMap: { [key: string]: string } = {
      "migraine-comprehensive-guide": migraneImg,
      "diabetes-management": diabetesImg,
      "anxiety-coping-strategies": anxietyImg,
      "common-cold-treatment": coldImg,
      "high-blood-pressure": bloodPressureImg,
      "sleep-hygiene": sleepImg,
      "flu-prevention": fluImg
    };
    return imageMap[articleId];
  };

  const categories: Category[] = [
    {
      id: "conditions",
      name: "Medical Conditions",
      description: "Learn about symptoms, causes, and treatments for various health conditions.",
      articleCount: 245,
      icon: "🏥",
      color: "primary"
    },
    {
      id: "symptoms",
      name: "Symptoms Guide",
      description: "Understand what your symptoms might mean and when to seek help.",
      articleCount: 180,
      icon: "🩺",
      color: "health-secondary"
    },
    {
      id: "self-care",
      name: "Self-Care & Wellness",
      description: "Tips and strategies for maintaining good health and managing conditions.",
      articleCount: 120,
      icon: "💚",
      color: "trust-accent"
    },
    {
      id: "treatments",
      name: "Treatments & Medications",
      description: "Information about medical treatments, procedures, and medications.",
      articleCount: 95,
      icon: "💊",
      color: "warning-health"
    },
    {
      id: "prevention",
      name: "Prevention & Screening",
      description: "Preventive care information and health screening guidelines.",
      articleCount: 75,
      icon: "🛡️",
      color: "success-health"
    },
    {
      id: "mental-health",
      name: "Mental Health",
      description: "Resources for mental health, emotional wellness, and stress management.",
      articleCount: 85,
      icon: "🧠",
      color: "primary"
    }
  ];

  const featuredArticles: Article[] = [
    {
      id: "migraine-comprehensive-guide",
      title: "Migraine: Comprehensive Guide to Symptoms, Causes, and Treatment",
      summary: "Understanding migraine headaches, their triggers, and effective management strategies for better quality of life.",
      category: "conditions",
      lastReviewed: "2024-01-15",
      reviewer: "Dr. Sarah Martinez, Neurologist",
      readTime: "8 min read",
      tags: ["headache", "pain management", "neurological"],
      featured: true
    },
    {
      id: "diabetes-management",
      title: "Type 2 Diabetes: Daily Management and Lifestyle Changes",
      summary: "Complete guide to managing type 2 diabetes through diet, exercise, medication, and monitoring.",
      category: "conditions",
      lastReviewed: "2024-01-20",
      reviewer: "Dr. Michael Chen, Endocrinologist",
      readTime: "12 min read",
      tags: ["diabetes", "blood sugar", "lifestyle"],
      featured: true
    },
    {
      id: "anxiety-coping-strategies",
      title: "Anxiety Disorders: Recognition and Coping Strategies",
      summary: "Learn to identify anxiety symptoms and discover effective techniques for managing anxiety in daily life.",
      category: "mental-health",
      lastReviewed: "2024-01-18",
      reviewer: "Dr. Emily Rodriguez, Psychiatrist",
      readTime: "10 min read",
      tags: ["anxiety", "mental health", "coping strategies"],
      featured: true
    }
  ];

  const recentArticles: Article[] = [
    {
      id: "common-cold-treatment",
      title: "Common Cold: Symptoms, Treatment, and Prevention",
      summary: "Everything you need to know about the common cold, from symptoms to effective home remedies.",
      category: "conditions",
      lastReviewed: "2024-01-22",
      reviewer: "Dr. Jennifer Park, Family Medicine",
      readTime: "6 min read",
      tags: ["cold", "viral infection", "home remedies"]
    },
    {
      id: "high-blood-pressure",
      title: "High Blood Pressure: Understanding and Managing Hypertension",
      summary: "Learn about blood pressure levels, risk factors, and lifestyle changes to manage hypertension.",
      category: "conditions",
      lastReviewed: "2024-01-21",
      reviewer: "Dr. Robert Kim, Cardiologist",
      readTime: "9 min read",
      tags: ["hypertension", "heart health", "cardiovascular"]
    },
    {
      id: "sleep-hygiene",
      title: "Sleep Hygiene: Tips for Better Sleep Quality",
      summary: "Discover evidence-based strategies to improve your sleep quality and establish healthy sleep habits.",
      category: "self-care",
      lastReviewed: "2024-01-19",
      reviewer: "Dr. Lisa Thompson, Sleep Medicine",
      readTime: "7 min read",
      tags: ["sleep", "wellness", "lifestyle"]
    },
    {
      id: "flu-prevention",
      title: "Influenza: Prevention, Symptoms, and When to Seek Care",
      summary: "Comprehensive guide to flu prevention, recognizing symptoms, and knowing when medical care is needed.",
      category: "prevention",
      lastReviewed: "2024-01-17",
      reviewer: "Dr. Ahmad Hassan, Infectious Disease",
      readTime: "8 min read",
      tags: ["flu", "vaccination", "prevention"]
    }
  ];

  const filteredArticles = [...featuredArticles, ...recentArticles].filter(article => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary mr-3" />
            Health Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access thousands of medically-reviewed articles on health conditions, symptoms, treatments, and wellness topics.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="search"
              placeholder="Search articles, conditions, symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-input rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        {selectedCategory === "all" && searchQuery === "" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="health-card-feature cursor-pointer overflow-hidden"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={getCategoryImage(category.id)} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-4xl">{category.icon}</div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{category.articleCount} articles</Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Featured Articles */}
        {selectedCategory === "all" && searchQuery === "" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="health-card-feature h-full overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getArticleImage(article.id)} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {article.summary}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="border-t pt-4 text-xs text-muted-foreground">
                      <div className="flex items-center mb-1">
                        <User className="w-3 h-3 mr-1" />
                        <span>Reviewed by {article.reviewer}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Last updated {new Date(article.lastReviewed).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Article Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery || selectedCategory !== "all" 
                ? `Search Results (${filteredArticles.length} articles)` 
                : "Recent Articles"
              }
            </h2>
            {(searchQuery || selectedCategory !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {filteredArticles.length === 0 ? (
            <Card className="health-card text-center py-12">
              <CardContent>
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse different categories.
                </p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}>
                  Browse All Articles
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="health-card hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {article.featured && (
                            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                          )}
                          <Badge variant="outline">
                            {categories.find(c => c.id === article.category)?.name || article.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          <Link to={`/article/${article.id}`}>
                            {article.title}
                          </Link>
                        </h3>
                        
                        <p className="text-muted-foreground mb-3 leading-relaxed">
                          {article.summary}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <div className="flex items-center mb-1">
                            <User className="w-3 h-3 mr-1" />
                            <span>Reviewed by {article.reviewer}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Last updated {new Date(article.lastReviewed).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end">
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden mb-4">
                          <img 
                            src={getArticleImage(article.id)} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button asChild>
                          <Link to={`/article/${article.id}`}>
                            Read Article
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthLibrary;