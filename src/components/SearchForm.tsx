'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = `brand=${brand}&model=${model}&year=${year}`;
        router.push(`/results?${query}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md mx-auto text-left"
        >
            <div>
                <label className="block mb-1 font-medium">Marque</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Modèle</label>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Année</label>
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
            </div>
            <button type="submit" className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark">
                Rechercher
            </button>
        </form>
    );
}
