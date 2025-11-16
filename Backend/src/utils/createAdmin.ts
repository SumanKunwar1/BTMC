import User from '../models/User';
import bcrypt from 'bcryptjs';

export const createAdminUser = async (): Promise<void> => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);
      
      await User.create({
        name: 'BTMC Admin',
        email: process.env.ADMIN_EMAIL!,
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      
      console.log('👑 Admin user created successfully');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  }
};