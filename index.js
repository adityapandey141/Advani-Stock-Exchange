const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

const stocksData = require('./stock_listing.js');

app.get('/stocks', (req, res) => {
  res.json({ stocks: stocksData });
});

function sortByPriceASC(data1, data2) {
  return data1.price - data2.price;
}
function sortByPriceDESC(data1, data2) {
  return data2.price - data1.price;
}
app.get('/stocks/sort/pricing', (req, res) => {
  let price = req.query.pricing;
  let sortedStocks;
  if (price === 'low-to-high') {
    sortedStocks = stocksData.sort(sortByPriceASC);
  } else if (price === 'high-to-low') {
    sortedStocks = stocksData.sort(sortByPriceDESC);
  } else {
    sortedStocks = [{ stocks: 'LOL' }];
  }
  res.json({ stocks: sortedStocks });
});

function sortByGrowthASC(data1, data2) {
  return data1.growth - data2.growth;
}
function sortByGrowthDESC(data1, data2) {
  return data2.growth - data1.growth;
}

app.get('/stocks/sort/growth', (req, res) => {
  let growth = req.query.growth;
  let sortedStocks;

  if (growth === 'low-to-high') {
    sortedStocks = stocksData.sort(sortByGrowthASC);
  } else if (growth === 'high-to-low') {
    sortedStocks = stocksData.sort(sortByGrowthDESC);
  } else {
    sortedStocks = [{ stocks: 'LOL' }];
  }
  res.json({ stocks: sortedStocks });
});

function filterByExchange(data, exchange) {
  return data.exchange === exchange.toLowerCase();
}
app.get('/stocks/filter/exchange', (req, res) => {
  let exc = req.query.exchange;
  let filteredStocks = stocksData.filter((ele) => filterByExchange(ele, exc));

  res.json({ stocks: filteredStocks });
});

function filterByIndustry(data, industry) {
  return data.industry === industry.toLowerCase();
}

app.get('/stocks/filter/industry', (req, res) => {
  let indus = req.query.industry;
  let filteredStocks = stocksData.filter((ele) => filterByIndustry(ele, indus));

  res.json({ stocks: filteredStocks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
