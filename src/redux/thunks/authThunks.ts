import { Dispatch } from 'redux';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout as logoutAction,
} from '../actions/authActions';
import { loginUser, registerUser, logoutUser, googleLogin } from '../../service/authService';
import User from '../../models/User.model';

// Thunk action để đăng nhập
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(loginRequest());
    
    const result = await loginUser(email, password);
    
    if (result.success && result.user) {
      dispatch(loginSuccess(result.user));
      return { success: true };
    } else {
      dispatch(loginFailure(result.message || 'Đăng nhập thất bại'));
      return { success: false, message: result.message || 'Đăng nhập thất bại' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi';
    dispatch(loginFailure(errorMessage));
    return { success: false, message: errorMessage };
  }
};

// Thunk action để đăng ký
export const register = (userData: Omit<User, 'id' | 'token' | 'role'>) => async (dispatch: Dispatch) => {
  try {
    dispatch(registerRequest());
    
    const result = await registerUser(userData);
    
    if (result.success && result.user) {
      dispatch(registerSuccess(result.user));
      return { success: true };
    } else {
      dispatch(registerFailure(result.message || 'Đăng ký thất bại'));
      return { success: false, message: result.message || 'Đăng ký thất bại' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi';
    dispatch(registerFailure(errorMessage));
    return { success: false, message: errorMessage };
  }
};

// Thunk action để đăng nhập bằng Google
export const loginWithGoogle = (credential: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(loginRequest());
    
    const result = await googleLogin(credential);
    
    if (result.success && result.user) {
      dispatch(loginSuccess(result.user));
      return { success: true };
    } else {
      dispatch(loginFailure(result.message || 'Đăng nhập Google thất bại'));
      return { success: false, message: result.message || 'Đăng nhập Google thất bại' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi';
    dispatch(loginFailure(errorMessage));
    return { success: false, message: errorMessage };
  }
};

// Thunk action để đăng xuất
export const logout = () => (dispatch: Dispatch) => {
  logoutUser();
  dispatch(logoutAction());
}; 