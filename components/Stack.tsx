"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  isSpread: boolean;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  isSpread,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className={isSpread ? "relative" : "absolute"}
      style={isSpread ? {} : { x, y, rotateX, rotateY }}
      drag // ✅ Always draggable
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 180,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
          },
          {
            id: 2,
            img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
          },
          {
            id: 3,
            img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
          },
          {
            id: 4,
            img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
          },
        ]
  );

  const [spreadView, setSpreadView] = useState(false);

  // ✅ Double-click toggles spread view (still active only for large screens)
  const handleDoubleClick = () => {
    if (window.innerWidth >= 768) {
      setSpreadView((prev) => !prev);
    }
  };

  // Keep layout consistent on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSpreadView(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`transition-all duration-500 ease-in-out ${
        spreadView
          ? "flex flex-wrap gap-4 justify-start items-start"
          : "relative"
      }`}
      style={{
        perspective: 800,
        width: spreadView ? "100%" : cardDimensions.width,
        height: spreadView ? "auto" : cardDimensions.height,
      }}
    >
      {cards.map((card, index) => {
        // eslint-disable-next-line react-hooks/purity
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            isSpread={spreadView}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white shadow-lg cursor-grab"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: spreadView
                  ? 0
                  : (cards.length - index - 1) * 4 + randomRotate,
                scale: spreadView ? 1 : 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: spreadView ? "center" : "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <Image
                src={card.img}
                alt={`card-${card.id}`}
                width={500}
                height={500}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
