// ========================================
// BU Calculator — App Context
// Global state for subjects, semesters, rules, and navigation
// ========================================

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { Subject, Semester, QuickSemester, HonorsRules, View, CumulativeInputMode } from '../types';
import { DEFAULT_RULES } from '../types';
import {
  loadSemesterSubjects,
  saveSemesterSubjects,
  loadSemesters,
  saveSemesters,
  loadQuickSemesters,
  saveQuickSemesters,
  loadCumulativeMode,
  saveCumulativeMode,
  loadRules,
  saveRules,
  loadActiveView,
  saveActiveView,
  isUsingCustomRules,
} from '../utils/storage';
import {
  createEmptySubject,
  createEmptySemester,
  createEmptyQuickSemester,
  generateSemesterName,
} from '../utils/bu-computation';

interface AppContextValue {
  // Navigation
  activeView: View;
  setActiveView: (view: View) => void;

  // Tool A: Semester subjects
  semesterSubjects: Subject[];
  setSemesterSubjects: (subjects: Subject[]) => void;
  addSemesterSubject: () => void;
  removeSemesterSubject: (id: string) => void;
  updateSemesterSubject: (id: string, updates: Partial<Subject>) => void;
  clearSemesterSubjects: () => void;

  // Tool B: Cumulative semesters (detailed mode)
  semesters: Semester[];
  setSemesters: (semesters: Semester[]) => void;
  addSemester: () => void;
  removeSemester: (id: string) => void;
  updateSemester: (id: string, updates: Partial<Semester>) => void;
  addSubjectToSemester: (semesterId: string) => void;
  removeSubjectFromSemester: (semesterId: string, subjectId: string) => void;
  updateSubjectInSemester: (
    semesterId: string,
    subjectId: string,
    updates: Partial<Subject>
  ) => void;
  clearAllSemesters: () => void;
  toggleSemesterCollapse: (id: string) => void;

  // Tool B: Quick semesters (quick mode)
  cumulativeInputMode: CumulativeInputMode;
  setCumulativeInputMode: (mode: CumulativeInputMode) => void;
  quickSemesters: QuickSemester[];
  addQuickSemester: () => void;
  removeQuickSemester: (id: string) => void;
  updateQuickSemester: (id: string, updates: Partial<QuickSemester>) => void;
  clearQuickSemesters: () => void;

  // Tool C: Rules
  rules: HonorsRules;
  updateRules: (updates: Partial<HonorsRules>) => void;
  resetRules: () => void;
  hasCustomRules: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // ---- State initialization from localStorage ----
  const [activeView, setActiveViewState] = useState<View>(() => loadActiveView());
  const [semesterSubjects, setSemesterSubjectsState] = useState<Subject[]>(() =>
    loadSemesterSubjects()
  );
  const [semesters, setSemestersState] = useState<Semester[]>(() =>
    loadSemesters()
  );
  const [quickSemesters, setQuickSemestersState] = useState<QuickSemester[]>(() =>
    loadQuickSemesters()
  );
  const [cumulativeInputMode, setCumulativeInputModeState] = useState<CumulativeInputMode>(() =>
    loadCumulativeMode()
  );
  const [rules, setRulesState] = useState<HonorsRules>(() => loadRules());

  // ---- Persist on every change ----
  useEffect(() => {
    saveSemesterSubjects(semesterSubjects);
  }, [semesterSubjects]);

  useEffect(() => {
    saveSemesters(semesters);
  }, [semesters]);

  useEffect(() => {
    saveQuickSemesters(quickSemesters);
  }, [quickSemesters]);

  useEffect(() => {
    saveCumulativeMode(cumulativeInputMode);
  }, [cumulativeInputMode]);

  useEffect(() => {
    saveRules(rules);
  }, [rules]);

  useEffect(() => {
    saveActiveView(activeView);
  }, [activeView]);

  // ---- Navigation ----
  const setActiveView = useCallback((view: View) => {
    setActiveViewState(view);
  }, []);

  // ---- Tool A: Semester subjects ----
  const setSemesterSubjects = useCallback((subjects: Subject[]) => {
    setSemesterSubjectsState(subjects);
  }, []);

  const addSemesterSubject = useCallback(() => {
    setSemesterSubjectsState((prev) => [...prev, createEmptySubject()]);
  }, []);

  const removeSemesterSubject = useCallback((id: string) => {
    setSemesterSubjectsState((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      return filtered.length > 0 ? filtered : [createEmptySubject()];
    });
  }, []);

