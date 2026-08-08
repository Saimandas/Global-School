import React from "react";
import Container from "../ui/Container";
import {
  LibraryBig,
  MonitorSmartphone,
  Microscope,
  Bus,
  Dumbbell,
  Trees,
} from "lucide-react";

const facilities = [
  {
    id: 1,
    title: "Digital Library",
    description:
      "A well-stocked library with thousands of books, journals, and digital learning resources.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=80",
    icon: LibraryBig,
  },
  {
    id: 2,
    title: "Smart Classrooms",
    description:
      "Interactive classrooms equipped with modern teaching technology for engaging learning.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    icon: MonitorSmartphone,
  },
  {
    id: 3,
    title: "Science Laboratories",
    description:
      "Modern physics, chemistry, and biology labs that encourage practical learning.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
    icon: Microscope,
  },
  {
    id: 4,
    title: "Sports Complex",
    description:
      "Indoor and outdoor sports facilities that promote teamwork, fitness, and leadership.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80",
    icon: Dumbbell,
  },
  {
    id: 5,
    title: "School Transport",
    description:
      "Safe and reliable transport covering major routes with trained staff and GPS tracking.",
    image:
      "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=900&q=80",
    icon: Bus,
  },
  {
    id: 6,
    title: "Green Campus",
    description:
      "A peaceful and eco-friendly campus designed to create a healthy learning environment.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d3?w=900&q=80",
    icon: Trees,
  },
];

const Facilities = () => {
  return (
    <section className="bg-muted py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Campus Facilities
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold lg:text-5xl">
            A Campus Designed for Learning & Growth
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Our modern facilities provide students with the perfect environment
            to learn, explore, and excel both academically and personally.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <div
                key={facility.id}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-md">
                    <Icon size={28} />
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-semibold">
                    {facility.title}
                  </h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {facility.description}
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

export default Facilities;