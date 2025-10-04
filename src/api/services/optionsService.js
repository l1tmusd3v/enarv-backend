const db = require('../../config/database');

let optionsCache = {};

const loadOptions = async() =>{
    try{
        const [rows] = await db.execute('SELECT question_key, option_value, option_label FROM OnboardingOptions WHERE is_active = true');
        
        const newCache = {};
        for (const row of rows ){
            if(!newCache[row.question_key]){
                newCache[row.question_key] = [];
            }
            newCache[row.question_key].push({
                value: row.option_value,
                label: row.option_label
            });
        }
        optionsCache = newCache;
    } catch (error) {
        console.error('Error loading options:', error);
    }
}


const getOptions = (questionKey) =>{
    return optionsCache[questionKey] || [];
}

loadOptions();

module.exports = {
    getOptions,
    loadOptions
};