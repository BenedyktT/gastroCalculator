module.exports = (nutritionValues, { prep, title, ingr }) => {
  const {
    calories,
    totalWeight,
    dietLabels,
    healthLabels,
    cautions,
    totalNutrients,
    totalDaily,
  } = nutritionValues;
  const nutrients = [
    ...Object.values(totalNutrients),
    ...Object.values(totalDaily),
  ]
    .reduce((acc, curr) => {
      const x = acc.find((e) => e.label === curr.label);
      if (!x) {
        return (acc = [...acc, curr]);
      }
      const toMerge = {
        amount: parseInt(x.quantity),
        amountUnit: x.unit,
      };
      acc = acc.filter((e) => e !== x);
      return (acc = [...acc, { ...curr, ...toMerge }]);
    }, [])
    .reduce((acc, curr) => {
      if (curr.amount) {
        return {
          ...acc,
          [curr.label]: {
            quantity: curr.quantity,
            unit: curr.unit,
            amount: curr.amount,
            amountUnit: curr.amountUnit,
          },
        };
      }
      return {
        ...acc,
        [curr.label]: {
          quantity: curr.quantity,
          unit: curr.unit,
        },
      };
    }, {});
  const nutritionReport = {
    prep,
    title,
    ingr,
    calories,
    totalWeight,
    dietLabels,
    healthLabels,
    cautions,
    nutrients,
  };
  return nutritionReport;
};
