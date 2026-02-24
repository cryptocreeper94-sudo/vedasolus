import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Code, 
  Map, 
  BarChart3, 
  FileText, 
  GitBranch, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Zap,
  Globe,
  Shield,
  Database,
  Users,
  Brain,
  Wallet,
  Activity,
  Target,
  Calendar,
  ChevronRight,
  Server,
  Cpu,
  Terminal,
  ExternalLink,
  Video,
  Smartphone,
  Mail,
  Download,
  CheckCheck,
  XCircle,
  Search,
  Trash2,
  Edit3,
  Plus,
  X,
  ToggleLeft,
  ToggleRight,
  Stethoscope,
  Phone,
  MapPin,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis, YAxis, PieChart, Pie, Legend } from "recharts";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const roadmapPhases = [
  {
    id: "phase1",
    title: "Foundation",
    status: "completed",
    quarter: "Q4 2024",
    progress: 100,
    color: "emerald",
    milestones: [
      { name: "User Authentication (Replit Auth)", status: "done" },
      { name: "Health Tracking (Sleep, Diet, Exercise)", status: "done" },
      { name: "Stripe Payment Integration", status: "done" },
      { name: "AI Wellness Coach (OpenAI + ElevenLabs)", status: "done" },
      { name: "Health Passport with QR Codes", status: "done" },
    ]
  },
  {
    id: "phase2",
    title: "Intelligence & Personalization",
    status: "in_progress",
    quarter: "Q1 2025",
    progress: 60,
    color: "cyan",
    milestones: [
      { name: "Dosha Analysis Engine", status: "done" },
      { name: "Personalized Insights Dashboard", status: "done" },
      { name: "Partner Portal with PIN Authentication", status: "done" },
      { name: "Advanced Analytics", status: "in_progress" },
      { name: "Apple HealthKit Integration", status: "pending" },
      { name: "FHIR Medical Records API", status: "pending" },
    ]
  },
  {
    id: "phase3",
    title: "Ecosystem Growth",
    status: "upcoming",
    quarter: "Q2 2025",
    progress: 0,
    color: "pink",
    milestones: [
      { name: "Practitioner Marketplace Launch", status: "pending" },
      { name: "In-App Messaging System", status: "pending" },
      { name: "Community Tribes Feature", status: "pending" },
      { name: "Video Consultations", status: "pending" },
      { name: "Practitioner Verification System", status: "pending" },
    ]
  },
  {
    id: "phase4",
    title: "Web3 & Enterprise",
    status: "in_progress",
    quarter: "Q3 2025",
    progress: 20,
    color: "violet",
    milestones: [
      { name: "Dark Wave Smart Chain Integration", status: "pending" },
      { name: "Orbit Staffing Payroll System", status: "done" },
      { name: "NFT Health Credentials", status: "pending" },
      { name: "Enterprise API Access", status: "pending" },
      { name: "HIPAA Compliance Certification", status: "pending" },
    ]
  },
  {
    id: "phase5",
    title: "Native Mobile Apps",
    status: "upcoming",
    quarter: "Q1 2025",
    progress: 0,
    color: "orange",
    milestones: [
      { name: "Day 1: Expo/React Native project setup", status: "pending" },
      { name: "Day 2: Navigation & Shell layout", status: "pending" },
      { name: "Day 3: Dashboard & Home screen", status: "pending" },
      { name: "Day 4: Health tracking screens (Sleep, Diet, Exercise)", status: "pending" },
      { name: "Day 5: AI Wellness Coach integration", status: "pending" },
      { name: "Day 6: Health Passport & QR codes", status: "pending" },
      { name: "Day 7: Authentication flow (Firebase)", status: "pending" },
      { name: "Day 8: Stripe native payments", status: "pending" },
      { name: "Day 9: Push notifications setup", status: "pending" },
      { name: "Day 10: Practitioner marketplace", status: "pending" },
      { name: "Day 11: Messages & Community", status: "pending" },
      { name: "Day 12: Settings & Profile screens", status: "pending" },
      { name: "Day 13: Testing & bug fixes", status: "pending" },
      { name: "Day 14: Google Play submission", status: "pending" },
      { name: "Future: Apple Developer account & iOS build", status: "pending" },
    ]
  },
  {
    id: "phase6",
    title: "Video Consultations",
    status: "upcoming",
    quarter: "Q2 2025",
    progress: 0,
    color: "cyan",
    milestones: [
      { name: "Video API integration (ZEGOCLOUD/Daily.co)", status: "pending" },
      { name: "Booking system with time slot selection", status: "pending" },
      { name: "Video room page with unique links", status: "pending" },
      { name: "Practitioner availability calendar", status: "pending" },
      { name: "Appointment reminders (email/push)", status: "pending" },
      { name: "In-call chat & file sharing", status: "pending" },
      { name: "Session recording (optional)", status: "pending" },
      { name: "Post-consultation notes & follow-up", status: "pending" },
      { name: "Platform fee integration with Stripe", status: "pending" },
    ]
  },
];

