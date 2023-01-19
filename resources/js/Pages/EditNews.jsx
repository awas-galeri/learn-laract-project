import React, { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,title, description, category
        }
        Inertia.post('/news/update', data)
        setTitle('')
        setDescription('')
        setCategory('')
        setIsNotif(true)
    }
    // console.log('props: ', props);
    return (
        <div className="min-h-screen bg-slate-50 text-white">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg mt-5">
                <div className="p-6 text-gray-900">
                    <div className="flex justify-center items-center card">
                        <h2 className="card-title">EDIT NEWS</h2>
                        <input type="text" placeholder="Title" className="m-2 input input-bordered input-primary w-full" onChange={(title) => setTitle(title.target.value)} defaultValue={props.myNews.title} />
                        <input type="text" placeholder="Description" className="m-2 input input-bordered input-primary w-full" onChange={(description) => setDescription(description.target.value)} defaultValue={props.myNews.description} />
                        <input type="text" placeholder="Category" className="m-2 input input-bordered input-primary w-full" onChange={(category) => setCategory(category.target.value)} defaultValue={props.myNews.category} />
                        <button className='m-2 btn btn-primary' onClick={() => handleSubmit()}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}