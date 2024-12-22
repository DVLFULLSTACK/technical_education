"use client";

import {
  Course,
  MuxData,
  Progress,
  Purchase,
  Resource,
  Section,
} from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { File, Loader2, Lock } from "lucide-react";
import { FileResource } from "./FileResource";
import { Button } from "@/components/ui/button";
import ReadText from "@/components/custom/ReadText";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import ProgressButton from "./ProgressButton";
import SectionMenu from "../layout/SectionMenu";
import YouTubePlayer from "./YoutubePlayer";
import PDFViewer from "./PDFViewer";
import { Card} from "@/components/ui/card"

interface SectionsDetailsProps {
  course: Course & { sections: Section[] };
  section: Section;
  purchase: Purchase | null;
  muxData: MuxData | null;
  resources: Resource[] | [];
  progress: Progress | null;
}

const SectionsDetails = ({
  course,
  section,
  purchase,
  muxData,
  resources,
  progress,
}: SectionsDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isLocked = !purchase && !section.isFree;
  console.log('Course: ',course)
  const buyCourse = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${course.id}/checkout`);
      window.location.assign(response.data.url);
    } catch (err) {
      console.log("Failed to chechout course", err);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-[2fr_1fr] px-2 gap-2">
       <Card className="px-6 py-4 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>

        <div className="flex gap-4">
          <SectionMenu course={course} />
          {!purchase ? (
            <Button onClick={buyCourse}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <p>Mua khóa học này</p>
              )}
            </Button>
          ) : (
            <ProgressButton
              courseId={course.id}
              sectionId={section.id}
              isCompleted={!!progress?.isCompleted}
            /> // !! converts falsy values to boolean false
          )}
        </div>
      </div>

      <ReadText value={section.description!} />

      {isLocked ? (
        <div className="px-10 flex flex-col gap-5 items-center bg-[#FFF8EB]">
          <Lock className="h-8 w-8" />
          <p className="text-sm font-bold">
            Video cho phần học này đã bị khóa. Vui lòng mua khóa học để truy cập
          </p>
        </div>
      ) : (
        // <MuxPlayer
        //   playbackId={muxData?.playbackId || ""}
        //   className="md:max-w-[600px]"
        // />
        <YouTubePlayer linkVideo={section.videoUrl || ""} />
      )}

      <div className="space-y-8">
        <h2 className="text-xl font-bold mb-5">Tài liệu hỗ trợ</h2>
        {resources.map((resource) => (
          <FileResource key={resource.id} resource={resource}/>
        ))}
      </div>
    </Card>
    <Card className="px-6 py-4 space-y-8">
    <h1 className="text-2xl font-bold max-md:mb-4">Exercise</h1>
    <div className="text-center space-y-4">
    <p className="text-gray-400 italic">Nhấn vào nút bên dưới để làm bài tập!</p>
    <Button asChild>
      <Link target="_blank"
      href={"https://leetclone.vercel.app/"}>
      Bài tập
      </Link>
    </Button>
    </div>

    </Card>
    </div>

  );
};

export default SectionsDetails;
