import WatchForm from "../components/WatchForm";
import EditWatch from "../components/EditWatch";
import { deleteWatch } from "../server-actions/deleteWatch";
import {cookies} from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Header from "../components/Header";
export default async function WatchList(){
    const cookieStore = await cookies();
    const supabase = await createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    const {data: watches, error} = await supabase.from("watches").select("*").eq("user_id", user.id).order("brand", {ascending: true});

    if (error){
        console.log('Error fetching watches')
    }
    
    return(
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <Header />
            <div className="container mx-auto p-6 sm:p-12">
                <div className="flex justify-between items-start">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Watch List</h1>
                    <form action="/auth/signout" method="post">
                        <button 
                            type="submit" 
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Sign out
                        </button>
                    </form>
                </div>
                <WatchForm />
                
            </div>
        </div>
    );
}