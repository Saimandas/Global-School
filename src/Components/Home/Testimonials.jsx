import React from "react";
import Container from "../ui/Container";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Parent",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Global School has provided an excellent learning environment for my child. The teachers are supportive, caring, and truly dedicated to every student's success.",
  },
  {
    id: 2,
    name: "Ananya Das",
    role: "Alumni",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The school not only helped me achieve academic excellence but also built my confidence through sports, cultural activities, and leadership opportunities.",
  },
  {
    id: 3,
    name: "Priya Singh",
    role: "Parent",
    image: "https://i.pravatar.cc/150?img=49",
    review:
      "A wonderful institution with modern facilities, disciplined atmosphere, and passionate teachers. I highly recommend Global School to every parent.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Testimonials
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground lg:text-5xl">
            What Parents & Students Say
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Hear from our parents, students, and alumni about their experiences
            at Global School.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote
                size={42}
                className="text-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="mt-6 flex gap-1 text-accent">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-current"
                  />
                ))}
              </div>

              <p className="mt-6 flex-1 leading-8 text-muted-foreground">
                "{testimonial.review}"
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;