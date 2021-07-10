
# infinite-drawing-canvas
Infinite canvas that allows drawing with pen and pinch zoom. It should feel more or less like drawing in an app like OneNote, Krita or other, pen-enabled apps.

## Demo: 

https://thfrei.github.io/infinite-drawing-canvas/

## Video:

![demo](doc/idc-demo-2.gif)

## Try / Contribute:

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/thfrei/infinite-drawing-canvas)

## Features:

* Resizable Canvas
* Infinite Canvas*
* Pan Canvas to all sides
* Pan with Touch (Hammer.js) or ALT+Moues
* Pinch zoom (Hammer.js)
* Draw with Mouse / Touch / Pen
* Add Text
* Erase custom path (known issue: Resolution suffers... :-/)
* Erase whole object (existing path)

\* Actually one can define how big it is. In the demo it is 1500x1500px, way bigger than the visible area. Resultion of paths drawn depend on the scaling factor..., so infinite in fact is an overstatement.

## Roadmap

* see CHANGELOG.md

# Development

## Release new version

```
npm version patch
git push --follow-tags
```

## Github Actions

* `./.github/workflows/gh-pages.yml`: Create github pages in branch.

## Known Issues

* Pen not working in Firefox :-( - Changes in fabric.js necessary.
* `webpack-cli` >4 (v4.7.2) not working. See: https://github.com/webpack/webpack-dev-server/issues/2029 

## Fabric adaptions

* Custom build via: http://fabricjs.com/build/, 
  * with all options except: Gestures, Named accessors (from default, this is plus Erasing)
  * From built file remove: no options ticked (mainly window.fabric is unchecked)
* Change `js`-file:
  * Remove in code where `jsdom` is required, which would allow to run fabric under node.js context. The jsdom dependency causes issues with webpack 5, since webpack 5 has no longer a polyfill for `node.js` stuff:
    ```
    BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    This is no longer the case. Verify if you need this module and configure a polyfill for it.

    If you want to include a polyfill, you need to:
          - add a fallback 'resolve.fallback: { "path": require.resolve("path-browserify") }'
          - install 'path-browserify'
    If you don't want to include a polyfill, you can use an empty module like this:
          resolve.fallback: { "path": false }
    ```

# Credits

* Fabric.js - Great canvas library

# Prior Art

* Infinite canvas with drag and zoom with fabric.js: http://fabricjs.com/fabric-intro-part-5
* Add scrollbars to canvas: https://stackoverflow.com/questions/22742067/how-to-add-scrollbars-to-a-potentially-infinite-canvas-using-fabric-js/22792461
* Free Drawing fabric.js: http://fabricjs.com/freedrawing
* Pen Support in browser: https://patrickhlauke.github.io/touch/tracker/multi-touch-tracker-pointer-hud.html
* Minimalistic Shapes Editor: https://github.com/danielktaylor/fabric-js-editor
* React: Diagramming with react and fabric.js: https://github.com/salgum1114/react-design-editor
* Samples of Text-Editing: https://jsfiddle.net/gislef/Lvfpq57h/
* PoC of Connectors and Ports for Diagrams with fabric: https://robferguson.org/blog/2016/01/21/adding-support-for-ports-and-connectors-to-fabric-js/
  * https://github.com/Robinyo/my-2d-diagram-editor
* 
