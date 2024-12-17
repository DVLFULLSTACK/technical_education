"use client";

import React, { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSchema, PostInput } from "@/types/post";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import { Card } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import postAction from "@/app/actions/postAction";
import imageAction from "@/app/actions/imageAction";
import { Input } from "@/components/ui/input";
import "react-quill/dist/quill.snow.css"; // Import styles
import { Spin } from "../ui/loader";
import toast from "react-hot-toast";
import { UserCard } from "./user-card";
import { Quill } from "react-quill";
import Editor from "./editor";
import { Label } from "@/components/ui/label";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const NewPostForm = () => {
  const { user } = useUser();
  const [clicked, setClicked] = useState(false);
  const [content,setContent] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      postName: "",
      authorId: "",
    },
  });

  const handleContentChange = useCallback((value: string) => {
    setContent(value)
    setValue("content",value, { shouldValidate: true})
    console.log('Test',value);
  }, [])



  const onSubmit = async (data: PostInput) => {
    try {
      data.authorId = user?.id || "";
      await postAction.create(data);
      toast.success("Đăng bài thành công");
      reset({
        content: "",
        postName: "",
        authorId: "",
      });
      setClicked(false)
      window.location.reload()
    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại");
    }
  };

  // const quillRef = useRef<ReactQuill | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      console.log('Testfsafsa')
      const response = await imageAction.upload(file);
      console.log(response)
      const imageUrl = response.data.link;

      // const quill = quillRef.current?.getEditor();
      // console.log('Qill: ',quill)
      // const range = quill?.getSelection();
      // if (range) {
      //   quill?.insertEmbed(range.index, "image", imageUrl);
      // }
      const newContent = watch("content") + `<img src="${imageUrl}">`
      handleContentChange(newContent)
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

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
  ];

  if (!user) return <Spin />;

  if (!clicked)
    return (
      <Card className="px-8 py-4 flex gap-2">
        <Image
          src={user.imageUrl}
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />
        <div
          className="bg-gray-200 rounded-full p-1 flex-grow cursor-pointer text-gray-400 flex items-center px-4"
          onClick={() => setClicked(true)}
        >
          Chia sẻ suy nghĩ của bạn...
        </div>
      </Card>
    );

  return (
    <div className="grid grid-cols-[1fr_5fr] gap-2">
      <UserCard user={user} />

      <Card className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg">
          <div className="mb-4 space-y-4">
          <div>
            <Label className="font-bold text-xl">Tiêu đề</Label>
            <Input {...register("postName")}/>
          </div>

          <Editor onChange={(value) => handleContentChange(value)}/>
            {/* <ReactQuill
              ref={quillRef}
              id="content"
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={handleContentChange}
              placeholder="Bạn đang nghĩ gì?"
              style={{ height: "200px" }}
              className="mt-1 block w-full rounded-md border-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            /> */}
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>



          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? "Đang đăng..." : "Đăng bài"}
          </Button>
        </form>

      </Card>
    </div>
  );
};

export default NewPostForm;
