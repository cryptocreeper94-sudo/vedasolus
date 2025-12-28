import React, { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Upload, FileText, Link2, Building2, Shield, Check, AlertCircle, Download, Eye, Trash2, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface HealthRecord {
  id: string;
  name: string;
  type: string;
  source: string;
  date: string;
  status: "verified" | "pending" | "unverified";
}

const sampleRecords: HealthRecord[] = [
  { id: "1", name: "Annual Physical 2024", type: "Lab Results", source: "Austin Wellness Clinic", date: "2024-11-15", status: "verified" },
  { id: "2", name: "Lipid Panel", type: "Lab Results", source: "Quest Diagnostics", date: "2024-10-22", status: "verified" },
  { id: "3", name: "Vaccination Record", type: "Immunization", source: "Manual Upload", date: "2024-09-10", status: "pending" },
];

const healthProviders = [
  { id: "epic", name: "Epic MyChart", logo: "🏥", connected: true },
  { id: "cerner", name: "Cerner Health", logo: "🩺", connected: false },
  { id: "allscripts", name: "AllScripts", logo: "📋", connected: false },
  { id: "athena", name: "AthenaHealth", logo: "⚕️", connected: false },
  { id: "apple", name: "Apple Health", logo: "🍎", connected: true },
  { id: "fitbit", name: "Fitbit", logo: "⌚", connected: false },
];

export default function HealthRecords() {
  const [records, setRecords] = useState(sampleRecords);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: "Document",
        source: "Manual Upload",
        date: new Date().toISOString().split("T")[0],
        status: "pending"
      };
      setRecords([newRecord, ...records]);
      setUploadDialogOpen(false);
      toast({
        title: "Record Uploaded",
        description: "Your health record is being processed for verification.",
      });
    }
  };

  const handleConnect = (providerId: string) => {
    toast({
      title: "Connection Initiated",
      description: "You'll be redirected to authorize access to your health records.",
    });
    setConnectDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
    toast({
      title: "Record Removed",
      description: "The health record has been removed from your profile.",
    });
  };

  if (!isAuthenticated) {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-2">Sign in to Access Records</h2>
          <p className="text-muted-foreground max-w-md">
            Your health records are encrypted and only accessible when you're signed in.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-medium mb-2">Health Records</h1>
            <p className="text-muted-foreground">Import, manage, and verify your health documentation.</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="button-connect-provider"
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
                >
                  <Link2 className="w-4 h-4" /> Connect Provider
                </motion.button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl font-serif">
                    <Building2 className="w-5 h-5 text-primary" /> Connect Health Provider
                  </DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground mb-4">
                  Securely connect to your healthcare providers to automatically import your medical records.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {healthProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => !provider.connected && handleConnect(provider.id)}
                      disabled={provider.connected}
                      data-testid={`button-provider-${provider.id}`}
                      className={`p-4 rounded-xl text-left transition-all ${
                        provider.connected
                          ? "bg-emerald-500/10 border border-emerald-500/30"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{provider.logo}</span>
                        {provider.connected && <Check className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className="font-medium text-sm">{provider.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {provider.connected ? "Connected" : "Click to connect"}
                      </p>
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="button-upload-record"
                  className="px-5 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl font-medium flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Upload Record
                </motion.button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl font-serif">
                    <FileText className="w-5 h-5 text-primary" /> Upload Health Record
                  </DialogTitle>
                </DialogHeader>
                <div className="py-6">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/20 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="font-medium mb-1">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      data-testid="input-file-upload"
                    />
                  </label>
                  <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
                    <p className="text-xs text-amber-200">
                      Uploaded records will be reviewed for verification. Verified records can be shared with practitioners.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Connected Providers */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" /> Connected Sources
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {healthProviders.filter(p => p.connected).map((provider) => (
            <div
              key={provider.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 min-w-fit"
            >
              <span className="text-xl">{provider.logo}</span>
              <div>
                <p className="font-medium text-sm">{provider.name}</p>
                <p className="text-xs text-emerald-300">Syncing automatically</p>
              </div>
            </div>
          ))}
          <button
            onClick={() => setConnectDialogOpen(true)}
            data-testid="button-add-source"
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/20 hover:border-primary/50 transition-colors min-w-fit"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Source</span>
          </button>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Your Records
        </h2>
        
        {records.length === 0 ? (
          <div className="p-12 rounded-3xl border border-dashed border-white/20 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-medium mb-2">No records yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your health records or connect to a provider to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {records.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-between"
                data-testid={`record-${record.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{record.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{record.type}</span>
                      <span>•</span>
                      <span>{record.source}</span>
                      <span>•</span>
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    record.status === "verified" 
                      ? "bg-emerald-500/20 text-emerald-300"
                      : record.status === "pending"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-white/10 text-muted-foreground"
                  }`}>
                    {record.status === "verified" && <Shield className="w-3 h-3" />}
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  <button
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    data-testid={`button-view-${record.id}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    data-testid={`button-download-${record.id}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                    data-testid={`button-delete-${record.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Blockchain Verification Info */}
      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Blockchain Verification</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Verified records are cryptographically signed and can be independently verified by practitioners. 
              Your data remains private - only verification status is stored on-chain.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>2 records verified on-chain</span>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
