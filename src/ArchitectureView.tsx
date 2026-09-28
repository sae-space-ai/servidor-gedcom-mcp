import { useState } from 'react';

type Section = 'overview' | 'db' | 'genai' | 'deploy' | 'questions';

const sections: { id: Section; label: string; icon: string }[] = [
  { id: 'overview', label: 'Análisis', icon: '📊' },
  { id: 'db', label: 'Módulo DB', icon: '🗄️' },
  { id: 'genai', label: 'Módulo GenAI', icon: '🧠' },
  { id: 'deploy', label: 'Despliegue', icon: '🚀' },
  { id: 'questions', label: 'Preguntas', icon: '❓' },
];

function ArchitectureDiagram() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 overflow-x-auto">
      <svg viewBox="0 0 900 500" className="w-full min-w-[700px] h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect width="900" height="500" fill="url(#grid)" opacity="0.3" />

        {/* Title */}
        <text x="450" y="30" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">
          Arquitectura Propuesta: GEDCOM MCP + DB + GenAI
        </text>

        {/* FRONTEND */}
        <g>
          <rect x="30" y="80" width="180" height="120" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="120" y="110" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">🖥️ Frontend</text>
          <text x="120" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">React + Vite + Tailwind</text>
          <text x="120" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">• Vista Árbol</text>
          <text x="120" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">• Chatbot (4 agentes)</text>
          <text x="120" y="189" textAnchor="middle" fill="#94a3b8" fontSize="10">• Visualizador GEDCOM</text>
        </g>

        {/* API GATEWAY */}
        <g>
          <rect x="260" y="80" width="180" height="120" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="350" y="110" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">🔌 API Gateway</text>
          <text x="350" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">Vercel Edge Functions</text>
          <text x="350" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">• Autenticación</text>
          <text x="350" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">• Rate limiting</text>
          <text x="350" y="189" textAnchor="middle" fill="#94a3b8" fontSize="10">• Routing /api/*</text>
        </g>

        {/* MCP SERVER */}
        <g>
          <rect x="490" y="80" width="180" height="120" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="580" y="110" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">⚙️ MCP Server</text>
          <text x="580" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">Python + FastMCP</text>
          <text x="580" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">• get_parents</text>
          <text x="580" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">• get_children</text>
          <text x="580" y="189" textAnchor="middle" fill="#94a3b8" fontSize="10">• validate_gedcom</text>
        </g>

        {/* DATABASE */}
        <g>
          <rect x="30" y="280" width="180" height="180" rx="12" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
          <text x="120" y="310" textAnchor="middle" fill="#c084fc" fontSize="13" fontWeight="bold">🗄️ Base de Datos</text>
          <text x="120" y="335" textAnchor="middle" fill="#cbd5e1" fontSize="11">PostgreSQL + pgvector</text>
          <text x="120" y="355" textAnchor="middle" fill="#94a3b8" fontSize="10">• individuals</text>
          <text x="120" y="372" textAnchor="middle" fill="#94a3b8" fontSize="10">• families</text>
          <text x="120" y="389" textAnchor="middle" fill="#94a3b8" fontSize="10">• events</text>
          <text x="120" y="406" textAnchor="middle" fill="#94a3b8" fontSize="10">• relationships</text>
          <text x="120" y="423" textAnchor="middle" fill="#94a3b8" fontSize="10">• sources</text>
          <text x="120" y="440" textAnchor="middle" fill="#94a3b8" fontSize="10">• embeddings</text>
        </g>

        {/* VECTOR DB */}
        <g>
          <rect x="260" y="280" width="180" height="180" rx="12" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
          <text x="350" y="310" textAnchor="middle" fill="#f472b6" fontSize="13" fontWeight="bold">🧬 Vector DB</text>
          <text x="350" y="335" textAnchor="middle" fill="#cbd5e1" fontSize="11">pgvector / Pinecone</text>
          <text x="350" y="355" textAnchor="middle" fill="#94a3b8" fontSize="10">• Biografías embed</text>
          <text x="350" y="372" textAnchor="middle" fill="#94a3b8" fontSize="10">• Notas embed</text>
          <text x="350" y="389" textAnchor="middle" fill="#94a3b8" fontSize="10">• Eventos embed</text>
          <text x="350" y="406" textAnchor="middle" fill="#94a3b8" fontSize="10">• Búsqueda semántica</text>
          <text x="350" y="423" textAnchor="middle" fill="#94a3b8" fontSize="10">• Similitud coseno</text>
        </g>

        {/* LLM */}
        <g>
          <rect x="490" y="280" width="180" height="180" rx="12" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="580" y="310" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">🧠 LLM Engine</text>
          <text x="580" y="335" textAnchor="middle" fill="#cbd5e1" fontSize="11">OpenAI / Claude / Qwen</text>
          <text x="580" y="355" textAnchor="middle" fill="#94a3b8" fontSize="10">• RAG Pipeline</text>
          <text x="580" y="372" textAnchor="middle" fill="#94a3b8" fontSize="10">• Biografías auto</text>
          <text x="580" y="389" textAnchor="middle" fill="#94a3b8" fontSize="10">• Detección errores</text>
          <text x="580" y="406" textAnchor="middle" fill="#94a3b8" fontSize="10">• Resúmenes ramas</text>
          <text x="580" y="423" textAnchor="middle" fill="#94a3b8" fontSize="10">• NL → SQL traductor</text>
        </g>

        {/* GEDCOM SOURCE */}
        <g>
          <rect x="720" y="80" width="150" height="120" rx="12" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4" />
          <text x="795" y="110" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">📄 GEDCOM</text>
          <text x="795" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">Archivo original</text>
          <text x="795" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">• Fuente de verdad</text>
          <text x="795" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">• Solo lectura</text>
          <text x="795" y="189" textAnchor="middle" fill="#94a3b8" fontSize="10">• NO se modifica</text>
        </g>

        {/* ETL */}
        <g>
          <rect x="720" y="280" width="150" height="180" rx="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
          <text x="795" y="310" textAnchor="middle" fill="#22d3ee" fontSize="13" fontWeight="bold">⚡ ETL Pipeline</text>
          <text x="795" y="335" textAnchor="middle" fill="#cbd5e1" fontSize="11">Python + Celery</text>
          <text x="795" y="355" textAnchor="middle" fill="#94a3b8" fontSize="10">• Parser GEDCOM</text>
          <text x="795" y="372" textAnchor="middle" fill="#94a3b8" fontSize="10">• Validación</text>
          <text x="795" y="389" textAnchor="middle" fill="#94a3b8" fontSize="10">• Transformación</text>
          <text x="795" y="406" textAnchor="middle" fill="#94a3b8" fontSize="10">• Carga incremental</text>
          <text x="795" y="423" textAnchor="middle" fill="#94a3b8" fontSize="10">• Embedding gen</text>
        </g>

        {/* Arrows - horizontal flow */}
        <g stroke="url(#flowGrad)" strokeWidth="2" fill="none">
          <path d="M 210 140 L 260 140" markerEnd="url(#arrow)" />
          <path d="M 440 140 L 490 140" markerEnd="url(#arrow)" />
          <path d="M 670 140 L 720 140" markerEnd="url(#arrow)" />
        </g>

        {/* Arrows - vertical flow */}
        <g stroke="#64748b" strokeWidth="1.5" strokeDasharray="4" fill="none">
          <path d="M 120 200 L 120 280" />
          <path d="M 350 200 L 350 280" />
          <path d="M 580 200 L 580 280" />
          <path d="M 795 200 L 795 280" />
        </g>

        {/* Horizontal connections bottom */}
        <g stroke="#475569" strokeWidth="1.5" fill="none">
          <path d="M 210 370 L 260 370" />
          <path d="M 440 370 L 490 370" />
          <path d="M 670 370 L 720 370" />
        </g>

        {/* Arrow marker */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Flow labels */}
        <text x="235" y="130" textAnchor="middle" fill="#fbbf24" fontSize="9">HTTP</text>
        <text x="465" y="130" textAnchor="middle" fill="#fbbf24" fontSize="9">MCP</text>
        <text x="695" y="130" textAnchor="middle" fill="#fbbf24" fontSize="9">read</text>
      </svg>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
          <span>📊</span> 1. Análisis de la Situación Actual
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border border-amber-100">
            <h4 className="font-semibold text-gray-800 mb-2">✅ Lo que ya funciona</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Frontend React + Vite + Tailwind desplegado en Vercel</li>
              <li>• Visualización del árbol genealógico (3 personas, 1 familia)</li>
              <li>• Visor de archivo GEDCOM con estadísticas</li>
              <li>• Chatbot con 4 agentes simulados</li>
              <li>• Servidor MCP (GedcomMCP) corriendo localmente</li>
              <li>• Archivo GEDCOM como fuente de verdad</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-100">
            <h4 className="font-semibold text-gray-800 mb-2">⚠️ Limitaciones actuales</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Archivo plano GEDCOM: consultas lentas en árboles grandes</li>
              <li>• Sin índices: búsquedas por nombre/fecha son O(n)</li>
              <li>• Sin recursividad: "todos los antepasados de X" es complejo</li>
              <li>• Chatbot simula agentes, no usa LLM real</li>
              <li>• Sin generación automática de biografías</li>
              <li>• Sin detección inteligente de inconsistencias</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🏗️</span> 2. Propuesta de Arquitectura Global
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Diagrama del flujo completo: Frontend → API Gateway → MCP Server → Base de Datos + Vector DB + LLM
        </p>
        <ArchitectureDiagram />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="font-semibold text-blue-800 mb-1">🔵 Capa de Presentación</p>
            <p className="text-blue-700">React + Vite. No se modifica lo existente.</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <p className="font-semibold text-green-800 mb-1">🟢 Capa de Lógica</p>
            <p className="text-green-700">MCP Server existente + nuevos endpoints /api/*</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
            <p className="font-semibold text-purple-800 mb-1">🟣 Capa de Datos</p>
            <p className="text-purple-700">PostgreSQL + pgvector + LLM externo</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚖️</span> 3. Justificación de Decisiones Técnicas
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Decisión</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Opción elegida</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Alternativas descartadas</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Razón</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">Base de datos</td>
                <td className="py-2 px-3">PostgreSQL</td>
                <td className="py-2 px-3">MongoDB, Neo4j</td>
                <td className="py-2 px-3">Relacional + pgvector en uno solo. Soporta consultas recursivas con CTEs.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">Vector DB</td>
                <td className="py-2 px-3">pgvector</td>
                <td className="py-2 px-3">Pinecone, ChromaDB</td>
                <td className="py-2 px-3">Integrado en PostgreSQL. Evita mantener 2 sistemas.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">LLM</td>
                <td className="py-2 px-3">OpenAI GPT-4 / Claude</td>
                <td className="py-2 px-3">Modelo local (Llama)</td>
                <td className="py-2 px-3">Mejor calidad en español. Fallback a modelo local si hay problemas de coste.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">Despliegue</td>
                <td className="py-2 px-3">Vercel + Railway</td>
                <td className="py-2 px-3">AWS, Render</td>
                <td className="py-2 px-3">Vercel para frontend (ya funciona). Railway para DB + MCP (soporta contenedores).</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">ETL</td>
                <td className="py-2 px-3">Python + Celery</td>
                <td className="py-2 px-3">Cron jobs, Airflow</td>
                <td className="py-2 px-3">Ligero, reutiliza parser GEDCOM existente. Suficiente para el volumen.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DatabaseSection() {
  const tables = [
    {
      name: 'individuals',
      icon: '👤',
      color: 'blue',
      fields: [
        { name: 'id', type: 'UUID PK', key: true },
        { name: 'gedcom_id', type: 'VARCHAR(20) UNIQUE', note: 'ej. @I1@' },
        { name: 'given_name', type: 'VARCHAR(100)', idx: true },
        { name: 'surname', type: 'VARCHAR(100)', idx: true },
        { name: 'full_name', type: 'VARCHAR(200)', idx: true },
        { name: 'sex', type: "CHAR(1) CHECK('M','F')" },
        { name: 'is_living', type: 'BOOLEAN', note: 'privacidad' },
        { name: 'created_at', type: 'TIMESTAMP' },
        { name: 'updated_at', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'families',
      icon: '👨‍👩‍👧',
      color: 'pink',
      fields: [
        { name: 'id', type: 'UUID PK', key: true },
        { name: 'gedcom_id', type: 'VARCHAR(20) UNIQUE' },
        { name: 'husband_id', type: 'UUID FK → individuals' },
        { name: 'wife_id', type: 'UUID FK → individuals' },
        { name: 'marriage_date', type: 'DATE', idx: true },
        { name: 'marriage_place', type: 'VARCHAR(200)' },
        { name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'family_children',
      icon: '🔗',
      color: 'purple',
      fields: [
        { name: 'family_id', type: 'UUID FK PK', key: true },
        { name: 'individual_id', type: 'UUID FK PK', key: true },
        { name: 'birth_order', type: 'INTEGER' },
      ],
    },
    {
      name: 'events',
      icon: '📅',
      color: 'green',
      fields: [
        { name: 'id', type: 'UUID PK', key: true },
        { name: 'individual_id', type: 'UUID FK' },
        { name: 'event_type', type: "ENUM('BIRT','DEAT','MARR',...)", idx: true },
        { name: 'event_date', type: 'DATE', idx: true },
        { name: 'date_raw', type: 'VARCHAR(35)', note: 'formato GEDCOM' },
        { name: 'place', type: 'VARCHAR(200)', idx: true },
        { name: 'description', type: 'TEXT' },
      ],
    },
    {
      name: 'sources',
      icon: '📚',
      color: 'amber',
      fields: [
        { name: 'id', type: 'UUID PK', key: true },
        { name: 'gedcom_id', type: 'VARCHAR(20) UNIQUE' },
        { name: 'title', type: 'VARCHAR(300)' },
        { name: 'author', type: 'VARCHAR(200)' },
        { name: 'publication', type: 'TEXT' },
        { name: 'text', type: 'TEXT' },
      ],
    },
    {
      name: 'embeddings',
      icon: '🧬',
      color: 'rose',
      fields: [
        { name: 'id', type: 'UUID PK', key: true },
        { name: 'entity_type', type: "ENUM('INDI','FAM','EVT')" },
        { name: 'entity_id', type: 'UUID' },
        { name: 'content', type: 'TEXT', note: 'texto original' },
        { name: 'embedding', type: 'VECTOR(1536)', note: 'pgvector' },
        { name: 'model', type: 'VARCHAR(50)', note: 'ej. text-embedding-3' },
        { name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; head: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', head: 'bg-blue-100' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-900', head: 'bg-pink-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900', head: 'bg-purple-100' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', head: 'bg-green-100' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', head: 'bg-amber-100' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900', head: 'bg-rose-100' },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🗄️</span> Módulo 1: Arquitectura de Base de Datos
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Elección: <strong>PostgreSQL 15+ con extensión pgvector</strong>. Justificación: modelo relacional
          maduro + capacidades vectoriales en una sola base de datos. Consultas recursivas mediante CTEs
          (Common Table Expressions) para "todos los antepasados de X".
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((table) => {
            const c = colorMap[table.color];
            return (
              <div key={table.name} className={`${c.bg} rounded-xl border ${c.border} overflow-hidden`}>
                <div className={`${c.head} px-4 py-2 flex items-center gap-2`}>
                  <span className="text-lg">{table.icon}</span>
                  <span className={`font-mono font-bold ${c.text}`}>{table.name}</span>
                </div>
                <div className="p-3 space-y-1">
                  {table.fields.map((f) => (
                    <div key={f.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        {f.key && <span className="text-amber-600">🔑</span>}
                        {f.idx && <span className="text-blue-600" title="Indexado">⚡</span>}
                        <span className="font-mono text-gray-700">{f.name}</span>
                      </div>
                      <span className="font-mono text-gray-500 text-[10px]">{f.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Proceso ETL (Extract → Transform → Load)
        </h3>
        <div className="space-y-3">
          {[
            {
              step: '1. Extract',
              icon: '📥',
              desc: 'Leer archivo GEDCOM original (solo lectura) con parser existente de GedcomMCP.',
              color: 'bg-blue-50 border-blue-200',
            },
            {
              step: '2. Validate',
              icon: '✅',
              desc: 'Validar estructura: cada INDI tiene NAME+SEX, cada FAM tiene HUSB+WIFE. Fechas en formato DD MMM YYYY.',
              color: 'bg-green-50 border-green-200',
            },
            {
              step: '3. Transform',
              icon: '🔄',
              desc: 'Mapear etiquetas GEDCOM a columnas SQL. Normalizar nombres, fechas y lugares. Resolver referencias @I1@ → UUID.',
              color: 'bg-amber-50 border-amber-200',
            },
            {
              step: '4. Load',
              icon: '💾',
              desc: 'INSERT en tablas PostgreSQL con transacciones. Índices automáticos en given_name, surname, event_date, place.',
              color: 'bg-purple-50 border-purple-200',
            },
            {
              step: '5. Embed',
              icon: '🧬',
              desc: 'Generar embeddings de biografías/notas con OpenAI text-embedding-3-small. Guardar en tabla embeddings (pgvector).',
              color: 'bg-rose-50 border-rose-200',
            },
          ].map((item) => (
            <div key={item.step} className={`${item.color} border rounded-xl p-4 flex gap-3`}>
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-bold text-gray-800">{item.step}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔍</span> Consultas Recursivas (Ejemplo SQL)
        </h3>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-green-400 leading-relaxed">
{`-- Todos los antepasados de [INDIVIDUO]
WITH RECURSIVE ancestors AS (
  SELECT i.id, i.full_name, i.sex, 1 AS generation
  FROM individuals i
  WHERE i.gedcom_id = '@I1@'
  
  UNION ALL
  
  SELECT p.id, p.full_name, p.sex, a.generation + 1
  FROM ancestors a
  JOIN family_children fc ON fc.individual_id = a.id
  JOIN families f ON f.id = fc.family_id
  JOIN individuals p ON p.id IN (f.husband_id, f.wife_id)
)
SELECT * FROM ancestors
ORDER BY generation, full_name;

-- Índice para búsquedas rápidas
CREATE INDEX idx_individuals_name_trgm 
ON individuals USING gin (full_name gin_trgm_ops);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function GenAISection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🧠</span> Módulo 2: Inteligencia Artificial Generativa
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Arquitectura <strong>RAG (Retrieval-Augmented Generation)</strong>: la IA responde ÚNICAMENTE
          basándose en datos recuperados de la base de datos. Nunca inventa información.
        </p>

        {/* RAG Flow */}
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-5 border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4">🔄 Flujo RAG Paso a Paso</h4>
          <div className="space-y-3">
            {[
              { n: 1, icon: '💬', title: 'Usuario pregunta', desc: '"¿Cómo se relacionan [A] y [B]?"', color: 'bg-blue-100 border-blue-300' },
              { n: 2, icon: '🔌', title: 'Frontend → API Gateway', desc: 'POST /api/chat con el mensaje del usuario', color: 'bg-indigo-100 border-indigo-300' },
              { n: 3, icon: '🧠', title: 'LLM clasifica intención', desc: 'Determina qué herramientas MCP usar (get_parents, get_relationship, etc.)', color: 'bg-purple-100 border-purple-300' },
              { n: 4, icon: '🔍', title: 'Búsqueda en Vector DB', desc: 'Embedding de la pregunta → búsqueda semántica en pgvector (top-k resultados)', color: 'bg-pink-100 border-pink-300' },
              { n: 5, icon: '📚', title: 'Contexto recuperado', desc: 'Biografías, notas, eventos relevantes inyectados como contexto', color: 'bg-amber-100 border-amber-300' },
              { n: 6, icon: '⚙️', title: 'LLM genera respuesta', desc: 'Prompt de sistema + contexto + pregunta → respuesta en lenguaje natural', color: 'bg-green-100 border-green-300' },
              { n: 7, icon: '✅', title: 'Validación de privacidad', desc: 'Filtro: si [INDIVIDUO] es "Living Person", ocultar datos sensibles', color: 'bg-rose-100 border-rose-300' },
              { n: 8, icon: '📤', title: 'Respuesta al usuario', desc: 'JSON con respuesta + fuentes citadas + confianza del modelo', color: 'bg-teal-100 border-teal-300' },
            ].map((step) => (
              <div key={step.n} className={`${step.color} border rounded-xl p-3 flex items-start gap-3`}>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {step.n}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <span>{step.icon}</span> {step.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📝</span> Prompt de Sistema (Genealogista Experto)
        </h3>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-green-400 leading-relaxed whitespace-pre-wrap">
{`Eres un genealogista experto especializado en el archivo GEDCOM de la
familia [FAMILIA]. Tu misión es consultar, analizar y ayudar a mantener
los datos genealógicos.

REGLAS INQUEBRANTABLES:
1. Responde SOLO con información del contexto proporcionado.
2. Si un dato falta, dilo claramente: "No hay registros de..."
3. NUNCA inventes fechas, nombres o relaciones.
4. Si [INDIVIDUO] tiene is_living=true, usa "Living Person".
5. Cita las fuentes cuando estén disponibles.
6. Mantén ortografía y tildes exactas del archivo original.

CONTEXTO RECUPERADO:
{context_chunks}

PREGUNTA DEL USUARIO:
{user_question}

Responde en español, tono profesional pero cercano.`}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📖</span> Generación de Biografías
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Pipeline automático que toma datos estructurados y redacta una historia coherente:
          </p>
          <ol className="text-xs text-gray-600 space-y-2">
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">1.</span>
              <span>Recuperar eventos del individuo (BIRT, MARR, DEAT)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">2.</span>
              <span>Obtener relaciones (padres, cónyuge, hijos)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">3.</span>
              <span>Ordenar cronológicamente por fecha</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">4.</span>
              <span>LLM redacta narrativa con estilo genealógico</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">5.</span>
              <span>Guardar embedding en Vector DB para búsquedas futuras</span>
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🔎</span> Detección de Inconsistencias
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            La IA analiza los datos y sugiere posibles errores:
          </p>
          <ul className="text-xs text-gray-600 space-y-2">
            <li className="flex gap-2">
              <span>⚠️</span>
              <span>Hijo nacido antes que el padre (evento BIRT hijo &lt; BIRT padre)</span>
            </li>
            <li className="flex gap-2">
              <span>⚠️</span>
              <span>Matrimonio antes de nacimiento</span>
            </li>
            <li className="flex gap-2">
              <span>⚠️</span>
              <span>Edad de matrimonio &lt; 14 años o &gt; 100 años</span>
            </li>
            <li className="flex gap-2">
              <span>⚠️</span>
              <span>Fechas con formato GEDCOM inválido</span>
            </li>
            <li className="flex gap-2">
              <span>⚠️</span>
              <span>Individuos sin familia asignada (huérfanos)</span>
            </li>
            <li className="flex gap-2">
              <span>⚠️</span>
              <span>Familias sin hijos ni cónyuges</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DeploySection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🚀</span> Módulo 3: Integración y Despliegue
        </h3>

        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-5 border border-gray-200 mb-6">
          <h4 className="font-bold text-gray-800 mb-3">🗺️ Topología de Despliegue</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-4 border-2 border-amber-300">
              <p className="font-bold text-amber-800 mb-2">🔶 Vercel (EXISTENTE)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Frontend React</li>
                <li>• Edge Functions /api/*</li>
                <li>• Dominio principal</li>
                <li>• <strong>No se modifica</strong></li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
              <p className="font-bold text-blue-800 mb-2">🔷 Railway (NUEVO)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• PostgreSQL + pgvector</li>
                <li>• MCP Server (contenedor)</li>
                <li>• ETL Worker (Celery)</li>
                <li>• Subdominio api.*</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
              <p className="font-bold text-purple-800 mb-2">🟣 Externo (APIs)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• OpenAI API (LLM + embeddings)</li>
                <li>• Alternativa: Anthropic Claude</li>
                <li>• Fallback: Ollama local</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔐</span> Variables de Entorno (NUNCA en código)
        </h3>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-green-400 leading-relaxed">
{`# .env (NUNCA commitear)
# === Base de datos ===
DATABASE_URL=postgresql://user:***@host:5432/gedcom
PGVECTOR_ENABLED=true

# === LLM ===
OPENAI_API_KEY=sk-***
OPENAI_MODEL=gpt-4o
EMBEDDING_MODEL=text-embedding-3-small

# === MCP Server ===
MCP_SERVER_URL=https://api.midominio.com
MCP_PORT=8000

# === Seguridad ===
JWT_SECRET=***
CORS_ORIGINS=https://midominio.vercel.app
RATE_LIMIT_PER_MIN=60

# === Privacidad ===
REDACT_LIVING_PERSONS=true
ALLOW_PII_EXPORT=false`}
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🛡️</span> Estrategia de Despliegue (Sin romper Vercel)
        </h3>
        <div className="space-y-3">
          {[
            {
              phase: 'Fase 1: Rama feature',
              icon: '🌿',
              desc: 'Crear rama feature/db-genai-integration. Todo el código nuevo va en /v2 o /core. La rama main sigue funcionando en producción.',
            },
            {
              phase: 'Fase 2: Infraestructura DB',
              icon: '🗄️',
              desc: 'Desplegar PostgreSQL + pgvector en Railway. Ejecutar migraciones. Cargar datos iniciales con ETL desde GEDCOM existente.',
            },
            {
              phase: 'Fase 3: MCP Server v2',
              icon: '⚙️',
              desc: 'Nueva versión del MCP Server que lee de PostgreSQL en lugar del archivo plano. Mismas herramientas MCP (interfaz compatible).',
            },
            {
              phase: 'Fase 4: API Gateway',
              icon: '🔌',
              desc: 'Edge Functions en Vercel bajo /api/v2/*. El frontend actual sigue usando /api/* sin cambios.',
            },
            {
              phase: 'Fase 5: Chatbot con LLM real',
              icon: '🧠',
              desc: 'Nueva ruta /chat con chatbot conectado al LLM vía RAG. El chatbot actual (simulado) permanece intacto.',
            },
            {
              phase: 'Fase 6: Feature flag',
              icon: '🚩',
              desc: 'Activar nuevas funciones gradualmente. Si algo falla, rollback inmediato a la versión anterior sin afectar usuarios.',
            },
          ].map((item) => (
            <div key={item.phase} className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-bold text-amber-900">{item.phase}</p>
                <p className="text-sm text-gray-700 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📁</span> Estructura de Carpetas Propuesta
        </h3>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-green-400 leading-relaxed">
{`proyecto-gedcom/
├── /                    # Frontend actual (NO TOCAR)
│   ├── src/
│   ├── dist/
│   └── vercel.json
│
├── /v2                  # NUEVA carpeta para la v2
│   ├── /core            # Lógica compartida
│   │   ├── db/          # Esquemas, migraciones, queries
│   │   ├── etl/         # Parser GEDCOM → DB
│   │   └── mcp/         # MCP Server v2
│   │
│   ├── /genai           # Módulo IA
│   │   ├── rag/         # Pipeline RAG
│   │   ├── prompts/     # Prompts de sistema
│   │   ├── embeddings/  # Generación y búsqueda
│   │   └── validators/  # Detección inconsistencias
│   │
│   └── /api             # Edge Functions Vercel
│       ├── /v2/         # Nuevos endpoints
│       └── /chat/       # Chatbot con LLM
│
├── .env.example         # Plantilla (sin valores reales)
└── README.md`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function QuestionsSection() {
  const questions = [
    {
      category: '🗄️ Base de Datos',
      items: [
        '¿PostgreSQL es tu preferencia, o prefieres explorar Neo4j (grafos) para relaciones complejas?',
        '¿Quieres auto-alojar la DB o usar un servicio gestionado (Supabase, Neon, Railway)?',
        '¿Cuántos individuos estimas que tendrá el archivo en el futuro? (afecta decisiones de escalado)',
        '¿Necesitas replicación de lectura o backup automático?',
      ],
    },
    {
      category: '🧠 GenAI',
      items: [
        '¿Qué LLM prefieres? OpenAI GPT-4o (mejor calidad), Claude (más barato), o modelo local (Llama 3)?',
        '¿Quieres que las biografías se generen bajo demanda o se pre-calculen y cacheen?',
        '¿Necesitas soporte multi-idioma (español + inglés) o solo español?',
        '¿Quieres streaming de respuestas (tipo ChatGPT) o respuesta completa?',
      ],
    },
    {
      category: '🔐 Seguridad y Privacidad',
      items: [
        '¿Necesitas autenticación de usuarios (login) o el chatbot es público?',
        '¿Quién puede exportar datos? ¿Solo administradores?',
        '¿Quieres auditoría de consultas (log de quién preguntó qué)?',
        '¿Cumplimiento GDPR/LOPD necesario? (afecta cómo manejamos "Living Person")',
      ],
    },
    {
      category: '🚀 Despliegue',
      items: [
        '¿Prefieres mantener todo en Vercel o estás abierto a Railway/Render para la DB?',
        '¿Tienes presupuesto para APIs de LLM? (OpenAI cuesta ~$0.01-0.05 por consulta)',
        '¿Necesitas CI/CD automático (GitHub Actions) o despliegue manual?',
        '¿Quieres monitoreo (logs, métricas, alertas) desde el día 1?',
      ],
    },
    {
      category: '📋 Funcionalidad',
      items: [
        '¿Qué es prioritario: DB primero o GenAI primero?',
        '¿Quieres importar/exportar GEDCOM desde la UI?',
        '¿Necesitas colaboración multi-usuario (varios editores del árbol)?',
        '¿Integración con otros servicios (Ancestry, MyHeritage) en el futuro?',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
          <span>❓</span> 6. Preguntas para Aclarar Antes de Implementar
        </h3>
        <p className="text-sm text-amber-800 mb-4">
          Como arquitecto, <strong>no escribiré código hasta que respondas estas preguntas</strong>.
          Cada respuesta afectará decisiones técnicas críticas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((block) => (
          <div key={block.category} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3">{block.category}</h4>
            <ul className="space-y-2">
              {block.items.map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-amber-600 font-bold shrink-0">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
          <span>✅</span> Próximos Pasos Sugeridos
        </h3>
        <ol className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="font-bold text-green-700">1.</span>
            <span>Revisa esta propuesta y marca qué módulos son prioritarios.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-green-700">2.</span>
            <span>Responde las preguntas de arriba (especialmente DB y LLM).</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-green-700">3.</span>
            <span>Confirma el presupuesto aproximado para APIs (LLM + DB gestionada).</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-green-700">4.</span>
            <span>Una vez aprobado, crearé la rama <code className="bg-white px-1.5 py-0.5 rounded text-xs">feature/db-genai-integration</code> y empezaré por el módulo que elijas.</span>
          </li>
        </ol>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>📊</span> Estimación de Esfuerzo
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Módulo</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Esfuerzo</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Dependencias</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Riesgo</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">🗄️ DB + ETL</td>
                <td className="py-2 px-3">~2-3 días</td>
                <td className="py-2 px-3">Ninguna</td>
                <td className="py-2 px-3"><span className="text-green-600">Bajo</span></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">🧠 RAG + LLM</td>
                <td className="py-2 px-3">~3-4 días</td>
                <td className="py-2 px-3">Requiere DB</td>
                <td className="py-2 px-3"><span className="text-amber-600">Medio</span></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">📖 Biografías auto</td>
                <td className="py-2 px-3">~1-2 días</td>
                <td className="py-2 px-3">Requiere RAG</td>
                <td className="py-2 px-3"><span className="text-green-600">Bajo</span></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">🔎 Detección errores</td>
                <td className="py-2 px-3">~1-2 días</td>
                <td className="py-2 px-3">Requiere DB</td>
                <td className="py-2 px-3"><span className="text-green-600">Bajo</span></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">🚀 Despliegue</td>
                <td className="py-2 px-3">~1 día</td>
                <td className="py-2 px-3">Todo lo anterior</td>
                <td className="py-2 px-3"><span className="text-amber-600">Medio</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Total estimado: <strong>8-12 días de trabajo</strong>, comenzando por DB + ETL (base de todo lo demás).
        </p>
      </div>
    </div>
  );
}

export default function ArchitectureView() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏗️</span>
          <div>
            <h2 className="text-2xl font-bold">Propuesta Arquitectónica</h2>
            <p className="text-slate-300 text-sm">Integración de Base de Datos + GenAI en GEDCOM MCP</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full text-xs border border-amber-500/30">
            🛡️ No altera lo existente
          </span>
          <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-xs border border-blue-500/30">
            📋 Requiere aprobación
          </span>
          <span className="bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-xs border border-green-500/30">
            🌿 Rama feature separada
          </span>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-2xl shadow-sm p-2 flex flex-wrap gap-2 border border-gray-100">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              activeSection === s.id
                ? 'bg-slate-800 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mr-1">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSection === 'overview' && <OverviewSection />}
      {activeSection === 'db' && <DatabaseSection />}
      {activeSection === 'genai' && <GenAISection />}
      {activeSection === 'deploy' && <DeploySection />}
      {activeSection === 'questions' && <QuestionsSection />}
    </div>
  );
}
