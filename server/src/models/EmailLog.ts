import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface EmailLogAttributes {
  id: number;
  student_id: number;
  email_type: 'welcome' | 'approval' | 'rejection' | 'launch_announcement' | 'beta_invitation' | 'custom';
  recipient: string;
  subject: string;
  status: 'pending' | 'sent' | 'failed';
  error_message?: string;
  sent_at?: Date;
  created_at: Date;
}

interface EmailLogCreationAttributes extends Optional<EmailLogAttributes, 'id' | 'error_message' | 'sent_at' | 'created_at'> {}

class EmailLog extends Model<EmailLogAttributes, EmailLogCreationAttributes> implements EmailLogAttributes {
  declare id: number;
  declare student_id: number;
  declare email_type: 'welcome' | 'approval' | 'rejection' | 'launch_announcement' | 'beta_invitation' | 'custom';
  declare recipient: string;
  declare subject: string;
  declare status: 'pending' | 'sent' | 'failed';
  declare error_message?: string;
  declare sent_at?: Date;
  declare readonly created_at: Date;
}

EmailLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    email_type: {
      type: DataTypes.ENUM('welcome', 'approval', 'rejection', 'launch_announcement', 'beta_invitation', 'custom'),
      allowNull: false
    },
    recipient: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'failed'),
      allowNull: false,
      defaultValue: 'pending'
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'email_logs',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    indexes: [
      {
        fields: ['student_id']
      },
      {
        fields: ['email_type']
      },
      {
        fields: ['status']
      }
    ]
  }
);

export default EmailLog;
