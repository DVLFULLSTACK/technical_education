"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentInput } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Card } from "../ui/card";
import Image from "next/image";
import toast from "react-hot-toast";
import { UserCard } from "./user-card";
import Editor from "./editor";
import { useParams } from "next/navigation";
import commentAction from "@/app/actions/commentAction";
import imageAction from "@/app/actions/imageAction";
import { Spin } from "../ui/loader";

export const NewCommentForm = ({ refetch }: { refetch: () => void }) => {
  const { user } = useUser();
  const params = useParams(); // Lấy route params từ URL
  const { id } = params;
  const [clicked, setClicked] = useState(false);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      authorId: "",
      postId: id + "",
    },
  });

  const handleContentChange = useCallback(
      (value: string) => {
        setContent(value);
        setValue("content", value, { shouldValidate: true });
      },
      [setValue] // Dependency hợp lệ
  );

  const onSubmit = async (data: CommentInput) => {
    try {
      data.authorId = user?.id || "";
      await commentAction.create(data);
      toast.success("Đăng bình luận thành công");
      reset({
        content: "",
      });
      refetch();
      setClicked(false);
    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const response = await imageAction.upload(file);
      const imageUrl = response.data.link;

      // Thêm ảnh vào nội dung
      const newContent = watch("content") + `<img src="${imageUrl}" />`;
      handleContentChange(newContent);
    } catch (error) {
      toast.error("Lỗi tải ảnh lên");
      console.error("Error uploading image:", error);
    }
  };

  const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  if (!user) return <Spin />;

  if (!clicked)
    return (
        <Card className="px-8 py-4 flex gap-2">
          <Image
              src={user.imageUrl}
              width={40}
              height={40}
              className="rounded-full"
              alt="User Avatar"
          />
          <div
              className="bg-gray-200 rounded-full p-1 flex-grow cursor-pointer text-gray-400 flex items-center px-4"
              onClick={() => setClicked(true)}
          >
            Để lại bình luận...
          </div>
        </Card>
    );

  return (
      <div className="grid grid-cols-[1fr_5fr] gap-2">
        <UserCard user={user} />

        <Card className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg">
            <div className="mb-4">
              <Editor onChange={handleContentChange} />
              {errors.content && (
                  <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? "Đang đăng..." : "Đăng bình luận"}
            </Button>
          </form>
        </Card>
      </div>
  );
};

export default NewCommentForm;
