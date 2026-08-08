import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CalendarDays,
  MapPin,
  X,
  Eye,
} from "lucide-react";

import { toast } from "sonner";

import Container from "../../Components/ui/Container";
import Button from "../../Components/ui/Button";

import {
  readData,
  writeData,
  updateData,
  deleteData,
} from "../../superbase/supabase";

const ManageEvents = () => {

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    file: null,
  });
console.log(events);

  useEffect(() => {
    getEvents();
  }, []);

  const filteredEvents = useMemo(() => {

    return events.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  }, [events, search]);

  async function getEvents() {

    try {

      const data = await readData("Events");

      setEvents(data);

    } catch (error) {

      toast.error(error.message);

    }

  }

  function resetForm() {

    setFormData({
      title: "",
      description: "",
      venue: "",
      date: "",
      file: null,
    });

    setSelectedEvent(null);

    setEditMode(false);

  }

  function openAddModal() {

    resetForm();

    setShowForm(true);

  }

  function closeFormModal() {

    resetForm();

    setShowForm(false);

  }

  function openEditModal(item) {

    setSelectedEvent(item);

    setEditMode(true);
    console.log(item);
    

    setFormData({
      title: item.title,
      description: item.description,
      venue: item.venue,
      date: item.date,
      file: null,
    });

    setShowForm(true);

  }

  function openDeleteModal(item) {

    setSelectedEvent(item);

    setShowDelete(true);

  }

  function closeDeleteModal() {

    setSelectedEvent(null);

    setShowDelete(false);

  }

  function handleDelete(id){
    const newEvent=events.filter((e)=>(e.id!=id))
    setEvents(newEvent)
    deleteData("Events","Events",selectedEvent.id)
    closeDeleteModal()
  }

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  function handleImage(e) {

    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));

  }async function handleSubmit() {

  if (!formData.title.trim()) {
    return toast.error("Title is required");
  }

  if (!formData.date) {
    return toast.error("Select event date");
  }

  if (!editMode && !formData.file) {
    return toast.error("Please upload an image");
  }

  try {

    setLoading(true);

    if (editMode) {

      const updated = await updateData(
        "Events",
        "Events",
        selectedEvent.id,
        formData
      );

      setEvents((prev) =>
        prev.map((item) =>
          item.id === selectedEvent.id ? updated[0] : item
        )
      );

      toast.success("Event updated successfully.");

    } else {

      const created = await writeData(
        "Events",
        "Events",
        formData
      );

      setEvents((prev) => [created[0], ...prev]);

      toast.success("Event created successfully.");

    }

    closeFormModal();

  } catch (error) {

    toast.error(error.message);

  } finally {

    setLoading(false);

  }

}

