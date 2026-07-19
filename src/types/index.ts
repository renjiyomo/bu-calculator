// ========================================
// BU Calculator — Type Definitions
// Bicol University GWA Calculator
// ========================================

/** Valid numeric grades in BU's grading scale (1.0 to 3.0 in 0.1 increments, plus 5.0) */
export type NumericGrade =
  | 1.0 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9
  | 2.0 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9
  | 3.0 | 5.0;

/** Special non-numeric grade marks */
export type SpecialGrade = 'INC' | 'DRP';

/** All possible grade values */
export type Grade = NumericGrade | SpecialGrade;

/** A single subject/course entry */
export interface Subject {
  id: string;
  subjectCode: string;
  units: number;
  grade: Grade | '';
  isPeNstp: boolean;
}

/** A semester containing multiple subjects */
export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
  isCollapsed: boolean;
}

/** Result of a GWA computation */
export interface GWAResult {
  gwa: number;
  totalWeightedGrades: number;
  totalAcademicUnits: number;
  isValid: boolean;
  hasDisqualifyingGrades: boolean;
  disqualifyingSubjects: Subject[];
}

/** Semester honors evaluation */
export type SemesterHonor = 'president' | 'dean' | 'none' | 'disqualified';

export interface SemesterEvaluation {
  gwaResult: GWAResult;
  honor: SemesterHonor;
  honorLabel: string;
}

/** Latin honors evaluation */
export type LatinHonor = 'summa' | 'magna' | 'cum_laude' | 'none' | 'disqualified';

export interface LatinHonorsEvaluation {
  gwaResult: GWAResult;
  honor: LatinHonor;
  honorLabel: string;
  semesterSummaries: SemesterSummary[];
}

/** Summary of a single semester (used in cumulative view) */
export interface SemesterSummary {
  semesterId: string;
  semesterName: string;
  gwa: number;
  totalUnits: number;
  totalWeightedGrades: number;
  subjectCount: number;
  hasIssues: boolean;
}

/** Configurable rules/cutoffs */
export interface HonorsRules {
  // Semester honors GWA cutoffs (upper bounds, inclusive)
  presidentListerMax: number;
  deanListerMax: number;
  // Latin honors GWA cutoffs (upper bounds, inclusive)
  summaCumLaudeMax: number;
  magnaCumLaudeMax: number;
  cumLaudeMax: number;
  // Grades that disqualify from honors
  disqualifyingGrades: string[];
}

/** Default BU rules based on the academic handbook */
export const DEFAULT_RULES: HonorsRules = {
  presidentListerMax: 1.45,
  deanListerMax: 1.75,
  summaCumLaudeMax: 1.25,
  magnaCumLaudeMax: 1.45,
  cumLaudeMax: 1.75,
  disqualifyingGrades: ['5.0', 'INC', 'DRP'],
};

/** Navigation views */
export type View = 'semester' | 'cumulative' | 'settings';

/** App-level state */
export interface AppState {
  // Tool A: Semester calculator
  semesterSubjects: Subject[];
  // Tool B: Cumulative calculator
  semesters: Semester[];
  // Tool C: Rules
  rules: HonorsRules;
  // UI state
  activeView: View;
}
