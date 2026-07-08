import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface RegistrationLogAttributes {
  id: number;
  student_id: number;
  action: string;
  details?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

interface RegistrationLogCreationAttributes extends Optional<RegistrationLogAttributes, 'id' | 'details' | 'ip_address' | 'user_agent' | 'created_at'> {}

class RegistrationLog extends Model<RegistrationLogAttributes, RegistrationLogCreationAttributes> implements RegistrationLogAttributes {
  declare id: number;
  declare student_id: number;
  declare action: string;
  declare details?: string;
  declare ip_address?: string;
  declare user_agent?: string;
  declare readonly created_at: Date;
}

RegistrationLog.init(
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
    action: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_agent: {
      type: DataTypes.TEXT,
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
    tableName: 'registration_logs',
    timestamps: true,
    underscored: true,
    updatedAt: false
  }
);

export default RegistrationLog;
