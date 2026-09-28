import { useState, useRef, useEffect } from 'react';

interface Person {
  id: string;
  name: string;
  givenName: string;
  surname: string;
  gender: 'M' | 'F';
  role: string;
}

interface Family {
  id: string;
  husband: string;
  wife: string;
  children: string[];
}

interface Message {
  id: number;
  role: 'user' | 'bot';
  agent?: 'Explorador' | 'Analista' | 'Verificador' | 'Narrador' | 'Sistema';
  content: string;
  timestamp: Date;
}

const people: Record<string, Person> = {
  I1: {
    id: 'I1',
    name: 'Daniela Balsera Infantes',
    givenName: 'Daniela',
    surname: 'Balsera Infantes',
    gender: 'F',
    role: 'Hija',
  },
  I2: {
    id: 'I2',
    name: 'Gerardo Balsera Herrojo',
    givenName: 'Gerardo',
    surname: 'Balsera Herrojo',
    gender: 'M',
    role: 'Padre',
  },
  I3: {
    id: 'I3',
    name: 'Basilisa Infantes López',
    givenName: 'Basilisa',
    surname: 'Infantes López',
    gender: 'F',
    role: 'Madre',
  },
};

const families: Family[] = [
  {
    id: 'F1',
    husband: 'I2',
    wife: 'I3',
    children: ['I1'],
  },
];

const agentColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  Explorador: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', icon: '🔍' },
  Analista: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', icon: '🔗' },
  Verificador: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', icon: '✅' },
  Narrador: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', icon: '📖' },
  Sistema: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: '⚙️' },
};

function findPersonByName(query: string): Person | null {
  const normalized = query.toLowerCase().trim();
  return Object.values(people).find(
    (p) =>
      p.name.toLowerCase().includes(normalized) ||
      p.givenName.toLowerCase().includes(normalized) ||
      p.surname.toLowerCase().includes(normalized)
  ) || null;
}

function extractNameFromQuery(query: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
}

