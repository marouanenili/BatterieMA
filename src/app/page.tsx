import SearchForm from '@/components/SearchForm';

export default function Home() {
    return (
        <div className="space-y-8 text-center">

            <section
                className="py-16 text-center text-white"
            >
                <h1 className="text-5xl font-extrabold mb-6">Batteries auto & moto à Casablanca</h1>
                <p className="text-lg max-w-2xl mx-auto text-gray-100">
                    Batterie.ma est le service N°1 de dépannage et remplacement de batteries auto et moto à Casablanca.
                    <br /><br />
                    Nous intervenons 7j/7 partout dans la région : à domicile, au bureau ou sur votre lieu de stationnement.
                    <br /><br />
                    Livraison, installation et recyclage de votre ancienne batterie inclus.
                </p>
            </section>


            <section>
                <SearchForm />
            </section>
        </div>

    );

}
