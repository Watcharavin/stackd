-- supabase/migrations/001_initial_schema.sql
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Tables ──────────────────────────────────────────────────────────────────

-- Users (mirrors auth.users)
create table public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  avatar_url  text,
  created_at  timestamptz default now() not null
);

-- Challenges
create table public.challenges (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  emoji       text not null default '🎯',
  goal        text not null,
  start_date  date not null,
  end_date    date not null,
  reward      text,
  punishment  text,
  privacy     text not null default 'private' check (privacy in ('public','private')),
  creator_id  uuid not null references public.users(id) on delete cascade,
  status      text not null default 'active' check (status in ('active','completed','cancelled')),
  created_at  timestamptz default now() not null
);

-- Challenge Members
create table public.challenge_members (
  challenge_id  uuid not null references public.challenges(id) on delete cascade,
  user_id       uuid not null references public.users(id) on delete cascade,
  logged_days   int not null default 0,
  streak_days   int not null default 0,
  last_log_date date,
  status        text not null default 'safe' check (status in ('safe','risk','dead')),
  joined_at     timestamptz default now() not null,
  primary key (challenge_id, user_id)
);

-- Daily Logs
create table public.logs (
  id            uuid primary key default uuid_generate_v4(),
  challenge_id  uuid not null references public.challenges(id) on delete cascade,
  user_id       uuid not null references public.users(id) on delete cascade,
  date          date not null default current_date,
  photo_url     text,
  created_at    timestamptz default now() not null,
  unique (challenge_id, user_id, date)
);

-- Messages / Trash Talk
create table public.messages (
  id            uuid primary key default uuid_generate_v4(),
  challenge_id  uuid not null references public.challenges(id) on delete cascade,
  user_id       uuid not null references public.users(id) on delete cascade,
  text          text not null,
  type          text not null default 'message' check (type in ('message','system','trash_talk')),
  created_at    timestamptz default now() not null
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

create index on public.challenges (creator_id);
create index on public.challenges (status);
create index on public.challenge_members (user_id);
create index on public.logs (challenge_id, user_id, date desc);
create index on public.messages (challenge_id, created_at desc);

-- ─── Realtime ─────────────────────────────────────────────────────────────────
-- Enable realtime for live leaderboard & chat
alter publication supabase_realtime add table public.challenge_members;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.logs;

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table public.users             enable row level security;
alter table public.challenges        enable row level security;
alter table public.challenge_members enable row level security;
alter table public.logs              enable row level security;
alter table public.messages          enable row level security;

-- users: anyone can read, only self can update
create policy "users_read"   on public.users for select using (true);
create policy "users_insert" on public.users for insert with check (auth.uid() = id);
create policy "users_update" on public.users for update using (auth.uid() = id);

-- challenges: public ones readable by all; private only by members
create policy "challenges_read_public"
  on public.challenges for select
  using (privacy = 'public' or creator_id = auth.uid() or
    exists (select 1 from public.challenge_members cm
            where cm.challenge_id = id and cm.user_id = auth.uid()));

create policy "challenges_insert"
  on public.challenges for insert
  with check (auth.uid() = creator_id);

create policy "challenges_update"
  on public.challenges for update
  using (auth.uid() = creator_id);

-- challenge_members: readable by members of the challenge
create policy "members_read"
  on public.challenge_members for select
  using (exists (
    select 1 from public.challenge_members cm2
    where cm2.challenge_id = challenge_id and cm2.user_id = auth.uid()
  ) or exists (
    select 1 from public.challenges c
    where c.id = challenge_id and c.privacy = 'public'
  ));

create policy "members_insert"
  on public.challenge_members for insert
  with check (auth.uid() = user_id);

create policy "members_update"
  on public.challenge_members for update
  using (auth.uid() = user_id);

-- logs: readable by members
create policy "logs_read"
  on public.logs for select
  using (exists (
    select 1 from public.challenge_members cm
    where cm.challenge_id = challenge_id and cm.user_id = auth.uid()
  ));

create policy "logs_insert"
  on public.logs for insert
  with check (auth.uid() = user_id);

-- messages: readable by members
create policy "messages_read"
  on public.messages for select
  using (exists (
    select 1 from public.challenge_members cm
    where cm.challenge_id = challenge_id and cm.user_id = auth.uid()
  ));

create policy "messages_insert"
  on public.messages for insert
  with check (auth.uid() = user_id);

-- ─── Auto-create user profile on signup ──────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Auto-add creator as first member ────────────────────────────────────────

create or replace function public.handle_new_challenge()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.challenge_members (challenge_id, user_id)
  values (new.id, new.creator_id);
  return new;
end;
$$;

create trigger on_challenge_created
  after insert on public.challenges
  for each row execute procedure public.handle_new_challenge();