const externalResources = [
  { category: "Mobile Development", items: [
    { name: "Expo Documentation", url: "https://docs.expo.dev", desc: "React Native framework" },
    { name: "React Native", url: "https://reactnative.dev/docs/getting-started", desc: "Core mobile framework" },
    { name: "Google Play Console", url: "https://play.google.com/console", desc: "Android app publishing" },
    { name: "Apple Developer", url: "https://developer.apple.com", desc: "iOS app publishing ($99/yr)" },
  ]},
  { category: "Video Consultations", items: [
    { name: "ZEGOCLOUD", url: "https://www.zegocloud.com", desc: "Video/voice API, HIPAA compliant" },
    { name: "Daily.co", url: "https://www.daily.co", desc: "Video API, 10K free mins/mo" },
    { name: "VSee", url: "https://vsee.com", desc: "Healthcare-focused video" },
  ]},
  { category: "Integrations", items: [
    { name: "Stripe Dashboard", url: "https://dashboard.stripe.com", desc: "Payment management" },
    { name: "Firebase Console", url: "https://console.firebase.google.com", desc: "Auth & notifications" },
    { name: "OpenAI Platform", url: "https://platform.openai.com", desc: "AI wellness coach API" },
    { name: "ElevenLabs", url: "https://elevenlabs.io", desc: "Voice synthesis" },
    { name: "Orbit Staffing", url: "https://orbitstaffing.io", desc: "Payroll & invoicing" },
  ]},
  { category: "Compliance", items: [
    { name: "HIPAA Guidelines", url: "https://www.hhs.gov/hipaa", desc: "Health data privacy" },
    { name: "App Store Guidelines", url: "https://developer.apple.com/app-store/review/guidelines", desc: "Apple submission rules" },
    { name: "Google Play Policy", url: "https://play.google.com/about/developer-content-policy", desc: "Android submission rules" },
  ]},
];


