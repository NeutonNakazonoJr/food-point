const eventRepository = require("../repositories/eventRepository.js");

const unitTypes = {
    gram: 'gramas (g)',
    kilogram: 'quilograma (kg)',
    mililiter: 'mililitro (ml)',
    liter: 'litros (l)',
    unity: 'unidade (un)'
};


const createAndOrganizePurchaseList = async (eventId) => {

    const ingredientList = await eventRepository.getPurchaseList(eventId);

    const group = {};

    ingredientList.forEach(ingredient => {
        let quantity = parseFloat(ingredient.total_quantity);
        let unityMeasure = ingredient.unity_measure;

            if (group[ingredient.name]) {

                const needConvertInGramsGroupedIngredient = unityMeasure === unitTypes.gram && group[ingredient.name].unity_measure === unitTypes.kilogram;
                const needConvertInGransRepeatedIngredient = unityMeasure === unitTypes.kilogram && group[ingredient.name].unity_measure ===  unitTypes.gram;
                const needConvertInMlGroupedIngredient = unityMeasure === unitTypes.mililiter && group[ingredient.name].unity_measure === unitTypes.liter; 
                const needConvertMlRepeatedIngredient = unityMeasure === unitTypes.liter && group[ingredient.name].unity_measure === unitTypes.mililiter;


                if (needConvertInGramsGroupedIngredient) {
                    quantity /= 1000;
                } 
                else if (needConvertInGransRepeatedIngredient) {
                    group[ingredient.name].total_quantity /= 1000;                 
                }
                else if (needConvertInMlGroupedIngredient){
                    quantity /= 1000;
                }
                else if (needConvertMlRepeatedIngredient) {
                    group[ingredient.name].total_quantity /= 1000;                 
                }
            }

            if (unityMeasure === unitTypes.unity) {
                group[`${ingredient.name} formatted`] = {
                    name: ingredient.name,
                    total_quantity: quantity,
                    unity_measure: unityMeasure
                };
            }
            else if (group[ingredient.name] && group[ingredient.name].unity_measure !== unitTypes.unity) {
                group[ingredient.name].total_quantity += quantity;
                
                if (unityMeasure === unitTypes.mililiter || unityMeasure === unitTypes.liter) {
                    unityMeasure === unitTypes.liter
                } else {
                    unityMeasure = unitTypes.kilogram;
                }
                
                group[ingredient.name].unity_measure = unityMeasure;
            } else {
                group[ingredient.name] = {
                    name: ingredient.name,
                    total_quantity: quantity,
                    unity_measure: unityMeasure
                };
            }
        })

    return  Object.values(group);
}

module.exports = createAndOrganizePurchaseList;