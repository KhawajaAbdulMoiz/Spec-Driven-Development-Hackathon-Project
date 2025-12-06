/**
 * RAG API Endpoint Handler
 * This is a proxy endpoint that forwards questions to a RAG backend
 *
 * For development/testing:
 * - Replace {PUT_YOUR_RAG_ENDPOINT_HERE} with your actual RAG service endpoint
 * - Expected RAG endpoint: POST request accepting { question: string }
 * - Expected response: { answer: string }
 *
 * Deployment options:
 * 1. AWS Lambda + API Gateway
 * 2. Vercel/Netlify serverless function
 * 3. FastAPI backend server
 * 4. Mock endpoint for testing
 */

const RAG_ENDPOINT = process.env.REACT_APP_RAG_ENDPOINT || '{PUT_YOUR_RAG_ENDPOINT_HERE}';

/**
 * Main RAG endpoint handler
 * POST /api/rag
 * Body: { question: string }
 * Response: { answer: string }
 */
export async function handleRagRequest(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Invalid question format' });
    }

    // Check if RAG endpoint is configured
    if (RAG_ENDPOINT === '{PUT_YOUR_RAG_ENDPOINT_HERE}') {
      return res.status(503).json({
        error: 'RAG endpoint not configured',
        answer: 'The AI assistant is not yet configured. Please set REACT_APP_RAG_ENDPOINT environment variable.',
      });
    }

    // Forward request to RAG backend
    const response = await fetch(RAG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ question }),
      timeout: 30000, // 30 second timeout
    });

    if (!response.ok) {
      console.error(`RAG endpoint returned ${response.status}`);
      return res.status(response.status).json({
        error: 'RAG service error',
        answer: 'No answer found. Please try rephrasing your question.',
      });
    }

    const data = await response.json();
    const answer = data.answer || data.response || 'No answer found';

    return res.status(200).json({
      success: true,
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('RAG API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      answer: 'Sorry, I encountered an error processing your question. Please try again later.',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
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
