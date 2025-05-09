import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChampionCard } from "@/components/ChampionCard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  const champions = [
    {
      id: "viego",
      name: "Viego",
      title: "The Ruined King",
      image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Viego.png",
      description: "Sovereign of a long-lost kingdom, Viego wields the power of the Ruination in his quest to find his wife's soul."
    },
    {
      id: "nunu",
      name: "Nunu & Willump",
      title: "The Boy and His Yeti",
      image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Nunu.png",
      description: "Once upon a time, there was a boy who wanted to prove he was a hero by slaying a fearsome monster—only to discover that the beast was a lonely yeti who just needed a friend."
    },
    {
      id: "gwen",
      name: "Gwen",
      title: "The Hallowed Seamstress",
      image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Gwen.png",
      description: "A doll brought to life by magic, Gwen wields the very tools that once created her and carries the love that made her in every stitch."
    },
    {
      id: "hecarim",
      name: "Hecarim",
      title: "The Shadow of War",
      image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Hecarim.png",
      description: "Hecarim is a spectral fusion of man and beast, cursed to ride down the souls of the living for all eternity. When the Blessed Isles fell into shadow, this proud knight was obliterated by the destructive energies."
    },
    {
      id: "kindred",
      name: "Kindred",
      title: "The Eternal Hunters",
      image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Kindred.png",
      description: "Separate, but never parted, Kindred represents the twin essences of death. Lamb's bow offers a swift release to those who accept their fate. Wolf hunts those who run from their end."
    },
    {
      id: "rengar",
      name: "Rengar",
      title: "The Pridestalker",
      image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Rengar.png",
      description: "A ferocious vastayan hunter who tracks, hunts, and kills dangerous creatures, Rengar takes joy in each kill as he collects trophies and seeks out ever greater challenges."
    }
  ];

  return (
    <div className="min-h-screen noxian-gradient text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold text-center mb-4 noxian-gold-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          BetterJungle
        </motion.h1>
        
        <motion.p 
          className="text-xl text-center text-red-200 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My personal favorite jungle champions and their optimal builds (bc blitz EATS CPU)
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {champions.map((champion, index) => (
            <motion.div
              key={champion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={`/champion/${champion.id}`}>
                      <ChampionCard {...champion} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="noxian-card border-red-700">
                    <div className="max-w-md">
                      <p className="font-semibold noxian-gold-text">{champion.name}: {champion.title}</p>
                      <p className="text-sm text-gray-200">{champion.description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
