import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import HeroCarousel from "./HeroCarousel";
import { readData } from "../../superbase/supabase";
import {
  BookOpen,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const Hero = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await readData("Gallery");
      setGalleryImages(data || []);
    }

    getData();
  }, []);

  return (
    <section className="relative flex min-h-[calc(100dvh-7rem)] items-center overflow-hidden bg-primary/[0.04]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* Left Content */}
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Admissions Open • Session 2027–2028
            </span>

            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Empowering Students
              <br />
              for a{" "}
              <span className="text-accent">
                Brighter Tomorrow
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Providing quality education that inspires curiosity, builds
              confidence, and prepares every student to succeed in an
              ever-changing world.
            </p>

            {/* School Highlights */}
            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen size={20} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  Quality Learning
                </h3>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Strong foundations for every student.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <HeartHandshake size={20} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  Caring Environment
                </h3>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Supporting students every step.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck size={20} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  Safe & Supportive
                </h3>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  A positive place to learn and grow.
                </p>
              </div>

            </div>
          </div>

          {/* Right Gallery */}
          <div className="relative flex w-full min-w-0 items-center justify-center">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl" />

            <div className="relative w-full overflow-hidden rounded-[2rem] border border-border/40 shadow-2xl">
              <HeroCarousel slides={galleryImages} />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;