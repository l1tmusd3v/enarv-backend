const Joi = require('joi');
const { getOptions } = require('../services/optionsService');

const createUpdatePreferencesSchema = () => {
    const options =  getOptions();

    const recommendationSource = options.recommendationSource?.map(opt => opt.value) || [];
    const allowedMotivations = options.motivations?.map(opt => opt.value) || [];

    return Joi.object({
        favoriteGenres: Joi.array().items(Joi.string()).min(3).max(5).required().messages({
            'array.min': 'At least 3 favorite genres are required.',
            'array.max': 'No more than 5 favorite genres are allowed.',
            'any.required': 'Favorite genres are required.'
        }),
        recommendationSource: Joi.string().valid(...recommendationSource).required().messages({
            'any.only': `Recommendation source must be one of: ${recommendationSource.join(', ')}`,
            'any.required': 'Recommendation source is required.'
        }),

        motivations: Joi.array().items(Joi.string().valid(...allowedMotivations)).min(1).max(3).required().messages({
            'array.min': 'At least 1 motivation is required.',
            'array.max': 'No more than 3 motivations are allowed.',
            'any.required': 'Motivations are required.',
            'any.only': `Each motivation must be one of: ${allowedMotivations.join(', ')}`
        }),

        lovedBookRecent: Joi.string().max(255).allow('',null).optional(),
        

    });
}

module.exports = {
    createUpdatePreferencesSchema
}