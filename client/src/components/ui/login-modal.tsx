import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import logoImage from "@assets/Copilot_20251228_214224_1766980581672.png";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border-cyan-500/20 max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <img src={logoImage} alt="VedaSolus" className="h-16 w-auto" />
          </div>
          <DialogTitle className="text-2xl font-serif text-center">
            Welcome to VedaSolus
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Sign in to unlock your personalized wellness journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium"
            data-testid="button-login"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In to Continue
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
          </div>

          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-cyan-400/60">
              "Where ancient wisdom meets modern science"
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
