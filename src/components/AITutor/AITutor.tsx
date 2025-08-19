import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  BookOpen,
  Brain,
  Target,
} from 'lucide-react';
import Button from '../UI/Button';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'explanation' | 'example' | 'step-by-step' | 'concept';
}

interface QuickPrompt {
  icon: React.ComponentType<any>;
  title: string;
  prompt: string;
  category: string;
}

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Study Tutor. I can help you with:\n\n• **Step-by-step explanations** of complex topics\n• **Practice problems** with detailed solutions\n• **Concept clarification** in any subject\n• **Study strategies** and learning tips\n\nWhat would you like to learn about today?",
      timestamp: new Date(),
      category: 'explanation'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts: QuickPrompt[] = [
    {
      icon: Lightbulb,
      title: 'Explain Concept',
      prompt: 'Can you explain the concept of',
      category: 'Concepts'
    },
    {
      icon: Target,
      title: 'Solve Problem',
      prompt: 'Help me solve this step by step:',
      category: 'Problems'
    },
    {
      icon: BookOpen,
      title: 'Study Strategy',
      prompt: 'What\'s the best way to study',
      category: 'Study Tips'
    },
    {
      icon: Brain,
      title: 'Memory Technique',
      prompt: 'How can I remember',
      category: 'Memory'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    // Simulate AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
      return `Great question! Let me break this down for you:\n\n**Key Concept:**\n${userMessage.replace(/explain|what is/gi, '').trim()} is an important topic. Here's how I'd explain it:\n\n**Step 1: Foundation**\nFirst, let's establish the basic understanding...\n\n**Step 2: Core Principles**\nThe main principles involve...\n\n**Step 3: Practical Application**\nIn real-world scenarios, this applies when...\n\n**💡 Memory Tip:** Try to remember this using the acronym method or visual associations!\n\n**📚 Next Steps:** Would you like me to provide practice problems or examples?`;
    }
    
    if (lowerMessage.includes('solve') || lowerMessage.includes('problem')) {
      return `Let's solve this step by step! 🎯\n\n**Problem Analysis:**\nI can see this involves... Let me walk you through the solution:\n\n**Step 1: Identify what we know**\n• Given information: ...\n• What we need to find: ...\n\n**Step 2: Choose the right approach**\nFor this type of problem, the best method is...\n\n**Step 3: Apply the solution**\n1. First, we...\n2. Then, we...\n3. Finally, we...\n\n**✅ Answer:** [Solution would appear here]\n\n**🔍 Check:** Let's verify our answer makes sense...\n\nWould you like me to show you similar problems for practice?`;
    }
    
    if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      return `Excellent! Here's a personalized study strategy for you: 📚\n\n**🎯 Effective Study Techniques:**\n\n**1. Active Recall**\n• Test yourself regularly without looking at notes\n• Use flashcards for key concepts\n• Explain topics out loud\n\n**2. Spaced Repetition**\n• Review material at increasing intervals\n• Use the 1-3-7-21 day method\n• Focus more time on difficult concepts\n\n**3. Pomodoro Technique**\n• Study for 25 minutes, break for 5\n• Take longer breaks every 4 sessions\n• Stay focused during study blocks\n\n**💡 Pro Tips:**\n• Create mind maps for visual learning\n• Form study groups for discussion\n• Practice with real-world examples\n\nWhat specific subject are you studying? I can give more targeted advice!`;
    }
    
    return `I understand you're asking about: "${userMessage}"\n\nLet me provide a comprehensive explanation:\n\n**Overview:**\nThis is an interesting topic that involves several key components...\n\n**Detailed Breakdown:**\n• **Aspect 1:** This relates to...\n• **Aspect 2:** Another important factor is...\n• **Aspect 3:** We should also consider...\n\n**Practical Examples:**\n1. For instance, when...\n2. Another example would be...\n3. In real-world applications...\n\n**🎓 Study Tip:** To master this concept, try creating your own examples and explaining it to someone else!\n\nIs there a specific part you'd like me to elaborate on further?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        category: 'explanation'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt + ' ');
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-semibold text-gray-900 dark:text-white mb-2">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      if (line.startsWith('• ')) {
        return (
          <div key={index} className="ml-4 mb-1 text-gray-700 dark:text-gray-300">
            {line}
          </div>
        );
      }
      if (line.includes('💡') || line.includes('🎯') || line.includes('📚') || line.includes('✅') || line.includes('🔍')) {
        return (
          <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg my-2 text-blue-800 dark:text-blue-200">
            {line}
          </div>
        );
      }
      return line ? (
        <div key={index} className="mb-1 text-gray-700 dark:text-gray-300">
          {line}
        </div>
      ) : (
        <div key={index} className="mb-2" />
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Q&A Tutor
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get instant answers and step-by-step explanations
            </p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => {
            const Icon = prompt.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickPrompt(prompt.prompt)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm transition-colors"
              >
                <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-300">{prompt.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary-500' 
                      : 'bg-gradient-to-br from-purple-500 to-blue-500'
                  }`}>
                    {message.type === 'user' ? (
                      <span className="text-white text-sm font-medium">U</span>
                    ) : (
                      <Brain className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}>
                      {message.type === 'user' ? (
                        <div>{message.content}</div>
                      ) : (
                        <div className="prose prose-sm max-w-none">
                          {formatMessage(message.content)}
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center space-x-2 mt-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      {message.type === 'ai' && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your studies..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            variant="primary"
            icon={Send}
            className="px-6"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
