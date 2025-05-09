import axios from 'axios';
import User from '../models/User.model';

const BASE_URL = 'https://68075345e81df7060eb9b8af.mockapi.io/auth';

// Mock API cho demo
export const loginUser = async (email: string, password: string) => {
  try {
    // Trong thực tế, đây sẽ là API call thực sự
    const response = await axios.get<User[]>(`${BASE_URL}?email=${email}`);
    
    // Giả lập việc kiểm tra mật khẩu (không nên làm thật như vậy)
    if (response.data.length > 0) {
      // Thêm token giả lập
      const user = {
        ...response.data[0],
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15)
      };
      
      // Lưu thông tin vào localStorage để duy trì phiên đăng nhập
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, success: true };
    }
    
    return { success: false, message: 'Email hoặc mật khẩu không đúng' };
  } catch (error) {
    return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập' };
  }
};

export const registerUser = async (userData: Omit<User, 'id' | 'token' | 'role'>) => {
  try {
    // Trong thực tế, đây sẽ là API call thực sự
    const response = await axios.post<User>(BASE_URL, {
      ...userData,
      role: 'user', // Mặc định là user
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`
    });
    
    // Thêm token giả lập
    const user = {
      ...response.data,
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15)
    };
    
    // Lưu thông tin vào localStorage để duy trì phiên đăng nhập
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, success: true };
  } catch (error) {
    return { success: false, message: 'Đã xảy ra lỗi khi đăng ký' };
  }
};

export const googleLogin = async (credential: string) => {
  try {
    // Trong thực tế, credential sẽ được gửi lên server để xác thực
    // Ở đây chúng ta giả lập phản hồi
    const mockUser: User = {
      id: 'google-' + Math.random().toString(36).substring(2, 10),
      name: 'Google User',
      email: 'google-user@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Google+User&background=random',
      token: 'google-token-' + Math.random().toString(36).substring(2, 15),
      role: 'user'
    };
    
    // Lưu thông tin vào localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { user: mockUser, success: true };
  } catch (error) {
    return { success: false, message: 'Đăng nhập bằng Google thất bại' };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr) as User;
  }
  return null;
}; 