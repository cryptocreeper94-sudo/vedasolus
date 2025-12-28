import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Calendar, Clock, CreditCard, Video, MapPin, Check } from "lucide-react";

interface BookingDialogProps {
  practitioner: {
    id: number | string;
    name: string;
    title: string;
    specialty: string;
    hourlyRate?: number;
    availableRemote?: boolean;
  };
  onBook?: (booking: BookingData) => void;
  trigger?: React.ReactNode;
}

interface BookingData {
  practitionerId: string | number;
  date: string;
  time: string;
  duration: number;
  type: "remote" | "in-person";
  notes: string;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

export function BookingDialog({ practitioner, onBook, trigger }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    date: "",
    time: "",
    duration: 60,
    type: "remote" as "remote" | "in-person",
    notes: ""
  });

  const handleSubmit = () => {
    if (onBook) {
      onBook({
        practitionerId: practitioner.id,
        ...form
      });
    }
    setStep(3);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
      setForm({ date: "", time: "", duration: 60, type: "remote", notes: "" });
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
      else setOpen(true);
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid={`button-book-${practitioner.id}`}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 hover:border-primary/30 transition-all font-medium text-sm flex items-center justify-center gap-2"
          >
            Book Consultation
          </motion.button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-serif">
            <Calendar className="w-5 h-5 text-primary" />
            {step === 3 ? "Booking Confirmed" : `Book with ${practitioner.name}`}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 py-4"
          >
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="font-medium">{practitioner.title}</p>
              <p className="text-sm text-muted-foreground">{practitioner.specialty}</p>
              {practitioner.hourlyRate && (
                <p className="text-primary font-bold mt-2">${practitioner.hourlyRate}/hr</p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Select Date</label>
              <input 
                type="date" 
                value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                data-testid="input-booking-date"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">Select Time</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setForm({ ...form, time: slot })}
                    data-testid={`button-time-${slot.replace(/\s/g, '-')}`}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      form.time === slot 
                        ? "bg-primary text-white shadow-lg shadow-primary/30" 
                        : "bg-white/5 text-muted-foreground hover:bg-white/10"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">Session Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setForm({ ...form, type: "remote" })}
                  data-testid="button-type-remote"
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    form.type === "remote"
                      ? "bg-primary/20 border-2 border-primary"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Video className={`w-6 h-6 ${form.type === "remote" ? "text-primary" : ""}`} />
                  <span className="text-sm font-medium">Video Call</span>
                </button>
                <button
                  onClick={() => setForm({ ...form, type: "in-person" })}
                  data-testid="button-type-in-person"
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    form.type === "in-person"
                      ? "bg-primary/20 border-2 border-primary"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <MapPin className={`w-6 h-6 ${form.type === "in-person" ? "text-primary" : ""}`} />
                  <span className="text-sm font-medium">In Person</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.date || !form.time}
              data-testid="button-continue-booking"
              className="w-full py-3 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 py-4"
          >
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{form.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{form.type === "remote" ? "Video Call" : "In Person"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">60 minutes</span>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Notes for Practitioner (Optional)</label>
              <textarea 
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="What would you like to discuss?"
                data-testid="input-booking-notes"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 h-20 resize-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${practitioner.hourlyRate || 150}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                data-testid="button-confirm-booking"
                className="flex-1 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" /> Pay & Book
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
              Your session with {practitioner.name} is scheduled for<br />
              <span className="text-white font-medium">
                {new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {form.time}
              </span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              You'll receive a confirmation email with {form.type === "remote" ? "video call link" : "location details"}.
            </p>
            <button
              onClick={handleClose}
              data-testid="button-close-confirmation"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
