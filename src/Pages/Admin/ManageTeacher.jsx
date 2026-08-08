import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
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

const initialForm = {
  name: "",
  qualification: "",
  designation: "",
  email: "",
  phone: "",
  subject_id: "",
  file: null,
};

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [teacherData, subjectData] = await Promise.all([
        readData("Teachers"),
        readData("Subjects"),
      ]);

      setTeachers(teacherData || []);
      setSubjects(subjectData || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prev) => ({
        ...prev,
        file: files[0],
      }));

      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Make sure a subject is selected
    if (!form.subject_id) {
      toast.error("Please select a subject.");
      return;
    }

    // Convert phone safely because database column is bigint
    let phone = null;

    if (form.phone.trim() !== "") {
      phone = Number(form.phone);

      if (!Number.isInteger(phone)) {
        toast.error("Phone number must contain only numbers.");
        return;
      }
    }

    const payload = {
    name: form.name,
    qualification: form.qualification,
    designation: form.designation,
    email: form.email,
    phone: form.phone ? Number(form.phone) : null,
    subject_id: form.subject_id ? Number(form.subject_id) : null,
};

    // Only send file when a new file was selected
    if (form.file instanceof File) {
      payload.file = form.file;
    }

    try {
      if (editingId) {
        await updateData(
          "Teachers",
          "Teachers",
          editingId,
          payload
        );

        toast.success("Teacher updated.");
      } else {
        await writeData(
          "Teachers",
          "Teachers",
          payload
        );

        toast.success("Teacher added.");
      }

      setForm(initialForm);
      setPreview("");
      setEditingId(null);

      await loadData();
    } catch (err) {
      toast.error(err.message);
    }
  }

  function edit(item) {
    setEditingId(item.id);

    setForm({
      ...initialForm,
      name: item.name || "",
      qualification: item.qualification || "",
      designation: item.designation || "",
      email: item.email || "",
      phone: item.phone ? String(item.phone) : "",
      subject_id: item.subject_id
        ? String(item.subject_id)
        : "",
      file: null,
    });

    setPreview(item.file || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function remove(id) {
    if (!confirm("Delete this teacher?")) return;

    try {
      await deleteData("Teachers", "Teachers", id);

      toast.success("Teacher deleted.");

      await loadData();
    } catch (err) {
      toast.error(err.message);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setPreview("");
  }

  const subjectName = (id) =>
    subjects.find((subject) => subject.id === id)?.name || "-";

  return (
    <section>
      <Container className="py-10">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-800 p-8 text-white">
          <div className="flex items-center gap-4">
            <GraduationCap size={42} />

            <div>
              <h1 className="text-4xl font-bold">
                Manage Teachers
              </h1>

              <p className="text-white/80">
                Create and manage teacher profiles.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-md"
        >
          <div className="grid gap-5 md:grid-cols-2">

            <input
              className="rounded-xl border border-border p-3"
              placeholder="Teacher Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              className="rounded-xl border border-border p-3"
              placeholder="Qualification"
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              required
            />

            <input
              className="rounded-xl border border-border p-3"
              placeholder="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              required
            />

            <input
              className="rounded-xl border border-border p-3"
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className="rounded-xl border border-border p-3"
              placeholder="Phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <select
  name="subject_id"
  value={form.subject_id}
  onChange={handleChange}
>
  <option value="">Select Subject</option>

  {subjects.map((subject) => (
    <option key={subject.id} value={subject.id}>
      {subject.name}
    </option>
  ))}
</select>

          </div>

          {/* Image */}

          <div className="mt-5">

            <label className="mb-2 flex items-center gap-2 font-medium">
              <ImageIcon size={18} />
              Teacher Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
            />

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Teacher preview"
                  className="h-32 w-32 rounded-xl object-cover"
                />
              </div>
            )}

          </div>

          {/* Buttons */}

          <div className="mt-6 flex gap-3">

            <Button type="submit">
              <Plus size={18} />

              {editingId
                ? "Update Teacher"
                : "Add Teacher"}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            )}

          </div>
        </form>

        {/* Teachers Table */}

        <div className="mt-8 overflow-auto rounded-3xl border border-border bg-card shadow-md">

          <table className="w-full">

            <thead className="bg-muted">

              <tr>
                <th className="p-4 text-left">
                  Photo
                </th>

                <th className="text-left">
                  Name
                </th>

                <th className="text-left">
                  Subject
                </th>

                <th className="text-left">
                  Qualification
                </th>

                <th className="text-left">
                  Designation
                </th>

                <th className="text-left">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : teachers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center"
                  >
                    No teachers found.
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-t border-border"
                  >

                    <td className="p-3">

                      {teacher.file ? (
                        <img
                          src={teacher.file}
                          className="h-14 w-14 rounded-lg object-cover"
                          alt={teacher.name}
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
                          <ImageIcon size={20} />
                        </div>
                      )}

                    </td>

                    <td>
                      {teacher.name}
                    </td>

                    <td>
                      {subjectName(teacher.subject_id)}
                    </td>

                    <td>
                      {teacher.qualification}
                    </td>

                    <td>
                      {teacher.designation}
                    </td>

                    <td>

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() => edit(teacher)}
                          className="rounded-lg bg-amber-500 p-2 text-white"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => remove(teacher.id)}
                          className="rounded-lg bg-red-600 p-2 text-white"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </Container>
    </section>
  );
};

export default ManageTeachers;