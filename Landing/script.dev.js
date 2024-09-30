"use strict";

// script.js
// Function to handle the button click event
function joinUs() {
  // Redirect to the registration page
  window.location.href = '../Registration/register.html';
} // Add event listener for the button


document.addEventListener('DOMContentLoaded', function () {
  var joinButton = document.querySelector('.button');

  if (joinButton) {
    joinButton.addEventListener('click', function () {
      // Alert the user before redirecting
      alert("You are about to join Evovle Fitness! Redirecting to registration.");
      joinUs();
    });
  }
}); // Smooth scrolling for any anchor links (if you add them later)

var scrollLinks = document.querySelectorAll('a[href^="#"]');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = scrollLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var link = _step.value;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}