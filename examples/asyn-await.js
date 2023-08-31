const fetchDataWithAsyncAwait = () => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Data fetched with async/await' });
    }, 1000);
  });
};

(async () => {
  const data = await fetchDataWithAsyncAwait();
  console.log(data.message); // Data fetched with async/await
})();
