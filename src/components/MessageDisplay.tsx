import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageDisplayProps {
  messages?: Message[];
  isTyping?: boolean;
}

const MessageDisplay = ({
  messages = [],
  isTyping = false,
}: MessageDisplayProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const AIAvatar = ({ isTyping = false }) => (
    <motion.div
      className="mr-3 flex-shrink-0 relative"
      animate={{
        scale: isTyping ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 2,
        repeat: isTyping ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-md"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <Avatar className="relative border-2 border-blue-200/50 dark:border-blue-800/50">
        <AvatarImage
          src="https://api.dicebear.com/7.x/bottts/svg?seed=query-mind"
          alt="AI"
        />
        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
          AI
        </AvatarFallback>
      </Avatar>
      {/* Blinking effect */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"
        animate={{
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 bg-transparent">
      <div className="flex-1 space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "ai" && <AIAvatar />}
            <motion.div
              className={`max-w-[75%] rounded-2xl px-5 py-3 backdrop-blur-sm ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </motion.div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-start"
          >
            <AIAvatar isTyping={true} />
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-5 py-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex space-x-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: 0.2,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: 0.4,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageDisplay;
