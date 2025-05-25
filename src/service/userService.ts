import api from './apiInterceptors'; // 🔄 sử dụng Axios instance bạn đã cấu hình
import User from '../models/User.model';

export const getUsers = () => api.get<User[]>('/users');

export const updateUserRole = (id: string, role: 'admin' | 'user') =>
  api.patch(`/users/${id}/role`, { role });

export const updateUser = (user: Partial<User>) => {
  if (!user.id) throw new Error('User ID is required');
  return api.patch(`/users/${user.id}`, user);
};

export const deleteUser = (id: string) => api.delete(`/users/${id}`);
