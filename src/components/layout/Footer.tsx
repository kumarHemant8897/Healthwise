import { Link } from "react-router-dom";
import { Heart, Shield, Users, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold health-gradient-text">HealthWise</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted health companion providing reliable information and self-care guidance.
            </p>
            <div className="flex space-x-2">
              <span className="trust-badge">
                <Shield className="w-3 h-3 mr-1" />
                Medically Reviewed
              </span>
            </div>
          </div>

          {/* Health Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Health Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/symptom-checker" className="text-muted-foreground hover:text-primary transition-colors">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link to="/health-library" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Library
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-muted-foreground hover:text-primary transition-colors">
                  Medical Conditions
                </Link>
              </li>
              <li>
                <Link to="/self-care" className="text-muted-foreground hover:text-primary transition-colors">
                  Self-Care Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/medical-disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  <FileText className="w-3 h-3 inline mr-1" />
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HealthWise. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Trusted by 100K+ users
              </span>
            </div>
          </div>
          
          {/* Medical Disclaimer */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="medical-disclaimer text-center">
              <strong>Important:</strong> The information provided on this website is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek advice from your physician or qualified healthcare provider with any questions about a medical condition.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;