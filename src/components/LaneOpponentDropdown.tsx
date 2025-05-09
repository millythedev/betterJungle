
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Common jungle champions in League of Legends
const jungleChampions = [
  { id: "amumu", name: "Amumu" },
  { id: "diana", name: "Diana" },
  { id: "elise", name: "Elise" },
  { id: "evelynn", name: "Evelynn" },
  { id: "graves", name: "Graves" },
  { id: "hecarim", name: "Hecarim" },
  { id: "jarvaniv", name: "Jarvan IV" },
  { id: "kayn", name: "Kayn" },
  { id: "khazix", name: "Kha'Zix" },
  { id: "kindred", name: "Kindred" },
  { id: "leesin", name: "Lee Sin" },
  { id: "masteryi", name: "Master Yi" },
  { id: "nidalee", name: "Nidalee" },
  { id: "nunu", name: "Nunu & Willump" },
  { id: "rammus", name: "Rammus" },
  { id: "reksai", name: "Rek'Sai" },
  { id: "rengar", name: "Rengar" },
  { id: "sejuani", name: "Sejuani" },
  { id: "shaco", name: "Shaco" },
  { id: "udyr", name: "Udyr" },
  { id: "viego", name: "Viego" },
  { id: "warwick", name: "Warwick" },
  { id: "xinzhao", name: "Xin Zhao" },
  { id: "zac", name: "Zac" },
];

interface LaneOpponentDropdownProps {
  onSelectOpponent: (opponent: string) => void;
  selectedOpponent: string | null;
}

export function LaneOpponentDropdown({ onSelectOpponent, selectedOpponent }: LaneOpponentDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredChampions = jungleChampions.filter(champ => 
    champ.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="noxian-button px-4 py-2 rounded-md flex items-center gap-2"
        >
          <span>Lane Opponent</span>
          {selectedOpponent && <span className="text-amber-300">: {selectedOpponent}</span>}
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 border border-red-800 text-white">
        <DropdownMenuLabel className="text-amber-400">Select Lane Opponent</DropdownMenuLabel>
        <div className="px-2 py-1">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              className="w-full pl-8 pr-2 py-1 bg-black/60 border border-red-800/50 rounded text-sm"
              placeholder="Search champions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <DropdownMenuSeparator className="bg-red-800/50" />
        <div className="max-h-[200px] overflow-y-auto">
          {filteredChampions.map((champion) => (
            <DropdownMenuItem 
              key={champion.id}
              onClick={() => onSelectOpponent(champion.name)}
              className="text-white hover:bg-red-900/30 hover:text-amber-200 cursor-pointer"
            >
              {champion.name}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
