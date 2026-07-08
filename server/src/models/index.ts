import Admin from './Admin';
import Student from './Student';
import RegistrationLog from './RegistrationLog';
import EmailLog from './EmailLog';
import Notification from './Notification';
import AuditLog from './AuditLog';
import Setting from './Setting';
import CareerApplication from './CareerApplication';

// Define associations
Student.hasMany(RegistrationLog, { foreignKey: 'student_id', as: 'logs' });
RegistrationLog.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

Student.hasMany(EmailLog, { foreignKey: 'student_id', as: 'emailLogs' });
EmailLog.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

Admin.hasMany(AuditLog, { foreignKey: 'admin_id', as: 'auditLogs' });
AuditLog.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });

export {
  Admin,
  Student,
  RegistrationLog,
  EmailLog,
  Notification,
  AuditLog,
  Setting,
  CareerApplication
};
