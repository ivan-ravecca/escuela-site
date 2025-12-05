import React from "react";
import { Link } from "react-router-dom";
import { Course } from "../../types/assistant";

interface CourseCardProps {
  course: Course;
  onSelect?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <Link
      to={course.path}
      className="block p-3 mb-2 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all duration-200 bg-white"
      onClick={() => onSelect?.(course.id)}
    >
      <h4 className="font-semibold text-sm text-gray-800 mb-1">
        {course.title}
      </h4>
      {course.description && (
        <p className="text-xs text-gray-600 line-clamp-2">
          {course.description}
        </p>
      )}
      <div className="mt-2 text-xs text-green-600 font-medium">
        Ver más →
      </div>
    </Link>
  );
};

export default CourseCard;
