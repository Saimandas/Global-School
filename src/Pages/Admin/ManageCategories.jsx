import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import { toast } from "sonner";
import Container from "../../Components/ui/Container";
import Button from "../../Components/ui/Button";
import {
  readData,
  writeData,
  updateData,
  deleteData,
} from "../../superbase/supabase";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await readData("Category");
      setCategories(data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return toast.error("Category name is required.");

    try {
      if (editingId) {
        await updateData("Category", "",editingId, { name });
        toast.success("Category updated.");
      } else {
        await writeData("Category", null, { name });
        toast.success("Category added.");
      }

      setName("");
      setEditingId(null);
      loadCategories();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this category?")) return;

    try {
      await deleteData("Category", id);
      toast.success("Category deleted.");
      loadCategories();
    } catch (err) {
      toast.error(err.message);
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setName(item.name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="py-10">
      <Container>
        <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-800 p-8 text-white">
          <div className="flex items-center gap-4">
            <FolderTree size={42} />
            <div>
              <h1 className="text-4xl font-bold">Manage Categories</h1>
              <p className="text-white/80">
                Create and organise academic categories.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-md"
        >
          <label className="mb-2 block font-medium">Category Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Primary, Secondary..."
            className="w-full rounded-xl border border-border px-4 py-3 outline-none"
          />

          <div className="mt-5 flex gap-3">
            <Button type="submit">
              <Plus size={18} />
              {editingId ? "Update Category" : "Add Category"}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-md">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((item, index) => (
                  <tr key={item.id} className="border-t border-border">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-lg bg-amber-500 p-2 text-white"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg bg-red-600 p-2 text-white"
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

export default ManageCategories;
