export const THEME = {
  primary: "#1A73E8",
  secondary: "#34A853",
  accent: "#FFB300",
} as const;

export const ROLES = {
  user: "user",
  driver: "driver",
} as const;

export type Role = keyof typeof ROLES;
