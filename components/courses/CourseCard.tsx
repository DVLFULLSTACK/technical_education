import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }: { course: Course }) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
      <Link
          href={`/courses/${course.id}/overview`}
          className="border rounded-lg cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative"
      >
        {/* Dấu chứng nhận */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2.25l3.125 6.372 7.045.639-5.35 4.95 1.452 6.789L12 17.434l-6.272 3.566 1.452-6.789-5.35-4.95 7.045-.639L12 2.25z"
            />
          </svg>
        </div>


        <Image
            src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
            alt={course.title}
            width={500}
            height={300}
            className="rounded-t-xl w-full object-cover aspect-[4/2]"
        />
        <div className="px-4 py-3 flex flex-col gap-2">
          <h2 className="text-lg font-bold hover:text-[#FDAB04]">{course.title}</h2>
          <div className="flex justify-between text-sm font-medium">
            {instructor && (
                <div className="flex gap-2 items-center">
                  <Image
                      src={
                        instructor.imageUrl
                            ? instructor.imageUrl
                            : "/avatar_placeholder.jpg"
                      }
                      alt={
                        instructor.fullName ? instructor.fullName : "Instructor photo"
                      }
                      width={30}
                      height={30}
                      className="rounded-full"
                  />
                  <p>{instructor.fullName}</p>
                </div>
            )}
            {level && (
                <div className="flex gap-2">
                  <Gem size={20} />
                  <p>{level.name}</p>
                </div>
            )}
          </div>

          <p className="text-sm font-bold">$ {course.price}</p>
        </div>
      </Link>
  );
};

export default CourseCard;
