// Canvas helper utilities for use with the project's offscreen and visible canvases.
// Place this file in the repo and include it via a <script> tag (or import) so you can call
// the helpers from `5b.js` without modifying the original code.

// Draw into any 2D context (offscreen `ctx` or visible `ctxReal`).
function drawMyElement(ctx, x, y, w, h, options = {}) {
  if (!ctx) return;
  ctx.save();
  ctx.globalAlpha = (options.alpha !== undefined ? options.alpha : 1);
  ctx.fillStyle = options.fillStyle || '#ff00ff';
  ctx.fillRect(x, y, w, h);
  if (options.border) {
    ctx.lineWidth = options.border.width || 2;
    ctx.strokeStyle = options.border.color || '#000000';
    ctx.strokeRect(x, y, w, h);
  }
  if (options.text) {
    ctx.fillStyle = options.textColor || '#000000';
    ctx.textAlign = options.textAlign || 'center';
    ctx.textBaseline = options.textBaseline || 'middle';
    ctx.font = options.font || '14px Helvetica';
    ctx.fillText(options.text, x + w / 2, y + h / 2);
  }
  ctx.restore();
}

// Convenience helpers that use the project's globals if available.
function drawMyElementIntoOffscreen(x, y, w, h, options = {}) {
  if (typeof ctx !== 'undefined') drawMyElement(ctx, x, y, w, h, options);
}
function drawMyElementIntoVisible(x, y, w, h, options = {}) {
  if (typeof ctxReal !== 'undefined') drawMyElement(ctxReal, x, y, w, h, options);
}

// Small helper to create Image from base64/Data-URL, returns a Promise
function createImageFromSrc(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Export on window for easy usage from existing scripts without module support.
if (typeof window !== 'undefined') {
  window.canvasHelpers = window.canvasHelpers || {};
  window.canvasHelpers.drawMyElement = drawMyElement;
  window.canvasHelpers.drawMyElementIntoOffscreen = drawMyElementIntoOffscreen;
  window.canvasHelpers.drawMyElementIntoVisible = drawMyElementIntoVisible;
  window.canvasHelpers.createImageFromSrc = createImageFromSrc;
}
