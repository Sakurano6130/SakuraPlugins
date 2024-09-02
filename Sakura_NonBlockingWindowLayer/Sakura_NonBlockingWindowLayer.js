// Sakura_NonBlockingWindowLayer
// Copyright (c) 2024 Sakurano
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2024/09/02 1.0.0 公開
 */

/*:ja
 * @target MZ
 * @plugindesc Window重なった時後ろを隠さない
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 *
 * @help
 * ウィンドウが重なった時後ろを隠れないようにします。
 *
 * プラグインコマンドはありません。
 */

/**
 * ウィンドウレイヤーを描画する関数。（オーバーライド）
 * この関数は、ウィンドウが他のウィンドウや要素を隠さないようにするために、
 * ステンシルバッファを使用してウィンドウを管理します。
 *
 * @param {PIXI.Renderer} renderer - PIXIレンダラーオブジェクト
 */
WindowLayer.prototype.render = function render(renderer) {
  // ウィンドウレイヤーが非表示の場合は何も描画しない
  if (!this.visible) {
    return;
  }

  // PIXI.GraphicsオブジェクトとWebGLコンテキストの取得
  const graphics = new PIXI.Graphics();
  const gl = renderer.gl;
  const children = this.children.clone(); // 子要素のクローンを作成

  // ステンシルバッファの強制使用とトランスフォームの設定
  renderer.framebuffer.forceStencil();
  graphics.transform = this.transform;
  renderer.batch.flush();
  gl.enable(gl.STENCIL_TEST); // ステンシルテストを有効化

  // ウィンドウ要素を描画し、ステンシルバッファで管理
  while (children.length > 0) {
    const win = children.shift();
    if (win._isWindow && win.visible && win.openness > 0) {
      gl.stencilFunc(gl.EQUAL, 0, ~0);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
      win.render(renderer);
      renderer.batch.flush();
    }
  }

  // ステンシルテストの無効化とバッファのクリア
  gl.disable(gl.STENCIL_TEST);
  gl.clear(gl.STENCIL_BUFFER_BIT);
  gl.clearStencil(0);
  renderer.batch.flush();

  // ウィンドウ以外の子要素を描画
  for (const child of this.children) {
    if (!child._isWindow && child.visible) {
      child.render(renderer);
    }
  }

  renderer.batch.flush(); // 最後の描画バッチをフラッシュ
};
