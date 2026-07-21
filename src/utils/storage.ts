// ========================================
// BU Calculator — localStorage Persistence
// ========================================

import type { AppState, Subject, Semester, QuickSemester, HonorsRules, CumulativeInputMode } from '../types';
import { DEFAULT_RULES } from '../types';
import { createEmptySubject, createEmptySemester, createEmptyQuickSemester } from './bu-computation';

const STORAGE_KEYS = {
  SEMESTER_SUBJECTS: 'bu-calc-semester-subjects',
  SEMESTERS: 'bu-calc-semesters',
  QUICK_SEMESTERS: 'bu-calc-quick-semesters',
  CUMULATIVE_MODE: 'bu-calc-cumulative-mode',
  RULES: 'bu-calc-rules',
  ACTIVE_VIEW: 'bu-calc-active-view',
  THEME: 'bu-calc-theme',
  USER_NAME: 'bu-calc-user-name',
} as const;

// ----------------------------------------
// Generic storage helpers
// ----------------------------------------

function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSetItem(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save to localStorage (key: ${key}):`, e);
  }
}

// ----------------------------------------
// Semester subjects (Tool A)
// ----------------------------------------

export function loadSemesterSubjects(): Subject[] {
  const subjects = safeGetItem<Subject[]>(STORAGE_KEYS.SEMESTER_SUBJECTS, []);
  return subjects.length > 0 ? subjects : [createEmptySubject(), createEmptySubject()];
}

export function saveSemesterSubjects(subjects: Subject[]): void {
  safeSetItem(STORAGE_KEYS.SEMESTER_SUBJECTS, subjects);
}

// ----------------------------------------
// Cumulative semesters (Tool B)
// ----------------------------------------

export function loadSemesters(): Semester[] {
  const semesters = safeGetItem<Semester[]>(STORAGE_KEYS.SEMESTERS, []);
  return semesters.length > 0
    ? semesters
    : [
        createEmptySemester('Year 1 — Semester 1'),
        createEmptySemester('Year 1 — Semester 2'),
      ];
}

export function saveSemesters(semesters: Semester[]): void {
  safeSetItem(STORAGE_KEYS.SEMESTERS, semesters);
}

// ----------------------------------------
// Quick semesters (Tool B — quick mode)
// ----------------------------------------

export function loadQuickSemesters(): QuickSemester[] {
  const qs = safeGetItem<QuickSemester[]>(STORAGE_KEYS.QUICK_SEMESTERS, []);
  return qs.length > 0
    ? qs
    : [
        createEmptyQuickSemester('Year 1 — Semester 1'),
        createEmptyQuickSemester('Year 1 — Semester 2'),
      ];
}

export function saveQuickSemesters(quickSemesters: QuickSemester[]): void {
  safeSetItem(STORAGE_KEYS.QUICK_SEMESTERS, quickSemesters);
}

// ----------------------------------------
// Cumulative input mode
// ----------------------------------------

export function loadCumulativeMode(): CumulativeInputMode {
  return safeGetItem<CumulativeInputMode>(STORAGE_KEYS.CUMULATIVE_MODE, 'quick');
}

export function saveCumulativeMode(mode: CumulativeInputMode): void {
  safeSetItem(STORAGE_KEYS.CUMULATIVE_MODE, mode);
}

// ----------------------------------------
// Rules (Tool C)
// ----------------------------------------

export function loadRules(): HonorsRules {
  return safeGetItem<HonorsRules>(STORAGE_KEYS.RULES, DEFAULT_RULES);
}

export function saveRules(rules: HonorsRules): void {
  safeSetItem(STORAGE_KEYS.RULES, rules);
}

// ----------------------------------------
// Active view
// ----------------------------------------

export function loadActiveView(): AppState['activeView'] {
  return safeGetItem<AppState['activeView']>(STORAGE_KEYS.ACTIVE_VIEW, 'semester');
}

export function saveActiveView(view: AppState['activeView']): void {
  safeSetItem(STORAGE_KEYS.ACTIVE_VIEW, view);
}

// ----------------------------------------
// Theme
// ----------------------------------------

export function loadTheme(): 'light' | 'dark' {
  return safeGetItem<'light' | 'dark'>(STORAGE_KEYS.THEME, 'light');
}

export function saveTheme(theme: 'light' | 'dark'): void {
  safeSetItem(STORAGE_KEYS.THEME, theme);
}

// ----------------------------------------
// User Profile
// ----------------------------------------

export function loadUserName(): string {
  return safeGetItem<string>(STORAGE_KEYS.USER_NAME, '');
}

export function saveUserName(name: string): void {
  safeSetItem(STORAGE_KEYS.USER_NAME, name);
}

/**
 * Checks if the current rules differ from the BU defaults.
 */
export function isUsingCustomRules(rules: HonorsRules): boolean {
  return JSON.stringify(rules) !== JSON.stringify(DEFAULT_RULES);
}
