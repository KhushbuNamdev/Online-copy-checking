import Joi from "joi";

export const createSyllabusValidation = (req, res, next) => {
  const schema = Joi.object({
    class: Joi.string().required(),
    subject: Joi.string().required(),
    title: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};