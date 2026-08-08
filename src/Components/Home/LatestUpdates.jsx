import React, { useEffect, useMemo, useState } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
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

      const latestNotices = notices.map((item) => ({
        id: item.id,
        title: item.title,
        date: item.created_at,
        type: "Notice",
        file: item.file,
      }));

      const latestEvents = events.map((item) => ({
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

    return updates.slice(0,6);

  }, [updates]);

  return (

<section className="bg-muted py-24">

<Container>

<div className="mx-auto max-w-3xl text-center">

<span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">

Latest Updates

</span>

<h2 className="mt-5 text-4xl font-bold lg:text-5xl">

School Notices & Events

</h2>

<p className="mt-5 text-lg text-muted-foreground">

Stay updated with the latest notices, announcements and upcoming events.

</p>

</div>

<div className="mx-auto mt-16 max-w-6xl">

{
loading ?

<div className="rounded-2xl border border-border bg-card py-12 text-center">

Loading...

</div>

:

latest.length===0 ?

<div className="rounded-2xl border border-border bg-card py-12 text-center">

No Updates Available

</div>

:

<div className="overflow-hidden rounded-3xl border border-border bg-card">

<table className="w-full">

<thead className="bg-muted">

<tr>

<th className="px-6 py-5 text-left">

Type

</th>

<th className="px-6 py-5 text-left">

Title

</th>

<th className="px-6 py-5 text-left">

Date

</th>

<th className="px-6 py-5 text-left">

Action

</th>

</tr>

</thead>

<tbody>
  {

latest.map((item)=>(

<tr
key={`${item.type}-${item.id}`}
className="border-t border-border transition hover:bg-muted/40"
>

<td className="px-6 py-5">

<div className="flex items-center gap-3">

<div
className={`flex h-12 w-12 items-center justify-center rounded-xl ${
item.type==="Notice"
?
"bg-blue-100 text-blue-700"
:
"bg-green-100 text-green-700"
}`}
>

{
item.type==="Notice"

?

<FileText size={22}/>

:

<PartyPopper size={22}/>

}

</div>

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${
item.type==="Notice"
?
"bg-blue-100 text-blue-700"
:
"bg-green-100 text-green-700"
}`}
>

{item.type}

</span>

</div>

</td>

<td className="px-6 py-5">

<h3 className="font-semibold">

{item.title}

</h3>

{
item.type==="Event" &&

<p className="mt-2 text-sm text-muted-foreground">

📍 {item.venue}

</p>

}

</td>

<td className="px-6 py-5">

<div className="flex items-center gap-2 text-muted-foreground">

<CalendarDays size={16}/>

{

new Date(item.date).toLocaleDateString()

}

</div>

</td>

<td className="px-6 py-5">

<a
href={item.file}
target="_blank"
rel="noreferrer"
>

<Button className="flex items-center gap-2">

{

item.type==="Notice"

?

"Download"

:

"View"

}

<ArrowUpRight size={16}/>

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

<div className="mt-10 flex justify-center">
<NavLink to={"/Announcements"}>
  
<Button>

View All Updates

</Button>
</NavLink>

</div>

</Container>

</section>

);

};

export default LatestUpdates;