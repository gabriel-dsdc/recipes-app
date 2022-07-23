function mapIngredients(object, type) {
  const ingredientList = Object.entries(object).filter((entry) => entry[0]
    .includes(type));

  if (type === 'strIngredient') {
    return ingredientList.filter((entry) => entry[1] !== '' && entry[1] !== null);
  }
  if (type === 'strMeasure') {
    return ingredientList.filter((entry) => entry[1] !== null && entry[1] !== ' ');
  }
}

export default mapIngredients;
