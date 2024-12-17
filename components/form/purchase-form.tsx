"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import purchaseAction from "@/app/actions/purchaseAction";
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
import { PurchaseCustom } from "@/types/purchase";

// React Quill cần được render động vì không hỗ trợ SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import styles
import userAction from "@/app/actions/userAction";

// Schema Zod
import { purchaseSchema, type PurchaseFormInputs } from "@/types/purchase";


export default function PurchaseForm({ purchaseId }: { purchaseId?: string }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PurchaseFormInputs>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      courseId: "",
      customerId: "",

    },
  });
  const { data: purchase, isLoading: isLoadingPurchase, refetch: refetchPurchase } = useQuery({
    queryKey: ["getPurchase", purchaseId],
    queryFn: () => purchaseAction.getById(purchaseId!),
    enabled: !!purchaseId,
  });







  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["getUsers"],
    queryFn: userAction.getAllInstructor,
  });









  useEffect(() => {
    if (purchase?.data) {
      const formData = {
        customerId: purchase.data.customerId || "",
        courseId: purchase.data.courseId || ""
      };
      reset(formData);
    }
  }, [purchase, reset, refetchPurchase]);



  useEffect(() => {
    console.log('Error: ',errors)
  },[errors])
  if (isLoadingPurchase ||  isLoadingUsers) return <Spin></Spin>
  return (
    <form  >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="id">Purchase ID</Label>
          <Input id="id" value={purchase?.data.id} disabled/>
        </div>

        <div>
          <Label htmlFor="customer">Customer</Label>
          <Input id="customer" value={purchase?.data.customer.firstName + " "+purchase?.data.customer.lastName} disabled/>
        </div>

        <div>
          <Label htmlFor="course">Course</Label>
          <Input id="course" value={purchase?.data.course.title} disabled/>
        </div>

        <div>
          <Label htmlFor="id">Price</Label>
          <Input id="price" value={purchase?.data.course.price || ""} disabled/>
        </div>





      </div>


    </form>
  );
}
