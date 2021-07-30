import { fabric } from '../dist/assets/fabric';
import 'hammerjs';

class InfiniteDrawingCanvas {
  canvas: fabric.Canvas;
  CanvasContainer: HTMLElement;
  EditorContainer: HTMLElement;

  constructor(canvas: HTMLCanvasElement, CanvasContainer: HTMLElement, EditorContainer: HTMLElement) {
    this.canvas = new fabric.Canvas(canvas, {
      isDrawingMode: true,
    });
    return this;
  }
}

export { InfiniteDrawingCanvas };
