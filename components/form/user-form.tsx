"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import userAction from "@/app/actions/userAction";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import emailAction from "@/app/actions/emailAction";

// Định nghĩa schema cho form
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  unsafeMetadata: z.object({
    role: z.string().min(1, "Please select role!"),
  }),
});

type UserFormInputs = z.infer<typeof userSchema>;

export default function UserForm({ userId }: { userId: string }) {
  // Lấy dữ liệu người dùng từ API
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: () => userAction.getById(userId),
    enabled: !!userId, // Chỉ thực thi khi có userId
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      unsafeMetadata: {
        role: "", // Đảm bảo role là chuỗi, không phải đối tượng
      },
    },
  });

  // Cập nhật giá trị form khi dữ liệu người dùng có sẵn
  useEffect(() => {
    if (user?.data) {
      const formData = {
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        username: user.data.username || "",
        unsafeMetadata: {
          role: typeof user.data.unsafeMetadata?.role === "string"
            ? user.data.unsafeMetadata.role
            : "", // Đảm bảo role là chuỗi
        },
      };
      reset(formData); // Cập nhật form với dữ liệu đã xử lý
    }
  }, [user, reset]);

  const onSubmit = async (formData: UserFormInputs) => {
    try {
      const response = await userAction.update(userId, formData); // Cập nhật dữ liệu người dùng
      toast.success("Cập nhật thành công!");
      await emailAction.send({
        to: user?.data.emailAddresses[0].emailAddress || "",
        subject: "Thông tin của bạn đã được cập nhật",
        text: `Thân gửi ${user?.data.firstName},
Thông tin cá nhân của bạn vừa được cập nhật bởi quản trị viên. Vui lòng kiểm tra lại thông tin.`
      })
      refetch()
    } catch (error) {
      console.error(error);
      toast.error("Lỗi");
    }
  };

  // Hiển thị trạng thái loading và lỗi
  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="gap-4 grid grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} className="rounded-full"/>
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" {...register("lastName")} className="rounded-full"/>
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" {...register("username")} className="rounded-full"/>
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            {...register("unsafeMetadata.role")}
            className="block w-max p-2 border border-gray-300 rounded-full"
          >
            <option value="" disabled>Please select a role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          {errors.unsafeMetadata?.role && (
            <p className="text-red-500">{errors.unsafeMetadata.role.message}</p>
          )}
        </div>

      </div>
      <div className="flex justify-center gap-4">
        <Button className="bg-green-400" type="submit" disabled={!isDirty}>
          Update
        </Button>
        <Button
          className="bg-red-300"
          type="button"
          onClick={() => reset()} // Reset form khi hủy
          disabled={!isDirty}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
}
