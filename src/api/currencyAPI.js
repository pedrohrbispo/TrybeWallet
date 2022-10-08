const endpoint = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  try {
    const currenciesPromisse = await fetch(endpoint);
    const currenciesJson = await currenciesPromisse.json();
    delete currenciesJson.USDT;
    return currenciesJson;
  } catch (e) {
    console.log(e);
  }
};

export default getCurrencies;
