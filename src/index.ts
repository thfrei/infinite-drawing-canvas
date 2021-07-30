import { fabric } from '../dist/assets/fabric';
import 'hammerjs';

const enum DrawingMode {
  Line,
  Rectangle,
  Oval,
  Text,
  Polyline,
  Path,
  Pencil,
  Eraser,
  PathEraser
}

const enum CursorMode {
  Draw,
  Select
}

class InfiniteDrawingCanvas {
  private fabric: fabric.Canvas;
  private canvasElement: HTMLCanvasElement;
  private CanvasContainer: HTMLElement;
  private Tools: HTMLElement;
  private EditorContainer: HTMLElement;

  private cursorMode: CursorMode = CursorMode.Draw;

  constructor(initialDiv: HTMLElement) {
    this.EditorContainer = initialDiv;
    this.canvasElement = document.createElement('canvas');
    this.CanvasContainer = document.createElement('div');
    this.Tools = document.createElement('div');

    this.CanvasContainer.appendChild(this.canvasElement);
    this.EditorContainer.appendChild(this.Tools);
    this.EditorContainer.appendChild(this.CanvasContainer);

    // add scrollbars if inner canvas gets bigger (infinite inner canvas)
    this.EditorContainer.style.overflow = 'auto';
    this.EditorContainer.style.resize = 'both';

    this.fabric = new fabric.Canvas(this.canvasElement, {
      isDrawingMode: true,
      selection: false,
    });

    this.initTools();

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

  setDrawingMode(drawingMode: boolean) {
    this.fabric.isDrawingMode = drawingMode;
  }

  initTools() {
    const self = this;
    const cursor = document.createElement('button');
    cursor.onclick = (ev) => {
      self.setDrawingMode(false);
    };
    cursor.innerHTML = '<i class="bx bx-pointer"></i>';
    cursor.className = 'btn btn-info';
    this.Tools.appendChild(cursor);

    const pen = document.createElement('button');
    pen.onclick = (ev) => {
      self.setDrawingMode(true);
    };
    pen.innerHTML = '<i class="bx bx-pencil" style="border-left: 3px solid black"></i>';
    pen.className = 'btn btn-info';

    this.Tools.appendChild(pen);
  }

}

export { InfiniteDrawingCanvas };
