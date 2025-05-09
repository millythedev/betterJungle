
import React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChampionAbilityProps {
  abilities: {
    name: string;
    key: string;
    description: string;
    cooldown: string;
    cost: string;
    icon: string;
  }[];
}

export function ChampionAbilities({ abilities }: ChampionAbilityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="noxian-card p-4 border border-red-800/30"
    >
      <h3 className="text-xl font-bold mb-4 noxian-gold-text border-b border-red-800/40 pb-2">
        Champion Abilities
      </h3>
      <div className="space-y-4">
        {abilities.map((ability) => (
          <motion.div
            key={ability.key}
            whileHover={{ x: 3 }}
            className="flex gap-3 items-start bg-black/30 p-3 rounded border border-red-900/30"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="w-12 h-12 rounded bg-red-900/40 border border-red-700/50 overflow-hidden flex-shrink-0">
                    <img 
                      src={ability.icon} 
                      alt={ability.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="noxian-card border border-red-800/40">
                  <div className="text-sm">
                    <p className="text-amber-300">Cooldown: {ability.cooldown}</p>
                    <p className="text-blue-300">Cost: {ability.cost}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex-1">
              <h4 className="font-bold text-amber-300 flex items-center gap-2">
                {ability.name}
                <span className="text-xs px-2 py-0.5 bg-red-900/50 rounded text-white">{ability.key}</span>
              </h4>
              <p className="text-sm text-gray-300">{ability.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
