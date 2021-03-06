//----------------------------------------------------

// GRAPH ---------------------------------------------------

///  Appel API et répartition des données ///

let currency = "EUR";
let selectCurrency = document.getElementById("select-currency");
let selectCrypto = document.getElementById("select-crypto");
let symbol = "€";
let coin = "BTC";

selectCrypto.addEventListener("change", function (e) {
  if (selectCrypto.value === "BTC") {
    coin = "BTC";
    
    updateMyPrice();

  
    
    printMyChart();
  } else if (selectCrypto.value === "ETH") {
    coin = "ETH";
    
    updateMyPrice();
    
    printMyChart();
  } else if (selectCrypto.value === "LTC") {
    coin = "LTC";
    
    updateMyPrice();
    document.querySelector('canvas').innerText = ""
  
    printMyChart();
  } else if (selectCrypto.value === "XRP") {
    coin = "XRP";
   
    updateMyPrice();
    printMyChart();
  } else if (selectCrypto.value === "BNB") {
    coin = "BNB";
    
    updateMyPrice();
    printMyChart();
  } else if (selectCrypto.value === "ATOM") {
    coin = "ATOM";
    
    updateMyPrice();
    printMyChart();
  }
});

selectCurrency.addEventListener("change", function (e) {
  if (selectCurrency.value === "EUR") {
    currency = "EUR";
    symbol = "€";
    updateEthereumPrice();
    updateCosmosPrice();
    updateBitcoinPrice();
    updateLtcPrice();
    updateXrpPrice();
    updateBnbPrice();
    updateMyPrice();

   
  } else if (selectCurrency.value === "USD") {
    currency = "USD";
    symbol = "$";
    updateEthereumPrice();
    updateCosmosPrice();
    updateBitcoinPrice();
    updateLtcPrice();
    updateXrpPrice();
    updateBnbPrice();
    updateMyPrice();
  
  } else if (selectCurrency.value === "JPY") {
    currency = "JPY";
    symbol = "JPY";
    updateEthereumPrice();
    updateCosmosPrice();
    updateBitcoinPrice();
    updateLtcPrice();
    updateXrpPrice();
    updateBnbPrice();
    updateMyPrice();
  }
});

const btcData = async () => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=${currency}&limit=119&api_key=6f82a74e514a9ae1119f916469dda27ba1297e53c61c2b1abb88db8174f43bf1`
  );
  const json = await response.json();
  const data = json.Data.Data;
  const times = data.map((obj) => obj.time);
  
  const prices = data.map((obj) => obj.high);
  
  return {
    times,
    prices,
  };
};

const ltcData = async () => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histominute?fsym=LTC&tsym=${currency}&limit=119&api_key=6f82a74e514a9ae1119f916469dda27ba1297e53c61c2b1abb88db8174f43bf1`
  );
  const json = await response.json();
  const data = json.Data.Data;
  const times = data.map((obj) => obj.time);
  const prices = data.map((obj) => obj.high);
  return {
    times,
    prices,
  };
};

const cosmosData = async () => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histominute?fsym=ATOM&tsym=${currency}&limit=119&api_key=6f82a74e514a9ae1119f916469dda27ba1297e53c61c2b1abb88db8174f43bf1`
  );
  const json = await response.json();
  const data = json.Data.Data;
  const times = data.map((obj) => obj.time);
  const prices = data.map((obj) => obj.high);
  return {
    times,
    prices,
  };
};

const ethereumData = async () => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=${currency}&limit=119&api_key=6f82a74e514a9ae1119f916469dda27ba1297e53c61c2b1abb88db8174f43bf1`
  );
  const json = await response.json();
  const data = json.Data.Data;
  const times = data.map((obj) => obj.time);
  const prices = data.map((obj) => obj.high);
  return {
    times,
    prices,
  };
};

const xrpData = async () => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histominute?fsym=XRP&tsym=${currency}&limit=119&api_key=6f82a74e514a9ae1119f916469dda27ba1297e53c61c2b1abb88db8174f43bf1`
  );
  const json = await response.json();
  const data = json.Data.Data;
  const times = data.map((obj) => obj.time);
  const prices = data.map((obj) => obj.high);
  return {
    times,
    prices,
  };
};

const bnbData = async () => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histominute?fsym=BNB&tsym=${currency}&limit=119&api_key=6f82a74e514a9ae1119f916469dda27ba1297e53c61c2b1abb88db8174f43bf1`
  );
  const json = await response.json();
  const data = json.Data.Data;
  const times = data.map((obj) => obj.time);
  const prices = data.map((obj) => obj.high);
  return {
    times,
    prices,
  };
};

