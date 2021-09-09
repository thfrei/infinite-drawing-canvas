import { fabric } from '../dist/assets/fabric';
import * as Hammer from 'hammerjs';
import {throttle, debounce} from 'lodash';

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
  Select,
  Pan,
  Pinch,
  Zoom
}

interface Coordinates {
  x: number,
  y: number,
}

const enum Device {
  Touch,
  Pen,
  Mouse
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
  private hammer: HammerManager;

  private cursorMode: CursorMode = CursorMode.Select;

  private panningStart: Coordinates = {x: 0, y: 0};

  /**
   * Constructor needs only one div as HTMLElement (not Jquery-Selector) and will
   * create all other needed HTML ELements (div, canvas)
   *
   * @param initialDiv
   */
  constructor(initialDiv: HTMLElement) {
    this.EditorContainer = initialDiv;
    this.canvasElement = document.createElement('canvas');
    this.CanvasContainer = document.createElement('div');
    this.Tools = document.createElement('div');

    this.EditorContainer.parentNode.appendChild(this.Tools);
    this.CanvasContainer.appendChild(this.canvasElement);
    this.EditorContainer.appendChild(this.CanvasContainer);

    // add scrollbars if inner canvas gets bigger (infinite inner canvas)
    this.EditorContainer.style.overflow = 'auto';
    // resize only for debugging
    this.EditorContainer.style.resize = 'both';

    this.fabric = new fabric.Canvas(this.canvasElement, {
      isDrawingMode: true,
      selection: false,
    });

    // add Pinch & Pan
    this.hammer = new Hammer.Manager(this.fabric.upperCanvasEl);
    const pinch = new Hammer.Pinch();
    const pan = new Hammer.Pan();
    this.hammer.add([pinch, pan]);
    // Zoom (Pinch)
    // throttle to make sure, device is not overly used
    this.hammer.on('pinchmove', throttle(this.handlePinchMove, 20));
    // the pinchend call must be debounced, since a pinchmove event might
    // occur after a couple of ms after the actual pinchend event. With the
    // debounce, it is garuanted, that this.lastScale and the scale for the
    // next pinch zoom is set correctly
    this.hammer.on('pinchend', debounce(this.handlePinchEnd, 200));

    // Move Canvas
    this.hammer.on('panstart', this.handlePanStart);
    this.hammer.on('pan', throttle(this.handlePan, 20));
    this.hammer.on('panend', this.handlePanEnd);

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

    const width = '30px';
    this.Tools.style.width = width

    const cursor = document.createElement('button');
    cursor.onclick = (ev) => {
      self.enableSelectionMode();
    };
    cursor.innerHTML = '<i class="bx bx-pointer"></i>';
    cursor.className = 'btn btn-info';
    cursor.style.width = width
    this.Tools.appendChild(cursor);

    const pen = document.createElement('button');
    pen.onclick = (ev) => {
      self.enableDrawingMode();
    };
    pen.innerHTML = '<i class="bx bx-pencil" style="border-left: 3px solid black"></i>';
    pen.className = 'btn btn-info';
    pen.style.width = width

    this.Tools.appendChild(pen);
  }

  handlePinchMove() {

  }

  handlePinchEnd() {

  }

  handlePanStart = (e: HammerInput) => {
    console.log('handlePanStart', e);
    if (e.pointerType === 'touch') {
      this.cursorMode = CursorMode.Pan;
    } else {
      this.cursorMode = CursorMode.Draw;
    }

    if (this.cursorMode === CursorMode.Pan) {
      this.cursorMode = CursorMode.Pan;
      this.setSelectionMode(false);
      this.setDrawingMode(false);

      this.panningStart = {
        x: this.EditorContainer.scrollLeft,
        y: this.EditorContainer.scrollTop
      };
      console.log('handlePanStart', this, this.panningStart);
    }
  }

  handlePan = (e) => {
    if (this.cursorMode === CursorMode.Pan) {
      const panMultiplier = 1.0;
      const dx = this.panningStart.x - e.deltaX * panMultiplier;
      const dy = this.panningStart.y - e.deltaY * panMultiplier;
      this.EditorContainer.scrollLeft = dx;
      this.EditorContainer.scrollTop = dy;
      this.fabric.requestRenderAll();
    }
  }

  handlePanEnd() {

  }

}

class InputDevice {
  private device: Device;

  recognizeDevice = (e: HammerInput) => {
    if (e.pointerType === 'pen') {
      this.device = Device.Pen;
    } else if (e.pointerType === 'touch') {
      this.device = Device.Touch;
    } else if (e.pointerType === 'mouse') {
      this.device = Device.Mouse;
    }
  }

  get = () => {
    return this.device;
  }
}

class InputHandler {

}

export { InfiniteDrawingCanvas };
