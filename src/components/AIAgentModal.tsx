"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AIAgentEngine, playBlipSound } from "@/lib/aiAgentEngine";

interface AIAgentModalProps {
  isOpen: boolean;
  initialPrompt?: string;
  onClose: () => void;
}

interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

export function AIAgentModal({ isOpen, initialPrompt, onClose }: AIAgentModalProps) {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! 👋 I'm **Stranger**, answering on behalf of **Sheeladitya Vinay Kumar**.\n\nI'm his AI representative (named after his gaming handle). Ask me anything about his software engineering experience at **ColoredCow**, projects like the **Talent Evaluator AI Mentor**, his React/Next.js/Python stack, or how to get in touch!"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [modelLabel, setModelLabel] = useState<string>("AI Agent");
  const [isLiveAI, setIsLiveAI] = useState<boolean>(false);

  const engineRef = useRef<AIAgentEngine | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!engineRef.current) {
    engineRef.current = new AIAgentEngine();
  }

  useEffect(() => {
    if (isOpen && initialPrompt) {
      sendMessage(initialPrompt);
    }
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    if (soundEnabled) playBlipSound(550, 0.05);

    const userMsg: MessageItem = {
      id: Math.random().toString(),
      sender: "user",
      text
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputVal("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: updatedMessages
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.isRealAI) {
          setIsLiveAI(true);
          if (data.model?.toLowerCase().includes("llama")) {
            setModelLabel("Groq Cloud");
          } else if (data.model?.toLowerCase().includes("grok")) {
            setModelLabel("Grok 2.0");
          } else if (data.model?.toLowerCase().includes("gemini")) {
            setModelLabel("Gemini");
          } else {
            setModelLabel("Live AI");
          }
        }
        streamReply(data.reply || "I'm here to help!");
        return;
      }
      throw new Error(`Server returned ${res.status}`);
    } catch {
      // Graceful local engine fallback
      setTimeout(() => {
        const reply = engineRef.current?.respond(text) || "I'm here to help!";
        streamReply(reply);
      }, 300);
    }
  };

  const streamReply = (fullReply: string) => {
    const assistantMsgId = Math.random().toString();
    setIsTyping(false);

    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, sender: "assistant", text: "" }
    ]);

    let charIdx = 0;
    const interval = setInterval(() => {
      charIdx += 3;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, text: fullReply.substring(0, charIdx) }
            : msg
        )
      );

      if (charIdx >= fullReply.length) {
        clearInterval(interval);
        if (soundEnabled) playBlipSound(880, 0.06);
      }
    }, 12);
  };

  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n• /g, "<br>• ")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
  };

  const handleClear = () => {
    setMessages([
      {
        id: "cleared",
        sender: "assistant",
        text: "Conversation refreshed. Ask Stranger anything about Sheeladitya's background or projects!"
      }
    ]);
  };

  return (
    <>
      <div
        className={`sidepanel-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`sidepanel-drawer ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-label="AI Chatbot Side Panel"
        aria-modal="true"
      >
        <div className="sidepanel-header">
          <div className="sidepanel-profile">
            <Image
              src="/assets/images/sheeladitya.png"
              alt="Stranger AI"
              width={36}
              height={36}
              className="sidepanel-avatar"
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Stranger</span>
                <span className="badge-pill indigo" style={{ padding: "2px 8px", fontSize: "0.68rem" }}>
                  {modelLabel}
                </span>
              </div>
              <div style={{ fontSize: "0.74rem", color: "var(--accent-emerald)", display: "flex", alignItems: "center", gap: 5 }}>
                <span className="pulse-dot" style={{ width: 5, height: 5 }}></span>
                <span>{isLiveAI ? "Live AI Connected" : "Online"}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute audio" : "Unmute audio"}
              style={{ padding: 6, fontSize: "0.85rem", color: "var(--text-muted)" }}
              type="button"
            >
              {soundEnabled ? "🔊" : "🔇"}
            </button>
            <button
              onClick={handleClear}
              title="Clear chat"
              style={{ padding: 6, fontSize: "0.85rem", color: "var(--text-muted)" }}
              type="button"
            >
              🗑️
            </button>
            <button
              onClick={onClose}
              title="Close panel (Esc)"
              style={{ padding: "6px 10px", fontSize: "1.1rem", color: "var(--text-muted)", cursor: "pointer" }}
              type="button"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="sidepanel-chat-area" ref={chatScrollRef}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-bubble ${m.sender}`}
              dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
            />
          ))}

          {isTyping && (
            <div className="chat-bubble assistant typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}
        </div>

        <div className="sidepanel-chips-tray">
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Tell me about your experience at ColoredCow")}
            type="button"
          >
            💼 ColoredCow Experience
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("What did you build for the Talent Evaluator & AI Mentor project?")}
            type="button"
          >
            🚀 Talent Evaluator AI
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("What did you fix in the SankalpTaru Huge mobile app?")}
            type="button"
          >
            📱 SankalpTaru App
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Why are you named Stranger?")}
            type="button"
          >
            🎮 Why &quot;Stranger&quot;?
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("What is your core tech stack?")}
            type="button"
          >
            ⚡ Tech Stack
          </button>
        </div>

        <div className="sidepanel-input-wrap">
          <input
            ref={inputRef}
            type="text"
            className="sidepanel-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask Stranger anything..."
            autoComplete="off"
          />
          <button
            className="sidepanel-send-btn"
            onClick={() => sendMessage()}
            aria-label="Send message"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}

