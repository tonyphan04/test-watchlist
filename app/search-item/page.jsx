'use client'

import WatchForm from "../components/WatchForm";
import EditWatch from "../components/EditWatch";
import { deleteWatch } from "../server-actions/deleteWatch";
import Header from "../components/Header";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function WatchList(){
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchStatus()
    }, []);

    const fetchStatus = async (id) => {
        const { data, error } = await supabase
          .from('watches')
          .select('important')
          .eq('id', id)
          .single();
    
        if (error) {
          console.error('Error fetching status:', error);
        } else {
          setStatus(data.status);
        }
      };
    
      const toggleStatus = async (id) => {
        const newStatus = !status;
        const { error } = await supabase
          .from('watches')
          .update({ important: newStatus })
          .eq('id', id);
    
        if (error) {
          console.error('Error updating status:', error);
        } else {
          setStatus(newStatus);
        }
        console.log(newStatus);
      };

    const handleSearch = async () => {
        let query = supabase.from('watches').select('*');
        if (search) {
            query = query.textSearch('brand', search);
        }
        
        const { data, error } = await query;
        console.log(data);  
        
        if (error) {
          console.error('Error fetching watches', error);
          return;
        } else{
            setData(data);
        }  
    };
    
    const handleChange = (e) => { setSearch(e.target.value) };
    return(
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <Header />
            <div className="container mx-auto p-6 sm:p-12">
                <h1 className="text-xl text-white mb-2">Item List</h1>
                <div className="mb-4">
                    <label htmlFor="search" className="block text-white mb-2">Model</label>
                    <input 
                        type="text"
                        id="search"
                        name="search"
                        value={search}
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    />
                    <button
                        type="button"
                        onClick={handleSearch} 
                        className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded"
                    >
                        Search
                    </button>
                </div>
                
                <div className="mt-6">
                    {data.map((watch) => (
                    <div key={watch.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl text-white mb-2">{watch.brand} - {watch.model}</h2>
                        <h3 className="text-xl text-white mb-2"> {watch.created_date} - {watch.created_time} - {watch.important === true ? 'True' : 'False'}</h3>
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
                            <button 
                                onClick={() => toggleStatus(watch.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                {watch.important === true ? "Marked as important" : "Mark as important"}
                            
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}