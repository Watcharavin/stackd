// components/challenge/TrashTalk.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { MessageRow, UserRow } from "@/lib/supabase";

interface Message extends MessageRow {
  user: UserRow;
}

interface TrashTalkProps {
  challengeId: string;
  currentUserId: string;
}

export function TrashTalk({ challengeId, currentUserId }: TrashTalkProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function fetchMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*, users(*)")
      .eq("challenge_id", challengeId)
      .order("created_at", { ascending: true })
      .limit(100);

    if (data) {
      setMessages(
        (data as unknown as (MessageRow & { users: UserRow })[]).map((m) => ({
          ...m,
          user: m.users,
        }))
      );
    }
  }

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel(`chat:${challengeId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `challenge_id=eq.${challengeId}`,
        },
        () => fetchMessages()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setSending(true);
    setText("");

    await supabase.from("messages").insert({
      challenge_id: challengeId,
      user_id: currentUserId,
      text: trimmed,
      type: "message",
    });

    await fetchMessages();
    setSending(false);
  }

  function formatTime(ts: string) {
    return new Date(ts).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col">
      <h3 className="font-heading font-semibold text-text mb-3">Trash talk 🗣️</h3>

      {/* Message list */}
      <div className="bg-surface-2 rounded-[--radius-card] p-3 h-64 overflow-y-auto flex flex-col gap-3 mb-3">
        {messages.length === 0 && (
          <p className="text-xs text-muted text-center m-auto">
            No messages yet. Start the trash talk 🔥
          </p>
        )}
        {messages.map((msg) => {
          const isMe = msg.user_id === currentUserId;
          const isSystem = msg.type === "system";

          if (isSystem) {
            return (
              <p key={msg.id} className="text-xs text-muted text-center">
                {msg.text}
              </p>
            );
          }

          return (
            <div
              key={msg.id}
              className={cn("flex gap-2", isMe && "flex-row-reverse")}
            >
              <Avatar
                src={msg.user.avatar_url}
                username={msg.user.username}
                size="sm"
              />
              <div className={cn("max-w-[75%]", isMe && "items-end flex flex-col")}>
                {!isMe && (
                  <p className="text-xs text-muted mb-0.5">{msg.user.username}</p>
                )}
                <div
                  className={cn(
                    "rounded-2xl text-sm overflow-hidden",
                    isMe
                      ? "bg-lime text-bg rounded-tr-sm"
                      : "bg-surface text-text border border-border rounded-tl-sm"
                  )}
                >
                  {msg.photo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={msg.photo_url}
                      alt="proof"
                      className="w-full max-w-[200px] object-cover"
                    />
                  )}
                  <p className="px-3 py-2">{msg.text}</p>
                </div>
                <p className="text-[10px] text-muted mt-0.5">
                  {formatTime(msg.created_at)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something..."
          maxLength={200}
          className="flex-1 h-10 bg-surface border border-border text-text placeholder:text-muted rounded-[--radius-input] px-3 text-sm focus:outline-none focus:border-lime/50 focus:ring-2 focus:ring-lime/10 transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim() || sending}
          className="h-10 px-4 bg-lime text-bg font-medium text-sm rounded-[--radius-btn] hover:brightness-110 disabled:opacity-40 transition-all"
        >
          Send
        </button>
      </form>
    </div>
  );
}
