import React, {
  useEffect,
  useState,
} from "react";

import Container from "../../Components/UI/Container";

import {
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
} from "lucide-react";

import { readData } from "../../superbase/supabase";


const Gallery = () => {

  /* =========================================================
     STATE
  ========================================================= */

  const [galleries, setGalleries] = useState([]);

  const [images, setImages] = useState([]);

  const [selected, setSelected] = useState(null);


  /* =========================================================
     GET GALLERY DATA
  ========================================================= */

  useEffect(() => {

    async function getData() {

      try {

        /* -----------------------------------------------------
           GET GALLERY NAMES
        ----------------------------------------------------- */

        const galleryNames =
          await readData("galleryName");


        /* -----------------------------------------------------
           GET GALLERY IMAGES
        ----------------------------------------------------- */

        const galleryImages =
          await readData("galleryImage");


        console.log(
          "Gallery Names:",
          galleryNames
        );

        console.log(
          "Gallery Images:",
          galleryImages
        );


        /* -----------------------------------------------------
           COMBINE GALLERY NAME + IMAGES
        ----------------------------------------------------- */

        const combined =
          galleryNames.map((gallery) => {

            const galleryImagesForThisGallery =
              galleryImages.filter(
                (image) =>
                  Number(image.galleryId) ===
                  Number(gallery.id)
              );

            return {
              ...gallery,

              images:
                galleryImagesForThisGallery,
            };

          });


        console.log(
          "Combined Galleries:",
          combined
        );


        setGalleries(combined);


        /* -----------------------------------------------------
           FLATTEN ALL IMAGES

           Used by fullscreen previous/next
        ----------------------------------------------------- */

        const allImages =
          combined.flatMap(
            (gallery) =>
              gallery.images
          );


        setImages(allImages);

      } catch (error) {

        console.error(
          "Gallery error:",
          error
        );

      }

    }


    getData();

  }, []);


  /* =========================================================
     CLOSE IMAGE VIEWER
  ========================================================= */

  const close = () => {
    setSelected(null);
  };


  /* =========================================================
     NEXT IMAGE
  ========================================================= */

  const next = () => {

    if (
      selected === null ||
      images.length === 0
    ) {
      return;
    }

    setSelected(
      (prev) =>
        (prev + 1) %
        images.length
    );

  };


  /* =========================================================
     PREVIOUS IMAGE
  ========================================================= */

  const previous = () => {

    if (
      selected === null ||
      images.length === 0
    ) {
      return;
    }

    setSelected(
      (prev) =>
        prev === 0
          ? images.length - 1
          : prev - 1
    );

  };


  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */

  useEffect(() => {

    function handleKeyDown(e) {

      if (selected === null) {
        return;
      }

      if (e.key === "Escape") {
        close();
      }

      if (e.key === "ArrowRight") {
        next();
      }

      if (e.key === "ArrowLeft") {
        previous();
      }

    }


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [selected, images.length]);


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>

      {/* =====================================================
          GALLERY SECTION
      ===================================================== */}

      <section className="py-10 sm:py-12">

        <Container>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {galleries.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-card
                px-6
                py-20
                text-center
              "
            >

              <Images
                size={48}
                className="
                  mx-auto
                  text-muted-foreground
                "
              />

              <h2
                className="
                  mt-4
                  text-xl
                  font-semibold
                  text-heading
                "
              >
                No Gallery Images
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-muted-foreground
                "
              >
                Gallery images will appear here.
              </p>

            </div>

          ) : (

            /* =================================================
               GALLERIES
            ================================================= */

            <div className="space-y-12">

              {galleries.map(
                (gallery) => {

                  /* -----------------------------------------
                     DON'T SHOW EMPTY GALLERIES
                  ----------------------------------------- */

                  if (
                    gallery.images.length === 0
                  ) {
                    return null;
                  }


                  return (

                    <section
                      key={gallery.id}
                    >

                      {/* =====================================
                          GALLERY HEADER
                      ===================================== */}

                      <div
                        className="
                          mb-5
                          flex
                          items-end
                          justify-between
                          gap-4
                          border-b
                          border-border
                          pb-3
                        "
                      >

                        <div>

                          <h2
                            className="
                              text-xl
                              font-bold
                              text-heading
                              sm:text-2xl
                            "
                          >
                            {gallery.name}
                          </h2>

                          <div
                            className="
                              mt-2
                              h-1
                              w-10
                              rounded-full
                              bg-primary
                            "
                          />

                        </div>


                        {/* IMAGE COUNT */}

                        <div
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-muted-foreground
                            sm:text-sm
                          "
                        >

                          <Images size={15} />

                          {gallery.images.length}

                          {" "}

                          {gallery.images.length === 1
                            ? "Photo"
                            : "Photos"}

                        </div>

                      </div>


                      {/* =====================================
                          IMAGE GRID
                      ===================================== */}

                      <div
                        className="
                          grid
                          grid-cols-1
                          gap-5
                          sm:grid-cols-2
                          lg:grid-cols-3
                        "
                      >

                        {gallery.images.map(
                          (image) => {

                            /* ---------------------------------
                               FIND GLOBAL IMAGE INDEX
                            --------------------------------- */

                            const imageIndex =
                              images.findIndex(
                                (item) =>
                                  item.id ===
                                  image.id
                              );


                            return (

                              <button
                                key={image.id}
                                type="button"
                                onClick={() =>
                                  setSelected(
                                    imageIndex
                                  )
                                }
                                className="
                                  group
                                  relative
                                  block
                                  w-full
                                  overflow-hidden
                                  rounded-2xl
                                  border
                                  border-border
                                  bg-[#f7f5f1]
                                  text-left
                                  shadow-sm
                                  transition
                                  duration-300
                                  hover:-translate-y-0.5
                                  hover:shadow-md
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-primary
                                  focus:ring-offset-2
                                "
                              >

                                {/* =================================
                                    IMAGE CONTAINER
                                ================================= */}

                                <div
                                  className="
                                    flex
                                    h-[260px]
                                    w-full
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    p-2
                                    sm:h-[270px]
                                  "
                                >

                                  <img
                                    src={image.file}
                                    alt={
                                      gallery.name
                                    }
                                    loading="lazy"
                                    className="
                                      h-full
                                      w-full
                                      object-contain
                                      transition-transform
                                      duration-500
                                      ease-out
                                      group-hover:scale-[1.03]
                                    "
                                  />

                                </div>


                                {/* =================================
                                    HOVER OVERLAY
                                ================================= */}

                                <div
                                  className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-black/0
                                    transition-all
                                    duration-300
                                    group-hover:bg-black/20
                                  "
                                >

                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      rounded-full
                                      bg-white/95
                                      px-4
                                      py-2
                                      text-sm
                                      font-semibold
                                      text-heading
                                      opacity-0
                                      shadow-lg
                                      scale-95
                                      transition-all
                                      duration-300
                                      group-hover:scale-100
                                      group-hover:opacity-100
                                    "
                                  >

                                    <Maximize2
                                      size={15}
                                    />

                                    View Image

                                  </div>

                                </div>

                              </button>

                            );

                          }
                        )}

                      </div>

                    </section>

                  );

                }
              )}

            </div>

          )}

        </Container>

      </section>


      {/* =====================================================
          FULLSCREEN IMAGE VIEWER
      ===================================================== */}

      {selected !== null &&
        images[selected] && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/95
            p-4
            sm:p-6
          "
        >

          {/* ===============================================
              CLOSE BUTTON
          =============================================== */}

          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-lg
              transition
              hover:bg-gray-100
              sm:right-6
              sm:top-6
            "
          >

            <X size={21} />

          </button>


          {/* ===============================================
              PREVIOUS BUTTON
          =============================================== */}

          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="
              absolute
              left-3
              top-1/2
              z-20
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-lg
              transition
              hover:bg-gray-100
              sm:left-6
            "
          >

            <ChevronLeft size={25} />

          </button>


          {/* ===============================================
              FULL IMAGE
          =============================================== */}

          <div
            className="
              flex
              max-h-[90vh]
              max-w-[90vw]
              flex-col
              items-center
              justify-center
            "
          >

            <img
              src={images[selected].file}
              alt="Gallery image"
              className="
                max-h-[78vh]
                max-w-[88vw]
                rounded-xl
                object-contain
                shadow-2xl
                sm:max-h-[82vh]
              "
            />


            {/* IMAGE COUNTER */}

            <div
              className="
                mt-4
                rounded-full
                bg-white/10
                px-4
                py-1.5
                text-xs
                font-medium
                text-white/80
                backdrop-blur-sm
              "
            >

              {selected + 1} / {images.length}

            </div>

          </div>


          {/* ===============================================
              NEXT BUTTON
          =============================================== */}

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="
              absolute
              right-3
              top-1/2
              z-20
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-lg
              transition
              hover:bg-gray-100
              sm:right-6
            "
          >

            <ChevronRight size={25} />

          </button>

        </div>

      )}

    </>
  );
};


export default Gallery;