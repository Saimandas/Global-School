import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  FileText,
  X,
} from "lucide-react";
import { useRef } from "react";


import { toast } from "sonner";

import Container from "../../Components/ui/Container";
import Button from "../../Components/ui/Button";

import {
  readData,
  writeData,
  updateData,
  deleteData,
} from "../../superbase/supabase";

const ManageImpDocs = () => {
  

  const [notices, setNotices] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState(null);
  const addFileRef = useRef(null);
  const editFileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });

  useEffect(() => {
    getNotices();
  }, []);

  const filteredNotices = useMemo(() => {
    return notices.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [notices, search]);

  async function getNotices() {
    try {
      const data = await readData("Imp_Notices");
      setNotices(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      file: null,
    });

    setSelectedNotice(null);
  }

  function openAddModal() {
    resetForm();
    setShowAdd(true);
  }

  function closeAddModal() {
    resetForm();
    setShowAdd(false);
  }

  function openEditModal(item) {
    setSelectedNotice(item);

    setFormData({
      title: item.title,
      file: null,
    });

    setShowEdit(true);
  }

  function closeEditModal() {
    resetForm();
    setShowEdit(false);
  }

  function openDeleteModal(item) {
    setSelectedNotice(item);
    setShowDelete(true);
  }

  function closeDeleteModal() {
    setSelectedNotice(null);
    setShowDelete(false);
  }

  function handleTitleChange(e) {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  }

  function handleFileChange(e) {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  }

  async function handleAddNotice() {

    if (!formData.title.trim()) {
      toast.error("Please enter notice title.");
      return;
    }

    if (!formData.file) {
      toast.error("Please select a PDF.");
      return;
    }

    try {

      setLoading(true);

      await writeData(
        "Imp_Notices",
        "IMP_Notices",
        formData
      );

      await getNotices();

      toast.success("Notice added successfully.");

      closeAddModal();

    } catch (error) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  }

  async function handleUpdateNotice() {

    try {

      setLoading(true);

      const data = {
        title: formData.title,
        file: formData.file || selectedNotice.file,
      };

      await updateData(
        "Imp_Notices",
        "IMP_Notices",
        selectedNotice.id,
        data
      );

      await getNotices();

      toast.success("Notice updated.");

      closeEditModal();

    } catch (error) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  }

  async function handleDeleteNotice() {

    try {

      setLoading(true);

      await deleteData(
        "Imp_Notices",
        "IMP_Notices",
        selectedNotice.id,
        selectedNotice.file
      );

      await getNotices();

      toast.success("Notice deleted.");

      closeDeleteModal();

    } catch (error) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  }

  return (<section className="min-h-screen bg-background py-10">

  <Container>

    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <h1 className="text-4xl font-bold">
         Documents
        </h1>

        <p className="mt-2 text-muted-foreground">
          Upload and manage all PDF documents.
        </p>

      </div>

      <Button
        onClick={openAddModal}
        className="flex items-center gap-2"
      >
        <Plus size={18} />
        Add Document
      </Button>

    </div>

    <div className="mt-8 grid gap-5 md:grid-cols-3">

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

        <p className="text-sm text-muted-foreground">
          Total Documents
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {notices.length}
        </h2>

      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

        <p className="text-sm text-muted-foreground">
          Published
        </p>

        <h2 className="mt-2 text-4xl font-bold text-primary">
          {notices.length}
        </h2>

      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

        <p className="text-sm text-muted-foreground">
          This Month
        </p>

        <h2 className="mt-2 text-4xl font-bold text-accent">
          {
            notices.filter(
              item =>
                new Date(item.created_at).getMonth() ===
                new Date().getMonth()
            ).length
          }
        </h2>

      </div>

    </div>

    <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">

      <div className="flex items-center rounded-xl border border-border bg-background px-4">

        <Search
          size={18}
          className="text-muted-foreground"
        />

        <input
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search document..."
          className="w-full bg-transparent px-4 py-4 outline-none"
        />

      </div>

    </div>

    {
      showAdd &&

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

        <div className="w-full max-w-xl rounded-3xl bg-card p-8 shadow-2xl">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Add Document
            </h2>

            <button
              onClick={closeAddModal}
              className="rounded-lg p-2 hover:bg-muted"
            >
              <X size={22}/>
            </button>

          </div>

          <div className="mt-8 space-y-6">

            <div>

              <label className="mb-2 block font-medium">
                Title
              </label>

              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Admission Notice 2026"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                PDF File
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-border bg-background px-5 py-4">

                <span className="truncate">

                  {
                    formData.file
                    ? formData.file.name
                    : "Choose PDF File"
                  }

                </span>

                <Button
                type="button"
                variant="secondary"
                onClick={() => addFileRef.current.click()}
              >
                Browse
              </Button>

              <input
                ref={addFileRef}
                hidden
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />

              </label>

            </div>

            <div className="flex justify-end gap-3">

              <Button
                variant="secondary"
                onClick={closeAddModal}
              >
                Cancel
              </Button>

              <Button
                onClick={handleAddNotice}
                disabled={loading}
              >
                {
                  loading
                  ? "Uploading..."
                  : "Add Document"
                }
              </Button>

            </div>

          </div>

        </div>

      </div>
    }
    <div className="mt-8 space-y-5">

  {
    filteredNotices.length === 0 ?

      <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">

        <FileText
          size={55}
          className="mx-auto text-primary"
        />

        <h2 className="mt-5 text-2xl font-semibold">
          No Documents Found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Click on "Add Document" to upload your first notice.
        </p>

      </div>

      :

      filteredNotices.map((item) => (

        <div
          key={item.id}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">

                <FileText
                  size={32}
                  className="text-primary"
                />

              </div>

              <div>

                <h2 className="text-xl font-semibold">

                  {item.title}

                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">

                  <span>

                    Uploaded :

                    {" "}

                    {new Date(item.created_at).toLocaleDateString()}

                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                    Published

                  </span>

                </div>

              </div>

            </div>

            <div className="flex flex-wrap gap-3">

              <a
                href={item.file}
                target="_blank"
                rel="noreferrer"
              >

                <Button variant="secondary">

                  View PDF

                </Button>

              </a>

              <Button
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => openEditModal(item)}
              >

                <Pencil size={17} />

                Edit

              </Button>

              <Button
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-2 rounded-md"
                onClick={() => openDeleteModal(item)}
              >

                <Trash2 size={17} />

                Delete

              </Button>

            </div>

          </div>

        </div>

      ))

  }

</div>

{
  showEdit &&

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

    <div className="w-full max-w-xl rounded-3xl bg-card p-8 shadow-2xl">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">

          Edit Document

        </h2>

        <button
          onClick={closeEditModal}
          className="rounded-lg p-2 hover:bg-muted"
        >

          <X size={22}/>

        </button>

      </div>

      <div className="mt-8 space-y-6">

        <div>

          <label className="mb-2 block font-medium">

            Title

          </label>

          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">

            Replace PDF

          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-border bg-background px-5 py-4">

            <span className="truncate">

              {
                formData.file
                  ? formData.file.name
                  : "Keep Existing PDF"
              }

            </span>

                  <Button
          type="button"
          variant="secondary"
          onClick={() => editFileRef.current.click()}
        >
          Browse
        </Button>

        <input
          ref={editFileRef}
          hidden
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
          </label>

        </div>

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={closeEditModal}
          >

            Cancel

          </Button>

          <Button
            onClick={handleUpdateNotice}
            disabled={loading}
          >

            {
              loading
                ? "Updating..."
                : "Save Changes"
            }

          </Button>

        </div>

      </div>

    </div>

  </div>

}
{
  showDelete &&

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

    <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-2xl">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

        <Trash2
          size={34}
          className="text-red-600"
        />

      </div>

      <h2 className="mt-6 text-center text-3xl font-bold">

        Delete Document?

      </h2>

      <p className="mt-3 text-center text-muted-foreground">

        This action cannot be undone.

      </p>

      {
        selectedNotice &&

        <div className="mt-6 rounded-2xl border border-border bg-background p-4">

          <h3 className="font-semibold">

            {selectedNotice.title}

          </h3>

          <p className="mt-2 text-sm text-muted-foreground">

            Uploaded :

            {" "}

            {new Date(selectedNotice.created_at).toLocaleDateString()}

          </p>

        </div>

      }

      <div className="mt-8 flex justify-end gap-3">

        <Button
          variant="secondary"
          onClick={closeDeleteModal}
        >

          Cancel

        </Button>

        <Button
          onClick={handleDeleteNotice}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 " 
        >

          {

            loading

              ? "Deleting..."

              : "Delete"

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

export default ManageImpDocs;