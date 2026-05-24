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
    title: 'Sala 1 / Room 1 — Control Central',
    doorNumber: '01',
    narrative:
      'El panel de seguridad principal esta bloqueado. / The main security panel is locked. Un sistema de ecuaciones protege la cerradura electronica. / A system of equations protects the electronic lock. Analiza la estructura antes de elegir tu metodo. / Analyze the structure before choosing your method.',
    badge: '🔑',
    badgeLabel: 'Llave Alfa / Alpha Key',
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
    title: 'Sala 2 / Room 2 — Laboratorio Cuantico',
    doorNumber: '02',
    narrative:
      'El laboratorio tiene una puerta de doble cerrojo. / The lab has a double-lock door. El sistema muestra algo especial en los coeficientes. / The system shows something special in its coefficients. Observalo con atencion antes de actuar. / Look carefully before acting.',
    badge: '🧪',
    badgeLabel: 'Reactivo Beta / Beta Reagent',
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
    title: 'Sala 3 / Room 3 — Camara de Servidores',
    doorNumber: '03',
    narrative:
      'Los servidores del instituto estan protegidos. / The school servers are protected. Ambas ecuaciones tienen una estructura muy particular. / Both equations have a very specific structure. Observa que variable esta en el lado izquierdo. / Notice which variable is on the left side.',
    badge: '💾',
    badgeLabel: 'Chip Gamma / Gamma Chip',
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
    title: 'Sala 4 / Room 4 — Sala de Maquinas',
    doorNumber: '04',
    narrative:
      'La puerta final de los sistemas mecanicos. / The final door of the mechanical systems. Una ecuacion parece mas simple que la otra. / One equation seems simpler than the other. Identifica cual ofrece el despeje mas sencillo. / Identify which one is easiest to isolate.',
    badge: '⚙️',
    badgeLabel: 'Engranaje Delta / Delta Gear',
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
    title: 'Sala 5 / Room 5 — Almacen de Material',
    doorNumber: '05',
    problemText:
      'En la papeleria del instituto / At the school stationery shop:\n• 2 boligrafos y 1 cuaderno cuestan 8 € / 2 pens and 1 notebook cost 8 €\n• 1 boligrafo y 1 cuaderno cuestan 5 € / 1 pen and 1 notebook cost 5 €\n\nCuanto cuesta cada articulo? / How much does each item cost?',
    narrative:
      'En el almacen hay un registro de compras. / There is a purchase log in the storage room. Necesitas plantear un sistema con los datos del registro para abrir la cerradura. / Build a system with that data to unlock the door.',
    systemExplanation: 'Sea x = precio de un boligrafo (€) e y = precio de un cuaderno (€). / Let x = price of one pen (€) and y = price of one notebook (€):',
    badge: '✏️',
    badgeLabel: 'Boligrafo Epsilon / Epsilon Pen',
    latex: '\\begin{cases} 2x + y = 8 \\\\ x + y = 5 \\end{cases}',
    expectedEquations: ['2x+y=8', 'x+y=5'],
    recommendedMethod: 'reduccion',
    solution: { x: 3, y: 2 },
    varLabels: { x: 'boligrafo (€) / pen (€)', y: 'cuaderno (€) / notebook (€)' },
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
    title: 'Sala 6 / Room 6 — Parking Inteligente',
    doorNumber: '06',
    problemText:
      'En el parking del instituto hay coches y motos / In the school parking lot there are cars and motorbikes:\n• En total hay 14 vehiculos / There are 14 vehicles in total\n• En total se cuentan 44 ruedas / There are 44 wheels in total\n\nCuantos coches y cuantas motos hay? / How many cars and motorbikes are there?',
    narrative:
      'La IA ha bloqueado la barrera automatica del parking. / The AI has blocked the parking barrier. Necesitas usar el numero de vehiculos y ruedas para abrirla. / Use number of vehicles and wheels to unlock it.',
    systemExplanation: 'Sea x = numero de coches e y = numero de motos. / Let x = number of cars and y = number of motorbikes:',
    badge: '🚗',
    badgeLabel: 'Llave de Parking Zeta / Zeta Parking Key',
    latex: '\\begin{cases} x + y = 14 \\\\ 4x + 2y = 44 \\end{cases}',
    expectedEquations: ['x+y=14', '4x+2y=44'],
    recommendedMethod: 'reduccion',
    solution: { x: 8, y: 6 },
    varLabels: { x: 'coches', y: 'motos' },
    hints: [
      '🔍 Define: x = coches, y = motos. / Define: x = cars, y = motorbikes.',
      '💡 Vehiculos totales: x + y = 14. Ruedas totales: 4x + 2y = 44. / Total vehicles: x + y = 14. Total wheels: 4x + 2y = 44.',
      '📐 Multiplica la primera por -2 y suma para eliminar y. / Multiply the first by -2 and add to eliminate y.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ Correcto: con una multiplicacion previa, eliminas y muy rapido. / Correct: with one scaling step, you eliminate y quickly.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Se puede resolver por sustitucion, pero es mas larga. / It can be solved by substitution, but it is longer. Reduccion es mas directa aqui. / Elimination is more direct here.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Es posible, pero con mas pasos de despeje. / It is possible, but needs more isolation steps. Prueba cancelar una variable antes. / Try canceling a variable first.',
      },
    },
  },

  // ─────────────────────────────────────────────
  // SALA 7 — Problema verbal 3 (Dos numeros)
  // ─────────────────────────────────────────────
  {
    id: 7,
    type: 'word',
    title: 'Sala 7 / Room 7 — Clave Numerica Final',
    doorNumber: '07',
    problemText:
      'Piensa en dos numeros enteros / Think of two integers:\n• Su suma es 18 / Their sum is 18\n• Su diferencia es 4 / Their difference is 4\n\nCuales son esos dos numeros? / Which two numbers are they?',
    narrative:
      'Ultima puerta: una clave numerica bloquea la salida. / Final door: a numeric key blocks the exit. Debes modelar el problema y resolver el sistema para liberar el instituto. / Model the problem and solve the system to free the school.',
    systemExplanation: 'Sea x = numero mayor e y = numero menor. / Let x = larger number and y = smaller number:',
    badge: '🔢',
    badgeLabel: 'Codigo Omega / Omega Code',
    latex: '\\begin{cases} x + y = 18 \\\\ x - y = 4 \\end{cases}',
    expectedEquations: ['x+y=18', 'x-y=4'],
    recommendedMethod: 'reduccion',
    solution: { x: 11, y: 7 },
    varLabels: { x: 'numero mayor', y: 'numero menor' },
    hints: [
      '🔍 Define: x = numero mayor, y = numero menor. / Define: x = larger number, y = smaller number.',
      '💡 "Suma 18" -> x + y = 18; "diferencia 4" -> x - y = 4. / "Sum 18" -> x + y = 18; "difference 4" -> x - y = 4.',
      '📐 Suma ambas ecuaciones para eliminar y. / Add both equations to eliminate y.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ Perfecto: al sumar, y se cancela al instante. / Perfect: when adding, y cancels instantly. Es el camino mas rapido. / It is the fastest path.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Funciona, pero primero hay que despejar. / It works, but first you must isolate. Con reduccion llegas antes. / Elimination gets you there faster.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Tambien es posible, pero menos eficiente aqui. / It is also possible, but less efficient here.',
      },
    },
  },
];
