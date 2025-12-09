import React, { useState } from 'react';
import Card from './components/Card';
import Generator from './components/Generator';
import { BoardItem, ItemType } from './types';
import { INITIAL_ITEMS } from './constants';
import { LayoutGrid, Plus, Search, Hexagon } from 'lucide-react';

const App = () => {
  const [items, setItems] = useState<BoardItem[]>(INITIAL_ITEMS);
  const [filter, setFilter] = useState<'ALL' | ItemType>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddItem = (item: BoardItem) => {
    setItems(prev => [item, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'ALL' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-slate-200 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Hexagon className="text-yellow-400 fill-yellow-400/20" size={32} strokeWidth={1.5} />
            <div>
              <h1 className="text-2xl font-bold tracking-[0.2em] text-white uppercase">Warframe Oracle</h1>
              <p className="text-xs text-slate-400 tracking-widest uppercase">Vision Board & Lore Engine</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher des archives..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-sm py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            
            <div className="flex bg-slate-800 rounded-sm p-1 border border-slate-700">
              {(['ALL', ItemType.THEORY, ItemType.UPDATE, ItemType.IMAGE] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 text-xs font-bold uppercase transition-all rounded-sm ${filter === type ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {type === 'ALL' ? 'Tout' : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Board */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-600 border-2 border-dashed border-slate-800 rounded-lg">
            <LayoutGrid size={48} className="mb-4 opacity-50" />
            <p className="text-lg uppercase tracking-widest">Aucune donnée trouvée</p>
            <p className="text-sm">Interrogez le Néant pour générer du contenu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
            {filteredItems.map(item => (
              <Card key={item.id} item={item} onDelete={handleDeleteItem} />
            ))}
          </div>
        )}
      </main>

      {/* Generator Footer */}
      <Generator onAdd={handleAddItem} />

    </div>
  );
};

export default App;
