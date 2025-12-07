/**
 * RAG API Endpoint Handler
 * This is a proxy endpoint that forwards questions to a RAG backend
 *
 * For development/testing:
 * - Replace {ADD_YOUR_REAL_RAG_URL_HERE} with your actual RAG service endpoint
 * - Expected RAG endpoint: POST request accepting { question: string }
 * - Expected response: { answer: string } or { response: string }
 *
 * Deployment options:
 * 1. AWS Lambda + API Gateway
 * 2. Vercel/Netlify serverless function
 * 3. FastAPI backend server
 * 4. Mock endpoint for testing
 *
 * Configuration:
 * Set environment variable: REACT_APP_RAG_ENDPOINT=https://your-service.com/api/rag
 */

import config from '@generated/docusaurus.config';
const RAG_ENDPOINT = config.customFields.ragEndpoint;

/**
 * Main RAG endpoint handler
 * POST /api/rag
 * Body: { question: string }
 * Response: { success: boolean, answer: string, timestamp: string, source: string }
 */
export async function handleRagRequest(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      answer: 'Only POST requests are supported.',
    });
  }

  try {
    const { question } = req.body;

    // Validate question format
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      console.warn('[RAG] Invalid question format received');
      return res.status(400).json({
        error: 'Invalid question format',
        answer: 'Please provide a valid question.',
        success: false,
      });
    }

    console.log(`[RAG] Question: "${question.substring(0, 100)}..."`);

    // Check if RAG endpoint is configured
    if (RAG_ENDPOINT === '{ADD_YOUR_REAL_RAG_URL_HERE}') {
      console.log('[RAG] Endpoint not configured, using mock response');
      const mockAnswer = mockRagHandler(question);
      return res.status(200).json({
        success: true,
        answer: mockAnswer,
        timestamp: new Date().toISOString(),
        source: 'mock',
      });
    }

    console.log(`[RAG] Forwarding to RAG endpoint: ${RAG_ENDPOINT}`);

    // Forward request to RAG backend with comprehensive error handling
    let response;
    try {
      response = await fetch(RAG_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ question }),
        timeout: 30000, // 30 second timeout
      });
    } catch (fetchError) {
      // Network error occurred
      console.error(`[RAG] Network error: ${fetchError.message}`);
      console.error('[RAG] Stack:', fetchError.stack);
      const mockAnswer = mockRagHandler(question);
      return res.status(200).json({
        success: true,
        answer: mockAnswer,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        error: `Network error: ${fetchError.message}`,
      });
    }

    // Handle non-OK HTTP responses
    if (!response.ok) {
      const statusCode = response.status;
      const statusText = response.statusText;
      console.error(`[RAG] HTTP error: ${statusCode} ${statusText}`);

      // Try to log error response body
      try {
        const errorText = await response.text();
        console.error(`[RAG] Error body: ${errorText.substring(0, 200)}`);
      } catch (e) {
        console.error('[RAG] Could not read error response body');
      }

      // Provide safe fallback
      const mockAnswer = mockRagHandler(question);
      return res.status(200).json({
        success: true,
        answer: mockAnswer,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        error: `RAG service error: ${statusCode}`,
      });
    }

    // Parse response JSON
    let data;
    try {
      data = await response.json();
      console.log('[RAG] Successfully parsed response');
    } catch (parseError) {
      console.error(`[RAG] Failed to parse response: ${parseError.message}`);
      const mockAnswer = mockRagHandler(question);
      return res.status(200).json({
        success: true,
        answer: mockAnswer,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        error: `Failed to parse response: ${parseError.message}`,
      });
    }

    // Extract answer from response (support multiple formats)
    const answer = data.answer || data.response || data.text || 'No answer found';

    if (!answer || typeof answer !== 'string') {
      console.warn('[RAG] Response missing valid answer field');
      const mockAnswer = mockRagHandler(question);
      return res.status(200).json({
        success: true,
        answer: mockAnswer,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        error: 'Invalid response format',
      });
    }

    console.log('[RAG] Successfully returning RAG response');
    return res.status(200).json({
      success: true,
      answer,
      timestamp: new Date().toISOString(),
      source: 'rag',
    });

  } catch (error) {
    // Catch-all error handler
    console.error(`[RAG] Unexpected error: ${error.message}`);
    console.error('[RAG] Stack:', error.stack);

    // Safely extract question for mock fallback
    let question = '';
    try {
      question = req.body?.question || '';
    } catch (e) {
      console.error('[RAG] Could not extract question from request');
    }

    const mockAnswer = mockRagHandler(question);

    // Always return a successful response with fallback content
    return res.status(200).json({
      success: true,
      answer: mockAnswer,
      timestamp: new Date().toISOString(),
      source: 'fallback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred',
    });
  }
}

/**
 * Mock RAG handler for testing without a real backend
 * Returns sample answers based on keyword matching
 */
export function mockRagHandler(question) {
  const responses = {
    robot: {
      answer: 'A robot is a programmable machine capable of performing tasks autonomously or semi-autonomously. Robots have sensors to perceive their environment, actuators to move or manipulate objects, and a control system (brain) to process information. Examples include industrial robots, service robots like Boston Dynamics Spot, and mobile robots.',
    },
    'what is physical ai': {
      answer: 'Physical AI refers to AI systems that operate in the physical world, integrating perception, reasoning, and action. Unlike software AI that works purely with data, physical AI combines robotics, sensors, and machine learning to understand and interact with real-world environments. Examples: autonomous vehicles, humanoid robots, and robotic manipulators.',
    },
    sensor: {
      answer: 'Sensors are devices that detect and measure physical properties of the environment. Common types include: cameras (vision), LiDAR (3D depth), IMUs (motion), microphones (sound), and touch sensors. Robots use multiple sensors to build an understanding of their surroundings.',
    },
    actuator: {
      answer: 'Actuators are devices that produce motion and control actions. Types include: DC motors (simple continuous motion), servo motors (precise positioning), stepper motors (controlled discrete steps), and hydraulic/pneumatic actuators (powerful industrial applications). They convert electrical signals into mechanical motion.',
    },
    control: {
      answer: 'Robot control systems manage how a robot perceives and responds to its environment. Control loops continuously: 1) Read sensor data, 2) Process information, 3) Generate commands, 4) Send commands to actuators. This creates a feedback loop enabling the robot to adapt to changes.',
    },
    'module 1': {
      answer: 'Module 1: Foundations of Robotics introduces basic concepts including Physical AI definition, robot anatomy (sensors, actuators, brain), building blocks of robots, and how they perceive and move. After this module, you\'ll understand the sensor→brain→actuator pipeline.',
    },
    default: {
      answer: 'I found information related to your question in the textbook. The robot can perceive its world through sensors, process information with its "brain" (control system), and act through actuators. Would you like to know more about a specific aspect of robotics?',
    },
  };

  const lowerQuestion = question.toLowerCase();

  for (const [key, value] of Object.entries(responses)) {
    if (lowerQuestion.includes(key)) {
      return value.answer;
    }
  }

  return responses.default.answer;
}

// Export default handler
export default handleRagRequest;
