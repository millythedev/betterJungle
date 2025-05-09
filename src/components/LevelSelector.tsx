
import React from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LevelSelectorProps {
  level: number;
  setLevel: (level: number) => void;
  maxLevel: number;
}

export function LevelSelector({ level, setLevel, maxLevel }: LevelSelectorProps) {
  const decreaseLevel = () => {
    if (level > 1) {
      setLevel(level - 1);
    }
  };

  const increaseLevel = () => {
    if (level < maxLevel) {
      setLevel(level + 1);
    }
  };

  return (
    <div className="noxian-card p-4">
      <h3 className="text-lg font-bold mb-3 noxian-gold-text">Champion Level</h3>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="icon"
          onClick={decreaseLevel}
          disabled={level <= 1}
          className="noxian-button"
        >
          <Minus size={18} />
        </Button>
        
        <motion.div 
          key={level}
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-red-900 border-4 border-amber-500/50 flex items-center justify-center text-2xl font-bold">
            {level}
          </div>
          <p className="text-sm text-red-300 mt-1">Current Level</p>
        </motion.div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={increaseLevel}
          disabled={level >= maxLevel}
          className="noxian-button"
        >
          <Plus size={18} />
        </Button>
      </div>
      
      <div className="mt-4">
        <div className="relative h-2 bg-red-950 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-amber-500"
            style={{ width: `${(level / maxLevel) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-red-300">
          <span>1</span>
          <span>{maxLevel}</span>
        </div>
      </div>
    </div>
  );
}
