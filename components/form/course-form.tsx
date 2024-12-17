"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import courseAction from "@/app/actions/courseAction";
import levelAction from "@/app/actions/levelAction";
import { Spin } from "@/components/ui/loader";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import categoryAction from "@/app/actions/categoryAction";
import subCategoryAction from "@/app/actions/subCategoryAction";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// React Quill cần được render động vì không hỗ trợ SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import styles
import userAction from "@/app/actions/userAction";

// Schema Zod
const courseSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  subtitle: z.string().optional(),
  description: z.string().optional(), // Description chứa HTML
  imageUrl: z.string().url("Invalid image URL").optional(),
  price: z.union([z.number().min(0, "Price must be at least 0"), z.string().refine(val => !isNaN(Number(val)), {
    message: "Price must be a valid number as a string"
  })]).optional(),
  isPublished: z.boolean().default(false),
  categoryId: z.string().min(1, "Category is required!"),
  subCategoryId: z.string().optional(),
  levelId: z.string().min(1, "Level is required!"),
  instructorId: z.string()
});

export type CourseFormInputs = z.infer<typeof courseSchema>;

export default function CourseForm({ courseId }: { courseId?: string }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CourseFormInputs>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      price: 0,
      isPublished: false,
      categoryId: "",
      subCategoryId: "",
      levelId: "",
      instructorId: ""
    },
  });
  const { data: course, isLoading: isLoadingCourse, refetch: refetchCourse } = useQuery({
    queryKey: ["getCourse", courseId],
    queryFn: () => courseAction.getById(courseId!),
    enabled: !!courseId,
  });

  const selectedCategoryId = watch("categoryId");


  const { data: levels,isLoading: isLoadingLevel } = useQuery({
    queryKey: ["getLevels"],
    queryFn: levelAction.getAll,
  });

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["getCategories"],
    queryFn: categoryAction.getAll,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["getUsers"],
    queryFn: userAction.getAllInstructor,
  });

  const { data: subCategory, isLoading: isLoadingSubCategory, refetch: refetchSubCategory } = useQuery({
    queryKey: ["getSubCategories"],
    queryFn: () => subCategoryAction.getByCategoryId(watch("categoryId") || ""),
    enabled: !!watch("categoryId")
  });





  const onSubmit = async (data: CourseFormInputs) => {
    try {
      data.price = parseFloat(String(data.price))
      if (courseId) {
        const res = await courseAction.update(courseId, data);
        toast.success("Course updated successfully!");
        refetchCourse()
      } else {
        const res = await courseAction.create(data);
        toast.success("Course created successfully!");
        refetchCourse()
      }

    } catch (error) {
      console.error(error);
      toast.error("An error occurred!");
    }
  };

  useEffect(() => {
    if (course?.data) {
      const formData = {
        title: course.data.title || "",
        subtitle: course.data.subtitle || "",
        description: course.data.description || "",
        imageUrl: course.data.imageUrl || "",
        price: course.data.price || 0,
        isPublished: course.data.isPublished || false,
        categoryId: course.data.categoryId || "",
        subCategoryId: course.data.subCategoryId || "",
        levelId: course.data.levelId || "",
        instructorId: course.data.instructorId || ""
      };
      reset(formData);
    }
  }, [course, levels?.data, category?.data, reset, refetchCourse]);

  useEffect(() => {
    refetchSubCategory()
  },[watch("categoryId")])

  useEffect(() => {
    console.log('Error: ',errors)
  },[errors])
  if (isLoadingCourse || isLoadingLevel || isLoadingCategory || isLoadingSubCategory || isLoadingUsers) return <Spin></Spin>
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input id="subtitle" {...register("subtitle")} />
          {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <ReactQuill
            theme="snow"
            value={watch("description")}
            onChange={(value) => setValue("description", value, { shouldValidate: true })}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="imageUrl">Image</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          <img src={watch("imageUrl") || ""} alt="image"  className="rounded-sm mt-4 mx-auto"/>
          {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" {...register("price")} />
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Select
          key={watch("levelId")}
            onValueChange={(value) => setValue("levelId", value, { shouldValidate: true })}
            value={watch("levelId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              {levels?.data.map((level: { id: string; name: string }) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.levelId && <p className="text-red-500">{errors.levelId.message}</p>}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
          key={watch("categoryId")}
            onValueChange={(value) => {
              setValue("categoryId", value, { shouldValidate: true })
              setValue("subCategoryId", "")
            }}
            value={watch("categoryId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {category?.data.map((category: { id: string; name: string }) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
        </div>

        <div>
          <Label htmlFor="subCategory">SubCategory</Label>
          <Select
          key={watch("subCategoryId")}
            onValueChange={(value) => setValue("subCategoryId", value, { shouldValidate: true })}
            value={watch("subCategoryId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a subCategoryId" />
            </SelectTrigger>
            <SelectContent>
              {subCategory?.data.map((subCategory: { id: string; name: string }) => (
                <SelectItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
        </div>
        <div>
          <Label htmlFor="instructor">Instructor</Label>
          <Select
          key={watch("instructorId")}
            onValueChange={(value) => setValue("instructorId", value, { shouldValidate: true })}
            value={watch("instructorId")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a instructor" />
            </SelectTrigger>
            <SelectContent>
              {users?.data.map((user: any) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.lastName + " " + user.firstName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
        </div>
        <div className="space-y-4">
        <Label htmlFor="isPublished">Is Published?</Label>
        <div >
          <Switch  id="isPublished"
          {...register('isPublished')} // Đăng ký trường vào React Hook Form
          checked={watch("isPublished")}
          onCheckedChange={(checked) => setValue('isPublished', checked)} />
          </div>
        </div>
        </div>



      </div>

      <div className="text-center space-x-4">
      <Button isLoading={isSubmitting} type="submit" className="bg-green-400" >
        {courseId ? "Cập nhật" : "Tạo mới"}
      </Button>


      </div>
    </form>
  );
}
