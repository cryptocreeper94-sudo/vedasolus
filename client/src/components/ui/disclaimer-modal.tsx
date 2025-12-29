import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("medical-disclaimer-accepted");
    if (!hasAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("medical-disclaimer-accepted", "true");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-background/95 backdrop-blur-xl border-white/10 max-w-xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="mx-auto p-3 bg-pink-500/20 rounded-full mb-4">
            <ShieldAlert className="w-8 h-8 text-pink-500" />
          </div>
          <AlertDialogTitle className="text-2xl font-serif text-center">
            Medical Disclaimer
          </AlertDialogTitle>
          <AlertDialogDescription asChild className="text-center space-y-4 pt-2 text-muted-foreground">
            <div>
              <p>
                The content provided in <strong>VedaSolus</strong>, including text, graphics, images, and other materials, is for <strong>informational and educational purposes only</strong>.
              </p>
              <p className="font-medium text-foreground">
                This application does not provide medical advice, diagnosis, or treatment.
              </p>
              <p>
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
              </p>
              <div className="p-3 bg-pink-900/20 border border-pink-500/20 rounded-lg text-xs text-pink-200/80 mt-4">
                <p>By continuing, you acknowledge that you understand this disclaimer and agree to our Terms of Service.</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center mt-4">
          <AlertDialogAction 
            onClick={handleAccept}
            className="w-full sm:w-auto px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            I Understand & Agree
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
