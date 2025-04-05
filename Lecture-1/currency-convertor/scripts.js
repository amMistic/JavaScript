// get the elements from dom
const currency1 = document.getElementById("currency1");
const currency2 = document.getElementById("currency2");
const rateValue = document.getElementById("rate-value");
const rateLabel = document.getElementById("rate-label");
const amount1 = document.getElementById("amount1");
const amount2 = document.getElementById("amount2");

const ACCESS_KEY = "your_api_key";
const currency_map = {};
let chartInstance = null;
let predefineLabel = null;

// getting selection options for our currency converter
async function populateCurrencies() {
  // fetch from given API
  const response = await fetch(
    `https://api.exchangerate.host/list?access_key=${ACCESS_KEY}`
  );
  const data = await response.json();

  // get all the available currencies
  const currencies = data.currencies;

  // Iterate over each currency and add it into the selection dropdown
  Object.entries(currencies).forEach(([code, name]) => {
    currency_map[code] = name;
    currency1.add(new Option(`${code} - ${name}`, code));
    currency2.add(new Option(`${code} - ${name}`, code));
  });

  // set default ones
  currency1.value = "USD";
  currency2.value = "INR";

  convertCurrency();
}

// Logic - Currency Converter
async function convertCurrency() {
  const from = currency1.value;
  const to = currency2.value;
  const amount = parseFloat(amount1.value);

  // send the request to api - get all the values for from currency
  const response = await fetch(
    `https://api.exchangerate.host/convert?access_key=${ACCESS_KEY}&from=${from}&to=${to}&amount=${amount}`
  );
  const data = await response.json();
  const converted = data.result.toFixed(2);

  // change the html depending on the user input
  rateLabel.innerHTML = `${amount1.value} ${currency_map[from]} equals`;
  rateValue.innerHTML = `${converted}  <span style="color:#b1b1b1;">${currency_map[to]}</span>`;

  // update the amount in to currency input element
  amount2.value = converted;

  // rendering chart
  renderHistoricalChart(from, to);
}

// fetched the historical data and display the graph
async function renderHistoricalChart(from, to) {
  // Don't fetch if from and to are same
  if (from === to) return;

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const URL = `https://api.frankfurter.app/${startDate}..${endDate}?from=${from}&to=${to}`;
  console.log(URL);

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const labels = Object.keys(data.rates);
    const values = labels.map((date) => data.rates[date][to]);


    // Check if 'rates' key exists
    if (!data.rates) {
      console.warn("No historical data available", data);
      return;
    }

    const ctx = document.getElementById("exchangeChart").getContext("2d");

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${currency_map[to]}`,
            data: values,
            borderColor: "#f87171",
            backgroundColor: "rgba(248, 113, 113, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "#f87171",
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#ccc" },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.y} (${ctx.label})`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#888" },
            grid: { color: "rgba(255,255,255,0.05)" },
          },
          y: {
            ticks: { color: "#888" },
            grid: { color: "rgba(255,255,255,0.05)" },
          },
        },
      },
    });
  } catch (err) {
    console.error("Error fetching historical data:", err);
  }
}

// define the event listeners with their respective event type
amount1.addEventListener("input", convertCurrency);
currency1.addEventListener("change", convertCurrency);
currency2.addEventListener("change", convertCurrency);

populateCurrencies();
