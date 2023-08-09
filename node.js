const axios = require('axios');

const API_KEY = 'YOUR_OPEN_EXCHANGE_RATES_API_KEY';
const BASE_URL = 'https://openexchangerates.org/api/latest.json';

// Currencies to convert between
const currencies = ['USD', 'CAD', 'NZD', 'AUD', 'KES'];

// Function to fetch exchange rates
async function getExchangeRates() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        app_id: API_KEY,
        base: 'USD', // We'll convert from USD
        symbols: currencies.join(','), // Comma-separated list of currencies
      },
    });

    return response.data.rates;
  } catch (error) {
    throw new Error('Error fetching exchange rates.');
  }
}

// Function to convert currency
function convertCurrency(amount, fromCurrency, toCurrency, exchangeRates) {
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];

  if (!fromRate || !toRate) {
    throw new Error('Invalid currencies.');
  }

  const convertedAmount = (amount / fromRate) * toRate;
  return convertedAmount.toFixed(2);
}

async function main() {
  try {
    const exchangeRates = await getExchangeRates();

    const amount = 100; // Example amount in USD
    const fromCurrency = 'USD';
    const toCurrency = 'CAD';

    const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency, exchangeRates);

    console.log(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
  } catch (error) {
    console.error(error.message);
  }
}

main();
