import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Plus, Moon, Utensils, Activity, Droplets, X } from "lucide-react";

interface SleepEntryDialogProps {
  onSubmit: (data: { date: string; hoursSlept: number; quality: number; notes?: string }) => void;
  isLoading?: boolean;
  trigger?: React.ReactNode;
}

export function SleepEntryDialog({ onSubmit, isLoading, trigger }: SleepEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    hoursSlept: 7,
    quality: 3,
    notes: ""
  });

  const handleSubmit = () => {
    onSubmit(form);
    setOpen(false);
    setForm({ date: new Date().toISOString().split('T')[0], hoursSlept: 7, quality: 3, notes: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-add-sleep"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-medium flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <Plus className="w-5 h-5" /> Log Sleep
          </motion.button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-serif">
            <Moon className="w-5 h-5 text-purple-400" /> Log Sleep
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Date</label>
            <input 
              type="date" 
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              data-testid="input-sleep-date"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white"
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Hours Slept</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" 
                max="12" 
                step="0.5"
                value={form.hoursSlept}
                onChange={(e) => setForm({ ...form, hoursSlept: parseFloat(e.target.value) })}
                className="flex-1 accent-purple-500"
              />
              <span className="text-2xl font-bold text-purple-300 w-16 text-right">{form.hoursSlept}h</span>
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">Sleep Quality</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((q) => (
                <button
                  key={q}
                  onClick={() => setForm({ ...form, quality: q })}
                  data-testid={`button-quality-${q}`}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                    form.quality === q 
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Notes (Optional)</label>
            <textarea 
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="How did you feel? Any dreams?"
              data-testid="input-sleep-notes"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 h-20 resize-none"
            />
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          data-testid="button-save-sleep"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Sleep Log"}
        </button>
      </DialogContent>
    </Dialog>
  );
}

interface MealEntryDialogProps {
  onSubmit: (data: { date: string; mealType: string; items: string[]; calories: number; notes?: string }) => void;
  isLoading?: boolean;
  trigger?: React.ReactNode;
}

export function MealEntryDialog({ onSubmit, isLoading, trigger }: MealEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    mealType: "lunch",
    items: "",
    calories: 400,
    notes: ""
  });

  const handleSubmit = () => {
    onSubmit({
      ...form,
      items: form.items.split(',').map(i => i.trim()).filter(Boolean)
    });
    setOpen(false);
    setForm({ date: new Date().toISOString().split('T')[0], mealType: "lunch", items: "", calories: 400, notes: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-add-meal"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-medium flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" /> Log Meal
          </motion.button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-serif">
            <Utensils className="w-5 h-5 text-emerald-400" /> Log Meal
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Date</label>
              <input 
                type="date" 
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                data-testid="input-meal-date"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Meal Type</label>
              <select 
                value={form.mealType}
                onChange={(e) => setForm({ ...form, mealType: e.target.value })}
                data-testid="select-meal-type"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 text-white"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Food Items</label>
            <textarea 
              value={form.items}
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              placeholder="Enter foods separated by commas: Rice, Chicken, Vegetables..."
              data-testid="input-meal-items"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 h-20 resize-none"
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Estimated Calories</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="50" 
                max="1500" 
                step="50"
                value={form.calories}
                onChange={(e) => setForm({ ...form, calories: parseInt(e.target.value) })}
                className="flex-1 accent-emerald-500"
              />
              <span className="text-2xl font-bold text-emerald-300 w-24 text-right">{form.calories} kcal</span>
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Notes (Optional)</label>
            <textarea 
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="How did you feel after eating?"
              data-testid="input-meal-notes"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 h-16 resize-none"
            />
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          data-testid="button-save-meal"
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Meal Log"}
        </button>
      </DialogContent>
    </Dialog>
  );
}

interface ExerciseEntryDialogProps {
  onSubmit: (data: { date: string; activityType: string; durationMinutes: number; intensity: string; notes?: string }) => void;
  isLoading?: boolean;
  trigger?: React.ReactNode;
}

export function ExerciseEntryDialog({ onSubmit, isLoading, trigger }: ExerciseEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    activityType: "walking",
    durationMinutes: 30,
    intensity: "moderate",
    notes: ""
  });

  const handleSubmit = () => {
    onSubmit(form);
    setOpen(false);
    setForm({ date: new Date().toISOString().split('T')[0], activityType: "walking", durationMinutes: 30, intensity: "moderate", notes: "" });
  };

  const activities = [
    { id: "walking", label: "Walking" },
    { id: "running", label: "Running" },
    { id: "yoga", label: "Yoga" },
    { id: "strength", label: "Strength" },
    { id: "cycling", label: "Cycling" },
    { id: "swimming", label: "Swimming" },
    { id: "hiit", label: "HIIT" },
    { id: "qigong", label: "Qi Gong" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-add-exercise"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-medium flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-5 h-5" /> Log Workout
          </motion.button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-serif">
            <Activity className="w-5 h-5 text-cyan-400" /> Log Workout
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Date</label>
            <input 
              type="date" 
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              data-testid="input-exercise-date"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 text-white"
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">Activity Type</label>
            <div className="grid grid-cols-4 gap-2">
              {activities.map((act) => (
                <button
                  key={act.id}
                  onClick={() => setForm({ ...form, activityType: act.id })}
                  data-testid={`button-activity-${act.id}`}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                    form.activityType === act.id 
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Duration</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="5" 
                max="180" 
                step="5"
                value={form.durationMinutes}
                onChange={(e) => setForm({ ...form, durationMinutes: parseInt(e.target.value) })}
                className="flex-1 accent-cyan-500"
              />
              <span className="text-2xl font-bold text-cyan-300 w-20 text-right">{form.durationMinutes} min</span>
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">Intensity</label>
            <div className="flex gap-2">
              {["low", "moderate", "high"].map((int) => (
                <button
                  key={int}
                  onClick={() => setForm({ ...form, intensity: int })}
                  data-testid={`button-intensity-${int}`}
                  className={`flex-1 py-3 rounded-xl font-medium capitalize transition-all ${
                    form.intensity === int 
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  {int}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Notes (Optional)</label>
            <textarea 
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="How was your workout?"
              data-testid="input-exercise-notes"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 h-16 resize-none"
            />
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          data-testid="button-save-exercise"
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Workout"}
        </button>
      </DialogContent>
    </Dialog>
  );
}

interface WaterEntryDialogProps {
  onAddWater: (amount: number) => void;
  currentAmount: number;
  goalAmount?: number;
}

export function WaterTracker({ onAddWater, currentAmount, goalAmount = 2.5 }: WaterEntryDialogProps) {
  const percentage = Math.min((currentAmount / goalAmount) * 100, 100);
  
  return (
    <div className="p-4 rounded-3xl glass-panel">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-400" /> Hydration
        </h4>
        <span className="text-xs text-muted-foreground">{currentAmount.toFixed(1)}L / {goalAmount}L</span>
      </div>
      
      <div className="relative h-48 w-full bg-blue-900/20 rounded-2xl overflow-hidden flex items-end justify-center">
        <motion.div 
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-500/60 to-blue-400/30"
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-blue-400/20 blur-xl" style={{ height: `${percentage}%` }} />
        <div className="relative z-10 mb-8 text-center">
          <span className="text-3xl font-bold">{currentAmount.toFixed(1)}</span>
          <span className="text-sm opacity-70 block">Liters</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[0.25, 0.5, 1].map((amount) => (
          <button
            key={amount}
            onClick={() => onAddWater(amount)}
            data-testid={`button-water-${amount}`}
            className="py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-xl transition-colors font-medium text-sm"
          >
            +{amount}L
          </button>
        ))}
      </div>
    </div>
  );
}
