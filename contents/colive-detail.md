# CoLive — Roommate Finder App

### Description for the card
CoLive started as a Lovable-generated prototype to quickly validate the roommate-matching concept. I took it from there and rebuilt it into a real production application — redesigning the database schema for graph-based compatibility matching, replacing prototype auth with proper OAuth 2.0, building real-time chat infrastructure, and deploying it independently across web, mobile, and API layers.
---

### Detail page content

---

## Overview

CoLive is a roommate-matching platform, and its origin story is the most
honest thing about it: it didn't start as a from-scratch engineering
project. It started as a **Lovable-generated prototype** — a fast way to
validate whether the roommate-matching concept actually held up before
investing real engineering time into it.

Once the idea proved out, the real work began: taking a vibe-coded
prototype and rebuilding it into something production-grade.

**Role:** Lead Developer
**Period:** Aug 2025 — Present
**Type:** Independent / Solo-built

---

## The Real Engineering Challenge

Anyone can generate a working prototype in an afternoon now. The harder
— and more valuable — skill is knowing **what to keep and what to
rebuild** once that prototype proves the idea works.

A vibe-coded app is good at exactly one thing: showing you a working UI
fast enough to react to. It is *not* good at security, data integrity,
or scaling past a handful of test users. The judgment call — and the
actual engineering work — was in identifying precisely which parts of
the prototype could stay and which needed to be torn out and rebuilt
before real users could depend on it.

---

## What I Rebuilt

### Database & Matching Architecture
Redesigned the database schema from the ground up to support
**graph-based roommate compatibility matching** and real-time relationship
queries — a fundamentally different data model than what a quick
prototype typically generates, and one that scales properly as the user
base grows.

### Authentication
Replaced prototype-level auth with proper **OAuth 2.0** — closing the gap
between "looks like it works" and "is actually secure enough for real
users to trust with their data."

### Real-Time Features
Built real-time chat messaging infrastructure, enabling live conversation
between matched roommates — not a mocked-up UI element, but working
infrastructure behind it.

### Infrastructure & Deployment
Deployed and configured cloud infrastructure independently across the
**web app, mobile app, and API layer** — owning the full production
environment rather than handing it off.

### Workflow & UX
Designed the user onboarding and matching workflow from first principles
— mapping out the full experience before writing implementation code,
rather than accepting the prototype's flow as a given.

---

## Before → After

*(This is the section to pair directly with your mockup UI screenshots —
a side-by-side of the original Lovable-generated screens next to the
current production UI is the strongest visual proof of this story. It
makes the transformation obvious without needing to read a single line
of text.)*

**Before:** Lovable-generated prototype — functional enough to validate
the concept, but built on prototype-grade auth, a simple relational
structure with no compatibility-matching logic, and no real-time
infrastructure.

**After:** Production application with graph-based matching, OAuth 2.0
authentication, real-time chat, and independently managed cloud
infrastructure across web, mobile, and API.

---

## Technical Stack

**Frontend:** React Native, Expo
**Backend:** Node.js, Hono, Drizzle
**Database:** Supabase (PostgreSQL), pgGraph for graph-based queries
**Auth:** OAuth 2.0
**Infrastructure:** Cloudflare Workers, independently deployed and configured

---

## Why This Story Matters

This isn't a "look what AI can build" story — it's the opposite. It's
proof that the valuable skill going forward isn't refusing to use fast
prototyping tools, it's knowing exactly where their output ends and real
engineering has to begin. That judgment — not the initial prototype — is
what makes CoLive a real product rather than a demo.
