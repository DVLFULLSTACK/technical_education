import { ApiResponse } from "../types/api"; // Import ApiResponse
import { Note } from "@prisma/client"; // Giả sử bạn đang sử dụng Prisma
import { NoteInput } from "@/types/note";

const API_URL = "/api/notes"; // URL của API

// Định nghĩa các action cho note
const noteAction = {
  // Lấy tất cả danh mục
  getAll: async (): Promise<ApiResponse<Note[]>> => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Note[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },

  // Tạo mới danh mục
  create: async (note: NoteInput): Promise<ApiResponse<Note>> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( note ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Note> = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  },

  // Lấy danh mục theo ID
  getById: async (id: string): Promise<ApiResponse<Note>> => {
    const noteId = id
    try {
      const response = await fetch(`${API_URL}/${noteId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Note> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching note with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục theo ID
  update: async (id: string, note: NoteInput): Promise<ApiResponse<Note>> => {
    const noteId = id
    try {
      const response = await fetch(`${API_URL}/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Note> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating note with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa danh mục theo ID
  delete: async (id: string): Promise<string> => {
    const noteId = id
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      return response.statusText;
    } catch (error) {
      console.error(`Error deleting note with id ${id}:`, error);
      throw error;
    }
  },

  getBySection: async (id: string) => {
    console.log('fasfsafas');
    try {
      const response = await fetch(`${API_URL}/section/${id}`, { method: "GET"});

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Note[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  }
};

export default noteAction;
