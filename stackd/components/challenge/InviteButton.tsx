// components/challenge/InviteButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkIcon, CheckIcon } from "@/components/ui/icons";

interface InviteButtonProps {
  challengeId: string;
}

export function InviteButton({ challengeId }: InviteButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/join/${challengeId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="secondary"
      size="md"
      className="w-full"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <CheckIcon strokeWidth={2.5} />
          Link copied!
        </>
      ) : (
        <>
          <LinkIcon />
          Copy invite link
        </>
      )}
    </Button>
  );
}
