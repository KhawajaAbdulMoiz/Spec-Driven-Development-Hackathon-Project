/**
 * Custom Docusaurus Layout
 * Wraps all pages with the ChatBot component globally
 * This ensures the AI assistant is available on every page
 */

import React from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import ChatbotWidget from '../../components/ChatbotWidget';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <Layout {...props} />
      <ChatbotWidget />
    </>
  );
}