function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    done: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    in_progress: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    pending: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    upcoming: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  };
  
  const icons: Record<string, any> = {
    done: CheckCircle2,
    in_progress: Clock,
    pending: AlertCircle,
    completed: CheckCircle2,
    upcoming: Rocket,
  };
  
  const Icon = icons[status] || AlertCircle;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${styles[status] || styles.pending}`}>
      <Icon className="w-3 h-3" />
      {status.replace("_", " ")}
    </span>
  );
}

function SeoManager() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    route: "", title: "", description: "", keywords: "",
    ogTitle: "", ogDescription: "", ogImage: "",
    twitterTitle: "", twitterDescription: "",
    canonicalUrl: "", robots: "index, follow", isActive: true,
  });

  const { data: seoPages, isLoading } = useQuery({
    queryKey: ["/api/seo/pages"],
    queryFn: async () => {
      const res = await fetch("/api/seo/pages");
      if (!res.ok) throw new Error("Failed to fetch SEO pages");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/seo/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo/pages"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const res = await fetch(`/api/seo/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo/pages"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/seo/pages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo/pages"] });
      setDeleteConfirm(null);
    },
  });

  const resetForm = () => {
    setFormData({
      route: "", title: "", description: "", keywords: "",
      ogTitle: "", ogDescription: "", ogImage: "",
      twitterTitle: "", twitterDescription: "",
      canonicalUrl: "", robots: "index, follow", isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (page: any) => {
    setFormData({
      route: page.route || "",
      title: page.title || "",
      description: page.description || "",
      keywords: page.keywords || "",
      ogTitle: page.ogTitle || "",
      ogDescription: page.ogDescription || "",
      ogImage: page.ogImage || "",
      twitterTitle: page.twitterTitle || "",
      twitterDescription: page.twitterDescription || "",
      canonicalUrl: page.canonicalUrl || "",
      robots: page.robots || "index, follow",
      isActive: page.isActive ?? true,
    });
    setEditingId(page.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500/50 focus:outline-none";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-emerald-400" /> SEO Manager
        </h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm hover:bg-emerald-500/20 transition-colors"
          data-testid="button-add-seo-route"
        >
          <Plus className="w-4 h-4" /> Add Route
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-white">
              {editingId ? "Edit SEO Config" : "New SEO Config"}
            </h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-white" data-testid="button-close-seo-form">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Route</label>
              <input className={inputClass} placeholder="/about" value={formData.route} onChange={(e) => setFormData({ ...formData, route: e.target.value })} data-testid="input-seo-route" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Title</label>
              <input className={inputClass} placeholder="Page Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} data-testid="input-seo-title" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Description</label>
              <input className={inputClass} placeholder="Meta description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} data-testid="input-seo-description" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Keywords</label>
              <input className={inputClass} placeholder="keyword1, keyword2" value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} data-testid="input-seo-keywords" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">OG Title</label>
              <input className={inputClass} placeholder="Open Graph Title" value={formData.ogTitle} onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })} data-testid="input-seo-og-title" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">OG Description</label>
              <input className={inputClass} placeholder="Open Graph Description" value={formData.ogDescription} onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })} data-testid="input-seo-og-description" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">OG Image URL</label>
              <input className={inputClass} placeholder="https://..." value={formData.ogImage} onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })} data-testid="input-seo-og-image" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Twitter Title</label>
              <input className={inputClass} placeholder="Twitter Card Title" value={formData.twitterTitle} onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })} data-testid="input-seo-twitter-title" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Twitter Description</label>
              <input className={inputClass} placeholder="Twitter Card Description" value={formData.twitterDescription} onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })} data-testid="input-seo-twitter-description" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Canonical URL</label>
              <input className={inputClass} placeholder="https://..." value={formData.canonicalUrl} onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })} data-testid="input-seo-canonical" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Robots</label>
              <input className={inputClass} placeholder="index, follow" value={formData.robots} onChange={(e) => setFormData({ ...formData, robots: e.target.value })} data-testid="input-seo-robots" />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <label className="text-xs text-slate-400">Active</label>
              <button
                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                className="text-emerald-400"
                data-testid="button-seo-toggle-active"
              >
                {formData.isActive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-slate-500" />}
              </button>
              <span className="text-xs text-slate-400">{formData.isActive ? "Enabled" : "Disabled"}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
              data-testid="button-seo-submit"
            >
              {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
            <button onClick={resetForm} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 transition-colors" data-testid="button-seo-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-slate-400 text-sm">Loading SEO configurations...</div>
      ) : !seoPages || seoPages.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm" data-testid="text-seo-empty">
          No SEO configurations yet. Add a route to get started.
        </div>
      ) : (
        <div className="space-y-2">
          {seoPages.map((page: any) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all group"
              data-testid={`seo-row-${page.id}`}
            >
              <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => handleEdit(page)}>
                <div className={`w-2 h-2 rounded-full ${page.isActive ? "bg-emerald-400" : "bg-slate-500"}`} />
                <div>
                  <span className="text-sm text-white font-mono">{page.route}</span>
                  <span className="text-xs text-slate-400 ml-3">{page.title}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(page)}
                  className="p-1.5 rounded-md hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transition-colors"
                  data-testid={`button-edit-seo-${page.id}`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                {deleteConfirm === page.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteMutation.mutate(page.id)}
                      className="px-2 py-1 rounded-md bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors"
                      data-testid={`button-confirm-delete-seo-${page.id}`}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-2 py-1 rounded-md bg-white/5 text-slate-400 text-xs hover:bg-white/10 transition-colors"
                      data-testid={`button-cancel-delete-seo-${page.id}`}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(page.id)}
                    className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                    data-testid={`button-delete-seo-${page.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [dateRange, setDateRange] = useState(7);
  const { toast } = useToast();

  const { data: summary } = useQuery({
    queryKey: ["/api/analytics/summary", dateRange],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/summary?days=${dateRange}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const { data: realtime } = useQuery({
    queryKey: ["/api/analytics/realtime"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/realtime");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    refetchInterval: 10000,
  });

  const { data: traffic } = useQuery({
    queryKey: ["/api/analytics/traffic", dateRange],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/traffic?days=${dateRange}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const { data: topPages } = useQuery({
    queryKey: ["/api/analytics/pages", dateRange],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/pages?days=${dateRange}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const { data: devices } = useQuery({
    queryKey: ["/api/analytics/devices", dateRange],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/devices?days=${dateRange}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const { data: browsers } = useQuery({
    queryKey: ["/api/analytics/browsers", dateRange],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/browsers?days=${dateRange}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const { data: geo } = useQuery({
    queryKey: ["/api/analytics/geo", dateRange],
    queryFn: async () => {
      const res = await fetch(`/api/analytics/geo?days=${dateRange}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const formatDuration = (seconds: number) => {
    if (!seconds) return "0s";
    if (seconds < 60) return `${seconds}s`;
    return `${(seconds / 60).toFixed(1)} min`;
  };

  const DEVICE_COLORS = ["#06b6d4", "#ec4899", "#10b981", "#8b5cf6", "#f59e0b"];
  
  const handleDevAction = (action: string) => {
    toast({
      title: "Developer Action",
      description: `${action} - this action requires admin access.`,
    });
  };

  return (
    <Shell>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-500/30">
              <Code className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">Developer Core</h1>
              <p className="text-cyan-300/70 text-sm">Strategic Command Center • PIN: 0424</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-md flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM OPTIMAL
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400" data-testid="tab-roadmap">
            <Map className="w-4 h-4 mr-2" /> Roadmap
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400" data-testid="tab-analytics">
            <BarChart3 className="w-4 h-4 mr-2" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400" data-testid="tab-system">
            <Server className="w-4 h-4 mr-2" /> System
          </TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400" data-testid="tab-docs">
            <FileText className="w-4 h-4 mr-2" /> Documentation
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400" data-testid="tab-subscribers">
            <Mail className="w-4 h-4 mr-2" /> Subscribers
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400" data-testid="tab-inquiries">
            <Stethoscope className="w-4 h-4 mr-2" /> Inquiries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-6" data-testid="content-roadmap">
          <BentoGrid>
            <BentoCard colSpan={3} className="bg-gradient-to-br from-cyan-500/5 to-violet-500/5 border-cyan-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-cyan-400" /> Product Roadmap
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Overall Progress</span>
                  <span className="text-sm font-bold text-cyan-400">36%</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {roadmapPhases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          phase.color === "emerald" ? "bg-emerald-500/20" :
                          phase.color === "cyan" ? "bg-cyan-500/20" :
                          phase.color === "pink" ? "bg-pink-500/20" :
                          "bg-violet-500/20"
                        }`}>
                          <span className="text-lg font-bold text-white">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{phase.title}</h3>
                          <p className="text-xs text-slate-400">{phase.quarter}</p>
                        </div>
                      </div>
                      <StatusBadge status={phase.status} />
                    </div>
                    
                    <Progress value={phase.progress} className="h-2 mb-4" />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {phase.milestones.map((milestone) => (
                        <div
                          key={milestone.name}
                          className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                            milestone.status === "done"
                              ? "bg-emerald-500/10 text-emerald-300"
                              : milestone.status === "in_progress"
                              ? "bg-cyan-500/10 text-cyan-300"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          {milestone.status === "done" ? (
                            <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          ) : milestone.status === "in_progress" ? (
                            <Clock className="w-3 h-3 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          )}
                          <span className="truncate">{milestone.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </BentoCard>
          </BentoGrid>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6" data-testid="content-analytics">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pink-400" /> Live Analytics
            </h2>
            <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDateRange(d)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${dateRange === d ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white"}`}
                  data-testid={`button-range-${d}`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Active Now</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400" data-testid="text-active-now">{realtime?.activeVisitors || 0}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/30 transition-all">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2">Page Views</span>
              <p className="text-2xl font-bold text-white" data-testid="text-page-views">{(summary?.totalPageViews || 0).toLocaleString()}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-pink-500/30 transition-all">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2">Unique Visitors</span>
              <p className="text-2xl font-bold text-white" data-testid="text-unique-visitors">{(summary?.uniqueVisitors || 0).toLocaleString()}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-violet-500/30 transition-all">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2">Sessions</span>
              <p className="text-2xl font-bold text-white" data-testid="text-sessions">{(summary?.totalSessions || 0).toLocaleString()}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-orange-500/30 transition-all">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2">Avg Duration</span>
              <p className="text-2xl font-bold text-white" data-testid="text-avg-duration">{formatDuration(summary?.avgSessionDuration || 0)}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-pink-500/30 transition-all">
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2">Bounce Rate</span>
              <p className="text-2xl font-bold text-white" data-testid="text-bounce-rate">{(summary?.bounceRate || 0).toFixed(1)}%</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]">
            <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-cyan-400" /> TRAFFIC OVER TIME
            </h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={traffic || []}>
                  <defs>
                    <linearGradient id="colorPV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="pageViews" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPV)" strokeWidth={2} name="Page Views" />
                  <Area type="monotone" dataKey="visitors" stroke="#ec4899" fillOpacity={1} fill="url(#colorVis)" strokeWidth={2} name="Visitors" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]">
              <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-cyan-400" /> TOP PAGES
              </h3>
              <div className="space-y-2 max-h-[240px] overflow-y-auto">
                {(topPages || []).length === 0 ? (
                  <p className="text-xs text-slate-500">No page data yet</p>
                ) : (
                  (topPages || []).map((page: any, i: number) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-sm text-white truncate mr-2">{page.route || "/"}</span>
                      <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">{page.views}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]">
              <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2 mb-4">
                <Smartphone className="w-4 h-4 text-pink-400" /> DEVICE BREAKDOWN
              </h3>
              {(devices || []).length === 0 ? (
                <p className="text-xs text-slate-500">No device data yet</p>
              ) : (
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={(devices || []).map((d: any) => ({ name: d.device || "Unknown", value: d.count }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {(devices || []).map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Legend formatter={(value: string) => <span className="text-xs text-slate-300">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]">
              <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-violet-400" /> BROWSER BREAKDOWN
              </h3>
              <div className="space-y-2 max-h-[240px] overflow-y-auto">
                {(browsers || []).length === 0 ? (
                  <p className="text-xs text-slate-500">No browser data yet</p>
                ) : (
                  (browsers || []).map((b: any, i: number) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-sm text-white">{b.browser || "Unknown"}</span>
                      <span className="text-xs font-mono text-violet-400">{b.count}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]">
            <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-emerald-400" /> GEOGRAPHIC DISTRIBUTION
            </h3>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={(geo || []).slice(0, 15)}>
                  <XAxis dataKey="country" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {(geo || []).slice(0, 15).map((_: any, index: number) => (
                      <Cell key={`geo-${index}`} fillOpacity={0.4 + Math.min(index * 0.08, 0.6)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6" data-testid="content-system">
          <BentoGrid>
            <BentoCard colSpan={2} rowSpan={2} className="bg-black/40 border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4" /> API REQUEST VOLUME
                </h3>
                <div className="flex gap-4 text-xs font-mono">
                  <span className="text-emerald-400">24h Peak: 15.2k req/s</span>
                  <span className="text-muted-foreground">Avg Latency: 42ms</span>
                </div>
              </div>
              
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic || []}>
                    <defs>
                      <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', fontFamily: 'monospace' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pageViews" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorReq)" 
                      strokeWidth={2}
                      name="Page Views"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </BentoCard>

            <BentoCard className="bg-white/5 border-white/5">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Cpu className="w-5 h-5 text-blue-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">CPU Load</span>
                    <span className="text-xl font-mono text-blue-400">12%</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Database className="w-5 h-5 text-purple-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">DB Conn</span>
                    <span className="text-xl font-mono text-purple-400">842</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Server className="w-5 h-5 text-orange-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Uptime</span>
                    <span className="text-xl font-mono text-orange-400">99.99%</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Globe className="w-5 h-5 text-cyan-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Edge</span>
                    <span className="text-xl font-mono text-cyan-400">Global</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="font-mono text-xs">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                <Terminal className="w-4 h-4" />
                <span>LATEST DEPLOYMENT</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-emerald-500" />
                  <span className="text-white">main</span>
                  <span className="opacity-50">7f2a1b...</span>
                </div>
                <div className="pl-7 opacity-70">
                  feat: implement AI wellness coach with ElevenLabs
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-500">Build Passing</span>
                  <span className="ml-auto opacity-50">2m ago</span>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="relative overflow-hidden">
              <h3 className="font-mono text-sm text-muted-foreground mb-4">ACTIVE NODES</h3>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={(geo || []).slice(0, 6)}>
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                      {(geo || []).slice(0, 6).map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fillOpacity={0.4 + (index * 0.1)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-xs font-mono mt-2 opacity-50">
                {(geo || []).slice(0, 6).map((g: any, i: number) => (
                  <span key={i}>{g.country || "—"}</span>
                ))}
              </div>
            </BentoCard>

            <BentoCard colSpan={2} className="bg-black/60 border-white/10">
              <h3 className="font-mono text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Code className="w-4 h-4" /> DEVELOPER CONSOLE
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => handleDevAction("Cache flush")} className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-flush-cache">
                  <span className="block text-xs text-muted-foreground mb-1">Cache</span>
                  <span className="text-sm font-mono group-hover:text-red-400">FLUSH ALL</span>
                </button>
                <button onClick={() => handleDevAction("Database migration")} className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-migrate-db">
                  <span className="block text-xs text-muted-foreground mb-1">Database</span>
                  <span className="text-sm font-mono group-hover:text-orange-400">MIGRATE</span>
                </button>
                <button onClick={() => handleDevAction("Log export")} className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-export-logs">
                  <span className="block text-xs text-muted-foreground mb-1">Logs</span>
                  <span className="text-sm font-mono group-hover:text-blue-400">EXPORT</span>
                </button>
                <button onClick={() => handleDevAction("System restart")} className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-restart-system">
                  <span className="block text-xs text-muted-foreground mb-1">System</span>
                  <span className="text-sm font-mono group-hover:text-emerald-400">RESTART</span>
                </button>
              </div>
            </BentoCard>
          </BentoGrid>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6" data-testid="content-docs">
          <BentoGrid>
            <BentoCard colSpan={3} className="bg-gradient-to-br from-violet-500/5 to-cyan-500/5 border-violet-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-violet-400" /> Documentation Hub
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "API Reference", icon: Code, desc: "REST endpoints and authentication", color: "cyan", href: null },
                  { title: "Integration Guides", icon: Zap, desc: "FHIR, HealthKit, Blockchain", color: "emerald", href: null },
                  { title: "Security & Compliance", icon: Shield, desc: "HIPAA, data protection policies", color: "pink", href: null },
                  { title: "Database Schema", icon: Database, desc: "Drizzle ORM models and relations", color: "violet", href: null },
                  { title: "Business Plan", icon: Target, desc: "Strategic overview and projections", color: "orange", href: "/business-plan" },
                  { title: "Employee Onboarding", icon: Users, desc: "Partner/staff welcome presentation", color: "pink", href: null },
                  { title: "Release Notes", icon: Calendar, desc: "Version history and changelog", color: "slate", href: null },
                ].map((doc) => {
                  const content = (
                    <motion.div
                      key={doc.title}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                        doc.color === "cyan" ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40" :
                        doc.color === "emerald" ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40" :
                        doc.color === "pink" ? "bg-pink-500/5 border-pink-500/20 hover:border-pink-500/40" :
                        doc.color === "violet" ? "bg-violet-500/5 border-violet-500/20 hover:border-violet-500/40" :
                        doc.color === "orange" ? "bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40" :
                        "bg-slate-500/5 border-slate-500/20 hover:border-slate-500/40"
                      }`}
                      data-testid={`doc-${doc.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          doc.color === "cyan" ? "bg-cyan-500/20" :
                          doc.color === "emerald" ? "bg-emerald-500/20" :
                          doc.color === "pink" ? "bg-pink-500/20" :
                          doc.color === "violet" ? "bg-violet-500/20" :
                          doc.color === "orange" ? "bg-orange-500/20" :
                          "bg-slate-500/20"
                        }`}>
                          <doc.icon className={`w-5 h-5 ${
                            doc.color === "cyan" ? "text-cyan-400" :
                            doc.color === "emerald" ? "text-emerald-400" :
                            doc.color === "pink" ? "text-pink-400" :
                            doc.color === "violet" ? "text-violet-400" :
                            doc.color === "orange" ? "text-orange-400" :
                            "text-slate-400"
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{doc.title}</h3>
                          <p className="text-xs text-slate-400">{doc.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </motion.div>
                  );
                  
                  return doc.href ? (
                    <Link key={doc.title} href={doc.href}>{content}</Link>
                  ) : (
                    <div key={doc.title}>{content}</div>
                  );
                })}
              </div>
            </BentoCard>

            <BentoCard colSpan={3} className="bg-gradient-to-br from-cyan-500/5 to-pink-500/5 border-cyan-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <ExternalLink className="w-5 h-5 text-cyan-400" /> External Resources & Links
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {externalResources.map((section) => (
                  <div key={section.category} className="space-y-3">
                    <h3 className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                      {section.category === "Mobile Development" && <Smartphone className="w-4 h-4 text-orange-400" />}
                      {section.category === "Video Consultations" && <Video className="w-4 h-4 text-cyan-400" />}
                      {section.category === "Integrations" && <Zap className="w-4 h-4 text-emerald-400" />}
                      {section.category === "Compliance" && <Shield className="w-4 h-4 text-pink-400" />}
                      {section.category}
                    </h3>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/10 hover:border-white/30 transition-all group"
                          data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div>
                            <span className="text-white group-hover:text-cyan-400 transition-colors">{item.name}</span>
                            <span className="block text-xs text-slate-500">{item.desc}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard colSpan={3} className="bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border-emerald-500/20">
              <SeoManager />
            </BentoCard>
          </BentoGrid>
        </TabsContent>

        <SubscribersTab />
        <InquiriesTab />
      </Tabs>
    </Shell>
  );
}

function InquiriesTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: inquiries, isLoading, error } = useQuery({
    queryKey: ["/api/practitioner-inquiries"],
    queryFn: async () => {
      const res = await fetch("/api/practitioner-inquiries");
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      return res.json();
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/practitioner-inquiries/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/practitioner-inquiries"] });
      toast({ title: "Status Updated" });
    },
  });

  const exportCSV = () => {
    if (!inquiries || inquiries.length === 0) return;
    const headers = ["Name", "Email", "Phone", "Modality", "License", "Experience", "Teledoc", "State", "Country", "Message", "Status", "Date"];
    const rows = inquiries.map((d: any) => [
      d.fullName, d.email, d.phone || "", d.modality, d.licenseNumber || "",
      d.yearsExperience || "", d.interestedInTeledoc ? "Yes" : "No",
      d.state || "", d.country || "", (d.message || "").replace(/,/g, ";"),
      d.status, new Date(d.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r: string[]) => r.map(v => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vedasolus-practitioner-inquiries-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const total = inquiries?.length || 0;
  const newCount = inquiries?.filter((d: any) => d.status === "new").length || 0;
  const teledocCount = inquiries?.filter((d: any) => d.interestedInTeledoc).length || 0;

  const statusColors: Record<string, string> = {
    new: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    contacted: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    approved: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    declined: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  return (
    <TabsContent value="inquiries" className="space-y-6" data-testid="content-inquiries">
      <BentoGrid>
        <BentoCard colSpan={3} className="bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 border-cyan-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-cyan-400" /> Practitioner Inquiries
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-400">Total: <span className="text-white font-medium">{total}</span></span>
                <span className="text-slate-400">New: <span className="text-cyan-400 font-medium">{newCount}</span></span>
                <span className="text-slate-400">Teledoc: <span className="text-emerald-400 font-medium">{teledocCount}</span></span>
              </div>
              <Button
                onClick={exportCSV}
                disabled={!inquiries || inquiries.length === 0}
                size="sm"
                variant="outline"
                className="border-cyan-500/30 hover:bg-cyan-500/10"
                data-testid="button-export-inquiries-csv"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading inquiries...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              Failed to load inquiries. Make sure you're logged in.
            </div>
          ) : inquiries?.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No practitioner inquiries yet.</p>
              <p className="text-xs mt-2">They'll appear here when someone submits a request through The Bazaar.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries?.map((inq: any) => (
                <div key={inq.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-semibold text-white">{inq.fullName}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[inq.status] || statusColors.new}`}>
                          {inq.status}
                        </span>
                        {inq.interestedInTeledoc && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <Video className="w-3 h-3" /> Teledoc
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {inq.email}
                        </span>
                        {inq.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {inq.phone}
                          </span>
                        )}
                        <span className="capitalize">{inq.modality?.replace(/_/g, " ")}</span>
                        {inq.licenseNumber && <span>License: {inq.licenseNumber}</span>}
                        {inq.yearsExperience && <span>{inq.yearsExperience} yrs exp</span>}
                        {inq.state && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {inq.state}{inq.country && inq.country !== "United States" ? `, ${inq.country}` : ""}
                          </span>
                        )}
                      </div>
                      {inq.message && (
                        <p className="text-xs text-slate-500 mt-2 italic line-clamp-2">"{inq.message}"</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={inq.status}
                        onChange={(e) => updateStatus.mutate({ id: inq.id, status: e.target.value })}
                        className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-cyan-500/50"
                        data-testid={`select-status-${inq.id}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                      </select>
                      <span className="text-[10px] text-slate-500">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </BentoCard>
      </BentoGrid>
    </TabsContent>
  );
}

function SubscribersTab() {
  const { data: disclaimers, isLoading, error } = useQuery({
    queryKey: ["/api/disclaimers"],
    queryFn: async () => {
      const res = await fetch("/api/disclaimers");
      if (!res.ok) throw new Error("Failed to fetch subscribers");
      return res.json();
    },
  });

  const exportCSV = () => {
    if (!disclaimers || disclaimers.length === 0) return;
    
    const headers = ["Name", "Email", "Marketing Opt-In", "Acknowledged At"];
    const rows = disclaimers.map((d: any) => [
      d.name,
      d.email,
      d.marketingOptIn ? "Yes" : "No",
      new Date(d.acknowledgedAt).toLocaleString(),
    ]);
    
    const csv = [headers.join(","), ...rows.map((r: string[]) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vedasolus-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const optedIn = disclaimers?.filter((d: any) => d.marketingOptIn).length || 0;
  const total = disclaimers?.length || 0;

  return (
    <TabsContent value="subscribers" className="space-y-6" data-testid="content-subscribers">
      <BentoGrid>
        <BentoCard colSpan={3} className="bg-gradient-to-br from-orange-500/5 to-pink-500/5 border-orange-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-400" /> Email Subscribers
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-400">Total: <span className="text-white font-medium">{total}</span></span>
                <span className="text-slate-400">Opted In: <span className="text-emerald-400 font-medium">{optedIn}</span></span>
              </div>
              <Button
                onClick={exportCSV}
                disabled={!disclaimers || disclaimers.length === 0}
                size="sm"
                variant="outline"
                className="border-orange-500/30 hover:bg-orange-500/10"
                data-testid="button-export-csv"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading subscribers...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              Failed to load subscribers. Make sure you're logged in.
            </div>
          ) : disclaimers?.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No subscribers yet. They'll appear here after acknowledging the medical disclaimer.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Email</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-slate-400 uppercase">Marketing</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {disclaimers?.map((d: any) => (
                    <tr key={d.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-sm text-white">{d.name}</td>
                      <td className="py-3 px-4 text-sm text-cyan-400 font-mono">{d.email}</td>
                      <td className="py-3 px-4 text-center">
                        {d.marketingOptIn ? (
                          <CheckCheck className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-400">
                        {new Date(d.acknowledgedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </BentoCard>
      </BentoGrid>
    </TabsContent>
  );
}
