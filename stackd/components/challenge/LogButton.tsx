// components/challenge/LogButton.tsx
"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase";

interface LogButtonProps {
  challengeId: string;
  userId: string;
  loggedToday: boolean;
}

async function hashFile(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function LogButton({ challengeId, userId, loggedToday }: LogButtonProps) {
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loggedToday) {
    return (
      <div className="w-full h-16 bg-green/10 border-2 border-green/30 rounded-[--radius-card] flex items-center justify-center gap-2 text-green font-heading font-bold text-lg">
        ✅ Logged today!
      </div>
    );
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setError(null);
    setPreview(URL.createObjectURL(f));
  }

  function handleRemove() {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit() {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Hash the file
      const hash = await hashFile(file);

      // 2. Check for duplicate in this challenge
      const { data: dup } = await supabase
        .from("logs")
        .select("id")
        .eq("challenge_id", challengeId)
        .eq("user_id", userId)
        .eq("photo_hash", hash)
        .maybeSingle();

      if (dup) {
        setError("❌ You already used this photo in this challenge");
        setLoading(false);
        return;
      }

      // 3. Upload to Storage
      const today = new Date().toISOString().split("T")[0];
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${userId}/${challengeId}-${today}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("log-photos")
        .upload(path, file, { upsert: true });

      if (uploadError) {
        setError("Upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }

      // 4. Get signed URL (valid 10 years)
      const { data: signed } = await supabase.storage
        .from("log-photos")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);

      const photo_url = signed?.signedUrl ?? null;

      // 5. Insert log
      const { error: logError } = await supabase.from("logs").insert({
        challenge_id: challengeId,
        user_id: userId,
        date: today,
        photo_url,
        photo_hash: hash,
      });

      if (logError) {
        setError(logError.message);
        setLoading(false);
        return;
      }

      // 6. Post photo proof to Trash Talk
      await supabase.from("messages").insert({
        challenge_id: challengeId,
        user_id: userId,
        text: "logged today 📷",
        type: "message",
        photo_url,
      });

      // 7. Update member stats
      const { data: member } = await supabase
        .from("challenge_members")
        .select("logged_days, streak_days, last_log_date")
        .eq("challenge_id", challengeId)
        .eq("user_id", userId)
        .single();

      if (member) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split("T")[0];
        const isConsecutive = member.last_log_date === yStr;

        await supabase
          .from("challenge_members")
          .update({
            logged_days: member.logged_days + 1,
            streak_days: isConsecutive ? member.streak_days + 1 : 1,
            last_log_date: today,
            status: "safe",
          })
          .eq("challenge_id", challengeId)
          .eq("user_id", userId);
      }

      window.location.reload();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {!preview ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full h-16 bg-lime text-bg font-heading font-bold text-lg rounded-[--radius-card] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[--shadow-glow]"
        >
          📷 Log today — add proof
        </button>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-[--radius-card] overflow-hidden bg-surface-2 border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Proof preview"
              className="w-full max-h-52 object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 size-7 bg-bg/80 backdrop-blur rounded-full flex items-center justify-center text-muted hover:text-text transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 bg-lime text-bg font-heading font-bold rounded-[--radius-card] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="size-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              "✅ Confirm log"
            )}
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red text-center">{error}</p>}
    </div>
  );
}
