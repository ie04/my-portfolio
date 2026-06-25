import { createServerFn } from "@tanstack/react-start";

export type Repo = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  isPrivate: boolean;
  isFork: boolean;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  topics: string[];
  homepage: string | null;
};

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  location: string | null;
};

export type TechChip = {
  label: string;
  weight: number; // 1..5
  source: "language" | "topic" | "baseline";
  count: number;
};

export type GitHubData = {
  available: boolean;
  reason?: string;
  profile: GitHubProfile | null;
  repos: Repo[];
  summary: {
    totalRepos: number;
    publicRepos: number;
    privateRepos: number;
    stars: number;
    followers: number;
    languageCount: number;
    topLanguage: string | null;
    languages: { name: string; count: number }[];
    techChips: TechChip[];
    lastPush: { repo: string; at: string } | null;
    narrative: string;
  };
};

// Canonical capitalization for tech labels.
const TECH_LABEL: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  sql: "SQL",
  postgresql: "PostgreSQL",
  postgres: "PostgreSQL",
  mysql: "MySQL",
  sqlite: "SQLite",
  react: "React",
  nextjs: "Next.js",
  "next-js": "Next.js",
  node: "Node.js",
  nodejs: "Node.js",
  tanstack: "TanStack",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  aws: "AWS",
  azure: "Azure",
  gcp: "Google Cloud",
  linux: "Linux",
  bash: "Bash",
  shell: "Shell",
  docker: "Docker",
  kubernetes: "Kubernetes",
  rest: "REST APIs",
  api: "REST APIs",
  git: "Git",
  html: "HTML",
  css: "CSS",
  vite: "Vite",
  supabase: "Supabase",
  java: "Java",
  c: "C",
  "c++": "C++",
  cpp: "C++",
  "c#": "C#",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  php: "PHP",
  ruby: "Ruby",
  swift: "Swift",
  kotlin: "Kotlin",
  vue: "Vue",
  svelte: "Svelte",
  express: "Express",
  fastapi: "FastAPI",
  django: "Django",
  flask: "Flask",
  pandas: "pandas",
  numpy: "NumPy",
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  firebase: "Firebase",
  mongodb: "MongoDB",
  graphql: "GraphQL",
  cloudflare: "Cloudflare",
};

// Always show these so business visitors register the buzzwords even if a
// language isn't surfaced in repos (coursework / pre-GitHub work).
const BASELINE: string[] = [
  "TypeScript",
  "JavaScript",
  "Python",
  "SQL",
  "React",
  "Node.js",
  "AWS",
  "Linux",
  "Git",
  "HTML",
  "CSS",
];

function normalizeLabel(raw: string): string {
  const key = raw.trim().toLowerCase();
  return TECH_LABEL[key] ?? raw;
}

let cache: { data: GitHubData; at: number } | null = null;
const CACHE_MS = 5 * 60 * 1000;

async function gh<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "iyad-portfolio",
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

