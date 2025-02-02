const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/[A-Z]\w+/)
    .min(2)
    .max(30)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  phone: Joi.string().min(9).max(11).optional(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .regex(/[A-Z]\w+/)
    .min(2)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string().min(9).max(11).optional(),
  favorite: Joi.boolean().optional(),
});

const schemaStatusFavoriteContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, "")}` });
  }
};

module.exports.validateAddContact = (req, _res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateStatusFavoriteContact = (req, _res, next) => {
  return validate(schemaStatusFavoriteContact, req.body, next);
};
