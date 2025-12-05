import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar with modules and chapters
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1: Foundations of Robotics',
      collapsible: true,
      collapsed: false,
      items: [
        'module-01-foundations/intro',
        'module-01-foundations/chapter-01-what-is-physical-ai',
        'module-01-foundations/chapter-02-robot-anatomy',
        'module-01-foundations/chapter-03-sensors-and-actuators',
        'module-01-foundations/chapter-04-robot-brains',
        'module-01-foundations/chapter-05-getting-started',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Perception and Sensing',
      collapsible: true,
      collapsed: false,
      items: [
        'module-02-perception/intro',
        'module-02-perception/chapter-06-understanding-sensors',
        'module-02-perception/chapter-07-computer-vision',
        'module-02-perception/chapter-08-lidar-3d-sensing',
        'module-02-perception/chapter-09-sound-ultrasonic',
        'module-02-perception/chapter-10-sensor-fusion',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Control and Motion Planning',
      collapsible: true,
      collapsed: false,
      items: [
        'module-03-control/intro',
        'module-03-control/chapter-11-motors-actuators',
        'module-03-control/chapter-12-kinematics-motion',
        'module-03-control/chapter-13-path-planning',
        'module-03-control/chapter-14-control-systems',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: AI Agents in Robotics',
      collapsible: true,
      collapsed: false,
      items: [
        'module-04-ai-agents/intro',
        'module-04-ai-agents/chapter-15-machine-learning-basics',
        'module-04-ai-agents/chapter-16-deep-learning-vision',
        'module-04-ai-agents/chapter-17-reinforcement-learning',
        'module-04-ai-agents/chapter-18-autonomous-agents',
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Real-World Applications & Ethics',
      collapsible: true,
      collapsed: false,
      items: [
        'module-05-real-world/intro',
        'module-05-real-world/chapter-19-industrial-robotics',
        'module-05-real-world/chapter-20-ethics-robotics',
      ],
    },
  ],
};

export default sidebars;
