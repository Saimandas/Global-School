import React from "react";
import Container from "../ui/Container";
import {
  GraduationCap,
  Users,
  School,
  Trophy,
} from "lucide-react";

const achievements = [
  {
    id: 1,
    icon: GraduationCap,
    number: "1500+",
    title: "Students",
  },
  {
    id: 2,
    icon: Users,
    number: "100+",
    title: "Qualified Teachers",
  },
  {
    id: 3,
    icon: School,
    number: "25+",
    title: "Years of Excellence",
  },
  {
    id: 4,
    icon: Trophy,
    number: "98%",
    title: "Board Examination Results",
  },
];

const Achievements = () => {
  return (
    <section className="bg-muted py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Achievements
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Excellence Through Every Milestone
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Over the years, Global School has nurtured thousands of students,
            delivering academic excellence and holistic development.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={34} />
                </div>

                <h3 className="mt-8 text-5xl font-bold text-primary">
                  {item.number}
                </h3>

                <p className="mt-3 text-lg font-medium text-card-foreground">
                  {item.title}
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