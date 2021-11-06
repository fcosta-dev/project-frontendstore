export async function getCategories() {
  return (await fetch('https://api.mercadolibre.com/sites/MLB/categories')).json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  return (await fetch(url)).json();
}

export async function getProductById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = await (await fetch(url)).json();
  const descriptionResult = (await (await fetch(`${url}/description`)).json()).plain_text;
  result.itemDescription = descriptionResult;
  return result;
}
