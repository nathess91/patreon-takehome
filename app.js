getCaption = (username, source) => {
  if (username) {
    return username;
  } else if (source) {
    return source;
  } else {
    return 'No image source';
  }
}

setFeatured = (imgUrl, username, source) => {
  document.getElementById('featured').innerHTML = "<img src='" + imgUrl + "' class='featured-image' id='0' />";
  document.getElementById('caption').innerHTML = '<p>Source: ' + getCaption(username, source) + '</p>';
}

showAllGifs = (json) => {
  setFeatured(json.data[0].images.fixed_height.url, json.data[0].username, json.data[0].source_tld);

  json.data.forEach((gif, i) => {
    const gallery = document.getElementById('gallery');
    // create parent column div
    const col = document.createElement('div');
    col.setAttribute('class', 'col');
    // create image element
    const img = document.createElement('img');
    // append image to div
    col.innerHTML = "<img src='" + gif.images.fixed_height.url + "' class='gallery-image' onclick='selectImage(parseInt(this.id))' id='" + i + "' /> <p id='" + i + "' style='display:none'>Source: " + getCaption(gif.username, gif.source_tld) + "</p>";
    // append div to gallery
    gallery.appendChild(col);
  });
  loopImages(imagesIndex);
}

let imagesIndex = 0;

nextImage = (n) => {
  loopImages(imagesIndex += n);
}

selectImage = (n) => {
  loopImages(imagesIndex = n);
}

loopImages = (n) => {
  console.log(n);
  console.log(imagesIndex);
  const images = document.getElementsByClassName('gallery-image');
  const prevButton = document.getElementById('previous-button');

  prevButton.disabled = false;
  prevButton.className = 'arrow';

  if (n >= images.length) {
    imagesIndex = 0;
    loadMore();
    // put this somewhere else - throws error
    document.getElementById('gallery').innerHTML = '';
  }

  if (n <= 0) {
    prevButton.disabled = true;
    prevButton.className = 'arrow disabled';
    imagesIndex = 0;
  }

  // set featured image
  document.getElementById('featured').innerHTML = "<img src='" + images[imagesIndex].src + "' class='featured-image' id='" + images[imagesIndex].id + "' />";

  // update caption
  const pTags = document.getElementsByTagName('p');

  for (let tag in pTags) {
    if (pTags[tag].id == images[imagesIndex].id) {
      document.getElementById('caption').innerHTML = '<p>' + pTags[tag].innerText + '</p>';
    }
  }
}

onSuccess = (json) => {
  showAllGifs(json);
}

onError = (xhr, status) => {
  console.log(`Error: status ${status}`);
  console.dir(xhr);
}

const API_KEY = '72a030c9d43c47f1a4a31d87f636be6f';
const BASE_URL = 'https://api.giphy.com/v1/gifs/';
const ENDPOINT = 'search';
const LIMIT = 7;
let query = {
  text: null,
  offset: 0,
  request() {
    return `${BASE_URL}${ENDPOINT}?q=${this.text}&limit=${LIMIT}&offset=${this.offset}&api_key=${API_KEY}`;
  }
};

ajaxCall = () => {
  query.text = document.getElementById('gif-input').value;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // on success
      const res = JSON.parse(xhr.responseText);
      onSuccess(res);
    }
    else if (xhr.status !== 200 && xhr.status !== 0) {
      onError(xhr, xhr.status);
    }
  }

  xhr.open('GET', query.request(), true);
  xhr.send();
}

searchGifs = () => {
  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // clear gallery
    document.getElementById('gallery').innerHTML = '';
    ajaxCall();
    // show arrows
    document.getElementById('next-button').style.visibility = 'visible';
    document.getElementById('previous-button').style.visibility = 'visible';
  });
}

loadMore = () => {
  query.offset = Math.floor(Math.random() * 25);
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // on success
      const res = JSON.parse(xhr.responseText);
      onSuccess(res);
    }
    else if (xhr.status !== 200 && xhr.status !== 0) {
      onError(xhr, xhr.status);
    }
  }

  xhr.open('GET', query.request(), true);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
  searchGifs();
});
