const Joi = require('joi');
const getOptions = require('../services/optionsService').getOptions;

const createUpdatePreferencesSchema = () => {
    const options =  getOptions();

    const allowedFictionalBalance = options.fictionBalance?.map(opt => opt.value) || [];
    const allowedReadingPaces = options.readingPace?.map(opt => opt.value) || [];
    const allowedMotivations = options.motivation?.map(opt => opt.value) || [];

    return Joi.object({
        favoriteGenres: Joi.array().items(Joi.string()).min(3).max(5).required().messages({
            'array.min': 'At least 3 favorite genres are required.',
            'array.max': 'No more than 5 favorite genres are allowed.',
            'any.required': 'Favorite genres are required.'
        }),

        fictionBalance: Joi.string().valid(...allowedFictionalBalance).required().messages({
            'any.only': `Fiction balance must be one of: ${allowedFictionalBalance.join(', ')}`,
            'any.required': 'Fiction balance is required.'
        }),

        readingPace: Joi.string().valid(...allowedReadingPaces).required().messages({
            'any.only': `Reading pace must be one of: ${allowedReadingPaces.join(', ')}`,
            'any.required': 'Reading pace is required.'
        }),

        motivations: Joi.array().items(Joi.string().valid(...allowedMotivations)).min(1).max(3).required().messages({
            'array.min': 'At least 1 motivation is required.',
            'array.max': 'No more than 3 motivations are allowed.',
            'any.required': 'Motivations are required.',
            'any.only': `Each motivation must be one of: ${allowedMotivations.join(', ')}`
        }),

        lovedBookRecent: Joi.string().max(255).allow('',null).optional(),
        wantsToConnectFriends: Joi.boolean().required().messages({
            'any.required': 'Wants to connect with friends is required.'
        }),
        annualGoal: Joi.number().integer().min(1).max(200).required().messages({
            'number.base': 'Annual goal must be a number.',
            'number.integer': 'Annual goal must be an integer.',
            'number.min': 'Annual goal must be at least 1.',
            'number.max': 'Annual goal cannot exceed 200.',
            'any.required': 'Annual goal is required.'
        })
    });
}

module.exports = {
    createUpdatePreferencesSchema
}