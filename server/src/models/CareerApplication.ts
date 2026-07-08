import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface CareerApplicationAttributes {
  id: number
  application_id: string
  full_name: string
  email: string
  phone: string
  whatsapp: string
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  date_of_birth: Date
  city: string
  state: string
  country: string
  college_name: string
  degree: string
  branch: string
  graduation_year: number
  cgpa?: number
  role_applying_for: string
  experience_level: string
  current_status: string
  availability: string
  skills: string
  github?: string
  linkedin?: string
  portfolio_website?: string
  behance?: string
  dribbble?: string
  figma?: string
  resume_path?: string
  why_join: string
  why_select: string
  achievements: string
  projects: string
  contribution: string
  startup_agreement: boolean
  application_status: 'applied' | 'resume_review' | 'technical_assessment' | 'technical_interview' | 'founder_discussion' | 'selected' | 'offer' | 'joined' | 'rejected'
  interview_date?: Date
  selected: boolean
  rejected: boolean
  notes?: string
  created_at: Date
  updated_at: Date
}

interface CareerApplicationCreationAttributes extends Optional<CareerApplicationAttributes, 'id' | 'cgpa' | 'github' | 'linkedin' | 'portfolio_website' | 'behance' | 'dribbble' | 'figma' | 'resume_path' | 'interview_date' | 'selected' | 'rejected' | 'notes'> {}

class CareerApplication extends Model<CareerApplicationAttributes, CareerApplicationCreationAttributes> implements CareerApplicationAttributes {
  declare id: number
  declare application_id: string
  declare full_name: string
  declare email: string
  declare phone: string
  declare whatsapp: string
  declare gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  declare date_of_birth: Date
  declare city: string
  declare state: string
  declare country: string
  declare college_name: string
  declare degree: string
  declare branch: string
  declare graduation_year: number
  declare cgpa?: number
  declare role_applying_for: string
  declare experience_level: string
  declare current_status: string
  declare availability: string
  declare skills: string
  declare github?: string
  declare linkedin?: string
  declare portfolio_website?: string
  declare behance?: string
  declare dribbble?: string
  declare figma?: string
  declare resume_path?: string
  declare why_join: string
  declare why_select: string
  declare achievements: string
  declare projects: string
  declare contribution: string
  declare startup_agreement: boolean
  declare application_status: 'applied' | 'resume_review' | 'technical_assessment' | 'technical_interview' | 'founder_discussion' | 'selected' | 'offer' | 'joined' | 'rejected'
  declare interview_date?: Date
  declare selected: boolean
  declare rejected: boolean
  declare notes?: string
  declare readonly created_at: Date
  declare readonly updated_at: Date
}

CareerApplication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    application_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    whatsapp: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
      allowNull: false,
      defaultValue: 'prefer_not_to_say',
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    college_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    graduation_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cgpa: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
    role_applying_for: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    experience_level: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    current_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    availability: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    github: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    portfolio_website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    behance: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dribbble: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    figma: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    resume_path: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    why_join: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    why_select: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    achievements: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projects: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contribution: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startup_agreement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    application_status: {
      type: DataTypes.ENUM('applied', 'resume_review', 'technical_assessment', 'technical_interview', 'founder_discussion', 'selected', 'offer', 'joined', 'rejected'),
      allowNull: false,
      defaultValue: 'applied',
    },
    interview_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    selected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rejected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'career_applications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['email'] },
      { fields: ['phone'] },
      { fields: ['application_status'] },
      { fields: ['role_applying_for'] },
      { fields: ['created_at'] },
    ],
  }
)

export default CareerApplication
