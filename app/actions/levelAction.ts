import { ApiResponse } from "../types/api"; // Import ApiResponse
import { Level } from "@prisma/client"; // Giả sử bạn đang sử dụng Prisma

const API_URL = "/api/level"; // URL của API

// Định nghĩa các action cho level
const levelAction = {
  // Lấy tất cả danh mục
  getAll: async (): Promise<ApiResponse<Level[]>> => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Level[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },

  // Tạo mới danh mục
  create: async (name: string): Promise<ApiResponse<Level>> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Level> = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating level:", error);
      throw error;
    }
  },

  // Lấy danh mục theo ID
  getById: async (id: string): Promise<ApiResponse<Level>> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Level> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching level with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục theo ID
  update: async (id: string, name: string): Promise<ApiResponse<Level>> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Level> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating level with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa danh mục theo ID
  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<null> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error deleting level with id ${id}:`, error);
      throw error;
    }
  },
};

export default levelAction;
