import { Course } from "@prisma/client";
import { ApiResponse } from "../types/api"; // Import ApiResponse


const API_URL = "/api/statistic"; // URL của API

// Định nghĩa các action cho statistic
const statisticAction = {
  // Lấy tất cả danh mục
  getOverviewStatistic: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<any[]> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },

  getPurchaseCount: async () : Promise<ApiResponse<number>> => {
    try {
      const response = await fetch(`${API_URL}/purchase`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<number> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },
  getPopularCourse: async () : Promise<ApiResponse<Course>> =>  {
    try {
      const response = await fetch(`${API_URL}/purchase/course`, { method: "GET"});

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Course> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  },
  getUserRegister: async () : Promise<ApiResponse<number>> =>  {
    try {
      const response = await fetch(`${API_URL}/purchase/user`, { method: "GET"});

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<number> = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Quăng lỗi ra ngoài để React Query xử lý
    }
  }

};

export default statisticAction;
