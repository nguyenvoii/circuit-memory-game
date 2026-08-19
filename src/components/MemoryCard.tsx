import React from 'react';
import { GameCard } from '../types';
import { CircuitSymbol } from './CircuitSymbols';
import { Cpu, Zap } from 'lucide-react';

interface MemoryCardProps {
  card: GameCard;
  onClick: () => void;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ card, onClick, disabled, size }) => {
  const isFlipped = card.isFlipped || card.isMatched;

  // Sizing variants for 4x4, 4x6, 6x6 on mobile/desktop
  const sizeClasses = {
    sm: 'h-20 sm:h-24 md:h-28 text-xs', // for 6x6
    md: 'h-24 sm:h-28 md:h-32 text-xs sm:text-sm', // for 4x6
    lg: 'h-28 sm:h-36 md:h-40 text-sm md:text-base', // for 4x4
  }[size];

  const symbolSize = {
    sm: 'w-10 h-7 sm:w-12 sm:h-9',
    md: 'w-12 h-8 sm:w-14 sm:h-10',
    lg: 'w-16 h-10 sm:w-20 sm:h-14',
  }[size];

  return (
    <div
      id={`card-${card.uid}`}
      onClick={() => {
        if (!disabled && !card.isFlipped && !card.isMatched) {
          onClick();
        }
      }}
      className={`relative w-full ${sizeClasses} perspective-1000 select-none cursor-pointer transition-transform duration-200 active:scale-95 ${
        card.isMatched ? 'cursor-default pointer-events-none' : ''
      }`}
    >
      <div
        className={`w-full h-full duration-500 transform-style-3d transition-all ease-out rounded-xl ${
          isFlipped ? 'rotate-y-180' : ''
        } ${
          card.isMatched
            ? 'opacity-0 scale-90 translate-y-1 transition-all duration-700 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        {/* CARD FRONT: PCB Chip Pattern (Hidden state) */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border border-cyan-900/60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-md hover:border-cyan-500/80 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] flex flex-col items-center justify-center p-2 transition-colors overflow-hidden group`}
        >
          {/* Decorative PCB Traces */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none pcb-circuit-pattern" />
          
          {/* Corner gold solder pads */}
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/60 border border-amber-300/80" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/60 border border-amber-300/80" />
          <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/60 border border-amber-300/80" />
          <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/60 border border-amber-300/80" />

          {/* Microchip center core */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-slate-800/80 border border-cyan-500/30 flex items-center justify-center shadow-inner group-hover:border-cyan-400 group-hover:scale-105 transition-all">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400/70 group-hover:text-cyan-300 transition-colors" />
            </div>
            <span className="mt-1 text-[10px] font-mono tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors uppercase">
              CIRCUIT
            </span>
          </div>

          {/* Glowing bottom edge indicator */}
          <div className="absolute bottom-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent group-hover:via-cyan-400 transition-all" />
        </div>

        {/* CARD BACK: Component Symbol and Details (Revealed state) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-slate-900/95 border shadow-xl flex flex-col items-center justify-between p-2 overflow-hidden transition-all"
          style={{
            borderColor: card.color || '#06b6d4',
            boxShadow: `0 0 20px ${card.glowColor || 'rgba(6, 182, 212, 0.3)'}, inset 0 0 15px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Subtle background glow radial */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${card.color || '#06b6d4'}, transparent 70%)`,
            }}
          />

          {/* Top header: Category or Unit badge */}
          <div className="w-full flex items-center justify-between z-10">
            <span
              className="text-[9px] sm:text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border border-white/10 bg-slate-950/80 text-slate-300 truncate max-w-[85%]"
              title={card.categoryLabel || card.unit}
            >
              {card.unit ? card.unit : (card.categoryLabel || 'Linh kiện')}
            </span>
            <Zap className="w-3 h-3 flex-shrink-0" style={{ color: card.color }} />
          </div>

          {/* Center Schematic SVG Icon */}
          <div className="my-auto flex items-center justify-center z-10 py-1">
            <CircuitSymbol
              name={card.symbolIcon}
              className={`${symbolSize} transition-transform drop-shadow-[0_0_8px_currentColor]`}
              color={card.color || '#06b6d4'}
            />
          </div>

          {/* Bottom Label */}
          <div className="w-full text-center z-10">
            <div
              className="font-semibold text-slate-100 leading-tight truncate px-1"
              title={card.name}
            >
              {card.name}
            </div>
            {card.subtext && (
              <div className="text-[9px] sm:text-[10px] text-slate-400 leading-tight truncate mt-0.5">
                {card.subtext}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
