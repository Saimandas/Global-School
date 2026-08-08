import React, { useEffect, useState } from "react";
import Container from "../../Components/ui/Container";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { readData } from "../../superbase/supabase";


const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const [images, setimages] = useState([]);

  const close = () => setSelected(null);

  useEffect(()=>{
    async function getData(){
      const data=await readData("Gallery")
      console.log(data);
      setimages(data)
    }
    getData()
  },[])
  console.log("images",images);
  const next = () => {
    setSelected((prev) => (prev + 1) % images.length);
  };

  const previous = () => {
    setSelected((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <section className="py-8">
        <Container>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="mb-5 cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => setSelected(index)}
              >
                <img
                  src={image.file}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full rounded-3xl object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {selected !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">

          <button
            onClick={close}
            className="absolute top-6 right-6 rounded-full bg-white p-3 shadow-lg"
          >
            <X size={22} />
          </button>

          <button
            onClick={previous}
            className="absolute left-5 rounded-full bg-white p-3 shadow-lg"
          >
            <ChevronLeft size={26} />
          </button>

          <img
            src={images[selected]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          />

          <button
            onClick={next}
            className="absolute right-5 rounded-full bg-white p-3 shadow-lg"
          >
            <ChevronRight size={26} />
          </button>

        </div>
      )}
    </>
  );
};

export default Gallery;