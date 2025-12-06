/**
 * Docusaurus Plugin: RAG API Handler
 * Registers a /api/rag endpoint for the RAG chatbot
 *
 * This plugin enables server-side API handling for the chatbot
 * when running in development or production environments.
 */

const path = require('path');

module.exports = function ragApiPlugin(context, options) {
  return {
    name: 'docusaurus-plugin-rag-api',

    // Configure Express server routes
    configureWebpack(config, isServer, utils) {
      if (isServer) {
        // Only configure on server side
        return {
          resolveLoader: {
            alias: {
              'rag-api-loader': path.resolve(__dirname, '../loaders/rag-api-loader.js'),
            },
          },
        };
      }
      return {};
    },

    // Setup Express routes during dev server startup
    setupMiddlewares(middlewares, devServer) {
      // Add RAG API endpoint
      devServer.app.post('/api/rag', async (req, res) => {
        try {
          // Validate request body
          const { question } = req.body;

          if (!question || typeof question !== 'string' || question.trim().length === 0) {
            console.warn('Invalid question format received');
            return res.status(400).json({
              error: 'Invalid question format',
              answer: 'Please provide a valid question.',
              success: false,
            });
          }

          // Get RAG endpoint from environment variable
          const RAG_ENDPOINT = process.env.REACT_APP_RAG_ENDPOINT || '';
          const isConfigured = RAG_ENDPOINT &&
                               RAG_ENDPOINT !== '{ADD_YOUR_REAL_RAG_URL_HERE}' &&
                               RAG_ENDPOINT.startsWith('http');

          // Log request for debugging
          console.log(`[RAG API] Question received: "${question.substring(0, 100)}..."`);
          console.log(`[RAG API] Endpoint configured: ${isConfigured ? 'YES' : 'NO (using mock)'}`);

          // If no RAG endpoint configured, use mock responses
          if (!isConfigured) {
            console.log('[RAG API] Using mock response handler');
            const mockAnswer = getMockAnswer(question);
            return res.status(200).json({
              success: true,
              answer: mockAnswer,
              timestamp: new Date().toISOString(),
              source: 'mock',
            });
          }

          // Forward request to actual RAG backend with proper error handling
          console.log(`[RAG API] Forwarding to: ${RAG_ENDPOINT}`);
          let ragResponse;

          try {
            ragResponse = await fetch(RAG_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({ question }),
              timeout: 30000,
            });
          } catch (fetchError) {
            // Network error - log and provide fallback
            console.error(`[RAG API] Network error calling RAG endpoint: ${fetchError.message}`);
            console.error('[RAG API] Stack:', fetchError.stack);
            const fallbackAnswer = getMockAnswer(question);
            return res.status(200).json({
              success: true,
              answer: fallbackAnswer,
              timestamp: new Date().toISOString(),
              source: 'fallback',
              error: `Network error: ${fetchError.message}`,
            });
          }

          // Handle non-OK HTTP responses from RAG endpoint
          if (!ragResponse.ok) {
            const statusCode = ragResponse.status;
            const statusText = ragResponse.statusText;
            console.error(`[RAG API] RAG endpoint returned ${statusCode} ${statusText}`);

            // Try to read error response body
            let errorBody = '';
            try {
              errorBody = await ragResponse.text();
              console.error(`[RAG API] RAG error response: ${errorBody.substring(0, 200)}`);
            } catch (e) {
              console.error(`[RAG API] Could not read error response body`);
            }

            // Provide safe fallback response
            const fallbackAnswer = getMockAnswer(question);
            return res.status(200).json({
              success: true,
              answer: fallbackAnswer,
              timestamp: new Date().toISOString(),
              source: 'fallback',
              error: `RAG service error: ${statusCode} ${statusText}`,
            });
          }

          // Parse successful response
          let data;
          try {
            data = await ragResponse.json();
            console.log('[RAG API] Successfully parsed RAG response');
          } catch (parseError) {
            console.error(`[RAG API] Failed to parse RAG response: ${parseError.message}`);
            const fallbackAnswer = getMockAnswer(question);
            return res.status(200).json({
              success: true,
              answer: fallbackAnswer,
              timestamp: new Date().toISOString(),
              source: 'fallback',
              error: `Failed to parse RAG response: ${parseError.message}`,
            });
          }

          // Extract answer from response (support multiple response formats)
          const answer = data.answer || data.response || data.text || 'No answer found';
          if (!answer || typeof answer !== 'string') {
            console.warn('[RAG API] RAG response missing or invalid answer field');
            const fallbackAnswer = getMockAnswer(question);
            return res.status(200).json({
              success: true,
              answer: fallbackAnswer,
              timestamp: new Date().toISOString(),
              source: 'fallback',
              error: 'Invalid RAG response format',
            });
          }

          // Return successful response
          console.log('[RAG API] Returning RAG response successfully');
          return res.status(200).json({
            success: true,
            answer,
            timestamp: new Date().toISOString(),
            source: 'rag',
          });

        } catch (error) {
          // Catch-all error handler
          console.error(`[RAG API] Unexpected error: ${error.message}`);
          console.error('[RAG API] Stack:', error.stack);

          // Safely extract question for fallback
          let question = '';
          try {
            question = req.body?.question || '';
          } catch (e) {
            console.error('[RAG API] Could not extract question from request');
          }

          const mockAnswer = getMockAnswer(question);

          // Always return a successful response with safe fallback content
          return res.status(200).json({
            success: true,
            answer: mockAnswer,
            timestamp: new Date().toISOString(),
            source: 'fallback',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Server error occurred',
          });
        }
      });

      return middlewares;
    },
  };
};

