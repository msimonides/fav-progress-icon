fav-progress-icon 1.0
=====================

Display progress in your page's favicon!

fav-progress-icon is a small JS library for switching favicon images to represent a value from the 0.0 to 1.0 range.
The images are prepared in advance which puts more work on you but provides compatibility with IE (the newer versions at least) and allows for completely custom progress visualization.

[Live demo.](https://msimonides.github.io/fav-progress-icon/example.html)

Usage Example
-------------

    // Use 33 files from the "icons" directory.
    // The files are named: 0.png, 1.png ... 32.png
    var fav_progress_icon = new FavProgressIcon(33, 'icons/');
    
    fav_progress_icon.setValue(0.0);
    fav_progress_icon.setValue(0.15);
    fav_progress_icon.setValue(0.333);
    fav_progress_icon.setValue(0.5);  // Half-way there.
    // ...
    fav_progress_icon.setValue(1.0);  // Task finished!
    
    // Restore the original favicon:
    fav_progress_icon.remove();


Where to Get the Icons?
-----------------------

Either create the individual images in a graphics program or use the provided [icon generator](https://msimonides.github.io/fav-progress-icon/icon-generator.html). The number of the images is up to you, just make sure to provide it to the `FavProgressIcon` constructor.

Credits
-------

Inspired by [Piecon](https://github.com/lipka/piecon) (actually, the goal of this project is: a Piecon that works in IE).

License
-------

Copyright 2015 Marcin Simonides, licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
