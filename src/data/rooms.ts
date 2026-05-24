// ── Room and problem data for the Escape Room Algebraico ──
import type { RoomData } from '../types';

export const ROOMS: RoomData[] = [
  // ─────────────────────────────────────────────
  // SALA 1 — Sustitución
  // System: 2y = x + 8  /  y = 2x + 10
  // Solution: x = -4, y = 2
  // ─────────────────────────────────────────────
  {
    id: 1,
    type: 'equation',
    title: { es: 'Sala 1 — Control Central', en: 'Room 1 — Control Central' },
    doorNumber: '01',
    narrative: {
      es: 'El panel de seguridad principal está bloqueado. Un sistema de ecuaciones protege la cerradura electrónica. Analiza la estructura antes de elegir tu método.',
      en: 'The main security panel is locked. A system of equations protects the electronic lock. Analyze the structure before choosing your method.',
    },
    badge: '🔑',
    badgeLabel: { es: 'Llave Alfa', en: 'Alpha Key' },
    latex: '\\begin{cases} 2y = x + 8 \\\\ y = 2x + 10 \\end{cases}',
    recommendedMethod: 'sustitucion',
    solution: { x: -4, y: 2 },
    varLabels: { x: 'x', y: 'y' },
    hints: [
      '🔍 Observa si alguna variable ya esta despejada. / Look for a variable that is already isolated.',
      '💡 La segunda ecuacion tiene y despejada: y = 2x + 10. / The second equation already isolates y: y = 2x + 10.',
      '📐 Sustituye y = 2x + 10 en 2y = x + 8: 2(2x + 10) = x + 8. / Substitute and solve for x.',
    ],
    methodFeedback: {
      sustitucion: {
        quality: 'best',
        message:
          '✅ Excelente eleccion: y ya esta despejada en la segunda ecuacion, asi que sustitucion es el camino mas corto. / Great choice: y is already isolated, so substitution is the shortest path.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Funciona, pero requiere mas pasos. / It works, but it takes more steps. Aqui sustitucion es mas directa porque y ya esta despejada. / Here substitution is more direct because y is already isolated.',
      },
      reduccion: {
        quality: 'wrong',
        message:
          '❌ En este sistema no hay coeficientes opuestos listos para reduccion. / This system has no ready opposite coefficients for elimination. Busca variable despejada y usa sustitucion. / Look for an isolated variable and use substitution.',
      },
    },
  },

  // ─────────────────────────────────────────────
  // SALA 2 — Reducción
  // System: 5x - y = 11  /  3x + y = 13
  // Solution: x = 3, y = 4
  // ─────────────────────────────────────────────
  {
    id: 2,
    type: 'equation',
    title: { es: 'Sala 2 — Laboratorio Cuántico', en: 'Room 2 — Quantum Lab' },
    doorNumber: '02',
    narrative: {
      es: 'El laboratorio tiene una puerta de doble cerrojo. El sistema muestra algo especial en los coeficientes. Obsérvalo con atención antes de actuar.',
      en: 'The lab has a double-lock door. The system shows something special in its coefficients. Look carefully before acting.',
    },
    badge: '🧪',
    badgeLabel: { es: 'Reactivo Beta', en: 'Beta Reagent' },
    latex: '\\begin{cases} 5x - y = 11 \\\\ 3x + y = 13 \\end{cases}',
    recommendedMethod: 'reduccion',
    solution: { x: 3, y: 4 },
    varLabels: { x: 'x', y: 'y' },
    hints: [
      '🔍 Mira los coeficientes de y: -1 y +1. / Look at y coefficients: -1 and +1.',
      '💡 Si sumas las ecuaciones, y se cancela. / If you add the equations, y cancels out.',
      '📐 Obtienes 8x = 24, luego x = 3. / You get 8x = 24, so x = 3. Sustituye para hallar y. / Substitute to find y.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ Brillante: con -1 y +1, y desaparece al sumar. / Brilliant: with -1 and +1, y disappears when adding. Reduccion es perfecta aqui. / Elimination is perfect here.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Funciona, pero primero hay que despejar. / It works, but you must isolate first. Aqui reduccion es mas rapida por los coeficientes de y. / Here elimination is faster due to y coefficients.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Es posible, pero mas largo. / It is possible, but longer. Compara coeficientes de y y usa reduccion directa. / Compare y coefficients and use direct elimination.',
      },
    },
  },

  // ─────────────────────────────────────────────
  // SALA 3 — Igualación
  // System: x = 2y + 3  /  x = 3y − 1
  // Solution: x = 11, y = 4
  // ─────────────────────────────────────────────
  {
    id: 3,
    type: 'equation',
    title: { es: 'Sala 3 — Cámara de Servidores', en: 'Room 3 — Server Chamber' },
    doorNumber: '03',
    narrative: {
      es: 'Los servidores del instituto están protegidos. Ambas ecuaciones tienen una estructura muy particular. Observa qué variable está en el lado izquierdo.',
      en: 'The school servers are protected. Both equations have a very specific structure. Notice which variable is on the left side.',
    },
    badge: '💾',
    badgeLabel: { es: 'Chip Gamma', en: 'Gamma Chip' },
    latex: '\\begin{cases} x = 2y + 3 \\\\ x = 3y - 1 \\end{cases}',
    recommendedMethod: 'igualacion',
    solution: { x: 11, y: 4 },
    varLabels: { x: 'x', y: 'y' },
    hints: [
      '🔍 Las dos ecuaciones empiezan por x = ... / Both equations start with x = ...',
      '💡 Si ambas son iguales a x, puedes igualarlas entre si. / If both are equal to x, you can set them equal.',
      '📐 2y + 3 = 3y - 1, resuelve y y luego x. / Solve for y, then substitute to get x.',
    ],
    methodFeedback: {
      igualacion: {
        quality: 'best',
        message:
          '✅ Exacto: x ya esta despejada en ambas ecuaciones. / Exactly: x is already isolated in both equations. Igualar es el metodo mas directo aqui. / Equalization is the most direct method here.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Tambien funciona, pero hay una pista clara: x = ... en ambas. / It also works, but there is a clear clue: x = ... in both. Igualacion ahorra pasos. / Equalization saves steps.',
      },
      reduccion: {
        quality: 'wrong',
        message:
          '❌ Aqui no esta preparada para reduccion directa. / This is not set up for direct elimination. Al estar en forma x = expresion, conviene igualar. / Since both are x = expression, equalization is better.',
      },
    },
  },

  // ─────────────────────────────────────────────
  // SALA 4 — Sustitución
  // System: 3x + 2y = 8  /  x − y = 1
  // Solution: x = 2, y = 1
  // ─────────────────────────────────────────────
  {
    id: 4,
    type: 'equation',
    title: { es: 'Sala 4 — Sala de Máquinas', en: 'Room 4 — Machine Room' },
    doorNumber: '04',
    narrative: {
      es: 'La puerta final de los sistemas mecánicos. Una ecuación parece más simple que la otra. Identifica cuál ofrece el despeje más sencillo.',
      en: 'The final door of the mechanical systems. One equation seems simpler than the other. Identify which one is easiest to isolate.',
    },
    badge: '⚙️',
    badgeLabel: { es: 'Engranaje Delta', en: 'Delta Gear' },
    latex: '\\begin{cases} 3x + 2y = 8 \\\\ x - y = 1 \\end{cases}',
    recommendedMethod: 'sustitucion',
    solution: { x: 2, y: 1 },
    varLabels: { x: 'x', y: 'y' },
    hints: [
      '🔍 Mira x - y = 1. / Look at x - y = 1. Que variable se despeja facil? / Which variable is easy to isolate?',
      '💡 De x - y = 1 sale x = y + 1 en un paso. / From x - y = 1, you get x = y + 1 in one step.',
      '📐 Sustituye en 3x + 2y = 8 y resuelve. / Substitute into 3x + 2y = 8 and solve.',
    ],
    methodFeedback: {
      sustitucion: {
        quality: 'best',
        message:
          '✅ Muy bien: la segunda ecuacion permite despejar x en un paso. / Great: the second equation isolates x in one step. Sustitucion es la estrategia mas eficiente. / Substitution is the most efficient strategy.',
      },
      reduccion: {
        quality: 'valid',
        message:
          '⚠️ Puede funcionar, pero exige mas calculo previo. / It can work, but needs more setup. Aqui conviene usar el despeje directo de la segunda ecuacion. / Here the direct isolation from the second equation is better.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Es posible, pero hay que despejar en ambas ecuaciones. / It is possible, but you must isolate in both equations. Como x se despeja rapido en la segunda, sustitucion es mas corta. / Since x isolates quickly in the second, substitution is shorter.',
      },
    },
  },

  // ─────────────────────────────────────────────
  // SALA 5 — Problema verbal 1 (Papelería)
  // ─────────────────────────────────────────────
  {
    id: 5,
    type: 'word',
    title: { es: 'Sala 5 — Almacén de Material', en: 'Room 5 — Supply Storage' },
    doorNumber: '05',
    problemText: {
      es: 'En la papelería del instituto:\n• 2 bolígrafos y 1 cuaderno cuestan 8 €\n• 1 bolígrafo y 1 cuaderno cuestan 5 €\n\n¿Cuánto cuesta cada artículo?',
      en: 'At the school stationery shop:\n• 2 pens and 1 notebook cost 8 €\n• 1 pen and 1 notebook cost 5 €\n\nHow much does each item cost?',
    },
    narrative: {
      es: 'En el almacén hay un registro de compras. Necesitas plantear un sistema con los datos del registro para abrir la cerradura.',
      en: 'There is a purchase log in the storage room. Build a system with that data to unlock the door.',
    },
    systemExplanation: {
      es: 'Sea x = precio de un bolígrafo (€) e y = precio de un cuaderno (€):',
      en: 'Let x = price of one pen (€) and y = price of one notebook (€):',
    },
    badge: '✏️',
    badgeLabel: { es: 'Bolígrafo Epsilon', en: 'Epsilon Pen' },
    latex: '\\begin{cases} 2x + y = 8 \\\\ x + y = 5 \\end{cases}',
    expectedEquations: ['2x+y=8', 'x+y=5'],
    recommendedMethod: 'reduccion',
    solution: { x: 3, y: 2 },
    varLabels: { x: { es: 'bolígrafo (€)', en: 'pen (€)' }, y: { es: 'cuaderno (€)', en: 'notebook (€)' } },
    hints: [
      '🔍 Define variables: x = precio del boligrafo, y = precio del cuaderno. / Define variables: x = pen price, y = notebook price.',
      '💡 Traduce cada frase a ecuacion. / Translate each sentence into an equation.',
      '📐 2x + y = 8 y x + y = 5. Los coeficientes de y son iguales. / y coefficients are equal, so subtraction eliminates y.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ Perfecto: los coeficientes de y son 1 y 1. / Perfect: y coefficients are 1 and 1. Al restar, y se elimina y obtienes x directo. / Subtract to eliminate y and get x directly.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Funciona, pero requiere despejar antes. / It works, but requires isolating first. Aqui la resta directa es mas rapida. / Here direct subtraction is faster.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Es posible, aunque mas largo. / It is possible, though longer. Como y tiene el mismo coeficiente, prueba reduccion por resta. / Since y has the same coefficient, try elimination by subtraction.',
      },
    },
  },

  // ─────────────────────────────────────────────
  // SALA 6 — Problema verbal 2 (Coches y motos)
  // ─────────────────────────────────────────────
  {
    id: 6,
    type: 'word',
    title: { es: 'Sala 6 — Parking Inteligente', en: 'Room 6 — Smart Parking' },
    doorNumber: '06',
    problemText: {
      es: 'En el parking del instituto hay coches y motos:\n• En total hay 14 vehículos\n• En total se cuentan 44 ruedas\n\n¿Cuántos coches y cuántas motos hay?',
      en: 'In the school parking lot there are cars and motorbikes:\n• There are 14 vehicles in total\n• There are 44 wheels in total\n\nHow many cars and motorbikes are there?',
    },
    narrative: {
      es: 'La IA ha bloqueado la barrera automática del parking. Necesitas usar el número de vehículos y ruedas para abrirla.',
      en: 'The AI has blocked the parking barrier. Use number of vehicles and wheels to unlock it.',
    },
    systemExplanation: {
      es: 'Sea x = número de coches e y = número de motos:',
      en: 'Let x = number of cars and y = number of motorbikes:',
    },
    badge: '🚗',
    badgeLabel: { es: 'Llave de Parking Zeta', en: 'Zeta Parking Key' },
    latex: '\\begin{cases} x + y = 14 \\\\ 4x + 2y = 44 \\end{cases}',
    expectedEquations: ['x+y=14', '4x+2y=44'],
    recommendedMethod: 'reduccion',
    solution: { x: 8, y: 6 },
    varLabels: { x: { es: 'coches', en: 'cars' }, y: { es: 'motos', en: 'motorbikes' } },
    hints: [
      '🔍 Define: x = coches, y = motos.',
      '💡 Si hay 14 vehículos en total, entonces x + y = 14. Para las ruedas: 4x + 2y = 44.',
      '📐 Multiplica la primera por -2: -2x - 2y = -28. Al sumar con 4x + 2y = 44, obtienes 2x = 16.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ ¡Correcto! Puedes eliminar y rápidamente si multiplicas la primera ecuación por -2 y luego sumas.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Se puede hacer despejando una variable, pero aquí la reducción resulta más directa.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Es posible, aunque implica más pasos de despeje. Revisa si puedes cancelar una variable antes.',
      },
    },
  },

  // ─────────────────────────────────────────────
  // SALA 7 — Problema verbal 3 (Dos números)
  // ─────────────────────────────────────────────
  {
    id: 7,
    type: 'word',
    title: { es: 'Sala 7 — Clave Numérica Final', en: 'Room 7 — Final Numeric Key' },
    doorNumber: '07',
    problemText: {
      es: 'Piensa en dos números enteros:\n• Su suma es 18\n• Su diferencia es 4\n\n¿Cuáles son esos dos números?',
      en: 'Think of two integers:\n• Their sum is 18\n• Their difference is 4\n\nWhich two numbers are they?',
    },
    narrative: {
      es: 'Última puerta: una clave numérica bloquea la salida. Debes modelar el problema y resolver el sistema para liberar el instituto.',
      en: 'Final door: a numeric key blocks the exit. Model the problem and solve the system to free the school.',
    },
    systemExplanation: {
      es: 'Sea x = número mayor e y = número menor:',
      en: 'Let x = larger number and y = smaller number:',
    },
    badge: '🔢',
    badgeLabel: { es: 'Código Omega', en: 'Omega Code' },
    latex: '\\begin{cases} x + y = 18 \\\\ x - y = 4 \\end{cases}',
    expectedEquations: ['x+y=18', 'x-y=4'],
    recommendedMethod: 'reduccion',
    solution: { x: 11, y: 7 },
    varLabels: { x: { es: 'número mayor', en: 'larger number' }, y: { es: 'número menor', en: 'smaller number' } },
    hints: [
      '🔍 Define: x = número mayor, y = número menor.',
      '💡 "Su suma es 18" → x + y = 18. "Su diferencia es 4" → x - y = 4.',
      '📐 Si sumas ambas ecuaciones: (x + y) + (x - y) = 18 + 4, obtienes 2x = 22.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ ¡Perfecto! Al sumar las ecuaciones, y se cancela al instante. Es el camino más rápido.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Funciona, pero obliga a despejar primero. Con reducción llegas antes.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ También es posible, aunque menos eficiente en este caso.',
      },
    },
  },
];
