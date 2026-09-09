import React, { useEffect, useState } from "react";
import Container from "../../Components/UI/Container";
import { readData } from "../../superbase/supabase";

const StaffCardSkeleton = () => (
  <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <div className="h-56 w-full animate-pulse bg-muted" />

    <div className="space-y-3 p-5">
      <div className="mx-auto h-5 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-muted" />
    </div>
  </div>
);

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  /* =========================
     FETCH TEACHERS
  ========================== */

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await readData("Teachers");

        setTeachers(data || []);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setError("Unable to load teaching staff.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  /* =========================
     SEO
  ========================== */

  useEffect(() => {
    const title =
      "Teachers | Global School, Saljhora, Bongaigaon, Assam";

    const description =
      "Meet the teaching staff of Global School, Saljhora, Bongaigaon, Assam. Learn more about our dedicated teachers and their qualifications.";

    document.title = title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", description);

    let robotsTag = document.querySelector(
      'meta[name="robots"]'
    );

    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.setAttribute("name", "robots");
      document.head.appendChild(robotsTag);
    }

    robotsTag.setAttribute("content", "index, follow");

    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute(
      "href",
      "https://theglobalschoolsaljhora.in/teachers"
    );

    let ogTitle = document.querySelector(
      'meta[property="og:title"]'
    );

    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }

    ogTitle.setAttribute("content", title);

    let ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );

    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute(
        "property",
        "og:description"
      );
      document.head.appendChild(ogDescription);
    }

    ogDescription.setAttribute("content", description);
  }, []);

  /* =========================
     ESCAPE TO CLOSE
  ========================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedTeacher(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================
     LOCK BACKGROUND SCROLL
  ========================== */

  useEffect(() => {
    if (selectedTeacher) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTeacher]);

  return (
    <>
      {/* =====================================================
          TEACHERS
      ====================================================== */}

      <section className="w-full overflow-x-hidden py-12">
        <Container>
          {/* Heading */}

          <div className="mb-8">
            <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
              Teaching Staff
            </h1>

            <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          </div>

          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Loading */}

          {isLoading ? (
            <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <StaffCardSkeleton key={index} />
              ))}
            </div>
          ) : teachers.length > 0 ? (
            /* =================================================
               TEACHER CARDS
            ================================================== */

            <div className="grid w-full min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((staff) => (
                <button
                  key={staff.id}
                  type="button"
                  onClick={() => setSelectedTeacher(staff)}
                  className="group block w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {/* Image */}

                  <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-muted">
                    <img
                      src={staff.file}
                      alt={`${staff.name} - Global School, Saljhora, Bongaigaon`}
                      className="h-full w-full object-cover object-[center_10%] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Desktop hover */}

                    <div className="absolute inset-0 hidden items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
                      <span className="w-full p-4 text-center text-sm font-medium text-white">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Details */}

                  <div className="w-full min-w-0 p-5 text-center">
                    <h2 className="break-words font-heading text-lg font-semibold text-card-foreground">
                      {staff.name}
                    </h2>

                    {staff.qualification && (
                      <p className="mt-1 break-words text-sm text-muted-foreground">
                        {staff.qualification}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Empty */

            <div className="rounded-2xl border border-dashed border-border py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No teaching staff available.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* =====================================================
          TEACHER MODAL
      ====================================================== */}

      {selectedTeacher && (
        <div
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-x-hidden overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setSelectedTeacher(null)}
        >
          {/* =================================================
              MODAL CONTAINER
          ================================================== */}

          <div
            className="relative my-auto flex w-[calc(100vw-24px)] min-w-0 max-w-2xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl sm:w-[calc(100vw-32px)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}

            <button
              type="button"
              onClick={() => setSelectedTeacher(null)}
              aria-label="Close teacher details"
              className="absolute right-3 top-3 z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/60 text-2xl leading-none text-white transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white sm:right-4 sm:top-4"
            >
              ×
            </button>

            {/* =================================================
                SCROLLABLE CONTENT
            ================================================== */}

            <div className="max-h-[90dvh] min-w-0 overflow-x-hidden overflow-y-auto">
              {/* =================================================
                  MOBILE = 1 COLUMN
                  DESKTOP = 2 COLUMNS
              ================================================== */}

              <div className="grid min-w-0 grid-cols-1 md:grid-cols-2">
                {/* =================================================
                    IMAGE
                ================================================== */}

                <div className="relative h-64 w-full min-w-0 overflow-hidden bg-muted sm:h-80 md:h-full md:min-h-[420px]">
                  <img
                    src={selectedTeacher.file}
                    alt={`${selectedTeacher.name} - Global School, Saljhora, Bongaigaon`}
                    className="block h-full w-full object-cover object-[center_20%]"
                  />
                </div>

                {/* =================================================
                    INFORMATION
                ================================================== */}

                <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7 md:p-8">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
                    Teaching Staff
                  </p>

                  <h2 className="break-words font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                    {selectedTeacher.name}
                  </h2>

                  {selectedTeacher.qualification && (
                    <p className="mt-2 break-words text-sm text-muted-foreground sm:text-base">
                      {selectedTeacher.qualification}
                    </p>
                  )}

                  <div className="my-5 h-px w-full bg-border sm:my-6" />

                  <div className="min-w-0 space-y-4">
                    {/* Email */}

                    {selectedTeacher.email && (
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Email
                        </p>

                        <a
                          href={`mailto:${selectedTeacher.email}`}
                          className="mt-1 block break-all text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {selectedTeacher.email}
                        </a>
                      </div>
                    )}

                    {/* Phone */}

                    {selectedTeacher.phone && (
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Phone
                        </p>

                        <a
                          href={`tel:${selectedTeacher.phone}`}
                          className="mt-1 block break-all text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {selectedTeacher.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Teachers;