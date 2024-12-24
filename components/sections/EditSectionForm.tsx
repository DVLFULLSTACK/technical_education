"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MuxData, Resource, Section } from "@prisma/client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, Trash } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RichEditor from "@/components/custom/RichEditor";
import FileUpload from "../custom/FileUpload";
import { Switch } from "@/components/ui/switch";
import ResourceForm from "@/components/sections/ResourceForm";
import Delete from "@/components/custom/Delete";
import PublishButton from "@/components/custom/PublishButton";
import YouTubePlayer from "./YoutubePlayer";
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Tiêu đề là bắt buộc và phải có ít nhất 2 ký tự",
  }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean().optional(),
});

interface EditSectionFormProps {
  section: Section & { resources: Resource[]; muxData?: MuxData | null };
  courseId: string;
  isCompleted: boolean;
}

const EditSectionForm = ({
  section,
  courseId,
  isCompleted,
}: EditSectionFormProps) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      description: section.description || "",
      videoUrl: section.videoUrl || "",
      isFree: section.isFree,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}`,
        values
      );
      toast.success("Phần học đã được cập nhật thành công");
      router.refresh();
    } catch (err) {
      console.log("Failed to update the section", err);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <Link href={`/instructor/courses/${courseId}/sections`}>
          <Button variant="outline" className="text-sm font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại chương trình học          </Button>
        </Link>

        <div className="flex gap-5 items-start">
          <PublishButton
            disabled={!isCompleted}
            courseId={courseId}
            sectionId={section.id}
            isPublished={section.isPublished}
            page="Section"
          />
          <Delete item="section" courseId={courseId} sectionId={section.id} />
        </div>
      </div>

      <h1 className="text-xl font-bold">Chi tiết phần học</h1>
      <p className="text-sm font-medium mt-2">
          Hoàn thành phần học này với thông tin chi tiết, video chất lượng và tài liệu để mang lại trải nghiệm học tập tốt nhất cho học viên
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tiêu đề <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ví dụ: Giới thiệu về Lập trình Web"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                    Mô tả <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RichEditor
                    placeholder="Phần học này sẽ cung cấp nội dung gì?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {section.videoUrl && (
            <div className="my-5">
              {/* <MuxPlayer
                playbackId={section.muxData?.playbackId || ""}
                className="md:max-w-[600px]"
              /> */}
              <YouTubePlayer linkVideo={section.videoUrl}/>
            </div>
          )}
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Video <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input  placeholder="Link youtube"
                  {...field}
                  />
                  {/* <FileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="sectionVideo"
                    page="Edit Section"
                  /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Khả năng truy cập</FormLabel>
                  <FormDescription>
                      Mọi người đều có thể truy cập phần học này MIỄN PHÍ
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Link href={`/instructor/courses/${courseId}/sections`}>
              <Button variant="outline" type="button">
                  Hủy bỏ
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Lưu"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <ResourceForm section={section} courseId={courseId} />
    </>
  );
};

export default EditSectionForm;
