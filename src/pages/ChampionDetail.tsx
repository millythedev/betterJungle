import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Plus, 
  Minus, 
  Star
} from "lucide-react";
import { ItemTooltip } from "@/components/ItemTooltip";
import { championsData } from "@/data/championsData";
import { LevelSelector } from "@/components/LevelSelector";
import { ChampionStats } from "@/components/ChampionStats";
import { Inventory } from "@/components/Inventory";
import { LaneOpponentDropdown } from "@/components/LaneOpponentDropdown";
import { ChampionAbilities } from "@/components/ChampionAbilities";

// Extended game items database - these would normally come from your API or data file
const gameItems = [
  // Attack items
  { id: "infinity-edge", name: "Infinity Edge", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3031.png", cost: 3400, stats: { "Attack Damage": 70, "Critical Chance": "20%" }, description: "Critical strikes deal 35% bonus damage.", tier: 3 },
  { id: "ravenous-hydra", name: "Ravenous Hydra", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3074.png", cost: 3300, stats: { "Attack Damage": 65, "Life Steal": "10%" }, description: "Attacks cleave nearby enemies for 60% of your attack damage.", tier: 3 },
  { id: "essence-reaver", name: "Essence Reaver", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3508.png", cost: 2900, stats: { "Attack Damage": 45, "Critical Chance": "20%", "Ability Haste": 20 }, description: "After using an ability, your next attack restores mana.", tier: 3 },
  { id: "lord-dominiks", name: "Lord Dominik's Regards", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3036.png", cost: 3000, stats: { "Attack Damage": 30, "Armor Penetration": "35%", "Critical Chance": "20%" }, description: "Deal bonus damage to champions with more max health than you.", targetClass: "Tanks", counteredOpponents: ["Nunu & Willump", "Sejuani", "Rammus", "Zac"], tier: 3 },
  { id: "berserkers", name: "Berserker's Greaves", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3006.png", cost: 1100, stats: { "Attack Speed": "35%", "Movement Speed": 45 }, description: "Enhances movement and attack speed.", tier: 2 },
  { id: "botrk", name: "Blade of the Ruined King", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3153.png", cost: 3200, stats: { "Attack Damage": 40, "Attack Speed": "25%", "Life Steal": "10%" }, description: "Attacks deal 8% of target's current health as physical damage.", targetClass: "Health Stackers", counteredOpponents: ["Nunu & Willump", "Zac"], tier: 3 },
  
  // Defense items
  { id: "thornmail", name: "Thornmail", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3075.png", cost: 2700, stats: { "Armor": 60, "Health": 350 }, description: "When struck by attacks, deal damage back and apply Grievous Wounds.", targetClass: "Auto Attackers", counteredOpponents: ["Master Yi", "Kindred", "Graves"], tier: 3 },
  { id: "deadmans", name: "Dead Man's Plate", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3742.png", cost: 2900, stats: { "Health": 400, "Armor": 45 }, description: "Build momentum as you move and deal extra damage upon attacking.", tier: 3 },
  { id: "force-nature", name: "Force of Nature", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/4401.png", cost: 2900, stats: { "Health": 350, "Magic Resist": 60, "Movement Speed": "5%" }, description: "Taking magic damage grants stacks that increase your movement speed and reduce further magic damage.", targetClass: "Magic Damage", counteredOpponents: ["Elise", "Evelynn", "Diana"], tier: 3 },
  { id: "frozen-heart", name: "Frozen Heart", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3110.png", cost: 2500, stats: { "Armor": 80, "Mana": 400, "Ability Haste": 20 }, description: "Reduces the Attack Speed of nearby enemies by 20%.", targetClass: "Auto Attackers", counteredOpponents: ["Kindred", "Graves", "Xin Zhao"], tier: 3 },
  { id: "randuins", name: "Randuin's Omen", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3143.png", cost: 2700, stats: { "Health": 400, "Armor": 60 }, description: "Active: Briefly slow nearby enemies. Reduces damage from critical strikes.", targetClass: "Critical Strike Users", counteredOpponents: ["Kindred", "Graves"], tier: 3 },
  
  // Magical items
  { id: "rabadons", name: "Rabadon's Deathcap", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3089.png", cost: 3600, stats: { "Ability Power": 120 }, description: "Increases your Ability Power by 35%.", tier: 3 },
  { id: "void-staff", name: "Void Staff", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3135.png", cost: 2800, stats: { "Ability Power": 65, "Magic Penetration": "45%" }, description: "Your magic damage ignores 45% of enemy magic resistance.", targetClass: "Magic Resist Stackers", counteredOpponents: ["Nunu & Willump", "Zac"], tier: 3 },
  { id: "zhonyas", name: "Zhonya's Hourglass", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3157.png", cost: 2600, stats: { "Ability Power": 65, "Armor": 45, "Ability Haste": 10 }, description: "Active: Become invulnerable for 2.5 seconds (120s cooldown).", tier: 3 },
  { id: "banshees", name: "Banshee's Veil", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3102.png", cost: 2600, stats: { "Ability Power": 80, "Magic Resist": 45, "Ability Haste": 10 }, description: "Grants a spell shield that blocks the next enemy ability (40s cooldown).", targetClass: "Ability Reliant", counteredOpponents: ["Evelynn", "Elise", "Diana"], tier: 3 },
  { id: "morellonomicon", name: "Morellonomicon", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3165.png", cost: 2500, stats: { "Ability Power": 70, "Health": 200 }, description: "Magic damage applies 40% Grievous Wounds to enemies.", targetClass: "Healing Champions", counteredOpponents: ["Warwick", "Kayn", "Xin Zhao"], tier: 3 },
  
  // Mythic items
  { id: "kraken-slayer", name: "Kraken Slayer", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/6672.png", cost: 3400, stats: { "Attack Damage": 65, "Attack Speed": "25%", "Critical Chance": "20%" }, description: "Every third attack deals bonus true damage.", tier: 4 },
  { id: "galeforce", name: "Galeforce", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/6671.png", cost: 3400, stats: { "Attack Damage": 60, "Attack Speed": "20%", "Critical Chance": "20%", "Movement Speed": "3%" }, description: "Active: Dash in target direction and fire missiles at nearby enemies.", tier: 4 },
  { id: "shieldbow", name: "Immortal Shieldbow", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/6673.png", cost: 3400, stats: { "Attack Damage": 55, "Critical Chance": "20%", "Life Steal": "10%" }, description: "When taking damage that would reduce you below 30% health, gain a shield.", tier: 4 },
  { id: "divine-sunderer", name: "Divine Sunderer", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/6632.png", cost: 3300, stats: { "Attack Damage": 40, "Health": 400, "Ability Haste": 20 }, description: "After using an ability, your next attack deals bonus damage and heals you.", tier: 4 },
  { id: "trinity-force", name: "Trinity Force", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3078.png", cost: 3333, stats: { "Attack Damage": 35, "Attack Speed": "30%", "Health": 300, "Ability Haste": 20 }, description: "After using an ability, your next attack deals bonus damage. Attacking grants movement speed.", tier: 4 },
  { id: "night-harvester", name: "Night Harvester", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/4636.png", cost: 3200, stats: { "Ability Power": 90, "Health": 300, "Ability Haste": 25 }, description: "Damaging an enemy champion deals bonus magic damage and grants you movement speed.", tier: 4 },
  { id: "liandrys", name: "Liandry's Anguish", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/4637.png", cost: 3200, stats: { "Ability Power": 80, "Mana": 600, "Ability Haste": 20 }, description: "Deal bonus damage and burn enemies over time. Grants increased damage against high-health targets.", targetClass: "Health Stackers", counteredOpponents: ["Nunu & Willump", "Zac"], tier: 4 },
  { id: "locket", name: "Locket of the Iron Solari", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3190.png", cost: 2500, stats: { "Armor": 30, "Magic Resist": 30, "Health": 250, "Ability Haste": 15 }, description: "Active: Shield nearby allies from damage.", tier: 4 },
  { id: "sunfire", name: "Sunfire Aegis", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3068.png", cost: 3200, stats: { "Health": 450, "Armor": 35, "Magic Resist": 35 }, description: "Deal persistent damage to nearby enemies. Gain stacks on damaging enemies with abilities.", tier: 4 },
  { id: "frostfire", name: "Frostfire Gauntlet", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/6662.png", cost: 3200, stats: { "Health": 500, "Armor": 25, "Magic Resist": 25 }, description: "Attacks create a frost field that slows enemies. Gain size and health based on Legendary items.", tier: 4 },
  { id: "chemtank", name: "Turbo Chemtank", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/6664.png", cost: 3200, stats: { "Health": 350, "Armor": 25, "Magic Resist": 25, "Ability Haste": 15 }, description: "Active: Gain movement speed toward enemies. Upon reaching an enemy, emit a shockwave that slows them.", tier: 4 },
  
  // Early game items
  { id: "dorans-blade", name: "Doran's Blade", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/1055.png", cost: 450, stats: { "Attack Damage": 8, "Health": 80, "Life Steal": "2.5%" }, description: "Good starting item for attack damage champions.", tier: 1 },
  { id: "dorans-shield", name: "Doran's Shield", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/1054.png", cost: 450, stats: { "Health": 80, "Health Regen": "+6" }, description: "Good starting item for sustain in lane.", tier: 1 },
  { id: "dorans-ring", name: "Doran's Ring", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/1056.png", cost: 400, stats: { "Ability Power": 15, "Health": 70, "Mana Regen": "+5" }, description: "Good starting item for mages.", tier: 1 },
  { id: "dark-seal", name: "Dark Seal", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/1082.png", cost: 350, stats: { "Ability Power": 15, "Health": 40 }, description: "Gain stacks on champion kills and assists that increase AP.", tier: 1 },
  { id: "cull", name: "Cull", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/1083.png", cost: 450, stats: { "Attack Damage": 7, "Life Steal": "3 per hit" }, description: "Killing 100 minions grants 350 bonus gold.", tier: 1 },
  { id: "hunters-machete", name: "Hunter's Machete", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/1041.png", cost: 350, stats: { "Attack Damage": 8 }, description: "Ideal item for AD jungle champions. Gain bonus damage and sustain against monsters.", tier: 1 },
  { id: "hunters-talisman", name: "Hunter's Talisman", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/1039.png", cost: 350, stats: { "Ability Power": 8, "Mana Regen": "+100%" }, description: "Ideal item for AP jungle champions. Restores mana while damaging monsters.", tier: 1 },
  
  // Boots
  { id: "ninja-tabi", name: "Plated Steelcaps", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3047.png", cost: 1100, stats: { "Armor": 20, "Movement Speed": 45 }, description: "Reduces damage from attacks by 12%.", counteredOpponents: ["Kindred", "Graves", "Xin Zhao"], tier: 2 },
  { id: "merc-treads", name: "Mercury's Treads", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3111.png", cost: 1100, stats: { "Magic Resist": 25, "Movement Speed": 45 }, description: "Reduces the duration of crowd control effects by 30%.", counteredOpponents: ["Elise", "Evelynn", "Diana"], tier: 2 },
  { id: "mobis", name: "Boots of Mobility", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3117.png", cost: 1000, stats: { "Movement Speed": 115 }, description: "Gain increased out-of-combat movement speed.", tier: 2 },
  { id: "lucidity-boots", name: "Ionian Boots of Lucidity", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3158.png", cost: 950, stats: { "Ability Haste": 20, "Movement Speed": 45 }, description: "Reduces summoner spell cooldowns by 12%.", tier: 2 },
  { id: "swiftness", name: "Boots of Swiftness", image: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/3009.png", cost: 900, stats: { "Movement Speed": 60 }, description: "Reduces the effectiveness of slows by 25%.", tier: 2 },
];

// Viego optimal items
const viegoOptimal = ["divine-sunderer", "botrk", "steraks", "deaths-dance", "maw", "ninja-tabi", "galeforce", "kraken-slayer", "infinity-edge"];

// Nunu optimal items
const nunuOptimal = ["sunfire", "thornmail", "force-nature", "abyssal", "randuins", "merc-treads", "frostfire"];

// Gwen optimal items
const gwenOptimal = ["riftmaker", "nashors", "zhonyas", "cosmic", "rabadons", "merc-treads", "banshees"];

// Champion-specific function to determine optimal items
const isOptimalFor = (itemId: string, championId: string) => {
  if (championId === "viego") return viegoOptimal.includes(itemId);
  if (championId === "nunu") return nunuOptimal.includes(itemId);
  if (championId === "gwen") return gwenOptimal.includes(itemId);
  return false;
};

const ChampionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [level, setLevel] = useState<number>(1);
  const [inventory, setInventory] = useState<Array<any>>([]);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const champion = championsData.find(champ => champ.id === id);
  
  // Add optimal flag to items based on champion
  const markOptimalItems = (items: any[], championId: string) => {
    return items.map(item => ({
      ...item,
      optimal: isOptimalFor(item.id, championId || "")
    }));
  };
  
  // Apply champion-specific optimization to the full items list
  const processedItems = useMemo(() => {
    if (!champion) return [];
    return markOptimalItems(gameItems, champion.id);
  }, [champion]);
  
  // Calculate inventory stat modifiers
  const calculateInventoryModifiers = () => {
    const modifiers: {[key: string]: number} = {};
    
    inventory.forEach(item => {
      Object.entries(item.stats).forEach(([stat, value]) => {
        // Only handle numeric values
        if (typeof value === 'number') {
          if (!modifiers[stat]) modifiers[stat] = 0;
          modifiers[stat] += value as number;
        }
      });
    });
    
    return modifiers;
  };

  // Handle inventory changes
  const handleInventoryChange = (newInventory: any[]) => {
    setInventory(newInventory);
  };

  // Handle opponent selection
  const handleOpponentSelect = (opponent: string) => {
    setSelectedOpponent(opponent);
  };

  if (!champion) {
    return (
      <div className="min-h-screen flex items-center justify-center noxian-gradient">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Champion Not Found</h1>
          <Link to="/">
            <Button className="noxian-button">
              <ChevronLeft className="mr-2" />
              Return to Champion Selection
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Define base stats for the champion - This would normally come from your data
  const championBaseStats = {
    "Health": { base: champion.id === "viego" ? 630 : champion.id === "nunu" ? 580 : 550, perLevel: champion.id === "viego" ? 109 : champion.id === "nunu" ? 90 : 85 },
    "Attack Damage": { base: champion.id === "viego" ? 60 : champion.id === "nunu" ? 61 : 63, perLevel: 3.5 },
    "Armor": { base: champion.id === "viego" ? 34 : champion.id === "nunu" ? 29 : 39, perLevel: 4 },
    "Magic Resist": { base: champion.id === "viego" ? 32 : champion.id === "nunu" ? 32 : 32, perLevel: 1.25 },
    "Attack Speed": { base: champion.id === "viego" ? 0.658 : champion.id === "nunu" ? 0.625 : 0.69, perLevel: 0.025 },
    "Movement Speed": { base: champion.id === "viego" ? 345 : champion.id === "nunu" ? 340 : 340, perLevel: 0 }
  };

  // Champion abilities data - this would normally come from your API
  const championAbilities = {
    viego: [
      {
        name: "Blade of the Ruined King",
        key: "P",
        description: "Viego can temporarily possess enemy champions he helps kill, healing for a portion of their max health and gaining access to their basic abilities.",
        cooldown: "N/A",
        cost: "N/A",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/passive/ViegoP.png"
      },
      {
        name: "Blade of the Ruined King",
        key: "Q",
        description: "Viego thrusts his blade forward, dealing damage to all enemies hit. The blade deals bonus damage to monsters.",
        cooldown: "5s",
        cost: "No Cost",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/ViegoQ.png"
      },
      {
        name: "Spectral Maw",
        key: "W",
        description: "Viego charges up and dashes forward, stunning and damaging the first enemy hit.",
        cooldown: "13/12/11/10/9s",
        cost: "No Cost",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/ViegoW.png"
      },
      {
        name: "Harrowed Path",
        key: "E",
        description: "Viego spreads Black Mist around a nearby wall. While in the mist, Viego gains camouflage and increased attack speed.",
        cooldown: "20/19/18/17/16s",
        cost: "No Cost",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/ViegoE.png"
      },
      {
        name: "Heartbreaker",
        key: "R",
        description: "Viego discards any body he is possessing and teleports forward, attacking the enemy champion with the lowest percent health and dealing bonus damage based on their missing health.",
        cooldown: "120/100/80s",
        cost: "No Cost", 
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/ViegoR.png"
      }
    ],
    nunu: [
      {
        name: "Call of the Freljord",
        key: "P",
        description: "Nunu and Willump's spells and attacks mark champions, large monsters, and large minions with Snowbind, causing their next attack to root.",
        cooldown: "N/A",
        cost: "N/A",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/passive/NunuPassive.png"
      },
      {
        name: "Consume",
        key: "Q",
        description: "Willump takes a bite out of an enemy, dealing true damage to monsters and healing himself.",
        cooldown: "12/11/10/9/8s",
        cost: "60 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/NunuQ.png"
      },
      {
        name: "Biggest Snowball Ever!",
        key: "W",
        description: "Nunu and Willump roll a snowball that grows in size and speed, damaging and knocking up enemies when it hits them.",
        cooldown: "14s",
        cost: "50 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/NunuW.png"
      },
      {
        name: "Snowball Barrage",
        key: "E",
        description: "Nunu throws up to 3 snowballs that damage and slow enemies, with the final snowball rooting them.",
        cooldown: "14/13/12/11/10s",
        cost: "50 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/NunuE.png"
      },
      {
        name: "Absolute Zero",
        key: "R",
        description: "Nunu and Willump create an ice storm that slows enemies and deals massive damage after channeling.",
        cooldown: "120/110/100s",
        cost: "100 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/NunuR.png"
      }
    ],
    gwen: [
      {
        name: "Thousand Cuts",
        key: "P",
        description: "Gwen's attacks deal bonus magic damage on-hit based on a percentage of her enemies' maximum health.",
        cooldown: "N/A",
        cost: "N/A",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/passive/GwenP.png"
      },
      {
        name: "Snip Snip!",
        key: "Q",
        description: "Gwen snips her scissors 2-6 times, dealing magic damage in a cone. The center of each snip deals true damage and applies Thousand Cuts.",
        cooldown: "6.5s",
        cost: "50 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/GwenQ.png"
      },
      {
        name: "Hallowed Mist",
        key: "W",
        description: "Gwen creates a mist for 5 seconds that grants her bonus armor and magic resist. Enemies outside the mist cannot target Gwen.",
        cooldown: "20s",
        cost: "70 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/GwenW.png"
      },
      {
        name: "Skip 'n Slash",
        key: "E",
        description: "Gwen dashes and gains attack speed, range, and on-hit magic damage for 4 seconds. Each attack reduces this ability's cooldown.",
        cooldown: "13s",
        cost: "40 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/GwenE.png"
      },
      {
        name: "Needlework",
        key: "R",
        description: "Gwen fires needles in a line that deal magic damage and slow enemies. She can recast this ability 2 more times with increased effects.",
        cooldown: "120/100/80s",
        cost: "100 Mana",
        icon: "https://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/GwenR.png"
      }
    ]
  };

  // Get abilities for the selected champion
  const abilities = championAbilities[id as keyof typeof championAbilities] || [];

  return (
    <div className="min-h-screen noxian-gradient text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="noxian-button">
              <ChevronLeft className="mr-2" />
              Back to Champions
            </Button>
          </Link>
          
          <LaneOpponentDropdown 
            onSelectOpponent={handleOpponentSelect}
            selectedOpponent={selectedOpponent}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1"
          >
            <div className="relative rounded-lg overflow-hidden noxian-border border border-red-800/40 mb-6">
              <img 
                src={champion.image} 
                alt={champion.name}
                className="w-full h-64 object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                <h1 className="text-3xl font-bold noxian-gold-text">{champion.name}</h1>
                <p className="text-red-300">{champion.title}</p>
              </div>
            </div>
            
            <ChampionAbilities abilities={abilities} />
            
            <ChampionStats 
              level={level} 
              stats={championBaseStats} 
              modifiers={calculateInventoryModifiers()} 
            />

            <div className="mt-6">
              <LevelSelector 
                level={level} 
                setLevel={setLevel}
                maxLevel={18} 
              />
            </div>
            
            <Inventory 
              onInventoryChange={handleInventoryChange}
              allItems={processedItems}
              championLevel={level}
              selectedOpponent={selectedOpponent}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 md:col-span-2"
          >
            <Tabs defaultValue="builds" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-red-950/50 border border-red-800/50">
                <TabsTrigger value="builds" className="data-[state=active]:bg-red-800 data-[state=active]:text-amber-200">Item Builds</TabsTrigger>
                <TabsTrigger value="runes" className="data-[state=active]:bg-red-800 data-[state=active]:text-amber-200">Runes</TabsTrigger>
                <TabsTrigger value="counters" className="data-[state=active]:bg-red-800 data-[state=active]:text-amber-200">Counters & Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="builds" className="mt-4">
                <div className="space-y-6">
                  {champion.builds.map((build, index) => (
                    <motion.div 
                      key={build.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="noxian-card p-4 border border-red-800/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold noxian-gold-text">{build.type} Build</h3>
                        {(build.type === "Standard" || build.type === "Tank" || build.type === "Fighter") && (
                          <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                            <Star size={12} /> Recommended
                          </span>
                        )}
                      </div>
                      <p className="mb-4 text-gray-300">{build.description}</p>
                      
                      <div className="space-y-4">
                        {build.itemSets.map((itemSet) => (
                          <div key={itemSet.phase} className="space-y-2 bg-black/30 p-3 rounded border border-red-900/30">
                            <h4 className="font-semibold text-lg text-amber-300 flex justify-between">
                              <span>{itemSet.phase}</span>
                              {itemSet.recommendedLevel && (
                                <span className="text-sm text-red-300 flex items-center">
                                  Level {itemSet.recommendedLevel}+
                                </span>
                              )}
                            </h4>
                            
                            <div className="flex flex-wrap gap-2">
                              {itemSet.items.map((item) => (
                                <ItemTooltip 
                                  key={item.id} 
                                  item={{...item, optimal: build.type === "Standard" || build.type === "Tank" || build.type === "Fighter"}} 
                                  championLevel={level}
                                  isCounterItem={selectedOpponent && item.counteredOpponents && item.counteredOpponents.includes(selectedOpponent)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {selectedOpponent && (
                        <div className="mt-4 p-3 bg-purple-900/20 border border-purple-800/30 rounded">
                          <h4 className="font-semibold text-purple-300 mb-2">Counter items against {selectedOpponent}</h4>
                          <div className="flex flex-wrap gap-2">
                            {processedItems
                              .filter(item => item.counteredOpponents && item.counteredOpponents.includes(selectedOpponent))
                              .map((item, idx) => (
                                <ItemTooltip 
                                  key={idx}
                                  item={item}
                                  championLevel={level}
                                  isCounterItem={true}
                                />
                              ))
                            }
                            {processedItems.filter(item => 
                              item.counteredOpponents && 
                              item.counteredOpponents.includes(selectedOpponent)
                            ).length === 0 && (
                              <p className="text-sm text-gray-400">No specific counter items found for this opponent.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="runes" className="mt-4">
                <div className="noxian-card p-4">
                  <h3 className="text-xl font-bold mb-4 noxian-gold-text">Recommended Runes</h3>
                  
                  {champion.runes.map((runeSet, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="mb-6 last:mb-0"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-amber-300 mb-2">{runeSet.name}</h4>
                        {index === 0 && (
                          <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                            <Star size={12} /> Recommended
                          </span>
                        )}
                      </div>
                      <p className="mb-3 text-gray-300">{runeSet.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2 text-amber-400">Primary Path: {runeSet.primaryPath}</h5>
                          <div className="space-y-2 bg-black/30 p-3 rounded border border-red-900/30">
                            {runeSet.primaryRunes.map((rune) => (
                              <div key={rune.name} className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-red-900/70 flex items-center justify-center">
                                  <span className="text-xs">{rune.name.substring(0, 1)}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-amber-200">{rune.name}</p>
                                  <p className="text-xs text-gray-300">{rune.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2 text-amber-400">Secondary Path: {runeSet.secondaryPath}</h5>
                          <div className="space-y-2 bg-black/30 p-3 rounded border border-red-900/30">
                            {runeSet.secondaryRunes.map((rune) => (
                              <div key={rune.name} className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-red-900/70 flex items-center justify-center">
                                  <span className="text-xs">{rune.name.substring(0, 1)}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-amber-200">{rune.name}</p>
                                  <p className="text-xs text-gray-300">{rune.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="font-medium mb-2 text-amber-400">Stat Shards</h5>
                        <div className="flex gap-3">
                          {runeSet.statShards.map((shard, i) => (
                            <div key={i} className="bg-black/30 px-3 py-1 rounded-full text-sm border border-red-900/30">
                              {shard}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="counters" className="mt-4">
                <div className="noxian-card p-4 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-3 noxian-gold-text">Strong Against</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {champion.counters.strongAgainst.map((counter) => (
                        <div key={counter.champion} className="flex items-center gap-3 bg-black/30 p-3 rounded border border-red-900/30">
                          <div className="w-12 h-12 rounded-full bg-red-900/70 overflow-hidden border border-red-700/50">
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                              {counter.champion[0]}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-amber-300">{counter.champion}</p>
                            <p className="text-sm text-gray-300">{counter.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-3 noxian-gold-text">Weak Against</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {champion.counters.weakAgainst.map((counter) => (
                        <div key={counter.champion} className="flex items-center gap-3 bg-black/30 p-3 rounded border border-red-900/30">
                          <div className="w-12 h-12 rounded-full bg-red-900/70 overflow-hidden border border-red-700/50">
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                              {counter.champion[0]}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-red-300">{counter.champion}</p>
                            <p className="text-sm text-gray-300">{counter.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold mb-3 noxian-gold-text">Pro Tips</h3>
                    <ul className="space-y-2">
                      {champion.tips.map((tip, index) => (
                        <li key={index} className="bg-black/30 p-3 rounded border border-red-900/30">
                          <p>{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChampionDetail;
