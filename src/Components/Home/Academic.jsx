import React from "react";
import Container from "../UI/Container";
import {
  Baby,
  BookOpen,
  FlaskConical,
  ArrowRight,
} from "lucide-react";

const academicPrograms = [
  {
    id: 1,
    title: "Pre-Primary",
    classes: "Nursery - UKG",
    description:
      "A joyful and nurturing environment where young learners develop confidence, curiosity, and strong foundations for their educational journey.",
    icon: Baby,
  },
  {
    id: 2,
    title: "Primary",
    classes: "Classes I - V",
    description:
      "Building strong academic foundations through engaging learning experiences that encourage creativity, confidence, and a love for learning.",
    icon: BookOpen,
  }
];

const Academic = () => {
  return (
    <section className="bg-muted py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Academic Programs
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Learning for Every Stage of Growth
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            From early childhood education to secondary school, we provide a
            nurturing environment that empowers every student to learn, grow,
            and succeed.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {academicPrograms.map((program) => {
            const Icon = program.icon;

            return (
              <div
                key={program.id}
                className="group flex min-h-80 flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={32} />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-card-foreground">
                  {program.title}
                </h3>

                <p className="mt-2 font-medium text-primary">
                  {program.classes}
                </p>

                <p className="mt-5 leading-7 text-muted-foreground">
                  {program.description}
                </p>

                {/* <button className="mt-auto flex items-center gap-2 pt-8 font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                  Explore Program
                  <ArrowRight size={18} />
                </button> */}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Academic;