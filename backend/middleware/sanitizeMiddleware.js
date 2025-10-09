import sanitizeHtml from 'sanitize-html';

const sanitizeInputs = (obj) => {
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeHtml(obj[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      } else if (typeof obj[key] === 'object') {
        sanitizeInputs(obj[key]);
      }
    }
  }
  return obj;
};

export const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeInputs(req.body);
  }
  if (req.query) {
    req.query = sanitizeInputs(req.query);
  }
  if (req.params) {
    req.params = sanitizeInputs(req.params);
  }
  next();
};
