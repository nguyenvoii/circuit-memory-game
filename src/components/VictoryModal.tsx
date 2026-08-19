import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Star, Clock, Zap, Target, BookOpen } from 'lucide-react';
import { GameStats } from '../types';

interface VictoryModalProps {
  isOpen: boolean;
  stats: GameStats;
  onRestart: () => void;
  onOpenHandbook: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  stats,
  onRestart,
  onOpenHandbook,
}) => {
  useEffect(() => {
    if (isOpen && stats.isWon) {
      // Confetti burst
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [isOpen, stats.isWon]);

  if (!isOpen) return null;

  // Grade calculation
  const getGrade = () => {
    const ratio = stats.moves / stats.totalPairs;
    if (ratio <= 1.4) return { grade: 'S', title: 'Kỹ Sư Điện Tử Trưởng', color: 'text-amber-400 border-amber-400/50 bg-amber-400/10' };
    if (ratio <= 1.8) return { grade: 'A', title: 'Kỹ Thuật Viên Cao Cấp', color: 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10' };
    if (ratio <= 2.3) return { grade: 'B', title: 'Thợ Hàn Mạch Lành Nghề', color: 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10' };
    return { grade: 'C', title: 'Tập Sự Thiết Kế Mạch', color: 'text-slate-300 border-slate-600 bg-slate-800/40' };
  };

  const gradeInfo = getGrade();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 p-6 text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Victory Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-4 animate-bounce">
          <Trophy className="w-8 h-8 text-slate-950 stroke-[2.5]" />
        </div>

        <h2 className="text-2xl font-black text-slate-100 tracking-tight">
          Hoàn Thành Mạch Điện!
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Bạn đã ghép đúng toàn bộ {stats.totalPairs} cặp linh kiện thành công
        </p>

        {/* Rank Badge */}
        <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${gradeInfo.color}`}>
          <Star className="w-4 h-4 fill-current" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Xếp hạng: Hạng {gradeInfo.grade} • {gradeInfo.title}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Tổng điểm
            </div>
            <div className="text-xl font-mono font-bold text-amber-400">
              {stats.score.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Thời gian
            </div>
            <div className="text-xl font-mono font-bold text-cyan-400">
              {formatTime(stats.timeSeconds)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              Số lượt lật
            </div>
            <div className="text-xl font-mono font-bold text-emerald-400">
              {stats.moves} lượt
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              Combo cao nhất
            </div>
            <div className="text-xl font-mono font-bold text-purple-400">
              x{stats.maxCombo}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-6">
          <button
            id="btn-victory-restart"
            onClick={onRestart}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4 stroke-[2.5]" />
            Chơi ván mới
          </button>
          <button
            id="btn-victory-handbook"
            onClick={onOpenHandbook}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Xem sổ tay
          </button>
        </div>
      </div>
    </div>
  );
};
