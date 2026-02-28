// app/(app)/challenges/[id]/edit/page.tsx
import { redirect, notFound } from "next/navigation";
import { getUser, createServerSupabase } from "@/lib/supabase-server";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/card";
import { EditChallengeForm } from "@/components/challenge/EditChallengeForm";
import type { ChallengeRow } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditChallengePage({ params }: Props) {
  const { id } = await params;
  const user = await getUser();
  if (!user) redirect("/login");

  const supabase = await createServerSupabase();

  const { data: raw } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", id)
    .single();

  const challenge = raw as ChallengeRow | null;
  if (!challenge) notFound();

  // Only creator can edit
  if (challenge.creator_id !== user.id) redirect(`/challenges/${id}`);

  return (
    <div>
      <Topbar title="Edit Challenge" backHref={`/challenges/${id}`} />
      <div className="max-w-lg mx-auto px-4 py-6">
        <Card>
          <EditChallengeForm challenge={challenge} />
        </Card>
      </div>
    </div>
  );
}
