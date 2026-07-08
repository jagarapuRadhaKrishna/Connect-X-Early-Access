import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AdminAttributes {
  id: number;
  email: string;
  password: string;
  full_name: string;
  role: 'super_admin' | 'admin';
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id' | 'last_login' | 'created_at' | 'updated_at'> {}

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  declare id: number;
  declare email: string;
  declare password: string;
  declare full_name: string;
  declare role: 'super_admin' | 'admin';
  declare is_active: boolean;
  declare last_login?: Date;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('super_admin', 'admin'),
      allowNull: false,
      defaultValue: 'admin'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    last_login: {
      type: DataTypes.DATE,
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
    tableName: 'admins',
    timestamps: true,
    underscored: true
  }
);

export default Admin;
