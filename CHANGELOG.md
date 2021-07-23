# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [upcoming: 0.1.0]

* [ ] Pens inside Canvas viewbox or next to it. Maybe a draggable menu. This would make the library "plug-and-play".
* [ ] build library and make it usable via clear api (focus: trilium)
* [ ] Publish to npm (make it consumable)

## unreleased
* ...

## [0.0.9]
* remove the need to include external dependencies in index.html (except jQuery for now)

## [0.0.8]
* Pressure sensitive Brush: https://arch-inc.github.io/fabricjs-psbrush/
* Path eraser that uses the actual path and not the bounding box
* Other brushes like crayon: https://github.com/tennisonchan/fabric-brush
* Pen support for Firefox
* Newest fabric version: 4.3.0 (currently 4.1.0)

## [0.0.6] - 2020-12-xx

### Status
* Resizable Viewbox
* Enlarge (+-) Canvas to all sides
* Pan Canvas to all sides
* Pan with Touch (Hammer.js) or ALT+Moues
* Pinch zoom (Hammer.js)
* Draw with Mouse / Touch / Pen (only Chrome)
* Add Text
* Erase custom path (known issue: Resolution suffers... :-/)
* Erase whole object (existing path)
