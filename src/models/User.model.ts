type User = {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    token?: string;
    role?: 'admin' | 'user';
};

export default User; 