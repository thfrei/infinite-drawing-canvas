import { InfiniteDrawingCanvas } from './index';

const PKG_VERSION = process.env.PKG_VERSION

// just skip one cycle, so we can make sure, all other libraries are loaded!
setTimeout(() => {
  const idc = new InfiniteDrawingCanvas(
    document.getElementById("idc"),
  );

  idc.setHeightCanvas(700);
  idc.setWidthCanvas(1500);

  idc.setHeightEditor(400);
  idc.setWidthEditor(800);

  console.log("hi");

  // Set package.json version, passed via webpack
  document.getElementById("pkg-version").innerHTML = `v${PKG_VERSION}`;

  // add access to window, for debugging purposes.
  // @ts-ignore
  window.idc = idc;
});
