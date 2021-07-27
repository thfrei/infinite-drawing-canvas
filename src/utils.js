function addDemoContent(canvas) {
  var comicSansText = new fabric.Text("I'm in Comic Sans", {
    fontFamily: 'Comic Sans MS',
    left: 100,
    top: 100,
  });
  canvas.add(comicSansText);
  var demoLine = new fabric.Line([30, 30, 150, 210], {
    fill: 'green',
    stroke: 'blue',
    strokeWidth: 5,
    selectable: false,
    evented: false,
  });
  canvas.add(demoLine);
}

function addRect(canvas) {
  var rect = new fabric.Rect({
    left: 150,
    top: 200,
    originX: 'left',
    originY: 'top',
    width: 150,
    height: 120,
    angle: -10,
    fill: 'rgba(255,0,0,0.5)',
    transparentCorners: false,
    hasControls: true,
  });
  rect.setControlsVisibility({
    mtr: true,
  })

  canvas.add(rect).setActiveObject(rect);
}

function addBg(canvas) {
  // Add BG
  var bg = new fabric.Rect({
    width: 1500,
    height: 1500,
    // stroke: 'Fuchsia',
    // strokeWidth: 10,
    fill: '#FCFFEB',
    evented: false,
    selectable: false,
  });
  // bg.fill = new fabric.Pattern(
  //   {
  //     source:
  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAASElEQVQ4y2NkYGD4z0A6+M3AwMBKrGJWBgYGZiibEQ0zIInDaCaoelYyHYcX/GeitomjBo4aOGrgQBj4b7RwGFwGsjAwMDAAAD2/BjgezgsZAAAAAElFTkSuQmCC',
  //   },
  //   function () {
  //     bg.dirty = true;
  //     canvas.requestRenderAll();
  //   },
  // );
  bg.canvas = canvas;
  canvas.backgroundImage = bg;
}

export {
    addBg,
    addDemoContent,
    addRect,
};
