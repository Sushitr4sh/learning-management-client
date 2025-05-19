import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import AccordionSections from "./AccordionSections";

const CoursePreview = ({ course }: CoursePreviewProps) => {
  const price = formatPrice(course.price);
  return (
    <div className="course-preview">
      <div className="course-preview__container">
        <div className="course-preview__image-wrapper">
          <Image
            src={"/placeholder.png"}
            alt="Course Preview"
            width={640}
            height={360}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="course-preview__title">{course.title}</h2>
          <p className="mb-4 text-md text-gray-400">by {course.teacherName}</p>
          <p className="text-sm text-customgreys-dirtyGrey">
            {course.description}
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-white-50/90">
            Course Content
          </h4>
          <AccordionSections sections={course.sections} />
        </div>
      </div>

      <div className="course-preview__container">
        <h3 className="mb-4 text-xl">Price Details (1 item)</h3>
        <div className="mb-4 flex justify-between text-base text-customgreys-dirtyGrey">
          <span className="font-bold">1x {course.title}</span>
          <span className="font-bold">{price}</span>
        </div>
        <div className="flex justify-between border-t border-customgreys-dirtyGrey pt-4">
          <span className="text-lg font-bold">Total Amount</span>
          <span className="text-lg font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
