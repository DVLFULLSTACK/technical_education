import { ApiResponse } from "../types/api"; // Import ApiResponse
import { Like } from "@prisma/client"; // Giả sử bạn đang sử dụng Prisma
import { LikeInput } from "@/types/like";

const API_URL = "/api/likes"; // URL của API

// Định nghĩa các action cho like
const likeAction = {
  // Lấy tất cả danh mục
  getAll: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Like[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },


  create: async (like: LikeInput): Promise<ApiResponse<Like>> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( like ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Like> = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating like:", error);
      throw error;
    }
  },


  getById: async (id: string): Promise<ApiResponse<Like>> => {
    const likeId = id
    try {
      const response = await fetch(`${API_URL}/${likeId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Like> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching like with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục theo ID
  update: async (id: string, like: LikeInput): Promise<ApiResponse<Like>> => {
    const likeId = id
    try {
      const response = await fetch(`${API_URL}/${likeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(like),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Like> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating like with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa danh mục theo ID
  delete: async (id: string): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const result: ApiResponse<null> = await response.json();
      return response.statusText;
    } catch (error) {
      console.error(`Error deleting like with id ${id}:`, error);
      throw error;
    }
  },
  getByPostId: async (postId: string) => {

    try {
      const response = await fetch(`${API_URL}/post/${postId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Like[]> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching like with id ${postId}:`, error);
      throw error;
    }
  }
};

export default likeAction;
