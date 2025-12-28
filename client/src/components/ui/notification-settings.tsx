import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, BellOff, Moon, Utensils, Dumbbell, Leaf, MessageCircle, Calendar, Clock, Save, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNotificationPreferences } from "@/hooks/use-notifications";

interface NotificationItem {
  id: keyof typeof prefKeyMap;
  label: string;
  description: string;
  icon: React.ElementType;
  time?: string;
}

const prefKeyMap = {
  sleep_reminder: "dailyWisdom",
  meal_logging: "marketplaceUpdates",
  exercise_nudge: "systemAlerts",
  daily_insight: "dailyWisdom",
  practitioner_messages: "appointmentReminders",
  appointment_reminders: "appointmentReminders",
} as const;

const notificationItems: NotificationItem[] = [
  { id: "sleep_reminder", label: "Sleep Reminder", description: "Reminds you to start winding down", icon: Moon, time: "21:00" },
  { id: "meal_logging", label: "Meal Logging", description: "Prompts to log your meals", icon: Utensils, time: "12:00" },
  { id: "exercise_nudge", label: "Movement Nudge", description: "Encourages daily physical activity", icon: Dumbbell, time: "08:00" },
  { id: "daily_insight", label: "Daily Wisdom", description: "Ayurvedic insights for your dosha", icon: Leaf, time: "07:00" },
  { id: "practitioner_messages", label: "Practitioner Messages", description: "Messages from your practitioners", icon: MessageCircle },
  { id: "appointment_reminders", label: "Appointment Reminders", description: "Upcoming session notifications", icon: Calendar },
];

export function NotificationSettings() {
  const { preferences, isLoading, savePreferences, isSaving } = useNotificationPreferences();
  
  const [localPrefs, setLocalPrefs] = useState({
    appointmentReminders: true,
    dailyWisdom: true,
    marketplaceUpdates: true,
    systemAlerts: true,
  });

  useEffect(() => {
    if (preferences) {
      setLocalPrefs({
        appointmentReminders: preferences.appointmentReminders ?? true,
        dailyWisdom: preferences.dailyWisdom ?? true,
        marketplaceUpdates: preferences.marketplaceUpdates ?? true,
        systemAlerts: preferences.systemAlerts ?? true,
      });
    }
  }, [preferences]);

  const isEnabled = (itemId: keyof typeof prefKeyMap): boolean => {
    const prefKey = prefKeyMap[itemId];
    return localPrefs[prefKey as keyof typeof localPrefs] ?? true;
  };

  const togglePreference = (itemId: keyof typeof prefKeyMap) => {
    const prefKey = prefKeyMap[itemId] as keyof typeof localPrefs;
    const newPrefs = { ...localPrefs, [prefKey]: !localPrefs[prefKey] };
    setLocalPrefs(newPrefs);
    savePreferences(newPrefs);
  };

  const enabledCount = Object.values(localPrefs).filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Notification Preferences</h3>
            <p className="text-xs text-muted-foreground">{enabledCount} of 4 categories enabled</p>
          </div>
        </div>
        {isSaving && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 animate-spin" />
            Saving...
          </div>
        )}
      </div>

      <div className="space-y-3">
        {notificationItems.map((item, index) => {
          const enabled = isEnabled(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-2xl border transition-all ${
                enabled 
                  ? "bg-white/5 border-white/10" 
                  : "bg-black/20 border-white/5 opacity-60"
              }`}
              data-testid={`notification-${item.id}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${enabled ? "bg-primary/20" : "bg-white/5"}`}>
                    <item.icon className={`w-4 h-4 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.time && enabled && (
                    <span className="text-xs text-muted-foreground bg-black/30 px-2 py-1 rounded-lg">
                      {item.time}
                    </span>
                  )}
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => togglePreference(item.id)}
                    data-testid={`switch-${item.id}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
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