const myData = async () => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${selectCrypto.value}&tsym=${currency}&limit=119&api_key=6f82a74e514a9ae1119f916469dda27ba1297e53c61c2b1abb88db8174f43bf1`
  );
  const json = await response.json();
  const data = json.Data.Data;
  const times = data.map((obj) => {obj.time});
  
  
  const prices = data.map((obj) => obj.high);
  
  

  return {
    times,
    prices,
  };
};

/// ERREUR ///
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/// Charts ///
let createBtcChart;
let createCosmosChart;
let createethereumChart;
let createLtcChart;
let createXrpChart;
let createBnbChart;

async function printBnbChart() {
  
  let { times, prices } = await bnbData();

  let bnbChart = document.getElementById("bnbChart").getContext("2d");

  let gradient = bnbChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, "rgba(247,147,26,.5)");
  gradient.addColorStop(0.425, "rgba(255,193,119,0)");

  Chart.defaults.global.defaultFontFamily = "Red Hat Text";
  Chart.defaults.global.defaultFontSize = 12;

  createBnbChart = new Chart(bnbChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "$",
          data: prices,
          backgroundColor: gradient,
          borderColor: "rgba(247,147,26,1)",
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2,
        },
      ],
    },

    options: {
      title: {
        display: false,
        text: "Heckin Chart!",
        fontSize: 35,
      },

      legend: {
        display: false,
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
      },

      tooltips: {
        callbacks: {
          title: function () {},
        },
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: "nearest",
        caretSize: 10,
        backgroundColor: "rgba(255,255,255,.9)",
        bodyFontSize: 15,
        bodyFontColor: "#303030",
      },
    },
  });
}




async function printBtcChart() {
  
  let { times, prices } = await btcData();

  let btcChart = document.getElementById("btcChart").getContext("2d");

  let gradient = btcChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, "rgba(247,147,26,.5)");
  gradient.addColorStop(0.425, "rgba(255,193,119,0)");

  Chart.defaults.global.defaultFontFamily = "Red Hat Text";
  Chart.defaults.global.defaultFontSize = 12;

  createBtcChart = new Chart(btcChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "$",
          data: prices,
          backgroundColor: gradient,
          borderColor: "rgba(247,147,26,1)",
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2,
        },
      ],
    },

    options: {
      title: {
        display: false,
        text: "Heckin Chart!",
        fontSize: 35,
      },

      legend: {
        display: false,
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
      },

      tooltips: {
        callbacks: {
          //Ce code enlève le titre tooltip
          title: function () {},
        },
        //Ce code enlève les couleurs de la légende
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: "nearest",
        caretSize: 10,
        backgroundColor: "rgba(255,255,255,.9)",
        bodyFontSize: 15,
        bodyFontColor: "#303030",
      },
    },
  });
}

async function printLtcChart() {
  let { times, prices } = await ltcData();
  

  let ltcChart = document.getElementById("ltcChart").getContext("2d");

  let gradient = ltcChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, "rgba(247,147,26,.5)");
  gradient.addColorStop(0.425, "rgba(255,193,119,0)");

  Chart.defaults.global.defaultFontFamily = "Red Hat Text";
  Chart.defaults.global.defaultFontSize = 12;

  createLtcChart = new Chart(ltcChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "$",
          data: prices,
          backgroundColor: gradient,
          borderColor: "rgba(247,147,26,1)",
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2,
        },
      ],
    },

    options: {
      title: {
        display: false,
        text: "Heckin Chart!",
        fontSize: 35,
      },

      legend: {
        display: false,
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
      },

      tooltips: {
        callbacks: {
          //Ce code enlève le titre tooltip
          title: function () {},
        },
        //Ce code enlève les couleurs de la légende
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: "nearest",
        caretSize: 10,
        backgroundColor: "rgba(255,255,255,.9)",
        bodyFontSize: 15,
        bodyFontColor: "#303030",
      },
    },
  });
}

async function printCosmosChart() {
  let { times, prices } = await cosmosData();

  let cosmosChart = document.getElementById("cosmosChart").getContext("2d");

  let gradient = cosmosChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, "rgba(27,30,54,.5)");
  gradient.addColorStop(0.425, "rgba(46,49,72,0)");

  Chart.defaults.global.defaultFontFamily = "Red Hat Text";
  Chart.defaults.global.defaultFontSize = 12;

  createCosmosChart = new Chart(cosmosChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "$",
          data: prices,
          backgroundColor: gradient,
          borderColor: "rgba(46,49,72,1)",
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2,
        },
      ],
    },

    options: {
      title: {
        display: false,
        text: "Heckin Chart!",
        fontSize: 35,
      },

      legend: {
        display: false,
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
      },

      tooltips: {
        callbacks: {
          //Ce code enlève le titre tooltip
          title: function () {},
        },
        //Ce code enlève les couleurs de la légende
        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: "nearest",
        caretSize: 10,
        backgroundColor: "rgba(255,255,255,.9)",
        bodyFontSize: 15,
        bodyFontColor: "#303030",
      },
    },
  });
}

async function printXrpChart() {
  let { times, prices } = await xrpData();

  let ethereumChart = document.getElementById("xrpChart").getContext("2d");

  let gradient = ethereumChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, "rgba(78,56,216,.5)");
  gradient.addColorStop(0.425, "rgba(118,106,192,0)");

  Chart.defaults.global.defaultFontFamily = "Red Hat Text";
  Chart.defaults.global.defaultFontSize = 12;

  createEthereumChart = new Chart(xrpChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "$",
          data: prices,
          backgroundColor: gradient,
          borderColor: "rgba(118,106,192,1)",
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2,
        },
      ],
    },

    options: {
      title: {
        display: false,
        text: "Heckin Chart!",
        fontSize: 35,
      },

      legend: {
        display: false,
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
      },

      tooltips: {
        callbacks: {
          title: function () {},
        },

        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: "nearest",
        caretSize: 10,
        backgroundColor: "rgba(255,255,255,.9)",
        bodyFontSize: 15,
        bodyFontColor: "#303030",
      },
    },
  });
}

async function printEthereumChart() {
  let { times, prices } = await ethereumData();

  let ethereumChart = document.getElementById("ethereumChart").getContext("2d");

  let gradient = ethereumChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, "rgba(78,56,216,.5)");
  gradient.addColorStop(0.425, "rgba(118,106,192,0)");

  Chart.defaults.global.defaultFontFamily = "Red Hat Text";
  Chart.defaults.global.defaultFontSize = 12;

  createEthereumChart = new Chart(ethereumChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "$",
          data: prices,
          backgroundColor: gradient,
          borderColor: "rgba(118,106,192,1)",
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2,
        },
      ],
    },

    options: {
      title: {
        display: false,
        text: "Heckin Chart!",
        fontSize: 35,
      },

      legend: {
        display: false,
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
      },

      tooltips: {
        callbacks: {
          title: function () {},
        },

        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: "nearest",
        caretSize: 10,
        backgroundColor: "rgba(255,255,255,.9)",
        bodyFontSize: 15,
        bodyFontColor: "#303030",
      },
    },
  });
}

async function printMyChart() {
  let { times, prices } = await myData();
  
  let myChart = document.getElementById("myChart").getContext("2d");

  let gradient = myChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, "rgba(78,56,216,.5)");
  gradient.addColorStop(0.425, "rgba(118,106,192,0)");

  Chart.defaults.global.defaultFontFamily = "Red Hat Text";
  Chart.defaults.global.defaultFontSize = 12;

  createMyChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: symbol,
          data: prices,
          backgroundColor: gradient,
          borderColor: "grey",
          borderJoinStyle: "round",
          borderCapStyle: "round",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHitRadius: 10,
          lineTension: 0.2,
        },
      ],
    },

    options: {
      title: {
        display: true,
        text: coin,
        fontSize: 20,
      },

      legend: {
        display: false,
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },

      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {},
          },
        ],
      },

      tooltips: {
        callbacks: {
          title: function () {},
        },

        displayColors: false,
        yPadding: 10,
        xPadding: 10,
        position: "nearest",
        caretSize: 10,
        backgroundColor: "rgba(255,255,255,.9)",
        bodyFontSize: 15,
        bodyFontColor: "#303030",
      },
    },
  });
}

async function updateEthereumPrice() {
  let { times, prices } = await ethereumData();
  let currentPrice = prices[prices.length - 1].toFixed(2);

  document.getElementById("ethPrice").innerHTML = `${symbol}` + currentPrice;
}

async function updateXrpPrice() {
  let { times, prices } = await xrpData();
  let currentPrice = prices[prices.length - 1].toFixed(2);

  document.getElementById("xrpPrice").innerHTML = `${symbol}` + currentPrice;
}

async function updateCosmosPrice() {
  let { times, prices } = await cosmosData();
  let currentPrice = prices[prices.length - 1].toFixed(2);

  document.getElementById("atomPrice").innerHTML = `${symbol}` + currentPrice;
}

async function updateBitcoinPrice() {
  let { times, prices } = await btcData();
  let currentPrice = prices[prices.length - 1].toFixed(2);

  document.getElementById("btcPrice").innerHTML = `${symbol}` + currentPrice;
}

async function updateLtcPrice() {
  let { times, prices } = await ltcData();
  let currentPrice = prices[prices.length - 1].toFixed(2);

  document.getElementById("ltcPrice").innerHTML = `${symbol}` + currentPrice;
}

async function updateBnbPrice() {
  let { times, prices } = await bnbData();
  let currentPrice = prices[prices.length - 1].toFixed(2);

  document.getElementById("bnbPrice").innerHTML = `${symbol}` + currentPrice;
}

async function updateMyPrice() {
  let { times, prices } = await myData();
  let currentPrice = prices[prices.length - 1].toFixed(2);

  document.getElementById("myPrice").innerHTML = `${symbol}` + currentPrice;
}

updateEthereumPrice();
updateCosmosPrice();
updateBitcoinPrice();
updateLtcPrice();
updateXrpPrice();
updateBnbPrice();
updateMyPrice();

printBtcChart();
printCosmosChart();
printEthereumChart();
printLtcChart();
printXrpChart();
printBnbChart();
printMyChart();
