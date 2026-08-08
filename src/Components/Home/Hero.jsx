import React, { useEffect, useState } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import HeroCarousel from "./HeroCarousel";
import {readData} from '../../superbase/supabase'
 
const Hero = () => {
   const [galleryImages, setgalleryImages] = useState([]);
  useEffect(()=>{
    async function getData(){
      const data=await readData("Gallery");
      setgalleryImages(data)
    }
    console.log(galleryImages);
    
    getData();
  },[])
  return (
    <section className="relative flex min-h-[calc(100dvh-7rem)] bg-primary/10 items-center overflow-hidden">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full  blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Admissions Open • Session 2026–2027
            </span>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Empowering Students
              <br />
              for a <span className="text-accent">Brighter Tomorrow</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Providing quality education that inspires curiosity, builds
              confidence, and prepares every student to succeed in an
              ever-changing world.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary">
                Apply Now
              </Button>

              <Button variant="outline">
                Explore Campus
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-10">
              <div>
                <h2 className="text-3xl font-bold text-primary">1500+</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Students
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary">100+</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Teachers
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary">25+</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Years of Excellence
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full min-w-0">
              <HeroCarousel slides={galleryImages}/>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;