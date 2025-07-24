
import { GoogleGenAI } from "@google/genai";
import { Delivery, DeliveryStatus } from '../types';

export const analyzeDelivery = async (deliveryData: Omit<Delivery, 'id'>): Promise<string> => {
  const apiKey = process.env.API_KEY;

  // Si la API key no está disponible, se omite el análisis y se devuelve un mensaje por defecto.
  // Esto hace que la integración con Gemini sea opcional.
  if (!apiKey) {
    console.log("API Key de Gemini no encontrada. Saltando análisis y usando mensaje por defecto.");
    return "✅ Datos registrados correctamente.";
  }

  try {
    // Se inicializa el cliente solo si la clave existe y es necesario.
    const ai = new GoogleGenAI({ apiKey });
    const { zonal, sku, quantity, status, invoice } = deliveryData;

    const prompt = `
    Actúa como un asistente de logística amigable y profesional para una empresa de distribución.
    Tu tarea es generar un mensaje de confirmación corto, positivo y útil para el operario que acaba de registrar una entrega.
    El mensaje debe ser solo una frase en texto plano, sin markdown, saltos de línea ni formato especial.

    Aquí están los datos de la entrega registrada:
    - Zonal: ${zonal}
    - SKU: ${sku || 'N/A'}
    - Diferencia: ${quantity}
    - Estado: ${status}
    - Factura SAP: ${invoice}

    Usa las siguientes directrices para tu respuesta:
    1.  Si el estado es "Completo", felicita al operario por el buen trabajo. No menciones SKU o Diferencia.
        Ejemplo: "✅ ¡Excelente! Entrega completa para la zonal ${zonal} registrada correctamente."
    2.  Si el estado es "Faltante", agradece por notificar la discrepancia, mencionando la cantidad faltante (usa el valor absoluto de la diferencia).
        Ejemplo: "✅ Registro guardado. Se ha notificado un faltante de ${Math.abs(quantity)} unidades del SKU ${sku} en la zonal ${zonal}, ¡gracias por tu atención!"
    3.  Si el estado es "Sobrante", reconoce el registro y la atención al detalle, mencionando la cantidad sobrante.
        Ejemplo: "✅ OK. Se registró un sobrante de ${quantity} unidades del SKU ${sku} en la zonal ${zonal}. Gracias por verificar."
    
    Genera ahora el mensaje de confirmación para los datos proporcionados.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });
    
    const text = response.text;

    if (!text) {
        return "✅ Datos registrados correctamente.";
    }

    return text.trim();
  } catch (error) {
    console.error("Error al llamar a la API de Gemini:", error);
    // Proporciona un mensaje de respaldo elegante en caso de error en la API.
    return "✅ Datos registrados correctamente.";
  }
};
