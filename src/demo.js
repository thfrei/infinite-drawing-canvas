import { initButtons, initPens } from './gui.js';
import { addBg, addDemoContent } from './utils.js';
import { InfiniteCanvas, CanvasState } from './index.js';

// main()
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
  // addBg(canvas);

  // Buttons
  initButtons(infiniteCanvas);
  initPens(canvas);

  // After Render
  function afterRender() {
    console.log('after:render outside, call a save function or what not');
  }
  canvas.on('after:render', _debounce(afterRender, 1000));

  // add access to window, for debugging purposes.
  window.fabric = fabric;
  window.myCanvas = canvas;
});
