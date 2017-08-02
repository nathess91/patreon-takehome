getCaption = (username, source) => {
  if (username) {
    return username;
  } else if (source) {
    return source;
  } else {
    return 'No image source';
  }
}

showAllGifs = (json) => {
  document.getElementById('description').style.display = 'none';
  document.getElementById('featured').innerHTML = "<img src='" + json.data[0].images.fixed_height.url + "' class='featured-image' id='0' />"
  document.getElementById('caption').innerHTML = '<p>Source: ' + getCaption(json.data[0].username, json.data[0].source_tld) + '</p>'

  json.data.forEach((gif, i) => {
    const gallery = document.getElementById('gallery');
    // create parent column div
    const col = document.createElement('div');
    col.setAttribute('class', 'col');
    // create image element
    const img = document.createElement('img');
    // append image to div
    col.innerHTML = "<img src='" + gif.images.fixed_height.url + "' class='gallery-image' onclick='selectImage(this.src,this.id)' id='" + i + "' /> <p id='" + i + "' style='display:none'>Source: " + getCaption(gif.username, gif.source_tld) + "</p>";
    // append div to gallery
    gallery.appendChild(col);
  });
  document.getElementById('load-more').style.visibility = 'visible';
}

let start = 0;

nextImage = () => {
  const images = document.getElementsByClassName('gallery-image');
  let currentImage = images[start];
  start++;

  document.getElementById('featured').innerHTML = "<img src='" + currentImage.src + "' class='featured-image' id='" + currentImage.id + "' />";
  const pTags = document.getElementsByTagName('p');
  // changes featured image caption to selected image caption
  for (let tag in pTags) {
    if (pTags[tag].id === currentImage.id) {
      document.getElementById('caption').innerHTML = '<p>' + pTags[tag].innerText + '</p>';
    }
  }
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

  const pTags = document.getElementsByTagName('p');
  // changes featured image caption to selected image caption
  for (let tag in pTags) {
    if (pTags[tag].id === currentImage.id) {
      document.getElementById('caption').innerHTML = '<p>' + pTags[tag].innerText + '</p>';
    }
  }
}

selectImage = (src, id) => {
  // changes featured image source to selected image source
  document.getElementById('featured').innerHTML = "<img src='" + src + "' class='featured-image' id='" + id + "' />";
  const pTags = document.getElementsByTagName('p');
  // changes featured image caption to selected image caption
  for (let tag in pTags) {
    if (pTags[tag].id === id) {
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
  document.getElementById('gallery').innerHTML = '';
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
