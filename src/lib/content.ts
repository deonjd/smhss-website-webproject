// Content loader utilities for CMS-ready JSON content
import siteContentData from '@/content/site-content.json';
import facultyData from '@/content/faculty.json';
import achievementsData from '@/content/achievements.json';
import galleryData from '@/content/gallery.json';
import newsData from '@/content/news.json';

// Types
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AcademicProgram {
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface AdmissionStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Activity {
  title: string;
  description: string;
  icon: string;
}

export interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  department: string;
  image: string;
}

export interface Achievement {
  id: number;
  year: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  featured: boolean;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  featured: boolean;
}

export interface SiteContent {
  school: {
    name: string;
    fullName: string;
    tagline: string;
    established: number;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  stats: {
    students: number;
    teachers: number;
    achievements: number;
    yearsOfExcellence: number;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    timeline: TimelineEvent[];
  };
  principal: {
    name: string;
    title: string;
    message: string;
    image: string;
  };
  academics: {
    title: string;
    subtitle: string;
    programs: AcademicProgram[];
  };
  admissions: {
    title: string;
    subtitle: string;
    steps: AdmissionStep[];
    faqs: FAQ[];
  };
  studentLife: {
    title: string;
    subtitle: string;
    activities: Activity[];
  };
  contact: {
    title: string;
    subtitle: string;
    mapUrl: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      youtube: string;
      twitter: string;
    };
  };
  footer: {
    quickLinks: { label: string; href: string }[];
    copyright: string;
  };
}

// Content getters
export function getSiteContent(): SiteContent {
  return siteContentData as unknown as SiteContent;
}

export function getFaculty(): FacultyMember[] {
  return facultyData as FacultyMember[];
}

export function getAchievements(): Achievement[] {
  return achievementsData as Achievement[];
}

export function getGallery(): GalleryItem[] {
  return galleryData as GalleryItem[];
}

export function getNews(): NewsItem[] {
  return newsData as NewsItem[];
}

export function getGalleryByCategory(category: string): GalleryItem[] {
  if (category === 'all') return getGallery();
  return getGallery().filter(item => item.category === category);
}

export function getFeaturedNews(): NewsItem[] {
  return getNews().filter(item => item.featured);
}
