import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/inertia-react';
import React, { useState, useEffect } from 'react';

export default function Dashboard(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        Inertia.post('/news', data)
        setTitle('')
        setDescription('')
        setCategory('')
        setIsNotif(true)
    }

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get('/news')
        }
        // console.log('props', props)
        return
    }, [])

    const promptDelete = () => {
        if (window.confirm("Are you sure you want to delete this News?")) {
            Inertia.delete(`/news/delete`)
        }
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My News</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isNotif && <div className="alert alert-success shadow-lg mb-4">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{props.flash.message}</span>
                        </div>
                    </div>
                    }
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-center items-center card">
                                <h2 className="card-title">FORM NEWS</h2>
                                <input type="text" placeholder="Title" className="m-2 input input-bordered input-primary w-full" onChange={(title) => setTitle(title.target.value)} value={title} />
                                <input type="text" placeholder="Description" className="m-2 input input-bordered input-primary w-full" onChange={(description) => setDescription(description.target.value)} value={description} />
                                <input type="text" placeholder="Category" className="m-2 input input-bordered input-primary w-full" onChange={(category) => setCategory(category.target.value)} value={category} />
                                <button className='m-2 btn btn-primary' onClick={() => handleSubmit()}>Create</button>
                            </div>
                        </div>
                    </div>
                    {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                        return (
                            <div key={i} className="card w-full bg-base-100 shadow-xl mt-4">
                                <div className="card-body text-black">
                                    <h2 className="card-title">
                                        {news.title}
                                    </h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">{news.category}</div>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-accent badge-outline">
                                            <Link href={route('edit.news')} method="get" data={{ id: news.id }} as="button">
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-secondary badge-outline">
                                            <Link href={route('delete.news')} method="post" data={{ id: news.id }} as="button" onClick={() => promptDelete()}>
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) :
                        <div className="alert alert-info shadow-lg mt-4 shadow-xl">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>You don't have any news yet.</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
