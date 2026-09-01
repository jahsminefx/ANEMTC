# ANINTA NATURAL & ENERGY MEDICINE THERAPY CENTER

Production-Ready Premium Wellness Discovery Platform & Internal Staff Admin CMS.

---

## Executive Summary & Strategic Purpose

This platform is a mobile-first informational wellness hub for **Aninta Natural & Energy Medicine Therapy Center**.

### Key Architectural Principles
* **NO Public Registration / Logins:** Public visitors explore content freely without signing up.
* **NO E-Commerce Checkout / Cart:** Products are displayed for discovery and partner referral.
* **Direct Lead Acquisition:** Generates consultations via instant WhatsApp (`wa.me`) and direct phone (`tel:`).
* **Staff Admin CMS:** Secure JWT-authenticated management portal for staff to update products, partner profiles, services, categories, blog posts, subscriber lists, and site settings.

---

## Tech Stack

* **Frontend:** React, Vite, JavaScript, Tailwind CSS, React Router v6, React Hook Form, Zod validation.
* **Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL (SQLite for dev fallback).
* **Security & Auth:** Admin JWT tokens, bcrypt password hashing, HTTP-only cookies, Helmet headers, CORS, Express Rate Limiting.
* **Storage & Email:** Cloudinary image CDN integration (with local upload fallback) and Brevo Newsletter API v3 contact synchronization architecture.

---

## Directory Structure

```
/client       # React + Vite + Tailwind CSS SPA
/server       # Node.js + Express + Prisma REST API
package.json  # Root script orchestrator
.env.example  # Global environment variables template
```

---

## Quick Start & Local Development

### 1. Installation

Install dependencies across root, server, and client:

```bash
npm run install:all
```

### 2. Environment Setup

Create `.env` files in root, `server/`, and `client/`:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3. Database Migration & Seeding

Generate Prisma client, push database schema, and seed realistic demo data:

```bash
npm run db:push
npm run db:seed
```

Default Admin Credentials created by seed:
- **Email:** `admin@aninta.com`
- **Password:** `AnintaAdmin2026!`

### 4. Running Local Development Server

Run frontend (Vite port `5173`) and backend (Express port `5000`) concurrently:

```bash
npm run dev
```

Public Site: `http://localhost:5173`
Admin Portal: `http://localhost:5173/admin/login`

---

## Commands Reference

| Command | Action |
| --- | --- |
| `npm run dev` | Starts server & client concurrently |
| `npm run build` | Builds client Vite production assets & generates Prisma client |
| `npm run db:push` | Pushes Prisma schema to target database |
| `npm run db:seed` | Runs seed script populating default services, products & admin |
| `npm run test` | Executes Jest & Supertest API unit tests |

---

## Production Build & Deployment Guidance

1. Set `NODE_ENV=production` in server environment.
2. Set production `DATABASE_URL` for PostgreSQL.
3. Configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `BREVO_API_KEY`.
4. Run `npm run build` to output optimized static bundle in `client/dist`.
5. Deploy `server` to a Node environment (e.g. Render, Railway, DigitalOcean, AWS App Runner).
