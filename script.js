document.addEventListener("DOMContentLoaded", function() {
    const currencySelect = document.getElementById("currencySelect");
    const currencyInfo = document.getElementById("currencyInfo");
  
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then(response => response.json())
      .then(data => {
        const currencies = data.Valute;
        fillCurrencySelect(currencies);
      })
      .catch(error => {
        console.error("Произошла ошибка при получении данных:", error);
      });
  
    currencySelect.addEventListener("change", function() {
      const selectedCurrency = currencySelect.value;
      getCurrencyRate(selectedCurrency);
    });
  
    function fillCurrencySelect(currencies) {
        
      for (const currencyCode in currencies) {
        const currencyName = currencies[currencyCode].Name;
        const currencyID = currencies[currencyCode].ID;
        const option = document.createElement("option");
        option.value = currencyCode;
        option.textContent = `${currencyID} - ${currencyName}`;
        currencySelect.appendChild(option);
      }
  
      getCurrencyRate(currencySelect.value);
    }
  
    function getCurrencyRate(currency) {
      const url = `https://www.cbr-xml-daily.ru/daily_json.js`;
    
      fetch(url)
        .then(response => response.json())
        .then(data => {
         
          const currencyName = data.Valute[currency].Name;
          const currencyID = data.Valute[currency].ID;
          const currencyCharCode = data.Valute[currency].CharCode;

          const currencyRate = data.Valute[currency].Value;
          const previousRate = data.Valute[currency].Previous;
          
          const currentDateFormatted = formatDate(new Date(data.Date));
          const previousDateFormatted = formatDate(new Date(data.PreviousDate));
        
          function formatDate(date) {
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const seconds = date.getSeconds().toString().padStart(2, "0");
 
            return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
          }
  
         
          currencyInfo.textContent = `${currencyID} - ${currencyName} (${currencyCharCode}) | ${currentDateFormatted} - ${currencyRate} | ${previousDateFormatted} - ${previousRate}`;
          
        })
        .catch(error => {
          console.error("Произошла ошибка при получении данных:", error);
        });
    }

    
  });

