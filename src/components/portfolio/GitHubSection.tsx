import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Lock, Globe, Star, GitFork, ArrowUpRight, Github } from "lucide-react";
import { useMemo, useState } from "react";
import type { Repo, TechChip, GitHubData } from "@/lib/github";

async function fetchGitHubData(): Promise<GitHubData> {
  const res = await fetch("/api/github");
  if (!res.ok) {
    throw new Error("Failed to load GitHub data");
  }
  return (await res.json()) as GitHubData;
}

const githubQueryOptions = {
  queryKey: ["github", "ie04"],
  queryFn: fetchGitHubData,
  staleTime: 5 * 60 * 1000,
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 86400000;
  const d = Math.floor(diff / day);
  if (d < 1) return "today";
  if (d < 7) return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dockerfile: "#384d54",
};

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-2xl font-semibold text-foreground tabular-nums">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function TechChipPill({ chip }: { chip: TechChip }) {
  const sizes = [
    "text-xs px-2.5 py-1",
    "text-xs px-3 py-1",
    "text-sm px-3 py-1.5",
    "text-sm px-3.5 py-1.5",
    "text-base px-4 py-2",
  ];
  const intensities = ["opacity-60", "opacity-75", "opacity-90", "opacity-100", "opacity-100"];
  const w = Math.max(1, Math.min(5, chip.weight));
  const baseline = chip.source === "baseline" && chip.count === 0;
  return (
    <span
      title={
        baseline ? "From coursework & projects" : `${chip.count} repo${chip.count === 1 ? "" : "s"}`
      }
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizes[w - 1]} ${intensities[w - 1]} ${
        baseline
          ? "border-border bg-muted/40 text-muted-foreground"
          : "border-primary/30 bg-primary/10 text-foreground"
      }`}
    >
      {w >= 4 && <span className="size-1.5 rounded-full bg-primary" />}
      {chip.label}
    </span>
  );
}

function GitHubSummary({ data }: { data: GitHubData }) {
  const s = data.summary;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-strong rounded-2xl p-6 md:p-8"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live from github.com/ie04
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold">
            {s.totalRepos} repositor{s.totalRepos === 1 ? "y" : "ies"} shipped across{" "}
            <span className="text-gradient">{Math.max(s.languageCount, 1)} languages</span>
            <span className="text-muted-foreground">
              {" "}
              — building with the tools modern teams hire for.
            </span>
          </h3>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground">{s.narrative}</p>
        </div>
        <a
          href="https://github.com/ie04"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition hover:border-primary/60 hover:bg-primary/10"
        >
          <Github className="size-4" /> View on GitHub <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile label="Total repos" value={s.totalRepos} />
        <StatTile label="Public" value={s.publicRepos} />
        <StatTile label="Private" value={s.privateRepos} />
        <StatTile label="Followers" value={s.followers} />
        <StatTile label="Stars earned" value={s.stars} />
        <StatTile label="Top language" value={s.topLanguage ?? "—"} />
      </div>

      <div className="mt-6">
        <div className="mb-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          Tech stack — weighted by real usage
        </div>
        <div className="flex flex-wrap gap-2">
          {s.techChips.slice(0, 28).map((chip) => (
            <TechChipPill key={chip.label} chip={chip} />
          ))}
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Larger, glowing chips appear in the most repos. Muted chips come from coursework &
          non-GitHub projects.
        </div>
      </div>
    </motion.div>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const color = repo.language ? (LANG_COLOR[repo.language] ?? "#888") : "#888";
  return (
    <motion.a
      href={repo.htmlUrl}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card/60 p-5 transition hover:border-primary/50 hover:bg-card hover:shadow-[0_18px_60px_-20px_oklch(0.72_0.17_245/0.5)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {repo.isPrivate ? (
            <Lock className="size-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <Globe className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          <span className="truncate font-medium text-foreground group-hover:text-primary">
            {repo.name}
          </span>
        </div>
        <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
        {repo.description ?? <span className="italic opacity-60">No description</span>}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ background: color }} />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star className="size-3" /> {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork className="size-3" /> {repo.forks}
          </span>
        )}
        <span className="ml-auto">Updated {timeAgo(repo.pushedAt || repo.updatedAt)}</span>
      </div>
    </motion.a>
  );
}

function RepoGrid({ repos }: { repos: Repo[] }) {
  const [filter, setFilter] = useState<string>("All");
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.language && set.add(r.language));
    return [...set].slice(0, 6);
  }, [repos]);

  const visible = useMemo(() => {
    let v = repos;
    if (filter === "Public") v = v.filter((r) => !r.isPrivate);
    else if (filter === "Private") v = v.filter((r) => r.isPrivate);
    else if (filter !== "All") v = v.filter((r) => r.language === filter);
    return v.slice(0, 12);
  }, [repos, filter]);

  if (!repos.length) {
    return (
      <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
        Repos will appear here once the GitHub token is configured.
      </div>
    );
  }

  const chips = ["All", "Public", "Private", ...languages];
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              filter === c
                ? "border-primary/60 bg-primary/15 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((r) => (
          <RepoCard key={r.id} repo={r} />
        ))}
      </div>
    </div>
  );
}

function GitHubInner() {
  const { data, isLoading, isError } = useQuery({
    ...githubQueryOptions,
    enabled: typeof window !== "undefined",
  });

  if (isLoading || isError || !data) {
    return <GitHubSkeleton />;
  }

  return (
    <div className="space-y-8">
      <GitHubSummary data={data} />
      <RepoGrid repos={data.repos} />
    </div>
  );
}

function GitHubSkeleton() {
  return <div className="glass-strong h-96 animate-pulse rounded-2xl" aria-hidden />;
}

export function GitHubSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">04 · Open Source</span>
          <h2 className="text-3xl md:text-5xl font-semibold">Live from my GitHub</h2>
          <p className="max-w-2xl text-muted-foreground">
            Real repositories, real languages, real timestamps — pulled live from my account.
            Private projects included.
          </p>
        </div>
        <GitHubInner />
      </div>
    </section>
  );
}
