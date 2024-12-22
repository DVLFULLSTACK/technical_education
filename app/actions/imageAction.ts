import { ApiResponse } from "../types/api"; // Import ApiResponse

const API_URL = "/api/image"; // URL của API


const imageAction = {

  upload: async (image: File): Promise<ApiResponse<{ link: string }>> => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<any> = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
};

export default imageAction;
