"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AIAgentEngine, playBlipSound } from "@/lib/aiAgentEngine";

interface AIAgentModalProps {
  isOpen: boolean;
  initialPrompt?: string;
  onPromptHandled?: () => void;
  onClose: () => void;
}

interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

function parseTableRow(line: string): string[] {
  let raw = line.trim();
  if (raw.startsWith("|")) raw = raw.slice(1);
  if (raw.endsWith("|")) raw = raw.slice(0, -1);
  return raw.split("|").map((cell) => cell.trim());
}

function isDelimiterRow(line: string): boolean {
  const raw = line.trim();
  if (!raw.includes("-")) return false;
  const cells = parseTableRow(raw);
  if (cells.length === 0) return false;
  return cells.every((cell) => /^:?-+:?$/.test(cell.replace(/\s+/g, "")));
}

function getAlignments(delimLine: string): Array<"left" | "center" | "right"> {
  const cells = parseTableRow(delimLine);
  return cells.map((cell) => {
    const trimmed = cell.replace(/\s+/g, "");
    const leftColon = trimmed.startsWith(":");
    const rightColon = trimmed.endsWith(":");
    if (leftColon && rightColon) return "center";
    if (rightColon) return "right";
    return "left";
  });
}

function formatInline(str: string): string {
  if (!str) return "";
  let out = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Inline code `code`
  out = out.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');

  // Bold **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic *text*
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Links [text](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>'
  );

  return out;
}

