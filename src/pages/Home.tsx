import { Link, useNavigate } from "react-router-dom";
import { Search, Stethoscope, BookOpen, Heart, Star, Shield, Users, CheckCircle, MessageSquareShare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import aiSymptomCheckerImg from "@/assets/ai-symptom-checker.jpg";
import healthLibraryImg from "@/assets/health-library.jpg";
import reportAnalysisImg from "@/assets/report-analysis.jpg";
import communityExperiencesImg from "@/assets/community-experiences.jpg";
import testimonialSarahImg from "@/assets/testimonial-sarah.jpg";
import testimonialDoctorImg from "@/assets/testimonial-doctor.jpg";
import testimonialMariaImg from "@/assets/testimonial-maria.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear search after navigation
    }
  };

  const features = [
    {
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      title: "AI Symptom Checker",
      description: "Get personalized insights about your symptoms with our medically-reviewed checker.",
      link: "/symptom-checker",
      color: "primary",
      image: aiSymptomCheckerImg
    },
    {
      icon: <BookOpen className="w-8 h-8 text-health-secondary" />,
      title: "Health Library",
      description: "Access thousands of medically-reviewed articles on conditions, treatments, and wellness.",
      link: "/health-library",
      color: "health-secondary",
      image: healthLibraryImg
    },
    {
      icon: <MessageSquareShare className="w-8 h-8 text-purple-600" />,
      title: "Community Experiences",
      description: "Share your health journey and learn from others facing similar challenges.",
      link: "/experiences",
      color: "purple",
      image: communityExperiencesImg
    },
    {
      icon: <Heart className="w-8 h-8 text-trust-accent" />,
      title: "Report Analysis",
      description: "Upload medical reports for AI-powered analysis and insights with medication guidance.",
      link: "/report-analysis",
      color: "trust-accent",
      image: reportAnalysisImg
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "New York",
      text: "HealthWise helped me understand my symptoms and feel more confident about seeking the right care.",
      rating: 5,
      image: testimonialSarahImg
    },
    {
      name: "Dr. James K.",
      title: "Family Physician",
      text: "I recommend HealthWise to my patients for reliable health information between visits.",
      rating: 5,
      image: testimonialDoctorImg
    },
    {
      name: "Maria L.",
      location: "California",
      text: "The self-care guides are incredibly helpful for managing my chronic condition.",
      rating: 5,
      image: testimonialMariaImg
    }
  ];

  const trustIndicators = [
    { icon: <Shield className="w-5 h-5" />, text: "Medically Reviewed Content" },
    { icon: <Users className="w-5 h-5" />, text: "Trusted by 100K+ Users" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "GDPR Compliant" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-emerald-900/70 z-10" />
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-80 animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-70 animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-emerald-300 rounded-full animate-pulse opacity-60 animation-delay-3000"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 container mx-auto max-w-5xl text-center px-4 py-20">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
              <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Welcome
              </span>
              to HealthWise
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
              AI-analyzed health reports and a personalized chatbot to guide your prescriptions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/report-analysis">
                  Analyze My Report
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/chat">
                  Chat with AI Doctor
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-white/70">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  {indicator.icon}
                  <span className="text-sm font-medium">{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Search Health Information
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get instant answers about symptoms, conditions, and self-care tips
          </p>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search symptoms, conditions, and self-care tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg bg-white/95 border-2 border-gray-200 shadow-lg text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-2 h-10 bg-blue-600 hover:bg-blue-700"
                  disabled={!searchQuery.trim()}
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access trusted health information, get personalized insights, and take control of your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="health-card-feature h-full overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Explore Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 subtle-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users and healthcare professionals say about HealthWise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="health-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      {testimonial.title && (
                        <p className="text-sm text-primary font-medium">{testimonial.title}</p>
                      )}
                      {testimonial.location && (
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning-health text-warning-health" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Health Journey Today
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands who trust HealthWise for reliable health information and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button asChild variant="secondary" size="lg" className="flex-1">
              <Link to="/symptom-checker">Check Symptoms</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/health-library">Browse Library</Link>
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-primary-foreground/10 rounded-lg">
            <p className="medical-disclaimer text-primary-foreground/80">
              <strong>Medical Disclaimer:</strong> HealthWise provides information for educational purposes only. Always consult healthcare professionals for medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;