import {
  Baby,
  BookOpen,
  GraduationCap,
  FlaskConical,
} from "lucide-react";

export const courses = [
  {
    id: 1,
    slug: "pre-primary",
    title: "Pre-Primary",
    classes: "Nursery – UKG",
    icon: Baby,
    image: "https://picsum.photos/id/1015/900/700",
    board: "School Curriculum",
    medium: "English",
    duration: "3 Years",
    streams: ["Early Childhood Education"],
    description:
      "Our Pre-Primary program provides a joyful and engaging environment where children develop foundational skills through play-based learning, creativity, and interactive activities.",
  },

  {
    id: 2,
    slug: "primary",
    title: "Primary",
    classes: "Classes I – V",
    icon: BookOpen,
    image: "https://picsum.photos/id/1018/900/700",
    board: "SEBA",
    medium: "English",
    duration: "5 Years",
    streams: ["Primary Education"],
    description:
      "The Primary section focuses on strengthening literacy, numeracy, communication, and problem-solving skills while encouraging curiosity and confidence in every child.",
  },

  {
    id: 3,
    slug: "secondary",
    title: "Secondary",
    classes: "Classes VI – X",
    icon: GraduationCap,
    image: "https://picsum.photos/id/1019/900/700",
    board: "SEBA",
    medium: "English",
    duration: "5 Years",
    streams: ["General Education"],
    description:
      "Students receive a balanced education with emphasis on academics, critical thinking, extracurricular activities, and preparation for board examinations.",
  },

  {
    id: 4,
    slug: "higher-secondary",
    title: "Higher Secondary",
    classes: "Classes XI – XII",
    icon: FlaskConical,
    image: "https://picsum.photos/id/1025/900/700",
    board: "AHSEC",
    medium: "English",
    duration: "2 Years",
    streams: ["Science", "Commerce", "Arts"],
    description:
      "Our Higher Secondary program prepares students for higher education and competitive examinations through experienced faculty, modern teaching methods, and career-focused guidance.",
  },
];