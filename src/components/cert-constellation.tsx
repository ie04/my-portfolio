import { useMemo, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CERTS,
  CERT_ICONS,
  CROSS_EDGES,
  FAMILY_META,
  layoutCerts,
  backgroundStars,
  type CertFamily,
  type Positioned,
} from "./cert-constellation.data";

type Props = {
  className?: string;
};

export function CertConstellation({ className }: Props) {
  const nodes = useMemo(() => layoutCerts(), []);
  const stars = useMemo(() => backgroundStars(60), []);
  const reduce = useReducedMotion();

  const byId = useMemo(() => {
    const m = new Map<string, Positioned>();
    for (const n of nodes) m.set(n.id, n);
    return m;
  }, [nodes]);

  const [hoverId, setHoverId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const h = (w * 600) / 800;
      setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hovered = hoverId ? byId.get(hoverId) ?? null : null;
  const effectiveFamily: CertFamily | null = hovered?.family ?? null;

  const intraEdges = useMemo(() => {
    return nodes
      .filter((n) => {
        const fam = n.family;
        // Skip single-node families' self edge
        const famCount = CERTS.filter((c) => c.family === fam).length;
        return famCount > 1;
      })
      .map((n) => {
        const a = FAMILY_META[n.family].anchor;
        return { id: `intra-${n.id}`, family: n.family, x1: a.x, y1: a.y, x2: n.x, y2: n.y };
      });
  }, [nodes]);

  const crossEdges = useMemo(() => {
    return CROSS_EDGES.map(([aId, bId]) => {
      const a = byId.get(aId) ?? { x: FAMILY_META[aId as CertFamily]?.anchor.x ?? 400, y: FAMILY_META[aId as CertFamily]?.anchor.y ?? 300 };
      const b = byId.get(bId) ?? { x: FAMILY_META[bId as CertFamily]?.anchor.x ?? 400, y: FAMILY_META[bId as CertFamily]?.anchor.y ?? 300 };
      return { id: `x-${aId}-${bId}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
    });
  }, [byId]);

  const tooltip = hovered
    ? (() => {
        const px = (hovered.x / 800) * size.w;
        const py = (hovered.y / 600) * size.h;
        return { x: px, y: py, cert: hovered };
      })()
    : null;

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3" }}
        onMouseLeave={() => setHoverId(null)}
      >
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
          </defs>

          {/* Background stars */}
          <g>
            {stars.map((s, i) =>
              reduce ? (
                <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--constellation-star)" opacity={s.o} />
              ) : (
                <motion.circle
                  key={i}
                  cx={s.x}
                  cy={s.y}
                  r={s.r}
                  fill="var(--constellation-star)"
                  initial={{ opacity: s.o }}
                  animate={{ opacity: [s.o, s.o * 0.3, s.o] }}
                  transition={{ duration: 3 + s.t, repeat: Infinity, ease: "easeInOut", delay: s.t }}
                />
              )
            )}
          </g>

          {/* Cross-family edges */}
          <g>
            {crossEdges.map((e) => {
              const dim = effectiveFamily !== null;
              return (
                <line
                  key={e.id}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="var(--constellation-edge)"
                  strokeWidth={0.6}
                  strokeDasharray="3 6"
                  opacity={dim ? 0.15 : 0.35}
                  style={{ transition: "opacity 300ms" }}
                />
              );
            })}
          </g>

          {/* Intra-family edges */}
          <g>
            {intraEdges.map((e) => {
              const active = effectiveFamily === e.family;
              const dim = effectiveFamily !== null && !active;
              return (
                <line
                  key={e.id}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke={active ? FAMILY_META[e.family].colorVar : "var(--constellation-edge)"}
                  strokeWidth={active ? 1.4 : 0.9}
                  opacity={dim ? 0.18 : active ? 0.9 : 0.55}
                  style={{ transition: "opacity 300ms, stroke-width 300ms" }}
                />
              );
            })}
          </g>

          {/* Family anchor pulse */}
          <g>
            {(Object.keys(FAMILY_META) as CertFamily[]).map((fam) => {
              const a = FAMILY_META[fam].anchor;
              const active = effectiveFamily === fam;
              return (
                <circle
                  key={fam}
                  cx={a.x}
                  cy={a.y}
                  r={active ? 4 : 2.4}
                  fill={FAMILY_META[fam].colorVar}
                  opacity={active ? 0.8 : 0.35}
                  style={{ transition: "all 300ms" }}
                />
              );
            })}
          </g>

          {/* Family group labels (for multi-member families) */}
          <g>
            {(Object.keys(FAMILY_META) as CertFamily[]).map((fam) => {
              const members = CERTS.filter((c) => c.family === fam);
              if (members.length < 2) return null;
              const famNodes = nodes.filter((n) => n.family === fam);
              const maxY = famNodes.reduce((acc, n) => Math.max(acc, n.y), -Infinity);
              const a = FAMILY_META[fam].anchor;
              const active = effectiveFamily === fam;
              const dim = effectiveFamily !== null && !active;
              return (
                <text
                  key={`fam-${fam}`}
                  x={a.x}
                  y={maxY + 115}
                  textAnchor="middle"
                  fontSize="14"
                  fill={FAMILY_META[fam].colorVar}
                  opacity={dim ? 0.35 : active ? 1 : 0.85}
                  style={{
                    pointerEvents: "none",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    transition: "opacity 300ms",
                  }}
                >
                  {FAMILY_META[fam].label}
                </text>
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((n) => {
              const isHovered = hoverId === n.id;
              const famActive = effectiveFamily === n.family;
              const dim = effectiveFamily !== null && !famActive;
              const color = FAMILY_META[n.family].colorVar;
              const baseSize = 90;
              const size = isHovered ? baseSize * 1.3 : baseSize;
              const half = size / 2;
              const driftX = (n.driftSeed % 7) - 3;
              const driftY = ((n.driftSeed * 1.7) % 7) - 3;
              const driftDur = 6 + (n.driftSeed % 5);
              const icon = n.icon ?? CERT_ICONS[n.id];
              const nodeAnim = reduce
                ? { x: 0, y: 0 }
                : {
                    x: [0, driftX, 0, -driftX, 0],
                    y: [0, driftY, 0, -driftY, 0],
                  };

              return (
                <motion.g
                  key={n.id}
                  style={{ cursor: n.url ? "pointer" : "default" }}
                  animate={isHovered ? { x: 0, y: 0 } : nodeAnim}
                  transition={
                    reduce
                      ? undefined
                      : { duration: driftDur, repeat: Infinity, ease: "easeInOut" }
                  }
                  onMouseEnter={() => setHoverId(n.id)}
                  onFocus={() => setHoverId(n.id)}
                  onBlur={() => setHoverId(null)}
                  tabIndex={0}
                  role={n.url ? "button" : "img"}
                  aria-label={`${n.name} by ${n.issuer}`}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && n.url) {
                      e.preventDefault();
                      window.open(n.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  onClick={() => {
                    if (n.url) window.open(n.url, "_blank", "noopener,noreferrer");
                  }}
                  opacity={dim ? 0.35 : 1}
                >
                  {/* Ambient halo */}
                  {!reduce && (
                    <motion.circle
                      cx={n.x}
                      cy={n.y}
                      r={half * 1.25}
                      fill={color}
                      opacity={0.04}
                      animate={{ opacity: [0.025, 0.07, 0.025], scale: [1, 1.08, 1] }}
                      transition={{ duration: 4 + (n.driftSeed % 3), repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                    />
                  )}
                  {/* The cert icon image */}
                  {icon && (
                    <image
                      href={icon}
                      x={n.x - half}
                      y={n.y - half}
                      width={size}
                      height={size}
                      preserveAspectRatio="xMidYMid meet"
                      style={{ transition: "width 300ms, height 300ms, x 300ms, y 300ms" }}
                    />
                  )}
                  {/* Short label */}
                  <text
                    x={n.x}
                    y={n.y + half + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--constellation-label)"
                    opacity={isHovered ? 1 : 0.7}
                    style={{ pointerEvents: "none", fontWeight: 500, letterSpacing: "0.05em" }}
                  >
                    {n.short.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </g>
        </svg>


        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+18px)] animate-fade-in"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div
              className="rounded-lg border px-3 py-2 text-xs backdrop-blur-md shadow-lg"
              style={{
                background: "var(--constellation-tooltip-bg)",
                borderColor: "var(--constellation-tooltip-border)",
                color: "var(--constellation-label)",
                minWidth: 180,
              }}
            >
              <div
                className="mb-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                style={{
                  background: FAMILY_META[tooltip.cert.family].colorVar,
                  color: "var(--constellation-bg)",
                }}
              >
                {FAMILY_META[tooltip.cert.family].label}
              </div>
              <div className="font-semibold leading-tight" style={{ color: "var(--constellation-label-strong)" }}>
                {tooltip.cert.name}
              </div>
              <div className="mt-0.5 opacity-70">{tooltip.cert.issuer}</div>
              {tooltip.cert.url && (
                <div className="mt-1 text-[10px] opacity-80">Click to verify →</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertConstellation;
