
import React from "react";
import { motion } from "framer-motion";

interface ChampionStatsProps {
  level: number;
  stats: {
    [key: string]: {
      base: number;
      perLevel: number;
    };
  };
  modifiers?: {
    [key: string]: number;
  };
}

export function ChampionStats({ level, stats, modifiers = {} }: ChampionStatsProps) {
  // Calculate stat value based on level and any modifiers from items
  const calculateStatValue = (statKey: string) => {
    const stat = stats[statKey];
    const baseValue = stat.base + (stat.perLevel * (level - 1));
    const modifier = modifiers[statKey] || 0;
    return (baseValue + modifier).toFixed(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="noxian-card p-4 my-4 border border-red-800/30"
    >
      <h3 className="text-lg font-bold mb-3 text-amber-400 border-b border-red-800 pb-2">
        Champion Stats (Level {level})
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(stats).map(statKey => (
          <div key={statKey} className="champion-stat-item flex justify-between items-center">
            <span className="text-red-200">{statKey}:</span>
            <span className={`font-mono ${modifiers && modifiers[statKey] ? 'text-amber-400' : 'text-white'}`}>
              {calculateStatValue(statKey)}
              {modifiers && modifiers[statKey] ? ` (+${modifiers[statKey].toFixed(1)})` : ''}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
