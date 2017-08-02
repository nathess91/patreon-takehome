const apiKey = '72a030c9d43c47f1a4a31d87f636be6f';

const giphyUrl = 'https://api.giphy.com/v1/gifs/search?q=sharks&api_key=72a030c9d43c47f1a4a31d87f636be6f';

onSuccess = (json) => {
  json.data.forEach((gif, i) => {
    document.getElementById()
  });
}

ajaxCall = () => {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // on success
      const res = JSON.parse(xmlhttp.responseText);
      onSuccess(res);
    } else {
      // error
      console.log('Something is wrong!');
    }
  }

  xmlhttp.open('GET', giphyUrl, true);
  xmlhttp.send();
}

document.addEventListener('DOMContentLoaded', () => {
  ajaxCall();
});
