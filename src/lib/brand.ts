/** Shared Calcmedical brand mark — keep favicons, OG, and header in sync. */
export const brand = {
  teal: "#0B3D38",
  mark: "#F7F7F5",
  viewBox: "0 0 64 64",
  path: "M18 34 36 18l14 10v20L36 58V40L18 50Z",
  radii: {
    /** 48px favicon */
    sm: 10,
    /** Header / app icon tile */
    md: 14,
    /** Apple touch icon */
    lg: 40,
  },
} as const;
