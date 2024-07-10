

const errorHandlerMiddleware = (error, req, res, next) => {
    const status = error.status || res.statusCode || 500; 
    const message = error.message || 'Internal Server Error'; 
    const errorStack = error.stack || null; 
    const data = error.data || null;
  
    
    console.error(error);
  
    
    return res.status(status).json({ status, data, message, error: errorStack });
};
  
module.exports = errorHandlerMiddleware;
  