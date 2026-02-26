// CLAUDE.md — Stackd Web App
# Stackd — Web App (Next.js + Supabase)
 
## Overview
// Social challenge web app. Create any challenge with friends,
// set stakes (reward/punishment), track progress via realtime leaderboard.
// No health API. Pure social accountability. Web-first, PWA-ready.
 
## Tech Stack
# Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS
# Database: Supabase (Postgres + Realtime + Auth + Storage)
# Payments: Stripe (Pro subscription \u0e3f149/month)
# Deployment: Vercel (free tier)
# Analytics: Posthog
 
## Project Structure
# app/
#   (auth)/login, signup
#   (app)/dashboard, challenges/[id], profile/[username]
#   api/webhooks/stripe
# components/
#   ui/         # Button, Input, Card, Badge, Avatar
#   challenge/  # ChallengeCard, Leaderboard, LogButton, TrashTalk
#   layout/     # Sidebar, Topbar, MobileNav
# lib/
#   supabase.ts   # client + server helpers
#   stripe.ts     # payment helpers
#   utils.ts      # cn(), formatDate()
# hooks/
#   useLeaderboard.ts  # realtime Supabase subscription
#   useChallenge.ts
#   useAuth.ts
 
## Design System (Dark)
# bg: #0A0A0C    surface: #18181F    border: rgba(255,255,255,0.07)
# lime: #C8F000  text: #E8E8F0       muted: #555568
# green: #3DDB7A yellow: #F0C030     red: #F05050
# Font: Space Grotesk (headings) + DM Sans (body) via next/font
# Radius: 20px cards, 14px inputs, 12px chips
 
## Supabase Schema
# users(id, username, avatar_url, created_at)
# challenges(id, name, emoji, goal, start_date, end_date,
#   reward, punishment, privacy, creator_id, status)
# challenge_members(challenge_id, user_id, logged_days,
#   streak_days, last_log_date, status: safe/risk/dead)
# logs(id, challenge_id, user_id, date, photo_url, created_at)
# messages(id, challenge_id, user_id, text, type, created_at)
 
## Coding Standards
# TypeScript strict mode always
# Server Components by default, Client only when needed
# Supabase realtime for leaderboard (useLeaderboard hook)
# All forms: react-hook-form + zod validation
# Loading / Error states on every async operation
# Mobile-first responsive (test at 375px width)
# cn() utility for conditional classNames
# Show full file path as comment at top of each file
