"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addWatch(formData) {
  const model = formData.get("model");
  const brand = formData.get("brand");
  const reference_number = formData.get("reference_number");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User not authenticated");
    return;
  }
  // call database if user is authenticated
  const { data, error } = await supabase.from("watches").insert([
    {
      model,
      brand,
      reference_number,
      user_id: user.id,
    },
  ]);
  if (error) {
    console.error("Error adding watch", error);
    return;
  }
  // if add successfully, revalidate the watch-list page
  revalidatePath("/watch-list");

  return { message: "Watch added successfully" };
}
