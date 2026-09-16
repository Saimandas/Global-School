import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Image as ImageIcon,
  X,
  Images,
} from "lucide-react";

import { toast } from "sonner";

import Container from "../../Components/UI/Container";
import Button from "../../Components/UI/Button";

import {
  readData,
  deleteData,
  writeData,
  updateData,
} from "../../superbase/supabase";

const ManageGallery = () => {
  /* =========================================================
     GALLERY DATA
  ========================================================= */

  const [galleries, setGalleries] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);


  /* =========================================================
     CREATE GALLERY
  ========================================================= */

  const [showForm, setShowForm] = useState(false);

  const [galleryName, setGalleryName] = useState("");

  const [files, setFiles] = useState([]);

  const [filePreviews, setFilePreviews] = useState([]);


  /* =========================================================
     ADD MORE IMAGES
  ========================================================= */

  const [showAddImages, setShowAddImages] = useState(false);

  const [selectedGallery, setSelectedGallery] = useState(null);


  /* =========================================================
     PREVIEW
  ========================================================= */

  const [preview, setPreview] = useState(null);


  /* =========================================================
     DELETE
  ========================================================= */

  const [showDelete, setShowDelete] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const [updateName, setUpdateName] = useState("");


  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    getGallery();
  }, []);


  /* =========================================================
     GET GALLERY
  ========================================================= */

  async function getGallery() {
    try {
      const galleryNames = await readData(
        "galleryName"
      );

      const galleryImages = await readData(
        "galleryImage"
      );

      const combined = galleryNames.map(
        (gallery) => {
          const images = galleryImages.filter(
            (image) =>
              Number(image.galleryId) ===
              Number(gallery.id)
          );

          return {
            ...gallery,
            images,
          };
        }
      );

      console.log(
        "Combined gallery data:",
        combined
      );

      setGalleries(combined);
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to load gallery."
      );
    }
  }


  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredGalleries = useMemo(() => {
    return galleries.filter((gallery) =>
      gallery.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [galleries, search]);


  /* =========================================================
     CREATE LOCAL IMAGE PREVIEWS
  ========================================================= */

  useEffect(() => {
    if (files.length === 0) {
      setFilePreviews([]);
      return;
    }

    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setFilePreviews(urls);

    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [files]);


  /* =========================================================
     ADD FILES
     
     IMPORTANT:
     This APPENDS files instead of replacing them.
  ========================================================= */

  function handleFileChange(e) {
    const selectedFiles = Array.from(
      e.target.files || []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    setFiles((previousFiles) => [
      ...previousFiles,
      ...selectedFiles,
    ]);

    /*
      Reset the input so the user can select
      the same file again if necessary.
    */

    e.target.value = "";
  }


  /* =========================================================
     REMOVE SELECTED LOCAL IMAGE
  ========================================================= */

  function removeSelectedFile(index) {
    setFiles((previousFiles) =>
      previousFiles.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );
  }


  /* =========================================================
     RESET CREATE FORM
  ========================================================= */

  function resetForm() {
    setGalleryName("");

    setFiles([]);

    setFilePreviews([]);

    setShowForm(false);
  }


  /* =========================================================
     CREATE NEW GALLERY
  ========================================================= */

  async function handleUpload() {
    if (!galleryName.trim()) {
      return toast.error(
        "Enter gallery name."
      );
    }

    if (files.length === 0) {
      return toast.error(
        "Select at least one image."
      );
    }

    try {
      setLoading(true);


      /* -----------------------------------------------------
         STEP 1
         CREATE GALLERY NAME
      ----------------------------------------------------- */

      const galleryData = await writeData(
        "galleryName",
        "Gallery",
        {
          name: galleryName.trim(),
        }
      );


      /*
        writeData() returns an array because
        your helper uses .insert().select()
      */

      const createdGallery =
        galleryData?.[0];


      if (!createdGallery) {
        throw new Error(
          "Gallery could not be created."
        );
      }


      /* -----------------------------------------------------
         STEP 2
         UPLOAD EACH IMAGE
      ----------------------------------------------------- */

      for (const file of files) {
        await writeData(
          "galleryImage",
          "Gallery",
          {
            galleryId:
              createdGallery.id,

            file,
          }
        );
      }


      /* -----------------------------------------------------
         STEP 3
         REFRESH
      ----------------------------------------------------- */

      await getGallery();


      toast.success(
        `${files.length} image${
          files.length !== 1
            ? "s"
            : ""
        } uploaded successfully.`
      );


      resetForm();

    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to create gallery."
      );

    } finally {
      setLoading(false);
    }
  }


  /* =========================================================
     OPEN ADD MORE IMAGES
  ========================================================= */

  function openAddImages(gallery) {
    setSelectedGallery(gallery);

    setFiles([]);

    setFilePreviews([]);

    setShowAddImages(true);
  }


  /* =========================================================
     RESET ADD IMAGES
  ========================================================= */

  function resetAddImages() {
    setSelectedGallery(null);

    setFiles([]);

    setFilePreviews([]);

    setShowAddImages(false);
  }


  /* =========================================================
     ADD MORE IMAGES TO EXISTING GALLERY
  ========================================================= */

  async function handleAddImages() {
    if (!selectedGallery) {
      return toast.error(
        "Gallery not selected."
      );
    }

    if (files.length === 0) {
      return toast.error(
        "Select at least one image."
      );
    }

    try {
      setLoading(true);


      /* -----------------------------------------------------
         UPLOAD EACH NEW IMAGE
         USING EXISTING galleryId
      ----------------------------------------------------- */

      for (const file of files) {
        await writeData(
          "galleryImage",
          "Gallery",
          {
            galleryId:
              selectedGallery.id,

            file,
          }
        );
      }


      /* -----------------------------------------------------
         REFRESH
      ----------------------------------------------------- */

      await getGallery();


      toast.success(
        `${files.length} image${
          files.length !== 1
            ? "s"
            : ""
        } added to "${selectedGallery.name}".`
      );


      resetAddImages();

    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to add images."
      );

    } finally {
      setLoading(false);
    }
  }


  /* =========================================================
     UPDATE GALLERY
  ========================================================= */

  function openUpdate(gallery) {
    setSelectedGallery(gallery);
    setUpdateName(gallery.name || "");
    setShowUpdate(true);
  }

  function closeUpdate() {
    setSelectedGallery(null);
    setUpdateName("");
    setShowUpdate(false);
  }

  async function handleUpdate() {
    if (!selectedGallery) return toast.error("Gallery not selected.");

    const name = updateName.trim();
    if (!name) return toast.error("Enter gallery name.");
    if (name === selectedGallery.name) return toast.error("No changes made.");

    try {
      setLoading(true);
      await updateData("galleryName", "Gallery", selectedGallery.id, { name });
      await getGallery();
      toast.success("Gallery updated successfully.");
      closeUpdate();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update gallery.");
    } finally {
      setLoading(false);
    }
  }


  /* =========================================================
     OPEN DELETE
  ========================================================= */

  function openDelete(gallery) {
    setSelectedGallery(gallery);

    setShowDelete(true);
  }


  /* =========================================================
     CLOSE DELETE
  ========================================================= */

  function closeDelete() {
    setSelectedGallery(null);

    setShowDelete(false);
  }


  /* =========================================================
     DELETE GALLERY
  ========================================================= */

  async function handleDelete() {
    if (!selectedGallery) {
      return;
    }

    try {
      setLoading(true);


      /* -----------------------------------------------------
         DELETE ALL IMAGES
         FROM DATABASE + STORAGE
      ----------------------------------------------------- */

      for (const image of selectedGallery.images) {
        await deleteData(
          "galleryImage",
          "Gallery",
          image.id,
          image.file
        );
      }


      /* -----------------------------------------------------
         DELETE GALLERY NAME
      ----------------------------------------------------- */

      await deleteData(
        "galleryName",
        "Gallery",
        selectedGallery.id
      );


      /* -----------------------------------------------------
         UPDATE UI
      ----------------------------------------------------- */

      setGalleries((previous) =>
        previous.filter(
          (gallery) =>
            gallery.id !==
            selectedGallery.id
        )
      );


      toast.success(
        "Gallery deleted successfully."
      );


      closeDelete();

    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to delete gallery."
      );

    } finally {
      setLoading(false);
    }
  }


  /* =========================================================
     OPEN PREVIEW
  ========================================================= */

  function openPreview(gallery) {
    setPreview(gallery);
  }


  /* =========================================================
     REMOVE PREVIEW
  ========================================================= */

  function closePreview() {
    setPreview(null);
  }


  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="py-10">

      <Container>

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            <h1 className="text-4xl font-bold">
              Gallery
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage school gallery albums and images.
            </p>

          </div>


          <Button
            onClick={() => setShowForm(true)}
            className="
              flex
              items-center
              gap-2
            "
          >

            <Plus size={18} />

            Add Gallery

          </Button>

        </div>


        {/* ===================================================
            SEARCH
        =================================================== */}

        <div
          className="
            mt-8
            rounded-3xl
            border
            border-border
            bg-card
            p-5
          "
        >

          <div
            className="
              flex
              items-center
              rounded-xl
              border
              border-border
              px-4
            "
          >

            <Search
              size={18}
              className="
                text-muted-foreground
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search gallery..."
              className="
                w-full
                bg-transparent
                px-4
                py-4
                outline-none
              "
            />

          </div>

        </div>


        {/* ===================================================
            CREATE GALLERY MODAL
        =================================================== */}

        {showForm && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              p-5
              backdrop-blur-sm
            "
          >

            <div
              className="
                max-h-[90vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-3xl
                bg-card
                p-8
              "
            >

              {/* ------------------------------------------------
                  HEADER
              ------------------------------------------------ */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >

                <div>

                  <h2 className="text-3xl font-bold">
                    Add Gallery
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Create a gallery and upload images.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    rounded-full
                    p-2
                    transition
                    hover:bg-muted
                  "
                >

                  <X />

                </button>

              </div>


              <div className="mt-8 space-y-6">

                {/* ------------------------------------------------
                    GALLERY NAME
                ------------------------------------------------ */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                    "
                  >
                    Gallery Name
                  </label>

                  <input
                    type="text"
                    value={galleryName}
                    onChange={(e) =>
                      setGalleryName(
                        e.target.value
                      )
                    }
                    placeholder="e.g. Annual Sports Day 2026"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-border
                      bg-transparent
                      px-4
                      py-3
                      outline-none
                      focus:border-primary
                    "
                  />

                </div>


                {/* ------------------------------------------------
                    IMAGE INPUT
                ------------------------------------------------ */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                    "
                  >
                    Images
                  </label>


                  {/* HIDDEN REAL INPUT */}

                  <input
                    id="gallery-file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />


                  {/* FIRST SELECT BUTTON */}

                  {files.length === 0 ? (

                    <label
                      htmlFor="gallery-file-input"
                      className="
                        flex
                        cursor-pointer
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-dashed
                        border-border
                        px-4
                        py-4
                        text-sm
                        font-medium
                        text-muted-foreground
                        transition
                        hover:border-primary
                        hover:bg-primary/5
                        hover:text-primary
                      "
                    >

                      <Plus size={18} />

                      Select Images

                    </label>

                  ) : (

                    <div
                      className="
                        rounded-xl
                        border
                        border-border
                        px-4
                        py-3
                      "
                    >

                      <p className="text-sm text-muted-foreground">
                        {files.length} image
                        {files.length !== 1
                          ? "s"
                          : ""}{" "}
                        selected
                      </p>

                    </div>

                  )}


                  <p
                    className="
                      mt-2
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Select one or multiple images.
                  </p>

                </div>


                {/* =================================================
                    SELECTED IMAGES
                ================================================= */}

                {files.length > 0 && (

                  <div>

                    {/* TITLE */}

                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <p className="text-sm font-semibold">
                        Selected Images
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {files.length} image
                        {files.length !== 1
                          ? "s"
                          : ""}
                      </p>

                    </div>


                    {/* IMAGE GRID */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-3
                        md:grid-cols-4
                      "
                    >

                      {filePreviews.map(
                        (url, index) => (

                          <div
                            key={`${url}-${index}`}
                            className="
                              group
                              relative
                              overflow-hidden
                              rounded-xl
                              border
                              border-border
                            "
                          >

                            <img
                              src={url}
                              alt={
                                files[index]?.name ||
                                "Selected image"
                              }
                              className="
                                h-28
                                w-full
                                object-cover
                              "
                            />


                            {/* REMOVE */}

                            <button
                              type="button"
                              onClick={() =>
                                removeSelectedFile(
                                  index
                                )
                              }
                              className="
                                absolute
                                right-2
                                top-2
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-black/70
                                text-white
                                opacity-0
                                transition
                                group-hover:opacity-100
                              "
                              aria-label="Remove image"
                            >

                              <X size={14} />

                            </button>


                            {/* FILE NAME */}

                            <div
                              className="
                                absolute
                                bottom-0
                                left-0
                                right-0
                                truncate
                                bg-black/60
                                px-2
                                py-1.5
                                text-[10px]
                                text-white
                              "
                            >
                              {files[index]?.name}
                            </div>

                          </div>

                        )
                      )}

                    </div>


                    {/* =================================================
                        ADD MORE IMAGES BUTTON

                        THIS IS THE IMPORTANT PART
                    ================================================= */}

                    <label
                      htmlFor="gallery-file-input"
                      className="
                        mt-4
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-dashed
                        border-primary/30
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-primary
                        transition
                        hover:border-primary
                        hover:bg-primary/5
                      "
                    >

                      <Plus size={18} />

                      Add More Images

                    </label>

                  </div>

                )}


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div
                  className="
                    flex
                    justify-end
                    gap-3
                    pt-2
                  "
                >

                  <Button
                    variant="secondary"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Cancel
                  </Button>


                  <Button
                    onClick={handleUpload}
                    disabled={loading}
                  >

                    {loading
                      ? "Uploading..."
                      : "Upload Gallery"}

                  </Button>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ===================================================
            UPDATE GALLERY MODAL
        =================================================== */}

        {showUpdate && selectedGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl bg-card p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">Update Gallery</p>
                  <h2 className="mt-1 text-3xl font-bold">Edit Gallery</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Update the gallery name.</p>
                </div>
                <button type="button" onClick={closeUpdate} className="rounded-full p-2 transition hover:bg-muted" aria-label="Close">
                  <X />
                </button>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Gallery Name</label>
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleUpdate(); }}
                    autoFocus
                    placeholder="e.g. Annual Sports Day 2026"
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="secondary" onClick={closeUpdate} disabled={loading}>Cancel</Button>
                  <Button onClick={handleUpdate} disabled={loading} className="flex items-center gap-2">
                    <Pencil size={16} />
                    {loading ? "Updating..." : "Update Gallery"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ===================================================
            ADD MORE IMAGES MODAL
        =================================================== */}

        {showAddImages &&
          selectedGallery && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              p-5
              backdrop-blur-sm
            "
          >

            <div
              className="
                max-h-[90vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-3xl
                bg-card
                p-8
              "
            >

              {/* HEADER */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      font-medium
                      text-primary
                    "
                  >
                    Add Images
                  </p>

                  <h2 className="mt-1 text-3xl font-bold">
                    {selectedGallery.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Add more images to this gallery.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={resetAddImages}
                  className="
                    rounded-full
                    p-2
                    transition
                    hover:bg-muted
                  "
                >

                  <X />

                </button>

              </div>


              <div className="mt-8 space-y-6">

                {/* FILE INPUT */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                    "
                  >
                    Images
                  </label>


                  <input
                    id="add-gallery-file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />


                  <label
                    htmlFor="add-gallery-file-input"
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-dashed
                      border-primary/30
                      px-4
                      py-4
                      text-sm
                      font-semibold
                      text-primary
                      transition
                      hover:border-primary
                      hover:bg-primary/5
                    "
                  >

                    <Plus size={18} />

                    {files.length > 0
                      ? "Add More Images"
                      : "Select Images"}

                  </label>


                  <p className="mt-2 text-xs text-muted-foreground">
                    Select one or multiple images.
                  </p>

                </div>


                {/* SELECTED NEW IMAGES */}

                {files.length > 0 && (

                  <div>

                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <p className="text-sm font-semibold">
                        New Images
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {files.length} selected
                      </p>

                    </div>


                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-3
                        md:grid-cols-4
                      "
                    >

                      {filePreviews.map(
                        (url, index) => (

                          <div
                            key={`${url}-${index}`}
                            className="
                              group
                              relative
                              overflow-hidden
                              rounded-xl
                              border
                              border-border
                            "
                          >

                            <img
                              src={url}
                              alt={
                                files[index]?.name ||
                                "Selected image"
                              }
                              className="
                                h-28
                                w-full
                                object-cover
                              "
                            />


                            <button
                              type="button"
                              onClick={() =>
                                removeSelectedFile(
                                  index
                                )
                              }
                              className="
                                absolute
                                right-2
                                top-2
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-black/70
                                text-white
                                opacity-0
                                transition
                                group-hover:opacity-100
                              "
                            >

                              <X size={14} />

                            </button>


                            <div
                              className="
                                absolute
                                bottom-0
                                left-0
                                right-0
                                truncate
                                bg-black/60
                                px-2
                                py-1.5
                                text-[10px]
                                text-white
                              "
                            >
                              {files[index]?.name}
                            </div>

                          </div>

                        )
                      )}

                    </div>


                    {/* ADD MORE */}

                    <label
                      htmlFor="add-gallery-file-input"
                      className="
                        mt-4
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-dashed
                        border-primary/30
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-primary
                        transition
                        hover:border-primary
                        hover:bg-primary/5
                      "
                    >

                      <Plus size={18} />

                      Add More Images

                    </label>

                  </div>

                )}


                {/* BUTTONS */}

                <div
                  className="
                    flex
                    justify-end
                    gap-3
                    pt-2
                  "
                >

                  <Button
                    variant="secondary"
                    onClick={resetAddImages}
                    disabled={loading}
                  >
                    Cancel
                  </Button>


                  <Button
                    onClick={handleAddImages}
                    disabled={
                      loading ||
                      files.length === 0
                    }
                  >

                    {loading
                      ? "Uploading..."
                      : "Add Images"}

                  </Button>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ===================================================
            GALLERY GRID
        =================================================== */}

        <div
          className="
            mt-10
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {filteredGalleries.length === 0 ? (

            <div
              className="
                col-span-full
                rounded-3xl
                border
                border-border
                bg-card
                py-20
                text-center
              "
            >

              <ImageIcon
                size={70}
                className="
                  mx-auto
                  text-muted-foreground
                "
              />

              <h2 className="mt-5 text-2xl font-bold">
                No Galleries Found
              </h2>

              <p className="mt-2 text-muted-foreground">
                Create your first gallery.
              </p>

            </div>

          ) : (

            filteredGalleries.map(
              (gallery) => {

                const coverImage =
                  gallery.images?.[0];

                return (

                  <div
                    key={gallery.id}
                    className="
                      group
                      overflow-hidden
                      rounded-3xl
                      border
                      border-border
                      bg-card
                      shadow-md
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >

                    {/* =================================================
                        COVER IMAGE
                    ================================================= */}

                    <div
                      className="
                        relative
                        overflow-hidden
                      "
                    >

                      {coverImage ? (

                        <img
                          src={coverImage.file}
                          alt={gallery.name}
                          className="
                            h-64
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-64
                            items-center
                            justify-center
                            bg-muted
                          "
                        >

                          <ImageIcon
                            size={50}
                            className="
                              text-muted-foreground
                            "
                          />

                        </div>

                      )}


                      {/* IMAGE COUNT */}

                      <div
                        className="
                          absolute
                          left-4
                          top-4
                          flex
                          items-center
                          gap-1.5
                          rounded-full
                          bg-black/65
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-white
                          backdrop-blur-sm
                        "
                      >

                        <Images size={14} />

                        {gallery.images.length} image
                        {gallery.images.length !== 1
                          ? "s"
                          : ""}

                      </div>


                      {/* =================================================
                          HOVER ACTIONS
                      ================================================= */}

                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-end
                          bg-gradient-to-t
                          from-black/75
                          via-black/10
                          to-transparent
                          opacity-0
                          transition
                          duration-300
                          group-hover:opacity-100
                        "
                      >

                        <div
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                            gap-2
                            p-4
                          "
                        >

                          {/* PREVIEW */}

                          <Button
                            variant="secondary"
                            onClick={() =>
                              openPreview(
                                gallery
                              )
                            }
                          >
                            Preview
                          </Button>


                          {/* ADD IMAGES */}

                          <Button
                            onClick={() =>
                              openAddImages(
                                gallery
                              )
                            }
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <Plus size={16} />

                            Add Images

                          </Button>


                          {/* DELETE */}

                          <Button
                            onClick={() =>
                              openDelete(
                                gallery
                              )
                            }
                            className="
                              bg-red-600
                              hover:bg-red-700
                            "
                          >

                            <Trash2 size={18} />

                          </Button>

                        </div>

                      </div>

                    </div>


                    {/* =================================================
                        GALLERY INFO
                    ================================================= */}

                    <div className="p-5">

                      <h2
                        className="
                          text-xl
                          font-semibold
                        "
                      >
                        {gallery.name}
                      </h2>


                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            gallery.created_at
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {gallery.images.length} photo
                          {gallery.images.length !== 1
                            ? "s"
                            : ""}
                        </p>

                      </div>


                      {/* =================================================
                          ALWAYS VISIBLE ADD MORE
                      ================================================= */}

                      <button
                        type="button"
                        onClick={() =>
                          openAddImages(
                            gallery
                          )
                        }
                        className="
                          mt-4
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-primary/20
                          px-4
                          py-2.5
                          text-sm
                          font-semibold
                          text-primary
                          transition
                          hover:border-primary
                          hover:bg-primary/5
                        "
                      >

                        <Plus size={17} />

                        Add More Images

                      </button>

                    </div>

                  </div>

                );
              }
            )

          )}

        </div>


        {/* ===================================================
            PREVIEW MODAL
        =================================================== */}

        {preview && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/85
              p-5
              backdrop-blur-sm
            "
          >

            <div
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-6xl
                overflow-y-auto
                rounded-3xl
                bg-black/30
                p-5
              "
            >

              {/* CLOSE */}

              <button
                type="button"
                onClick={closePreview}
                className="
                  sticky
                  right-0
                  top-0
                  z-10
                  ml-auto
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-black
                  shadow-lg
                "
              >

                <X size={20} />

              </button>


              {/* TITLE */}

              <div className="mb-6 text-center">

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-white
                  "
                >
                  {preview.name}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-white/60
                  "
                >
                  {preview.images.length} image
                  {preview.images.length !== 1
                    ? "s"
                    : ""}
                </p>

              </div>


              {/* IMAGES */}

              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {preview.images.map(
                  (image) => (

                    <div
                      key={image.id}
                      className="
                        overflow-hidden
                        rounded-2xl
                        bg-black
                      "
                    >

                      <img
                        src={image.file}
                        alt={preview.name}
                        className="
                          h-64
                          w-full
                          object-cover
                        "
                      />

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        )}


        {/* ===================================================
            DELETE MODAL
        =================================================== */}

        {showDelete &&
          selectedGallery && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              p-5
              backdrop-blur-sm
            "
          >

            <div
              className="
                w-full
                max-w-md
                rounded-3xl
                bg-card
                p-8
              "
            >

              <h2 className="text-3xl font-bold">
                Delete Gallery?
              </h2>


              <p className="mt-3 text-muted-foreground">

                Are you sure you want to delete{" "}

                <span
                  className="
                    font-semibold
                    text-foreground
                  "
                >
                  "{selectedGallery.name}"
                </span>

                ?

              </p>


              <p
                className="
                  mt-2
                  text-sm
                  text-red-500
                "
              >

                This will delete all{" "}

                {selectedGallery.images.length}{" "}

                image
                {selectedGallery.images.length !== 1
                  ? "s"
                  : ""}{" "}

                from this gallery.

              </p>


              <div
                className="
                  mt-8
                  flex
                  justify-end
                  gap-3
                "
              >

                <Button
                  variant="secondary"
                  onClick={closeDelete}
                  disabled={loading}
                >
                  Cancel
                </Button>


                <Button
                  onClick={handleDelete}
                  disabled={loading}
                  className="
                    bg-red-600
                    hover:bg-red-700
                  "
                >

                  {loading
                    ? "Deleting..."
                    : "Delete Gallery"}

                </Button>

              </div>

            </div>

          </div>

        )}

      </Container>

    </section>
  );
};

export default ManageGallery;