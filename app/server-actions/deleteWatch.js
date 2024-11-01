"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteWatch(formData) {
  const watchId = formData.get("id");

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
  const { error } = await supabase.from("watches").delete().match({
    id: watchId,
    user_id: user.id,
  });
  if (error) {
    console.error("Error remove watch", error);
    return;
  }
  // if remove successfully, revalidate the watch-list page
  revalidatePath("/watch-list");

  return { message: "Watch removed successfully" };
}
