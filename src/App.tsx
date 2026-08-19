import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameDifficulty, GameMode, GameStats, GameCard, CircuitComponent, ComplementaryPair } from './types';
import { CIRCUIT_COMPONENTS, COMPLEMENTARY_PAIRS } from './data/circuitComponents';
import { MemoryCard } from './components/MemoryCard';
import { GameHeader } from './components/GameHeader';
import { MatchedLearningBanner } from './components/MatchedLearningBanner';
import { HandbookModal } from './components/HandbookModal';
import { VictoryModal } from './components/VictoryModal';
import { soundManager } from './utils/audio';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [difficulty, setDifficulty] = useState<GameDifficulty>('4x4');
  const [mode, setMode] = useState<GameMode>('standard');
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [lastMatched, setLastMatched] = useState<CircuitComponent | ComplementaryPair | null>(null);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});

  const [stats, setStats] = useState<GameStats>({
    score: 0,
    moves: 0,
    combo: 0,
    maxCombo: 0,
    matchedPairs: 0,
    totalPairs: 8,
    timeSeconds: 0,
    timeRemaining: 90,
    isWon: false,
    isGameOver: false,
  });

  const timerRef = useRef<number | null>(null);

  // Load high scores from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('circuit_match_best_scores');
      if (saved) {
        setBestScores(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Total cards based on difficulty
  const getCardCount = useCallback((diff: GameDifficulty) => {
    switch (diff) {
      case '4x4':
        return 16;
      case '4x6':
        return 24;
      case '6x6':
        return 36;
      default:
        return 16;
    }
  }, []);

  // Initialize and shuffle the board
  const initializeGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const totalCards = getCardCount(difficulty);
    const pairsCount = totalCards / 2;
    let generatedCards: GameCard[] = [];

    if (mode === 'complementary') {
      // Pick complementary pairs first
      const shuffledCompPairs = [...COMPLEMENTARY_PAIRS].sort(() => Math.random() - 0.5);
      const chosenPairs = shuffledCompPairs.slice(0, pairsCount);

      // If grid needs more pairs than available complementary pairs, fill with standard components
      if (chosenPairs.length < pairsCount) {
        const remainingNeeded = pairsCount - chosenPairs.length;
        const extraComps = [...CIRCUIT_COMPONENTS]
          .sort(() => Math.random() - 0.5)
          .slice(0, remainingNeeded);

        extraComps.forEach((comp) => {
          // Card 1
          generatedCards.push({
            uid: `${comp.id}-1-${Math.random()}`,
            matchId: comp.id,
            name: comp.name,
            subtext: comp.formula,
            symbolIcon: comp.id,
            unit: comp.unit,
            color: comp.color,
            glowColor: comp.glowColor,
            categoryLabel: comp.categoryLabel,
            details: comp,
            isFlipped: false,
            isMatched: false,
          });
          // Card 2
          generatedCards.push({
            uid: `${comp.id}-2-${Math.random()}`,
            matchId: comp.id,
            name: comp.name,
            subtext: comp.symbol,
            symbolIcon: comp.id,
            unit: comp.unit,
            color: comp.color,
            glowColor: comp.glowColor,
            categoryLabel: comp.categoryLabel,
            details: comp,
            isFlipped: false,
            isMatched: false,
          });
        });
      }

      chosenPairs.forEach((pair) => {
        // Item A card
        generatedCards.push({
          uid: `${pair.id}-A-${Math.random()}`,
          matchId: pair.id,
          name: pair.itemA.name,
          subtext: pair.itemA.subtext,
          symbolIcon: pair.itemA.icon,
          color: pair.color,
          glowColor: `${pair.color}66`,
          categoryLabel: 'Cặp bổ sung',
          details: pair,
          isFlipped: false,
          isMatched: false,
        });

        // Item B card
        generatedCards.push({
          uid: `${pair.id}-B-${Math.random()}`,
          matchId: pair.id,
          name: pair.itemB.name,
          subtext: pair.itemB.subtext,
          symbolIcon: pair.itemB.icon,
          color: pair.color,
          glowColor: `${pair.color}66`,
          categoryLabel: 'Cặp bổ sung',
          details: pair,
          isFlipped: false,
          isMatched: false,
        });
      });
    } else {
      // Standard or Time Attack modes
      const shuffledComponents = [...CIRCUIT_COMPONENTS].sort(() => Math.random() - 0.5);
      const chosenComponents = shuffledComponents.slice(0, pairsCount);

      chosenComponents.forEach((comp) => {
        // Card 1
        generatedCards.push({
          uid: `${comp.id}-1-${Math.random()}`,
          matchId: comp.id,
          name: comp.name,
          subtext: comp.formula,
          symbolIcon: comp.id,
          unit: comp.unit,
          color: comp.color,
          glowColor: comp.glowColor,
          categoryLabel: comp.categoryLabel,
          details: comp,
          isFlipped: false,
          isMatched: false,
        });
        // Card 2
        generatedCards.push({
          uid: `${comp.id}-2-${Math.random()}`,
          matchId: comp.id,
          name: comp.name,
          subtext: comp.symbol,
          symbolIcon: comp.id,
          unit: comp.unit,
          color: comp.color,
          glowColor: comp.glowColor,
          categoryLabel: comp.categoryLabel,
          details: comp,
          isFlipped: false,
          isMatched: false,
        });
      });
    }

    // Shuffle the generated cards thoroughly
    generatedCards = generatedCards.sort(() => Math.random() - 0.5);

    setCards(generatedCards);
    setFlippedIndices([]);
    setIsProcessing(false);
    setLastMatched(null);

    const initialTimeRemaining = difficulty === '4x4' ? 60 : difficulty === '4x6' ? 90 : 130;

    setStats({
      score: 0,
      moves: 0,
      combo: 0,
      maxCombo: 0,
      matchedPairs: 0,
      totalPairs: pairsCount,
      timeSeconds: 0,
      timeRemaining: initialTimeRemaining,
      isWon: false,
      isGameOver: false,
    });
  }, [difficulty, mode, getCardCount]);

  // Restart game on mount and when mode or difficulty changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Game Timer Loop
  useEffect(() => {
    if (stats.isWon || stats.isGameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setStats((prev) => {
        if (prev.isWon || prev.isGameOver) return prev;

        if (mode === 'timeAttack') {
          const nextRemaining = (prev.timeRemaining || 0) - 1;
          if (nextRemaining <= 0) {
            soundManager.playMismatch();
            return {
              ...prev,
              timeRemaining: 0,
              isGameOver: true,
            };
          }
          return {
            ...prev,
            timeSeconds: prev.timeSeconds + 1,
            timeRemaining: nextRemaining,
          };
        } else {
          return {
            ...prev,
            timeSeconds: prev.timeSeconds + 1,
          };
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stats.isWon, stats.isGameOver, mode]);

  // Handle Card Click
  const handleCardClick = (index: number) => {
    if (isProcessing) return;
    if (flippedIndices.length >= 2) return;
    if (flippedIndices.includes(index)) return;
    if (cards[index].isMatched) return;

    soundManager.playFlip();

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Update the visual flip state of the card
    setCards((prevCards) => {
      const updated = [...prevCards];
      updated[index] = { ...updated[index], isFlipped: true };
      return updated;
    });

    // Check match on 2nd card
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [idx1, idx2] = newFlipped;
      const card1 = cards[idx1];
      const card2 = cards[idx2];

      const isMatch = card1.matchId === card2.matchId;

      setStats((prev) => ({
        ...prev,
        moves: prev.moves + 1,
      }));

      if (isMatch) {
        // MATCH SUCCESS
        const currentCombo = stats.combo + 1;
        const newMaxCombo = Math.max(stats.maxCombo, currentCombo);
        const comboMultiplier = Math.min(currentCombo, 5);
        const addedScore = 120 * comboMultiplier + (mode === 'timeAttack' ? 40 : 0);

        soundManager.playMatch(comboMultiplier);
        soundManager.playSpark();

        if (card1.details) {
          setLastMatched(card1.details);
        }

        setTimeout(() => {
          setCards((prevCards) => {
            const updated = [...prevCards];
            updated[idx1] = { ...updated[idx1], isMatched: true, isFlipped: true };
            updated[idx2] = { ...updated[idx2], isMatched: true, isFlipped: true };
            return updated;
          });

          setStats((prev) => {
            const newMatchedPairs = prev.matchedPairs + 1;
            const isWon = newMatchedPairs === prev.totalPairs;
            const newScore = prev.score + addedScore;

            if (isWon) {
              soundManager.playVictory();
              // Save Highscore
              const scoreKey = `${mode}_${difficulty}`;
              const currentBest = bestScores[scoreKey] || 0;
              if (newScore > currentBest) {
                const updatedBest = { ...bestScores, [scoreKey]: newScore };
                setBestScores(updatedBest);
                try {
                  localStorage.setItem('circuit_match_best_scores', JSON.stringify(updatedBest));
                } catch {
                  // Ignore
                }
              }
            }

            return {
              ...prev,
              score: newScore,
              combo: currentCombo,
              maxCombo: newMaxCombo,
              matchedPairs: newMatchedPairs,
              timeRemaining: mode === 'timeAttack' ? (prev.timeRemaining || 0) + 5 : prev.timeRemaining,
              isWon,
            };
          });

          setFlippedIndices([]);
          setIsProcessing(false);
        }, 400);
      } else {
        // MISMATCH
        soundManager.playMismatch();

        setTimeout(() => {
          setCards((prevCards) => {
            const updated = [...prevCards];
            updated[idx1] = { ...updated[idx1], isFlipped: false };
            updated[idx2] = { ...updated[idx2], isFlipped: false };
            return updated;
          });

          setStats((prev) => ({
            ...prev,
            combo: 0,
          }));

          setFlippedIndices([]);
          setIsProcessing(false);
        }, 850);
      }
    }
  };

  const currentScoreKey = `${mode}_${difficulty}`;
  const bestScore = bestScores[currentScoreKey] || 0;

  // Calculate dynamic grid classes based on difficulty
  const gridClasses = {
    '4x4': 'grid-cols-4 max-w-2xl',
    '4x6': 'grid-cols-4 sm:grid-cols-6 max-w-3xl',
    '6x6': 'grid-cols-6 max-w-4xl',
  }[difficulty];

  const cardSizeVariant: 'sm' | 'md' | 'lg' =
    difficulty === '6x6' ? 'sm' : difficulty === '4x6' ? 'md' : 'lg';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-3 sm:p-5 pcb-grid-pattern selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header Controls */}
      <div className="w-full space-y-3">
        <GameHeader
          difficulty={difficulty}
          onDifficultyChange={(d) => {
            soundManager.playClick();
            setDifficulty(d);
          }}
          mode={mode}
          onModeChange={(m) => {
            soundManager.playClick();
            setMode(m);
          }}
          stats={stats}
          bestScore={bestScore}
          isMuted={isMuted}
          onToggleMute={() => {
            const nextMuted = !isMuted;
            setIsMuted(nextMuted);
            soundManager.setMuted(nextMuted);
          }}
          onRestart={initializeGame}
          onOpenHandbook={() => setIsHandbookOpen(true)}
        />

        {/* Live Learning Banner */}
        <MatchedLearningBanner lastMatched={lastMatched} combo={stats.combo} />
      </div>

      {/* Main Memory Game Board */}
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6">
        {stats.isGameOver && !stats.isWon ? (
          <div className="text-center p-8 rounded-2xl bg-slate-900/90 border border-rose-500/40 shadow-2xl max-w-md animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100">Hết Giờ!</h3>
            <p className="text-sm text-slate-400 mt-2">
              Thời gian đã cạn kiệt trước khi bạn hoàn thành toàn bộ mạch điện.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
              Điểm đạt được: {stats.score.toLocaleString()} • Ghép được {stats.matchedPairs}/{stats.totalPairs} cặp
            </div>
            <button
              id="btn-retry-gameover"
              onClick={initializeGame}
              className="mt-6 w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại ngay
            </button>
          </div>
        ) : (
          <div
            className={`w-full grid gap-2 sm:gap-3.5 mx-auto ${gridClasses} transition-all duration-300`}
          >
            {cards.map((card, index) => (
              <MemoryCard
                key={card.uid}
                card={card}
                onClick={() => handleCardClick(index)}
                disabled={isProcessing || stats.isWon || stats.isGameOver}
                size={cardSizeVariant}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-5xl mx-auto pt-2 pb-1 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 border-t border-slate-900">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Mô phỏng bảng mạch PCB chuẩn IEC • Ký hiệu sơ đồ mạch điện tử</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            id="btn-footer-handbook"
            onClick={() => {
              soundManager.playClick();
              setIsHandbookOpen(true);
            }}
            className="hover:text-cyan-400 transition-colors underline underline-offset-2"
          >
            Tra cứu công thức & linh kiện
          </button>
          <span>Trò chơi giáo dục & trí nhớ</span>
        </div>
      </footer>

      {/* Handbook Modal */}
      <HandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

      {/* Victory Modal */}
      <VictoryModal
        isOpen={stats.isWon}
        stats={stats}
        onRestart={initializeGame}
        onOpenHandbook={() => {
          setIsHandbookOpen(true);
        }}
      />
    </div>
  );
}
