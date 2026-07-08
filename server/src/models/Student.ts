import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface StudentAttributes {
  id: number;
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  date_of_birth: Date;
  current_city: string;
  state: string;
  college_name: string;
  degree: string;
  branch: string;
  graduation_year: number;
  cgpa?: number;
  looking_for: string[];
  preferred_job_role: string;
  preferred_job_location: string;
  feature_interests: string[];
  campus_ambassador: 'yes' | 'no' | 'maybe';
  suggestions?: string;
  registration_source: string;
  registration_status: 'pending' | 'approved' | 'rejected';
  early_access_approved: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  rejection_reason?: string;
  created_at: Date;
  updated_at: Date;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id' | 'cgpa' | 'suggestions' | 'rejection_reason' | 'created_at' | 'updated_at'> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  declare id: number;
  declare registration_id: string;
  declare full_name: string;
  declare email: string;
  declare phone: string;
  declare whatsapp: string;
  declare gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  declare date_of_birth: Date;
  declare current_city: string;
  declare state: string;
  declare college_name: string;
  declare degree: string;
  declare branch: string;
  declare graduation_year: number;
  declare cgpa?: number;
  declare looking_for: string[];
  declare preferred_job_role: string;
  declare preferred_job_location: string;
  declare feature_interests: string[];
  declare campus_ambassador: 'yes' | 'no' | 'maybe';
  declare suggestions?: string;
  declare registration_source: string;
  declare registration_status: 'pending' | 'approved' | 'rejected';
  declare early_access_approved: boolean;
  declare email_verified: boolean;
  declare phone_verified: boolean;
  declare rejection_reason?: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    registration_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    whatsapp: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    current_city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    college_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    degree: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    branch: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    graduation_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cgpa: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true
    },
    looking_for: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    preferred_job_role: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    preferred_job_location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    feature_interests: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    campus_ambassador: {
      type: DataTypes.ENUM('yes', 'no', 'maybe'),
      allowNull: false,
      defaultValue: 'no'
    },
    suggestions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    registration_source: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'website'
    },
    registration_status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    early_access_approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    rejection_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'students',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['registration_id']
      },
      {
        fields: ['email']
      },
      {
        fields: ['phone']
      },
      {
        fields: ['registration_status']
      },
      {
        fields: ['college_name']
      },
      {
        fields: ['created_at']
      }
    ]
  }
);

export default Student;
