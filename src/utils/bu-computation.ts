// ========================================
// BU Calculator — Computation Engine
// Bicol University GWA Calculator
//
// All GWA computation logic and honors evaluation
// rules are centralized here, based on the official
// Bicol University Student Handbook.
// ========================================

import type {
  Subject,
  Semester,
  Grade,
  GWAResult,
  SemesterHonor,
  SemesterEvaluation,
  LatinHonor,
  LatinHonorsEvaluation,
  SemesterSummary,
  HonorsRules,
} from '../types';

// ----------------------------------------
// Grade Utilities
// ----------------------------------------

/**
 * BU Grading Scale:
 * 1.0 (Outstanding) → 3.0 (Fair) in 0.1 increments
 * 5.0 = Failure
 * INC = Incomplete (must be removed within 1 academic year)
 * DRP = Dropped
 *
 * Grades 3.1–4.9 do NOT exist in BU's scale.
 */
export const VALID_NUMERIC_GRADES = [
  1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
  2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
  3.0, 5.0,
] as const;

export const SPECIAL_GRADES = ['INC', 'DRP'] as const;

export const ALL_GRADES: (number | string)[] = [
  ...VALID_NUMERIC_GRADES,
  ...SPECIAL_GRADES,
];

/**
 * Returns the adjectival rating for a BU numeric grade.
 */
export function getGradeLabel(grade: Grade): string {
  if (grade === 'INC') return 'Incomplete';
  if (grade === 'DRP') return 'Dropped';
  if (grade === 5.0) return 'Failure';

  const g = Number(grade);
  if (g >= 1.0 && g <= 1.4) return 'Outstanding';
  if (g >= 1.5 && g <= 1.9) return 'Superior';
  if (g >= 2.0 && g <= 2.4) return 'Very Satisfactory';
  if (g >= 2.5 && g <= 2.9) return 'Satisfactory';
  if (g === 3.0) return 'Fair';
  return '';
}

/**
 * Checks if a grade is a disqualifying mark based on the provided rules.
 * By default, 5.0, INC, and DRP are disqualifying.
 */
export function isDisqualifyingGrade(grade: Grade, rules: HonorsRules): boolean {
  const gradeStr = String(grade);
  return rules.disqualifyingGrades.includes(gradeStr);
}

/**
 * Checks if a grade is numeric (can be used in GWA computation).
 */
export function isNumericGrade(grade: Grade | ''): grade is number {
  return typeof grade === 'number';
}

// ----------------------------------------
// GWA Computation
// ----------------------------------------

/**
 * Computes the GWA for a list of subjects.
 *
 * Formula (per BU Handbook):
 *   GWA = Σ(Grade × Units) / Σ(Units)
 *
 * Rules:
 * - PE/NSTP subjects are EXCLUDED from computation
 * - Only numeric grades (1.0–3.0, 5.0) contribute to weighted sum
 * - INC and DRP do not have a numeric value but flag disqualification
 */
export function computeGWA(subjects: Subject[], rules: HonorsRules): GWAResult {
  // Filter out PE/NSTP subjects — they don't count toward GWA
  const academicSubjects = subjects.filter((s) => !s.isPeNstp && s.grade !== '');

  let totalWeightedGrades = 0;
  let totalAcademicUnits = 0;
  const disqualifyingSubjects: Subject[] = [];

  for (const subject of academicSubjects) {
    // Check for disqualifying grades
    if (isDisqualifyingGrade(subject.grade as Grade, rules)) {
      disqualifyingSubjects.push(subject);
    }

    // Only numeric grades contribute to the weighted sum
    if (isNumericGrade(subject.grade)) {
      totalWeightedGrades += subject.grade * subject.units;
      totalAcademicUnits += subject.units;
    }
  }

  // Cannot compute GWA if no academic units
  if (totalAcademicUnits === 0) {
    return {
      gwa: 0,
      totalWeightedGrades: 0,
      totalAcademicUnits: 0,
      isValid: false,
      hasDisqualifyingGrades: disqualifyingSubjects.length > 0,
      disqualifyingSubjects,
    };
  }

  // GWA is NOT rounded — we display it to 4 decimal places for precision
  const gwa = totalWeightedGrades / totalAcademicUnits;

  return {
    gwa,
    totalWeightedGrades,
    totalAcademicUnits,
    isValid: true,
    hasDisqualifyingGrades: disqualifyingSubjects.length > 0,
    disqualifyingSubjects,
  };
}

// ----------------------------------------
// Semester Honors Evaluation (Tool A)
// ----------------------------------------

/**
 * Evaluates semester honors based on the computed GWA.
 *
 * Per BU Handbook:
 * - President's Lister: GWA 1.00–1.45
 * - Dean's Lister: GWA 1.46–1.75
 * - Disqualified: Any 5.0, INC, or DRP in the semester
 */
