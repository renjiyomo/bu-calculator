// ========================================
// BU Calculator — PDF Export Utility
// ========================================

import type { SemesterEvaluation, LatinHonorsEvaluation, Subject, Semester, HonorsRules } from '../types';
import { formatGWA } from './bu-computation';
import { jsPDF } from 'jspdf';

// ----------------------------------------
// Semester Honors PDF (Tool A)
// ----------------------------------------

export function exportSemesterPDF(
  subjects: Subject[],
  evaluation: SemesterEvaluation,
  userName: string
): void {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;
  
  // Minimalist Palette
  const primaryColor = [17, 24, 39]; // Gray 900
  const textColor = [55, 65, 81]; // Gray 700
  const lightGray = [249, 250, 251]; // Gray 50
  const borderGray = [229, 231, 235]; // Gray 200

  // Top Minimalist Border
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, 210 - margin, y);
  
  y += 12;

  // Header Title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BICOL UNIVERSITY', margin, y);
  
  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128); // Gray 500
  doc.text('SEMESTER GWA REPORT', margin, y);
  
  y += 5;
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.line(margin, y, 210 - margin, y);

  y += 12;

  // Student Info
  if (userName) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`Student Name: ${userName}`, margin, y);
    y += 10;
  }

  // Result Summary Box (Minimalist Outline + Light Fill)
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.rect(margin, y, 170, 28, 'FD');
  
  y += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Semester GWA: ${formatGWA(evaluation.gwaResult.gwa)}`, margin + 6, y);
  
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`Total Academic Units: ${evaluation.gwaResult.totalAcademicUnits}`, margin + 6, y);
  
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`Honors Status: ${evaluation.honorLabel || 'No Honors'}`, margin + 6, y);

  y += 18;

  // Simplified Table Headers (Only Subject, Units, Grade)
  doc.setFillColor(243, 244, 246); // Gray 100
  doc.rect(margin, y - 5, 170, 9, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Subject Description', margin + 4, y + 1);
  doc.text('Units', 110, y + 1);
  doc.text('Grade', 155, y + 1);
  
  y += 8;

  // Rows
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  const academicSubjects = subjects.filter((s) => s.grade !== '');
  let isAlt = false;
  
  academicSubjects.forEach((subject, idx) => {
    if (y > 270) {
      doc.addPage();
      y = margin;
    }
    
    if (isAlt) {
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(margin, y - 5, 170, 7, 'F');
    }
    isAlt = !isAlt;

    const label = `Subject #${idx + 1}${subject.isNstp ? ' (NSTP Excluded)' : ''}`;
    doc.text(label, margin + 4, y);
    doc.text(String(subject.units), 110, y);
    doc.text(String(subject.grade), 155, y);
    
    y += 7;
  });

  // Footer
  y += 8;
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175); // Gray 400
  doc.text(
    `Generated via BU GWA Calculator · ${new Date().toLocaleDateString()}`,
    margin,
    y
  );

  doc.save('BU-Semester-GWA-Report.pdf');
}

// ----------------------------------------
// Cumulative Latin Honors PDF (Tool B)
// ----------------------------------------

export function exportCumulativePDF(
  semesters: Semester[],
  evaluation: LatinHonorsEvaluation,
  _rules: HonorsRules,
  userName: string
): void {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  // Minimalist Palette
  const primaryColor = [17, 24, 39];
  const textColor = [55, 65, 81];
  const lightGray = [249, 250, 251];
  const borderGray = [229, 231, 235];

  // Top Minimalist Border
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, 210 - margin, y);
  
  y += 12;

  // Header Title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BICOL UNIVERSITY', margin, y);
  
  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text('LATIN HONORS REPORT', margin, y);
  
  y += 5;
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.line(margin, y, 210 - margin, y);

  y += 12;

  // Student Info
  if (userName) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`Student Name: ${userName}`, margin, y);
    y += 10;
  }

  // Result Summary Box (Minimalist Outline + Light Fill)
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.rect(margin, y, 170, 28, 'FD');
  
  y += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`Cumulative GWA: ${formatGWA(evaluation.gwaResult.gwa)}`, margin + 6, y);
  
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`Total Academic Units: ${evaluation.gwaResult.totalAcademicUnits}`, margin + 6, y);
  
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`Latin Honors Status: ${evaluation.honorLabel || 'No Honors'}`, margin + 6, y);

  y += 18;

  // Semester summaries
  for (const summary of evaluation.semesterSummaries) {
    if (y > 250) {
      doc.addPage();
      y = margin;
    }

    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.rect(margin, y - 5, 170, 10, 'FD');
    
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(summary.semesterName, margin + 4, y + 1.5);
    
    y += 9;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(`Semester GWA: ${formatGWA(summary.gwa)}`, margin + 4, y);
    doc.text(`Academic Units: ${summary.totalUnits}`, 80, y);
    doc.text(`Subjects count: ${summary.subjectCount}`, 120, y);
    
    if (summary.hasIssues) {
      doc.setTextColor(220, 50, 50); // Muted red
      doc.setFont('helvetica', 'bold');
      doc.text('⚠ Disqualifying grade present', 150, y);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFont('helvetica', 'normal');
    }
    
    y += 5;

    // Individual subjects list for this semester
    const semester = semesters.find((s) => s.id === summary.semesterId);
    if (semester) {
      const activeSubjects = semester.subjects.filter((s) => s.grade !== '');
      activeSubjects.forEach((subject, idx) => {
        if (y > 270) {
          doc.addPage();
          y = margin;
        }
        doc.setFontSize(8);
        doc.text(
          `   Subject #${idx + 1} — ${subject.units} unit${subject.units > 1 ? 's' : ''} — Grade: ${subject.grade}${subject.isNstp ? ' (NSTP Excluded)' : ''}`,
          margin + 4,
          y
        );
        y += 4.5;
      });
    }
    y += 5;
  }

  // Footer
  y += 5;
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(
    `Generated via BU GWA Calculator · ${new Date().toLocaleDateString()}`,
    margin,
    y
  );

  doc.save('BU-Cumulative-GWA-Report.pdf');
}
