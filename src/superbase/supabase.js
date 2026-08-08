import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

async function readData(table, col = "*") {
  const { data, error } = await supabase.from(table).select(col);
  if (error) throw new Error(error.message);
  return data;
}

async function writeData(table, storage, row) {
  let finalRow = { ...row };

  if (row.file instanceof File) {
    const fileName = `${Date.now()}-${row.file.name}`;

    const { data: uploadFile, error: uploadError } = await supabase.storage.from(storage).upload(fileName, row.file);
    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURL } = supabase.storage.from(storage).getPublicUrl(uploadFile.path);

    finalRow.file = publicURL.publicUrl;
  }
  

  const { data, error } = await supabase.from(table).insert(finalRow).select();

  if (error) throw new Error(error.message);

  return data;
}

async function updateData(table, storage, id, row) {
  console.log(row);
  
  let finalRow = { ...row };

  if (row.file instanceof File) {
    const fileName = `${Date.now()}-${row.file.name}`;

    const { data: uploadFile, error: uploadError } = await supabase.storage.from(storage).upload(fileName, row.file);
    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURL } = supabase.storage.from(storage).getPublicUrl(uploadFile.path);

    finalRow.file = publicURL.publicUrl;
  }

  const { data, error } = await supabase.from(table).update(finalRow).eq("id", id).select();
  if (error) throw new Error(error.message);

  return data;
}

async function deleteData(table, storage, id, fileURL) {
  if (fileURL) {
    const filePath = fileURL.split(`/${storage}/`)[1];

    const { error: storageError } = await supabase.storage.from(storage).remove([filePath]);
    if (storageError) throw new Error(storageError.message);
  }

  const { data, error } = await supabase.from(table).delete().eq("id", id).select();
  if (error) throw new Error(error.message);

  return data;
}

export { readData, writeData, updateData, deleteData };

export async function getDashboardData(setStats) {
  try {
    const [
  { count: notices },
  { count: events },
  { count: gallery },
  { count: teachers },
  { count: subjects },
  { count: categories },
] = await Promise.all([
  supabase
    .from("Imp_Notices")
    .select("*", { count: "exact", head: true }),

  supabase
    .from("Events")
    .select("*", { count: "exact", head: true }),

  supabase
    .from("Gallery")
    .select("*", { count: "exact", head: true }),

  supabase
    .from("Teachers")
    .select("*", { count: "exact", head: true }),

  supabase
    .from("Subjects")
    .select("*", { count: "exact", head: true }),

  supabase
    .from("Category")
    .select("*", { count: "exact", head: true }),
]);
   
   return {notices,events,gallery,teachers,subjects,categories}
  } catch (error) {
    console.log(error);
  }
}

export async function writeSubject(subjectData, categoryIds) {
  try {
    const { data: subject, error } = await supabase
      .from("Subjects")
      .insert(subjectData)
      .select()
      .single();

    if (error) throw error;

    const rows = categoryIds.map((categoryId) => ({
      subject_id: subject.id,
      category_id: categoryId,
    }));

    const { error: junctionError } = await supabase
      .from("category_subject")
      .insert(rows);

    if (junctionError) throw junctionError;

    return subject;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateSubject(id, subjectData, categoryIds) {
  try {
    const { error } = await supabase
      .from("Subjects")
      .update(subjectData)
      .eq("id", id);

    if (error) throw error;

    const { error: deleteError } = await supabase
      .from("category_subject")
      .delete()
      .eq("subject_id", id);

    if (deleteError) throw deleteError;

    const rows = categoryIds.map((categoryId) => ({
      subject_id: id,
      category_id: categoryId,
    }));

    const { error: junctionError } = await supabase
      .from("category_subject")
      .insert(rows);

    if (junctionError) throw junctionError;

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteSubject(id) {
  try {
    const { error: junctionError } = await supabase
      .from("category_subject")
      .delete()
      .eq("subject_id", id);

    if (junctionError) throw junctionError;

    const { error } = await supabase
      .from("Subjects")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function readSubjects() {
  try {
    const { data, error } = await supabase
      .from("Subjects")
      .select(`
        *,
         category_subject (
          Category (
            id,
            name
          )
        )
      `);
        console.log("data",data);
        
    if (error) throw error;

    return data.map((subject) => ({
      ...subject,
  
      
      
      categories: subject.Category.map(
        (item) => item.categories
      ),

      category_ids: subject.Category.map(
        (item) => item.categories.id
      ),
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// export async function createGallery(img){
//   try {
//     const name=Date.now();
//     const {data,error}=supabase.storage.from("Gallery").upload(name,img)
//     if (error) {
//       throw new Error(error.message);      
//     }
//   } catch (error) {
//     if (typeof error=="string") {
//       return error
//     }
//     return error.message
//   }
// }

// export async function readGallery(){
//   try{
//     const {data,error}=supabase.storage.from("Gallery").list()
//     if (error) {
//       throw new Error(error.message);      
//     }
//   } catch (error) {
//     if (typeof error=="string") {
//       return error
//     }
//     return error.message
//   }
// }

// export 