export function formatMarkdown(text: string): string {
  if (!text) return "";

  // 1. Protect code blocks
  const codeBlocks: string[] = [];
  let processed = text.replace(/```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(`<pre class="chat-code-block"><code>${escaped.trim()}</code></pre>`);
    return placeholder;
  });

  // 2. Parse lines
  const lines = processed.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const nextLine = lines[i + 1];

    // Check for markdown table
    if (line.includes("|") && nextLine && isDelimiterRow(nextLine)) {
      const headerLine = line;
      const delimLine = nextLine;
      const headers = parseTableRow(headerLine);
      const alignments = getAlignments(delimLine);
      const rows: string[][] = [];
      i += 2; // skip header & delimiter

      while (i < lines.length && lines[i].trim().length > 0 && lines[i].includes("|") && !isDelimiterRow(lines[i])) {
        rows.push(parseTableRow(lines[i]));
        i++;
      }

      let tableHtml = '<div class="chat-table-wrapper"><table class="chat-table"><thead><tr>';
      headers.forEach((h, idx) => {
        const align = alignments[idx] || "left";
        tableHtml += `<th style="text-align:${align};">${formatInline(h)}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';

      rows.forEach((row) => {
        tableHtml += '<tr>';
        headers.forEach((_, idx) => {
          const cell = row[idx] ?? "";
          const align = alignments[idx] || "left";
          tableHtml += `<td style="text-align:${align};">${formatInline(cell)}</td>`;
        });
        tableHtml += '</tr>';
      });

      tableHtml += '</tbody></table></div>';
      output.push(tableHtml);
      continue;
    }

    // Headings
    if (/^###\s+(.+)$/.test(line)) {
      const content = line.replace(/^###\s+/, "");
      output.push(`<div class="chat-heading-3">${formatInline(content)}</div>`);
      i++;
      continue;
    }
    if (/^##\s+(.+)$/.test(line)) {
      const content = line.replace(/^##\s+/, "");
      output.push(`<div class="chat-heading-2">${formatInline(content)}</div>`);
      i++;
      continue;
    }
    if (/^#\s+(.+)$/.test(line)) {
      const content = line.replace(/^#\s+/, "");
      output.push(`<div class="chat-heading-1">${formatInline(content)}</div>`);
      i++;
      continue;
    }

    // Lists (- item, * item, • item, 1. item)
    if (/^(\s*[-*•]|\d+\.)\s+(.+)$/.test(line)) {
      const content = line.replace(/^(\s*[-*•]|\d+\.)\s+/, "");
      output.push(
        `<div class="chat-list-item"><span class="chat-bullet">•</span><span>${formatInline(content)}</span></div>`
      );
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s*(.+)$/.test(line)) {
      const content = line.replace(/^>\s*/, "");
      output.push(`<blockquote class="chat-blockquote">${formatInline(content)}</blockquote>`);
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      output.push('<div class="chat-spacer"></div>');
      i++;
      continue;
    }

    // Regular line
    output.push(`<p class="chat-text-line">${formatInline(line)}</p>`);
    i++;
  }

  let finalHtml = output.join("");

  codeBlocks.forEach((block, idx) => {
    finalHtml = finalHtml.replace(`__CODE_BLOCK_${idx}__`, block);
  });

  return finalHtml;
}

export function AIAgentModal({ isOpen, initialPrompt, onPromptHandled, onClose }: AIAgentModalProps) {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! 👋 I'm **Stranger**, answering on behalf of **Sheeladitya Vinay Kumar**.\n\nI'm his AI representative (named after his gaming handle). Ask me anything about his software engineering experience at **ColoredCow**, production projects like **SankalpTaru Foundation** and the **G1 Ground Team app**, his React/Next.js/Python stack, or how to get in touch!"
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
  const handledPromptRef = useRef<string | null>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const isTypingRef = useRef(isTyping);
  isTypingRef.current = isTyping;

  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const inputValRef = useRef(inputVal);
  inputValRef.current = inputVal;

  // Clean up any pending streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }
    };
  }, []);

  const getEngine = React.useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = new AIAgentEngine();
    }
    return engineRef.current;
  }, []);

  const streamReply = React.useCallback(
    (fullReply: string) => {
      const assistantMsgId = `asst-${Date.now()}`;
      setIsTyping(false);

      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }

      setMessages((prev) => [
        ...prev,
        { id: assistantMsgId, sender: "assistant", text: "" }
      ]);

      // Calculate smooth dynamic chunk size so long replies finish in ~1-1.5s
      const chunkSize = Math.max(6, Math.ceil(fullReply.length / 70));
      let charIdx = 0;

      streamingIntervalRef.current = setInterval(() => {
        charIdx += chunkSize;
        if (charIdx >= fullReply.length) {
          if (streamingIntervalRef.current) {
            clearInterval(streamingIntervalRef.current);
            streamingIntervalRef.current = null;
          }
          // Ensure 100% of the text is rendered with zero truncation
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId ? { ...msg, text: fullReply } : msg
            )
          );
          if (soundEnabledRef.current) playBlipSound(880, 0.06);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, text: fullReply.substring(0, charIdx) }
                : msg
            )
          );
        }
      }, 14);
    },
    []
  );

  const sendMessage = React.useCallback(
    async (textToSend?: string) => {
      const text = (textToSend !== undefined ? textToSend : inputValRef.current).trim();
      if (!text || isTypingRef.current) return;

      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }

      if (soundEnabledRef.current) playBlipSound(550, 0.05);

      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        sender: "user",
        text
      };

      const updatedMessages = [...messagesRef.current, userMsg];
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
            if (
              data.model?.toLowerCase().includes("llama") ||
              data.model?.toLowerCase().includes("gpt-oss") ||
              data.model?.toLowerCase().includes("qwen")
            ) {
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
          const reply = getEngine().respond(text) || "I'm here to help!";
          streamReply(reply);
        }, 300);
      }
    },
    [getEngine, streamReply]
  );

  useEffect(() => {
    if (isOpen && initialPrompt) {
      if (handledPromptRef.current === initialPrompt) return;
      handledPromptRef.current = initialPrompt;
      const promptToSend = initialPrompt;
      const timer = setTimeout(() => {
        sendMessage(promptToSend);
        onPromptHandled?.();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialPrompt, onPromptHandled, sendMessage]);

  useEffect(() => {
    if (!isOpen) {
      handledPromptRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(focusTimer);
    }
  }, [isOpen]);

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

  const DEFAULT_WIDTH = 440;
  const MIN_WIDTH = 340;
  const [panelWidth, setPanelWidth] = useState<number>(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_WIDTH);

  const [isMinimized, setIsMinimized] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsMinimized(false);
    }
  }

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
    setIsResizing(true);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const startTouchResizing = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      isResizingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      startWidthRef.current = panelWidth;
      setIsResizing(true);
    }
  };

  const resetWidth = () => {
    setPanelWidth(DEFAULT_WIDTH);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      const delta = startXRef.current - e.clientX;
      const nextWidth = startWidthRef.current + delta;
      const maxWidth = typeof window !== "undefined" ? Math.max(MIN_WIDTH, window.innerWidth - 30) : 900;
      const clamped = Math.min(Math.max(nextWidth, MIN_WIDTH), maxWidth);
      setPanelWidth(clamped);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isResizingRef.current || !e.touches[0]) return;
      const delta = startXRef.current - e.touches[0].clientX;
      const nextWidth = startWidthRef.current + delta;
      const maxWidth = typeof window !== "undefined" ? Math.max(MIN_WIDTH, window.innerWidth - 30) : 900;
      const clamped = Math.min(Math.max(nextWidth, MIN_WIDTH), maxWidth);
      setPanelWidth(clamped);
    };

    const stopResizing = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false;
        setIsResizing(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", stopResizing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopResizing);
    };
  }, []);

  const handleChatScroll = () => {
    if (!chatScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatScrollRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollBottom(!isNearBottom);
  };

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth"
      });
      setShowScrollBottom(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "cleared",
        sender: "assistant",
        text: "Conversation refreshed. Ask Stranger anything about Sheeladitya's background, projects, or resume!"
      }
    ]);
  };

  return (
    <>
      {/* Backdrop (hidden if minimized) */}
      <div
        className={`sidepanel-backdrop ${isOpen && !isMinimized ? "open" : ""}`}
        onClick={() => setIsMinimized(true)}
        aria-hidden={!isOpen || isMinimized}
      />

      {/* Main Responsive & Manageable Drawer */}
      <aside
        className={`sidepanel-drawer ${isOpen && !isMinimized ? "open" : ""} ${isResizing ? "resizing" : ""}`}
        style={{
          width: `${panelWidth}px`
        }}
        role="dialog"
        aria-label="AI Chatbot Side Panel"
        aria-modal="true"
      >
        {/* Left Border Mouse Drag Resize Handle */}
        <div
          className="sidepanel-resize-handle"
          onMouseDown={startResizing}
          onTouchStart={startTouchResizing}
          onDoubleClick={resetWidth}
          title="Drag with mouse to resize width (Double-click to reset)"
          aria-label="Resize panel handle"
          role="separator"
          aria-orientation="vertical"
        >
          <div className="resize-handle-bar"></div>
        </div>

        <div className="sidepanel-header">
          <div className="sidepanel-profile">
            <Image
              src="/assets/images/sheeladitya.png"
              alt="Stranger AI"
              width={38}
              height={38}
              className="sidepanel-avatar"
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: "0.96rem", color: "var(--text-primary)" }}>Stranger</span>
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

          <div className="sidepanel-controls">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute audio" : "Unmute audio"}
              className="sidepanel-ctrl-btn"
              type="button"
              aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
            >
              {soundEnabled ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </button>

            {/* Clear Conversation */}
            <button
              onClick={handleClear}
              title="Clear conversation"
              className="sidepanel-ctrl-btn"
              type="button"
              aria-label="Clear chat"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>

            {/* Minimize to Corner Dock */}
            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize panel to dock"
              className="sidepanel-ctrl-btn"
              type="button"
              aria-label="Minimize panel"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              title="Close panel (Esc)"
              className="sidepanel-ctrl-btn close"
              type="button"
              aria-label="Close panel"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Chat Area with responsive auto-scroll detector */}
        <div className="sidepanel-chat-area" ref={chatScrollRef} onScroll={handleChatScroll}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-bubble ${m.sender}`}
              dangerouslySetInnerHTML={{ __html: formatMarkdown(m.text) }}
            />
          ))}

          {isTyping && (
            <div className="chat-bubble assistant typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}

          {showScrollBottom && (
            <button
              onClick={scrollToBottom}
              className="chat-scroll-bottom-btn"
              type="button"
              title="Jump to latest message"
            >
              <span>↓ Latest messages</span>
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="sidepanel-chips-tray" aria-label="Suggested topics">
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Why should our company hire Sheeladitya as a Software Engineer?")}
            type="button"
            style={{ borderColor: "rgba(79, 70, 229, 0.4)", background: "var(--accent-primary-light)", color: "var(--accent-primary)" }}
          >
            🎯 Why Hire Sheeladitya?
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Tell me about your experience at ColoredCow")}
            type="button"
          >
            💼 ColoredCow Experience
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Where can I find Sheeladitya's resume?")}
            type="button"
          >
            📄 View Resume Link
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("What did you fix in the G1 Ground Team app?")}
            type="button"
          >
            🛡️ G1 Ground Team App
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Can you show me a comparison table of your projects?")}
            type="button"
          >
            📊 Projects Table
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Tell me about SankalpTaru Foundation NGO, its e-commerce website, and mobile app")}
            type="button"
          >
            🌱 SankalpTaru NGO Ecosystem
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("What is your core tech stack?")}
            type="button"
          >
            ⚡ Tech Stack
          </button>
          <button
            className="sidepanel-chip"
            onClick={() => sendMessage("Why are you named Stranger?")}
            type="button"
          >
            🎮 Why &quot;Stranger&quot;?
          </button>
        </div>

        {/* Input Bar */}
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
            placeholder="Ask Stranger anything about Sheeladitya..."
            autoComplete="off"
          />
          <button
            className="sidepanel-send-btn"
            onClick={() => sendMessage()}
            aria-label="Send message"
            type="button"
            disabled={!inputVal.trim() || isTyping}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Minimized Dock Mode: Keep conversation alive while browsing */}
      {isOpen && isMinimized && (
        <div
          className="sidepanel-minimized-dock"
          onClick={() => setIsMinimized(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsMinimized(false);
          }}
          title="Click to restore Stranger AI chat"
        >
          <div className="minimized-dock-left">
            <div className="minimized-dock-avatar-wrap">
              <Image
                src="/assets/images/sheeladitya.png"
                alt="Stranger AI"
                width={32}
                height={32}
                className="minimized-dock-avatar"
              />
              <span className="pulse-dot"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <div className="minimized-dock-title">Stranger AI</div>
              <div className="minimized-dock-status">
                {messages.length} msg{messages.length === 1 ? "" : "s"} &middot; Click to restore
              </div>
            </div>
          </div>

          <div className="minimized-dock-actions">
            <button
              className="minimized-dock-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
              }}
              title="Expand conversation"
              type="button"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
            <button
              className="minimized-dock-btn close"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
                onClose();
              }}
              title="Close chatbot"
              type="button"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

