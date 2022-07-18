function getRecipes(database, search) {
  return fetch(`https://www.the${database}db.com/api/json/v1/1/${search}`)
    .then((res) => (res.json()))
    .then((res) => (res));
}

export default getRecipes;
