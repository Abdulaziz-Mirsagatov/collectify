export const getCategories = async () => {
  const response = await fetch(`${process.env.API_URL}/api/categories`);
  return response.json();
};

export const getCategory = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/category/${id}`);
  return response.json();
};
