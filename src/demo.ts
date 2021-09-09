import { InfiniteDrawingCanvas } from './index';

const PKG_VERSION = process.env.PKG_VERSION

// just skip one cycle, so we can make sure, all other libraries are loaded!
setTimeout(() => {
  const idcContainer = document.getElementById("idc");
  const parentWidth = parseInt(idcContainer.parentElement.style.width);
  const parentHeight = parseInt(idcContainer.parentElement.style.height);
  const idc = new InfiniteDrawingCanvas(
    document.getElementById("idc"),
  );

  idc.setWidthCanvas(1500);
  idc.setHeightCanvas(700);

  idc.setWidthEditor(parentWidth-30);
  idc.setHeightEditor(parentHeight);

  // Set package.json version, passed via webpack
  document.getElementById("pkg-version").innerHTML = `v${PKG_VERSION}`;

  // add access to window, for debugging purposes.
  // @ts-ignore
  window.idc = idc;
});
