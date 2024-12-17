import { ApiResponse } from "../types/api"; // Import ApiResponse
import { Comment } from "@prisma/client"; // Giả sử bạn đang sử dụng Prisma
import { CommentInput } from "@/types/comment";

const API_URL = "/api/comments"; // URL của API

// Định nghĩa các action cho comment
const commentAction = {
  // Lấy tất cả danh mục
  getAll: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Comment[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },


  create: async (comment: CommentInput): Promise<ApiResponse<Comment>> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( comment ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Comment> = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },


  getById: async (id: string): Promise<ApiResponse<Comment>> => {
    const commentId = id
    try {
      const response = await fetch(`${API_URL}/${commentId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Comment> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching comment with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục theo ID
  update: async (id: string, comment: CommentInput): Promise<ApiResponse<Comment>> => {
    const commentId = id
    try {
      const response = await fetch(`${API_URL}/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Comment> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating comment with id ${id}:`, error);
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
      console.error(`Error deleting comment with id ${id}:`, error);
      throw error;
    }
  },
  getByPostId: async (postId: string) => {

    try {
      const response = await fetch(`${API_URL}/post/${postId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<any> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching comment with id ${postId}:`, error);
      throw error;
    }
  }
};

export default commentAction;
