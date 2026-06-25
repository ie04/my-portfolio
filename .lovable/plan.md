# Iyad Eltifi Portfolio — Build Plan

A single-page, dark-first interactive portfolio positioning Iyad as a credible Tampa-based cloud/IT professional running PageFoundry. Resume parsed, profile photo received, and a live GitHub integration pulls public + private repos from `github.com/ie04`.

## Visual identity

- **Theme:** dark-first. Deep navy/charcoal background, near-black section bands. Light-mode toggle in nav.
- **Accents:** electric blue primary, soft cyan secondary, subtle violet glow.
- **Typography:** Space Grotesk (display) + Inter (body), loaded via `<link>` in `__root.tsx`.
- **Surfaces:** glass panels (backdrop blur, hairline border, inner highlight), primary-tinted shadows.
- **Background FX:** animated gradient orb + faint grid behind hero, gated by `prefers-reduced-motion`.
- All colors as semantic tokens in `src/styles.css`.

## Assets

- Profile photo uploaded via `lovable-assets` CLI → `src/assets/iyad.jpeg.asset.json`.
- Monogram "IE" SVG favicon.

## Page structure (single route `/`)

Sticky glass nav (blur on scroll) with smooth-scroll anchors: Home · About · Services · Projects · Skills · Experience · Contact. Mobile slide-in sheet. Theme toggle on the right.

1. **Hero** — full viewport, animated orb + grid backdrop, headline "Building cleaner, faster, more credible websites for modern businesses.", two CTAs, contact chips, portrait in glass ring with rotating halo + floating tech chips.
2. **About** — bio + quick-stat glass cards (Certifications, Languages, Focus, Tampa).
3. **PageFoundry Services** — 6 cards: Website Revamps, Local Landing Pages, Mobile Optimization, Maintenance, SEO & Performance, Forms & Lead Capture.
4. **GitHub — live integration** — see "GitHub section" below.
5. **Why Work With Me** — 4 cards.
6. **Skills** — animated badge grid (21 skills from spec, merged with GitHub-derived skills).
7. **Experience Timeline** — 4 roles from resume.
8. **Education & Certifications** — two glass panels.
9. **Pricing** — 3 cards (Starter / Business / Ongoing Care).
10. **Final CTA** — mailto + tel buttons.
11. **Footer** — minimal.

## GitHub section (live, includes private repos)

**Account:** `github.com/ie04`. Auth via server-side fine-grained PAT (`GITHUB_TOKEN`) with read-only Metadata + Contents on all repos. Token stays server-side.

**Server function** `src/lib/github.functions.ts`:
- `getGitHubData()` returns `{ profile, repos, summary }`.
- Fetches in parallel: `GET /user`, `GET /user/repos?affiliation=owner&visibility=all&sort=updated&per_page=100`. Languages aggregated from the per-repo `language` field + a best-effort `GET /repos/{owner}/{repo}/languages` for the top 12 repos to enrich the breakdown.
- 5-minute in-memory cache. Graceful empty state if token missing.

**Summary block (the new piece you asked for) — `GitHubSummary` component, rendered as the header of the GitHub section:**

A prominent glass panel that reads like a technical at-a-glance, designed so a business visitor immediately registers the buzzwords:

- **Headline line:** "{N} repositories shipped across {M} languages — building with the tools modern teams hire for."
- **Live stat tiles:** Total repos · Public · Private · Followers · Stars earned · Most-used language.
- **Tech stack cloud:** animated, weighted chips derived from real repo data and pinned keywords. Larger/brighter chips = more repos using that tech. Examples surfaced when present in repos/topics/languages: **TypeScript, JavaScript, Python, SQL, PostgreSQL, React, Node.js, TanStack, Tailwind CSS, AWS, Linux, Bash, Docker, REST APIs, Git, HTML/CSS, Vite, Supabase**. A curated "always-show" baseline (TypeScript, SQL, Python, React, Node.js, AWS, Linux, Git) guarantees the key buzzwords appear even if a language isn't detected in a repo, with a subtle "from coursework & projects" footnote on baseline-only chips so nothing is overstated.
- **Two-sentence narrative** auto-composed from the data: e.g. *"Active across full-stack web (TypeScript, React, Node.js), data and scripting (Python, SQL), and cloud/infra (AWS, Linux). Most recent push: {repo} — {relative time}."*
- **"View on GitHub →"** link to `https://github.com/ie04`.

**Repo grid** below the summary:
- Filter chips: All / Public / Private / [language pills].
- Cards: name + lock/globe icon, description, language dot + label, ⭐ stars, ⑂ forks, "Updated {relative time}", hover lift + gradient border, click opens GitHub.

Loader uses TanStack Query (`ensureQueryData` in the route loader, `useSuspenseQuery` in the component) with a skeleton fallback.

The Skills section pulls in any new languages/frameworks detected from GitHub so the two sources stay consistent.

## Interactions & motion

Framer Motion scroll-reveal, hero intro, timeline dot pulse, magnetic primary button (desktop), card hover lift + glow, sticky-nav blur on scroll. All gated by `prefers-reduced-motion`.

## SEO & metadata

Route head: title "Iyad Eltifi | Cloud Computing, Web Systems & PageFoundry", meta description, OG + Twitter card (portrait), single H1, semantic sections, JSON-LD `Person` + `LocalBusiness`.

## Technical layout

- `src/routes/index.tsx` — thin route, loader calls `ensureQueryData(githubQueryOptions)`.
- `src/components/portfolio/`: `Nav`, `Hero`, `About`, `Services`, `GitHubSection`, `GitHubSummary`, `RepoCard`, `LanguageDot`, `WhyMe`, `Skills`, `Timeline`, `EduCerts`, `Pricing`, `FinalCTA`, `Footer`, plus primitives `GlassCard`, `MagneticButton`, `SectionHeading`, `AnimatedOrb`, `ThemeToggle`, `TechChip`.
- `src/lib/github.functions.ts` — server function + DTO + summary builder.
- Tokens added to `src/styles.css` under `@theme inline`. Fonts via `<link>` in `__root.tsx`.
- Install `framer-motion`; `lucide-react` already present.

## Secret request

After approval I'll call `add_secret` for `GITHUB_TOKEN` with instructions to create a fine-grained PAT (read-only Metadata + Contents, all repos). Until then the section renders a polished empty state, and the Tech Stack cloud still shows the curated baseline so the buzzwords are visible.

## Out of scope

Fake testimonials, invented metrics, backend forms, auth, analytics, contribution heatmap.

Once approved I'll implement, verify the build, and screenshot the result.