return (

<section className="py-10">

<Container>

<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

<div>

<h1 className="text-4xl font-bold">

Manage Events

</h1>

<p className="mt-2 text-muted-foreground">

Create, edit and manage all school events.

</p>

</div>

<Button
onClick={openAddModal}
className="flex items-center gap-2"
>

<Plus size={18}/>

Add Event

</Button>

</div>

<div className="mt-8 grid gap-5 md:grid-cols-3">

<div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

<p className="text-sm text-muted-foreground">

Total Events

</p>

<h2 className="mt-2 text-4xl font-bold">

{events.length}

</h2>

</div>

<div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

<p className="text-sm text-muted-foreground">

Upcoming

</p>

<h2 className="mt-2 text-4xl font-bold text-green-600">

{
events.filter(
(item)=>new Date(item.date)>=new Date()
).length
}

</h2>

</div>

<div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

<p className="text-sm text-muted-foreground">

Completed

</p>

<h2 className="mt-2 text-4xl font-bold text-red-500">

{
events.filter(
(item)=>new Date(item.date)<new Date()
).length
}

</h2>

</div>

</div>

<div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-sm">

<div className="flex items-center rounded-xl border border-border px-4">

<Search
size={18}
className="text-muted-foreground"
/>

<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search events..."
className="w-full bg-transparent px-4 py-4 outline-none"
/>

</div>

</div>
{
showForm &&

<div className=" absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">

<div className="w-full max-w-2xl rounded-3xl bg-card p-8 shadow-2xl">

<div className="flex items-center justify-between">

<div>

<h2 className="text-3xl font-bold">

{
editMode
?
"Edit Event"
:
"Add Event"
}

</h2>

<p className="mt-1 text-sm text-muted-foreground">

Fill the event details below.

</p>

</div>

<button
onClick={closeFormModal}
className="rounded-lg p-2 transition hover:bg-muted"
>

<X size={22}/>

</button>

</div>

<div className="mt-8 space-y-5 ">

<div>

<label className="mb-2 block text-sm font-medium">

Event Title

</label>

<input
name="title"
value={formData.title}
onChange={handleChange}
placeholder="Sports Day"
className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
/>

</div>

<div>

<label className="mb-2 block text-sm font-medium">

Description

</label>

<textarea
rows={4}
name="description"
value={formData.description}
onChange={handleChange}
placeholder="Write event details..."
className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
/>

</div>

<div className="grid gap-5 md:grid-cols-2">

<div>

<label className="mb-2 block text-sm font-medium">

Venue

</label>

<input
name="venue"
value={formData.venue}
onChange={handleChange}
placeholder="School Playground"
className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
/>

</div>

<div>

<label className="mb-2 block text-sm font-medium">

Date

</label>

<input
type="date"
name="date"
value={formData.date}
onChange={handleChange}
className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
/>

</div>

</div>

<div>

<label className="mb-2 block text-sm font-medium">

Event Image

</label>

<input
type="file"
accept="image/*"
onChange={handleImage}
className="w-full rounded-xl border border-border p-3"
/>

</div>

{
formData.file &&

<div>

<p className="mb-2 text-sm text-muted-foreground">

Preview

</p>

<img
src={URL.createObjectURL(formData.file)}
alt="Preview"
className="h-40 w-full rounded-2xl border border-border object-cover"
/>

</div>

}

<div className="flex justify-end gap-3 pt-2">

<Button
variant="secondary"
onClick={closeFormModal}
>

Cancel

</Button>

<Button
onClick={handleSubmit}
disabled={loading}
>

{
loading
?
"Saving..."
:
editMode
?
"Update Event"
:
"Create Event"
}

</Button>

</div>

</div>

</div>

</div>

}
<div className="mt-8 grid gap-6">

{
filteredEvents.length===0 ?

<div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">

<CalendarDays
size={55}
className="mx-auto text-primary"
/>

<h2 className="mt-6 text-2xl font-bold">

No Events Yet

</h2>

<p className="mt-2 text-muted-foreground">

Create your first event.

</p>

</div>

:

filteredEvents.map((item)=>(

<div
key={item.id}
className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-lg"
>

<div className="grid md:grid-cols-[280px_1fr]">

<div className="overflow-hidden">

<img
src={item.file}
alt={item.title}
onClick={()=>setPreviewImage(item.file)}
className="h-64 w-full cursor-pointer object-cover transition duration-300 hover:scale-105"
/>

</div>

<div className="flex flex-col p-6">

<div className="flex items-start justify-between gap-5">

<div>

<h2 className="text-2xl font-bold">

{item.title}

</h2>

<div className="mt-3 flex flex-wrap gap-5 text-sm text-muted-foreground">

<div className="flex items-center gap-2">

<CalendarDays size={16}/>

{new Date(item.date).toLocaleDateString()}

</div>

<div className="flex items-center gap-2">

<MapPin size={16}/>

{item.venue}

</div>

</div>

</div>

<div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

Published

</div>

</div>

<p className="mt-5 flex-1 leading-7 text-muted-foreground">

{item.description}

</p>

<div className="mt-6 flex flex-wrap gap-3">

<Button
variant="secondary"
onClick={()=>setPreviewImage(item.file)}
className="flex items-center gap-2"
>

<Eye size={17}/>

View

</Button>

<Button
variant="secondary"
onClick={()=>openEditModal(item)}
>

<Pencil size={17}/>

</Button>

<Button
onClick={()=>openDeleteModal(item)}
className="bg-red-600 hover:bg-red-700 "
>

<Trash2 size={17}/>

</Button>

</div>

</div>

</div>

</div>

))

}

</div>

{
previewImage &&

<div
className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-8"
onClick={()=>setPreviewImage(null)}
>

<button
className="absolute right-8 top-8 rounded-full bg-white p-2"
>

<X className="text-black"/>

</button>

<img
src={previewImage}
alt=""
onClick={(e)=>e.stopPropagation()}
className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
/>

</div>

}

{
showDelete &&

<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">

<div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-2xl">

<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

<Trash2
size={35}
className="text-red-600"
/>

</div>

<h2 className="mt-6 text-center text-3xl font-bold">

Delete Event?

</h2>

<p className="mt-3 text-center text-muted-foreground">

This action cannot be undone.

</p>

<div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">

<p className="text-sm text-muted-foreground">

Event Name

</p>

<h3 className="mt-1 text-lg font-semibold">

{selectedEvent?.title}

</h3>

</div>

<div className="mt-8 flex justify-end gap-3">

<Button
variant="secondary"
onClick={closeDeleteModal}
>

Cancel

</Button>

<Button
onClick={()=>{handleDelete(selectedEvent.id)}}
disabled={loading}
variant="secondary"
>

{
loading
?
"Deleting..."
:
"Delete"
}

</Button>

</div>

</div>

</div>

}

</Container>

</section>

);

};

export default ManageEvents;