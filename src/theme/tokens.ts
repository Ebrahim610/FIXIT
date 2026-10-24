// Colors used outside of className (icons, Switch, tab bar). They match tailwind.config.js:
// brand = cobalt, accent = ochre, bone/sand/ink = neutrals.
export const colors = {
  background: '#F4F2ED',
  surface: '#FFFFFF',
  sand: '#E9E5DB',
  text: '#14171F',
  muted: '#6B6F7B',
  placeholder: '#9A9DA8',
  border: '#E9E5DB',
  primary: '#1F3FA8',
  primaryDark: '#152C78',
  primaryLight: '#E6EAF7',
  accent: '#C0801E',
  accentDark: '#8A5A12',
  accentLight: '#F8EFDC',
  danger: '#E11D48',
  success: '#16A34A',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radius = { sm: 8, md: 14, pill: 999 } as const;
