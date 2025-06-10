import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  MessageSquare,
  Database,
  Shield,
  Zap,
  ArrowRight,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle,
  Users,
  BarChart3,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import ChatInterface from "./ChatInterface";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode, mounted]);

  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (showChat) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background text-foreground flex flex-col"
      >
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            onClick={() => setShowChat(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Button>
        </div>
        <ChatInterface />
      </motion.div>
    );
  }

  const features = [
    {
      icon: MessageSquare,
      title: "Ask in Plain English",
      description:
        "No SQL knowledge required. Just ask your questions naturally and get instant answers.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Database,
      title: "Smart Database Understanding",
      description:
        "Automatically understands your SQL and MongoDB schemas to provide accurate insights.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Secure Data Access",
      description:
        "Enterprise-grade security ensures your data remains private and protected.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "AI-Powered Summaries",
      description:
        "Get intelligent summaries and insights that help you make better decisions.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Ask Your Question",
      description: "Type your question in natural language",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Our AI understands and processes your query",
      icon: Brain,
    },
    {
      number: "03",
      title: "Database Query",
      description: "Smart SQL/NoSQL queries are generated automatically",
      icon: Database,
    },
    {
      number: "04",
      title: "Instant Insights",
      description: "Get clear, actionable answers in seconds",
      icon: BarChart3,
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
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
              <Brain className="h-8 w-8 text-blue-500 dark:text-blue-400 relative z-10" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              QueryMind
            </span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-purple-600"
              />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <Button
              onClick={() => setShowChat(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
            >
              Try Now
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            {/* Glowing AI Avatar */}
            <motion.div
              className="relative inline-block mb-8"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-full">
                <Brain className="h-16 w-16 text-white" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            QueryMind
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Ask your data anything.
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
              Get instant answers.
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Button
              onClick={() => setShowChat(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg shadow-2xl shadow-blue-500/25 group"
            >
              Try QueryMind Now
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>10,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-500" />
              <span>50+ Countries</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How QueryMind Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From natural language to actionable insights in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative mb-6">
                    <motion.div
                      className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-10 -right-4 text-blue-300 dark:text-blue-600"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to unlock the power of your data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-4 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of teams already using QueryMind to make
              data-driven decisions faster than ever.
            </p>
            <Button
              onClick={() => setShowChat(true)}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-2xl group"
            >
              Start Your Free Trial
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              QueryMind
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 QueryMind. All rights reserved. Built with ❤️ for data teams
            everywhere.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
