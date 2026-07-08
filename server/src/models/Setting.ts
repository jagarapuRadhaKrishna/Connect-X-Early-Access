import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SettingAttributes {
  id: number;
  key: string;
  value: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

interface SettingCreationAttributes extends Optional<SettingAttributes, 'id' | 'description' | 'created_at' | 'updated_at'> {}

class Setting extends Model<SettingAttributes, SettingCreationAttributes> implements SettingAttributes {
  declare id: number;
  declare key: string;
  declare value: string;
  declare description?: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
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
    tableName: 'settings',
    timestamps: true,
    underscored: true
  }
);

export default Setting;
