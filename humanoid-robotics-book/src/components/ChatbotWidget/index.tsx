import React, { useState } from 'react';
import styles from './styles.module.css';

/**
 * ChatbotWidget Component
 * Placeholder for RAG-powered chatbot for Q&A about robotics content
 * To be integrated with FastAPI backend + Qdrant vector database in Phase 9-10
 */
export default function ChatbotWidget(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.chatbot}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        💬
      </button>
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <h3>Robotics Assistant</h3>
            <button
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>
          <div className={styles.messages}>
            <div className={styles.message}>
              <p>
                Hi! I'm the Robotics Assistant. Ask me anything about the textbook content.
              </p>
              <p className={styles.status}>
                <em>(Chatbot integration coming soon)</em>
              </p>
            </div>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Ask a question..."
              disabled
            />
            <button disabled>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
