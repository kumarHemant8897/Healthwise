import { Heart, Users, Shield, Award, CheckCircle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Martinez",
      role: "Chief Medical Officer",
      credentials: "MD, PhD Neurology",
      experience: "15+ years in neurological medicine"
    },
    {
      name: "Dr. Michael Chen",
      role: "Medical Advisor - Endocrinology",
      credentials: "MD, Endocrinologist",
      experience: "12+ years in diabetes and metabolic disorders"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Mental Health Advisor",
      credentials: "MD, Psychiatrist",
      experience: "10+ years in mental health and wellness"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Medical Accuracy",
      description: "All content is reviewed by qualified healthcare professionals to ensure accuracy and reliability."
    },
    {
      icon: <Users className="w-8 h-8 text-health-secondary" />,
      title: "Patient-Centered",
      description: "We prioritize patient needs and provide information that empowers informed health decisions."
    },
    {
      icon: <Heart className="w-8 h-8 text-trust-accent" />,
      title: "Compassionate Care",
      description: "We understand health concerns are personal and provide supportive, empathetic guidance."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-success-health" />,
      title: "Evidence-Based",
      description: "Our recommendations are based on current medical research and established clinical guidelines."
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Heart className="w-10 h-10 text-primary mr-3" />
            About HealthWise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're dedicated to providing trustworthy, medically-reviewed health information 
            to help you make informed decisions about your health and well-being.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="health-card mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-primary mr-3" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              To democratize access to reliable health information by providing medically-reviewed, 
              easy-to-understand content that empowers individuals to take control of their health journey. 
              We bridge the gap between complex medical knowledge and everyday health decisions.
            </p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="health-card">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Medical Review Process */}
        <Card className="health-card mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Award className="w-8 h-8 text-primary mr-3" />
              Our Medical Review Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Every piece of health content on HealthWise undergoes a rigorous review process 
              to ensure accuracy, completeness, and adherence to current medical standards.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  1
                </div>
                <h4 className="font-semibold mb-2">Research & Writing</h4>
                <p className="text-sm text-muted-foreground">
                  Content is researched and written by medical professionals or experienced health writers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  2
                </div>
                <h4 className="font-semibold mb-2">Medical Review</h4>
                <p className="text-sm text-muted-foreground">
                  All content is reviewed by board-certified physicians in relevant specialties.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  3
                </div>
                <h4 className="font-semibold mb-2">Regular Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Content is regularly reviewed and updated to reflect current medical knowledge.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Advisory Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Medical Advisory Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="health-card">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-2">{member.credentials}</Badge>
                  <p className="text-sm text-muted-foreground">
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust & Safety */}
        <Card className="health-card mb-12 bg-secondary">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Shield className="w-8 h-8 text-primary mr-3" />
              Trust & Safety Commitment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Privacy Protection</h4>
                <p className="text-sm text-muted-foreground">
                  We're committed to protecting your privacy and personal health information 
                  in accordance with GDPR and other applicable privacy laws.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Transparent Sources</h4>
                <p className="text-sm text-muted-foreground">
                  We clearly cite medical sources and ensure all claims are backed by 
                  peer-reviewed research and established medical guidelines.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">No Conflicts of Interest</h4>
                <p className="text-sm text-muted-foreground">
                  Our medical content is independent and free from commercial influence 
                  that could compromise objectivity or patient safety.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Accessibility</h4>
                <p className="text-sm text-muted-foreground">
                  We design our platform to be accessible to all users, following 
                  WCAG 2.2 guidelines for digital accessibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              We value your feedback and are always working to improve our content and services. 
              If you have questions, suggestions, or concerns, please don't hesitate to reach out.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">General Inquiries</h4>
                <p className="text-sm text-muted-foreground mb-1">Email: info@healthwise.com</p>
                <p className="text-sm text-muted-foreground">Response time: 24-48 hours</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Medical Content Questions</h4>
                <p className="text-sm text-muted-foreground mb-1">Email: medical@healthwise.com</p>
                <p className="text-sm text-muted-foreground">Reviewed by our medical team</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Privacy & Data Protection</h4>
                <p className="text-sm text-muted-foreground mb-1">Email: privacy@healthwise.com</p>
                <p className="text-sm text-muted-foreground">GDPR compliance officer</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Technical Support</h4>
                <p className="text-sm text-muted-foreground mb-1">Email: support@healthwise.com</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;