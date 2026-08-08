import React, { useEffect, useState } from "react";
import Container from "../../Components/ui/Container";
import { readData } from "../../superbase/supabase";

const StaffCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
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

  // Close modal with Escape key
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

  return (
    <>
      <section className="py-12">
        <Container>
          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
              Teaching Staff
            </h2>

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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <StaffCardSkeleton key={index} />
              ))}
            </div>
          ) : teachers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((staff) => (
                <button
                  key={staff.id}
                  type="button"
                  onClick={() => setSelectedTeacher(staff)}
                  className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {/* Image */}
                  <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-muted">
                    <img
                      src={staff.file}
                      alt={staff.name}
                      className="h-full w-full object-cover object-[center_10%] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="w-full p-4 text-center text-sm font-medium text-white">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 text-center">
                    <h3 className="font-heading text-lg font-semibold text-card-foreground">
                      {staff.name}
                    </h3>

                    {staff.qualification && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {staff.qualification}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No teaching staff available.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Teacher Details Modal */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTeacher(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-xl text-white transition-colors hover:bg-black/70"
              aria-label="Close"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              {/* Large Image */}
              <div className="flex min-h-[320px] items-center justify-center overflow-hidden bg-muted">
                <img
                  src={selectedTeacher.file}
                  alt={selectedTeacher.name}
                  className="h-full max-h-[500px] w-full object-cover object-[center_20%]"
                />
              </div>

              {/* Information */}
              <div className="flex flex-col justify-center p-7">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
                  Teaching Staff
                </p>

                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {selectedTeacher.name}
                </h2>

                {selectedTeacher.qualification && (
                  <p className="mt-2 text-muted-foreground">
                    {selectedTeacher.qualification}
                  </p>
                )}

                <div className="my-6 h-px bg-border" />

                <div className="space-y-4">
                  {/* Email */}
                  {selectedTeacher.email && (
                    <div>
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

                  {/* Phone
                  {selectedTeacher.phone && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Phone
                      </p>

                      <a
                        href={`tel:${selectedTeacher.phone}`}
                        className="mt-1 block text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {selectedTeacher.phone}
                      </a>
                    </div>
                  )} */}
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