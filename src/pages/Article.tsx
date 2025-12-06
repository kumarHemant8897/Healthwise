import { useParams, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Article = () => {
  const { id } = useParams();

  // Mock article data - in real app this would come from a database/API
  const getArticleData = (articleId: string) => {
    const articles = {
      "migraine-comprehensive-guide": {
        title: "Migraine: Comprehensive Guide to Symptoms, Causes, and Treatment",
        summary: "Understanding migraine headaches, their triggers, and effective management strategies for better quality of life.",
        category: "Medical Conditions",
        lastReviewed: "2024-01-15",
        reviewer: "Dr. Sarah Martinez, Neurologist",
        reviewerCredentials: "MD, PhD in Neurology, 15+ years experience",
        readTime: "8 min read",
        tags: ["headache", "pain management", "neurological"],
        heroImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        content: {
          overview: "Migraine is a neurological condition that causes severe, recurring headaches along with other symptoms such as nausea, vomiting, and sensitivity to light and sound. It affects approximately 12% of the population and can significantly impact quality of life.",
          symptoms: [
            "Severe, throbbing headache pain, usually on one side of the head",
            "Nausea and vomiting",
            "Sensitivity to light (photophobia) and sound (phonophobia)",
            "Visual disturbances (aura) before headache onset",
            "Fatigue and irritability"
          ],
          causes: [
            "Genetic predisposition - family history increases risk",
            "Hormonal changes, particularly in women",
            "Certain foods and drinks (chocolate, aged cheese, alcohol)",
            "Stress and changes in sleep patterns",
            "Environmental factors (bright lights, strong odors)"
          ],
          treatments: [
            "Acute medications: Triptans, NSAIDs, or specific migraine medications",
            "Preventive medications for frequent migraines",
            "Lifestyle modifications and trigger avoidance",
            "Stress management techniques and regular sleep schedule",
            "Alternative therapies like acupuncture or biofeedback"
          ],
          selfCare: [
            "Keep a headache diary to identify triggers",
            "Maintain regular sleep and meal schedules",
            "Stay hydrated and limit alcohol consumption",
            "Practice relaxation techniques and stress management",
            "Apply cold or warm compresses during attacks",
            "Rest in a quiet, dark room during episodes"
          ]
        }
      },
      "diabetes-management": {
        title: "Type 2 Diabetes: Daily Management and Lifestyle Changes",
        summary: "Complete guide to managing type 2 diabetes through diet, exercise, medication, and monitoring.",
        category: "Medical Conditions",
        lastReviewed: "2024-01-20",
        reviewer: "Dr. Michael Chen, Endocrinologist",
        reviewerCredentials: "MD, Endocrinology Fellowship, 12+ years experience",
        readTime: "12 min read",
        tags: ["diabetes", "blood sugar", "lifestyle"],
        heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
        content: {
          overview: "Type 2 diabetes is a chronic condition that affects how your body processes blood sugar (glucose). With proper management, including diet, exercise, medication, and regular monitoring, people with type 2 diabetes can live healthy, active lives.",
          symptoms: [
            "Increased thirst and frequent urination",
            "Unexplained weight loss or gain",
            "Fatigue and weakness",
            "Blurred vision",
            "Slow-healing cuts and bruises",
            "Frequent infections, especially skin and urinary tract"
          ],
          causes: [
            "Insulin resistance - body cells don't respond properly to insulin",
            "Genetics and family history",
            "Obesity and excess body weight, especially around the waist",
            "Physical inactivity and sedentary lifestyle",
            "Age - risk increases after 45",
            "High blood pressure and abnormal cholesterol levels"
          ],
          treatments: [
            "Metformin and other oral medications to improve insulin sensitivity",
            "Injectable medications including insulin when needed",
            "Blood glucose monitoring and HbA1c testing",
            "Regular medical check-ups and screenings",
            "Diabetes education and support programs",
            "Coordination with healthcare team including nutritionist"
          ],
          selfCare: [
            "Follow a balanced, carbohydrate-controlled diet",
            "Exercise regularly - at least 150 minutes per week",
            "Monitor blood sugar levels as recommended",
            "Take medications as prescribed",
            "Maintain a healthy weight",
            "Quit smoking and limit alcohol consumption",
            "Get regular eye, foot, and dental check-ups"
          ]
        }
      },
      "anxiety-coping-strategies": {
        title: "Anxiety Disorders: Recognition and Coping Strategies",
        summary: "Learn to identify anxiety symptoms and discover effective techniques for managing anxiety in daily life.",
        category: "Mental Health",
        lastReviewed: "2024-01-18",
        reviewer: "Dr. Emily Rodriguez, Psychiatrist",
        reviewerCredentials: "MD, Psychiatry Residency, Licensed Therapist, 10+ years experience",
        readTime: "10 min read",
        tags: ["anxiety", "mental health", "coping strategies"],
        heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        content: {
          overview: "Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. They involve excessive worry, fear, or nervousness that interferes with daily activities. With proper recognition and treatment, anxiety can be effectively managed.",
          symptoms: [
            "Persistent, excessive worry about everyday situations",
            "Restlessness, feeling on edge or easily fatigued",
            "Difficulty concentrating or mind going blank",
            "Irritability and muscle tension",
            "Sleep disturbances - trouble falling or staying asleep",
            "Physical symptoms: rapid heartbeat, sweating, trembling"
          ],
          causes: [
            "Genetic predisposition and family history",
            "Brain chemistry imbalances involving neurotransmitters",
            "Traumatic or stressful life events",
            "Chronic medical conditions or chronic pain",
            "Substance use or withdrawal from drugs/alcohol",
            "Certain personality traits like perfectionism"
          ],
          treatments: [
            "Cognitive Behavioral Therapy (CBT) - most effective psychotherapy",
            "Medications: SSRIs, SNRIs, or benzodiazepines for short-term use",
            "Mindfulness-based stress reduction techniques",
            "Exposure therapy for specific phobias",
            "Group therapy and support groups",
            "Combination therapy for severe cases"
          ],
          selfCare: [
            "Practice deep breathing and progressive muscle relaxation",
            "Exercise regularly to reduce stress hormones",
            "Maintain a consistent sleep schedule",
            "Limit caffeine and alcohol consumption",
            "Challenge negative thoughts and practice positive self-talk",
            "Stay connected with supportive friends and family",
            "Consider meditation or yoga practice"
          ]
        }
      },
      "common-cold-treatment": {
        title: "Common Cold: Symptoms, Treatment, and Prevention",
        summary: "Everything you need to know about the common cold, from symptoms to effective home remedies.",
        category: "Medical Conditions",
        lastReviewed: "2024-01-22",
        reviewer: "Dr. Jennifer Park, Family Medicine",
        reviewerCredentials: "MD, Family Medicine Board Certified, 8+ years experience",
        readTime: "6 min read",
        tags: ["cold", "viral infection", "home remedies"],
        heroImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=400&fit=crop",
        content: {
          overview: "The common cold is a viral infection of the upper respiratory tract. It's one of the most frequent illnesses, with adults experiencing 2-3 colds per year. While uncomfortable, most colds resolve on their own within 7-10 days.",
          symptoms: [
            "Runny or stuffy nose with clear or colored discharge",
            "Sneezing and coughing",
            "Sore or scratchy throat",
            "Low-grade fever (more common in children)",
            "Mild headache and body aches",
            "Fatigue and general feeling of being unwell"
          ],
          causes: [
            "Rhinoviruses - most common cause (30-50% of colds)",
            "Coronavirus strains (not COVID-19)",
            "Respiratory syncytial virus (RSV)",
            "Parainfluenza viruses",
            "Transmission through droplets when infected person coughs/sneezes",
            "Contact with contaminated surfaces then touching face"
          ],
          treatments: [
            "Rest and adequate sleep to support immune system",
            "Over-the-counter pain relievers like acetaminophen or ibuprofen",
            "Decongestants and cough suppressants for symptom relief",
            "Throat lozenges or warm saltwater gargles",
            "Saline nasal sprays or rinses",
            "Antibiotics are NOT effective against viral infections"
          ],
          selfCare: [
            "Drink plenty of fluids - water, herbal tea, warm broth",
            "Use a humidifier or breathe steam from hot shower",
            "Get extra rest and sleep",
            "Eat nutritious foods to support immune function",
            "Avoid smoking and secondhand smoke",
            "Wash hands frequently to prevent spreading",
            "Stay home to avoid infecting others"
          ]
        }
      },
      "high-blood-pressure": {
        title: "High Blood Pressure: Understanding and Managing Hypertension",
        summary: "Learn about blood pressure levels, risk factors, and lifestyle changes to manage hypertension.",
        category: "Medical Conditions",
        lastReviewed: "2024-01-21",
        reviewer: "Dr. Robert Kim, Cardiologist",
        reviewerCredentials: "MD, Cardiology Fellowship, 15+ years experience",
        readTime: "9 min read",
        tags: ["hypertension", "heart health", "cardiovascular"],
        heroImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
        content: {
          overview: "High blood pressure (hypertension) is often called the 'silent killer' because it typically has no symptoms but can lead to serious health problems. Nearly half of American adults have high blood pressure, making it crucial to understand prevention and management strategies.",
          symptoms: [
            "Most people have NO symptoms (that's why it's dangerous)",
            "Severe hypertension may cause headaches",
            "Nosebleeds (rarely and only with very high pressure)",
            "Shortness of breath during physical activity",
            "Chest pain (may indicate complications)",
            "Dizziness or lightheadedness"
          ],
          causes: [
            "Primary hypertension - no identifiable cause, develops gradually",
            "Secondary hypertension - caused by underlying conditions",
            "Kidney disease or sleep apnea",
            "Thyroid problems or adrenal gland tumors",
            "Certain medications or illegal drugs",
            "Risk factors: age, race, family history, obesity, smoking"
          ],
          treatments: [
            "ACE inhibitors to relax blood vessels",
            "Diuretics to help kidneys remove excess sodium and water",
            "Beta-blockers to reduce heart rate and workload",
            "Calcium channel blockers to relax blood vessel muscles",
            "Regular monitoring and medication adjustments",
            "Combination medications for better control"
          ],
          selfCare: [
            "Maintain healthy weight through diet and exercise",
            "Eat DASH diet - rich in fruits, vegetables, whole grains",
            "Reduce sodium intake to less than 2,300mg daily",
            "Exercise regularly - at least 30 minutes most days",
            "Limit alcohol consumption",
            "Quit smoking and avoid secondhand smoke",
            "Manage stress through relaxation techniques",
            "Monitor blood pressure at home regularly"
          ]
        }
      },
      "sleep-hygiene": {
        title: "Sleep Hygiene: Tips for Better Sleep Quality",
        summary: "Discover evidence-based strategies to improve your sleep quality and establish healthy sleep habits.",
        category: "Self-Care & Wellness",
        lastReviewed: "2024-01-19",
        reviewer: "Dr. Lisa Thompson, Sleep Medicine",
        reviewerCredentials: "MD, Sleep Medicine Board Certified, 12+ years experience",
        readTime: "7 min read",
        tags: ["sleep", "wellness", "lifestyle"],
        heroImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop",
        content: {
          overview: "Good sleep hygiene involves practices and habits that promote consistent, quality sleep. Poor sleep affects physical health, mental well-being, and daily performance. Most adults need 7-9 hours of sleep per night for optimal health.",
          symptoms: [
            "Difficulty falling asleep (taking more than 30 minutes)",
            "Frequent awakenings during the night",
            "Waking up too early and unable to return to sleep",
            "Feeling tired and unrefreshed upon waking",
            "Daytime fatigue and sleepiness",
            "Difficulty concentrating during the day"
          ],
          causes: [
            "Irregular sleep schedule and poor sleep environment",
            "Excessive screen time before bed (blue light exposure)",
            "Caffeine, alcohol, or large meals close to bedtime",
            "Stress, anxiety, or racing thoughts",
            "Medical conditions like sleep apnea or restless leg syndrome",
            "Medications that interfere with sleep"
          ],
          treatments: [
            "Cognitive Behavioral Therapy for Insomnia (CBT-I)",
            "Sleep medications when recommended by healthcare provider",
            "Treatment of underlying medical conditions",
            "CPAP therapy for sleep apnea",
            "Light therapy for circadian rhythm disorders",
            "Relaxation techniques and stress management"
          ],
          selfCare: [
            "Maintain consistent sleep and wake times, even on weekends",
            "Create a relaxing bedtime routine (30-60 minutes before sleep)",
            "Keep bedroom cool (60-67°F), dark, and quiet",
            "Invest in comfortable mattress and pillows",
            "Avoid screens 1-2 hours before bedtime",
            "Limit caffeine after 2 PM and avoid alcohol near bedtime",
            "Get natural sunlight exposure during the day",
            "Exercise regularly, but not close to bedtime"
          ]
        }
      },
      "flu-prevention": {
        title: "Influenza: Prevention, Symptoms, and When to Seek Care",
        summary: "Comprehensive guide to flu prevention, recognizing symptoms, and knowing when medical care is needed.",
        category: "Prevention & Screening",
        lastReviewed: "2024-01-17",
        reviewer: "Dr. Ahmad Hassan, Infectious Disease",
        reviewerCredentials: "MD, Infectious Disease Fellowship, 10+ years experience",
        readTime: "8 min read",
        tags: ["flu", "vaccination", "prevention"],
        heroImage: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&h=400&fit=crop",
        content: {
          overview: "Influenza (flu) is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness and sometimes leads to hospitalization or death. Annual vaccination is the best way to prevent the flu.",
          symptoms: [
            "Sudden onset of fever (usually high, 101-104°F)",
            "Severe body aches and muscle pain",
            "Extreme fatigue and weakness",
            "Dry cough and sore throat",
            "Headache and chills",
            "Runny or stuffy nose (less common than with colds)"
          ],
          causes: [
            "Influenza A and B viruses - most common seasonal flu",
            "Influenza C virus - causes milder symptoms",
            "Transmission through respiratory droplets",
            "Contact with contaminated surfaces then touching face",
            "Peak season: October through March in Northern Hemisphere",
            "Virus mutations make annual vaccination necessary"
          ],
          treatments: [
            "Antiviral medications (Tamiflu, Xofluza) if started within 48 hours",
            "Rest and adequate fluid intake",
            "Over-the-counter pain relievers and fever reducers",
            "Cough suppressants and throat lozenges",
            "Prescription antiviral drugs for high-risk patients",
            "Hospitalization for severe cases or complications"
          ],
          selfCare: [
            "Get annual flu vaccination by October if possible",
            "Wash hands frequently with soap and water",
            "Avoid touching eyes, nose, and mouth",
            "Stay home when sick to prevent spreading",
            "Cover coughs and sneezes with tissue or elbow",
            "Clean and disinfect frequently touched surfaces",
            "Maintain healthy lifestyle - good nutrition, exercise, sleep",
            "Avoid close contact with sick individuals"
          ]
        }
      }
    };

    return articles[articleId as keyof typeof articles] || null;
  };

  const article = getArticleData(id || "");

  if (!article) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or may have been moved.</p>
          <Button asChild>
            <Link to="/health-library">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Health Library
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-secondary py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/health-library" className="hover:text-primary">Health Library</Link>
            <span>/</span>
            <span className="text-foreground">{article.category}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline">{article.category}</Badge>
            <span className="text-sm text-muted-foreground">{article.readTime}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
          
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {article.summary}
          </p>

          {/* Article Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-2" />
                <span>Medically reviewed by {article.reviewer}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Last updated {new Date(article.lastReviewed).toLocaleDateString()}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <Card className="mb-8 border-primary bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  This article is for informational purposes only and should not replace professional medical advice. 
                  Always consult with your healthcare provider about your specific condition and treatment options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Contents
            </h3>
            <nav className="space-y-2">
              <a href="#overview" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                1. Overview
              </a>
              <a href="#symptoms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                2. Symptoms
              </a>
              <a href="#causes" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                3. Causes
              </a>
              <a href="#treatment" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                4. Treatment Options
              </a>
              <a href="#self-care" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                5. Self-Care Tips
              </a>
            </nav>
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="medical-content space-y-8">
          {/* Overview */}
          <section id="overview">
            <h2>Overview</h2>
            <p>{article.content.overview}</p>
          </section>

          <Separator />

          {/* Symptoms */}
          <section id="symptoms">
            <h2>Symptoms</h2>
            <p>Common symptoms of migraine include:</p>
            <ul>
              {article.content.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </section>

          <Separator />

          {/* Causes */}
          <section id="causes">
            <h2>Causes and Risk Factors</h2>
            <p>Migraine can be triggered by various factors, including:</p>
            <ul>
              {article.content.causes.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </section>

          <Separator />

          {/* Treatment */}
          <section id="treatment">
            <h2>Treatment Options</h2>
            <p>Treatment for migraine typically involves both acute and preventive approaches:</p>
            <ul>
              {article.content.treatments.map((treatment, index) => (
                <li key={index}>{treatment}</li>
              ))}
            </ul>
            <Card className="mt-6 border-warning-health bg-warning-health/5">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> Always consult with a healthcare provider before starting any new medication or treatment plan.
                </p>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Self-Care */}
          <section id="self-care">
            <h2>Self-Care and Management Tips</h2>
            <p>You can take several steps to manage migraines and reduce their frequency:</p>
            <ul>
              {article.content.selfCare.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Reviewer Information */}
        <Card className="mt-12 bg-secondary">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Medical Reviewer</h3>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">{article.reviewer}</p>
                <p className="text-sm text-muted-foreground mb-2">{article.reviewerCredentials}</p>
                <p className="text-sm text-muted-foreground">
                  Specializes in neurological conditions with extensive experience in migraine research and treatment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="health-card-feature">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">
                  <Link to="/article/tension-headache" className="hover:text-primary transition-colors">
                    Tension Headaches: Causes and Relief
                  </Link>
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn about the most common type of headache and effective treatment options.
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>5 min read</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="health-card-feature">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">
                  <Link to="/article/stress-management" className="hover:text-primary transition-colors">
                    Stress Management for Better Health
                  </Link>
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Discover effective techniques to manage stress and improve your overall well-being.
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>7 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Library */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/health-library">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Health Library
            </Link>
          </Button>
        </div>
      </div>

      {/* Schema.org structured data would be added here in a real implementation */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": article.title,
          "description": article.summary,
          "dateModified": article.lastReviewed,
          "medicalAudience": {
            "@type": "MedicalAudience",
            "audienceType": "Patient"
          },
          "mainEntity": {
            "@type": "MedicalCondition",
            "name": "Migraine"
          }
        })}
      </script>
    </article>
  );
};

export default Article;