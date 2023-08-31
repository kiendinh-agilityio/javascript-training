const fetchDataWithPromise = () => {
  return new Promise((resolve, reject) => {
    // Simulating an API call
    setTimeout(() => {
      const data = { message: 'Data fetched with promises' };
      resolve(data);
    }, 1000);
  });
};

fetchDataWithPromise()
  .then((data) => {
    console.log(data.message); // Data fetched with promises
  })
  .catch((error) => {
    console.error(error);
  });
