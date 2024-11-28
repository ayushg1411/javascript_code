import {JSDOM} from 'jsdom'
const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="app"></div></body></html>`);
export const  global_document = dom.window.document;
export const  global_window = dom.window;

// Now you can use document.getElementById in Node.js
const app = global_document.getElementById("app");
console.log(app); // Outputs: <div id="app"></div>
