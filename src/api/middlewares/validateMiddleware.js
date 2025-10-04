const Joi = require('joi');

const validate = (schemaOrFunction) => (req, res, next) => {
  let schema = schemaOrFunction;

  if (typeof schemaOrFunction === 'function') {
    schema = schemaOrFunction();
  }
  console.log('What did the middleware get as schema?', schema);
  if (!Joi.isSchema(schema)) {
    console.error("Invalid schema provided to validate middleware.");
    return res.status(500).json({ message: "Internal server error: Invalid validation schema." });
  }

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    
    return res.status(400).json({
      message: 'Invalid request data.',
      errors: errors,
    });
  }

  next();
};

module.exports = validate;