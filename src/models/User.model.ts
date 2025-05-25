export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    token?: string;
    role: 'admin' | 'user';
    createdAt?: string;
    updatedAt?: string;
}

export default User; 