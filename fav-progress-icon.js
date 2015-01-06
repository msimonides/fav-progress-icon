// fav-progress-icon 1.0
// (c) 2015 Marcin Simonides, licensed under the MIT License.

var FavProgressIcon = (function() {
	function iconPath(index, icon_path_prefix) {
		return icon_path_prefix + index + '.png';
	}

	function preloadIcons(icon_count, icon_path_prefix) {
		var icon_paths = [];
		for (var i = 0; i < icon_count; ++i)
			icon_paths.push(iconPath(i, icon_path_prefix));

		function preloadNextIcon() {
			if (icon_paths.length > 0) {
				var image = new Image;
				image.onload = preloadNextIcon;
				image.src = icon_paths.shift();
			}
		}
		preloadNextIcon();
	}

	function removeFaviconElements() {
		var link_elements = document.querySelectorAll('head link');

		var favicons = [];
		for (var i = link_elements.length - 1; i >= 0; --i) {
			var element = link_elements[i];
			if (element.rel == 'icon' || element.rel == 'shortcut icon') {
				favicons.push(element);
				element.parentNode.removeChild(element);
			}
		}

		return favicons;
	}

	function restoreFaviconElements(elements) {
		var head = document.querySelector('head');
		for (var i = 0; i < elements.length; ++i) {
			head.appendChild(elements[i]);
		}
	}

	function insertFaviconElement() {
		var link_element = document.createElement('link');
		link_element.rel = 'icon';
		link_element.type = 'image/png';
		document.querySelector('head').appendChild(link_element);
		return link_element;
	}

	function FavProgressIcon(icon_count, icon_path_prefix) {
		this.icon_count = icon_count;
		this.icon_path_prefix = icon_path_prefix;
		preloadIcons(icon_count, icon_path_prefix);
	}

	FavProgressIcon.prototype.setValue = function(value) {
		var max_index = this.icon_count - 1;
		var icon_index = Math.floor(value * max_index);
		var icon_path = iconPath(icon_index, this.icon_path_prefix);
		if (!this.favicon_element) {
			this.old_favicons = removeFaviconElements();
			this.favicon_element = insertFaviconElement();
		}

		// Firefox seems to ignore href updates, remove and add the
		// favicon_element to force update.
		this.favicon_element.parentNode.removeChild(this.favicon_element);
		this.favicon_element.href = icon_path;
		document.querySelector('head').appendChild(this.favicon_element);
	}
	FavProgressIcon.prototype.remove = function() {
		if (this.favicon_element) {
			this.favicon_element.parentNode.removeChild(
				this.favicon_element);
			this.favicon_element = null;
			restoreFaviconElements(this.old_favicons);
			delete this.old_favicons;
		}
	}

	return FavProgressIcon;
})();
