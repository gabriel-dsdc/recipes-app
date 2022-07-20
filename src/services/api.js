export async function getRecipes(database, searchType, searchText) {
  let url;
  console.log('chamei a primeira');
  switch (searchType) {
  case 'ingredient':
    url = `https://www.the${database}db.com/api/json/v1/1/filter.php?i=${searchText}`;
    break;
  case 'name':
    url = `https://www.the${database}db.com/api/json/v1/1/search.php?s=${searchText}`;
    break;
  default:
    url = `https://www.the${database}db.com/api/json/v1/1/search.php?f=${searchText}`;
    break;
  }

  if (searchType === 'first-letter' && searchText.length > 1) {
    global.alert('Your search must have only 1 (one) character');
    return [];
  }
  const api = await fetch(url)
    .then((res) => (res.json()))
    .then((res) => (res));
  return api[Object.keys(api)] || [];
}

export async function getDefaultResponse(type) {
  let url;
  if (type === 'food') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
  if (type === 'drink') {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  const api = await fetch(url)
    .then((res) => (res.json()))
    .then((res) => (res));
  return api[Object.keys(api)];
}

// export async function getDefaultRecipes(database) {
//   const url = `https://www.the${database}db.com/api/json/v1/1/search.php?s=`;
//   console.log('chamei a segunda');
//   const api = await fetch(url)
//     .then((res) => (res.json()))
//     .then((res) => (res));
//   return api[Object.keys(api)] || [];
// }
