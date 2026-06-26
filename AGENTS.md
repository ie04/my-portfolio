# Project Instructions

This is a Next.js + React portfolio site.

## Development

- Use `npm run dev` for local development.
- Use `npm run build` to verify production builds.
- Keep visual design, layout, and portfolio content stable unless the requested change explicitly asks for UI or copy changes.
- Preserve the existing Tailwind utility and component patterns when editing UI.
- Keep server-only data access inside Next route handlers or server modules.
- After making UI changes, capture a screenshot positioned at the changed UI and inspect it for visual correctness before finalizing.
- Certification badges should open a neutral themed smoky-glass detail popup with metadata and a low-profile verification link instead of navigating directly; selection should use a smooth camera-style zoom that moves only the original selected SVG badge into the popup header area, hides all other constellation layers above the popup, then visibly draws the popup frame around it without an abrupt cut, badge halo, fully transparent panel, duplicate badge icon, color-coded popup accents, hover-driven grey/refocus pulsing, label overlap from drifting badges, or opacity inside infinitely repeating drift animations. The selected badge must remain inside the popup frame in Chrome. Badge nodes should use a stable outer SVG group for absolute position and an inner motion group for local drift/scale so Framer animations do not overwrite base coordinates. Badge labels should be rendered in a dedicated top SVG layer with slight repel offsets from neighboring badge icons so drifting icons cannot hide or sit underneath them.

## Git

- Do not rewrite published history unless explicitly requested.
- Keep commits focused and leave unrelated work untouched.
- Commit and push completed changes unless explicitly told not to.
- Update this file when new persistent project rules, features, or specifications are introduced.
