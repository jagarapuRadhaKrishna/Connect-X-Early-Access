import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface NotificationAttributes {
  id: number;
  recipient_id: number;
  recipient_type: 'admin' | 'student';
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  read_at?: Date;
  created_at: Date;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id' | 'read_at' | 'created_at'> {}

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  declare id: number;
  declare recipient_id: number;
  declare recipient_type: 'admin' | 'student';
  declare title: string;
  declare message: string;
  declare type: 'info' | 'success' | 'warning' | 'error';
  declare is_read: boolean;
  declare read_at?: Date;
  declare readonly created_at: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    recipient_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    recipient_type: {
      type: DataTypes.ENUM('admin', 'student'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('info', 'success', 'warning', 'error'),
      allowNull: false,
      defaultValue: 'info'
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    read_at: {
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
    tableName: 'notifications',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    indexes: [
      {
        fields: ['recipient_id', 'recipient_type']
      },
      {
        fields: ['is_read']
      }
    ]
  }
);

export default Notification;
