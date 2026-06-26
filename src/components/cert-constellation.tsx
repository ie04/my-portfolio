import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
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

  useEffect(() => {
    if (!selectedId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId]);

  const hovered = hoverId && !selectedId ? byId.get(hoverId) ?? null : null;
  const selected = selectedId ? byId.get(selectedId) ?? null : null;
  const effectiveFamily: CertFamily | null = selected?.family ?? null;

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
  const cameraViewBox = selected
    ? `${selected.x - 180} ${selected.y - 76} 360 270`
    : "0 0 800 600";

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3" }}
        onMouseLeave={() => setHoverId(null)}
      >
        <motion.svg
          viewBox="0 0 800 600"
          animate={{ viewBox: cameraViewBox }}
          transition={{ duration: reduce ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
          preserveAspectRatio="xMidYMid meet"
          className={`absolute inset-0 h-full w-full ${selected ? "pointer-events-none z-30" : "z-0"}`}
        >
          <defs>
          </defs>

          <g>
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
                    animate={{ opacity: selected ? s.o * 0.18 : [s.o, s.o * 0.3, s.o] }}
                    transition={
                      selected
                        ? { duration: 0.7, ease: "easeOut" }
                        : { duration: 3 + s.t, repeat: Infinity, ease: "easeInOut", delay: s.t }
                    }
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
                    opacity={selected ? 0.08 : dim ? 0.15 : 0.35}
                    style={{ transition: "opacity 500ms" }}
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
                    opacity={selected ? (active ? 0.34 : 0.05) : dim ? 0.18 : active ? 0.9 : 0.55}
                    style={{ transition: "opacity 500ms, stroke-width 300ms" }}
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
                    opacity={selected ? (active ? 0.55 : 0.08) : active ? 0.8 : 0.35}
                    style={{ transition: "all 500ms" }}
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
                    opacity={selected ? 0 : dim ? 0.35 : active ? 1 : 0.85}
                    style={{
                      pointerEvents: "none",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      transition: "opacity 500ms",
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
                const isHovered = false;
                const isSelected = selectedId === n.id;
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
                const selectedOpacity = isSelected ? 1 : 0;
                const nodeAnim = selected
                  ? { x: 0, y: 0, scale: isSelected ? 0.72 : 0.82, opacity: selectedOpacity }
                  : reduce
                    ? { x: 0, y: 0, scale: 1, opacity: dim ? 0.35 : 1 }
                    : {
                        x: isHovered ? 0 : [0, driftX, 0, -driftX, 0],
                        y: isHovered ? 0 : [0, driftY, 0, -driftY, 0],
                        scale: 1,
                        opacity: dim ? 0.35 : 1,
                      };

                return (
                  <motion.g
                    key={n.id}
                    style={{
                      cursor: "pointer",
                      outline: "none",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                    animate={nodeAnim}
                    transition={
                      reduce
                        ? undefined
                        : selected
                          ? { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                          : {
                              duration: isHovered ? 0.2 : driftDur,
                              repeat: isHovered ? 0 : Infinity,
                              ease: "easeInOut",
                            }
                    }
                    onMouseEnter={() => setHoverId(n.id)}
                    onMouseDown={(event) => event.preventDefault()}
                    onFocus={() => setHoverId(n.id)}
                    onBlur={() => setHoverId(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open details for ${n.name} by ${n.issuer}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedId(n.id);
                      }
                    }}
                    onClick={() => setSelectedId(n.id)}
                  >
                    {/* Ambient halo */}
                    {!reduce && (
                      <motion.circle
                        cx={n.x}
                        cy={n.y}
                        r={half * 1.25}
                        fill={color}
                        opacity={0.04}
                        animate={
                          selected
                            ? { opacity: 0, scale: 1 }
                            : { opacity: [0.025, 0.07, 0.025], scale: [1, 1.08, 1] }
                        }
                        transition={
                          selected
                            ? { duration: 0.7, ease: "easeOut" }
                            : { duration: 4 + (n.driftSeed % 3), repeat: Infinity, ease: "easeInOut" }
                        }
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
                      opacity={selected ? 0 : isHovered ? 1 : 0.7}
                      style={{ pointerEvents: "none", fontWeight: 500, letterSpacing: "0.05em" }}
                    >
                      {n.short.toUpperCase()}
                    </text>
                  </motion.g>
                );
              })}
            </g>
          </g>
        </motion.svg>


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
              {tooltip.cert.verifyUrl && (
                <div className="mt-1 text-[10px] opacity-80">Click for details</div>
              )}
            </div>
          </div>
        )}

        <AnimatePresence>
          {selected && (
            <motion.div
              className="absolute inset-0 z-20 grid place-items-center px-4 py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.22 }}
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                className="absolute inset-0 bg-background/45 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.45 }}
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="cert-dialog-title"
                className="relative max-h-full w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-card/85 text-card-foreground shadow-2xl shadow-black/45 backdrop-blur-xl"
                initial={
                  reduce
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        clipPath: "inset(48% 48% 48% 48% round 18px)",
                      }
                }
                animate={
                  reduce
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        clipPath: "inset(0% 0% 0% 0% round 18px)",
                      }
                }
                exit={
                  reduce
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        clipPath: "inset(48% 48% 48% 48% round 18px)",
                      }
                }
                transition={{ duration: reduce ? 0 : 0.62, delay: reduce ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px origin-left"
                  style={{ background: FAMILY_META[selected.family].colorVar }}
                />
                <button
                  type="button"
                  aria-label="Close certification details"
                  className="absolute right-4 top-4 z-50 grid size-8 place-items-center rounded-full border border-white/15 bg-background/85 text-muted-foreground backdrop-blur transition hover:bg-primary/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onClick={() => setSelectedId(null)}
                >
                  ×
                </button>

                <motion.div
                  className="relative z-40 px-6 pb-6 pt-44 md:pt-48"
                  initial={reduce ? { opacity: 0 } : { opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                >
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: reduce ? 0 : 0.38, delay: reduce ? 0 : 1.02, ease: "easeOut" }}
                  >
                    <div className="pr-10">
                      <div
                        className="mb-2 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background: FAMILY_META[selected.family].colorVar,
                          color: "var(--constellation-bg)",
                        }}
                      >
                        {FAMILY_META[selected.family].label}
                      </div>
                      <h3 id="cert-dialog-title" className="text-xl font-semibold leading-tight">
                        {selected.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{selected.issuer}</p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <p className="text-sm leading-6 text-muted-foreground">{selected.description}</p>

                      <div className="rounded-xl border border-white/10 bg-background/70 px-4 py-3 backdrop-blur">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Awarded
                        </div>
                        <div className="mt-1 text-sm text-foreground">{selected.awarded}</div>
                      </div>

                      {selected.verifyUrl && (
                        <a
                          href={selected.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex text-sm font-medium text-primary underline-offset-4 transition hover:text-foreground hover:underline"
                        >
                          Click Here to Verify
                        </a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CertConstellation;