/**
 * Mock response generator for testing without RAG backend
 */
function getMockAnswer(question) {
  const lowerQ = question.toLowerCase();

  const responses = {
    robot: 'A robot is a programmable machine capable of performing tasks autonomously or semi-autonomously. Robots have sensors to perceive their environment, actuators to move or manipulate objects, and a control system (brain) to process information. Examples include industrial robots, service robots like Boston Dynamics Spot, and mobile robots.',

    'physical ai':
      'Physical AI refers to AI systems that operate in the physical world, integrating perception, reasoning, and action. Unlike software AI that works purely with data, physical AI combines robotics, sensors, and machine learning to understand and interact with real-world environments. Examples: autonomous vehicles, humanoid robots, and robotic manipulators.',

    sensor:
      'Sensors are devices that detect and measure physical properties of the environment. Common types include: cameras (vision), LiDAR (3D depth), IMUs (motion), microphones (sound), and touch sensors. Robots use multiple sensors to build an understanding of their surroundings.',

    actuator:
      'Actuators are devices that produce motion and control actions. Types include: DC motors (simple continuous motion), servo motors (precise positioning), stepper motors (controlled discrete steps), and hydraulic/pneumatic actuators (powerful industrial applications). They convert electrical signals into mechanical motion.',

    control:
      'Robot control systems manage how a robot perceives and responds to its environment. Control loops continuously: 1) Read sensor data, 2) Process information, 3) Generate commands, 4) Send commands to actuators. This creates a feedback loop enabling the robot to adapt to changes.',

    'module 1':
      "Module 1: Foundations of Robotics introduces basic concepts including Physical AI definition, robot anatomy (sensors, actuators, brain), building blocks of robots, and how they perceive and move. After this module, you'll understand the sensor→brain→actuator pipeline.",

    chapter:
      'Each chapter in this textbook covers key robotics concepts with real-world examples, diagrams, exercises, and "Try It" activities. Chapters are organized into 5 modules progressing from foundations to real-world applications.',

    foundation:
      'The Foundations Module covers what Physical AI is, how robots compare to software agents, the building blocks of robots (sensors, brains, actuators), and basics of perception and motion. This provides the foundation for all subsequent modules.',

    perception:
      'Perception allows robots to understand their environment using sensors like cameras, LiDAR, and touch sensors. Multiple sensors work together through sensor fusion to build accurate internal models of the world.',

    movement:
      'Robot movement is enabled by actuators (motors, servos, hydraulics) controlled through motion planning and control systems. Different robot types require different movement strategies based on their shape and task.',

    learning:
      'This textbook teaches robotics from first principles with clear explanations, real examples (Boston Dynamics, Tesla Bot, Unitree), and hands-on exercises. You don\'t need robotics experience to start learning.',

    default:
      'Great question! Based on the textbook content, I can help with concepts about Physical AI, robotics fundamentals, sensing, control, and real-world applications. Try asking about specific topics like robots, sensors, actuators, or modules.',
  };

  // Check for keyword matches
  for (const [key, answer] of Object.entries(responses)) {
    if (key !== 'default' && lowerQ.includes(key)) {
      return answer;
    }
  }

  return responses.default;
}
