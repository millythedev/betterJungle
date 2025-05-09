
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { ItemTooltip } from "@/components/ItemTooltip";

interface InventoryProps {
  maxSlots?: number;
  onInventoryChange: (items: Array<any>) => void;
  allItems: Array<any>;
  championLevel: number;
  selectedOpponent?: string | null;
}

export function Inventory({ maxSlots = 6, onInventoryChange, allItems, championLevel, selectedOpponent }: InventoryProps) {
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState<string>("all");
  
  // Categories for filtering
  const categories = [
    { id: "all", name: "All Items" },
    { id: "attack", name: "Attack" },
    { id: "defense", name: "Defense" },
    { id: "magic", name: "Magic" },
    { id: "movement", name: "Movement" },
    { id: "support", name: "Support" },
  ];
  
  // Filter items based on search query and category
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterBy === "all") return matchesSearch;
      
      if (filterBy === "attack") {
        return matchesSearch && (
          item.stats["Attack Damage"] || 
          item.stats["Critical Chance"] || 
          item.stats["Attack Speed"]
        );
      }
      
      if (filterBy === "defense") {
        return matchesSearch && (
          item.stats["Armor"] || 
          item.stats["Magic Resist"] || 
          item.stats["Health"]
        );
      }
      
      if (filterBy === "magic") {
        return matchesSearch && (
          item.stats["Ability Power"] || 
          item.stats["Mana"] || 
          item.stats["Magic Penetration"]
        );
      }
      
      if (filterBy === "movement") {
        return matchesSearch && (
          item.stats["Movement Speed"] || 
          item.description.toLowerCase().includes("movement speed")
        );
      }
      
      if (filterBy === "support") {
        return matchesSearch && (
          item.stats["Health Regen"] || 
          item.stats["Mana Regen"] || 
          item.description.toLowerCase().includes("heal") || 
          item.description.toLowerCase().includes("shield")
        );
      }
      
      return matchesSearch;
    });
  }, [allItems, searchQuery, filterBy]);

  // Check if an item is a counter item for the selected opponent
  const isCounterItem = (item: any) => {
    return selectedOpponent && 
      item.counteredOpponents && 
      item.counteredOpponents.includes(selectedOpponent);
  };

  const addItemToInventory = (item: any) => {
    if (inventory.length < maxSlots) {
      const updatedInventory = [...inventory, item];
      setInventory(updatedInventory);
      onInventoryChange(updatedInventory);
    }
  };

  const removeItemFromInventory = (index: number) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
    onInventoryChange(updatedInventory);
  };

  return (
    <div className="mt-6 noxian-card p-4 border border-red-800/30">
      <h3 className="text-lg font-bold mb-3 noxian-gold-text border-b border-red-800 pb-2">Your Inventory</h3>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
        {Array.from({ length: maxSlots }).map((_, index) => (
          <div key={index} className="relative">
            {inventory[index] ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <ItemTooltip 
                  item={inventory[index]} 
                  championLevel={championLevel} 
                  isCounterItem={isCounterItem(inventory[index])}
                />
                <button 
                  onClick={() => removeItemFromInventory(index)}
                  className="absolute -top-2 -right-2 bg-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ) : (
              <div className="inventory-slot bg-black/40 border border-red-900/30 w-16 h-16 rounded-md flex items-center justify-center">
                <span className="text-xs text-red-400/50">Empty</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div>
        <h4 className="text-md font-medium mb-2 text-red-200">Available Items:</h4>
        
        <div className="mb-2 flex flex-wrap gap-2">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              className="w-full pl-8 pr-2 py-1 bg-black/60 border border-red-800/50 rounded text-sm"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilterBy(category.id)}
              className={`text-xs px-3 py-1 rounded-full border ${
                filterBy === category.id 
                  ? 'bg-red-900 border-red-700 text-amber-200'
                  : 'bg-transparent border-red-900/40 text-gray-300 hover:bg-red-900/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 noxian-card bg-black/30 rounded border border-red-800/30">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => addItemToInventory(item)}
                >
                  <ItemTooltip 
                    item={item} 
                    championLevel={championLevel}
                    isOptimal={item.optimal}
                    isCounterItem={isCounterItem(item)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-4 text-gray-400">
                No items match your search criteria
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
