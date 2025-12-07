import React, { JSX } from 'react';
import styles from './styles.module.css';

interface DiagramWrapperProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

/**
 * DiagramWrapper Component
 * Wraps Mermaid diagrams and other visualizations with consistent styling
 */
export default function DiagramWrapper({
  title,
  children,
  description,
}: DiagramWrapperProps): JSX.Element {
  return (
    <figure className={styles.figure}>
      <div className={styles.container}>
        {children}
      </div>
      <figcaption className={styles.caption}>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </figcaption>
    </figure>
  );
}
