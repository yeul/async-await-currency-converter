const axios = require('axios');

//ASYNC/AWAIT VERSION of getExchangeRate:

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=dd288b8716549ce3cf0577e553ee9053&format=1');
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }

        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
};

// ASYNC/AWAIT VERSION of getCountries: 

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};


// ASYNC/AWAIT VERSION of convertCurrency/country list.

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `$${amount} ${from} is worth $${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`
};

convertCurrency('USD', 'CAD', 20).then((message) => {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});


// OLD Promise versions of ASYNC/AWAIT functions.

// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=dd288b8716549ce3cf0577e553ee9053&format=1').then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };



// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// });


// Array of countries that accept a specific currency input by the user. Promise version.

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// };

// getCountries('CAD').then((countries) => {
//     console.log(countries);
// });

// Function putting above 2 functions to use to print 'X countryOneCurrency is worth X countryTwoCurrency. You can use it in the following countries: [A, B, C].

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//         return `$${amount} ${from} is worth $${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`
//     });
// };

// convertCurrency('USD', 'CAD', 20).then((message) => {
//     console.log(message);
// });