  const updateSemesterSubject = useCallback(
    (id: string, updates: Partial<Subject>) => {
      setSemesterSubjectsState((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const clearSemesterSubjects = useCallback(() => {
    setSemesterSubjectsState([createEmptySubject()]);
  }, []);

  // ---- Tool B: Cumulative semesters (detailed mode) ----
  const setSemesters = useCallback((semesters: Semester[]) => {
    setSemestersState(semesters);
  }, []);

  const addSemester = useCallback(() => {
    setSemestersState((prev) => {
      const name = generateSemesterName(prev.length);
      return [...prev, createEmptySemester(name)];
    });
  }, []);

  const removeSemester = useCallback((id: string) => {
    setSemestersState((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      return filtered.length > 0
        ? filtered
        : [createEmptySemester('Year 1 — Semester 1')];
    });
  }, []);

  const updateSemester = useCallback(
    (id: string, updates: Partial<Semester>) => {
      setSemestersState((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const toggleSemesterCollapse = useCallback((id: string) => {
    setSemestersState((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isCollapsed: !s.isCollapsed } : s
      )
    );
  }, []);

  const addSubjectToSemester = useCallback((semesterId: string) => {
    setSemestersState((prev) =>
      prev.map((s) =>
        s.id === semesterId
          ? { ...s, subjects: [...s.subjects, createEmptySubject()] }
          : s
      )
    );
  }, []);

  const removeSubjectFromSemester = useCallback(
    (semesterId: string, subjectId: string) => {
      setSemestersState((prev) =>
        prev.map((s) => {
          if (s.id !== semesterId) return s;
          const filtered = s.subjects.filter((sub) => sub.id !== subjectId);
          return {
            ...s,
            subjects: filtered.length > 0 ? filtered : [createEmptySubject()],
          };
        })
      );
    },
    []
  );

  const updateSubjectInSemester = useCallback(
    (semesterId: string, subjectId: string, updates: Partial<Subject>) => {
      setSemestersState((prev) =>
        prev.map((s) => {
          if (s.id !== semesterId) return s;
          return {
            ...s,
            subjects: s.subjects.map((sub) =>
              sub.id === subjectId ? { ...sub, ...updates } : sub
            ),
          };
        })
      );
    },
    []
  );

  const clearAllSemesters = useCallback(() => {
    setSemestersState([createEmptySemester('Year 1 — Semester 1')]);
  }, []);

  // ---- Tool B: Quick semesters ----
  const setCumulativeInputMode = useCallback((mode: CumulativeInputMode) => {
    setCumulativeInputModeState(mode);
  }, []);

  const addQuickSemester = useCallback(() => {
    setQuickSemestersState((prev) => {
      const name = generateSemesterName(prev.length);
      return [...prev, createEmptyQuickSemester(name)];
    });
  }, []);

  const removeQuickSemester = useCallback((id: string) => {
    setQuickSemestersState((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      return filtered.length > 0
        ? filtered
        : [createEmptyQuickSemester('Year 1 — Semester 1')];
    });
  }, []);

  const updateQuickSemester = useCallback(
    (id: string, updates: Partial<QuickSemester>) => {
      setQuickSemestersState((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const clearQuickSemesters = useCallback(() => {
    setQuickSemestersState([createEmptyQuickSemester('Year 1 — Semester 1')]);
  }, []);

  // ---- Tool C: Rules ----
  const updateRules = useCallback((updates: Partial<HonorsRules>) => {
    setRulesState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetRules = useCallback(() => {
    setRulesState(DEFAULT_RULES);
  }, []);

  const hasCustomRules = isUsingCustomRules(rules);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        semesterSubjects,
        setSemesterSubjects,
        addSemesterSubject,
        removeSemesterSubject,
        updateSemesterSubject,
        clearSemesterSubjects,
        semesters,
        setSemesters,
        addSemester,
        removeSemester,
        updateSemester,
        addSubjectToSemester,
        removeSubjectFromSemester,
        updateSubjectInSemester,
        clearAllSemesters,
        toggleSemesterCollapse,
        cumulativeInputMode,
        setCumulativeInputMode,
        quickSemesters,
        addQuickSemester,
        removeQuickSemester,
        updateQuickSemester,
        clearQuickSemesters,
        rules,
        updateRules,
        resetRules,
        hasCustomRules,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
