import React from "react";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    cost: number;
    description: string;
    stats: {
      [key: string]: number | string;
    };
    levelScaling?: {
      [key: string]: {
        base: number;
        perLevel: number;
      };
    };
    optimal?: boolean;
    counteredOpponents?: string[];
    targetClass?: string;
    tier?: number;
  };
  championLevel: number;
  isOptimal?: boolean;
  isCounterItem?: boolean;
}

export function ItemTooltip({ item, championLevel, isOptimal, isCounterItem }: ItemProps) {
  // Calculate scaled stats based on champion level if levelScaling exists
  const getScaledStat = (statName: string) => {
    if (item.levelScaling && item.levelScaling[statName]) {
      const { base, perLevel } = item.levelScaling[statName];
      return base + perLevel * (championLevel - 1);
    }
    return item.stats[statName] || 0;
  };

  // Determine if the item should be highlighted
  const isHighlighted = item.optimal || isOptimal || isCounterItem;
  const borderClass = isCounterItem 
    ? 'border-purple-500/60' 
    : (item.optimal || isOptimal) ? 'optimal-item' : 'border-red-700/40';

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer relative"
        >
          <div className={`w-16 h-16 bg-black/60 rounded-md border overflow-hidden ${borderClass} shadow-md shadow-black/20`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <span className="absolute bottom-0 right-0 text-xs bg-red-900/90 px-1 rounded-tl-md text-amber-200">
            {item.cost}g
          </span>
          {isHighlighted && (
            <span className={`absolute top-0 left-0 w-full h-1 ${isCounterItem ? 'bg-purple-500' : 'bg-amber-500'}`}></span>
          )}
          {item.tier && (
            <span className="absolute top-0 right-0 bg-black/70 rounded-bl-md px-1 text-xs font-bold">
              T{item.tier}
            </span>
          )}
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 noxian-card text-white border border-red-800/40 z-50">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-black/60 rounded-md overflow-hidden flex-shrink-0 border border-red-700/40">
            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-0.5" />
          </div>
          <div>
            <h3 className="text-lg font-bold noxian-gold-text">{item.name}</h3>
            <p className="text-sm text-red-300">Cost: {item.cost} gold</p>
            {item.targetClass && (
              <p className="text-xs mt-1 text-purple-300">Effective against: {item.targetClass}</p>
            )}
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="font-medium text-amber-400 border-b border-red-800 pb-1 mb-2">Stats</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {Object.keys(item.stats).map(stat => (
              <div key={stat} className="flex justify-between">
                <span className="text-red-200">{stat}:</span>
                <span className="text-white">
                  {item.levelScaling && item.levelScaling[stat]
                    ? `${getScaledStat(stat)} (Level ${championLevel})`
                    : item.stats[stat]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-gray-300">{item.description}</p>
        </div>
        
        {item.levelScaling && (
          <div className="mt-2 text-xs text-red-300">
            <p>* Some stats scale with champion level</p>
          </div>
        )}
        
        {isHighlighted && (
          <div className={`mt-2 text-xs ${isCounterItem ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-amber-500/20 border border-amber-500/30'} p-1 rounded`}>
            <p className={isCounterItem ? 'text-purple-300' : 'text-amber-300'}>
              ⭐ {isCounterItem ? 'Counter item for selected opponent' : 'Optimal item for this champion'}
            </p>
          </div>
        )}
        
        {item.counteredOpponents && item.counteredOpponents.length > 0 && (
          <div className="mt-2 text-xs">
            <p className="text-purple-300">Effective against: {item.counteredOpponents.join(", ")}</p>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
