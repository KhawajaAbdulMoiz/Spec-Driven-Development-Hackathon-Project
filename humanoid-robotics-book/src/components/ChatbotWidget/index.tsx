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
 * Full-featured RAG-powered chatbot with:
 * - Persistent message history via localStorage
 * - Floating UI with smooth animations
 * - API integration with RAG endpoint
 * - Typing indicators
 * - Message bubbles with timestamps
 */
export default function ChatbotWidget(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chatbot_history');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        // Initialize with welcome message
        const welcomeMsg: ChatMessage = {
          id: 'welcome-' + Date.now(),
          role: 'bot',
          text: 'Hi! I\'m the Robotics AI Assistant. Ask me anything about the textbook content, robotics concepts, or any module. Type your question below!',
          timestamp: Date.now(),
        };
        setMessages([welcomeMsg]);
        localStorage.setItem('chatbot_history', JSON.stringify([welcomeMsg]));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('chatbot_history', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
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
      // Call RAG API
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'bot',
        text: data.answer || 'No answer found. Please try rephrasing your question.',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Error calling RAG API:', error);
      const errorMsg: ChatMessage = {
        id: 'error-' + Date.now(),
        role: 'bot',
        text: 'Sorry, I encountered an error processing your question. Please try again or check your connection.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (confirm('Clear all chat history? This action cannot be undone.')) {
      const welcomeMsg: ChatMessage = {
        id: 'welcome-' + Date.now(),
        role: 'bot',
        text: 'Hi! I\'m the Robotics AI Assistant. Ask me anything about the textbook content, robotics concepts, or any module. Type your question below!',
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
                  <p>{msg.text}</p>
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
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.input}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question... (Shift+Enter for newline)"
              disabled={isLoading}
              rows={2}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              title="Send message"
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
