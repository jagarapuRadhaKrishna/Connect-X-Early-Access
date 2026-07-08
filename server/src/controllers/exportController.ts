import { Response } from 'express';
import { Student } from '../models';
import * as XLSX from 'xlsx';
import PDFDocument from 'pdfkit';
import { Op } from 'sequelize';

export const exportToExcel = async (req: any, res: Response): Promise<void> => {
  try {
    const { status, college, graduation_year } = req.query;

    const where: any = {};
    if (status) where.registration_status = status;
    if (college) where.college_name = { [Op.like]: `%${college}%` };
    if (graduation_year) where.graduation_year = graduation_year;

    const students = await Student.findAll({
      where,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['password'] }
    });

    const data = students.map((student: any) => ({
      'Registration ID': student.registration_id,
      'Full Name': student.full_name,
      'Email': student.email,
      'Phone': student.phone,
      'WhatsApp': student.whatsapp,
      'Gender': student.gender,
      'Date of Birth': student.date_of_birth,
      'City': student.current_city,
      'State': student.state,
      'College': student.college_name,
      'Degree': student.degree,
      'Branch': student.branch,
      'Graduation Year': student.graduation_year,
      'CGPA': student.cgpa || 'N/A',
      'Looking For': student.looking_for.join(', '),
      'Preferred Role': student.preferred_job_role,
      'Preferred Location': student.preferred_job_location,
      'Feature Interests': student.feature_interests.join(', '),
      'Campus Ambassador': student.campus_ambassador,
      'Suggestions': student.suggestions || 'N/A',
      'Status': student.registration_status,
      'Registration Date': student.created_at
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=connectx-registrations-${Date.now()}.xlsx`);
    res.send(buffer);
  } catch (error) {
    console.error('Export to Excel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const exportToCSV = async (req: any, res: Response): Promise<void> => {
  try {
    const { status, college, graduation_year } = req.query;

    const where: any = {};
    if (status) where.registration_status = status;
    if (college) where.college_name = { [Op.like]: `%${college}%` };
    if (graduation_year) where.graduation_year = graduation_year;

    const students = await Student.findAll({
      where,
      order: [['created_at', 'DESC']],
      attributes: { exclude: ['password'] }
    });

    const data = students.map((student: any) => ({
      'Registration ID': student.registration_id,
      'Full Name': student.full_name,
      'Email': student.email,
      'Phone': student.phone,
      'WhatsApp': student.whatsapp,
      'Gender': student.gender,
      'Date of Birth': student.date_of_birth,
      'City': student.current_city,
      'State': student.state,
      'College': student.college_name,
      'Degree': student.degree,
      'Branch': student.branch,
      'Graduation Year': student.graduation_year,
      'CGPA': student.cgpa || 'N/A',
      'Looking For': student.looking_for.join(', '),
      'Preferred Role': student.preferred_job_role,
      'Preferred Location': student.preferred_job_location,
      'Feature Interests': student.feature_interests.join(', '),
      'Campus Ambassador': student.campus_ambassador,
      'Suggestions': student.suggestions || 'N/A',
      'Status': student.registration_status,
      'Registration Date': student.created_at
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=connectx-registrations-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Export to CSV error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const exportToPDF = async (req: any, res: Response): Promise<void> => {
  try {
    const { status, college, graduation_year } = req.query;

    const where: any = {};
    if (status) where.registration_status = status;
    if (college) where.college_name = { [Op.like]: `%${college}%` };
    if (graduation_year) where.graduation_year = graduation_year;

    const students = await Student.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit: 100,
      attributes: { exclude: ['password'] }
    });

    const doc = new PDFDocument({ margin: 30 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const buffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=connectx-registrations-${Date.now()}.pdf`);
      res.send(buffer);
    });

    // Header
    doc.fontSize(20).fillColor('#E63946').text('ConnectX Early Access Registrations', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).fillColor('#666').text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown();

    // Table header
    const tableTop = doc.y;
    const tableLeft = 30;
    const colWidths = [80, 100, 120, 80, 60, 60];
    const headers = ['ID', 'Name', 'Email', 'College', 'Role', 'Status'];

    doc.fontSize(9).fillColor('#333');
    headers.forEach((header, i) => {
      doc.text(header, tableLeft + colWidths.slice(0, i).reduce((a, b) => a + b, 0), tableTop, {
        width: colWidths[i],
        align: 'left'
      });
    });

    doc.moveDown(0.5);

    // Table rows
    students.forEach((student: any, index: number) => {
      const y = tableTop + 20 + (index * 15);
      
      if (y > 700) {
        doc.addPage();
        return;
      }

      const row = [
        student.registration_id,
        student.full_name,
        student.email,
        student.college_name,
        student.preferred_job_role,
        student.registration_status
      ];

      row.forEach((cell, i) => {
        doc.text(String(cell).substring(0, 20), tableLeft + colWidths.slice(0, i).reduce((a, b) => a + b, 0), y, {
          width: colWidths[i],
          align: 'left'
        });
      });
    });

    doc.end();
  } catch (error) {
    console.error('Export to PDF error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
