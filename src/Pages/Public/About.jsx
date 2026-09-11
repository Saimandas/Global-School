import React from "react";
import Container from "../../Components/UI/Container";

const About = () => {
  return (
    <section className="py-10">
      <Container>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">

          <div className="grid lg:grid-cols-[420px_1fr]">

            {/* Image */}

            <img
              src="/School.JPG"
              alt="School"
              className="h-full w-full object-cover"
            />

            {/* Content */}

            <div className="p-10">

              <h1 className="text-4xl font-bold">
                About The Global School
              </h1>

              <p className="mt-6 leading-8 text-muted-foreground">
                The Global School is committed to providing quality education
                in a safe, disciplined and student-friendly environment.
                We believe that education is not only about academic
                excellence but also about developing character,
                confidence and responsibility.
              </p>

              <p className="mt-5 leading-8 text-muted-foreground">
                Through experienced teachers, modern learning methods
                and various co-curricular activities, we encourage every
                student to discover their potential and prepare for a
                successful future.
              </p>

              {/* Info */}

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div className="rounded-xl bg-muted p-5">
                  <p className="text-sm text-muted-foreground">
                    Established
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    2026
                  </h3>
                </div>

                <div className="rounded-xl bg-muted p-5">
                  <p className="text-sm text-muted-foreground">
                    Board
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    CBSE
                  </h3>
                </div>

                <div className="rounded-xl bg-muted p-5">
                  <p className="text-sm text-muted-foreground">
                    Medium
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    English
                  </h3>
                </div>

                <div className="rounded-xl bg-muted p-5">
                  <p className="text-sm text-muted-foreground">
                    Campus
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Safe & Green
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default About;