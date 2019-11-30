// Set access key
var access_key = "7b7563ee5781cc4fa0d7";

// Load currency values in dropdown
window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://free.currconv.com/api/v7/currencies?apiKey=" + access_key
  );
  xhr.send();
  xhr.onload = function() {
    if (xhr.status == 200) {
      resp = JSON.parse(xhr.response);
      // console.log(resp)
      for (var i = 0; i < Object.keys(resp.results).length; i++) {
        $("#fromCurrency").append(
          "<option" +
            " value=" +
            '"' +
            Object.keys(resp.results)[i] +
            '"' +
            ">" +
            Object.values(Object.values(resp.results)[i]) +
            "</option>"
        );

        $("#toCurrency").append(
          "<option" +
            " value=" +
            '"' +
            Object.keys(resp.results)[i] +
            '"' +
            ">" +
            Object.values(Object.values(resp.results)[i]) +
            "</option>"
        );
      }
    } else alert(xhr.status + ": Something Went Wrong");
  };
};

// Currency Conversion Calculation
$("#conv-btn").click(function() {
  $("#from-currency-display-font").remove();
  $("#to-currency-display-font").remove();
  var fromCurr = $("#fromCurrency").val();
  var toCurr = $("#toCurrency").val();

  var url =
    "https://free.currconv.com/api/v7/convert?q=" +
    fromCurr +
    "_" +
    toCurr +
    "&compact=ultra&apiKey=" +
    access_key;

  var amount = $("#inputAmount").val();
  // console.log(amount)

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onload = function() {
    if (xhr.status == 200) {
      resp = JSON.parse(xhr.response);
      // console.log(Object.values(resp))
      if (amount == null || undefined) {
        var fromSymbol = Object.keys(resp)[0].split("_")[0];
        var toSymbol = Object.keys(resp)[0].split("_")[1];
        $(".display-out").append(
          "<p " +
            "id='from-currency-display-font'" +
            ">" +
            amount +
            " " +
            fromSymbol +
            " " +
            "=" +
            "</p>"
        );
        $(".display-out").append(
          "<p>" +
            "  " +
            Object.values(resp).toFixed(2) +
            " " +
            toSymbol +
            "</p>"
        );
      } else {
        var fromSymbol = Object.keys(resp)[0].split("_")[0];
        var toSymbol = Object.keys(resp)[0].split("_")[1];
        $(".display-out").append(
          "<p " +
            "id='from-currency-display-font'" +
            ">" +
            amount +
            " " +
            fromSymbol +
            " " +
            "=" +
            "</p>"
        );
        $(".display-out").append(
          "<p " +
            "id='to-currency-display-font'" +
            ">" +
            "  " +
            (Number(Object.values(resp)) * amount).toFixed(2) +
            " " +
            toSymbol +
            "</p>"
        );
      }
    } else alert(xhr.status + ": Something Went Wrong");
  };
});