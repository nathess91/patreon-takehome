# Patreon Web Take Home Assignment

<img src="http://i.imgur.com/si0UGjW.png" width="150">

_"The most controversially-named gif search engine. Go argue with your friends about it."_

This no-frills single page web app pulls gifs from the [GIPHY API](https://developers.giphy.com/) and displays the current gif in a lightbox using ~~chocolate~~ vanilla JavaScript, CSS, and HTML.

### Requirements (taken from original prompt)

We'd like you to create a web page that shows a photo in a lightbox view, with the ability to move to the next/previous photos and display a photo caption (photo title, hash tags, filename, etc) .

We will be checking the assignment out in latest Chrome and Firefox.

We ask that you do not use any 3rd party libraries in your application code (things like jQuery, React, Angular, etc).

You can use any public API that returns photos.

### Installation

1. `git clone` this repo and open it in your browser
2. Check it out on Heroku: [link here]
3. Check it out on CodePen: [link here]

## Design

The inspiration for Jif came from the countless times I was verbally attacked for saying "jif" (like the peanut butter) instead of "gif", despite citing evidence from [this article](http://www.bbc.com/news/technology-22620473). I found these experiences highly entertaining and loved the idea of creating this project around that. 

I planned for Jif to include more than just a single photo in a lightbox view, as indicated below.  This mockup was created with the amazingly versatile Sketch app.

<img src="http://i.imgur.com/wTfltG0.png" width="550" alt="Jif Logo" title="Jif Logo">

## Features

In addition to a lightbox, I felt that the user should be able to make search queries and view upcoming gifs in a gallery below the featured gif (similar to Flickr).

### Search
Customized content = awesome user experience. Jif's search functionality lets the user choose what they want to see. This gives the user more control over their interaction. The input has autofocus for faster searching.

### Navigation with Mouse or Arrow Keys
This functionality enhances user experience by giving the user the option to cycle through the gallery using a mouse/trackpad or left and right arrow keys. The user can use their mouse to click the arrow buttons adjacent to the featured gif or click on an individual gif in the gallery.

### Load More
When the user arrives at the last image in the gallery and clicks the next button or presses the right arrow key, more gifs will load without the page refreshing. This is accomplished by providing an offset value to the request.

### Mobile Friendly
When the user's device screen width is less than 768px, the limit value in the request is changed from 7 to 6 to display the results evenly across the screen.

<img src="http://i.imgur.com/xfe8HfM.png" width="250" alt="Jif Mobile View" title="Jif Mobile View">

### Active State
When a gif in the gallery is featured in the lightbox view, its gallery counterpart receives an "active" state to let the user know which gif they're looking at and its location in the gallery.

<img src="http://i.imgur.com/E6oap6T.png" alt="Jif Active State Demo" title="Jif Active State Demo" width="550">

### Error Handling
* User can't submit search without text in the input field
* User can't move to the previous image if they are looking at the first image in the gallery and button gets disabled state
* If the gif doesn't have a username or url source associated with it (pulled from the JSON object), the caption displays "No image source"
* If no search results are found, a "No results found" error message is displayed on the screen

## Personal Challenges

<!-- TO DO -->

## Future Additions

Some ideas to keep in mind for subsequent iterations:

- Enable swipe gesture on mobile
- When the user clicks the featured gif in the lightbox, a pop up box with a link appears for easy sharing
- Create an A/B test to see if users prefer seeing more images in the gallery (grid vs. photo strip)
- If users decide a grid is more favorable, add a loading spinner that disappears with a successful AJAX request
