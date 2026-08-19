import React, { useEffect, useState } from 'react';
import { CircuitComponent, ComplementaryPair } from '../types';
import { CircuitSymbol } from './CircuitSymbols';
import { Zap, Sparkles, BookOpen } from 'lucide-react';

interface MatchedLearningBannerProps {
  lastMatched: CircuitComponent | ComplementaryPair | null;
  combo: number;
}

export const MatchedLearningBanner: React.FC<MatchedLearningBannerProps> = ({
  lastMatched,
  combo,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastMatched) {
      setVisible(true);
      const timer = setTimeout(() => {
        // Keep visible longer if user wants to read or till next match
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastMatched]);

  if (!lastMatched) {
    return (
      <div className="w-full max-w-4xl mx-auto rounded-xl bg-slate-900/60 border border-slate-800 p-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Lật 2 thẻ giống nhau hoặc ghép đúng cặp bổ sung để mở khóa kiến thức linh kiện mạch điện!</span>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] text-slate-500">Mạch sẵn sàng</span>
      </div>
    );
  }

  const isCircuitComp = 'realWorldUse' in lastMatched;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-cyan-500/50 p-3 sm:p-3.5 shadow-lg shadow-cyan-950/40 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left icon + info */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg bg-slate-950 border flex items-center justify-center p-1 flex-shrink-0 shadow-inner"
            style={{ borderColor: lastMatched.color }}
          >
            {isCircuitComp ? (
              <CircuitSymbol name={lastMatched.id} className="w-10 h-7" color={lastMatched.color} />
            ) : (
              <CircuitSymbol name={(lastMatched as ComplementaryPair).itemA.icon} className="w-10 h-7" color={lastMatched.color} />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-100 text-sm sm:text-base">
                {isCircuitComp
                  ? (lastMatched as CircuitComponent).name
                  : `${(lastMatched as ComplementaryPair).itemA.name} ⟷ ${(lastMatched as ComplementaryPair).itemB.name}`}
              </span>
              {combo > 1 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm animate-pulse">
                  ⚡ COMBO x{combo}!
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 sm:line-clamp-1">
              {isCircuitComp
                ? (lastMatched as CircuitComponent).description
                : (lastMatched as ComplementaryPair).relationExplanation}
            </p>
          </div>
        </div>

        {/* Right side: Formula or Real World application */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          {isCircuitComp && (lastMatched as CircuitComponent).formula && (
            <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300 flex items-center gap-1.5 whitespace-nowrap">
              <Zap className="w-3 h-3 text-amber-400" />
              {(lastMatched as CircuitComponent).formula}
            </div>
          )}
          {isCircuitComp && (lastMatched as CircuitComponent).unit && (
            <div className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 whitespace-nowrap">
              {(lastMatched as CircuitComponent).unit}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
