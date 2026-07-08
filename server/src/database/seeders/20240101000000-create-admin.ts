import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  
  await queryInterface.bulkInsert('admins', [
    {
      email: 'admin@connectx.ai',
      password: hashedPassword,
      full_name: 'Super Admin',
      role: 'super_admin',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('admins', {
    email: 'admin@connectx.ai'
  }, {});
}
