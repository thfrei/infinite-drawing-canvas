import { fabric } from '../dist/assets/fabric';
import 'hammerjs';

class InfiniteDrawingCanvas {
  fabric: fabric.Canvas;
  canvasElement: HTMLCanvasElement;
  CanvasContainer: HTMLElement;
  EditorContainer: HTMLElement;

  constructor(initialDiv: HTMLElement) {
    this.EditorContainer = initialDiv;
    this.canvasElement = document.createElement('canvas');
    this.CanvasContainer = document.createElement('div');
    this.CanvasContainer.appendChild(this.canvasElement);
    this.EditorContainer.appendChild(this.CanvasContainer);

    // add scrollbars if inner canvas gets bigger (infinite inner canvas)
    this.EditorContainer.style.overflow = 'auto';
    this.EditorContainer.style.resize = 'both';

    this.fabric = new fabric.Canvas(this.canvasElement, {
      isDrawingMode: true,
      selection: false,
    });

    return this;
  }

  setHeightEditor(height: number) {
    this.EditorContainer.style.height = `${height}px`;
  }

  setWidthEditor(width: number) {
    this.EditorContainer.style.width = `${width}px`;
  }

  setWidthCanvas(width: number) {
    this.CanvasContainer.style.width = `${width}px`;
    this.canvasElement.width = width;
    this.fabric.setWidth(width);
  }

  setHeightCanvas(height: number) {
    this.CanvasContainer.style.height = `${height}px`;
    this.canvasElement.height = height;
    this.fabric.setHeight(height);
  }
}

export { InfiniteDrawingCanvas };
