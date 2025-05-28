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
  // Header
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text(formData.fullName, 20, 20);
  
  // Contact Information
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text([
    formData.email,
    formData.phone,
    formData.address
  ], 20, 30);
  
  // Education
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Education', 20, 50);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(formData.education, 20, 60);
  
  // Work Experience
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Work Experience', 20, 90);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(formData.workExperience, 20, 100);
  
  // Skills
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Skills', 20, 130);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(formData.skills, 20, 140);
  
  // Languages
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Languages', 20, 170);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(formData.languages, 20, 180);
};

const generateCreative = async (doc, formData) => {
  // Similar structure but with different styling
  // Add creative elements and colors
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text(formData.fullName, 20, 25);
  
  // Rest of the content with creative styling
  // ... (similar structure as Modern Professional but with different styling)
};

const generateMinimalist = async (doc, formData) => {
  // Minimalist design with lots of whitespace
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text(formData.fullName, 20, 30);
  
  // Rest of the content with minimalist styling
  // ... (similar structure as Modern Professional but with minimalist styling)
};

const generateTraditional = async (doc, formData) => {
  // Traditional design with classic formatting
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  doc.text(formData.fullName, 20, 25);
  
  // Rest of the content with traditional styling
  // ... (similar structure as Modern Professional but with traditional styling)
}; 