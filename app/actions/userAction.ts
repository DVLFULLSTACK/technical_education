import { ApiResponse } from "../types/api";
import { User} from "@clerk/nextjs/server"

const userAction = {
  getAll: async (): Promise<ApiResponse<User[]>> => {
    try {
      const response = await fetch("/api/users");

      // Kiểm tra nếu API không trả về trạng thái thành công
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Res: ',response)
      const result: ApiResponse<User[]> = await response.json();
      console.log('Tes: ',result)
      return result;
    } catch (error) {
      console.error(error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },

  getAllInstructor: async (): Promise<ApiResponse<User[]>> => {
    try {
      const response = await fetch("/api/users/instructor");

      // Kiểm tra nếu API không trả về trạng thái thành công
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Res: ',response)
      const result: ApiResponse<User[]> = await response.json();
      console.log('Tes: ',result)
      return result;
    } catch (error) {
      console.error(error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },

  // Lấy người dùng theo ID
  getById: async (id: string): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`/api/users/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response)
      const result: ApiResponse<User> = await response.json();
      console.log('Check: ',result)
      return result;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật thông tin người dùng
  update: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<User> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  // Xóa người dùng
  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<null> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  },
}
export default userAction
