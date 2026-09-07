
import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  FileText,
  Eye,
  Image as ImageIcon,
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

  useEffect(() => {
    getData();
  }, []);

  async function getData() {

    try {

      setLoading(true);

      const noticeData = await readData("Imp_Notices");

      const eventData = await readData("Events");

      setNotices(noticeData);

      setEvents(eventData);

    } catch (error) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  }

  function openImage(url) {

    setPreviewImage(url);

  }

  function closeImage() {

    setPreviewImage(null);

  }
  return (
  <section className="py-14">
    <Container>

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Notice Board
        </h1>

        <p className="mt-3 text-muted-foreground">
          Stay updated with the latest notices and upcoming events.
        </p>

      </div>

      {/* Notices */}

      <div className="mt-14">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Important Notices
          </h2>

          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            {notices.length} Notices
          </span>

        </div>

        {
          loading ?

          <div className="rounded-2xl border border-border bg-card py-10 text-center">

            Loading...

          </div>

          :

          notices.length===0 ?

          <div className="rounded-2xl border border-border bg-card py-10 text-center">

            No Notices Available

          </div>

          :

          <div className="overflow-hidden rounded-2xl border border-border bg-card">

            <table className="w-full">

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

                {

                  notices.map((item)=>(

                    <tr
                      key={item.id}
                      className="border-t border-border hover:bg-muted/40"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="rounded-xl bg-primary/10 p-3">

                            <FileText
                              size={22}
                              className="text-primary"
                            />

                          </div>

                          <div>

                            <h3 className="font-semibold">

                              {item.title}

                            </h3>

                          </div>

                        </div>

                      </td>

                      <td className="px-6">

                        {new Date(item.created_at).toLocaleDateString()}

                      </td>

                      <td className="px-6 text-center">

                        <a
                          href={item.file}
                          target="_blank"
                          rel="noreferrer"
                        >

                          <Button>

                            Download

                          </Button>

                        </a>

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

        }

      </div>

      {/* Events */}

      <div className="mt-16">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Upcoming Events

          </h2>

          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">

            {events.length} Events

          </span>

        </div>
        {
loading ?

<div className="rounded-2xl border border-border bg-card py-10 text-center">

Loading...

</div>

:

events.length===0 ?

<div className="rounded-2xl border border-border bg-card py-10 text-center">

No Events Available

</div>

:

<div className="overflow-hidden rounded-2xl border border-border bg-card">

<table className="w-full">

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

{

events.map((item)=>(

<tr
key={item.id}
className="border-t border-border hover:bg-muted/40"
>

<td className="px-6 py-4">

<img
src={item.file}
alt={item.title}
onClick={()=>window.open(item.file,"_blank")}
className="h-16 w-24 cursor-pointer rounded-lg object-cover transition hover:scale-105"
/>

</td>

<td className="px-6 py-4">

<h3 className="font-semibold">

{item.title}

</h3>

<p className="mt-1 line-clamp-2 text-sm text-muted-foreground">

{item.description}

</p>

</td>

<td className="px-6 py-4">

<div className="flex items-center gap-2">

<CalendarDays
size={16}
className="text-primary"
/>

{new Date(item.date).toLocaleDateString()}

</div>

</td>

<td className="px-6 py-4">

{item.venue}

</td>

<td className="px-6 py-4 text-center">

<a
href={item.file}
target="_blank"
rel="noreferrer"
>

<Button>

View

</Button>

</a>

</td>

</tr>

))

}

</tbody>

</table>

</div>

}

</div>

</Container>

</section>

);
};

export default Announcements;