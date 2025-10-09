import { RateLimiterMemory } from 'rate-limiter-flexible';
import config from './rateLimiterConfig.js';

export const createRateLimiter = (level) => {
  const { points, duration } = config[level] || config.light;

  const limiter = new RateLimiterMemory({ points, duration });

  return (req, res, next) => {
    limiter
      .consume(req.ip)
      .then(() => next())
      .catch(() => {
        res.status(429).json({
          message: 'Too Many Requests. Please try again later.',
        });
      });
  };
};
