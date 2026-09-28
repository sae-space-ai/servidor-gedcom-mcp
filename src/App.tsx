import { useState } from 'react';
import ChatBot from './ChatBot';

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

const gedcomContent = `0 HEAD
1 SOUR GenealogiaFamiliar
2 VERS 1.0
2 NAME Generador GEDCOM
1 GEDC
2 VERS 5.5.1
2 FORM LINEAGE-LINKED
1 CHAR UTF-8
0 @I1@ INDI
1 NAME Daniela /Balsera Infantes/
2 GIVN Daniela
2 SURN Balsera Infantes
1 SEX F
1 FAMC @F1@
0 @I2@ INDI
1 NAME Gerardo /Balsera Herrojo/
2 GIVN Gerardo
2 SURN Balsera Herrojo
1 SEX M
1 FAMS @F1@
0 @I3@ INDI
1 NAME Basilisa /Infantes López/
2 GIVN Basilisa
2 SURN Infantes López
1 SEX F
1 FAMS @F1@
0 @F1@ FAM
1 HUSB @I2@
1 WIFE @I3@
1 CHIL @I1@
0 TRLR`;

function PersonCard({ person, onClick, isSelected }: { person: Person; onClick: () => void; isSelected: boolean }) {
  const isMale = person.gender === 'M';
  
  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-300 transform hover:scale-105
        rounded-2xl p-6 shadow-lg border-2
        ${isSelected 
          ? 'border-amber-400 shadow-amber-200/50 shadow-xl scale-105' 
          : isMale 
            ? 'border-blue-200 hover:border-blue-400 hover:shadow-blue-200/30' 
            : 'border-pink-200 hover:border-pink-400 hover:shadow-pink-200/30'
        }
        ${isMale 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
          : 'bg-gradient-to-br from-pink-50 to-pink-100'
        }
      `}
    >
      <div className="flex flex-col items-center">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3
          ${isMale ? 'bg-blue-200' : 'bg-pink-200'}
        `}>
          {isMale ? '👨' : '👩'}
        </div>
        <h3 className={`font-bold text-lg text-center ${isMale ? 'text-blue-900' : 'text-pink-900'}`}>
          {person.givenName}
        </h3>
        <p className={`text-sm ${isMale ? 'text-blue-700' : 'text-pink-700'}`}>
          {person.surname}
        </p>
        <span className={`
          mt-2 px-3 py-1 rounded-full text-xs font-medium
          ${isMale ? 'bg-blue-200 text-blue-800' : 'bg-pink-200 text-pink-800'}
        `}>
          {person.role}
        </span>
      </div>
    </div>
  );
}

