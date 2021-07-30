import { fabric } from '../customTypes/fabric';

import 'hammerjs';
import '../dist/assets/jquery.hammer.js';

class IDC {
  $canvas: fabric.Canvas;
  $parent: JQuery;
  $canvasContainer: JQuery;

  canvasElement: any;

  isDragging: boolean;
  selection: boolean;
  lastPosX: number;
  lastPosY: number;
  startPosX: number;
  startPosY: number;
  lastScale: number;
  fonts: Array<String>;
  width: number;
  height: number;
  drawWithTouch: boolean;
  scaledWidth: number;
  scaledHeight: number;
  activatePlaceTextBox: boolean;

  hammer: any;

  constructor($canvas, $canvasDiv, $parentDiv,) {
    const self = this;
    const canvas = new fabric.Canvas($canvas, {
    });
    return self;
  }
}

export { IDC };
