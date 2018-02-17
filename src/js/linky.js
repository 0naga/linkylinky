/*
  Add a button click handler to post our request to a Lambda function.
  The Lambda function will return a shortcode URL which it will also set
  as a new redirect rule in the global CDN.
*/
var btn = document.querySelector('#btn-create');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  var url = document.querySelector('#destination').value;
  fetch('/.netlify/functions/generate-route?to=' + url)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    document.querySelector("#confirmation").innerHTML = '<a href="' + data.url + '" target="_BLANK" rel="noopener">' + data.url + '</a>';
    return;
  });
}, false);


/*
  if a shortcode URL brought us here, then the deploy with that redirect is still
  underway. So let's query the data store directly and send the user to the right
  place with a client side redirect.
*/
if(document.location.pathname !== "/") {
  fetch('/.netlify/functions/get-route?code='+path.replace("/",""))
    .then(function(response) { return response.json(); })
    .then(function(data) {
      document.location.href = data.url;
  });
}
