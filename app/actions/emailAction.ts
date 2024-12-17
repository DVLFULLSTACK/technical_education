import { ApiResponse } from "../types/api"; // Import ApiResponse
import { PostInput } from "@/types/post";


const API_URL = "/api/send-email"; // URL của API

// Định nghĩa các action cho post
const emailAction = {



  send: async (data: { to: string; subject: string; text: string }): Promise<string> => {
    try {
      console.log('Test mail');
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( data ),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      return response.statusText;
    } catch (error) {
      console.error("Error creating mail:", error);
      throw error;
    }
  },



};

export default emailAction;