export function evaluateSemesterHonors(
  subjects: Subject[],
  rules: HonorsRules
): SemesterEvaluation {
  const gwaResult = computeGWA(subjects, rules);

  // Immediate disqualification if any disqualifying grade is present
  if (gwaResult.hasDisqualifyingGrades) {
    return {
      gwaResult,
      honor: 'disqualified',
      honorLabel: 'Disqualified from Semester Honors',
    };
  }

  if (!gwaResult.isValid) {
    return {
      gwaResult,
      honor: 'none',
      honorLabel: 'Add subjects to compute GWA',
    };
  }

  let honor: SemesterHonor = 'none';
  let honorLabel = 'No semester honors';

  // Check President's Lister (GWA ≤ presidentListerMax)
  if (gwaResult.gwa >= 1.0 && gwaResult.gwa <= rules.presidentListerMax) {
    honor = 'president';
    honorLabel = "President's Lister";
  }
  // Check Dean's Lister (GWA > presidentListerMax AND ≤ deanListerMax)
  else if (gwaResult.gwa > rules.presidentListerMax && gwaResult.gwa <= rules.deanListerMax) {
    honor = 'dean';
    honorLabel = "Dean's Lister";
  }

  return { gwaResult, honor, honorLabel };
}

// ----------------------------------------
// Cumulative Latin Honors Evaluation (Tool B)
// ----------------------------------------

/**
 * Computes per-semester GWA summaries for display.
 */
export function computeSemesterSummaries(
  semesters: Semester[],
  rules: HonorsRules
): SemesterSummary[] {
  return semesters.map((semester) => {
    const result = computeGWA(semester.subjects, rules);
    return {
      semesterId: semester.id,
      semesterName: semester.name,
      gwa: result.gwa,
      totalUnits: result.totalAcademicUnits,
      totalWeightedGrades: result.totalWeightedGrades,
      subjectCount: semester.subjects.filter((s) => s.grade !== '').length,
      hasIssues: result.hasDisqualifyingGrades,
    };
  });
}

/**
 * Evaluates Latin Honors eligibility across all semesters.
 *
 * Per BU Handbook:
 * - Summa Cum Laude: GWA 1.00–1.25
 * - Magna Cum Laude: GWA 1.26–1.45
 * - Cum Laude: GWA 1.46–1.75
 *
 * Disqualification:
 * - Any 5.0, DRP, or unremoved INC in the ENTIRE curriculum
 * - No grade lower than 3.0 in any subject
 */
export function evaluateLatinHonors(
  semesters: Semester[],
  rules: HonorsRules
): LatinHonorsEvaluation {
  // Flatten all subjects across all semesters
  const allSubjects = semesters.flatMap((s) => s.subjects);

  // Compute cumulative GWA across all semesters
  const gwaResult = computeGWA(allSubjects, rules);

  // Compute per-semester summaries for the UI
  const semesterSummaries = computeSemesterSummaries(semesters, rules);

  // Immediate disqualification check
  if (gwaResult.hasDisqualifyingGrades) {
    return {
      gwaResult,
      honor: 'disqualified',
      honorLabel: 'Disqualified from Latin Honors',
      semesterSummaries,
    };
  }

  if (!gwaResult.isValid) {
    return {
      gwaResult,
      honor: 'none',
      honorLabel: 'Add semesters and subjects to compute cumulative GWA',
      semesterSummaries,
    };
  }

  let honor: LatinHonor = 'none';
  let honorLabel = 'No Latin Honors';

  // Check Summa Cum Laude
  if (gwaResult.gwa >= 1.0 && gwaResult.gwa <= rules.summaCumLaudeMax) {
    honor = 'summa';
    honorLabel = 'Summa Cum Laude';
  }
  // Check Magna Cum Laude
  else if (gwaResult.gwa > rules.summaCumLaudeMax && gwaResult.gwa <= rules.magnaCumLaudeMax) {
    honor = 'magna';
    honorLabel = 'Magna Cum Laude';
  }
  // Check Cum Laude
  else if (gwaResult.gwa > rules.magnaCumLaudeMax && gwaResult.gwa <= rules.cumLaudeMax) {
    honor = 'cum_laude';
    honorLabel = 'Cum Laude';
  }

  return { gwaResult, honor, honorLabel, semesterSummaries };
}

// ----------------------------------------
// Utility Helpers
// ----------------------------------------

/**
 * Formats a GWA to 4 decimal places without rounding.
 * We truncate rather than round to maintain precision per academic standards.
 */
export function formatGWA(gwa: number): string {
  if (gwa === 0) return '—';
  // Truncate to 4 decimal places (no rounding)
  const factor = Math.pow(10, 4);
  const truncated = Math.floor(gwa * factor) / factor;
  return truncated.toFixed(4);
}

/**
 * Creates a new empty subject with a unique ID.
 */
export function createEmptySubject(): Subject {
  return {
    id: crypto.randomUUID(),
    subjectCode: '',
    units: 3,
    grade: '',
    isPeNstp: false,
  };
}

/**
 * Creates a new empty semester with a unique ID and one empty subject row.
 */
export function createEmptySemester(name: string): Semester {
  return {
    id: crypto.randomUUID(),
    name,
    subjects: [createEmptySubject()],
    isCollapsed: false,
  };
}

/**
 * Generates a default semester name based on index.
 * E.g., index 0 → "Year 1 — Semester 1", index 3 → "Year 2 — Semester 2"
 */
export function generateSemesterName(index: number): string {
  const year = Math.floor(index / 2) + 1;
  const sem = (index % 2) + 1;
  return `Year ${year} — Semester ${sem}`;
}
