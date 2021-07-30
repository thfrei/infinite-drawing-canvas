import { fabric } from '../dist/assets/fabric';
import 'hammerjs';

class IDC {
  $canvas: fabric.Canvas;
  $canvasDiv: HTMLElement;
  $parentDiv: HTMLElement;

  constructor($canvas: HTMLCanvasElement, $canvasDiv: HTMLElement, $parentDiv: HTMLElement) {
    this.$canvas = new fabric.Canvas($canvas, {
      isDrawingMode: true,
    });
    return this;
  }
}

export { IDC };
