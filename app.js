const apiKey = '72a030c9d43c47f1a4a31d87f636be6f';

const giphyUrl = 'https://api.giphy.com/v1/gifs/search?q=puppies&api_key=72a030c9d43c47f1a4a31d87f636be6f';

showAllGifs = (json) => {
  // default first picture inside featured div
  json.data.forEach((gif, i) => {
    const gallery = document.getElementById('gallery');
    // create parent column div
    const col = document.createElement('div');
    col.setAttribute('class', 'col');
    // create image element
    const img = document.createElement('img');
    // append image to div
    col.innerHTML = "<img src='" + gif.images.fixed_height.url + "' class='gallery-image' id='" + i + "' />"
    // append div to gallery
    gallery.appendChild(col);
  });
}

let start = 0;

nextImage = () => {
  const images = document.getElementsByClassName('gallery-image');
  let currentImage = images[start];
  start++;

  document.getElementById('featured').innerHTML = "<img src='" + currentImage.src + "' class='featured-image' id='" + currentImage.id + "' />";
}

previousImage = () => {
  const images = document.getElementsByClassName('gallery-image');
  let currentImage = images[start];
  start--;

  // if beginning of images, disable previous image functionality
  if (currentImage === images[0]) {
    document.getElementById('previous-button').style.visibility = 'hidden';
  }

  document.getElementById('featured').innerHTML = "<img src='" + currentImage.src + "' class='featured-image' id='" + currentImage.id + "' />";
}

onSuccess = (json) => {
  showAllGifs(json);
}

onError = (status) => {
  console.log(`Error: status ${status}`)
}

ajaxCall = () => {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // on success
      const res = JSON.parse(xmlhttp.responseText);
      onSuccess(res);
    }
    else if (xmlhttp.status !== 200 && xmlhttp.status !== 0) {
      onError(xmlhttp.status);
    }
  }

  xmlhttp.open('GET', giphyUrl, true);
  xmlhttp.send();
}

document.addEventListener('DOMContentLoaded', () => {
  ajaxCall();
});