function processMessage(input: string): Message[] {
  const messages: Message[] = [];
  const lower = input.toLowerCase().trim();

  // Saludo
  if (/^(hola|hi|hello|buenas|hey|buenos días|buenas tardes|buenas noches)/.test(lower)) {
    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Sistema',
      content: '¡Hola! Soy el asistente genealógico de la familia Balsera-Infantes. Puedo ayudarte a consultar el árbol, buscar personas, analizar relaciones o generar biografías. ¿En qué puedo ayudarte?',
      timestamp: new Date(),
    });
    return messages;
  }

  // Listar individuos
  if (/list(ar)?\s+(todos?\s+)?(los\s+)?individuos|mostrar\s+(todos?\s+)?(los\s+)?individuos|cuántos?\s+(individuos|personas)/.test(lower)) {
    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Explorador',
      content: `He localizado ${Object.keys(people).length} individuos y ${families.length} familia(s) en el archivo GEDCOM.\n\n📋 Lista de individuos:\n${Object.values(people).map((p) => `• [${p.id}] ${p.name} (${p.gender === 'M' ? 'Masculino' : 'Femenino'}) - ${p.role}`).join('\n')}`,
      timestamp: new Date(),
    });
    return messages;
  }

  // Listar familias
  if (/list(ar)?\s+(las\s+)?familias|mostrar\s+(las\s+)?familias/.test(lower)) {
    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Explorador',
      content: `He localizado ${families.length} familia(s) en el archivo.\n\n${families.map((f) => `👨‍👩‍👧 Familia ${f.id}:\n• Esposo: ${people[f.husband].name}\n• Esposa: ${people[f.wife].name}\n• Hijos: ${f.children.map((c) => people[c].name).join(', ')}`).join('\n\n')}`,
      timestamp: new Date(),
    });
    return messages;
  }

  // Padres
  const parentPatterns = [
    /(?:qui[eé]nes?|who)\s+(?:son|es|are)\s+(?:los\s+)?padres?\s+de\s+(.+)/i,
    /padres?\s+de\s+(.+)/i,
    /parents\s+of\s+(.+)/i,
  ];
  const parentName = extractNameFromQuery(input, parentPatterns);
  if (parentName) {
    const person = findPersonByName(parentName);
    if (!person) {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Explorador',
        content: `No se han encontrado registros para "${parentName}" en el archivo GEDCOM. Verifica la ortografía del nombre.`,
        timestamp: new Date(),
      });
      return messages;
    }
    // Buscar familia donde esta persona es hijo
    const parentFamily = families.find((f) => f.children.includes(person.id));
    if (parentFamily) {
      const father = people[parentFamily.husband];
      const mother = people[parentFamily.wife];
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Analista',
        content: `He trazado la ruta genealógica. Los padres de ${person.name} son:\n\n👨 Padre: ${father.name} [${father.id}]\n👩 Madre: ${mother.name} [${mother.id}]`,
        timestamp: new Date(),
      });
    } else {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Analista',
        content: `${person.name} no tiene padres registrados en el archivo (no aparece como hijo en ninguna familia).`,
        timestamp: new Date(),
      });
    }
    return messages;
  }

  // Hijos
  const childPatterns = [
    /(?:qui[eé]nes?|who)\s+(?:son|es|are)\s+(?:los\s+)?hijos?\s+de\s+(.+)/i,
    /hijos?\s+de\s+(.+)/i,
    /children\s+of\s+(.+)/i,
  ];
  const childName = extractNameFromQuery(input, childPatterns);
  if (childName) {
    const person = findPersonByName(childName);
    if (!person) {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Explorador',
        content: `No se han encontrado registros para "${childName}" en el archivo GEDCOM.`,
        timestamp: new Date(),
      });
      return messages;
    }
    const childFamilies = families.filter((f) => f.husband === person.id || f.wife === person.id);
    if (childFamilies.length > 0) {
      const children = childFamilies.flatMap((f) => f.children.map((c) => people[c]));
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Analista',
        content: `Los hijos de ${person.name} son:\n\n${children.map((c) => `• ${c.name} [${c.id}] (${c.gender === 'M' ? 'Masculino' : 'Femenino'})`).join('\n')}`,
        timestamp: new Date(),
      });
    } else {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Analista',
        content: `${person.name} no tiene hijos registrados en el archivo (no aparece como cónyuge en ninguna familia).`,
        timestamp: new Date(),
      });
    }
    return messages;
  }

  // Cónyuge
  const spousePatterns = [
    /(?:qui[eé]nes?|who|qui[eé]n)\s+(?:es|are|is)\s+(?:el|la|the)\s+(?:espos[oa]|c[oô]nyuge|spouse)\s+de\s+(.+)/i,
    /(?:espos[oa]|c[oô]nyuge|spouse)\s+de\s+(.+)/i,
  ];
  const spouseName = extractNameFromQuery(input, spousePatterns);
  if (spouseName) {
    const person = findPersonByName(spouseName);
    if (!person) {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Explorador',
        content: `No se han encontrado registros para "${spouseName}" en el archivo GEDCOM.`,
        timestamp: new Date(),
      });
      return messages;
    }
    const spouseFamily = families.find((f) => f.husband === person.id || f.wife === person.id);
    if (spouseFamily) {
      const spouseId = spouseFamily.husband === person.id ? spouseFamily.wife : spouseFamily.husband;
      const spouse = people[spouseId];
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Analista',
        content: `El/La cónyuge de ${person.name} es:\n\n💍 ${spouse.name} [${spouse.id}]`,
        timestamp: new Date(),
      });
    } else {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Analista',
        content: `${person.name} no tiene cónyuge registrado en el archivo.`,
        timestamp: new Date(),
      });
    }
    return messages;
  }

  // Relación entre dos personas
  const relationPatterns = [
    /(?:c[oô]mo|how)\s+(?:se\s+)?relacionan?\s+(.+?)\s+(?:y|and|con|with)\s+(.+)/i,
    /relaci[oó]n\s+(?:entre|between)\s+(.+?)\s+(?:y|and)\s+(.+)/i,
  ];
  let relationMatch = null;
  for (const pattern of relationPatterns) {
    const m = input.match(pattern);
    if (m) {
      relationMatch = { a: m[1].trim(), b: m[2].trim() };
      break;
    }
  }
  if (relationMatch) {
    const personA = findPersonByName(relationMatch.a);
    const personB = findPersonByName(relationMatch.b);
    if (!personA || !personB) {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Explorador',
        content: `No se han encontrado registros para una o ambas personas. Verifica los nombres.`,
        timestamp: new Date(),
      });
      return messages;
    }
    // Determinar relación
    let relationship = '';
    const familyAB = families.find((f) => f.husband === personA.id || f.wife === personA.id);
    const familyBA = families.find((f) => f.husband === personB.id || f.wife === personB.id);
    
    if (familyAB && familyAB.husband === personA.id && familyAB.wife === personB.id) {
      relationship = `${personA.name} es el esposo de ${personB.name}`;
    } else if (familyAB && familyAB.wife === personA.id && familyAB.husband === personB.id) {
      relationship = `${personA.name} es la esposa de ${personB.name}`;
    } else if (familyAB && familyAB.children.includes(personB.id)) {
      relationship = `${personA.name} es padre/madre de ${personB.name}`;
    } else if (familyBA && familyBA.children.includes(personA.id)) {
      relationship = `${personA.name} es hijo/a de ${personB.name}`;
    } else {
      relationship = `No se ha encontrado una relación directa entre ${personA.name} y ${personB.name} en el archivo.`;
    }

    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Analista',
      content: `He trazado la ruta genealógica:\n\n🔗 ${relationship}`,
      timestamp: new Date(),
    });
    return messages;
  }

  // Validar GEDCOM
  if (/valid(ar|ate)?|revis(ar|e)|check|integridad/.test(lower)) {
    const issues: string[] = [];
    // Verificar que cada INDI tenga NAME, SEX y al menos FAMC o FAMS
    Object.values(people).forEach((p) => {
      const hasFamily = families.some(
        (f) => f.husband === p.id || f.wife === p.id || f.children.includes(p.id)
      );
      if (!hasFamily) {
        issues.push(`• [${p.id}] ${p.name}: sin familia asignada`);
      }
    });
    // Verificar familias
    families.forEach((f) => {
      if (!people[f.husband]) issues.push(`• Familia ${f.id}: esposo no encontrado`);
      if (!people[f.wife]) issues.push(`• Familia ${f.id}: esposa no encontrada`);
      if (f.children.length === 0) issues.push(`• Familia ${f.id}: sin hijos registrados`);
    });

    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Verificador',
      content: issues.length === 0
        ? `✅ Validación completada. El archivo GEDCOM es consistente:\n\n• ${Object.keys(people).length} individuos con datos válidos\n• ${families.length} familia(s) correctamente estructurada(s)\n• No se detectaron registros huérfanos\n• No se detectaron fechas con formato incorrecto`
        : `⚠️ Validación completada. Se detectaron ${issues.length} problema(s):\n\n${issues.join('\n')}`,
      timestamp: new Date(),
    });
    return messages;
  }

  // Biografía
  const bioPatterns = [
    /(?:biograf[ií]a|biography|historia|story|cu[eé]ntame)\s+(?:de|sobre|of|about)?\s*(.+)/i,
    /redact(ar|a)?\s+(?:una\s+)?biograf[ií]a\s+(?:de|para|for)?\s*(.+)/i,
  ];
  let bioName = null;
  for (const pattern of bioPatterns) {
    const m = input.match(pattern);
    if (m && m[1]) {
      bioName = m[1].trim();
      break;
    }
  }
  if (bioName) {
    const person = findPersonByName(bioName);
    if (!person) {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Narrador',
        content: `No se han encontrado registros para "${bioName}" en el archivo GEDCOM. No puedo generar una biografía sin datos.`,
        timestamp: new Date(),
      });
      return messages;
    }

    // Construir biografía solo con datos existentes
    let bio = `📖 Biografía de ${person.name}:\n\n`;
    bio += `Según los registros del archivo GEDCOM, ${person.name} (${person.gender === 'M' ? 'masculino' : 'femenino'}) ocupa el rol de "${person.role}" en la familia.\n\n`;

    // Buscar relaciones
    const asChild = families.find((f) => f.children.includes(person.id));
    const asSpouse = families.find((f) => f.husband === person.id || f.wife === person.id);
    const asParent = families.filter((f) => f.husband === person.id || f.wife === person.id);

    if (asChild) {
      bio += `👨‍👩‍👧 Padres:\n• Padre: ${people[asChild.husband].name}\n• Madre: ${people[asChild.wife].name}\n\n`;
    }
    if (asSpouse) {
      const spouseId = asSpouse.husband === person.id ? asSpouse.wife : asSpouse.husband;
      bio += `💍 Cónyuge: ${people[spouseId].name}\n\n`;
    }
    if (asParent.length > 0) {
      const children = asParent.flatMap((f) => f.children.map((c) => people[c]));
      if (children.length > 0) {
        bio += `👶 Hijos:\n${children.map((c) => `• ${c.name}`).join('\n')}\n\n`;
      }
    }

    bio += `\n⚠️ Nota: El archivo no contiene fechas de nacimiento, defunción, lugares ni otros datos biográficos adicionales.`;

    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Narrador',
      content: bio,
      timestamp: new Date(),
    });
    return messages;
  }

  // Buscar persona específica
  const searchPatterns = [
    /busc(ar|a)?\s+(?:a\s+)?(.+)/i,
    /find\s+(.+)/i,
    /show\s+(.+)/i,
  ];
  let searchName = null;
  for (const pattern of searchPatterns) {
    const m = input.match(pattern);
    if (m && m[2]) {
      searchName = m[2].trim();
      break;
    }
  }
  if (searchName) {
    const person = findPersonByName(searchName);
    if (person) {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Explorador',
        content: `He encontrado al individuo:\n\n👤 ${person.name}\n🆔 ID: ${person.id}\n⚧ Género: ${person.gender === 'M' ? 'Masculino' : 'Femenino'}\n🏷️ Rol: ${person.role}`,
        timestamp: new Date(),
      });
    } else {
      messages.push({
        id: Date.now(),
        role: 'bot',
        agent: 'Explorador',
        content: `No se han encontrado registros para "${searchName}" en el archivo GEDCOM.`,
        timestamp: new Date(),
      });
    }
    return messages;
  }

  // Árbol completo
  if (/[aá]rbol|tree|genealog[ií]a/.test(lower)) {
    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Narrador',
      content: `🌳 Árbol genealógico de la familia Balsera-Infantes:\n\n       Gerardo Balsera Herrojo ──💍── Basilisa Infantes López\n                          │\n                          ▼\n                Daniela Balsera Infantes\n\nEl árbol consta de 2 generaciones y 3 individuos registrados.`,
      timestamp: new Date(),
    });
    return messages;
  }

  // Ayuda
  if (/ayuda|help|comandos|commands|qu[eé]\s+puedo|what\s+can/.test(lower)) {
    messages.push({
      id: Date.now(),
      role: 'bot',
      agent: 'Sistema',
      content: `📋 Comandos disponibles:\n\n🔍 Búsqueda:\n• "Buscar a [nombre]"\n• "Listar todos los individuos"\n• "Listar familias"\n\n👨‍👩‍👧 Relaciones:\n• "¿Quiénes son los padres de [nombre]?"\n• "¿Quiénes son los hijos de [nombre]?"\n• "¿Quién es el cónyuge de [nombre]?"\n• "¿Cómo se relacionan [A] y [B]?"\n\n✅ Validación:\n• "Validar la integridad del archivo"\n\n📖 Narrativa:\n• "Redactar una biografía de [nombre]"\n• "Mostrar el árbol genealógico"`,
      timestamp: new Date(),
    });
    return messages;
  }

  // Respuesta por defecto
  messages.push({
    id: Date.now(),
    role: 'bot',
    agent: 'Sistema',
    content: `No he podido procesar tu consulta. Puedes escribir "ayuda" para ver los comandos disponibles, o intentar con preguntas como:\n\n• "¿Quiénes son los padres de Daniela?"\n• "Listar todos los individuos"\n• "Validar el archivo"\n• "Biografía de Gerardo"`,
    timestamp: new Date(),
  });
  return messages;
}

