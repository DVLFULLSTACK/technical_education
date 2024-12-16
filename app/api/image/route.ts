import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Đảm bảo đây là request multipart/form-data
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return new NextResponse("Unsupported Content Type", { status: 415 });
    }

    // Đọc dữ liệu từ body request
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image || !(image instanceof Blob)) {
      return new NextResponse("Image is required and must be a valid file", { status: 400 });
    }

    // Chuyển đổi Blob sang Buffer
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // Gửi yêu cầu tới API Imgur
    const uploadFormData = new FormData();
    uploadFormData.append("image", base64Image);
    uploadFormData.append("type", "base64");

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      },
      body: uploadFormData,
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ message: "Upload thành công", data }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Upload thất bại", error: data }, { status: 500 });
    }
  } catch (error) {
    console.error("[imgur_upload_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
