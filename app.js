const API_KEY = '72a030c9d43c47f1a4a31d87f636be6f';
const BASE_URL = 'https://api.giphy.com/v1/gifs/';
const ENDPOINT = 'search';
const LIMIT = (window.innerWidth < 768 ? 6 : 7);
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const images = document.getElementsByClassName('gallery-image');
const gallery = document.getElementById('gallery');


document.onkeydown = (addHoveredClass = (e) => {
  if (e.keyCode === 37) {
    previousButton.classList.toggle('hovered');
    moveThroughGallery(-1);
  } else if (e.keyCode === 39) {
    nextButton.classList.toggle('hovered');
    moveThroughGallery(1);
  }
});

document.onkeyup = (removeHoveredClass = (e) => {
  if (e.keyCode === 37) {
    previousButton.classList.remove('hovered');
  } else if (e.keyCode === 39) {
    nextButton.classList.remove('hovered');
  }
});

displayButtons = (visibility) => {
  if (visibility === 'visible') {
    nextButton.style.visibility = 'visible';
    previousButton.style.visibility = 'visible';
  } else if (visibility === 'hidden') {
    nextButton.style.visibility = 'hidden';
    previousButton.style.visibility = 'hidden';
  }
}

setInitialFeaturedImage = (imgUrl, username, source) => {
  document.getElementById('featured').innerHTML = (
    "<img src='" + imgUrl + "' class='featured-image' id='0' />"
  );
  document.getElementById('caption').innerHTML = (
    '<p>Source: ' + getImageCaption(username, source) + '</p>'
  );
}

getImageCaption = (username, source) => {
  if (username) {
    return username;
  } else if (source) {
    return source;
  } else {
    return 'No image source';
  }
}

showAllGifs = (json) => {
  if (json.data.length === 0) {
    displayButtons('hidden');
    document.getElementById('error-message').innerHTML = "<p class='text-center white'>No results found :(</p>";
  } else {
    document.getElementsByClassName('featured-container')[0].style.visibility = 'visible';
    displayButtons('visible');
    setInitialFeaturedImage(json.data[0].images.fixed_height.url, json.data[0].username, json.data[0].source_tld);

    json.data.forEach((gif, i) => {
      const col = document.createElement('div');
      const img = document.createElement('img');

      col.setAttribute('class', 'col');

      col.innerHTML = (
        "<img src='" + gif.images.fixed_height.url +
        "' class='gallery-image' onclick='selectImageFromGallery(parseInt(this.id))' id='" +
         i + "' />" + "<p id='" + i + "' style='display:none'>Source: " +
        getImageCaption(gif.username, gif.source_tld) + "</p>"
      );

      gallery.appendChild(col);
    });
    loopImages(imagesIndex);
  }
}

let imagesIndex = 0;

setFeaturedImageCaption = () => {
  const pTags = document.getElementsByTagName('p');

  for (let tag in pTags) {
    if (pTags[tag].id === images[imagesIndex].id) {
      document.getElementById('caption').innerHTML = '<p>' + pTags[tag].innerText + '</p>';
    }
  }
}

moveThroughGallery = (n) => {
  loopImages(imagesIndex += n);
  setActiveState();
}

// console error
setActiveState = () => {
  console.log('setActiveState image index', imagesIndex);
  console.log('imagesIndex plus one', imagesIndex + 1);
  console.log('imagesIndex minus one', imagesIndex - 1);
  // move forward - remove active state from previous
  if (imagesIndex > 0) {
    images[imagesIndex - 1].classList.remove('active');
  }
  // // move backward - remove active state from subsequent
  if (imagesIndex < 6) {
    images[imagesIndex + 1].classList.remove('active');
  }
}

selectImageFromGallery = (n) => {
  loopImages(imagesIndex = n);
  for (let gif in images) {
    if (images[gif].id !== document.getElementById('featured').children[0].id) {
      images[gif].classList.remove('active');
    }
  }
}

checkCurrentNumber = (num) => {
  if (num <= 0) {
    previousButton.disabled = true;
    previousButton.className = 'arrow disabled';
    imagesIndex = 0;
  }

  if (num > LIMIT - 1) {
    ajaxCall(Math.floor(Math.random() * 25));
    imagesIndex = 0;
  }

  if (num <= LIMIT - 1) {
    document.getElementById('featured').innerHTML = (
      "<img src='" + images[imagesIndex].src + "' class='featured-image' id='" + images[imagesIndex].id + "' />"
    );

    if (document.getElementById('featured').children[0].id === images[imagesIndex].id) {
      images[imagesIndex].classList.toggle('active');
    }

    setFeaturedImageCaption();
  }
}

loopImages = (n) => {
  previousButton.disabled = false;
  previousButton.classList.remove('disabled');

  checkCurrentNumber(n);
}

ajaxCall = (offsetNum) => {
  const xhr = new XMLHttpRequest();
  let query = {
    text: document.getElementById('gif-input').value,
    offset: offsetNum,
    request() {
      return `${BASE_URL}${ENDPOINT}?q=${this.text}&limit=${LIMIT}&offset=${this.offset}&api_key=${API_KEY}`;
    }
  };

  if (offsetNum !== 0) {
    gallery.innerHTML = '';
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
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

onSuccess = (json) => {
  document.getElementById('gif-input').style.outline = 'none';
  showAllGifs(json);
}

onError = (xhr, status) => {
  document.getElementById('error-message').innerHTML = (
    "<p class='text-center white'>" + status + " error. Sorry about that.</p>"
  );
}

searchGifs = () => {
  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    document.getElementById('error-message').innerHTML = '';
    document.getElementsByClassName('featured-container')[0].style.visibility = 'hidden';
    ajaxCall(0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  searchGifs();
});
