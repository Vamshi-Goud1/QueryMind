import React, { useState, useEffect } from "react";
import { useTheme } from "../lib/theme-provider";
import ChatInterface from "./ChatInterface";
import { motion } from "framer-motion";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  // Ensure theme-related code only runs after component is mounted (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-1 flex flex-col">
        <ChatInterface />
      </main>
    </motion.div>
  );
};

export default Home;
