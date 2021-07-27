import EraserBrushFactory from './EraserBrush';
import EraserBrushPathFactory from './EraserBrushPath';
import { fabric } from '../dist/assets/fabric.4.2.0.custom';

/**
 * add listeners to buttons
 * 
 * requires jQuery
 * ToDo: have buttons use vinalla js, add it inside the canvas
 */
export const initButtons = (self) => {
  const canvas = self.$canvas;

  var saveCanvas = $('#save-canvas'),
    refreshCanvas = $('#refresh-canvas'),
    zoom100 = $('#zoom-100'),
    showSVG = $('#show-svg'),
    clearEl = $('#clear-canvas'),
    undo = $('#undo'),
    redo = $('#redo');
  const deletedItems = [];

  undo.on('click', () => {
    // // Source: https://stackoverflow.com/a/28666556
    // var lastItemIndex = canvas.getObjects().length - 1;
    // var item = canvas.item(lastItemIndex);

    // deletedItems.push(item);
    // // if(item.get('type') === 'path') {
    // canvas.remove(item);
    // canvas.renderAll();
    // // }

    canvas.undo(); //fabric-history
  });

  redo.on('click', () => {
    // const lastItem = deletedItems.pop();
    // if (lastItem) {
    //   canvas.add(lastItem);
    //   canvas.renderAll();
    // }

    canvas.redo(); //fabric-history
  });

  clearEl.on('click', () => {
    console.log('cE-oC');
    canvas.clear();
  });

  saveCanvas.on('click', () => {
    console.log('sC-oC');
    const payload = self.getInfiniteCanvas();
    console.log('sC-oC', payload);
    localStorage.setItem('infiniteCanvas', JSON.stringify(payload));
  });

  refreshCanvas.on('click', async () => {
    console.log('rC-oC');
    const infiniteCanvas = localStorage.getItem('infiniteCanvas') || '';
    // console.log('rcoc, inf', infiniteCanvas);

    try {
      await self.setInfiniteCanvas(JSON.parse(infiniteCanvas || ''));
    } catch (err) {
      console.error('canvas could not be loaded!');
    }
  });

  zoom100.on('click', () => {
    console.log('zoom100');
    // TODO extract zoom to into separate function (reuse for zoom 100% button)
    // zoom level of canvas
    self.resetZoom();

    canvas.renderAll();
  });

  showSVG.on('click', () => {
    console.log('showSVG');
    const svg = self.$canvas.toSVG();
    //const imageSrc = `data:image/svg+xml;utf8,${svg}`;
    // $('#svgImage').html(`<img src="${imageSrc}" height="100" />`);
    $('#svgImage').html(`${svg}`);
  });

  $('#enlarge-left').on('click', () => {
    const enlargeValue = parseInt($('#enlargeValue').val(), 10);
    self.$canvas.transformCanvas('left', enlargeValue);
  });
  $('#enlarge-top').on('click', () => {
    const enlargeValue = parseInt($('#enlargeValue').val(), 10);
    self.$canvas.transformCanvas('top', enlargeValue);
  });
  $('#enlarge-right').on('click', () => {
    const enlargeValue = parseInt($('#enlargeValue').val(), 10);
    self.$canvas.transformCanvas('right', enlargeValue);
  });
  $('#enlarge-bottom').on('click', () => {
    const enlargeValue = parseInt($('#enlargeValue').val(), 10);
    self.$canvas.transformCanvas('bottom', enlargeValue);
  });
  $('#crop-canvas').on('click', () => {
    self.cropCanvas();
  });

  $('#mode-select').on('click', () => {
    self.$canvas.isDrawingMode = false;
    self.drawWithTouch = false;
  });
  $('#mode-drawWithTouch').on('click', () => {
    self.drawWithTouch = true;
  });
};

export const initPens = (self) => {
  const canvas = self.$canvas;
  $('#pen-1').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'black';
    canvas.freeDrawingBrush.width = 2;
    canvas.isDrawingMode = true;
  });
  $('#pen-2').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'red';
    canvas.freeDrawingBrush.width = 2;
    canvas.isDrawingMode = true;
  });
  $('#pen-3').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'green';
    canvas.freeDrawingBrush.width = 2;
    canvas.isDrawingMode = true;
  });
  $('#pen-4').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'blue';
    canvas.freeDrawingBrush.width = 2;
    canvas.isDrawingMode = true;
  });
  $('#marker-1').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'rgba(255, 255, 0, 0.5)';
    canvas.freeDrawingBrush.width = 10;
    canvas.isDrawingMode = true;
  });
  $('#marker-2').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'rgba(241,229,170, 0.5)';
    canvas.freeDrawingBrush.width = 10;
    canvas.isDrawingMode = true;
  });
  $('#marker-3').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'rgba(51,204,0, 0.5)';
    canvas.freeDrawingBrush.width = 10;
    canvas.isDrawingMode = true;
  });
  $('#marker-4').on('click', () => {
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    canvas.freeDrawingBrush.color = 'rgba(75,141,242, 0.5)';
    canvas.freeDrawingBrush.width = 10;
    canvas.isDrawingMode = true;
  });
  $('#eraser').on('click', () => {
    const { EraserBrush } = EraserBrushFactory(fabric);
    const eraserBrush = new EraserBrush(canvas);
    eraserBrush.width = 10;
    eraserBrush.color = 'rgb(236,195,195)'; // erser works with opacity!
    canvas.freeDrawingBrush = eraserBrush;
    canvas.isDrawingMode = true;
  });
  $('#eraser-path').on('click', () => {
    const { EraserBrushPath } = EraserBrushPathFactory(fabric);
    const eraserBrush = new EraserBrushPath(canvas);
    eraserBrush.width = 8;
    eraserBrush.color = 'rgba(236,195,220, 20)'; // erser works with opacity!
    canvas.freeDrawingBrush = eraserBrush;
    canvas.isDrawingMode = true;
  });
  $('#text-1').on('click', () => {
    self.activatePlaceTextBox = true;
    canvas.isDrawingMode = false;
  });

  $('#img-url').val(window.location.origin + '/samples/sample1.png');
  $('#img-add').on('click', () => {
    fabric.Image.fromURL($('#img-url').val(), function(img) {
      img.set({ left: 250, top: 250, angle: 30});
      img.hasControls = true;
      img.scale(0.5);
      img.selectable = true;
      canvas.add(img);
    });
  })

  var group = [];
  $('#img-add-svg').on('click', () => {
    fabric.loadSVGFromURL(
      $('#img-url').val(),
      function(objects,options) {
        var loadedObjects = new fabric.Group(group);
        loadedObjects.set({
                left: 100,
                top: 100,
        });
        canvas.add(loadedObjects);
        canvas.renderAll();
        group = [];
      },
      function(item, object) {
              object.set('id',item.getAttribute('id'));
              group.push(object);
      }
    );
  });
};



export const initMenu = (self) => {
  //$('#idc-menu').draggable();
};
