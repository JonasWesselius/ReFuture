import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (formData, templateId) => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Add content based on template
  switch (templateId) {
    case 1: // Modern Professional
      await generateModernProfessional(doc, formData);
      break;
    case 2: // Creative
      await generateCreative(doc, formData);
      break;
    case 3: // Minimalist
      await generateMinimalist(doc, formData);
      break;
    case 4: // Traditional
      await generateTraditional(doc, formData);
      break;
    default:
      await generateModernProfessional(doc, formData);
  }
  
  // Save the PDF
  const pdfBlob = doc.output('blob');
  return pdfBlob;
};

const generateModernProfessional = async (doc, formData) => {
  // Header with accent line
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Name
  doc.setFontSize(24);
  doc.setTextColor(41, 128, 185);
  doc.text(formData.fullName, 20, 20);
  
  // Contact Information with icons
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const contactInfo = [
    `📧 ${formData.email}`,
    `📱 ${formData.phone}`,
    `📍 ${formData.address}`
  ].filter(Boolean);
  doc.text(contactInfo, 20, 35);
  
  // Section headers with accent color
  const sectionColor = [41, 128, 185];

 
  // Education
  if (formData.education) {
    doc.setFontSize(16);
    doc.setTextColor(...sectionColor);
    doc.text('Education', 20, 55);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const educationLines = doc.splitTextToSize(formData.education, 170);
    doc.text(educationLines, 20, 65);
  }
  
  // Work Experience
  if (formData.workExperience) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(...sectionColor);
    doc.text('Work Experience', 20, 75 + educationHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const experienceLines = doc.splitTextToSize(formData.workExperience, 170);
    doc.text(experienceLines, 20, 85 + educationHeight);
  }
  
  // Skills
  if (formData.skills) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(...sectionColor);
    doc.text('Skills', 20, 105 + educationHeight + experienceHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, 115 + educationHeight + experienceHeight);
  }
  
  // Languages
  if (formData.languages) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    const skillsHeight = formData.skills ? doc.getTextDimensions(formData.skills).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(...sectionColor);
    doc.text('Languages', 20, 135 + educationHeight + experienceHeight + skillsHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const languagesLines = doc.splitTextToSize(formData.languages, 170);
    doc.text(languagesLines, 20, 145 + educationHeight + experienceHeight + skillsHeight);
  }
};

const generateCreative = async (doc, formData) => {
  // Header with colored background
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, 210, 40, 'F');
  

  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text(formData.fullName, 20, 25);
  
  // Contact Information
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const contactInfo = [
    formData.email,
    formData.phone,
    formData.address
  ].filter(Boolean);
  doc.text(contactInfo, 20, 45);
  
  // Education
  if (formData.education) {
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Education', 20, 65);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const educationLines = doc.splitTextToSize(formData.education, 170);
    doc.text(educationLines, 20, 75);
  }
  
  // Work Experience
  if (formData.workExperience) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Work Experience', 20, 85 + educationHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const experienceLines = doc.splitTextToSize(formData.workExperience, 170);
    doc.text(experienceLines, 20, 95 + educationHeight);
  }
  
  // Skills
  if (formData.skills) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Skills', 20, 115 + educationHeight + experienceHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, 125 + educationHeight + experienceHeight);
  }
  
  // Languages
  if (formData.languages) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    const skillsHeight = formData.skills ? doc.getTextDimensions(formData.skills).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(41, 128, 185);
    doc.text('Languages', 20, 145 + educationHeight + experienceHeight + skillsHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const languagesLines = doc.splitTextToSize(formData.languages, 170);
    doc.text(languagesLines, 20, 155 + educationHeight + experienceHeight + skillsHeight);
  }
};

const generateMinimalist = async (doc, formData) => {
  // Name with thin font
  doc.setFontSize(28);
  doc.setTextColor(50, 50, 50);
  doc.text(formData.fullName, 20, 30);
  
  // Contact Information with subtle styling
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  const contactInfo = [
    formData.email,
    formData.phone,
    formData.address
  ].filter(Boolean);
  doc.text(contactInfo, 20, 40);
  
  // Add a subtle horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(20, 45, 190, 45);
  
  // Education
  if (formData.education) {
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('EDUCATION', 20, 60);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const educationLines = doc.splitTextToSize(formData.education, 170);
    doc.text(educationLines, 20, 70);
  }
  
  // Work Experience
  if (formData.workExperience) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('EXPERIENCE', 20, 80 + educationHeight);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const experienceLines = doc.splitTextToSize(formData.workExperience, 170);
    doc.text(experienceLines, 20, 90 + educationHeight);
  }
  
  // Skills
  if (formData.skills) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('SKILLS', 20, 110 + educationHeight + experienceHeight);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, 120 + educationHeight + experienceHeight);
  }
  
  // Languages
  if (formData.languages) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    const skillsHeight = formData.skills ? doc.getTextDimensions(formData.skills).h + 20 : 0;
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text('LANGUAGES', 20, 140 + educationHeight + experienceHeight + skillsHeight);
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const languagesLines = doc.splitTextToSize(formData.languages, 170);
    doc.text(languagesLines, 20, 150 + educationHeight + experienceHeight + skillsHeight);
  }
};

const generateTraditional = async (doc, formData) => {
  // Name

  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  doc.text(formData.fullName, 20, 25);

  // Contact Information
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const contactInfo = [
    formData.email,
    formData.phone,
    formData.address
  ].filter(Boolean);
  doc.text(contactInfo, 20, 35);
  
  // Education
  if (formData.education) {
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Education', 20, 55);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const educationLines = doc.splitTextToSize(formData.education, 170);
    doc.text(educationLines, 20, 65);
  }
  
  // Work Experience
  if (formData.workExperience) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Work Experience', 20, 75 + educationHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const experienceLines = doc.splitTextToSize(formData.workExperience, 170);
    doc.text(experienceLines, 20, 85 + educationHeight);
  }
  
  // Skills
  if (formData.skills) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Skills', 20, 105 + educationHeight + experienceHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, 115 + educationHeight + experienceHeight);
  }
  
  // Languages
  if (formData.languages) {
    const educationHeight = formData.education ? doc.getTextDimensions(formData.education).h + 20 : 0;
    const experienceHeight = formData.workExperience ? doc.getTextDimensions(formData.workExperience).h + 20 : 0;
    const skillsHeight = formData.skills ? doc.getTextDimensions(formData.skills).h + 20 : 0;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Languages', 20, 135 + educationHeight + experienceHeight + skillsHeight);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const languagesLines = doc.splitTextToSize(formData.languages, 170);
    doc.text(languagesLines, 20, 145 + educationHeight + experienceHeight + skillsHeight);
  }

}; 