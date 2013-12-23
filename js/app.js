/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

function scrollToTop(element, duration) {
    if (duration < 0) return;
    
    var difference = 0 - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        scrollToTop(element, duration - 10);
    }, 10);
}


function scrollToPosition(element, to, duration) {
    if (duration < 0) return;
    
    var difference = Math.abs(to - element.scrollTop);
    var perTick = difference / duration * 10;

    setTimeout(function() {
      if ( element.scrollTop < to) {
        element.scrollTop = element.scrollTop + perTick;
      }
      scrollToPosition(element, to, duration - 10);
    }, 10);
}

var WINDOW_HEIGHT;

function scrollHandler(e) {
  if (document.body.scrollTop >= WINDOW_HEIGHT) {
    document.getElementById('arrow-up').classList.remove('hide');
  } else {
    document.getElementById('arrow-up').classList.add('hide');
  }
}

window.onload = function() {
  if (!WINDOW_HEIGHT) {
      WINDOW_HEIGHT = document.body.clientHeight;
    }
  
  document.getElementById('arrow-down').addEventListener('click', function() {
    scrollToPosition(document.body, WINDOW_HEIGHT, 150)
  });

  document.getElementById('arrow-up').addEventListener('click', function() {
    scrollToTop(document.body, 150)
  });

  window.onscroll = function() {
    scrollHandler();
  }
};
