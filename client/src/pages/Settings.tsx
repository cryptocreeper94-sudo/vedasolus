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
                   
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                         <div>
                           <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Display Name</label>
                           <input type="text" defaultValue="Alex Sterling" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
                         </div>
                         <div>
                           <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                           <input type="email" defaultValue="alex@zenith.io" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
                         </div>
                         <div>
                           <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Location</label>
                           <input type="text" defaultValue="Austin, TX" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Height (cm)</label>
                              <input type="number" defaultValue="182" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Weight (kg)</label>
                              <input type="number" defaultValue="75" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
                            </div>
                         </div>
                         <div>
                           <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Date of Birth</label>
                           <input type="date" defaultValue="1990-05-15" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white" />
                         </div>
                         <div>
                           <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Dosha Type</label>
                           <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white">
                             <option>Pitta-Vata</option>
                             <option>Vata-Kapha</option>
                             <option>Kapha-Pitta</option>
                             <option>Tri-Dosha</option>
                           </select>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
                        Save Changes
                      </button>
                   </div>
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
                   
                   <div className="space-y-6">
                      {[
                        { title: "Appointment Reminders", desc: "Get notified 1 hour before scheduled sessions." },
                        { title: "Daily Wisdom", desc: "Morning briefing with Qi/Dosha insights." },
                        { title: "Marketplace Updates", desc: "New healers or tribe activity in your network." },
                        { title: "System Alerts", desc: "Security, login attempts, and blockchain verification." }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                           <div>
                             <h3 className="font-medium text-sm">{item.title}</h3>
                             <p className="text-xs text-muted-foreground">{item.desc}</p>
                           </div>
                           <div className="relative inline-block w-12 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 cursor-pointer">
                             <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>
           )}