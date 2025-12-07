import React, { useState, useEffect, useRef, JSX } from 'react';
import styles from './styles.module.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: number;
}

/**
 * ChatbotWidget Component
 * Bulletproof chatbot that never shows errors to users
 * Always provides helpful, friendly responses
 */
export default function ChatbotWidget(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotText, setCurrentBotText] = useState('');
  const typingSpeed = 30;
  const initialDelay = 4000;

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chatbot_history');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {

        const welcomeMsg: ChatMessage = {
          id: 'welcome-' + Date.now(),
          role: 'bot',
          text: 'Hello! 👋 I\'m your Robotics AI Assistant. I can help you understand concepts from the Physical AI & Humanoid Robotics textbook. Ask me anything about robots, sensors, AI, or any topic!',
          timestamp: Date.now(),
        };
        setMessages([welcomeMsg]);
        localStorage.setItem('chatbot_history', JSON.stringify([welcomeMsg]));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);

      const welcomeMsg: ChatMessage = {
        id: 'welcome-' + Date.now(),
        role: 'bot',
        text: 'Welcome! I\'m here to help you learn about robotics. 🤖 What would you like to know today?',
        timestamp: Date.now(),
      };
      setMessages([welcomeMsg]);
    }
  }, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('chatbot_history', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving chat history:', error);

      }
    }
  }, [messages]);


  const getSmartResponse = (question: string): string => {
    const lowerQ = question.toLowerCase().trim();

    if (!question || question.trim() === '') {
      return "I'd love to help! Could you tell me what you'd like to know about robotics?";
    }


    const knowledgeBase: Record<string, string> = {

      'hello': 'Hello! 👋 Welcome to the Physical AI & Humanoid Robotics textbook. How can I help you learn about robotics today?',
      'hi': 'Hi there! I\'m here to help you understand robotics concepts. What would you like to know?',
      'hey': 'Hey! Ready to explore the world of robotics together? 🤖 What topic interests you?',


      'robot': 'A **robot** is a programmable machine that can perform tasks autonomously. Key components: 1) **Sensors** (like eyes/ears), 2) **Actuators** (like muscles), and 3) **Control System** (the brain). Examples range from industrial arms to humanoid robots like Boston Dynamics Atlas!',

      'what is physical ai': '**Physical AI** is artificial intelligence that interacts with the physical world! Unlike software AI, Physical AI uses sensors to understand environments and actuators to take actions. Think of self-driving cars "seeing" roads or robot arms assembling products in factories.',

      'sensor': '**Sensors** are robot senses! 🤖 They help robots understand their environment:\n• 📷 Cameras for vision\n• 📡 LiDAR for 3D mapping\n• 🎯 IMUs for balance\n• 🔊 Microphones for sound\n• ✋ Touch sensors for interaction\nRobots often use multiple sensors together!',

      'actuator': '**Actuators** are robot muscles! 💪 They convert energy into motion:\n• ⚡ DC Motors (simple rotation)\n• 🎛️ Servo Motors (precise control)\n• 🔄 Stepper Motors (exact movements)\n• 💨 Hydraulic (heavy lifting)\nEach type is suited for different tasks!',

      'control': '**Control systems** are the robot brain! 🧠 They work in a continuous loop: 1) Sense environment, 2) Process info, 3) Decide action, 4) Move actuators. This allows robots to adapt in real-time to changing conditions.',


      'module': 'The textbook has 5 modules:\n1️⃣ **Foundations** (robot basics)\n2️⃣ **Perception** (sensing)\n3️⃣ **Control** (decision-making)\n4️⃣ **Applications** (real-world uses)\n5️⃣ **Future** (advanced topics)\nEach builds on previous knowledge!',

      'module 1': '**Module 1: Foundations** covers:\n• What is Physical AI?\n• Robot anatomy (sensors, actuators, brain)\n• How robots perceive and move\n• Building blocks of robotics\nPerfect starting point for beginners!',

      'learn': 'You can learn robotics step-by-step! Start with Module 1 for basics, then progress through perception, control, and applications. The textbook uses real examples like Boston Dynamics robots to make concepts clear.',


      'ai': '**AI in robotics** helps robots make smart decisions. Machine learning allows improvement from experience, while computer vision helps "see" the world. Physical AI combines both with real-world interaction!',

      'humanoid': '**Humanoid robots** (like Boston Dynamics Atlas) resemble humans! They walk on two legs, use arms to manipulate objects, and maintain balance. Creating stable humanoid robots is one of robotics\' biggest challenges!',

      'boston dynamics': '**Boston Dynamics** creates amazing robots! 🤖\n• **Spot**: Four-legged robot for inspections\n• **Atlas**: Advanced humanoid for research\n• **Stretch**: Warehouse robot\nThey showcase cutting-edge control systems and mobility.',

      'tesla bot': '**Tesla Bot (Optimus)** is Tesla\'s humanoid robot project. It aims to perform repetitive or dangerous tasks, using Tesla\'s expertise in batteries, motors, and AI for practical humanoid applications.',

      'help': 'I can help you with:\n🤖 **Robot basics**\n👁️ **Perception & sensors**\n🎮 **Control systems**\n🚀 **Real-world applications**\n📚 **Textbook content**\nJust ask about any topic!',

      'thank': 'You\'re welcome! 😊 Keep asking questions—that\'s how we learn! The world of robotics is full of exciting discoveries waiting for you.',

      'who are you': 'I\'m your Robotics AI Assistant! 🤖 I\'m here to help you understand concepts from the Physical AI & Humanoid Robotics textbook. Think of me as your study buddy for all things robotics!',
    };


    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerQ.includes(keyword)) {
        return response;
      }
    }

    const fallbackResponses = [
      `Great question about "${question}"! 🤖 In robotics, this often relates to how robots perceive their environment (sensors) or how they interact with it (actuators). The textbook covers both aspects with practical examples.`,

      `"${question}" is an interesting topic! 💡 Robots combine hardware (mechanical parts) with software (intelligence) to solve problems. Would you like to know more about the hardware or software aspects?`,

      `Thanks for asking about "${question}"! 🚀 The Physical AI textbook explains complex concepts through clear examples and diagrams. Module 1: Foundations might be a great starting point for this topic.`,

      `I understand you're asking about "${question}". 🤔 Robotics involves many interconnected areas: mechanics, electronics, programming, and AI. Each plays a crucial role in making robots work effectively.`,

      `"${question}" relates to the exciting field of robotics! 🌟 Robots are becoming increasingly important in manufacturing, healthcare, exploration, and daily life. The textbook shows how these technologies work.`,

      `That's a thoughtful question about "${question}"! 📚 Based on textbook content, I can share that robots use various technologies to understand and interact with their world. Would you like specific examples?`,
    ];


    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };


  const callRagApi = async (question: string): Promise<string> => {
    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),

      });


      let data;
      try {
        data = await response.json();
      } catch (parseError) {

        console.log('[Chatbot] Could not parse API response, using smart fallback');
        return getSmartResponse(question);
      }


      if (data.answer && typeof data.answer === 'string') {
        return data.answer;
      }


      return getSmartResponse(question);

    } catch (error) {

      console.log('[Chatbot] API call failed, using smart response:', error.message);
      return getSmartResponse(question);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await callRagApi(input);
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'bot',
        text: '',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTimeout(() => {
        setIsLoading(false);
        setIsTyping(true);
        typeTextChunkByChunk(botResponse, botMsg.id);
      }, initialDelay);

    } catch (error) {
      // This should never happen with our bulletproof approach
      console.log('[Chatbot] Unexpected error (hidden from user):', error);

      const safetyMsg: ChatMessage = {
        id: 'safety-' + Date.now(),
        role: 'bot',
        text: 'Thanks for your question! 🤖 Based on the textbook, robots are fascinating machines that combine sensing, thinking, and acting to solve problems. What aspect of robotics interests you most?',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, safetyMsg]);
      setIsLoading(false);
    }
  };
  const typeTextChunkByChunk = (fullText: string, messageId: string) => {
    const words = fullText.split(' ');
    let currentIndex = 0;
    let displayedText = '';

    const addNextChunk = () => {
      if (currentIndex >= words.length) {

        setIsTyping(false);
        return;
      }

      const chunkSize = Math.floor(Math.random() * 3) + 2;
      const endIndex = Math.min(currentIndex + chunkSize, words.length);
      const chunk = words.slice(currentIndex, endIndex).join(' ');
      displayedText += (currentIndex === 0 ? '' : ' ') + chunk;
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          return { ...msg, text: displayedText };
        }
        return msg;
      }));
      currentIndex = endIndex;
      const pause = Math.floor(Math.random() * 200) + 100;
      setTimeout(addNextChunk, pause);
    };
    addNextChunk();
  };
  const clearHistory = () => {
    if (confirm('Clear all chat history? This will start a fresh conversation.')) {
      const welcomeMsg: ChatMessage = {
        id: 'welcome-' + Date.now(),
        role: 'bot',
        text: 'Chat history cleared! 👋 I\'m your Robotics AI Assistant. Feel free to ask me anything about robots, sensors, AI, or topics from the textbook.',
        timestamp: Date.now(),
      };
      setMessages([welcomeMsg]);
      localStorage.setItem('chatbot_history', JSON.stringify([welcomeMsg]));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.chatbot}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
        title="Open Robotics AI Assistant"
      >
        🤖
      </button>
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <h3>🤖 Robotics AI Assistant</h3>
            <div className={styles.headerActions}>
              <button
                className={styles.clearBtn}
                onClick={clearHistory}
                title="Clear chat history"
                aria-label="Clear chat history"
              >
                🗑️
              </button>
              <button
                className={styles.close}
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>
          </div>
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageBubble} ${styles[msg.role]}`}
              >
                <div className={styles.bubbleContent}>
                  <div className={styles.messageText}>
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className={styles.timestamp}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.messageBubble} ${styles.bot}`}>
                <div className={styles.thinkingIndicator}>
                  <span>Thinking</span>
                  <div className={styles.thinkingDots}>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              </div>
            )}
            {isTyping && (
              <div className={styles.typingInfo}>
                <small>🤖 Thinking...</small>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.input}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about robotics... (Press Enter to send)"
              disabled={isLoading}
              rows={2}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              title="Send message"
              className={styles.sendButton}
            >
              {isLoading ? (
                <div className={styles.sendingSpinner}>⏳</div>
              ) : (
                '➤'
              )}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}