function buildSummary(profile: GitHubProfile, repos: Repo[]): GitHubData["summary"] {
  const publicRepos = repos.filter((r) => !r.isPrivate).length;
  const privateRepos = repos.filter((r) => r.isPrivate).length;
  const stars = repos.reduce((sum, r) => sum + r.stars, 0);

  // Languages from repo.language
  const langCounts = new Map<string, number>();
  for (const r of repos) {
    if (r.language) {
      const k = normalizeLabel(r.language);
      langCounts.set(k, (langCounts.get(k) ?? 0) + 1);
    }
  }
  const languages = [...langCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Topic counts
  const topicCounts = new Map<string, number>();
  for (const r of repos) {
    for (const t of r.topics) {
      const k = normalizeLabel(t);
      topicCounts.set(k, (topicCounts.get(k) ?? 0) + 1);
    }
  }

  // Build chips: languages + topics, merged
  const chipMap = new Map<string, TechChip>();
  for (const [name, count] of langCounts) {
    chipMap.set(name, { label: name, count, weight: 0, source: "language" });
  }
  for (const [name, count] of topicCounts) {
    const existing = chipMap.get(name);
    if (existing) existing.count += count;
    else chipMap.set(name, { label: name, count, weight: 0, source: "topic" });
  }
  // Baseline fillers
  for (const name of BASELINE) {
    if (!chipMap.has(name)) {
      chipMap.set(name, { label: name, count: 0, weight: 1, source: "baseline" });
    }
  }

  // Weight chips 1..5 by count percentile
  const counts = [...chipMap.values()].map((c) => c.count);
  const maxCount = Math.max(1, ...counts);
  for (const chip of chipMap.values()) {
    if (chip.source === "baseline" && chip.count === 0) {
      chip.weight = 1;
    } else {
      const ratio = chip.count / maxCount;
      chip.weight = Math.max(2, Math.min(5, Math.round(ratio * 5) || 2));
    }
  }
  const techChips = [...chipMap.values()].sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return a.label.localeCompare(b.label);
  });

  const topLanguage = languages[0]?.name ?? null;
  const sortedByPush = [...repos]
    .filter((r) => r.pushedAt)
    .sort((a, b) => +new Date(b.pushedAt) - +new Date(a.pushedAt));
  const lastPush = sortedByPush[0]
    ? { repo: sortedByPush[0].name, at: sortedByPush[0].pushedAt }
    : null;

  // Narrative
  const webStack = ["TypeScript", "React", "Node.js"].filter((t) => chipMap.has(t));
  const dataStack = ["Python", "SQL"].filter((t) => chipMap.has(t));
  const cloudStack = ["AWS", "Linux", "Docker"].filter((t) => chipMap.has(t));
  const parts: string[] = [];
  if (webStack.length) parts.push(`full-stack web (${webStack.join(", ")})`);
  if (dataStack.length) parts.push(`data & scripting (${dataStack.join(", ")})`);
  if (cloudStack.length) parts.push(`cloud & infra (${cloudStack.join(", ")})`);
  const narrative = parts.length
    ? `Active across ${parts.join(", ")}. ${
        lastPush ? `Most recent push: ${lastPush.repo}.` : ""
      }`.trim()
    : "Building across web, data, and cloud.";

  return {
    totalRepos: repos.length || profile.publicRepos,
    publicRepos,
    privateRepos,
    stars,
    followers: profile.followers,
    languageCount: languages.length,
    topLanguage,
    languages,
    techChips,
    lastPush,
    narrative,
  };
}

function emptyData(reason: string): GitHubData {
  // Build a baseline-only summary so the buzzwords still render.
  const profile: GitHubProfile = {
    login: "ie04",
    name: "Iyad Eltifi",
    avatarUrl: "",
    htmlUrl: "https://github.com/ie04",
    bio: null,
    followers: 0,
    following: 0,
    publicRepos: 0,
    location: null,
  };
  const summary = buildSummary(profile, []);
  return { available: false, reason, profile: null, repos: [], summary };
}

export const getGitHubData = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubData> => {
    if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      const data = emptyData("GITHUB_TOKEN not configured");
      return data;
    }
    try {
      const [profileRaw, reposRaw] = await Promise.all([
        gh<any>("https://api.github.com/user", token),
        gh<any[]>(
          "https://api.github.com/user/repos?affiliation=owner&visibility=all&sort=updated&per_page=100",
          token,
        ),
      ]);
      const profile: GitHubProfile = {
        login: profileRaw.login,
        name: profileRaw.name,
        avatarUrl: profileRaw.avatar_url,
        htmlUrl: profileRaw.html_url,
        bio: profileRaw.bio,
        followers: profileRaw.followers,
        following: profileRaw.following,
        publicRepos: profileRaw.public_repos,
        location: profileRaw.location,
      };
      const repos: Repo[] = reposRaw
        .filter((r) => !r.archived)
        .map((r) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description: r.description,
          htmlUrl: r.html_url,
          isPrivate: r.private,
          isFork: r.fork,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
          pushedAt: r.pushed_at,
          topics: r.topics ?? [],
          homepage: r.homepage,
        }));
      const summary = buildSummary(profile, repos);
      const data: GitHubData = { available: true, profile, repos, summary };
      cache = { data, at: Date.now() };
      return data;
    } catch (err) {
      console.error("[github] fetch failed", err);
      return emptyData(err instanceof Error ? err.message : "fetch failed");
    }
  },
);
