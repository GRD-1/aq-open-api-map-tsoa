import express from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from './config/logger';
import { RegisterRoutes } from './routes/routes';
import swaggerJson from '../public/swagger.json';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log request details
  logger.info({
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    headers: {
      'content-type': req.headers['content-type'],
      'user-agent': req.headers['user-agent']
    }
  }, 'Incoming request');

  // Capture response
  const originalSend = res.send;
  res.send = function (body) {
    const responseTime = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      responseBody: body
    }, 'Response sent');
    
    return originalSend.call(this, body);
  };

  next();
});

// Swagger UI
app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerJson));

// Register tsoa routes
RegisterRoutes(app);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({ 
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    body: req.body
  }, 'Unhandled error');
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 