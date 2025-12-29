import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ScrollArea } from "./scroll-area";
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIWellnessCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! I'm VedaSolus, your holistic wellness guide. I blend ancient Eastern wisdom with modern science to support your health journey. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/wellness-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (voiceEnabled && data.audioUrl) {
        playAudio(data.audioUrl);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I apologize, but I'm having trouble responding right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioUrl);
    audioRef.current.onplay = () => setIsSpeaking(true);
    audioRef.current.onended = () => setIsSpeaking(false);
    audioRef.current.onerror = () => setIsSpeaking(false);
    audioRef.current.play().catch(console.error);
  };

  const toggleVoice = () => {
    if (isSpeaking && audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const startListening = async () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice input is not supported in your browser");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognition.start();
  };

  return (
    <Card className="relative overflow-hidden border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5" />
      
      <CardHeader className="relative border-b border-cyan-500/20 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                <Bot className="w-6 h-6 text-slate-900" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
                <span className="hidden sm:inline">VedaSolus</span> AI Coach
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </CardTitle>
              <p className="text-[10px] sm:text-xs text-cyan-300/70">Eastern Wisdom • Western Science</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVoice}
            className={voiceEnabled ? "text-cyan-400 hover:text-cyan-300" : "text-slate-500 hover:text-slate-400"}
            data-testid="button-toggle-voice"
          >
            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="relative p-0">
        <div ref={scrollContainerRef}>
        <ScrollArea className="h-[280px] sm:h-[400px] p-3 sm:p-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 mb-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-pink-400 to-rose-500"
                      : "bg-gradient-to-br from-cyan-400 to-emerald-400"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-slate-900" />
                  )}
                </div>
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 text-white"
                      : "bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-slate-100"
                  }`}
                  data-testid={`message-${message.role}-${message.id}`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                <Bot className="w-4 h-4 text-slate-900" />
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Contemplating wisdom...</span>
                </div>
              </div>
            </motion.div>
          )}
        </ScrollArea>
        </div>

        <div className="p-4 border-t border-cyan-500/20 bg-slate-900/50">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={startListening}
              disabled={isListening || isLoading}
              className={`${
                isListening
                  ? "bg-pink-500/20 text-pink-400 animate-pulse"
                  : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
              }`}
              data-testid="button-voice-input"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              placeholder="Ask about wellness..."
              disabled={isLoading}
              className="flex-1 min-w-0 bg-slate-800/50 border border-cyan-500/20 rounded-xl px-3 sm:px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
              data-testid="input-chat-message"
            />
            
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 font-medium"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-3 py-1 flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-300">Speaking...</span>
        </motion.div>
      )}
    </Card>
  );
}
