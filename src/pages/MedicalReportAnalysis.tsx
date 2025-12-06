import { useState } from "react";
import { Upload, FileText, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  summary: string;
  keyFindings: string[];
  medications: string[];
  recommendations: string[];
  followUp: string;
}

const MedicalReportAnalysis = () => {
  const [reportText, setReportText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      // Handle PDF files
      toast({
        title: "Processing PDF",
        description: "Extracting text from your PDF file...",
      });

      try {
        const formData = new FormData();
        formData.append('file', file);

        // Upload to a temporary location
        const timestamp = Date.now();
        const fileName = `temp-${timestamp}-${file.name}`;
        
        // For PDF, we'll read it and send to our edge function
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          
          // Send to parsing function
          try {
            const { data, error } = await supabase.functions.invoke('parse-pdf-report', {
              body: { pdfBase64: base64, fileName: file.name }
            });

            if (error) throw error;
            
            setReportText(data.text);
            toast({
              title: "PDF processed",
              description: "Your PDF has been successfully converted to text.",
            });
          } catch (err) {
            console.error('PDF parsing error:', err);
            toast({
              title: "PDF parsing failed",
              description: "Unable to extract text from PDF. Please try a text file instead.",
              variant: "destructive",
            });
          }
        };
        reader.readAsArrayBuffer(file);
      } catch (err) {
        console.error('File upload error:', err);
        toast({
          title: "Upload failed",
          description: "Failed to process the PDF file.",
          variant: "destructive",
        });
      }
    } else if (file.type === "text/plain") {
      // Handle text files
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setReportText(content);
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "File type not supported",
        description: "Please upload a PDF (.pdf) or text file (.txt) containing your medical report.",
        variant: "destructive",
      });
    }
  };

  const analyzeReport = async () => {
    if (!reportText.trim()) {
      toast({
        title: "No report text",
        description: "Please enter or upload your medical report text.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: { reportText, reportType: 'general' }
      });

      if (error) throw error;

      if (data.error) {
        setError(data.error);
        if (data.analysis) {
          setAnalysis(data.analysis);
        }
      } else {
        setAnalysis(data.analysis);
        toast({
          title: "Analysis complete",
          description: "Your medical report has been analyzed successfully.",
        });
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze the report. Please try again.');
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Medical Report Analysis</h1>
          <p className="text-xl text-muted-foreground">
            Upload or paste your medical report for AI-powered analysis and insights
          </p>
        </div>

        {/* Medical Disclaimer */}
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. Always consult with healthcare professionals for medical decisions.
          </AlertDescription>
        </Alert>

        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Upload Medical Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload a PDF (.pdf) or text file (.txt) or paste your report below
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.pdf,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div>
              <Textarea
                placeholder="Paste your medical report text here..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows={8}
                className="w-full"
              />
            </div>

            <Button 
              onClick={analyzeReport} 
              disabled={isAnalyzing || !reportText.trim()}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Report...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Analyze Report
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-muted-foreground">{analysis.summary}</p>
                </div>

                <Separator />

                {/* Key Findings */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Findings</h3>
                  <div className="space-y-2">
                    {analysis.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">•</Badge>
                        <span>{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Medications */}
                {analysis.medications.length > 0 && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Medications</h3>
                      <div className="space-y-2">
                        {analysis.medications.map((medication, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Badge variant="secondary" className="mt-1">Rx</Badge>
                            <span>{medication}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                  <div className="space-y-2">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Badge variant="default" className="mt-1">•</Badge>
                        <span>{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Follow-up */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Follow-up Care</h3>
                  <p className="text-muted-foreground">{analysis.followUp}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalReportAnalysis;