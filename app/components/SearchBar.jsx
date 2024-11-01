'use client'

import { useState } from 'react'
import { updateWatch } from '../server-actions/updateWatch'

export default function SearchWatch({ watch }) {

    const [formData, setFormData] = useState({
        search: watch.search|| "",
    });

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    return (
        <div>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
                <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
                    <span className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right" >&times;</span>
                    <form action={updateWatch} className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="brand" className="block text-gray-300 mb-2">Brand</label>
                            <input 
                                type="text" 
                                id="search"
                                name="search" 
                                value={formData.search} 
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500" 
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Search
                        </button>
                    </form>
                </div>
            </div>    
        </div>      
    )
}