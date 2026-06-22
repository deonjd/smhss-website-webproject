// Site-wide constants and configuration

export const SITE_CONFIG = {
  name: 'SMHSS Murickassery',
  fullName: "St. Mary's Higher Secondary School, Murickassery",
  url: 'https://smhssmurickassery.edu.in',
  description: "St. Mary's Higher Secondary School, Murickassery — Shaping Future Leaders Through Excellence. A premier educational institution in Idukki, Kerala.",
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Student Life', href: '#student-life' },
  { label: 'News', href: '#news' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Contact', href: '#contact' },
] as const;

export const GALLERY_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'campus', label: 'Campus' },
  { value: 'events', label: 'Events' },
  { value: 'sports', label: 'Sports' },
  { value: 'cultural', label: 'Cultural' },
] as const;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/smhssmurickassery',
  instagram: 'https://instagram.com/smhssmurickassery',
  youtube: 'https://youtube.com/@smhssmurickassery',
  twitter: 'https://twitter.com/smhssmry',
} as const;
