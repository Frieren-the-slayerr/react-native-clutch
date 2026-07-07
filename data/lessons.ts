import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // --- English: Getting Started ---
  {
    id: "lesson-en-1-1",
    unitId: "unit-en-1",
    languageCode: "en",
    title: "Your First Job Post",
    order: 1,
    xp: 10,
    customerRequest: {
      customerName: "Maria Chen",
      vehicle: "2018 Honda Civic",
      issue: "Car makes a squealing noise when I brake.",
      urgency: "medium",
    },
    jobBoardPosting: {
      id: "job-en-1-1",
      title: "Squealing brakes — Honda Civic",
      distanceMiles: 2.4,
      payoutEstimate: "$80–$120",
      status: "open",
    },
    partsNeeded: [{ name: "Front brake pads", quantity: 1, estimatedCost: "$45" }],
    chat: [
      { sender: "customer", message: "Hi! My brakes have been squealing for about a week." },
      { sender: "mechanic", message: "Got it. I can take a look — does it squeal every time you brake, or only sometimes?" },
      { sender: "customer", message: "Pretty much every time now." },
    ],
    diagnosticSheet: {
      symptoms: ["High-pitched squeal when braking", "No squeal when car is stationary"],
      findings: ["Front brake pads worn to 2mm", "Wear indicator making contact with rotor"],
      recommendedFix: "Replace front brake pads.",
    },
    location: { label: "Customer's driveway", city: "Austin", state: "TX" },
    aiPrompts: [
      { prompt: "Your brake pads are worn down, which is why you're hearing that squeal — it's a built-in warning sound." },
      { prompt: "We recommend replacing the front pads now to avoid rotor damage, which would be a bigger repair." },
    ],
  },
  {
    id: "lesson-en-1-2",
    unitId: "unit-en-1",
    languageCode: "en",
    title: "Reading the Job Board",
    order: 2,
    xp: 10,
    customerRequest: {
      customerName: "Devon Blake",
      vehicle: "2020 Toyota RAV4",
      issue: "Car won't start, just clicks when I turn the key.",
      urgency: "high",
    },
    jobBoardPosting: {
      id: "job-en-1-2",
      title: "No-start / clicking noise — Toyota RAV4",
      distanceMiles: 5.1,
      payoutEstimate: "$60–$100",
      status: "open",
    },
    partsNeeded: [{ name: "12V car battery", quantity: 1, estimatedCost: "$130" }],
    chat: [
      { sender: "customer", message: "My car won't start, it just makes a clicking sound." },
      { sender: "mechanic", message: "That's usually the battery or a bad connection. I'll bring a tester." },
    ],
    diagnosticSheet: {
      symptoms: ["Rapid clicking when key is turned", "Dashboard lights dim"],
      findings: ["Battery voltage reads 9.8V under load (should be 12.6V+)", "Terminals free of corrosion"],
      recommendedFix: "Replace battery.",
    },
    location: { label: "Office parking garage", city: "Austin", state: "TX" },
    aiPrompts: [
      { prompt: "The clicking sound means your starter isn't getting enough power — usually a sign the battery has died." },
      { prompt: "Good news: it's a straightforward battery swap, not the starter or alternator." },
    ],
  },

  // --- English: Engine Basics ---
  {
    id: "lesson-en-2-1",
    unitId: "unit-en-2",
    languageCode: "en",
    title: "Check Engine Light 101",
    order: 1,
    xp: 15,
    customerRequest: {
      customerName: "Priya Nair",
      vehicle: "2016 Ford Escape",
      issue: "Check engine light came on and the car feels a little rough at idle.",
      urgency: "low",
    },
    jobBoardPosting: {
      id: "job-en-2-1",
      title: "Check engine light + rough idle — Ford Escape",
      distanceMiles: 3.7,
      payoutEstimate: "$70–$150",
      status: "open",
    },
    partsNeeded: [{ name: "Ignition coil", quantity: 1, estimatedCost: "$55" }],
    chat: [
      { sender: "customer", message: "The check engine light turned on yesterday, and the car idles kind of rough." },
      { sender: "ai", message: "Thanks for the details — I'll have your mechanic pull the diagnostic codes first." },
    ],
    diagnosticSheet: {
      symptoms: ["Check engine light on (steady, not flashing)", "Rough idle", "Slight power loss on acceleration"],
      findings: ["OBD-II scan shows misfire code on cylinder 3", "Ignition coil resistance out of spec"],
      recommendedFix: "Replace ignition coil on cylinder 3, clear codes, and re-test.",
    },
    location: { label: "Home garage", city: "Round Rock", state: "TX" },
    aiPrompts: [
      { prompt: "A steady check engine light usually means it's safe to keep driving carefully, unlike a flashing light." },
      { prompt: "The scan found a misfire on one cylinder, caused by a worn ignition coil — a common, inexpensive fix." },
    ],
  },
  {
    id: "lesson-en-2-2",
    unitId: "unit-en-2",
    languageCode: "en",
    title: "Overheating Engines",
    order: 2,
    xp: 15,
    customerRequest: {
      customerName: "Sam Osei",
      vehicle: "2015 Nissan Altima",
      issue: "Temperature gauge shot up and I saw steam from under the hood.",
      urgency: "high",
    },
    jobBoardPosting: {
      id: "job-en-2-2",
      title: "Overheating / possible coolant leak — Nissan Altima",
      distanceMiles: 1.2,
      payoutEstimate: "$90–$200",
      status: "open",
    },
    partsNeeded: [
      { name: "Radiator hose", quantity: 1, estimatedCost: "$35" },
      { name: "Coolant (1 gallon)", quantity: 1, estimatedCost: "$18" },
    ],
    chat: [
      { sender: "customer", message: "I pulled over as soon as I saw steam, is that ok?" },
      { sender: "mechanic", message: "Yes, exactly right. Don't open the radiator cap, I'll check it once I'm there." },
    ],
    diagnosticSheet: {
      symptoms: ["Temperature gauge in red zone", "Steam from engine bay", "Coolant puddle under car"],
      findings: ["Lower radiator hose has a visible crack", "Coolant reservoir empty"],
      recommendedFix: "Replace radiator hose, refill coolant, and pressure-test the system.",
    },
    location: { label: "Shoulder of Highway 183", city: "Austin", state: "TX" },
    aiPrompts: [
      { prompt: "Stopping right away was the correct call — driving while overheated can damage the engine badly." },
      { prompt: "There's a crack in one of the coolant hoses, which is why fluid leaked out and the engine overheated." },
    ],
  },

  // --- Spanish: Primeros Pasos ---
  {
    id: "lesson-es-1-1",
    unitId: "unit-es-1",
    languageCode: "es",
    title: "Tu Primera Publicación de Trabajo",
    order: 1,
    xp: 10,
    customerRequest: {
      customerName: "Maria Chen",
      vehicle: "Honda Civic 2018",
      issue: "El auto hace un chillido al frenar.",
      urgency: "medium",
    },
    jobBoardPosting: {
      id: "job-es-1-1",
      title: "Frenos chillones — Honda Civic",
      distanceMiles: 2.4,
      payoutEstimate: "$80–$120",
      status: "open",
    },
    partsNeeded: [{ name: "Pastillas de freno delanteras", quantity: 1, estimatedCost: "$45" }],
    chat: [
      { sender: "customer", message: "¡Hola! Mis frenos han estado chillando desde hace una semana." },
      { sender: "mechanic", message: "Entendido. Puedo revisarlo — ¿chilla cada vez que frenas, o solo a veces?" },
    ],
    diagnosticSheet: {
      symptoms: ["Chillido agudo al frenar", "No hay ruido con el auto detenido"],
      findings: ["Pastillas delanteras desgastadas a 2mm", "Indicador de desgaste tocando el rotor"],
      recommendedFix: "Reemplazar las pastillas de freno delanteras.",
    },
    location: { label: "Entrada de la casa del cliente", city: "Austin", state: "TX" },
    aiPrompts: [
      { prompt: "Tus pastillas de freno están desgastadas, por eso escuchas ese chillido — es una alerta incorporada." },
      { prompt: "Te recomendamos cambiar las pastillas delanteras ahora para evitar dañar los rotores." },
    ],
  },
  {
    id: "lesson-es-1-2",
    unitId: "unit-es-1",
    languageCode: "es",
    title: "Cómo Leer el Tablero de Trabajos",
    order: 2,
    xp: 10,
    customerRequest: {
      customerName: "Devon Blake",
      vehicle: "Toyota RAV4 2020",
      issue: "El auto no enciende, solo hace clic al girar la llave.",
      urgency: "high",
    },
    jobBoardPosting: {
      id: "job-es-1-2",
      title: "No enciende / ruido de clic — Toyota RAV4",
      distanceMiles: 5.1,
      payoutEstimate: "$60–$100",
      status: "open",
    },
    partsNeeded: [{ name: "Batería de auto 12V", quantity: 1, estimatedCost: "$130" }],
    chat: [
      { sender: "customer", message: "Mi auto no enciende, solo hace un ruido de clic." },
      { sender: "mechanic", message: "Eso suele ser la batería o una mala conexión. Llevaré un probador." },
    ],
    diagnosticSheet: {
      symptoms: ["Clic rápido al girar la llave", "Luces del tablero tenues"],
      findings: ["Voltaje de batería 9.8V bajo carga (debería ser 12.6V+)", "Terminales sin corrosión"],
      recommendedFix: "Reemplazar la batería.",
    },
    location: { label: "Estacionamiento de la oficina", city: "Austin", state: "TX" },
    aiPrompts: [
      { prompt: "El ruido de clic significa que el motor de arranque no recibe suficiente energía — normalmente indica batería agotada." },
      { prompt: "Buenas noticias: es un simple cambio de batería, no el motor de arranque ni el alternador." },
    ],
  },

  // --- Spanish: Conceptos Básicos del Motor ---
  {
    id: "lesson-es-2-1",
    unitId: "unit-es-2",
    languageCode: "es",
    title: "Luz de Check Engine 101",
    order: 1,
    xp: 15,
    customerRequest: {
      customerName: "Priya Nair",
      vehicle: "Ford Escape 2016",
      issue: "Se encendió la luz de check engine y el auto se siente inestable en ralentí.",
      urgency: "low",
    },
    jobBoardPosting: {
      id: "job-es-2-1",
      title: "Luz de check engine + ralentí inestable — Ford Escape",
      distanceMiles: 3.7,
      payoutEstimate: "$70–$150",
      status: "open",
    },
    partsNeeded: [{ name: "Bobina de encendido", quantity: 1, estimatedCost: "$55" }],
    chat: [
      { sender: "customer", message: "La luz de check engine se encendió ayer, y el auto se siente inestable en ralentí." },
      { sender: "ai", message: "Gracias por los detalles — le pediré a tu mecánico que revise los códigos de diagnóstico primero." },
    ],
    diagnosticSheet: {
      symptoms: ["Luz de check engine encendida (fija, no parpadea)", "Ralentí inestable", "Ligera pérdida de potencia al acelerar"],
      findings: ["El escaneo OBD-II muestra un código de fallo de encendido en el cilindro 3", "Resistencia de la bobina fuera de rango"],
      recommendedFix: "Reemplazar la bobina de encendido del cilindro 3, borrar códigos y volver a probar.",
    },
    location: { label: "Garaje de la casa", city: "Round Rock", state: "TX" },
    aiPrompts: [
      { prompt: "Una luz de check engine fija generalmente significa que puedes seguir manejando con cuidado, a diferencia de una luz parpadeante." },
      { prompt: "El escaneo encontró una falla de encendido en un cilindro, causada por una bobina desgastada — una reparación común y económica." },
    ],
  },
  {
    id: "lesson-es-2-2",
    unitId: "unit-es-2",
    languageCode: "es",
    title: "Motores que se Sobrecalientan",
    order: 2,
    xp: 15,
    customerRequest: {
      customerName: "Sam Osei",
      vehicle: "Nissan Altima 2015",
      issue: "El indicador de temperatura subió y vi vapor saliendo del motor.",
      urgency: "high",
    },
    jobBoardPosting: {
      id: "job-es-2-2",
      title: "Sobrecalentamiento / posible fuga de refrigerante — Nissan Altima",
      distanceMiles: 1.2,
      payoutEstimate: "$90–$200",
      status: "open",
    },
    partsNeeded: [
      { name: "Manguera de radiador", quantity: 1, estimatedCost: "$35" },
      { name: "Refrigerante (1 galón)", quantity: 1, estimatedCost: "$18" },
    ],
    chat: [
      { sender: "customer", message: "Me detuve apenas vi el vapor, ¿está bien eso?" },
      { sender: "mechanic", message: "Sí, hiciste exactamente lo correcto. No abras la tapa del radiador, lo revisaré cuando llegue." },
    ],
    diagnosticSheet: {
      symptoms: ["Indicador de temperatura en zona roja", "Vapor saliendo del compartimento del motor", "Charco de refrigerante bajo el auto"],
      findings: ["La manguera inferior del radiador tiene una grieta visible", "Depósito de refrigerante vacío"],
      recommendedFix: "Reemplazar la manguera del radiador, rellenar refrigerante y probar la presión del sistema.",
    },
    location: { label: "Acotamiento de la autopista 183", city: "Austin", state: "TX" },
    aiPrompts: [
      { prompt: "Detenerte de inmediato fue la decisión correcta — seguir manejando sobrecalentado puede dañar gravemente el motor." },
      { prompt: "Hay una grieta en una de las mangueras de refrigerante, por eso se salió el líquido y el motor se sobrecalentó." },
    ],
  },
];
