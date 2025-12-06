import React, { JSX } from 'react';
import styles from './styles.module.css';

/**
 * LanguageSelector Component
 * Allows users to switch between available languages (English, Urdu)
 * Typically placed in the footer or navbar
 */
export default function LanguageSelector(): JSX.Element {
  return (
    <div className={styles.selector}>
      <label htmlFor="language-select">Select Language:</label>
      <select id="language-select" className={styles.select}>
        <option value="en">English</option>
        <option value="ur">اردو (Urdu)</option>
      </select>
    </div>
  );
}
