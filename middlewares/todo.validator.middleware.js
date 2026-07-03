const todoValidator = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message || "Error de validación",
      });
    }
    req.body = result.data;
    next();
  };
};

export default todoValidator;
