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

/**
 * Infinite Drawing Canvas Class
 *
 */
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

  /**
   * css height of editor div (editor is the visual input area)
   *
   * @param height
   */
  setHeightEditor(height: number) {
    this.EditorContainer.style.height = `${height}px`;
  }

  /**
   * css width of editor div
   *
   * @param width
   */
  setWidthEditor(width: number) {
    this.EditorContainer.style.width = `${width}px`;
  }

  /**
   * width of css container, canvas element and fabric.
   *
   * the canvas may be bigger than the editor and
   *
   * @param width
   */
  setWidthCanvas(width: number) {
    this.CanvasContainer.style.width = `${width}px`;
    this.canvasElement.width = width;
    this.fabric.setWidth(width);
  }

  /**
   * width of css container, canvas element and fabric.
   *
   * the canvas may be bigger than the editor and
   *
   * @param height
   */
  setHeightCanvas(height: number) {
    this.CanvasContainer.style.height = `${height}px`;
    this.canvasElement.height = height;
    this.fabric.setHeight(height);
  }

  /**
   * When true, mouse events on canvas (mousedown/mousemove/mouseup) result in free drawing.
   * After mousedown, mousemove creates a shape, and then mouseup finalizes it and adds an instance of `fabric.Path` onto canvas.
   * (source: http://fabricjs.com/docs/fabric.Canvas.html)
   * @param drawingMode
   */
  setDrawingMode(drawingMode: boolean) {
    this.fabric.isDrawingMode = drawingMode;
  }

  /**
   * Indicates whether group selection should be enabled
   * (source: http://fabricjs.com/docs/fabric.Canvas.html)
   *
   * @param selectionMode
   */
  setSelectionMode(selectionMode: boolean) {
    this.fabric.selection = selectionMode;
  }

  enableDrawingMode() {
    this.setDrawingMode(true);
    this.setSelectionMode(false);
  }

  enableSelectionMode() {
    this.setDrawingMode(false);
    this.setSelectionMode(true);
  }

  /**
   * todo: convert tools into separate class!?
   */
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
