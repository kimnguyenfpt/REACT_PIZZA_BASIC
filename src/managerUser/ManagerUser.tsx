// 📄 ManagerUser.tsx
import { useEffect, useState } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { getUsers, updateUserRole, deleteUser, updateUser } from '../service/userService';
import User from '../models/User.model';
import EditUserModal from '../modal/EditUserModal';
import DeleteModal from '../modal/DeleteModal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function ManagerUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'user'>('all');

  const [editUser, setEditUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleteUserName, setDeleteUserName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('Lỗi khi tải người dùng:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: 'admin' | 'user') => {
    try {
      await updateUserRole(id, newRole);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
      );
    } catch (err) {
      console.error('Lỗi khi cập nhật vai trò:', err);
    }
  };

  const handleModalSave = async (updated: Partial<User>) => {
    try {
      await updateUser(updated);
      setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u))
      );
    } catch (err) {
      console.error('Lỗi khi lưu người dùng:', err);
    } finally {
      setIsModalOpen(false);
    }
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string, name: string) => {
    setDeleteUserId(id);
    setDeleteUserName(name);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;
    try {
      await deleteUser(deleteUserId);
      setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
    } catch (err) {
      console.error('Lỗi khi xóa người dùng:', err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    filterRole === 'all' ? users : users.filter((u) => u.role === filterRole);

  return (
    <div className="p-6 text-[#14274e] dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">👥 Danh sách người dùng</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Lọc theo vai trò:</span>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as 'admin' | 'user' | 'all')}
            className="px-2 py-1 text-sm border rounded-md"
          >
            <option value="all">Tất cả</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow dark:border-gray-700">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#613aff] text-white">
              <tr>
                <th className="px-4 py-3">STT</th>
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`$${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-[#f7f3ff] dark:bg-[#2a2a2a]'} border-b dark:border-gray-700`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="flex justify-center gap-2 px-4 py-3">
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={() => openEditModal(user)}
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                      Sửa
                    </button>
                    <button
                      onClick={() => openDeleteModal(user.id!, user.name)}
                      className="flex items-center gap-1 px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    Không có người dùng nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal sửa */}
      <EditUserModal
        user={editUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
      />

      {/* Modal xoá */}
      {isDeleteModalOpen && (
        <DeleteModal
          type="người dùng"
          name={deleteUserName}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
