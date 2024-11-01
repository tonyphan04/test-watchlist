"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateWatch(formData) {
  const id = formData.get("id");
  const model = formData.get("model");
  const brand = formData.get("brand");
  const reference_number = formData.get("reference_number");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getUser();
  const user = session?.user;

  if (!user) {
    console.error("User not authenticated");
    return;
  }
  // call database if user is authenticated
  const { data, error } = await supabase
    .from("watches")
    .update({
      model,
      brand,
      reference_number,
    })
    .match({
      id,
      user_id: user.id,
    });
  if (error) {
    console.error("Error update watch", error);
    return;
  }
  // if add successfully, revalidate the watch-list page
  revalidatePath("/watch-list");

  return { message: "Watch updated successfully" };
}
