import { Shell } from "@/components/layout/Shell";
import { BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { 
  FileText, 
  Shield, 
  Zap, 
  Globe, 
  Heart, 
  Brain,
  Leaf,
  Users,
  Wallet,
  Lock,
  ChevronRight,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function WhitePaper() {
  return (
    <Shell>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-500/30">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">VedaSolus White Paper</h1>
              <p className="text-cyan-300/70 text-sm">Version 2.1 • December 2024</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5" data-testid="button-download-whitepaper">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5" data-testid="button-share-whitepaper">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        <BentoCard className="bg-gradient-to-br from-cyan-500/10 to-violet-500/5 border-cyan-500/20">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-cyan-400" /> Abstract
          </h2>
          <div className="text-sm text-slate-300 leading-relaxed space-y-4">
            <p>
              <strong className="text-white">VedaSolus</strong> represents a paradigm shift in personal wellness technology, 
              bridging the wisdom of ancient Eastern healing traditions with cutting-edge Western scientific validation.
            </p>
            <p>
              Our platform leverages artificial intelligence, blockchain technology, and evidence-based health tracking 
              to create a personalized wellness experience that honors both traditional knowledge systems and modern 
              medical understanding.
            </p>
            <p>
              This white paper outlines our vision, technology architecture, and roadmap for building the world's 
              most comprehensive holistic health ecosystem.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-emerald-400" /> The Problem
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4 text-sm text-slate-300">
              <p>Modern healthcare faces a crisis of disconnection:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Western medicine treats symptoms, not root causes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Eastern wisdom lacks scientific validation and accessibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Health data is fragmented across siloed systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Patients lack ownership of their health records</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-2xl font-bold text-emerald-400 mb-2">$4.5 Trillion</p>
              <p className="text-sm text-slate-400">Annual global wellness market, yet chronic disease rates continue to rise</p>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-violet-500/20">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-violet-400" /> Our Solution
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Leaf, 
                title: "Eastern Wisdom Engine", 
                desc: "AI-powered Ayurvedic dosha analysis, TCM meridian tracking, and personalized lifestyle recommendations based on constitutional type.",
                color: "emerald"
              },
              { 
                icon: Shield, 
                title: "Blockchain Health Passport", 
                desc: "Self-sovereign health identity with verified credentials, portable medical records, and privacy-preserving data sharing.",
                color: "cyan"
              },
              { 
                icon: Users, 
                title: "Practitioner Marketplace", 
                desc: "Verified holistic health practitioners offering consultations, with integrated booking, payments, and video calls.",
                color: "pink"
              },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <item.icon className={`w-8 h-8 text-${item.color}-400 mb-3`} />
                <h4 className="font-medium text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-orange-400" /> Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-orange-300 mb-3">Frontend & Mobile</h4>
              <ul className="space-y-2 text-slate-300">
                <li>React 18 + TypeScript for web application</li>
                <li>React Native / Expo for iOS and Android</li>
                <li>TailwindCSS for responsive, accessible UI</li>
                <li>Framer Motion for fluid animations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-300 mb-3">Backend & AI</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Node.js + Express API server</li>
                <li>PostgreSQL with Drizzle ORM</li>
                <li>OpenAI GPT-4 for wellness coaching</li>
                <li>ElevenLabs for voice synthesis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-300 mb-3">Blockchain</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Dark Wave Smart Chain (planned)</li>
                <li>NFT health credential verification</li>
                <li>Decentralized identity (DID) standards</li>
                <li>IPFS for distributed storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-300 mb-3">Integrations</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Stripe for payments & subscriptions</li>
                <li>Firebase for authentication</li>
                <li>FHIR for medical record interoperability</li>
                <li>Apple HealthKit / Google Fit sync</li>
              </ul>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 border-pink-500/20">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-pink-400" /> Token Economics (Future)
          </h2>
          <div className="text-sm text-slate-300 space-y-4">
            <p>
              VedaSolus plans to introduce a utility token (VEDA) to power the ecosystem:
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Staking Rewards", value: "35%", desc: "Health streak incentives" },
                { label: "Practitioner Payments", value: "25%", desc: "Consultation fees" },
                { label: "Community Treasury", value: "20%", desc: "DAO governance" },
                { label: "Team & Development", value: "20%", desc: "Vested over 4 years" },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-white/5 rounded-lg text-center">
                  <p className="text-2xl font-bold text-pink-400">{item.value}</p>
                  <p className="text-xs font-medium text-white">{item.label}</p>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-slate-500/10 to-zinc-500/5 border-slate-500/20">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-slate-400" /> Privacy & Security
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Data Protection</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>End-to-end encryption for all health data</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Zero-knowledge proofs for credential verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>GDPR and HIPAA compliance roadmap</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-white">User Control</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>Users own and control their health data</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>Granular permission controls for data sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>Right to deletion and data portability</span>
                </li>
              </ul>
            </div>
          </div>
        </BentoCard>

        <div className="flex justify-center gap-4 pt-4">
          <Link href="/business-plan">
            <Button className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600">
              View Business Plan <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/developer">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              Developer Roadmap <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Shell>
  );
}