function DetailPanel({ person }: { person: Person }) {
  const isMale = person.gender === 'M';
  
  return (
    <div className={`
      rounded-2xl p-6 shadow-lg border-2 transition-all duration-300
      ${isMale 
        ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' 
        : 'border-pink-200 bg-gradient-to-br from-pink-50 to-white'
      }
    `}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`
          w-20 h-20 rounded-full flex items-center justify-center text-4xl
          ${isMale ? 'bg-blue-200' : 'bg-pink-200'}
        `}>
          {isMale ? '👨' : '👩'}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{person.name}</h3>
          <p className="text-gray-500">ID: {person.id}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Nombre de pila</p>
          <p className="font-semibold text-gray-700">{person.givenName}</p>
        </div>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Apellidos</p>
          <p className="font-semibold text-gray-700">{person.surname}</p>
        </div>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Género</p>
          <p className="font-semibold text-gray-700">{person.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
        </div>
        <div className="bg-white/60 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Rol en la familia</p>
          <p className="font-semibold text-gray-700">{person.role}</p>
        </div>
      </div>

      <div className="mt-4 bg-white/60 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Relaciones</p>
        {person.id === 'I1' && (
          <div className="space-y-1">
            <p className="text-gray-700">👨 Padre: <span className="font-medium">Gerardo Balsera Herrojo</span></p>
            <p className="text-gray-700">👩 Madre: <span className="font-medium">Basilisa Infantes López</span></p>
          </div>
        )}
        {person.id === 'I2' && (
          <div className="space-y-1">
            <p className="text-gray-700">💑 Esposa: <span className="font-medium">Basilisa Infantes López</span></p>
            <p className="text-gray-700">👧 Hija: <span className="font-medium">Daniela Balsera Infantes</span></p>
          </div>
        )}
        {person.id === 'I3' && (
          <div className="space-y-1">
            <p className="text-gray-700">💑 Esposo: <span className="font-medium">Gerardo Balsera Herrojo</span></p>
            <p className="text-gray-700">👧 Hija: <span className="font-medium">Daniela Balsera Infantes</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

function GedcomViewer() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-5 py-3 bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm ml-2 font-mono">familia_balsera_infantes.ged</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          {isExpanded ? '▼ Colapsar' : '▶ Expandir'}
        </button>
      </div>
      <div className={`overflow-auto transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-[200px]'}`}>
        <pre className="p-5 text-sm font-mono text-green-400 leading-relaxed">
          {gedcomContent}
        </pre>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tree' | 'gedcom' | 'info' | 'verify' | 'chat'>('tree');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="tree-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#tree-pattern)" />
          </svg>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="text-5xl mb-4">🌳</div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 tracking-tight">
            Árbol Genealógico
          </h1>
          <p className="text-xl sm:text-2xl text-amber-200 font-light">
            Familia Balsera – Infantes
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-sm text-amber-100">
            <span>📄</span>
            <span>Formato GEDCOM 5.5.1</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('tree')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'tree'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🌳 Árbol
          </button>
          <button
            onClick={() => setActiveTab('gedcom')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'gedcom'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📄 GEDCOM
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'info'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ℹ️ Información
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'verify'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✅ Verificación
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'chat'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💬 Chat
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tree View */}
        {activeTab === 'tree' && (
          <div className="space-y-8">
            {/* Family Tree Diagram */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Diagrama del Árbol Familiar
              </h2>
              
              {/* Tree Structure */}
              <div className="flex flex-col items-center">
                {/* Parents Row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 w-full max-w-2xl justify-center">
                  {/* Father */}
                  <div className="w-full sm:w-auto sm:flex-1 max-w-[220px]">
                    <PersonCard
                      person={people.I2}
                      onClick={() => setSelectedPerson(selectedPerson === 'I2' ? null : 'I2')}
                      isSelected={selectedPerson === 'I2'}
                    />
                  </div>
                  
                  {/* Marriage Connection */}
                  <div className="hidden sm:flex flex-col items-center px-4">
                    <div className="text-3xl">💍</div>
                    <div className="w-16 h-0.5 bg-amber-400 mt-1"></div>
                  </div>
                  <div className="sm:hidden flex flex-col items-center py-2">
                    <div className="text-2xl">💍</div>
                  </div>
                  
                  {/* Mother */}
                  <div className="w-full sm:w-auto sm:flex-1 max-w-[220px]">
                    <PersonCard
                      person={people.I3}
                      onClick={() => setSelectedPerson(selectedPerson === 'I3' ? null : 'I3')}
                      isSelected={selectedPerson === 'I3'}
                    />
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="relative w-full max-w-2xl flex justify-center">
                  <svg className="w-48 h-20 sm:h-24" viewBox="0 0 200 100" fill="none">
                    {/* Vertical line from parents */}
                    <line x1="100" y1="0" x2="100" y2="50" stroke="#d97706" strokeWidth="2" strokeDasharray="4" />
                    {/* Horizontal connector */}
                    <line x1="60" y1="50" x2="140" y2="50" stroke="#d97706" strokeWidth="2" />
                    {/* Vertical line to child */}
                    <line x1="100" y1="50" x2="100" y2="100" stroke="#d97706" strokeWidth="2" strokeDasharray="4" />
                    {/* Arrow */}
                    <polygon points="95,95 100,105 105,95" fill="#d97706" />
                  </svg>
                </div>

                {/* Child */}
                <div className="w-full max-w-[220px]">
                  <PersonCard
                    person={people.I1}
                    onClick={() => setSelectedPerson(selectedPerson === 'I1' ? null : 'I1')}
                    isSelected={selectedPerson === 'I1'}
                  />
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
                  <span>Masculino</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-pink-100 border border-pink-300"></div>
                  <span>Femenino</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-amber-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d97706 0, #d97706 4px, transparent 4px, transparent 8px)' }}></div>
                  <span>Relación familiar</span>
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            {selectedPerson && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  📋 Detalles de {people[selectedPerson].givenName}
                </h2>
                <DetailPanel person={people[selectedPerson]} />
              </div>
            )}

            {!selectedPerson && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-lg">Haz clic en una persona para ver sus detalles</p>
                <p className="text-3xl mt-2">👆</p>
              </div>
            )}
          </div>
        )}

        {/* GEDCOM View */}
        {activeTab === 'gedcom' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Archivo GEDCOM
              </h2>
              <p className="text-gray-500 mb-6">
                Visualización del archivo genealógico en formato GEDCOM 5.5.1. 
                Este es el estándar internacional para intercambio de datos genealógicos.
              </p>
              <GedcomViewer />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                📊 Resumen del archivo
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-amber-700">3</p>
                  <p className="text-sm text-amber-600">Personas</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-blue-700">1</p>
                  <p className="text-sm text-blue-600">Familia</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-700">2</p>
                  <p className="text-sm text-green-600">Generaciones</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-700">5.5.1</p>
                  <p className="text-sm text-purple-600">Versión GEDCOM</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info View */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ℹ️ Sobre este Árbol Genealógico
              </h2>
              <div className="prose prose-amber max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  Este árbol genealógico representa la familia <strong>Balsera-Infantes</strong>, 
                  generado a partir de un archivo GEDCOM (GEnealogical Data COMmunication), 
                  el formato estándar para el intercambio de datos genealógicos.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                  <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <span>📖</span> ¿Qué es GEDCOM?
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    GEDCOM es un formato de archivo desarrollado por la Iglesia de Jesucristo 
                    de los Santos de los Últimos Días para el intercambio de datos genealógicos. 
                    Es compatible con la mayoría de programas de genealogía como MyHeritage, 
                    Gramps, Ancestral Quest y Family Tree Maker.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <span>🤖</span> Uso con Qwen MCP
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Este archivo puede cargarse en Qwen CLI a través del servidor GedcomMCP, 
                    permitiendo consultas en lenguaje natural sobre las relaciones familiares, 
                    generación de biografías y exploración del árbol genealógico.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🔗 Comandos útiles para Qwen
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Cargar archivo', cmd: 'Load gedcom "familia_balsera_infantes.ged"' },
                  { action: 'Ver padres', cmd: 'Who are the parents of Daniela Balsera Infantes?' },
                  { action: 'Ver hijos', cmd: 'Who are the children of Gerardo Balsera Herrojo?' },
                  { action: 'Ver cónyuge', cmd: 'Who is the spouse of Basilisa Infantes López?' },
                  { action: 'Relación', cmd: 'What is the relationship between Daniela and Gerardo?' },
                  { action: 'Biografía', cmd: 'Generate a biography for Gerardo Balsera Herrojo' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-gray-50 rounded-xl p-4">
                    <span className="text-sm font-medium text-amber-700 sm:w-32 shrink-0">{item.action}</span>
                    <code className="text-sm bg-gray-800 text-green-400 px-3 py-1.5 rounded-lg font-mono overflow-x-auto">
                      {item.cmd}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📚 Estructura del Árbol
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 font-mono text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg border border-blue-200">
                      Gerardo Balsera Herrojo
                    </span>
                    <span className="text-amber-600 text-xl">── 💍 ──</span>
                    <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg border border-pink-200">
                      Basilisa Infantes López
                    </span>
                  </div>
                  <div className="text-amber-600 text-2xl">│</div>
                  <div className="text-amber-600 text-2xl">▼</div>
                  <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg border border-pink-200">
                    Daniela Balsera Infantes
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verification View */}
        {activeTab === 'verify' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ✅ Verificación: El Servidor GEDCOM MCP Está Corriendo en Qwen
              </h2>
              <p className="text-gray-500 mb-6">
                Si ya ejecutaste los pasos anteriores, el servidor GEDCOM MCP debería estar activo. A continuación se explica cómo confirmarlo paso a paso.
              </p>
            </div>

            {/* PASO 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Verificar que el Servidor GEDCOM MCP Está en Ejecución
              </h3>
              <div className="space-y-4 text-gray-600">
                <p><strong>1.1.</strong> Abre una NUEVA terminal (CMD, PowerShell o Terminal). No cierres la terminal donde iniciaste el servidor.</p>
                
                <p><strong>1.2.</strong> Ejecuta este comando para comprobar si el puerto 8000 está escuchando:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  netstat -an | findstr :8000
                </div>
                <p className="text-sm text-gray-400">(En macOS o Linux usa: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">netstat -an | grep 8000</code>)</p>
                
                <p><strong>1.3.</strong> Si el servidor está corriendo, verás una línea similar a:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  TCP    0.0.0.0:8000           0.0.0.0:0              LISTENING
                </div>
                <p>Si NO aparece nada, el servidor no está en ejecución. Vuelve al Paso 3 de las instrucciones originales y ejecuta de nuevo:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  python src/gedcom_mcp/fastmcp_server.py
                </div>
                
                <p><strong>1.4.</strong> También puedes verificar directamente con una petición HTTP:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  curl http://localhost:8000
                </div>
                <p>Deberías recibir una respuesta (aunque sea un error 404 o similar). Si recibes "Connection refused", el servidor no está activo.</p>
              </div>
            </div>

            {/* PASO 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Verificar que Qwen Está Conectado al Servidor MCP
              </h3>
              <div className="space-y-4 text-gray-600">
                <p><strong>2.1.</strong> En la terminal donde ejecutaste qwen-cli, deberías ver algo similar a:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto space-y-1">
                  <p>[MCP] Connected to server at http://localhost:8000</p>
                  <p>[MCP] Tools loaded: X tools available</p>
                </div>
                
                <p><strong>2.2.</strong> Si Qwen está en modo interactivo (chat), escribe este comando de prueba:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  List available tools
                </div>
                <p>Deberías ver una lista de herramientas relacionadas con GEDCOM, como:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>get_home_person</li>
                  <li>get_parents</li>
                  <li>get_children</li>
                  <li>get_relationship</li>
                  <li>etc.</li>
                </ul>
                
                <p><strong>2.3.</strong> Si NO ves esas herramientas, la conexión MCP falló. Revisa:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Que el servidor esté corriendo (Paso 1).</li>
                  <li>Que el puerto en qwen-cli coincida con el del servidor.</li>
                  <li>Que no haya un firewall bloqueando localhost.</li>
                </ul>
              </div>
            </div>

            {/* PASO 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Cargar el Archivo GEDCOM en Qwen
              </h3>
              <div className="space-y-4 text-gray-600">
                <p><strong>3.1.</strong> En el chat de Qwen, escribe:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  Load gedcom "familia_balsera_infantes.ged"
                </div>
                <p>Si el archivo está en otra ruta, usa la ruta completa:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  Load gedcom "C:/Users/TuUsuario/Documentos/familia_balsera_infantes.ged"
                </div>
                
                <p><strong>3.2.</strong> Respuesta esperada:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto space-y-1">
                  <p>GEDCOM file loaded successfully: familia_balsera_infantes.ged</p>
                  <p>Individuals: 3</p>
                  <p>Families: 1</p>
                </div>
                
                <p><strong>3.3.</strong> Si recibes un error como "File not found", verifica que la ruta sea correcta y que el archivo exista.</p>
              </div>
            </div>

            {/* PASO 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Hacer una Consulta de Prueba
              </h3>
              <div className="space-y-4 text-gray-600">
                <p><strong>4.1.</strong> Escribe esta pregunta en el chat de Qwen:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  Who are the parents of Daniela Balsera Infantes?
                </div>
                
                <p><strong>4.2.</strong> Respuesta esperada:</p>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto space-y-1">
                  <p>The parents of Daniela Balsera Infantes are:</p>
                  <p>- Father: Gerardo Balsera Herrojo</p>
                  <p>- Mother: Basilisa Infantes López</p>
                </div>
                
                <p><strong>4.3.</strong> Si Qwen responde correctamente, todo está funcionando.</p>
              </div>
            </div>

            {/* ERRORES COMUNES */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                Errores Comunes y Soluciones
              </h3>
              <div className="space-y-6">
                {/* Error 1 */}
                <div className="border-l-4 border-red-300 bg-red-50 rounded-r-xl p-4">
                  <p className="font-bold text-red-800 mb-1">ERROR: "Connection refused" al conectar Qwen con el servidor MCP</p>
                  <p className="font-semibold text-red-700 text-sm mb-2">SOLUCIÓN:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-red-700 ml-2">
                    <li>Verifica que el servidor esté corriendo (Paso 1).</li>
                    <li>Asegúrate de que el puerto sea el correcto (8000 por defecto).</li>
                    <li>Reinicia tanto el servidor como Qwen.</li>
                  </ol>
                </div>

                {/* Error 2 */}
                <div className="border-l-4 border-red-300 bg-red-50 rounded-r-xl p-4">
                  <p className="font-bold text-red-800 mb-1">ERROR: "No tools available" en Qwen</p>
                  <p className="font-semibold text-red-700 text-sm mb-2">SOLUCIÓN:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-red-700 ml-2">
                    <li>Verifica que el servidor MCP esté en ejecución.</li>
                    <li>Comprueba que la URL del servidor MCP sea correcta.</li>
                    <li>Reinicia Qwen.</li>
                  </ol>
                </div>

                {/* Error 3 */}
                <div className="border-l-4 border-red-300 bg-red-50 rounded-r-xl p-4">
                  <p className="font-bold text-red-800 mb-1">ERROR: "File not found" al cargar el GEDCOM</p>
                  <p className="font-semibold text-red-700 text-sm mb-2">SOLUCIÓN:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-red-700 ml-2">
                    <li>Usa la ruta absoluta del archivo.</li>
                    <li>Verifica que el archivo tenga extensión .ged.</li>
                    <li>Asegúrate de que el archivo no esté corrupto.</li>
                  </ol>
                </div>

                {/* Error 4 */}
                <div className="border-l-4 border-red-300 bg-red-50 rounded-r-xl p-4">
                  <p className="font-bold text-red-800 mb-1">ERROR: El servidor se cierra inmediatamente después de iniciarlo</p>
                  <p className="font-semibold text-red-700 text-sm mb-2">SOLUCIÓN:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-red-700 ml-2">
                    <li>Ejecuta el servidor con el flag --transport stdio:
                      <div className="bg-gray-900 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 overflow-x-auto">
                        python src/gedcom_mcp/fastmcp_server.py --transport stdio
                      </div>
                    </li>
                    <li>Revisa que todas las dependencias estén instaladas:
                      <div className="bg-gray-900 rounded-lg p-2 mt-1 font-mono text-xs text-green-400 overflow-x-auto">
                        pip install -r requirements.txt
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* RESUMEN RÁPIDO */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Resumen Rápido de Verificación
              </h3>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Terminal 1: Servidor GEDCOM MCP corriendo</li>
                  <li>Terminal 2: Qwen CLI conectado al servidor</li>
                  <li>En Qwen: "Load gedcom" funciona</li>
                  <li>En Qwen: "Who are the parents of..." responde correctamente</li>
                </ol>
                <p className="mt-3 text-sm text-green-700 font-medium">
                  Si los 4 pasos funcionan, el sistema está operativo. ✅
                </p>
              </div>
            </div>

            {/* NOTAS FINALES */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Notas Finales
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>El servidor debe permanecer en ejecución MIENTRAS uses Qwen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Si cierras la terminal del servidor, Qwen perderá la conexión.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Para detener el servidor, presiona Ctrl+C en su terminal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Para más información: <a href="https://github.com/airy10/GedcomMCP" className="text-amber-600 underline hover:text-amber-800" target="_blank" rel="noopener noreferrer">https://github.com/airy10/GedcomMCP</a></span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Chat View */}
        {activeTab === 'chat' && (
          <div>
            <ChatBot />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            🌳 Árbol Genealógico — Familia Balsera Infantes
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Formato GEDCOM 5.5.1 • Compatible con Qwen MCP • Datos procesados localmente
          </p>
        </div>
      </footer>
    </div>
  );
}
