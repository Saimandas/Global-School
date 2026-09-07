import React from "react";
import Container from "../UI/Container";
import {
  GraduationCap,
  Users,
  School,
  HeartHandshake,
} from "lucide-react";

const achievements = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Quality Education",
    description:
      "Building strong academic foundations through engaging and meaningful learning experiences.",
  },
  {
    id: 2,
    icon: Users,
    title: "Dedicated Teachers",
    description:
      "A caring team committed to supporting every student's learning and development.",
  },
  {
    id: 3,
    icon: School,
    title: "Modern Learning",
    description:
      "Creating a positive and welcoming environment equipped for today's learners.",
  },
  {
    id: 4,
    icon: HeartHandshake,
    title: "Student Well-Being",
    description:
      "Nurturing confidence, character, creativity, and positive values in every child.",
  },
];

const Achievements = () => {
  return (
    <section className="bg-muted py-24">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Commitment
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Building a Strong Foundation for Tomorrow
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            As a growing school, our focus is on creating a strong foundation
            where students can learn with confidence, discover their potential,
            and grow into responsible individuals.
          </p>
        </div>

        {/* Commitment Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={30} />
                </div>

                <h3 className="mt-7 text-xl font-semibold text-card-foreground">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Achievements;