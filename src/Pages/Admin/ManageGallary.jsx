import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Image as ImageIcon,
  X,
} from "lucide-react";

import { toast } from "sonner";

import Container from "../../Components/ui/Container";
import Button from "../../Components/ui/Button";

import {
  readData,
  deleteData,
  writeData,
} from "../../superbase/supabase";
const ManageGallery = () => {

  const [images, setImages] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [preview, setPreview] = useState(null);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [name, setTitle] = useState("");

  const [file, setFile] = useState(null);
  

  useEffect(() => {
    getGallery();
  }, []);

  

  async function getGallery() {
  try {
    const data = await readData("Gallery");
    console.log(data);
    
    setImages(data);
  } catch (error) {
    toast.error(error.message);
  }
}
  const filteredImages = useMemo(() => {

    return images.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  }, [images, search]);

  function resetForm() {

    setTitle("");

    setFile(null);

    setShowForm(false);

  }

  async function handleUpload() {

    if (!name.trim()) {
      return toast.error("Enter image name.");
    }

    if (!file) {
      return toast.error("Select an image.");
    }

    try {

      setLoading(true);

      await writeData("Gallery","Gallery",{name,file})

      await getGallery();

      toast.success("Image uploaded.");

      resetForm();

    } catch (error) {
      console.log(error);
      
      toast.error(error.message);

    } finally {

      setLoading(false);

    }

  }

  function openDelete(item) {

    setSelectedImage(item);

    setShowDelete(true);

  }

  function closeDelete() {

    setSelectedImage(null);

    setShowDelete(false);

  }

  async function handleDelete() {

    try {

      setLoading(true);

      await deleteData("Gallery","Gallery", selectedImage.id);

      setImages((prev) =>
        prev.filter((item) => item.id !== selectedImage.id)
      );

      toast.success("Image deleted.");

      closeDelete();

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

              Gallery

            </h1>

            <p className="mt-2 text-muted-foreground">

              Manage school gallery images.

            </p>

          </div>

          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >

            <Plus size={18}/>

            Add Image

          </Button>

        </div>

        {/* Search */}

        <div className="mt-8 rounded-3xl border border-border bg-card p-5">

          <div className="flex items-center rounded-xl border border-border px-4">

            <Search
              size={18}
              className="text-muted-foreground"
            />

            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search image..."
              className="w-full bg-transparent px-4 py-4 outline-none"
            />

          </div>

        </div>

        {/* Upload Modal */}

        {
          showForm &&

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5">

            <div className="w-full max-w-xl rounded-3xl bg-card p-8">

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold">

                  Upload Image

                </h2>

                <button
                  onClick={resetForm}
                >
                  <X/>
                </button>

              </div>

              <div className="mt-8 space-y-5">

                <input
                type="text"
                  value={name}
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="Image name"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e)=>setFile(e.target.files[0])}
                  className="w-full rounded-xl border border-border p-3"
                />

                {
                  file &&

                  <img
                    src={URL.createObjectURL(file)}
                    className="h-56 w-full rounded-2xl object-cover"
                  />

                }

                <div className="flex justify-end gap-3">

                  <Button
                    variant="secondary"
                    onClick={resetForm}
                  >

                    Cancel

                  </Button>

                  <Button
                    onClick={handleUpload}
                    disabled={loading}
                  >

                    {
                      loading
                      ? "Uploading..."
                      : "Upload"
                    }

                  </Button>

                </div>

              </div>

            </div>

          </div>
        }

        {/* Gallery Grid */}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
                {filteredImages.length === 0 ? (

          <div className="col-span-full rounded-3xl border border-border bg-card py-20 text-center">

            <ImageIcon
              size={70}
              className="mx-auto text-muted-foreground"
            />

            <h2 className="mt-5 text-2xl font-bold">
              No Images Found
            </h2>

            <p className="mt-2 text-muted-foreground">
              Upload your first gallery image.
            </p>

          </div>

        ) : (

          filteredImages.map((item) => (
            
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="relative overflow-hidden">

                <img
                  src={item.file}
                  alt={item.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100">

                  <div className="flex w-full justify-between p-5">

                    <Button
                      variant="secondary"
                      onClick={() => setPreview(item)}
                    >
                      Preview
                    </Button>

                    <Button
                      onClick={() => openDelete(item)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 size={18}/>
                    </Button>

                  </div>

                </div>

              </div>

              <div className="p-5">

                <h2 className="text-xl font-semibold">

                  {item.name}

                </h2>

                <p className="mt-2 text-sm text-muted-foreground">

                  {new Date(item.created_at).toLocaleDateString()}

                </p>

              </div>

            </div>

          ))

        )}

      

      {/* Preview Modal */}

      {preview && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">

          <div className="relative w-full max-w-5xl">

            <button
              onClick={() => setPreview(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2"
            >
              <X size={20}/>
            </button>

            <img
              src={preview.file}
              alt={preview.name}
              className="max-h-[85vh] w-full rounded-3xl object-contain"
            />

            <div className="mt-5 text-center text-white">

              <h2 className="text-3xl font-bold">

                {preview.name}

              </h2>

            </div>

          </div>

        </div>

      )}

      {/* Delete Modal */}

      {showDelete && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5">

          <div className="w-full max-w-md rounded-3xl bg-card p-8">

            <h2 className="text-3xl font-bold">

              Delete Image?

            </h2>

            <p className="mt-3 text-muted-foreground">

              This action cannot be undone.

            </p>

            <div className="mt-8 flex justify-end gap-3">

              <Button
                variant="secondary"
                onClick={closeDelete}
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>

            </div>

          </div>

        </div>

      )}
            </Container>
    </section>

  );
}

export default ManageGallery;
      