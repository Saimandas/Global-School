import React, { useEffect, useState } from "react";
import Container from "../UI/Container";
import { ArrowRight } from "lucide-react";
import Button from "../UI/Button";
import { readData } from "../../superbase/supabase";
import { NavLink } from "react-router-dom";


const Gallery = () => {
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
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Gallery
          </span>

          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Moments That Inspire
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Explore memorable moments from our classrooms, campus life,
            celebrations, sports, and student activities.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group overflow-hidden rounded-3xl ${
                index === 0 || index === 3 ? "md:col-span-2" : ""
              }`}
            >
              <img
                src={image.file}
                alt={`Gallery ${index + 1}`}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <NavLink to={'/gallery'}>
            <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            View Full Gallery
            <ArrowRight size={18} />
          </Button>
          </NavLink>
        </div>
      </Container>
    </section>
  );
};

export default Gallery;