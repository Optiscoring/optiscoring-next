// pages/index.js
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/generarScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        alert('❌ No se pudo generar el informe.');
      }
    } catch (err) {
      console.error('❌ Error en la solicitud:', err);
      alert('⚠️ Error al procesar la solicitud.');
    }
  };

  return (
    <>
      <Head>
        <title>Optiscoring - Tu score financiero real</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="bg-gradient-to-br from-blue-50 via-white to-gray-100 font-sans text-gray-800 min-h-screen">
        <header className="px-6 py-6 flex justify-start items-start">
          <img src="/logo.svg.png" alt="OptiScoring Logo" className="h-40 w-auto" />
        </header>

        <section className="px-6 py-4 text-center max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Conoce tu <span className="text-blue-700">score financiero</span> real
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Te mostramos tu puntuación crediticia real de forma transparente, útil y certificable.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <input
              type="text"
              required
              placeholder="Nombre y Apellido"
              className="p-3 rounded-xl shadow border w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Introduce tu email"
              className="p-3 rounded-xl shadow border w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-md">
              Ver scoring
            </button>
          </form>
        </section>

        <section className="bg-white py-12 px-6">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { title: '🔍 Consulta tu score real', text: 'Basado en tus datos bancarios, deudas y pagos. 100% legal, seguro y transparente.' },
              { title: '📁 Informes certificables', text: 'Descarga informes firmados digitalmente, ideales para bancos, alquileres o solicitudes.' },
              { title: '💡 Mejora tu salud financiera', text: 'Recibe consejos personalizados y toma el control total de tu puntuación financiera.' },
            ].map(({ title, text }, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-12 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">¿Por qué nunca has visto tu score?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              {[
                ['🏦 Los bancos lo usan', 'Evalúan tu riesgo antes de darte un préstamo.'],
                ['💳 Las fintech lo usan', 'Para ofrecerte tarjetas, créditos o productos personalizados.'],
                ['🏠 Los arrendadores lo usan', 'Deciden si te alquilan una vivienda basados en tu score.'],
                ['🤷 Pero tú no podías…', 'Hasta ahora. Optiscoring te da acceso a tu salud financiera real.'],
              ].map(([title, text], i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-700">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-lg text-gray-800 max-w-3xl mx-auto">
              Optiscoring nace para devolverte el control, la transparencia y el poder sobre tu score financiero.
            </p>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-500 py-8">
          © {new Date().getFullYear()} Optiscoring — Todos los derechos reservados.
        </footer>
      </main>
    </>
  );
}

