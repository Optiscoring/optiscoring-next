// api/generarScore.js
import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

function generarScoreAleatorio() {
  let base = Math.floor(Math.random() * 300) + 550;
  return Math.max(300, Math.min(base, 850));
}

function getNivel(score) {
  if (score >= 750) return { texto: "Excelente", emoji: "✅" };
  if (score >= 650) return { texto: "Bueno", emoji: "🟡" };
  if (score >= 550) return { texto: "Regular", emoji: "⚠️" };
  return { texto: "Bajo", emoji: "❌" };
}

function generarIncidencia() {
  return Math.random() < 0.4
    ? {
        tiene: true,
        motivo: "Impago detectado",
        importe: `${Math.floor(Math.random() * 3000) + 200} €`,
        estado: "Activo",
        fecha: "2024-12-01"
      }
    : { tiene: false };
}

export async function POST(req) {
  const { nombre = "Usuario", email = "demo@correo.com" } = await req.json();
  const dni = `12345678${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  const fecha = new Date().toLocaleDateString("es-ES");

  const score = generarScoreAleatorio();
  const nivel = getNivel(score);

  const asnef = generarIncidencia();
  const seguridadSocial = generarIncidencia();
  const hacienda = generarIncidencia();

  const doc = new PDFDocument({ margin: 50 });
  const stream = new Readable({ read() {} });
  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    stream.push(pdfData);
    stream.push(null);
  });

  // ENCABEZADO
  doc.fontSize(20).font("Helvetica-Bold").text("Informe Financiero - Optiscoring", { align: "center" });
  doc.moveDown(0.5).fontSize(12).text(`Generado el: ${fecha}`, { align: "center" });
  doc.moveDown();

  // DATOS
  doc.font("Helvetica-Bold").text("Datos del usuario", { underline: true });
  doc.font("Helvetica").text(`Nombre: ${nombre}`);
  doc.text(`Email: ${email}`);
  doc.text(`DNI: ${dni}`);
  doc.moveDown();

  // RESUMEN RÁPIDO
  doc.font("Helvetica-Bold").text("Resumen rápido", { underline: true });
  doc.font("Helvetica")
    .text(`Score Optiscoring: ${score} (${nivel.texto}) ${nivel.emoji}`)
    .text(`ASNEF: ${asnef.tiene ? "Sí ❌" : "Sin incidencias ✅"}`)
    .text(`Seguridad Social: ${seguridadSocial.tiene ? "Sí ❌" : "Sin incidencias ✅"}`)
    .text(`Hacienda: ${hacienda.tiene ? "Sí ❌" : "Sin incidencias ✅"}`);
  doc.moveDown();

  // DETALLES
  doc.font("Helvetica-Bold").text("Detalle de incidencias", { underline: true });
  const detalles = [
    { entidad: "ASNEF", data: asnef },
    { entidad: "Seguridad Social", data: seguridadSocial },
    { entidad: "Hacienda", data: hacienda }
  ];

  detalles.forEach(({ entidad, data }) => {
    doc.moveDown(0.5).font("Helvetica-Bold").text(`${entidad}:`);
    if (data.tiene) {
      doc.font("Helvetica")
        .text(`Motivo: ${data.motivo}`)
        .text(`Importe: ${data.importe}`)
        .text(`Estado: ${data.estado}`)
        .text(`Fecha alta: ${data.fecha}`);
    } else {
      doc.font("Helvetica").text("Sin incidencias.");
    }
  });

  doc.end();

  const pdfBuffer = await new Promise(resolve => {
    const chunks = [];
    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=informe.pdf"
    }
  });
}