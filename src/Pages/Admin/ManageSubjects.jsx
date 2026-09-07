import React, { useEffect, useState } from "react";
import { BookOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import Container from "../../Components/UI/Container";
import Button from "../../Components/UI/Button";

import {
  readSubjects,
  readData,
  writeData,
  updateData,
  deleteSubject,
} from "../../superbase/supabase";

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [currentSubject, setCurrentSubject] = useState("");
 const [currentCategory, setCurrentCategory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const category=await readData("Category")
      const subject=await readData("Subjects")

      setSubjects(subject || []);
      setCategories(category || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

 function handleChange(type, value) {
  if (type === "subject") {
    setCurrentSubject(value);
  }

  if (type === "category") {
    if (currentCategory.includes(value)) {
      setCurrentCategory(
        currentCategory.filter((id) => id !== value)
      );
    } else {
      setCurrentCategory([...currentCategory, value]);
    }
  }
}
  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentSubject.trim()) {
      return toast.error("Enter subject name.");
    }

   if (currentCategory.length === 0) {
      return toast.error("Select a category.");
    }

    try {
      let subjectId = editingId;

      if (editingId) {
        await updateData(
          "Subjects",
          "",
          editingId,
          {
            name: currentSubject,
          }
        );

        subjectId = editingId;

        toast.success("Subject updated.");
      } else {
        const data = await writeData(
          "Subjects",
          "",
          {
            name: currentSubject,
          }
        );

        subjectId = data[0].id;

        toast.success("Subject added.");
      }

     for (const categoryId of currentCategory) {
  await writeData(
    "category_subject",
    "",
    {
      subject_id: subjectId,
      category_id: categoryId,
    }
  );
}

      setCurrentSubject("");
      setCurrentCategory([]);
      setEditingId(null);

      await loadData();
    } catch (err) {
      toast.error(err.message);
    }
  }

  function edit(item) {
    setEditingId(item.id);

    setCurrentSubject(item.name);

    setCurrentCategory(item.category_ids || []);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function remove(id) {
    if (!confirm("Delete this subject?")) return;

    try {
      await deleteSubject(id);

      toast.success("Subject deleted.");

      await loadData();
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
  <section>
    <Container className="py-10">
      {/* Header */}
      <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/10 p-4">
            <BookOpen size={40} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Manage Subjects
            </h1>

            <p className="mt-2 text-primary-foreground/80">
              Add, edit and organize subjects with categories.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-md"
      >
        <div className="space-y-6">

          {/* Subject */}
          <div>
            <label className="mb-2 block font-medium">
              Subject Name
            </label>

            <input
              type="text"
              value={currentSubject}
              onChange={(e) =>
                handleChange("subject", e.target.value)
              }
              placeholder="Enter subject name..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-3 block font-medium">
              Select Category
            </label>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    handleChange("category", cat.id)
                  }
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                 currentCategory.includes(cat.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex items-center gap-2"
            >
              <Plus size={18} />

              {editingId
                ? "Update Subject"
                : "Add Subject"}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setCurrentSubject("");
                  setCurrentCategory([]);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </form>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-md">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-16 p-4 text-left">#</th>

              <th className="p-4 text-left">
                Subject
              </th>

              {/* <th className="p-4 text-left">
                Categories
              </th> */}

              <th className="w-44 p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : subjects.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center"
                >
                  No Subjects Found.
                </td>
              </tr>
            ) : (
              subjects.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-border hover:bg-muted/40"
                >
                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-2 text-primary">
                        <BookOpen size={18} />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          School Subject
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {item.categories?.length ? (
                        item.categories.map((cat) => (
                          <span
                            key={cat.id}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {cat.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted-foreground">
                          No Category
                        </span>
                      )}
                    </div>
                  </td> */}

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => edit(item)}
                        className="rounded-xl bg-amber-500 p-2 text-white transition hover:scale-105"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="rounded-xl bg-red-600 p-2 text-white transition hover:scale-105"
                      >
                        <Trash2 size={18} />
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

export default ManageSubjects;