import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, BellOff, Moon, Utensils, Dumbbell, Leaf, MessageCircle, Calendar, Clock, Save, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  time?: string;
}

export function NotificationSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { id: "sleep_reminder", label: "Sleep Reminder", description: "Reminds you to start winding down", icon: Moon, enabled: true, time: "21:00" },
    { id: "meal_logging", label: "Meal Logging", description: "Prompts to log your meals", icon: Utensils, enabled: true, time: "12:00" },
    { id: "exercise_nudge", label: "Movement Nudge", description: "Encourages daily physical activity", icon: Dumbbell, enabled: true, time: "08:00" },
    { id: "daily_insight", label: "Daily Wisdom", description: "Ayurvedic insights for your dosha", icon: Leaf, enabled: true, time: "07:00" },
    { id: "practitioner_messages", label: "Practitioner Messages", description: "Messages from your practitioners", icon: MessageCircle, enabled: true },
    { id: "appointment_reminders", label: "Appointment Reminders", description: "Upcoming session notifications", icon: Calendar, enabled: true },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(prev => prev.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const updateTime = (id: string, time: string) => {
    setPreferences(prev => prev.map(p => 
      p.id === id ? { ...p, time } : p
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaving(false);
    toast({
      title: "Preferences Saved",
      description: "Your notification settings have been updated.",
    });
  };

  const enabledCount = preferences.filter(p => p.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Notification Preferences</h3>
            <p className="text-xs text-muted-foreground">{enabledCount} of {preferences.length} enabled</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          data-testid="button-save-notifications"
          className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {saving ? <Clock className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save"}
        </motion.button>
      </div>

      <div className="space-y-3">
        {preferences.map((pref, index) => (
          <motion.div
            key={pref.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-2xl border transition-all ${
              pref.enabled 
                ? "bg-white/5 border-white/10" 
                : "bg-black/20 border-white/5 opacity-60"
            }`}
            data-testid={`notification-${pref.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${pref.enabled ? "bg-primary/20" : "bg-white/5"}`}>
                  <pref.icon className={`w-4 h-4 ${pref.enabled ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{pref.label}</h4>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {pref.time && pref.enabled && (
                  <input
                    type="time"
                    value={pref.time}
                    onChange={(e) => updateTime(pref.id, e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-xs text-muted-foreground"
                    data-testid={`time-${pref.id}`}
                  />
                )}
                <Switch
                  checked={pref.enabled}
                  onCheckedChange={() => togglePreference(pref.id)}
                  data-testid={`switch-${pref.id}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <BellOff className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">Quiet Hours</h4>
            <p className="text-xs text-muted-foreground mb-2">
              No notifications between 10 PM and 7 AM to respect your rest.
            </p>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-emerald-300">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
