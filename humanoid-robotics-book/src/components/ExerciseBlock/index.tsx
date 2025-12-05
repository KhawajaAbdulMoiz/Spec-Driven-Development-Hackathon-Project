import React from 'react';
import styles from './styles.module.css';

interface ExerciseBlockProps {
  title?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  children: React.ReactNode;
}

/**
 * ExerciseBlock Component
 * Wraps exercise questions and activities with consistent styling
 */
export default function ExerciseBlock({
  title = 'Exercise',
  difficulty = 'beginner',
  children,
}: ExerciseBlockProps): JSX.Element {
  const difficultyEmoji = {
    beginner: '🟢',
    intermediate: '🟡',
    advanced: '🔴',
  };

  return (
    <div className={`${styles.block} ${styles[difficulty]}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {difficultyEmoji[difficulty]} {title}
        </h3>
        <span className={styles.badge}>{difficulty}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
