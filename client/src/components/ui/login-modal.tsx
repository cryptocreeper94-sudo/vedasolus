import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/Copilot_20251228_214224_1766980581672.png";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup" | "verify";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login, signup, verifyEmail, resendVerification, isLoggingIn } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVerificationCode("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      onOpenChange(false);
      resetForm();
      toast({ title: "Welcome back!", description: "You've successfully signed in." });
    } catch (error: any) {
      if (error.requiresVerification) {
        setPendingEmail(error.email);
        setMode("verify");
        toast({ title: "Verification Required", description: error.message });
      } else {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await signup(email, password, firstName, lastName);
      setPendingEmail(result.email);
      setMode("verify");
      toast({ title: "Check Your Email", description: "We've sent a verification code to your email." });
    } catch (error: any) {
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await verifyEmail(pendingEmail, verificationCode);
      onOpenChange(false);
      resetForm();
      setMode("login");
      toast({ title: "Email Verified!", description: "Welcome to VedaSolus!" });
    } catch (error: any) {
      toast({ title: "Verification Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerification(pendingEmail);
      toast({ title: "Code Sent", description: "A new verification code has been sent to your email." });
    } catch (error: any) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border-cyan-500/20 max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <img src={logoImage} alt="VedaSolus" className="h-16 w-auto" />
          </div>
          <DialogTitle className="text-2xl font-serif text-center">
            {mode === "login" && "Welcome Back"}
            {mode === "signup" && "Create Account"}
            {mode === "verify" && "Verify Email"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {mode === "login" && "Sign in to continue your wellness journey"}
            {mode === "signup" && "Join VedaSolus to unlock personalized wellness"}
            {mode === "verify" && `Enter the 6-digit code sent to ${pendingEmail}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {mode === "verify" && (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-2xl tracking-widest bg-white/5 border-white/10"
                  maxLength={6}
                  data-testid="input-verification-code"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || verificationCode.length !== 6}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                data-testid="button-verify"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Email"}
              </Button>
              
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => { setMode("login"); resetForm(); }}
                  className="text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to login
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Resend code
                </button>
              </div>
            </form>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                    data-testid="input-password"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || !email || !password}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                data-testid="button-login"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("signup"); resetForm(); }}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Create one
                </button>
              </p>
            </form>
          )}

          {mode === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10"
                      data-testid="input-first-name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white/5 border-white/10"
                    data-testid="input-last-name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                    data-testid="input-signup-email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                    data-testid="input-signup-password"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting || !email || !password || !firstName}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
                data-testid="button-signup"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("login"); resetForm(); }}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}

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
