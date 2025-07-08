
"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  count?: number;
  rating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
}

export function StarRating({ count = 5, rating, onRatingChange, className }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    onRatingChange(index + 1);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(count)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={cn(
              "w-8 h-8 cursor-pointer transition-colors",
              starValue <= (hoverRating || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground"
            )}
            onMouseMove={() => handleMouseMove(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
}
