export const searchBooks = async (query) => {
  const responses = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
  );
  const data = await responses.json();
  return data.items;
};
