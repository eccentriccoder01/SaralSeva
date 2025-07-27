import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleScheme = () => {
    const { id } = useParams();
    const [scheme, setScheme] = useState({});
    
    useEffect(() => {
        const getScheme = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/schemes/single_scheme/${id}`);
                setScheme(res.data.scheme);
            } catch (error) { console.error("Failed to fetch scheme", error); }
        };
        getScheme();
    }, [id]);

    const handleClick = () => {
        if (scheme.scheme_brochure) window.open(scheme.scheme_brochure, '_blank');
    };
    
  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-orange-900 jost">{scheme.scheme_name}</h1>
        <p className="mt-2 text-lg font-semibold text-gray-500 uppercase">{scheme.scheme_dept}</p>

        <section className="mt-12">
            <h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Details</h2>
            <p className="mt-4 text-gray-600">Scheme Code: <span className="font-semibold text-stone-800">{scheme.scheme_code}</span></p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">{scheme.scheme_details}</p>
        </section>

        <section className="mt-12"><h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Benefits</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700">
                {scheme.scheme_benefits?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </section>

        <section className="mt-12"><h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Eligibility</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700">
                {scheme.scheme_eligibility?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </section>

        <section className="mt-12"><h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Documents Required</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700">
                {scheme.scheme_documents_required?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </section>

        <section className="mt-12"><h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Sources and References</h2>
            <button onClick={handleClick} className="flex items-center gap-2 mt-4 text-lg font-semibold text-orange-700 transition-transform hover:scale-105">
                View Guidelines <ExternalLink className="hover:text-amber-600" />
            </button>
        </section>
  </div>
  )
}

export default SingleScheme;