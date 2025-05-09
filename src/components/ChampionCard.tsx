import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface ChampionCardProps extends HTMLMotionProps<"div"> {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
}

const ChampionCard = forwardRef<HTMLDivElement, ChampionCardProps>(
  ({ id, name, title, image, description, ...props }, ref) => {
    const MotionDiv = motion.div;
    
    return (
      <MotionDiv
        ref={ref}
        whileHover={{ scale: 1.05 }}
        className="noxian-card overflow-hidden cursor-pointer relative"
        {...props}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} // Remove the /images prefix
            alt={name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
            <h3 className="text-xl font-bold noxian-gold-text">{name}</h3>
            <p className="text-sm text-red-300">{title}</p>
          </div>
        </div>
      </MotionDiv>
    );
  }
);

ChampionCard.displayName = 'ChampionCard';

export { ChampionCard };
