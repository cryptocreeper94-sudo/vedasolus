import { useState, useEffect } from "react";
import { User, Bell, Shield, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useProfile } from "@/hooks/use-profile";
import { useNotificationPreferences } from "@/hooks/use-notifications";
import { useAuth } from "@/hooks/use-auth";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, isAuthenticated } = useAuth();
  const { profile, isLoading: profileLoading, saveProfile, isSaving: profileSaving } = useProfile();
  const { preferences, isLoading: prefsLoading, savePreferences, isSaving: prefsSaving } = useNotificationPreferences();

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    displayName: "",
    location: "",
    heightCm: "",
    weightKg: "",
    dateOfBirth: "",
    doshaType: "Pitta-Vata",
  });

  // Notification form state
  const [notificationForm, setNotificationForm] = useState({
    appointmentReminders: true,
    dailyWisdom: true,
    marketplaceUpdates: true,
    systemAlerts: true,
  });

  // Load profile data when available
  useEffect(() => {
    if (profile) {
      setProfileForm({
        displayName: profile.displayName || "",
        location: profile.location || "",
        heightCm: profile.heightCm?.toString() || "",
        weightKg: profile.weightKg?.toString() || "",
        dateOfBirth: profile.dateOfBirth || "",
        doshaType: profile.doshaType || "Pitta-Vata",
      });
    }
  }, [profile]);

  // Load notification preferences when available
  useEffect(() => {
    if (preferences) {
      setNotificationForm({
        appointmentReminders: preferences.appointmentReminders ?? true,
        dailyWisdom: preferences.dailyWisdom ?? true,
        marketplaceUpdates: preferences.marketplaceUpdates ?? true,
        systemAlerts: preferences.systemAlerts ?? true,
      });
    }
  }, [preferences]);

  const handleProfileSave = () => {
    saveProfile({
      displayName: profileForm.displayName || null,
      location: profileForm.location || null,
      heightCm: profileForm.heightCm ? parseInt(profileForm.heightCm) : null,
      weightKg: profileForm.weightKg ? parseInt(profileForm.weightKg) : null,
      dateOfBirth: profileForm.dateOfBirth || null,
      doshaType: profileForm.doshaType || null,
    });
  };

  const handleNotificationSave = () => {
    savePreferences(notificationForm);
  };

  const toggleNotification = (key: keyof typeof notificationForm) => {
    const newForm = { ...notificationForm, [key]: !notificationForm[key] };
    setNotificationForm(newForm);
    savePreferences(newForm);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Please sign in to view settings</h2>
          <a 
            href="/api/login"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Configure your experience</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Shield },
            { id: "wallet", label: "Wallet", icon: Wallet }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`button-${tab.id}-tab`}
              className={`px-6 py-3 rounded-2xl font-medium text-sm flex items-center gap-2 transition-all ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(236,72,153,0.3)]" 
                  : "glass-card border border-white/10 hover:border-primary/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === "profile" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
               <div className="p-6 rounded-3xl glass-card border border-white/10">
                  <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Bio-Metric Profile
                  </h2>
                  
                  {profileLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading profile...</div>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-4">
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Display Name</label>
                              <input 
                                type="text" 
                                value={profileForm.displayName}
                                onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                                data-testid="input-display-name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                              <input 
                                type="email" 
                                value={user?.email || ""}
                                disabled
                                data-testid="input-email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 opacity-50 cursor-not-allowed" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Location</label>
                              <input 
                                type="text" 
                                value={profileForm.location}
                                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                                data-testid="input-location"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" 
                              />
                            </div>
                         </div>
                         
                         <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                 <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Height (cm)</label>
                                 <input 
                                   type="number" 
                                   value={profileForm.heightCm}
                                   onChange={(e) => setProfileForm({ ...profileForm, heightCm: e.target.value })}
                                   data-testid="input-height"
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" 
                                 />
                               </div>
                               <div>
                                 <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Weight (kg)</label>
                                 <input 
                                   type="number" 
                                   value={profileForm.weightKg}
                                   onChange={(e) => setProfileForm({ ...profileForm, weightKg: e.target.value })}
                                   data-testid="input-weight"
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" 
                                 />
                               </div>
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Date of Birth</label>
                              <input 
                                type="date" 
                                value={profileForm.dateOfBirth}
                                onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                                data-testid="input-dob"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Dosha Type</label>
                              <select 
                                value={profileForm.doshaType}
                                onChange={(e) => setProfileForm({ ...profileForm, doshaType: e.target.value })}
                                data-testid="select-dosha"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white"
                              >
                                <option>Pitta-Vata</option>
                                <option>Vata-Kapha</option>
                                <option>Kapha-Pitta</option>
                                <option>Tri-Dosha</option>
                              </select>
                            </div>
                         </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                         <button 
                           onClick={handleProfileSave}
                           disabled={profileSaving}
                           data-testid="button-save-profile"
                           className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                           {profileSaving ? "Saving..." : "Save Changes"}
                         </button>
                      </div>
                    </>
                  )}
               </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
               <div className="p-6 rounded-3xl glass-card border border-white/10">
                  <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" /> Alert Preferences
                  </h2>
                  
                  {prefsLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading preferences...</div>
                  ) : (
                    <div className="space-y-6">
                       {[
                         { key: "appointmentReminders" as const, title: "Appointment Reminders", desc: "Get notified 1 hour before scheduled sessions." },
                         { key: "dailyWisdom" as const, title: "Daily Wisdom", desc: "Morning briefing with Qi/Dosha insights." },
                         { key: "marketplaceUpdates" as const, title: "Marketplace Updates", desc: "New healers or tribe activity in your network." },
                         { key: "systemAlerts" as const, title: "System Alerts", desc: "Security, login attempts, and blockchain verification." }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div>
                              <h3 className="font-medium text-sm">{item.title}</h3>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => toggleNotification(item.key)}
                              data-testid={`toggle-notification-${i}`}
                              className={`relative inline-block w-12 h-6 rounded-full border transition-all ${
                                notificationForm[item.key]
                                  ? "bg-emerald-500/20 border-emerald-500/50"
                                  : "bg-white/10 border-white/20"
                              }`}
                            >
                              <div 
                                className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                                  notificationForm[item.key]
                                    ? "right-1 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                    : "left-1 bg-gray-400"
                                }`}
                              />
                            </button>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
               <div className="p-6 rounded-3xl glass-card border border-white/10">
                  <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" /> Security Settings
                  </h2>
                  <p className="text-sm text-muted-foreground">Two-factor authentication, session management, and access logs coming soon.</p>
               </div>
            </motion.div>
          )}

          {activeTab === "wallet" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
               <div className="p-6 rounded-3xl glass-card border border-white/10">
                  <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" /> Wallet Management
                  </h2>
                  <p className="text-sm text-muted-foreground">Crypto wallet integration and payment methods coming soon.</p>
               </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
