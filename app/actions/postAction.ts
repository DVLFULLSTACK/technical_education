import { ApiResponse } from "../types/api"; // Import ApiResponse
import { Post } from "@prisma/client"; // Giả sử bạn đang sử dụng Prisma
import { PostInput } from "@/types/post";


const API_URL = "/api/posts"; // URL của API

// Định nghĩa các action cho post
const postAction = {
  // Lấy tất cả danh mục
  getAll: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Post[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },


  create: async (post: PostInput): Promise<ApiResponse<Post>> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( post ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Post> = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },


  getById: async (id: string): Promise<ApiResponse<Post & { author: any}>> => {
    const postId = id
    try {
      const response = await fetch(`${API_URL}/${postId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Post & {author: any}> = await response.json();

      return result;
    } catch (error) {
      console.error(`Error fetching post with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục theo ID
  update: async (id: string, post: PostInput): Promise<ApiResponse<Post>> => {
    const postId = id
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Post> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating post with id ${id}:`, error);
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


      return response.statusText;
    } catch (error) {
      console.error(`Error deleting post with id ${id}:`, error);
      throw error;
    }
  },

  updateActive: async (id: string, post: Post): Promise<ApiResponse<Post>> => {
    const postId = id
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Post> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating post with id ${id}:`, error);
      throw error;
    }
  }
};

export default postAction;
