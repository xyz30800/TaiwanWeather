import { JSDOM } from 'jsdom';

if (typeof document === 'undefined') {
	const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    global.window = dom.window;
	global.document = dom.window.document;
}

global.navigator = {
  userAgent: 'node.js'
};