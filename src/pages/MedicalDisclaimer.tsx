import { AlertTriangle, Shield, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MedicalDisclaimer = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary mr-3" />
            Medical Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground">
            Important information about the use of HealthWise content
          </p>
        </div>

        {/* Emergency Notice */}
        <Card className="mb-8 border-emergency-red bg-emergency-red/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Phone className="w-6 h-6 text-emergency-red flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Medical Emergency</h3>
                <p className="text-sm text-muted-foreground">
                  If you are experiencing a medical emergency, call your local emergency number (911 in the US) 
                  or go to the nearest emergency room immediately. Do not rely on this website for emergency medical care.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Main Disclaimer */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-warning-health mr-2" />
                General Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="medical-content">
              <p>
                The information provided on HealthWise is for educational and informational purposes only. 
                It is not intended as a substitute for professional medical advice, diagnosis, or treatment. 
                Always seek the advice of your physician or other qualified healthcare provider with any 
                questions you may have regarding a medical condition.
              </p>
              
              <h3>Not a Medical Diagnosis</h3>
              <p>
                HealthWise does not provide medical diagnoses. Our symptom checker and health information 
                are designed to help you understand potential causes of symptoms and guide you toward 
                appropriate medical care when needed. Only a qualified healthcare professional can provide 
                a proper medical diagnosis.
              </p>

              <h3>Professional Medical Care</h3>
              <p>
                Never disregard professional medical advice or delay in seeking it because of something 
                you have read on HealthWise. If you think you may have a medical emergency, call your 
                doctor or emergency services immediately.
              </p>
            </CardContent>
          </Card>

          {/* Content Accuracy */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Content Accuracy and Review</CardTitle>
            </CardHeader>
            <CardContent className="medical-content">
              <h3>Medical Review Process</h3>
              <p>
                All health content on HealthWise is medically reviewed by qualified healthcare professionals. 
                However, medical knowledge evolves rapidly, and individual circumstances vary significantly.
              </p>

              <h3>Information Currency</h3>
              <p>
                While we strive to keep our content current and accurate, medical information changes 
                frequently. Always verify health information with your healthcare provider and consider 
                the publication date of any content you read.
              </p>

              <h3>Individual Variation</h3>
              <p>
                Health information is general in nature and may not apply to your specific situation. 
                Your individual health circumstances, medical history, and current treatments all affect 
                how medical information applies to you personally.
              </p>
            </CardContent>
          </Card>

          {/* Liability Limitations */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Limitations of Liability</CardTitle>
            </CardHeader>
            <CardContent className="medical-content">
              <h3>No Warranties</h3>
              <p>
                HealthWise makes no warranties, express or implied, regarding the accuracy, completeness, 
                or usefulness of the information provided. We do not guarantee that the information is 
                error-free or suitable for your particular health situation.
              </p>

              <h3>Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by law, HealthWise and its affiliates, officers, directors, 
                employees, and agents shall not be liable for any direct, indirect, incidental, special, 
                or consequential damages arising from your use of this website or reliance on its content.
              </p>

              <h3>Third-Party Content</h3>
              <p>
                HealthWise may contain links to third-party websites or reference third-party sources. 
                We are not responsible for the content, accuracy, or privacy practices of these external sites.
              </p>
            </CardContent>
          </Card>

          {/* AI and Technology */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle>AI-Powered Features</CardTitle>
            </CardHeader>
            <CardContent className="medical-content">
              <h3>Artificial Intelligence Limitations</h3>
              <p>
                HealthWise uses artificial intelligence to provide symptom checking and health guidance. 
                While our AI is trained on medically reviewed content, it has limitations and should never 
                replace professional medical judgment.
              </p>

              <h3>Technology Accuracy</h3>
              <p>
                AI systems can make errors and may not account for all possible medical conditions or 
                individual circumstances. Always verify AI-generated information with qualified healthcare professionals.
              </p>

              <h3>Data Processing</h3>
              <p>
                When you use our AI-powered features, your inputs are processed to provide personalized 
                responses. This processing is done in accordance with our Privacy Policy and applicable 
                data protection laws.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="health-card bg-secondary">
            <CardHeader>
              <CardTitle>Questions or Concerns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this medical disclaimer or our content, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> medical@healthwise.com</p>
                <p><strong>Address:</strong> HealthWise Medical Information Services</p>
                <p className="text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;