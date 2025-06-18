export default function BatteryCard({ battery }) {
    return (
        <div className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2">{battery.name}</h2>
            <p className="text-gray-700 mb-1">Prix : {battery.price} MAD</p>
            <p className="text-gray-700 mb-4">Compatibilité : {battery.compatibility.join(', ')}</p>
            <a
                href={`tel:${battery.phone}`}
                className="inline-block bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark"
            >
                Commander par téléphone
            </a>
        </div>
    );
}
