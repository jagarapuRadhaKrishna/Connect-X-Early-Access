import { PDFParse } from 'pdf-parse';
import * as mammoth from 'mammoth';

export interface ParsedResume {
  full_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  college_name?: string;
  degree?: string;
  branch?: string;
  graduation_year?: number;
  skills?: string[];
  github?: string;
  linkedin?: string;
  portfolio_website?: string;
  achievements?: string;
  projects?: string;
}

export class ResumeParser {
  static async parseResume(buffer: Buffer, mimeType: string): Promise<ParsedResume> {
    let text = '';

    try {
      console.log('Starting resume parsing for MIME type:', mimeType);

      if (mimeType === 'application/pdf') {
        console.log('Parsing PDF file...');
        const parser = new PDFParse({ data: buffer });
        const data = await parser.getText();
        await parser.destroy();
        text = data.text;
        console.log('PDF parsed, text length:', text.length);
      } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        console.log('Parsing DOCX file...');
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
        console.log('DOCX parsed, text length:', text.length);
      } else {
        console.log('Unsupported MIME type:', mimeType);
        throw new Error(`Unsupported file type: ${mimeType}`);
      }

      if (!text || text.length === 0) {
        console.error('No text extracted from file');
        throw new Error('No text could be extracted from the file');
      }

      return this.extractData(text);
    } catch (error: any) {
      console.error('Error parsing resume:', error.message);
      console.error('Error details:', error);
      throw new Error(`Failed to parse resume: ${error.message}`);
    }
  }

  private static extractData(text: string): ParsedResume {
    const result: ParsedResume = {};
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Extract email
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) {
      result.email = emailMatch[0];
    }

    // Extract phone (10-15 digits)
    const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
    if (phoneMatch) {
      result.phone = phoneMatch[0].replace(/[\+\(\)\-\s\.]/g, '').slice(0, 15);
    }

    // Extract name (usually first line or before email)
    const nameLine = lines.find(line => 
      line.length > 2 && 
      line.length < 50 && 
      !line.includes('@') &&
      !line.includes('http') &&
      /^[A-Za-z\s\.]+$/.test(line)
    );
    if (nameLine) {
      result.full_name = nameLine;
    }

    // Extract location (city, state, country)
    const locationKeywords = ['located in', 'based in', 'address', 'location'];
    const locationLine = lines.find(line => 
      locationKeywords.some(keyword => line.toLowerCase().includes(keyword))
    );
    if (locationLine) {
      const parts = locationLine.split(',').map(p => p.trim());
      if (parts.length >= 1) result.city = parts[0].replace(/located in|based in|address|location/gi, '').trim();
      if (parts.length >= 2) result.state = parts[1].trim();
      if (parts.length >= 3) result.country = parts[2].trim();
    }

    // Extract education (college, degree, branch, graduation year)
    const educationKeywords = ['education', 'university', 'college', 'institute', 'school', 'bachelor', 'master', 'b.tech', 'm.tech', 'b.e', 'm.e'];
    const educationSection = this.extractSection(lines, educationKeywords);
    
    if (educationSection) {
      // Extract college name
      const collegeLine = educationSection.find(line => 
        line.length > 5 && 
        !line.toLowerCase().includes('degree') &&
        !line.toLowerCase().includes('bachelor') &&
        !line.toLowerCase().includes('master')
      );
      if (collegeLine) result.college_name = collegeLine;

      // Extract degree
      const degreeKeywords = ['bachelor', 'master', 'b.tech', 'm.tech', 'b.e', 'm.e', 'b.sc', 'm.sc', 'phd'];
      const degreeLine = educationSection.find(line => 
        degreeKeywords.some(keyword => line.toLowerCase().includes(keyword))
      );
      if (degreeLine) result.degree = degreeLine;

      // Extract branch
      const branchKeywords = ['computer science', 'information technology', 'mechanical', 'electrical', 'civil', 'electronics', 'chemical'];
      const branchLine = educationSection.find(line => 
        branchKeywords.some(keyword => line.toLowerCase().includes(keyword))
      );
      if (branchLine) result.branch = branchLine;

      // Extract graduation year
      const yearMatch = text.match(/(20[0-9]{2})/g);
      if (yearMatch && yearMatch.length > 0) {
        const years = yearMatch.map(y => parseInt(y)).sort((a, b) => b - a);
        result.graduation_year = years[0];
      }
    }

    // Extract skills
    const commonSkills = [
      'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'c++', 'sql',
      'html', 'css', 'tailwind', 'mongodb', 'postgresql', 'mysql', 'aws', 'docker',
      'kubernetes', 'git', 'figma', 'ui/ux', 'design', 'marketing', 'seo', 'content',
      'flutter', 'react native', 'android', 'ios', 'swift', 'kotlin', 'machine learning',
      'ai', 'data science', 'analytics', 'excel', 'powerpoint', 'communication'
    ];
    
    const foundSkills = commonSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );
    if (foundSkills.length > 0) {
      result.skills = foundSkills.map(s => 
        s.charAt(0).toUpperCase() + s.slice(1)
      );
    }

    // Extract URLs (GitHub, LinkedIn, Portfolio)
    const urlMatches = text.match(/https?:\/\/[^\s]+/g);
    if (urlMatches) {
      urlMatches.forEach(url => {
        if (url.includes('github.com')) {
          result.github = url;
        } else if (url.includes('linkedin.com')) {
          result.linkedin = url;
        } else if (!url.includes('github') && !url.includes('linkedin')) {
          result.portfolio_website = url;
        }
      });
    }

    // Extract achievements and projects (simplified)
    const achievementsKeywords = ['achievement', 'award', 'honor', 'recognition'];
    const achievementsSection = this.extractSection(lines, achievementsKeywords);
    if (achievementsSection) {
      result.achievements = achievementsSection.slice(0, 3).join('. ');
    }

    const projectsKeywords = ['project', 'experience', 'work'];
    const projectsSection = this.extractSection(lines, projectsKeywords);
    if (projectsSection) {
      result.projects = projectsSection.slice(0, 3).join('. ');
    }

    return result;
  }

  private static extractSection(lines: string[], keywords: string[]): string[] | null {
    const startIndex = lines.findIndex(line => 
      keywords.some(keyword => line.toLowerCase().includes(keyword))
    );
    
    if (startIndex === -1) return null;

    // Get lines after the keyword until next major section
    const sectionLines: string[] = [];
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      // Stop if we hit another major section
      if (line.length < 50 && /^[A-Z][a-z]+$/.test(line)) {
        break;
      }
      sectionLines.push(line);
      // Limit section size
      if (sectionLines.length > 20) break;
    }

    return sectionLines.length > 0 ? sectionLines : null;
  }
}
