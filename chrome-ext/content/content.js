var availableFavIcons = [
  document.querySelectorAll('link[rel="shortcut icon"]'),
  document.querySelectorAll('link[rel="icon"]')
];

var icons = {
  'regular': 'icons/regular.ico',
  'broken': 'icons/broken.ico',
  'mergeable': 'icons/mergeable.ico'
};

var currentIcon = icons.regular;

var getFavIcon = function() {
  for (var i = 0; i < availableFavIcons.length; i++) {
    var icon = availableFavIcons[i];

    if (icon.length) {
      return icon[0];
    }
  }

  return false;
};

var createFavIcon = function() {
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  document.getElementsByTagName('head')[0].appendChild(link);

  return link;
};

var setFavIcon = function(path) {
  currentIcon = path;

  var icon = getFavIcon();

  if (!icon) {
    icon = createFavIcon();
  }

  icon.href = chrome.extension.getURL(path);
};

var isPullRequestMergeable = function() {
  return document.querySelectorAll('.completeness-indicator-success').length;
};

var isPullRequest = function() {
  return document.querySelectorAll('[aria-label="Pull Request title"]').length;
};

var setStateBasedFavIcon = function() {
  if (isPullRequestMergeable()) {
    setFavIcon(icons.mergeable);
  } else {
    setFavIcon(icons.broken);
  }
};

if (isPullRequest()) {
  setStateBasedFavIcon();

  setTimeout(function() {
    setStateBasedFavIcon();
  }, 1000);
} else {
  setFavIcon(icons.regular);
}
