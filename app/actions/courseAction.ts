import { ApiResponse } from "../types/api"; // Import ApiResponse
import { Course } from "@prisma/client"; // Giả sử bạn đang sử dụng Prisma
import { CourseFormInputs } from "@/components/form/course-form";

const API_URL = "/api/courses"; // URL của API

// Định nghĩa các action cho course
const courseAction = {
  // Lấy tất cả danh mục
  getAll: async (): Promise<ApiResponse<Course[]>> => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Course[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },

  // Tạo mới danh mục
  create: async (course: CourseFormInputs): Promise<ApiResponse<Course>> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( course ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Course> = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  // Lấy danh mục theo ID
  getById: async (id: string): Promise<ApiResponse<Course>> => {
    const courseId = id
    try {
      const response = await fetch(`${API_URL}/${courseId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Course> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục theo ID
  update: async (id: string, course: CourseFormInputs): Promise<ApiResponse<Course>> => {
    const courseId = id
    try {
      const response = await fetch(`${API_URL}/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Course> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating course with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa danh mục theo ID
  delete: async (id: string): Promise<string> => {
    const courseId = id
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      return response.statusText;
    } catch (error) {
      console.error(`Error deleting course with id ${id}:`, error);
      throw error;
    }
  },

  checkout: async (id: string): Promise<ApiResponse<any>> => {
    const courseId = id
    try {
      const response = await fetch(`${API_URL}/${courseId}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<any> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating course with id ${id}:`, error);
      throw error;
    }
  },
};

export default courseAction;
