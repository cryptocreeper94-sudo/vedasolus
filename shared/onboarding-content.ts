export interface OnboardingSlide {
  title: string;
  subtitle: string;
  content: string;
  iconName: string;
  color: "cyan" | "violet" | "emerald" | "pink" | "orange";
}

export const partnerOnboardingSlides: OnboardingSlide[] = [
  {
    title: "Welcome to VedaSolus",
    subtitle: "Your Partner Portal",
    content: "VedaSolus is a revolutionary holistic health platform that bridges ancient Eastern wisdom with modern Western science. As a partner, you have full visibility into our growing ecosystem.",
    iconName: "Sparkles",
    color: "cyan",
  },
  {
    title: "Our Vision",
    subtitle: "Transforming Healthcare",
    content: "We're building a complete wellness ecosystem: AI-powered coaching, practitioner marketplace, blockchain-verified credentials, and personalized health journeys for millions of users worldwide.",
    iconName: "Globe",
    color: "violet",
  },
  {
    title: "What's Connected",
    subtitle: "Live Integrations",
    content: "Stripe payments processing subscription revenue. Orbit Staffing manages payroll and invoicing. Firebase handles authentication. OpenAI + ElevenLabs power our AI wellness coach.",
    iconName: "Zap",
    color: "emerald",
  },
  {
    title: "Revenue & Growth",
    subtitle: "Financial Hub",
    content: "100% of all revenue belongs to Jason Andrews. All pricing is managed through Orbit Staffing, and revenue syncs automatically to Orbit Financial Hub. Full visibility into MRR and subscriber metrics from this dashboard.",
    iconName: "DollarSign",
    color: "pink",
  },
  {
    title: "Your Access",
    subtitle: "Full Visibility",
    content: "As the owner, you have full access to all metrics, user data, Orbit Staffing integrations, and business analytics. Pricing adjustments flow through Orbit Staffing.",
    iconName: "Shield",
    color: "orange",
  },
];

export const staffOnboardingSlides: OnboardingSlide[] = [
  {
    title: "Welcome to the Team",
    subtitle: "Dark Wave Studios",
    content: "You're now part of a mission to transform healthcare through the fusion of ancient wisdom and modern technology. This platform represents the future of holistic wellness.",
    iconName: "Sparkles",
    color: "cyan",
  },
  {
    title: "Our Platform",
    subtitle: "VedaSolus",
    content: "VedaSolus combines Ayurvedic dosha analysis, Traditional Chinese Medicine principles, and Western health tracking into one comprehensive platform for users seeking genuine wellness transformation.",
    iconName: "Heart",
    color: "pink",
  },
  {
    title: "Key Features",
    subtitle: "What We Offer",
    content: "Health tracking (sleep, diet, exercise), AI wellness coaching with voice, practitioner marketplace, health passport with QR verification, and community features for wellness tribes.",
    iconName: "Zap",
    color: "emerald",
  },
  {
    title: "Your Tools",
    subtitle: "Orbit Staffing",
    content: "Timesheets, payroll, and certifications are managed through Orbit Staffing. Your hours are automatically synced, and payments are processed via direct deposit.",
    iconName: "Building2",
    color: "violet",
  },
  {
    title: "Get Started",
    subtitle: "Let's Build Together",
    content: "Your contribution matters. Whether you're in development, wellness consulting, or support, you're helping build something that will impact millions of lives.",
    iconName: "Rocket",
    color: "orange",
  },
];
