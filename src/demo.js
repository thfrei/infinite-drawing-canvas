import { initButtons, initPens, initMenu } from './gui.js';
import { addBg, addDemoContent, addRect } from './utils.js';
import { InfiniteCanvas, CanvasState } from './index.js';
import _debounce from './lib/lodash.debounce';

const PKG_VERSION = process.env.PKG_VERSION

// just skip one cycle, so we can make sure, all other libraries are loaded!
setTimeout(() => {
  const myCanvas = new InfiniteCanvas(
    $('.canvasElement'),
    $('#parentContainer'),
    $('#canvasContainer'),
  );
  const infiniteCanvas = myCanvas.initFabric();
  const canvas = infiniteCanvas.$canvas;

  canvas.setWidth(myCanvas.width);
  canvas.setHeight(myCanvas.height);

  addDemoContent(canvas);
  addBg(canvas);
  addRect(canvas);

  // Buttons
  initButtons(infiniteCanvas);
  initPens(infiniteCanvas);
  initMenu(infiniteCanvas);
  // Set package.json version, passed via webpack
  $("#pkg-version").html(`v${PKG_VERSION}`);

  // After Render
  function afterRender() {
    console.log('after:render outside, call a save function or what not');
  }
  canvas.on('after:render', _debounce(afterRender, 1000));

  // add access to window, for debugging purposes.
  window.fabric = fabric;
  window.myCanvas = canvas;
});
