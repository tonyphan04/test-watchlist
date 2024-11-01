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

    const {data: watches, error} = await supabase.from("watches").select("*").eq("user_id", user.id).order("created_date", {ascending: false}).is("important", true);

    if (error){
        console.log('Error fetching watches')
    }
    
    return(
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <Header />
            <div className="container mx-auto p-6 sm:p-12">
                <h1 className="text-xl text-white mb-2">Important tasks</h1>
                <div className="mt-6">
                    {watches.map((watch) => (
                        <div key={watch.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                            <h2 className="text-xl text-white mb-2">{watch.brand} - {watch.model}</h2>
                            <h3 className="text-xl text-white mb-2"> {watch.created_at}</h3>
                            <div className="flex space-x-2">
                                <form action={deleteWatch}>
                                <input type="hidden" name="id" value={watch.id} />
                                <button 
                                    type="submit"
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                                </form>
                                <EditWatch watch={watch} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}