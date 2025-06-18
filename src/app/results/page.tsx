'use client';

import { useSearchParams } from 'next/navigation';
import batteries from '@/data/batteries.json';
import BatteryCard from '@/components/BatteryCard';

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');
    const year = searchParams.get('year');

    const results = batteries.filter((battery) =>
        battery.compatibility.includes(brand?.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brand">Batteries compatibles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {results.length > 0 ? (
                    results.map((battery) => (
                        <BatteryCard key={battery.id} battery={battery} />
                    ))
                ) : (
                    <p>Aucune batterie compatible trouvée.</p>
                )}
            </div>
        </div>
    );
}
