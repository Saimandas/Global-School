import React from "react";
import Container from "../ui/Container";
import {
  GraduationCap,
  BookOpen,
  Award,
} from "lucide-react";

const staffMembers = [
  {
    id: 1,
    name: "Dr. Anil Sharma",
    role: "Principal",
    image: '/staff/Principal.JPG',
    icon: GraduationCap,
  },
  {
    id: 2,
    name: "Ms. Beauty Boro",
    role: "Teacher",
    image: "staff/Beauty Boro.jpeg",
    icon: BookOpen,
  },
  {
    id: 3,
    name: "Ms. Bindiya Boro",
    role: "Teacher",
    image: '/staff/Bindiya BORO.jpeg',
    icon: Award,
  },
  {
    id: 4,
    name: "Ms. Rangina Brahma",
    role: "Teacher",
    image: "staff/Rangina Brahma.jpeg",
    icon: BookOpen,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Principal & Teachers
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Meet Our Dedicated Educators
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Our principal and teachers are committed to creating a supportive
            learning environment where every student is encouraged to learn,
            grow, and achieve their full potential.
          </p>
        </div>

        {/* Staff */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staffMembers.map((staff) => {
            const Icon = staff.icon;

            return (
              <div
                key={staff.id}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Photo */}
                <div className="relative h-72 overflow-hidden bg-primary/5">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-background/90 text-primary shadow-md backdrop-blur-sm">
                    <Icon size={21} />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {staff.name}
                  </h3>

                  <p className="mt-1 font-medium text-primary">
                    {staff.role}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {staff.subject}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;