/*
init function to activate mouseweheel and pinch zoom
*/
    // Zoom (Mousewheel)
    // canvas.on('mouse:wheel', function (opt) {
    //   var delta = opt.e.deltaY;
    //   var zoom = canvas.getZoom();
    //   zoom *= 0.999 ** delta;
    //   if (zoom > 20) zoom = 20;
    //   if (zoom < 0.01) zoom = 0.01;
    //   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    // });

    // TODO: fix mouse:move pan and hamer, so that it works together
    // // mouse and hammer touch pan are in conflict!!!!! // hammer does not work if mouse enabled...,
    // const max = 1500;
    // canvas.on('mouse:wheel', function(opt) {
    //   var delta = opt.e.deltaY;
    //   var zoom = canvas.getZoom();
    //   zoom *= 0.999 ** delta;
    //   if (zoom > 20) zoom = 20;
    //   if (zoom < 0.01) zoom = 0.01;
    //   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    //   var vpt = this.viewportTransform;
    //   if (zoom < 0.4) {
    //     vpt[4] = 200 - max * zoom / 2;
    //     vpt[5] = 200 - max * zoom / 2;
    //   } else {
    //     if (vpt[4] >= 0) {
    //       vpt[4] = 0;
    //     } else if (vpt[4] < canvas.getWidth() - max * zoom) {
    //       vpt[4] = canvas.getWidth() - max * zoom;
    //     }
    //     if (vpt[5] >= 0) {
    //       vpt[5] = 0;
    //     } else if (vpt[5] < canvas.getHeight() - max * zoom) {
    //       vpt[5] = canvas.getHeight() - max * zoom;
    //     }
    //   }
    // });
    // canvas.on('mouse:down', function(opt) {
    //   var evt = opt.e;
    //   if (evt.altKey === true) {
    //     this.isDragging = true;
    //     this.selection = false;
    //     this.lastPosX = evt.clientX;
    //     this.lastPosY = evt.clientY;
    //     this.isDrawingMode = false;
    //   }
    // });
    // canvas.on('mouse:move', function(opt) {
    //   if (this.isDragging) {
    //     var e = opt.e;
    //     var zoom = canvas.getZoom();
    //     var vpt = this.viewportTransform;
    //     if (zoom < 0.4) {
    //       vpt[4] = 200 - max * zoom / 2;
    //       vpt[5] = 200 - max * zoom / 2;
    //     } else {
    //       vpt[4] += e.clientX - this.lastPosX;
    //       vpt[5] += e.clientY - this.lastPosY;
    //       if (vpt[4] >= 0) {
    //         vpt[4] = 0;
    //       } else if (vpt[4] < canvas.getWidth() - max * zoom) {
    //         vpt[4] = canvas.getWidth() - max * zoom;
    //       }
    //       if (vpt[5] >= 0) {
    //         vpt[5] = 0;
    //       } else if (vpt[5] < canvas.getHeight() - max * zoom) {
    //         vpt[5] = canvas.getHeight() - max * zoom;
    //       }
    //     }
    //     this.requestRenderAll();
    //     this.lastPosX = e.clientX;
    //     this.lastPosY = e.clientY;
    //   }
    // });
    // canvas.on('mouse:up', function(opt) {
    //   this.setViewportTransform(this.viewportTransform);
    //   this.isDragging = false;
    //   this.selection = true;
    // });
