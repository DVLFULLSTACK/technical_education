import { ApiResponse } from "../types/api"; // Import ApiResponse
import { Purchase } from "@prisma/client"; // Giả sử bạn đang sử dụng Prisma
import { PurchaseFormInputs } from "@/types/purchase";
import { type PurchaseCustom } from "@/types/purchase";

const API_URL = "/api/purchases"; // URL của API

// Định nghĩa các action cho purchase
const purchaseAction = {
  // Lấy tất cả danh mục
  getAll: async (): Promise<ApiResponse<any[]>> => {
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

  // Tạo mới danh mục
  create: async (purchase: PurchaseFormInputs): Promise<ApiResponse<Purchase>> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( purchase ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: ApiResponse<Purchase> = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating purchase:", error);
      throw error;
    }
  },

  // Lấy danh mục theo ID
  getById: async (id: string): Promise<ApiResponse<PurchaseCustom>> => {
    const purchaseId = id
    try {
      const response = await fetch(`${API_URL}/${purchaseId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<PurchaseCustom> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching purchase with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật danh mục theo ID
  update: async (id: string, purchase: PurchaseFormInputs): Promise<ApiResponse<Purchase>> => {
    const purchaseId = id
    try {
      const response = await fetch(`${API_URL}/${purchaseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Purchase> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error updating purchase with id ${id}:`, error);
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
      console.error(`Error deleting purchase with id ${id}:`, error);
      throw error;
    }
  },

  checkExist: async ({courseId, userId} : {courseId: string, userId: string}) :Promise<ApiResponse<{isRegister: boolean}>> => {
    try {
      const response = await fetch(`${API_URL}/course/${courseId}/user/${userId}`, { method: "POST" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<{isRegister: boolean}> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching purchase with id ${courseId}:`, error);
      throw error;
    }
  }
};

export default purchaseAction;
