import React from 'react';
import { GameDifficulty, GameMode, GameStats } from '../types';
import {
  Volume2,
  VolumeX,
  RefreshCw,
  BookOpen,
  Zap,
  Clock,
  Target,
  Trophy,
  Flame,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GameHeaderProps {
  difficulty: GameDifficulty;
  onDifficultyChange: (diff: GameDifficulty) => void;
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  stats: GameStats;
  bestScore: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
  onOpenHandbook: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  difficulty,
  onDifficultyChange,
  mode,
  onModeChange,
  stats,
  bestScore,
  isMuted,
  onToggleMute,
  onRestart,
  onOpenHandbook,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <header className="w-full max-w-5xl mx-auto flex flex-col gap-3">
      {/* Top Navbar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md shadow-xl shadow-cyan-950/40">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20 flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 fill-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-100 flex items-center gap-2">
              Circuit Match
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                v2.0
              </span>
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">
              Trí nhớ linh kiện & Mạch điện tử
            </p>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Handbook Button */}
          <button
            id="btn-handbook"
            onClick={() => {
              soundManager.playClick();
              onOpenHandbook();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium transition-all active:scale-95"
            title="Mở sổ tay linh kiện"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Sổ tay linh kiện</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={onToggleMute}
            className={`p-2 rounded-xl border text-xs transition-all active:scale-95 ${
              isMuted
                ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 shadow-sm'
            }`}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Restart Game */}
          <button
            id="btn-restart-game"
            onClick={() => {
              soundManager.playClick();
              onRestart();
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/25 transition-all active:scale-95"
            title="Chơi lại ván mới"
          >
            <RefreshCw className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Ván mới</span>
          </button>
        </div>
      </div>

      {/* Mode & Difficulty Selector Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {/* Modes */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          <button
            id="mode-standard"
            onClick={() => onModeChange('standard')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center truncate ${
              mode === 'standard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ghép Đôi Linh Kiện
          </button>
          <button
            id="mode-complementary"
            onClick={() => onModeChange('complementary')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center truncate ${
              mode === 'complementary'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Cặp Bổ Sung (Bonus)
          </button>
          <button
            id="mode-timeAttack"
            onClick={() => onModeChange('timeAttack')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center truncate ${
              mode === 'timeAttack'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⏱️ Đua Giờ
          </button>
        </div>

        {/* Grid Sizes */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
          <span className="text-[11px] font-mono text-slate-500 px-2 hidden sm:inline">Lưới:</span>
          <button
            id="grid-4x4"
            onClick={() => onDifficultyChange('4x4')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
              difficulty === '4x4'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4x4 (16 thẻ)
          </button>
          <button
            id="grid-4x6"
            onClick={() => onDifficultyChange('4x6')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
              difficulty === '4x6'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4x6 (24 thẻ)
          </button>
          <button
            id="grid-6x6"
            onClick={() => onDifficultyChange('6x6')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
              difficulty === '6x6'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            6x6 (36 thẻ)
          </button>
        </div>
      </div>

      {/* Real-time Dashboard Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900/80 border border-slate-800/80 rounded-xl p-2 sm:p-2.5">
        {/* Score */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Điểm số</span>
            <span className="text-sm sm:text-base font-mono font-bold text-amber-400">
              {stats.score.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Combo */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
            stats.combo > 1
              ? 'bg-amber-500/15 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
              : 'bg-slate-950/70 border-slate-800'
          }`}
        >
          <Flame
            className={`w-4 h-4 flex-shrink-0 ${
              stats.combo > 1 ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-500'
            }`}
          />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Combo Streak</span>
            <span
              className={`text-sm sm:text-base font-mono font-bold ${
                stats.combo > 1 ? 'text-amber-300' : 'text-slate-400'
              }`}
            >
              x{stats.combo || 1}
            </span>
          </div>
        </div>

        {/* Moves / Pair Progress */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <Target className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-mono">
              Tiến độ ({stats.moves} lượt)
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-cyan-300">
              {stats.matchedPairs} / {stats.totalPairs} cặp
            </span>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-mono">
              {mode === 'timeAttack' ? 'Còn lại' : 'Thời gian'}
            </span>
            <span
              className={`text-sm sm:text-base font-mono font-bold ${
                mode === 'timeAttack' && (stats.timeRemaining || 0) < 15
                  ? 'text-rose-400 animate-pulse'
                  : 'text-emerald-400'
              }`}
            >
              {mode === 'timeAttack'
                ? formatTime(stats.timeRemaining || 0)
                : formatTime(stats.timeSeconds)}
            </span>
          </div>
        </div>

        {/* Highscore */}
        <div className="col-span-2 sm:col-span-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Kỷ lục</span>
            <span className="text-sm sm:text-base font-mono font-bold text-yellow-400">
              {bestScore ? bestScore.toLocaleString() : '—'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
