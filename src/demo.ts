import { initButtons, initPens, initMenu } from './gui.js';
import { addBg, addDemoContent } from './utils.js';
import { IDC } from './index';

const PKG_VERSION = process.env.PKG_VERSION

// just skip one cycle, so we can make sure, all other libraries are loaded!
setTimeout(() => {
  const idc = new IDC(
    // @ts-ignore
    document.getElementById("c"),
    document.getElementById("parentContainer"),
    document.getElementById("canvasContainer"),
  );

  console.log("hi");

  // Set package.json version, passed via webpack
  document.getElementById("pkg-version").innerHTML = `v${PKG_VERSION}`;

  // add access to window, for debugging purposes.
});