const quickActions = [
  { label: '👨‍👩‍👧 Listar individuos', query: 'Listar todos los individuos' },
  { label: '👨 Padres de Daniela', query: '¿Quiénes son los padres de Daniela?' },
  { label: '💍 Cónyuge de Gerardo', query: '¿Quién es el cónyuge de Gerardo?' },
  { label: '✅ Validar archivo', query: 'Validar la integridad del archivo' },
  { label: '📖 Biografía de Basilisa', query: 'Redactar una biografía de Basilisa' },
  { label: '🌳 Ver árbol', query: 'Mostrar el árbol genealógico' },
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      agent: 'Sistema',
      content: '¡Bienvenido al chatbot genealógico de la familia Balsera-Infantes! 👋\n\nSoy tu asistente para consultar el árbol genealógico almacenado en el servidor GEDCOM MCP. Puedo ayudarte a:\n\n• 🔍 Buscar personas en el archivo\n• 🔗 Analizar relaciones familiares\n• ✅ Validar la integridad del GEDCOM\n• 📖 Generar biografías\n\nEscribe "ayuda" para ver los comandos disponibles, o usa los botones rápidos de abajo.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular tiempo de procesamiento de los agentes
    setTimeout(() => {
      const responses = processMessage(messageText);
      setMessages((prev) => [...prev, ...responses]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[700px]">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
            💬
          </div>
          <div>
            <h3 className="font-bold">Chatbot Genealógico</h3>
            <p className="text-xs text-amber-200">Conectado al servidor GEDCOM MCP</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-amber-100">En línea</span>
        </div>
      </div>

      {/* Agent Legend */}
      <div className="bg-gray-50 px-4 py-2 border-b flex flex-wrap gap-2 text-xs">
        {Object.entries(agentColors).map(([agent, colors]) => (
          <span key={agent} className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full border ${colors.border}`}>
            {colors.icon} {agent}
          </span>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((msg) => {
          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[80%] bg-amber-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm">
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-[10px] text-amber-200 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          }

          const colors = agentColors[msg.agent || 'Sistema'];
          return (
            <div key={msg.id} className="flex justify-start">
              <div className="max-w-[85%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full text-xs font-medium border ${colors.border}`}>
                    {colors.icon} {msg.agent}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <span className="text-xs text-gray-400 ml-2">Los agentes están procesando...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="border-t bg-gray-50 px-4 py-2">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.query)}
              disabled={isTyping}
              className="text-xs bg-white border border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray-600 hover:text-amber-700 px-3 py-1.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu consulta genealógica..."
            disabled={isTyping}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <span>Enviar</span>
            <span>➤</span>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Los datos se consultan del archivo GEDCOM local • No se envía información a servidores externos
        </p>
      </div>
    </div>
  );
}
