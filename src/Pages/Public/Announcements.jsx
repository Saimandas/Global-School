import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import Container from "../../Components/UI/Container";
import Button from "../../Components/UI/Button";
import { readData } from "../../superbase/supabase";

const Announcements = () => {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  /* =====================================================
     FETCH DATA
  ====================================================== */

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const noticeData = await readData("Imp_Notices");
      const eventData = await readData("Events");

      setNotices(noticeData || []);
      setEvents(eventData || []);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Unable to load announcements.");
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     IMAGE PREVIEW
  ====================================================== */

  function openImage(url) {
    setPreviewImage(url);
  }

  function closeImage() {
    setPreviewImage(null);
  }

  /* =====================================================
     SEO
  ====================================================== */

  useEffect(() => {
    const title =
      "Announcements & Events | Global School, Saljhora, Bongaigaon, Assam";

    const description =
      "Stay updated with the latest announcements, important notices and upcoming events of Global School, Saljhora, Bongaigaon, Assam.";

    document.title = title;

    // Description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", description);

    // Robots
    let robotsTag = document.querySelector(
      'meta[name="robots"]'
    );

    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.setAttribute("name", "robots");
      document.head.appendChild(robotsTag);
    }

    robotsTag.setAttribute("content", "index, follow");

    // Canonical
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
      "https://theglobalschoolsaljhora.in/announcements"
    );

    // Open Graph title
    let ogTitle = document.querySelector(
      'meta[property="og:title"]'
    );

    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }

    ogTitle.setAttribute("content", title);

    // Open Graph description
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

    // Open Graph URL
    let ogUrl = document.querySelector(
      'meta[property="og:url"]'
    );

    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }

    ogUrl.setAttribute(
      "content",
      "https://theglobalschoolsaljhora.in/announcements"
    );
  }, []);

  /* =====================================================
     CLOSE IMAGE WITH ESCAPE
  ====================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeImage();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =====================================================
     LOCK BACKGROUND SCROLL WHEN IMAGE OPEN
  ====================================================== */

  useEffect(() => {
    if (previewImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [previewImage]);

  return (
    <>
      <section className="w-full overflow-x-hidden py-14">
        <Container>
          {/* =================================================
              PAGE HEADER
          ================================================== */}

          <div className="text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Notice Board
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Stay updated with the latest notices and
              upcoming events.
            </p>
          </div>

          {/* =================================================
              NOTICES
          ================================================== */}

          <div className="mt-14">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">
                Important Notices
              </h2>

              <span className="w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                {notices.length} Notices
              </span>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-border bg-card py-10 text-center">
                Loading...
              </div>
            ) : notices.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card py-10 text-center">
                No Notices Available
              </div>
            ) : (
              /* =================================================
                 IMPORTANT:
                 overflow-x-auto belongs HERE, not on the page.
              ================================================== */

              <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full min-w-[650px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        Notice
                      </th>

                      <th className="px-6 py-4 text-left">
                        Date
                      </th>

                      <th className="px-6 py-4 text-center">
                        PDF
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {notices.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-border hover:bg-muted/40"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                              <FileText
                                size={22}
                                className="text-primary"
                              />
                            </div>

                            <div className="min-w-0">
                              <h3 className="break-words font-semibold">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6">
                          {item.created_at
                            ? new Date(
                                item.created_at
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td className="px-6 text-center">
                          <a
                            href={item.file}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button>Download</Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* =================================================
              EVENTS
          ================================================== */}

          <div className="mt-16">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">
                Upcoming Events
              </h2>

              <span className="w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                {events.length} Events
              </span>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-border bg-card py-10 text-center">
                Loading...
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card py-10 text-center">
                No Events Available
              </div>
            ) : (
              /* =================================================
                 MOBILE TABLE SCROLL
              ================================================== */

              <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        Image
                      </th>

                      <th className="px-6 py-4 text-left">
                        Event
                      </th>

                      <th className="px-6 py-4 text-left">
                        Date
                      </th>

                      <th className="px-6 py-4 text-left">
                        Venue
                      </th>

                      <th className="px-6 py-4 text-center">
                        View
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-border hover:bg-muted/40"
                      >
                        {/* IMAGE */}

                        <td className="px-6 py-4">
                          <img
                            src={item.file}
                            alt={`${item.title} - Global School, Saljhora, Bongaigaon`}
                            onClick={() =>
                              openImage(item.file)
                            }
                            className="h-16 w-24 cursor-pointer rounded-lg object-cover transition hover:scale-105"
                            loading="lazy"
                          />
                        </td>

                        {/* EVENT */}

                        <td className="max-w-[350px] px-6 py-4">
                          <h3 className="break-words font-semibold">
                            {item.title}
                          </h3>

                          {item.description && (
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </td>

                        {/* DATE */}

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={16}
                              className="shrink-0 text-primary"
                            />

                            {item.date
                              ? new Date(
                                  item.date
                                ).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>

                        {/* VENUE */}

                        <td className="px-6 py-4">
                          <span className="break-words">
                            {item.venue || "-"}
                          </span>
                        </td>

                        {/* VIEW */}

                        <td className="px-6 py-4 text-center">
                          <a
                            href={item.file}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button>View</Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =====================================================
          IMAGE PREVIEW MODAL
      ====================================================== */}

      {previewImage && (
        <div
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl text-white hover:bg-black/80"
          >
            ×
          </button>

          <div
            className="flex max-h-[90dvh] max-w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Event preview - Global School, Saljhora, Bongaigaon"
              className="max-h-[90dvh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Announcements;