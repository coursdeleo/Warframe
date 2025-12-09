import React, { useState } from 'react';
import { Loader2, Zap } from 'lucide-react';
import { generateWarframeContent } from '../services/geminiService';
import { BoardItem, ItemType } from '../types';
import { v4 as uuidv4 } from 'uuid'; // We'll simulate UUID for now or use Date.now() if no library
// Actually, using Date.now() + random is safer without external deps, but let's just use random string

interface GeneratorProps {
  onAdd: (item: BoardItem) => void;
}

const Generator: React.FC<GeneratorProps> = ({ onAdd }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'lore' | 'update'>('lore');

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    const content = await generateWarframeContent(topic, mode);
    
    const newItem: BoardItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: mode === 'lore' ? ItemType.THEORY : ItemType.UPDATE,
      title: mode === 'lore' ? `Théorie: ${topic}` : `Concept MAJ: ${topic}`,
      content: content,
      tags: ['IA', 'Généré', 'Oracle'],
      gridSpan: content.length > 200 ? 'col-span-2' : 'col-span-1'
    };

    onAdd(newItem);
    setLoading(false);
    setTopic('');
  };

  return (
    <div className="bg-slate-900/50 border-t border-slate-700 p-4 sticky bottom-0 z-10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        
        <div className="flex gap-2">
           <button 
            onClick={() => setMode('lore')}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-all ${mode === 'lore' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'border-slate-700 text-slate-500 hover:border-purple-500/50'}`}
          >
            Lore & Théories
          </button>
          <button 
            onClick={() => setMode('update')}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-all ${mode === 'update' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'border-slate-700 text-slate-500 hover:border-yellow-500/50'}`}
          >
            Concepts MAJ
          </button>
        </div>

        <div className="flex-1 w-full relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={mode === 'lore' ? "Ex: Le lien entre Albrecht et le Néant..." : "Ex: Une Warframe basée sur le temps..."}
            className="w-full bg-slate-800 border border-slate-600 text-white px-4 py-2 focus:outline-none focus:border-cyan-400 transition-colors placeholder-slate-500 font-light"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <div className="absolute right-0 top-0 h-full w-2 bg-cyan-400 opacity-20"></div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="w-full md:w-auto px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all wf-card-clip"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
          <span>Transférer</span>
        </button>
      </div>
    </div>
  );
};

export default Generator;
