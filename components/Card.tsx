import React from 'react';
import { BoardItem, ItemType } from '../types';
import { Trash2, ExternalLink, Zap, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';

interface CardProps {
  item: BoardItem;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ item, onDelete }) => {
  const getBorderColor = () => {
    switch (item.type) {
      case ItemType.THEORY: return 'border-purple-500';
      case ItemType.UPDATE: return 'border-yellow-500'; // Prime Gold
      case ItemType.IMAGE: return 'border-cyan-400';
      default: return 'border-slate-600';
    }
  };

  const getIcon = () => {
    switch (item.type) {
      case ItemType.THEORY: return <Sparkles size={16} className="text-purple-400" />;
      case ItemType.UPDATE: return <Zap size={16} className="text-yellow-400" />;
      case ItemType.IMAGE: return <ImageIcon size={16} className="text-cyan-400" />;
      default: return <FileText size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className={`relative group transition-all duration-300 hover:-translate-y-1 ${item.gridSpan || 'col-span-1'}`}>
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent via-${getBorderColor().replace('border-', '')} to-transparent opacity-20 group-hover:opacity-60 blur transition duration-500`}></div>
      
      <div className={`relative h-full bg-slate-900/90 backdrop-blur-md border ${getBorderColor()} wf-card-clip p-5 flex flex-col justify-between overflow-hidden`}>
        
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {getIcon()}
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">{item.type}</span>
          </div>
          <button 
            onClick={() => onDelete(item.id)}
            className="text-slate-600 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Image Content */}
        {item.imageUrl && (
          <div className="mb-4 rounded-sm overflow-hidden border border-slate-700 relative h-40 w-full">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </div>
        )}

        {/* Text Content */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2 font-rajdhani tracking-wide">{item.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {item.content}
          </p>
        </div>

        {/* Footer / Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-slate-800 border border-slate-700 text-slate-400 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10"></div>
      </div>
    </div>
  );
};

export default Card;
