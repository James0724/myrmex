# Myrmex Property Maintenance — Web Application

A full-stack marketing and operations platform for **Myrmex Property Maintenance**, a Kenyan property services company. The application combines a public-facing portfolio website with a protected admin dashboard for managing client inquiries, appointment bookings, and gallery content.

---

## Features

### Public Website
- **Home** — Hero banner, company introduction, service highlights, featured projects, statistics, process overview, client testimonials, and a call-to-action section
- **About** — Company story, mission and vision, core values, team showcase, and competitive differentiators
- **Services** — Detailed breakdown of five service categories with sub-services and example projects:
  - Power Systems & Electrical
  - Security Systems
  - Networking & Communication
  - Routine Assessments & Support
  - System Design & Technical Drawings
- **Gallery** — Filterable portfolio of completed projects with category-based navigation
- **Contact** — General enquiry form, appointment booking form, service area information

### Admin Dashboard (Protected)
- **Overview** — Real-time statistics: total messages, unread count, appointment counts by status, gallery image count
- **Messages** — View, filter (unread / read / replied), update status, and delete contact form submissions
- **Appointments** — View, filter, and manage bookings through their full lifecycle (pending → confirmed → completed / cancelled)
- **Gallery** — Upload images directly to Cloudinary, assign categories, preview and delete entries

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS `@theme`, no config file) |
| Database | MongoDB Atlas + Mongoose 9 |
| Authentication | NextAuth v5 beta (credentials, JWT) |
| Image Storage | Cloudinary v2 |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Carousel | Embla Carousel (autoplay, fade) |
| Icons | Lucide React |
| Date Utilities | date-fns |

**Brand:** Forest Green `#2B5F2B` · Charcoal `#2C2C2C`  
**Fonts:** Barlow Condensed (headings) · Inter (body)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home
│   ├── about/
│   ├── services/
│   ├── gallery/
│   ├── contact/
│   └── admin/
│       ├── login/
│       ├── page.tsx              # Dashboard
│       ├── messages/
│       ├── appointments/
│       └── gallery/
│
├── api/
│   ├── auth/[...nextauth]/       # NextAuth handler
│   ├── contact/                  # POST — save contact message
│   ├── appointments/             # GET / POST / PATCH / DELETE
│   ├── messages/                 # GET / PATCH / DELETE
│   ├── gallery/                  # GET / POST / DELETE
│   └── admin/stats/              # GET — dashboard counts
│
├── components/
│   ├── admin/                    # Sidebar
│   ├── contact/                  # ContactForm, AppointmentForm
│   ├── gallery/                  # DemoGallery, GalleryGrid
│   ├── home/                     # Hero, IntroSection, ServicesSection, …
│   ├── layout/                   # Navbar, Footer
│   ├── providers/                # SessionProvider
│   ├── services/                 # ServicesVisualIntro
│   └── ui/                       # PageHero, SectionHeading
│
├── lib/
│   ├── auth.ts                   # NextAuth config (credentials + JWT)
│   ├── mongodb.ts                # Singleton DB connection
│   ├── cloudinary.ts             # uploadImage / deleteImage helpers
│   └── utils.ts                  # cn(), formatDate(), SERVICE_LABELS
│
├── models/
│   ├── Appointment.ts
│   ├── Message.ts
│   ├── GalleryImage.ts
│   └── User.ts
│
├── types/
│   └── index.ts                  # Shared TypeScript interfaces
│
└── proxy.ts                      # Next.js 16 auth middleware proxy
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A MongoDB Atlas cluster
- A Cloudinary account

### 1. Clone and install

```bash
git clone <repo-url>
cd myrmex-web
npm install
```

### 2. Configure environment variables

Create `.env.local` at the project root:

```env
# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/myrmex

# Authentication
AUTH_SECRET=<random-32+-character-string>
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloud-name>

# Initial admin account (used by seed endpoint)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<strong-password>
```

### 3. Seed the first admin user

Start the dev server, then send a one-time POST request to create the admin account:

```bash
npm run dev

# In another terminal:
curl -X POST http://localhost:3000/api/admin/seed
```

> This endpoint is only active in development and reads `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.  
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Database Models

### Appointment
| Field | Type | Notes |
|---|---|---|
| name, email, phone | String | Contact details |
| service | Enum | power · security · networking · assessment · design · general |
| preferredDate, preferredTime | String | Requested slot |
| message | String | Optional notes |
| status | Enum | pending · confirmed · completed · cancelled |

### Message
| Field | Type | Notes |
|---|---|---|
| name, email | String | Required |
| phone | String | Optional |
| subject, message | String | Form content |
| status | Enum | unread · read · replied |

### GalleryImage
| Field | Type | Notes |
|---|---|---|
| cloudinaryId | String | Reference for deletion |
| url | String | Secure Cloudinary URL |
| title | String | Display name |
| category | Enum | Same categories as Appointment |
| width, height | Number | Optional dimensions |

### User
| Field | Type | Notes |
|---|---|---|
| email | String | Unique login identifier |
| password | String | Bcrypt hashed, not returned by default |
| name | String | Display name |
| role | Enum | admin · superadmin |

---

## Authentication

Authentication uses **NextAuth v5 beta** with the Credentials provider. Successful login issues a JWT containing the user's `id` and `role`. All `/admin/*` routes and protected API endpoints verify the session via `auth()` from `src/lib/auth.ts`.

The proxy for route protection lives in `src/proxy.ts` (Next.js 16 uses `proxy.ts` instead of `middleware.ts`).

---

## Image Management

Images are stored on **Cloudinary** in the `myrmex/gallery` folder with automatic quality and format optimisation applied at upload time. The `uploadImage()` helper in `src/lib/cloudinary.ts` accepts a base64-encoded string and returns the public ID and secure URL. `deleteImage()` removes assets by public ID.

---

## Deployment

The application is designed to deploy on **Vercel**:

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add all environment variables from `.env.local` in the Vercel project settings.
4. Deploy — Vercel detects Next.js automatically.

For other platforms, run `npm run build && npm start` and ensure all environment variables are set.

---

## Locale

Date formatting uses the **en-KE** (Kenya English) locale via `formatDate()` and `formatDateTime()` in `src/lib/utils.ts`, producing output like `18 May 2026`.
