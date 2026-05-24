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
      '🔍 Observa si alguna variable ya está completamente despejada en alguna ecuación.',
      '💡 La segunda ecuación tiene y despejada: y = 2x + 10. ¿Puedes usarla directamente en la primera?',
      '📐 Sustituye y = 2x + 10 en 2y = x + 8: queda 2(2x + 10) = x + 8. Despeja x.',
    ],
    methodFeedback: {
      sustitucion: {
        quality: 'best',
        message:
          '✅ ¡Excelente elección! La segunda ecuación tiene y despejada directamente. La sustitución es el método más eficiente aquí.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Se puede usar igualación, pero requiere más pasos. Fíjate en que y ya está despejada en una ecuación: la sustitución directa es más rápida.',
      },
      reduccion: {
        quality: 'wrong',
        message:
          '❌ Para la reducción se necesitan coeficientes opuestos en la misma variable. Aquí las ecuaciones no están preparadas para eso. Busca variables ya despejadas.',
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
      '🔍 Fíjate en los coeficientes de y: uno es −1 y el otro es +1. ¿Qué ocurre si sumas las dos ecuaciones?',
      '💡 Si sumas ambas ecuaciones, los términos con y se cancelan: (5x − y) + (3x + y) = 11 + 13.',
      '📐 Obtienes 8x = 24, es decir x = 3. Ahora sustituye para hallar y.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ ¡Brillante! Los coeficientes de y son −1 y +1. Al sumar las ecuaciones, y desaparece instantáneamente. Reducción perfecta.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Funciona, pero primero tienes que despejar una variable. ¿No detectas algo especial en los coeficientes de y en ambas ecuaciones?',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Posible, aunque requiere despejar y en ambas y luego igualar. Compara los coeficientes de y: hay una forma mucho más directa.',
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
      '🔍 Las dos ecuaciones empiezan por "x = ...". ¿Qué puedes hacer con dos expresiones iguales a x?',
      '💡 Si x = 2y + 3 y también x = 3y − 1, entonces 2y + 3 = 3y − 1. ¡Iguala las expresiones!',
      '📐 2y + 3 = 3y − 1 → 3 + 1 = 3y − 2y → y = 4. Sustituye en cualquier ecuación para hallar x.',
    ],
    methodFeedback: {
      igualacion: {
        quality: 'best',
        message:
          '✅ ¡Exactamente! Ambas ecuaciones tienen x despejada. Igualando las dos expresiones de x obtienes y directamente. Método perfecto.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ También funciona, pero ¿no ves algo especial? Las dos ecuaciones empiezan por "x = ...". Igualando te ahorras un paso.',
      },
      reduccion: {
        quality: 'wrong',
        message:
          '❌ Para la reducción necesitas coeficientes opuestos de la misma variable. Aquí las ecuaciones están en forma "x = expresión". Busca otra estrategia.',
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
      '🔍 Mira la segunda ecuación: x − y = 1. ¿Qué variable puedes despejar fácilmente?',
      '💡 De x − y = 1 se despeja x con un solo paso: x = y + 1. Sustituye eso en la primera ecuación.',
      '📐 Sustituye x = y + 1 en 3x + 2y = 8: 3(y + 1) + 2y = 8 → 5y = 5 → y = 1. Luego x = 2.',
    ],
    methodFeedback: {
      sustitucion: {
        quality: 'best',
        message:
          '✅ ¡Muy bien! La segunda ecuación permite despejar x en un solo paso. La sustitución directa es la estrategia más eficiente.',
      },
      reduccion: {
        quality: 'valid',
        message:
          '⚠️ Podría funcionar multiplicando para igualar coeficientes, pero requiere más cálculo. La segunda ecuación ofrece un despeje mucho más directo.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Habría que despejar la misma variable en ambas ecuaciones. Fíjate en la segunda: se puede despejar x con un solo paso, lo que hace más directa la sustitución.',
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
      '🔍 Define las variables: x = precio de un bolígrafo, y = precio de un cuaderno.',
      '💡 Traduce las frases: "2 bolígrafos y 1 cuaderno cuestan 8€" → 2x + y = 8. ¿Y la segunda frase?',
      '📐 El sistema es: 2x + y = 8 y x + y = 5. Compara los coeficientes de y: son iguales, ¡la resta los elimina!',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ ¡Perfecto! Los coeficientes de y son ambos 1. Restando la segunda ecuación de la primera: (2x + y) − (x + y) = 8 − 5, obtienes x = 3 directamente.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Funciona: puedes despejar y en la segunda ecuación y sustituir. Pero fíjate en que los coeficientes de y son iguales: ¡la resta los cancela sin despejar nada!',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Posible, pero requiere despejar y en ambas ecuaciones. Hay una forma más directa: los coeficientes de y coinciden, ¿qué pasa si restas las ecuaciones?',
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
      '🔍 Define: x = coches, y = motos.',
      '💡 Si hay 14 vehiculos en total, entonces x + y = 14. Para las ruedas: 4x + 2y = 44.',
      '📐 Multiplica la primera por -2: -2x - 2y = -28. Al sumar con 4x + 2y = 44, obtienes 2x = 16.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ ¡Correcto! Puedes eliminar y rapidamente si multiplicas la primera ecuacion por -2 y luego sumas.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Se puede hacer despejando una variable, pero aqui la reduccion resulta mas directa.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Es posible, aunque implica mas pasos de despeje. Revisa si puedes cancelar una variable antes.',
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
      '🔍 Define: x = numero mayor, y = numero menor.',
      '💡 "Su suma es 18" → x + y = 18. "Su diferencia es 4" → x - y = 4.',
      '📐 Si sumas ambas ecuaciones: (x + y) + (x - y) = 18 + 4, obtienes 2x = 22.',
    ],
    methodFeedback: {
      reduccion: {
        quality: 'best',
        message:
          '✅ ¡Perfecto! Al sumar las ecuaciones, y se cancela al instante. Es el camino mas rapido.',
      },
      sustitucion: {
        quality: 'valid',
        message:
          '⚠️ Funciona, pero obliga a despejar primero. Con reduccion llegas antes.',
      },
      igualacion: {
        quality: 'valid',
        message:
          '⚠️ Tambien es posible, aunque menos eficiente en este caso.',
      },
    },
  },
];
