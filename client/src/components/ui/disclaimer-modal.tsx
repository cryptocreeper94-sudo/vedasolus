import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ShieldAlert, Loader2, Mail, User, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    const hasAccepted = localStorage.getItem("medical-disclaimer-accepted");
    if (!hasAccepted) {
      setOpen(true);
    }
  }, []);

  const submitMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; marketingOptIn: boolean }) => {
      const res = await fetch("/api/disclaimers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit");
      }
      return res.json();
    },
    onSuccess: () => {
      localStorage.setItem("medical-disclaimer-accepted", "true");
      localStorage.setItem("disclaimer-email", email);
      setOpen(false);
    },
  });

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      submitMutation.mutate({ name, email, marketingOptIn });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-background/95 backdrop-blur-xl border-white/10 max-w-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            localStorage.setItem("medical-disclaimer-accepted", "skipped");
            setOpen(false);
          }}
          className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
          data-testid="button-disclaimer-close"
          aria-label="Close disclaimer"
        >
          <X className="w-5 h-5" />
        </button>
        <AlertDialogHeader>
          <div className="mx-auto p-3 bg-pink-500/20 rounded-full mb-4">
            <ShieldAlert className="w-8 h-8 text-pink-500" />
          </div>
          <AlertDialogTitle className="text-2xl font-serif text-center">
            Medical Disclaimer
          </AlertDialogTitle>
          <AlertDialogDescription asChild className="text-center space-y-3 pt-2 text-muted-foreground">
            <div>
              <p>
                The content provided in <strong>VedaSolus</strong>, including text, graphics, images, and other materials, is for <strong>informational and educational purposes only</strong>.
              </p>
              <p className="font-medium text-foreground text-sm">
                This application does not provide medical advice, diagnosis, or treatment.
              </p>
              <p className="text-xs">
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-muted-foreground">Your Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-background/50 border-white/20"
                data-testid="input-disclaimer-name"
              />
            </div>
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-muted-foreground">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background/50 border-white/20"
                data-testid="input-disclaimer-email"
              />
            </div>
            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          </div>

          <div className="flex items-start space-x-3 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
            <Checkbox
              id="marketing"
              checked={marketingOptIn}
              onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
              className="mt-0.5"
              data-testid="checkbox-marketing-optin"
            />
            <div className="space-y-1">
              <Label htmlFor="marketing" className="text-sm cursor-pointer">
                Keep me updated on VedaSolus news and features
              </Label>
              <p className="text-xs text-muted-foreground">
                Optional. We respect your inbox and will never spam you.
              </p>
            </div>
          </div>

          <div className="p-3 bg-pink-900/20 border border-pink-500/20 rounded-lg text-xs text-pink-200/80">
            <p>By clicking "I Understand & Agree" below, you acknowledge that you understand this medical disclaimer and agree to our Terms of Service.</p>
          </div>

          {submitMutation.error && (
            <p className="text-xs text-red-400 text-center">
              {submitMutation.error.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            data-testid="button-disclaimer-submit"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "I Understand & Agree"
            )}
          </Button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
