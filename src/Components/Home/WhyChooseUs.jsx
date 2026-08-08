import React from "react";
import Container from "../ui/Container";
import {
  GraduationCap,
  MonitorSmartphone,
  Microscope,
  ShieldCheck,
  Trophy,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Experienced Faculty",
    description:
      "Our qualified and dedicated teachers inspire students through innovative teaching and personalized  guidance.",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "Smart Classrooms",
    description:
      "Technology-enabled classrooms create engaging, interactive, and future-ready learning experiences.",
    icon: MonitorSmartphone,
  },
  {
    id: 3,
    title: "Modern Laboratories",
    description:
      "Well-equipped science and computer laboratories encourage practical learning and innovation.",
    icon: Microscope,
  },
  {
    id: 4,
    title: "Safe Campus",
    description:
      "A secure campus with CCTV surveillance, disciplined environment, and student safety as our priority.",
    icon: ShieldCheck,
  },
  {
    id: 5,
    title: "Sports & Activities",
    description:
      "Students participate in sports, cultural programs, leadership activities, and personality development.",
    icon: Trophy,
  },
  {
    id: 6,
    title: "Holistic Development",
    description:
      "We focus on academic excellence while nurturing confidence, creativity, ethics, and leadership.",
    icon: HeartHandshake,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why Choose Global School
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Building Bright Futures with Quality Education
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            We provide a nurturing environment where academic excellence,
            innovation, discipline, and holistic development prepare every
            student for lifelong success.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;