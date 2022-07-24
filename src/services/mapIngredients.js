function mapIngredients(object, type) {
  const ingredientList = Object.entries(object).filter((entry) => entry[0]
    .includes(type));

  if (type === 'strIngredient') {
    const ingr = ingredientList.filter((entry) => entry[1] !== '' && entry[1] !== null);
    return (ingr.map((item) => item[1]));
  }

  if (type === 'strMeasure') {
    const measur = ingredientList
      .filter((entry) => entry[1] !== null && entry[1] !== ' ');
    return (measur.map((item) => item[1]));
  }
}

export default mapIngredients;
