import React from "react";
import Container from "../../Components/UI/Container.jsx";
import {
  Quote,
  HeartHandshake,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";

const PrincipalDesk = () => {
  return (
    <main className="bg-background">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-primary/[0.04] py-16 md:py-20">

        {/* Background Decorations */}

        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <Container className="relative z-10">

          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

            {/* =================================================
                PRINCIPAL IMAGE
            ================================================= */}

            <div className="relative flex justify-center">

              <div className="absolute -inset-5 rounded-[2rem] bg-primary/5 blur-2xl" />

              <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-border/50 bg-background shadow-2xl">

                <div className="aspect-[4/5] overflow-hidden bg-primary/5">

                  <img
                    src="/staff/Principal.JPG"
                    alt="Principal of Jatiya Vidyalaya"
                    className="h-full w-full object-cover object-[center_10%]"
                  />

                </div>

                <div className="border-t border-border/60 bg-[#133458]  p-5">

                  <h2 className="font-heading text-xl font-bold text-white">
                    Chairman's Desk
                  </h2>

                  <p className="mt-1 text-sm text-white">
                    Global School
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                INTRODUCTION
            ================================================= */}

            <div className="min-w-0">

              <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Chairman's Desk
              </span>

              <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">

                A Message from

                <br />

                <span className="text-accent">
                  Our Chairman
                </span>

              </h1>

              <div className="mt-6 flex items-start gap-4">

                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Quote size={20} />
                </div>

                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  Education is not merely about acquiring knowledge;
                  it is about developing character, discovering
                  potential, and preparing young minds to make a
                  meaningful contribution to society.
                </p>

              </div>

              <div className="mt-8">

                <p className="text-base leading-8 text-muted-foreground">
                  At Jatiya Vidyalaya, we believe that every child
                  possesses unique abilities and deserves an environment
                  where those abilities can flourish. Our aim is to
                  provide students with quality education while
                  nurturing discipline, confidence, creativity, and
                  compassion.
                </p>

                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  Together with our dedicated teachers, supportive
                  parents, and the wider community, we strive to create
                  a learning environment where students feel encouraged
                  to question, explore, learn, and grow.
                </p>

              </div>

              <div className="mt-8">

                <p className="font-heading text-lg font-semibold text-foreground">
                  Prafulla Kumar Brahma
                </p>

                <p className="mt-1 text-sm text-primary">
                  Chairman
                </p>

              </div>

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          Chairman's MESSAGE
      ===================================================== */}

      <section className="py-16 md:py-20">

        <Container>

          <div className="mx-auto max-w-4xl">

            <div className="text-center">

              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Vision
              </p>

              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
                Building a Better Future Through Education
              </h2>

            </div>


            {/* MESSAGE CARD */}

            <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border/60 bg-background p-7 shadow-sm md:p-10">

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

              <Quote
                size={42}
                className="relative text-primary/20"
              />

              <div className="relative mt-5 space-y-5">

                <p className="text-base leading-8 text-muted-foreground">
                  Dear Students, Parents, and Well-Wishers,
                </p>

                <p className="text-base leading-8 text-muted-foreground">
                  It gives me immense pleasure to welcome you to
                  Jatiya Vidyalaya. Our school is committed to
                  providing an educational experience that goes
                  beyond textbooks and examinations. We believe that
                  true education develops the mind, strengthens
                  character, and inspires students to become responsible
                  and compassionate citizens.
                </p>

                <p className="text-base leading-8 text-muted-foreground">
                  Our teachers work tirelessly to understand the
                  individual needs of every learner. Through academics,
                  sports, cultural activities, and various
                  co-curricular opportunities, we encourage students
                  to discover their strengths and develop confidence
                  in themselves.
                </p>

                <p className="text-base leading-8 text-muted-foreground">
                  We also believe that education is a partnership
                  between the school, parents, and community. Your
                  continued support and involvement play an important
                  role in helping our students reach their full
                  potential.
                </p>

                <p className="text-base leading-8 text-muted-foreground">
                  Let us continue to work together to create a
                  generation that is knowledgeable, disciplined,
                  compassionate, and ready to face the challenges of
                  tomorrow.
                </p>

                <div className="pt-4">

                  <p className="font-heading text-lg font-semibold text-foreground">
                    With warm regards,
                  </p>

                  <p className="mt-2 font-heading text-lg font-bold text-primary">
                    Prafulla Kumar Brahma
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Chairman, Global School
                  </p>

                </div>

              </div>

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          CORE VALUES
      ===================================================== */}

      <section className="bg-primary/[0.04] py-16 md:py-20">

        <Container>

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              What We Believe
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
              Our Educational Values
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              We strive to create an environment where students can
              learn with confidence, grow with purpose, and develop
              into responsible members of society.
            </p>

          </div>


          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* CARD 1 */}

            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen size={21} />
              </div>

              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                Quality Education
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Building strong academic foundations while encouraging
                curiosity, critical thinking, and a love for learning.
              </p>

            </div>


            {/* CARD 2 */}

            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <HeartHandshake size={21} />
              </div>

              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                Character & Values
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Encouraging honesty, respect, discipline, empathy, and
                responsibility in every student.
              </p>

            </div>


            {/* CARD 3 */}

            <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users size={21} />
              </div>

              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                Community & Growth
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Working together with students, parents, teachers, and
                the community to build a stronger future.
              </p>

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="py-16">

        <Container>

          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-7 py-10 text-white md:px-12 md:py-12">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">

              <div>

                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  Together We Grow
                </p>

                <h2 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
                  Every Child. Every Dream. Every Future.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                  Let us work together to give every student the
                  opportunity to learn, grow, and build a brighter
                  tomorrow.
                </p>

              </div>

              <a
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-white/30 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10 md:self-auto"
              >
                Contact Us
                <ArrowRight size={16} />
              </a>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
};

export default PrincipalDesk;