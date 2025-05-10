import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/generarScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("❌ No se pudo generar el informe.");
      }
    } catch (err) {
      console.error("❌ Error en la solicitud:", err);
      alert("⚠️ Error al procesar la solicitud.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 font-sans text-gray-800">
      <Head>
        <title>Optiscoring - Tu score financiero real</title>
        <meta name="description" content="Conoce tu score financiero real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header with Logo */}
      <header className="px-6 py-6 -mt-10 flex justify-start items-start">
        <img src="/logo.svg.png" alt="OptiScoring Logo" className="h-40 md:h-58 lg:h-76 w-auto" />
      </header>

      {/* Hero Section with Form */}
      <section className="px-6 py-4 md:py-6 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-2 mt-0">
          Conoce tu <span className="text-blue-700">score financiero</span> real
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          Te mostramos tu puntuación crediticia real de forma transparente, útil y certificable.
        </p>
        <form
          id="scoreForm"
          className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre y Apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="p-3 rounded-xl shadow border w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-xl shadow border w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-md"
          >
            Ver scoring
          </button>
        </form>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 text-center">
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🔍 Consulta tu score real</h3>
            <p className="text-gray-600">Basado en tus datos bancarios, deudas y pagos. 100% legal, seguro y transparente.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📁 Informes certificables</h3>
            <p className="text-gray-600">Descarga informes firmados digitalmente, ideales para bancos, alquileres o solicitudes.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">💡 Mejora tu salud financiera</h3>
            <p className="text-gray-600">Recibe consejos personalizados y toma el control total de tu puntuación financiera.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-50 py-12 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">¿Por qué nunca has visto tu score?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto text-left">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">🏦 Los bancos lo usan</h3>
              <p className="text-gray-700">Evalúan tu riesgo antes de darte un préstamo.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">💳 Las fintech lo usan</h3>
              <p className="text-gray-700">Para ofrecerte tarjetas, créditos o productos personalizados.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">🏠 Los arrendadores lo usan</h3>
              <p className="text-gray-700">Deciden si te alquilan una vivienda basados en tu score.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">🤷 Pero tú no podías…</h3>
              <p className="text-gray-700">Hasta ahora. Optiscoring te da acceso a tu salud financiera real.</p>
            </div>
          </div>

          <p className="mt-12 text-lg text-gray-800 max-w-3xl mx-auto">
            Optiscoring nace para devolverte el control, la transparencia y el poder sobre tu score financiero.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-8">
        © <script>document.write(new Date().getFullYear());</script> Optiscoring — Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
