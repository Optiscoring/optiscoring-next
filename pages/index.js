import Head from 'next/head';

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const email = e.target.email.value;

    try {
      const res = await fetch('/api/generarScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      alert('Error al generar el informe');
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Optiscoring - Tu score financiero real</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-800">
        <header className="px-6 py-6 flex justify-start items-start">
          <img src="/logo.svg.png" alt="OptiScoring Logo" className="h-40 w-auto" />
        </header>

        <section className="px-6 py-4 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">
            Conoce tu <span className="text-blue-700">score financiero</span> real
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Te mostramos tu puntuación crediticia real de forma transparente, útil y certificable.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <input name="nombre" placeholder="Nombre y Apellido" required className="p-3 rounded-xl shadow border w-full sm:w-80" />
            <input name="email" type="email" placeholder="Introduce tu email" required className="p-3 rounded-xl shadow border w-full sm:w-80" />
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-md">
              Ver scoring
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
