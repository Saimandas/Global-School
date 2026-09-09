import React, { useEffect, useMemo, useState } from "react";
import Container from "../UI/Container";
import Button from "../UI/Button";
import {
  CalendarDays,
  FileText,
  PartyPopper,
  ArrowUpRight,
} from "lucide-react";
import { readData } from "../../superbase/supabase";
import { NavLink } from "react-router-dom";

const LatestUpdates = () => {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const notices = await readData("Imp_Notices");
      const events = await readData("Events");

      const latestNotices = (notices || []).map((item) => ({
        id: item.id,
        title: item.title,
        date: item.created_at,
        type: "Notice",
        file: item.file,
      }));

      const latestEvents = (events || []).map((item) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        type: "Event",
        venue: item.venue,
        description: item.description,
        file: item.file,
      }));

      const merged = [...latestNotices, ...latestEvents].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setUpdates(merged);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const latest = useMemo(() => {
    return updates.slice(0, 6);
  }, [updates]);

  return (
    <section className="bg-muted py-24">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Latest Updates
          </span>

          <h2 className="mt-5 text-4xl font-bold lg:text-5xl">
            School Notices & Events
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Stay updated with the latest notices, announcements and upcoming
            events.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl border border-border bg-card py-12 text-center">
              Loading...
            </div>
          ) : latest.length === 0 ? (
            /* Empty */
            <div className="rounded-2xl border border-border bg-card py-12 text-center">
              No Updates Available
            </div>
          ) : (
            <>
              {/* =====================================================
                  DESKTOP VERSION
                  ===================================================== */}
              <div className="hidden overflow-hidden rounded-3xl border border-border bg-card md:block">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-5 text-left">Type</th>

                      <th className="px-6 py-5 text-left">Title</th>

                      <th className="px-6 py-5 text-left">Date</th>

                      <th className="px-6 py-5 text-left">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {latest.map((item) => (
                      <tr
                        key={`${item.type}-${item.id}`}
                        className="border-t border-border transition hover:bg-muted/40"
                      >
                        {/* Type */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                item.type === "Notice"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {item.type === "Notice" ? (
                                <FileText size={22} />
                              ) : (
                                <PartyPopper size={22} />
                              )}
                            </div>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                item.type === "Notice"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {item.type}
                            </span>
                          </div>
                        </td>

                        {/* Title */}
                        <td className="max-w-md px-6 py-5">
                          <h3 className="font-semibold break-words">
                            {item.title}
                          </h3>

                          {item.type === "Event" && item.venue && (
                            <p className="mt-2 text-sm text-muted-foreground break-words">
                              📍 {item.venue}
                            </p>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 whitespace-nowrap text-muted-foreground">
                            <CalendarDays size={16} />

                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-5">
                          <a
                            href={item.file}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button className="flex items-center gap-2">
                              {item.type === "Notice" ? "Download" : "View"}

                              <ArrowUpRight size={16} />
                            </Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* =====================================================
                  MOBILE VERSION
                  ===================================================== */}
              <div className="space-y-4 md:hidden">
                {latest.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                  >
                    <div className="p-5">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3">
                        {/* Type */}
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              item.type === "Notice"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {item.type === "Notice" ? (
                              <FileText size={21} />
                            ) : (
                              <PartyPopper size={21} />
                            )}
                          </div>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              item.type === "Notice"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays size={14} />

                          <span>
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="mt-5">
                        <h3 className="break-words text-lg font-semibold leading-snug">
                          {item.title}
                        </h3>

                        {/* Event venue */}
                        {item.type === "Event" && item.venue && (
                          <p className="mt-2 break-words text-sm text-muted-foreground">
                            📍 {item.venue}
                          </p>
                        )}

                        {/* Event description */}
                        {item.type === "Event" && item.description && (
                          <p className="mt-2 line-clamp-3 break-words text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Action */}
                      <div className="mt-5">
                        <a
                          href={item.file}
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                        >
                          <Button className="flex w-full items-center justify-center gap-2">
                            {item.type === "Notice" ? "Download" : "View"}

                            <ArrowUpRight size={16} />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* View All */}
        <div className="mt-10 flex justify-center">
          <NavLink to="/Announcements">
            <Button>View All Updates</Button>
          </NavLink>
        </div>
      </Container>
    </section>
  );
};

export default LatestUpdates;