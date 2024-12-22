"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import categoryAction from "@/app/actions/categoryAction";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Định nghĩa schema cho form
const categorySchema = z.object({
  name: z.string().min(1, "Required!"),
});

type CategoryFormInputs = z.infer<typeof categorySchema>;

export default function CategoryForm({
  categoryId,
}: {
  categoryId?: string;
}) {
  // Nếu categoryId có, thì chế độ là Update, nếu không thì là Create
  const isUpdateMode = !!categoryId;
  const router = useRouter()

  // Lấy dữ liệu category khi ở chế độ Update
  const { data: category, isLoading, error, refetch } = useQuery({
    queryKey: ["getCategory", categoryId],
    queryFn: () => categoryAction.getById(categoryId!),
    enabled: !!categoryId, // Chỉ thực thi khi có categoryId
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CategoryFormInputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  // Cập nhật giá trị form khi dữ liệu category có sẵn (chế độ Update)
  useEffect(() => {
    if (category?.data) {
      const formData = {
        name: category.data.name || "",
      };
      reset(formData); // Cập nhật form với dữ liệu đã xử lý
    }
  }, [category, reset]);

  const onSubmit = async (formData: CategoryFormInputs) => {
    try {
      if (isUpdateMode) {
        // Cập nhật nếu ở chế độ Update
        const response = await categoryAction.update(categoryId!, formData.name);
        toast.success("Cập nhật thành công!");
        refetch();
      } else {
        // Tạo mới nếu ở chế độ Create
        const response = await categoryAction.create(formData.name);
        toast.success("Tạo danh mục mới thành công!");

        router.push(`/admin/category/${response.data.id}`)
      }
      // Sau khi thành công, refetch dữ liệu mới

    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xử lý yêu cầu!");
    }
  };

  // Hiển thị trạng thái loading và lỗi
  if (isLoading) return <p>Loading category data...</p>;
  if (error) return <p>Error loading category data.</p>;

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="gap-4 grid grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} className="rounded-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-row items-end gap-4">
          <Button
            isLoading={isSubmitting}
            className="bg-green-400"
            type="submit"
            disabled={!isDirty}
          >
            {isUpdateMode ? "Update" : "Create"} {/* Thay đổi nút theo chế độ */}
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
      </div>
    </form>

  );
}
