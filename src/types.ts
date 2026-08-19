export type GameDifficulty = '4x4' | '4x6' | '6x6';

export type GameMode = 'standard' | 'complementary' | 'timeAttack';

export interface CircuitComponent {
  id: string;
  name: string;
  enName: string;
  symbol: string;
  unit?: string;
  category: 'passive' | 'active' | 'power' | 'sensor' | 'control';
  categoryLabel: string;
  description: string;
  formula?: string;
  realWorldUse: string;
  color: string; // Tailwind color or hex
  glowColor: string;
}

export interface ComplementaryPair {
  id: string;
  itemA: {
    name: string;
    subtext: string;
    icon: string;
    description: string;
  };
  itemB: {
    name: string;
    subtext: string;
    icon: string;
    description: string;
  };
  relationExplanation: string;
  color: string;
}

export interface GameCard {
  uid: string; // Unique ID for each card instance on the board
  matchId: string; // ID used for matching logic
  name: string;
  subtext?: string;
  symbolIcon: string;
  unit?: string;
  color: string;
  glowColor: string;
  categoryLabel?: string;
  details?: CircuitComponent | ComplementaryPair;
  isFlipped: boolean;
  isMatched: boolean;
  isLocked?: boolean;
}

export interface GameStats {
  score: number;
  moves: number;
  combo: number;
  maxCombo: number;
  matchedPairs: number;
  totalPairs: number;
  timeSeconds: number;
  timeRemaining?: number;
  isWon: boolean;
  isGameOver: boolean;
}

export interface BestScoreRecord {
  score: number;
  moves: number;
  timeSeconds: number;
  date: string;
}
