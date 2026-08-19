import React, { useState } from 'react';
import { CIRCUIT_COMPONENTS, COMPLEMENTARY_PAIRS } from '../data/circuitComponents';
import { CircuitSymbol } from './CircuitSymbols';
import { BookOpen, X, Sparkles, Zap, Shield, Eye, Layers } from 'lucide-react';

interface HandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandbookModal: React.FC<HandbookModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'components' | 'complementary'>('components');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const filteredComponents = CIRCUIT_COMPONENTS.filter((comp) => {
    const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.enName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Sổ Tay Linh Kiện & Mạch Điện
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Kiến thức chuẩn
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tìm hiểu công dụng, ký hiệu sơ đồ, định luật và ứng dụng thực tế
              </p>
            </div>
          </div>
          <button
            id="btn-close-handbook"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Filter Bar */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800">
            <button
              id="tab-components"
              onClick={() => setTab('components')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                tab === 'components'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              18 Linh Kiện Mạch
            </button>
            <button
              id="tab-complementary"
              onClick={() => setTab('complementary')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                tab === 'complementary'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cặp Bổ Sung & Đối Ngẫu
            </button>
          </div>

          {tab === 'components' && (
            <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Tìm linh kiện, công thức..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-48"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {tab === 'components' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComponents.map((comp) => (
                <div
                  key={comp.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-14 h-14 rounded-lg bg-slate-900 border flex items-center justify-center p-1.5 flex-shrink-0"
                          style={{ borderColor: comp.color }}
                        >
                          <CircuitSymbol name={comp.id} className="w-11 h-8" color={comp.color} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-100">{comp.name}</h3>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {comp.symbol}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{comp.enName}</p>
                          <p className="text-[11px] font-mono text-cyan-400 mt-0.5">
                            Đơn vị: {comp.unit || '—'}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 bg-slate-900 text-slate-400">
                        {comp.categoryLabel}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {comp.description}
                    </p>

                    {/* Formula */}
                    {comp.formula && (
                      <div className="mt-2.5 p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="text-[11px] font-mono text-amber-300">
                          {comp.formula}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Real-world application */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px] text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300">Ứng dụng:</strong> {comp.realWorldUse}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>Chế độ Ghép Cặp Bổ Sung:</strong> Bạn sẽ ghép các khái niệm, linh kiện đối ngẫu hoặc 2 trạng thái hoạt động của cùng một phần tử mạch điện.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMPLEMENTARY_PAIRS.map((pair) => (
                  <div
                    key={pair.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-amber-500/40 transition-all space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {/* Item A */}
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
                        <CircuitSymbol name={pair.itemA.icon} className="w-12 h-8" color={pair.color} />
                        <div className="text-xs font-semibold text-slate-200 mt-1">
                          {pair.itemA.name}
                        </div>
                        <div className="text-[10px] text-slate-400">{pair.itemA.subtext}</div>
                      </div>

                      {/* Item B */}
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center flex flex-col items-center">
                        <CircuitSymbol name={pair.itemB.icon} className="w-12 h-8" color={pair.color} />
                        <div className="text-xs font-semibold text-slate-200 mt-1">
                          {pair.itemB.name}
                        </div>
                        <div className="text-[10px] text-slate-400">{pair.itemB.subtext}</div>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300">
                      <span className="text-amber-400 font-semibold">Mối quan hệ: </span>
                      {pair.relationExplanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Tổng hợp theo tiêu chuẩn sơ đồ mạch IEC & IEEE</span>
          <button
            id="btn-close-handbook-footer"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors"
          >
            Đã hiểu, tiếp tục chơi
          </button>
        </div>
      </div>
    </div>
  );
};
