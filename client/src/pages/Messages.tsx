import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { motion } from "framer-motion";
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile, Check, CheckCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  type: "practitioner" | "user";
}

interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  time: string;
  read: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. Elena Vasquez",
    lastMessage: "Looking forward to our session tomorrow!",
    time: "2:30 PM",
    unread: 2,
    online: true,
    type: "practitioner"
  },
  {
    id: "2",
    name: "Master Jun Wei",
    lastMessage: "The acupuncture points I mentioned are...",
    time: "Yesterday",
    unread: 0,
    online: false,
    type: "practitioner"
  },
  {
    id: "3",
    name: "VedaSolus Support",
    lastMessage: "Thank you for contacting support",
    time: "Dec 26",
    unread: 0,
    online: true,
    type: "user"
  }
];

const sampleMessages: Message[] = [
  { id: "1", content: "Hi! I wanted to follow up about my diet recommendations.", sender: "me", time: "2:15 PM", read: true },
  { id: "2", content: "Of course! Based on your recent logs, I'd suggest focusing on anti-inflammatory foods.", sender: "other", time: "2:20 PM", read: true },
  { id: "3", content: "Try incorporating more turmeric, ginger, and leafy greens.", sender: "other", time: "2:21 PM", read: true },
  { id: "4", content: "That sounds great! Any specific recipes you recommend?", sender: "me", time: "2:25 PM", read: true },
  { id: "5", content: "Looking forward to our session tomorrow!", sender: "other", time: "2:30 PM", read: false },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user } = useAuth();

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-2">Sign in to Message</h2>
          <p className="text-muted-foreground max-w-md">
            Connect with practitioners and get personalized health guidance through secure messaging.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mb-6 p-6 rounded-3xl glass-card border border-white/10">
        <h1 className="text-4xl font-serif font-medium mb-2">Messages</h1>
        <p className="text-muted-foreground">Secure communication with your practitioners and community.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-300px)] min-h-[500px]">
        {/* Conversations List */}
        <div className="md:col-span-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-messages"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((convo) => (
              <motion.div
                key={convo.id}
                onClick={() => setSelectedConversation(convo)}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                data-testid={`conversation-${convo.id}`}
                className={cn(
                  "p-4 cursor-pointer border-b border-white/5 transition-colors",
                  selectedConversation?.id === convo.id && "bg-white/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-cyan-500/50 flex items-center justify-center text-lg font-bold">
                      {convo.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {convo.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{convo.name}</h4>
                      <span className="text-xs text-muted-foreground">{convo.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
                      {convo.unread}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-cyan-500/50 flex items-center justify-center font-bold">
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" data-testid="button-call">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" data-testid="button-video">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" data-testid="button-more">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {sampleMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] p-3 rounded-2xl",
                        msg.sender === "me"
                          ? "bg-primary text-white rounded-br-sm"
                          : "bg-white/10 rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-1",
                        msg.sender === "me" ? "justify-end" : ""
                      )}>
                        <span className="text-[10px] opacity-60">{msg.time}</span>
                        {msg.sender === "me" && (
                          msg.read 
                            ? <CheckCheck className="w-3 h-3 text-cyan-300" />
                            : <Check className="w-3 h-3 opacity-60" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" data-testid="button-attach">
                    <Paperclip className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    data-testid="input-message"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-primary/50"
                  />
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" data-testid="button-emoji">
                    <Smile className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    data-testid="button-send"
                    className="p-2.5 rounded-xl bg-primary hover:bg-primary/80 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Select a Conversation</h3>
                <p className="text-sm text-muted-foreground">Choose from your existing conversations or start a new one.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}
