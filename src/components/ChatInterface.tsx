import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Send, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatInterface = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Apply theme class to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Show AI typing
    setIsTyping(true);

    try {
      // Call the actual API
      const response = await fetch("https://localhost:7000/query/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Question: text }),
      });

      const aiResponseText = await response.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Fallback to mock response if API fails
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Simple mock AI response generator
  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question. Let me think about that...",
      "I understand your query. Here's what I found...",
      "Based on my knowledge, I can tell you that...",
      "Great question! The answer is quite fascinating...",
      "I've analyzed your request and here's my response...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const suggestedQuestions = [
    "How many fulltime employees are there in each department?",
    "How many employees are contractors and fulltime",
    "Show average salary by department",
    "How many trips were completed in Seattle yesterday?",
    "What's the revenue trend for the past 3 months?",
  ];

  const EmptyState = () => (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo and Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Brain className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-4 w-4 text-purple-500" />
            </motion.div>
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-2">
          QueryMind
        </h1>
        <p className="text-lg text-muted-foreground">
          Ask your data anything. Start with a question or pick a suggestion.
        </p>
      </motion.div>

      {/* Suggested Questions */}
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid gap-3 mb-8">
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="p-4 text-left rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium text-foreground">
                {question}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 transition-colors duration-300">
      {/* Header */}
      <motion.header
        className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            QueryMind
          </motion.div>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-purple-600"
          />
          <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <MessageDisplay messages={messages} isTyping={isTyping} />
        )}
      </div>

      {/* Message Input Area */}
      <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <MessageInput
          onSendMessage={handleSendMessage}
          isLoading={isTyping}
          suggestedQuestions={
            messages.length === 0 ? suggestedQuestions : undefined
          }
        />
      </div>
    </div>
  );
};

export default ChatInterface;
