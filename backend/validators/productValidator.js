const Joi = require('joi');

const productSchema = Joi.object({
    nombre:Joi.string().required(),
    referencia:Joi.string().required(),
    precio:Joi.number().integer().required(),
    peso:Joi.number().integer().required(),
    categoria:Joi.string().required(),
    stock:Joi.number().integer().required(),
});

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateProduct;