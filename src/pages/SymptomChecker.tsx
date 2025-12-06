import { useState } from "react";
import { ChevronRight, AlertTriangle, User, Calendar, MapPin, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

type Step = "basic-info" | "symptoms" | "results";

interface BasicInfo {
  age: string;
  gender: string;
  location: string;
}

interface SymptomSelection {
  primary: string;
  additional: string[];
  duration: string;
  severity: string;
}

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState<Step>("basic-info");
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    age: "",
    gender: "",
    location: ""
  });
  const [symptoms, setSymptoms] = useState<SymptomSelection>({
    primary: "",
    additional: [],
    duration: "",
    severity: ""
  });

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Sore throat", "Fatigue", "Nausea",
    "Back pain", "Stomach pain", "Dizziness", "Shortness of breath",
    "Rash", "Joint pain", "Muscle aches", "Sleep problems"
  ];

  const handleBasicInfoSubmit = () => {
    if (basicInfo.age && basicInfo.gender) {
      setCurrentStep("symptoms");
    }
  };

  const handleSymptomsSubmit = () => {
    if (symptoms.primary && symptoms.duration && symptoms.severity) {
      setCurrentStep("results");
    }
  };

  const handleAdditionalSymptomToggle = (symptom: string) => {
    setSymptoms(prev => ({
      ...prev,
      additional: prev.additional.includes(symptom)
        ? prev.additional.filter(s => s !== symptom)
        : [...prev.additional, symptom]
    }));
  };

  // Mock results based on input
  const generateResults = () => {
    const results = [];
    
    if (symptoms.primary.toLowerCase().includes("headache")) {
      results.push({
        condition: "Tension Headache",
        probability: "Common",
        description: "Often caused by stress, muscle tension, or eye strain.",
        selfCare: ["Rest in a quiet, dark room", "Apply cold or warm compress", "Stay hydrated", "Gentle neck stretches"]
      });
      results.push({
        condition: "Migraine",
        probability: "Possible",
        description: "Recurring headaches that can cause severe throbbing pain.",
        selfCare: ["Avoid known triggers", "Maintain regular sleep schedule", "Stay hydrated", "Consider over-the-counter pain relief"]
      });
    } else if (symptoms.primary.toLowerCase().includes("fever")) {
      results.push({
        condition: "Viral Infection",
        probability: "Common",
        description: "Your body's natural response to fighting infection.",
        selfCare: ["Rest and sleep", "Stay hydrated", "Use fever reducers if needed", "Monitor temperature"]
      });
    } else {
      results.push({
        condition: "General Health Concern",
        probability: "Variable",
        description: "Multiple factors could be contributing to your symptoms.",
        selfCare: ["Rest and monitor symptoms", "Stay hydrated", "Maintain good hygiene", "Seek medical advice if symptoms persist"]
      });
    }

    return results;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Stethoscope className="w-10 h-10 text-primary mr-3" />
            Symptom Checker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized insights about your symptoms. Remember, this tool provides information only and is not a medical diagnosis.
          </p>
        </div>

        {/* Safety Notice */}
        <Card className="mb-8 border-warning-health bg-warning-health/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-warning-health flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Important Safety Information</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This symptom checker is for informational purposes only and does not provide medical diagnosis. 
                  If you're experiencing a medical emergency, call your local emergency number immediately.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Severe chest pain or difficulty breathing</li>
                  <li>• Signs of stroke (sudden weakness, speech problems)</li>
                  <li>• Severe allergic reactions</li>
                  <li>• High fever with severe symptoms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className={`flex items-center ${currentStep === "basic-info" ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep === "basic-info" ? "border-primary bg-primary text-white" : "border-muted"
            }`}>
              <User className="w-4 h-4" />
            </div>
            <span className="ml-2 font-medium">Basic Info</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <div className={`flex items-center ${currentStep === "symptoms" ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep === "symptoms" ? "border-primary bg-primary text-white" : "border-muted"
            }`}>
              <Stethoscope className="w-4 h-4" />
            </div>
            <span className="ml-2 font-medium">Symptoms</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <div className={`flex items-center ${currentStep === "results" ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep === "results" ? "border-primary bg-primary text-white" : "border-muted"
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Results</span>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === "basic-info" && (
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-6 h-6 text-primary mr-2" />
                Tell Us About Yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={basicInfo.age}
                    onChange={(e) => setBasicInfo(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={basicInfo.location}
                    onChange={(e) => setBasicInfo(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Gender *</Label>
                <RadioGroup
                  value={basicInfo.gender}
                  onValueChange={(value) => setBasicInfo(prev => ({ ...prev, gender: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={handleBasicInfoSubmit}
                className="w-full"
                disabled={!basicInfo.age || !basicInfo.gender}
              >
                Continue to Symptoms
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === "symptoms" && (
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="w-6 h-6 text-primary mr-2" />
                Describe Your Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>What is your main symptom? *</Label>
                <Input
                  placeholder="e.g., headache, fever, cough..."
                  value={symptoms.primary}
                  onChange={(e) => setSymptoms(prev => ({ ...prev, primary: e.target.value }))}
                />
              </div>

              <div className="space-y-3">
                <Label>How long have you had this symptom? *</Label>
                <RadioGroup
                  value={symptoms.duration}
                  onValueChange={(value) => setSymptoms(prev => ({ ...prev, duration: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="less-than-day" id="less-than-day" />
                    <Label htmlFor="less-than-day">Less than a day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3-days" id="1-3-days" />
                    <Label htmlFor="1-3-days">1-3 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4-7-days" id="4-7-days" />
                    <Label htmlFor="4-7-days">4-7 days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="more-than-week" id="more-than-week" />
                    <Label htmlFor="more-than-week">More than a week</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>How severe is your symptom? *</Label>
                <RadioGroup
                  value={symptoms.severity}
                  onValueChange={(value) => setSymptoms(prev => ({ ...prev, severity: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="mild" />
                    <Label htmlFor="mild">Mild - Barely noticeable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate - Noticeable but manageable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="severe" />
                    <Label htmlFor="severe">Severe - Significantly affects daily activities</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Any additional symptoms? (Optional)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonSymptoms.filter(s => s.toLowerCase() !== symptoms.primary.toLowerCase()).map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={symptoms.additional.includes(symptom)}
                        onCheckedChange={() => handleAdditionalSymptomToggle(symptom)}
                      />
                      <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep("basic-info")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSymptomsSubmit}
                  className="flex-1"
                  disabled={!symptoms.primary || !symptoms.duration || !symptoms.severity}
                >
                  Get Results
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === "results" && (
          <div className="space-y-6">
            {/* Disclaimer */}
            <Card className="border-primary bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Information Only - Not a Medical Diagnosis</h3>
                    <p className="text-sm text-muted-foreground">
                      These results are based on the symptoms you've described and are for informational purposes only. 
                      They do not constitute a medical diagnosis. Please consult with a healthcare professional for proper evaluation and treatment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Possible Causes & Self-Care Tips</h2>
              {generateResults().map((result, index) => (
                <Card key={index} className="health-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold">{result.condition}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        result.probability === "Common" ? "bg-success-health text-success-health-foreground" :
                        result.probability === "Possible" ? "bg-warning-health text-warning-health-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {result.probability}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{result.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Self-Care Recommendations:</h4>
                      <ul className="space-y-1">
                        {result.selfCare.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Next Steps */}
            <Card className="health-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Monitor Your Symptoms</p>
                      <p className="text-sm text-muted-foreground">Keep track of any changes in your symptoms or new ones that develop.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Seek Medical Advice</p>
                      <p className="text-sm text-muted-foreground">Consult with a healthcare professional, especially if symptoms persist or worsen.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Learn More</p>
                      <p className="text-sm text-muted-foreground">Explore our Health Library for detailed information about your condition.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button asChild className="flex-1">
                    <Link to="/health-library">Explore Health Library</Link>
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setCurrentStep("basic-info");
                    setBasicInfo({ age: "", gender: "", location: "" });
                    setSymptoms({ primary: "", additional: [], duration: "", severity: "" });
                  }} className="flex-1">
                    Check New Symptoms
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;