import { useState } from "react";
import { useParams } from "react-router-dom";

import { courses } from "../../data/courses";
import { subjects } from "../../data/subject";
import { teachers } from "../../data/teachers";

import Container from "../../Components/ui/Container";

const CourseDetails = () => {
  const { slug } = useParams();

  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return (
      <Container className="py-10">
        <h2 className="text-center text-2xl font-semibold">
          Course not found.
        </h2>
      </Container>
    );
  }

  const courseSubjects = subjects.filter(
    (subject) => subject.id === course.id
  );

  const [selectedSubject, setSelectedSubject] = useState(courseSubjects[0]);

  const activeSubject = selectedSubject || courseSubjects[0];

  const filteredTeachers = teachers.filter(
    (teacher) => teacher.subjectId === activeSubject?.id
  );

  return (
    <Container className="py-8">
      {/* Course Section */}
      <div className="grid md:grid-cols-2 gap-6 bg-blue-50 rounded-2xl p-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            {course.title}
          </h1>

          <p className="mt-3 text-gray-700 leading-7">
            {course.description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-sm text-gray-500">Classes</p>
              <p className="font-semibold">{course.classes}</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-sm text-gray-500">Board</p>
              <p className="font-semibold">{course.board}</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-sm text-gray-500">Medium</p>
              <p className="font-semibold">{course.medium}</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{course.duration}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {course.streams.map((stream) => (
              <span
                key={stream}
                className="px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm"
              >
                {stream}
              </span>
            ))}
          </div>
        </div>

        <div>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-72 rounded-2xl object-cover"
          />
        </div>
      </div>

      {/* Subjects */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          Subjects
        </h2>

        <div className="flex flex-wrap gap-3">
          {courseSubjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`px-5 py-2 rounded-full transition ${
                activeSubject.id === subject.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">
          Teachers
        </h2>

        <p className="text-gray-600 mt-1">
          Teachers for{" "}
          <span className="font-medium">{activeSubject.name}</span>
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition"
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {teacher.name}
                </h3>

                <p className="text-blue-600 text-sm mt-1">
                  {activeSubject.name} Teacher
                </p>

                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-800">
                      Qualification:
                    </span>{" "}
                    {teacher.qualification}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800">
                      Experience:
                    </span>{" "}
                    {teacher.experience}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CourseDetails;