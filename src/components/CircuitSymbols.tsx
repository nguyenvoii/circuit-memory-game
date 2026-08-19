import React from 'react';

interface SymbolProps {
  name: string;
  className?: string;
  color?: string;
}

export const CircuitSymbol: React.FC<SymbolProps> = ({ name, className = 'w-12 h-12', color = '#06b6d4' }) => {
  switch (name) {
    case 'resistor':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Wire lead in */}
          <line x1="5" y1="30" x2="25" y2="30" />
          {/* Zigzag resistor body */}
          <polyline points="25,30 31,14 43,46 55,14 67,46 75,30" />
          {/* Wire lead out */}
          <line x1="75" y1="30" x2="95" y2="30" />
          {/* Terminals */}
          <circle cx="5" cy="30" r="3" fill={color} />
          <circle cx="95" cy="30" r="3" fill={color} />
        </svg>
      );

    case 'capacitor':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          {/* Left lead */}
          <line x1="10" y1="30" x2="42" y2="30" />
          {/* Plates */}
          <line x1="42" y1="12" x2="42" y2="48" strokeWidth="4.5" />
          <line x1="58" y1="12" x2="58" y2="48" strokeWidth="4.5" />
          {/* Right lead */}
          <line x1="58" y1="30" x2="90" y2="30" />
          {/* Field lines */}
          <line x1="47" y1="20" x2="53" y2="20" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="47" y1="30" x2="53" y2="30" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="47" y1="40" x2="53" y2="40" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Terminals */}
          <circle cx="10" cy="30" r="3" fill={color} />
          <circle cx="90" cy="30" r="3" fill={color} />
        </svg>
      );

    case 'inductor':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          {/* Left lead */}
          <line x1="8" y1="35" x2="22" y2="35" />
          {/* Coils */}
          <path d="M 22,35 A 8,11 0 0,1 38,35 A 8,11 0 0,1 54,35 A 8,11 0 0,1 70,35 A 8,11 0 0,1 86,35" />
          {/* Right lead */}
          <line x1="86" y1="35" x2="94" y2="35" />
          <circle cx="8" cy="35" r="3" fill={color} />
          <circle cx="94" cy="35" r="3" fill={color} />
        </svg>
      );

    case 'diode':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Anode lead */}
          <line x1="8" y1="30" x2="36" y2="30" />
          {/* Triangle */}
          <polygon points="36,15 36,45 64,30" fill={color} fillOpacity="0.2" />
          {/* Cathode bar */}
          <line x1="64" y1="15" x2="64" y2="45" strokeWidth="4" />
          {/* Cathode lead */}
          <line x1="64" y1="30" x2="92" y2="30" />
          <circle cx="8" cy="30" r="3" fill={color} />
          <circle cx="92" cy="30" r="3" fill={color} />
        </svg>
      );

    case 'led':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="34" x2="32" y2="34" />
          <polygon points="32,20 32,48 58,34" fill={color} fillOpacity="0.25" />
          <line x1="58" y1="20" x2="58" y2="48" strokeWidth="4" />
          <line x1="58" y1="34" x2="84" y2="34" />
          {/* Light emission arrows */}
          <line x1="45" y1="18" x2="59" y2="6" strokeWidth="2.5" />
          <polyline points="52,6 59,6 59,13" strokeWidth="2" />
          <line x1="57" y1="22" x2="71" y2="10" strokeWidth="2.5" />
          <polyline points="64,10 71,10 71,17" strokeWidth="2" />
          <circle cx="8" cy="34" r="3" fill={color} />
          <circle cx="84" cy="34" r="3" fill={color} />
        </svg>
      );

    case 'transistor':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          {/* Base lead and bar */}
          <line x1="12" y1="30" x2="40" y2="30" strokeWidth="3.5" />
          <line x1="40" y1="12" x2="40" y2="48" strokeWidth="4.5" />
          {/* Collector */}
          <line x1="40" y1="20" x2="68" y2="10" />
          <line x1="68" y1="10" x2="88" y2="10" />
          {/* Emitter with arrow */}
          <line x1="40" y1="40" x2="68" y2="50" />
          <line x1="68" y1="50" x2="88" y2="50" />
          {/* NPN Arrow */}
          <polygon points="62,45 68,50 60,52" fill={color} />
          {/* Outer circle */}
          <circle cx="54" cy="30" r="24" strokeWidth="2" strokeDasharray="4 2" strokeOpacity="0.6" />
        </svg>
      );

    case 'battery':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          {/* Positive terminal lead */}
          <line x1="10" y1="30" x2="35" y2="30" />
          {/* Long line (positive) */}
          <line x1="35" y1="12" x2="35" y2="48" strokeWidth="4.5" />
          {/* Short line (negative) */}
          <line x1="47" y1="20" x2="47" y2="40" strokeWidth="5.5" />
          {/* Second cell long */}
          <line x1="59" y1="12" x2="59" y2="48" strokeWidth="4.5" />
          {/* Second cell short */}
          <line x1="71" y1="20" x2="71" y2="40" strokeWidth="5.5" />
          {/* Negative terminal lead */}
          <line x1="71" y1="30" x2="92" y2="30" />
          {/* Plus sign */}
          <text x="22" y="20" fill={color} fontSize="14" fontWeight="bold" textAnchor="middle" stroke="none">+</text>
          {/* Minus sign */}
          <text x="82" y="20" fill={color} fontSize="14" fontWeight="bold" textAnchor="middle" stroke="none">-</text>
        </svg>
      );

    case 'switch':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <line x1="10" y1="35" x2="32" y2="35" />
          <circle cx="35" cy="35" r="4" fill="transparent" strokeWidth="3" />
          {/* Switch blade tilted up */}
          <line x1="38" y1="33" x2="68" y2="15" strokeWidth="3.5" />
          <circle cx="68" cy="35" r="4" fill="transparent" strokeWidth="3" />
          <line x1="72" y1="35" x2="92" y2="35" />
        </svg>
      );

    case 'potentiometer':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="10" y1="38" x2="25" y2="38" />
          <polyline points="25,38 31,26 41,50 51,26 61,50 67,38" />
          <line x1="67" y1="38" x2="85" y2="38" />
          {/* Wiper arrow */}
          <line x1="46" y1="10" x2="46" y2="28" strokeWidth="3.5" />
          <polygon points="41,25 46,33 51,25" fill={color} />
          <line x1="46" y1="10" x2="75" y2="10" />
        </svg>
      );

    case 'fuse':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <line x1="8" y1="30" x2="28" y2="30" />
          {/* Fuse rectangle body */}
          <rect x="28" y="16" width="44" height="28" rx="4" strokeWidth="3" fill={color} fillOpacity="0.15" />
          {/* Thin conductor inside passing through */}
          <line x1="28" y1="30" x2="72" y2="30" strokeWidth="2.5" />
          <line x1="72" y1="30" x2="92" y2="30" />
        </svg>
      );

    case 'microchip':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
          {/* Chip package */}
          <rect x="28" y="12" width="44" height="36" rx="4" fill={color} fillOpacity="0.2" strokeWidth="3" />
          {/* Pin notch */}
          <circle cx="36" cy="18" r="2.5" fill={color} stroke="none" />
          {/* Left pins */}
          <line x1="12" y1="20" x2="28" y2="20" strokeWidth="3" />
          <line x1="12" y1="30" x2="28" y2="30" strokeWidth="3" />
          <line x1="12" y1="40" x2="28" y2="40" strokeWidth="3" />
          {/* Right pins */}
          <line x1="72" y1="20" x2="88" y2="20" strokeWidth="3" />
          <line x1="72" y1="30" x2="88" y2="30" strokeWidth="3" />
          <line x1="72" y1="40" x2="88" y2="40" strokeWidth="3" />
          {/* IC Label */}
          <text x="50" y="34" fill={color} fontSize="11" fontWeight="bold" textAnchor="middle" stroke="none" fontFamily="monospace">MCU</text>
        </svg>
      );

    case 'ldr':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="10" y1="30" x2="26" y2="30" />
          <polyline points="26,30 32,18 42,42 52,18 62,42 68,30" />
          <line x1="68" y1="30" x2="86" y2="30" />
          <circle cx="47" cy="30" r="22" strokeWidth="1.5" strokeDasharray="3 2" strokeOpacity="0.7" />
          {/* Inward light arrows */}
          <line x1="28" y1="8" x2="38" y2="18" strokeWidth="2.5" />
          <polyline points="38,12 38,18 32,18" strokeWidth="2" />
          <line x1="38" y1="4" x2="48" y2="14" strokeWidth="2.5" />
          <polyline points="48,8 48,14 42,14" strokeWidth="2" />
        </svg>
      );

    case 'buzzer':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          {/* Leads */}
          <line x1="35" y1="48" x2="35" y2="38" strokeWidth="3.5" />
          <line x1="65" y1="48" x2="65" y2="38" strokeWidth="3.5" />
          {/* Buzzer cup/dish */}
          <path d="M 25,38 L 75,38 L 75,22 C 75,14 25,14 25,22 Z" fill={color} fillOpacity="0.2" strokeWidth="3" />
          {/* Sound waves */}
          <path d="M 40,8 C 45,6 55,6 60,8" strokeWidth="2" strokeDasharray="2 2" />
          <path d="M 32,4 C 42,0 58,0 68,4" strokeWidth="2" />
        </svg>
      );

    case 'relay':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
          {/* Coil left side */}
          <line x1="10" y1="20" x2="22" y2="20" strokeWidth="3" />
          <path d="M 22,20 A 4,6 0 0,1 30,20 A 4,6 0 0,1 38,20 A 4,6 0 0,1 46,20" strokeWidth="3" />
          <line x1="46" y1="20" x2="56" y2="20" strokeWidth="3" />
          {/* Switch contacts right side */}
          <line x1="70" y1="40" x2="88" y2="40" strokeWidth="3" />
          <line x1="70" y1="18" x2="88" y2="18" strokeWidth="3" />
          <line x1="60" y1="28" x2="78" y2="14" strokeWidth="3" />
          {/* Magnetic coupling dash */}
          <line x1="51" y1="25" x2="66" y2="25" strokeDasharray="2 2" strokeWidth="2" strokeOpacity="0.8" />
        </svg>
      );

    case 'zener':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="30" x2="36" y2="30" />
          <polygon points="36,15 36,45 64,30" fill={color} fillOpacity="0.2" />
          {/* Zener bent cathode */}
          <polyline points="56,15 64,15 64,45 72,45" strokeWidth="4" />
          <line x1="64" y1="30" x2="92" y2="30" />
        </svg>
      );

    case 'transformer':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          {/* Primary Coil */}
          <path d="M 32,12 A 6,5 0 0,1 32,24 A 6,5 0 0,1 32,36 A 6,5 0 0,1 32,48" />
          <line x1="12" y1="12" x2="32" y2="12" />
          <line x1="12" y1="48" x2="32" y2="48" />
          {/* Iron Core Lines */}
          <line x1="47" y1="10" x2="47" y2="50" strokeWidth="2.5" strokeOpacity="0.8" />
          <line x1="53" y1="10" x2="53" y2="50" strokeWidth="2.5" strokeOpacity="0.8" />
          {/* Secondary Coil */}
          <path d="M 68,12 A 6,5 0 0,0 68,24 A 6,5 0 0,0 68,36 A 6,5 0 0,0 68,48" />
          <line x1="68" y1="12" x2="88" y2="12" />
          <line x1="68" y1="48" x2="88" y2="48" />
        </svg>
      );

    case 'crystal':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <line x1="12" y1="30" x2="38" y2="30" />
          {/* Plate 1 */}
          <line x1="38" y1="14" x2="38" y2="46" strokeWidth="4" />
          {/* Quartz Crystal Slab */}
          <rect x="45" y="16" width="10" height="28" fill={color} fillOpacity="0.3" strokeWidth="2.5" />
          {/* Plate 2 */}
          <line x1="62" y1="14" x2="62" y2="46" strokeWidth="4" />
          <line x1="62" y1="30" x2="88" y2="30" />
        </svg>
      );

    case 'solar_cell':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <circle cx="50" cy="30" r="22" strokeWidth="2" strokeDasharray="3 2" strokeOpacity="0.7" />
          {/* Solar cell plates */}
          <line x1="15" y1="30" x2="38" y2="30" strokeWidth="3.5" />
          <line x1="38" y1="16" x2="38" y2="44" strokeWidth="4.5" />
          <line x1="50" y1="22" x2="50" y2="38" strokeWidth="5.5" />
          <line x1="50" y1="30" x2="85" y2="30" strokeWidth="3.5" />
          {/* Sun rays coming in */}
          <line x1="28" y1="8" x2="38" y2="18" strokeWidth="2.5" />
          <line x1="42" y1="6" x2="52" y2="16" strokeWidth="2.5" />
        </svg>
      );

    // Complementary icons
    case 'switch_open':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <line x1="10" y1="38" x2="32" y2="38" />
          <circle cx="34" cy="38" r="4" fill={color} />
          <line x1="38" y1="35" x2="68" y2="14" strokeWidth="4" />
          <circle cx="68" cy="38" r="4" fill="transparent" strokeWidth="3" />
          <line x1="72" y1="38" x2="92" y2="38" />
        </svg>
      );

    case 'switch_closed':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <line x1="10" y1="30" x2="32" y2="30" />
          <circle cx="34" cy="30" r="4" fill={color} />
          <line x1="38" y1="30" x2="64" y2="30" strokeWidth="4.5" />
          <circle cx="68" cy="30" r="4" fill={color} />
          <line x1="72" y1="30" x2="92" y2="30" />
        </svg>
      );

    case 'anode':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <circle cx="50" cy="30" r="20" strokeWidth="2.5" fill={color} fillOpacity="0.15" />
          <line x1="50" y1="18" x2="50" y2="42" strokeWidth="4" />
          <line x1="38" y1="30" x2="62" y2="30" strokeWidth="4" />
          <text x="50" y="55" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle" stroke="none">+ ANODE</text>
        </svg>
      );

    case 'cathode':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <circle cx="50" cy="30" r="20" strokeWidth="2.5" fill={color} fillOpacity="0.15" />
          <line x1="38" y1="30" x2="62" y2="30" strokeWidth="4" />
          <text x="50" y="55" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle" stroke="none">- CATHODE</text>
        </svg>
      );

    case 'npn':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <line x1="15" y1="30" x2="40" y2="30" strokeWidth="3.5" />
          <line x1="40" y1="14" x2="40" y2="46" strokeWidth="4.5" />
          <line x1="40" y1="22" x2="66" y2="12" />
          <line x1="40" y1="38" x2="66" y2="48" />
          {/* Arrow pointing OUT */}
          <polygon points="60,43 66,48 58,49" fill={color} />
          <text x="76" y="24" fill={color} fontSize="11" fontWeight="bold" stroke="none">NPN</text>
        </svg>
      );

    case 'pnp':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <line x1="15" y1="30" x2="40" y2="30" strokeWidth="3.5" />
          <line x1="40" y1="14" x2="40" y2="46" strokeWidth="4.5" />
          <line x1="40" y1="22" x2="66" y2="12" />
          <line x1="40" y1="38" x2="66" y2="48" />
          {/* Arrow pointing IN */}
          <polygon points="46,35 41,39 49,41" fill={color} />
          <text x="76" y="24" fill={color} fontSize="11" fontWeight="bold" stroke="none">PNP</text>
        </svg>
      );

    case 'ac_wave':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <circle cx="50" cy="30" r="22" strokeWidth="2.5" fill={color} fillOpacity="0.1" />
          <path d="M 34,30 Q 42,14 50,30 T 66,30" strokeWidth="4" />
          <text x="50" y="56" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle" stroke="none">AC ~ (Xoay chiều)</text>
        </svg>
      );

    case 'dc_line':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <circle cx="50" cy="30" r="22" strokeWidth="2.5" fill={color} fillOpacity="0.1" />
          <line x1="32" y1="26" x2="68" y2="26" strokeWidth="4" />
          <line x1="32" y1="34" x2="68" y2="34" strokeWidth="3" strokeDasharray="5 3" />
          <text x="50" y="56" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle" stroke="none">DC = (Một chiều)</text>
        </svg>
      );

    case 'cap_charge':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <line x1="38" y1="12" x2="38" y2="48" strokeWidth="4.5" />
          <line x1="54" y1="12" x2="54" y2="48" strokeWidth="4.5" />
          {/* Inflow lightning/arrow */}
          <path d="M 16,30 L 32,30" strokeWidth="3.5" />
          <polyline points="26,24 32,30 26,36" strokeWidth="3" />
          <text x="76" y="34" fill={color} fontSize="14" fontWeight="bold" stroke="none">⚡+</text>
        </svg>
      );

    case 'cap_discharge':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <line x1="38" y1="12" x2="38" y2="48" strokeWidth="4.5" />
          <line x1="54" y1="12" x2="54" y2="48" strokeWidth="4.5" />
          {/* Outflow arrow */}
          <path d="M 60,30 L 80,30" strokeWidth="3.5" />
          <polyline points="74,24 80,30 74,36" strokeWidth="3" />
          <text x="18" y="34" fill={color} fontSize="14" fontWeight="bold" stroke="none">⚡-</text>
        </svg>
      );

    case 'led_emit':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <polygon points="34,20 34,44 54,32" fill={color} fillOpacity="0.3" />
          <line x1="54" y1="20" x2="54" y2="44" strokeWidth="4" />
          {/* Radiation waves */}
          <path d="M 64,20 Q 72,16 78,20" strokeWidth="2.5" />
          <path d="M 68,26 Q 78,22 84,26" strokeWidth="2.5" />
          <path d="M 64,34 Q 72,38 78,34" strokeWidth="2.5" />
        </svg>
      );

    case 'ldr_sense':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <circle cx="48" cy="30" r="18" strokeWidth="2" strokeDasharray="3 2" fill={color} fillOpacity="0.1" />
          <polyline points="36,30 40,24 48,36 56,24 60,30" strokeWidth="3" />
          {/* Incoming arrows */}
          <line x1="22" y1="12" x2="34" y2="22" strokeWidth="2.5" />
          <polyline points="34,16 34,22 28,22" strokeWidth="2" />
        </svg>
      );

    case 'series_circuit':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <rect x="22" y="24" width="22" height="14" fill={color} fillOpacity="0.2" />
          <line x1="44" y1="31" x2="56" y2="31" strokeWidth="3" />
          <rect x="56" y="24" width="22" height="14" fill={color} fillOpacity="0.2" />
          <line x1="8" y1="31" x2="22" y2="31" />
          <line x1="78" y1="31" x2="92" y2="31" />
          <text x="50" y="54" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle" stroke="none">R1  nối tiếp R2</text>
        </svg>
      );

    case 'parallel_circuit':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
          {/* Main bus */}
          <line x1="12" y1="30" x2="28" y2="30" strokeWidth="3" />
          <line x1="28" y1="16" x2="28" y2="44" strokeWidth="3" />
          {/* Branch 1 */}
          <line x1="28" y1="16" x2="38" y2="16" />
          <rect x="38" y="10" width="24" height="12" fill={color} fillOpacity="0.2" />
          <line x1="62" y1="16" x2="72" y2="16" />
          {/* Branch 2 */}
          <line x1="28" y1="44" x2="38" y2="44" />
          <rect x="38" y="38" width="24" height="12" fill={color} fillOpacity="0.2" />
          <line x1="62" y1="44" x2="72" y2="44" />
          {/* Right bus */}
          <line x1="72" y1="16" x2="72" y2="44" strokeWidth="3" />
          <line x1="72" y1="30" x2="88" y2="30" strokeWidth="3" />
        </svg>
      );

    case 'fuse_ok':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <rect x="25" y="18" width="50" height="24" rx="4" fill={color} fillOpacity="0.2" strokeWidth="2.5" />
          <line x1="8" y1="30" x2="25" y2="30" strokeWidth="3.5" />
          <line x1="25" y1="30" x2="75" y2="30" strokeWidth="3" />
          <line x1="75" y1="30" x2="92" y2="30" strokeWidth="3.5" />
          <circle cx="50" cy="30" r="3" fill={color} />
        </svg>
      );

    case 'fuse_blown':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <rect x="25" y="18" width="50" height="24" rx="4" fill={color} fillOpacity="0.1" strokeWidth="2.5" strokeDasharray="4 2" />
          <line x1="8" y1="30" x2="25" y2="30" strokeWidth="3.5" />
          <line x1="25" y1="30" x2="42" y2="30" strokeWidth="3" />
          {/* Broken gap */}
          <line x1="58" y1="30" x2="75" y2="30" strokeWidth="3" />
          <line x1="75" y1="30" x2="92" y2="30" strokeWidth="3.5" />
          <text x="50" y="34" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" stroke="none">✕</text>
        </svg>
      );

    case 'analog_signal':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          {/* Axis */}
          <line x1="12" y1="30" x2="88" y2="30" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
          {/* Smooth sine wave */}
          <path d="M 16,30 Q 28,10 40,30 T 64,30 T 88,30" strokeWidth="3.5" />
          <text x="50" y="55" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle" stroke="none">Analog (Sóng liên tục)</text>
        </svg>
      );

    case 'digital_signal':
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          {/* Square wave */}
          <polyline points="14,42 28,42 28,18 46,18 46,42 64,42 64,18 82,18 82,42 88,42" strokeWidth="3.5" />
          <text x="50" y="55" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle" stroke="none">Digital [0 1 0 1]</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 60" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
          <circle cx="50" cy="30" r="18" strokeWidth="3" />
          <text x="50" y="36" fill={color} fontSize="16" fontWeight="bold" textAnchor="middle" stroke="none">⚡</text>
        </svg>
      );
  }
};
