// Library to display the maze and its movements
//
// Code example: <pre><code>
// window.onload = function () {
//   window.ktDraw(document.getElementById('canvas'), {
//     grid: 15,
//     gridLineWidth: 5,
//     stepDuration: 1000,
//     images: {
//       flankin: 'turtle.png',
//       emily: 'turtle.png',
//       tree1: 'tree.png'
//     }
//   }, {
//     flankin: { x: 1, y: 0, direction: '+x' }
//   })({
//     flankin: { x: 2, y: 0, direction: '+x' }
//   })({
//     emily: { x: 2, y: 1, direction: '+x' },
//     flankin: { x: 3, y: 1, direction: '+x' }
//   })({
//     emily: { x: 2, y: 1, direction: '+y' },
//     flankin: { x: 4, y: 1, direction: '+x' }
//   })({
//     emily: { x: 2, y: 2, direction: '+y' },
//     flankin: { x: 5, y: 1, direction: '+x' }
//   });
// };
// </code></pre>

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.ktDraw = factory();
  }
}(this, function () {
  // Polyfill for requestAnimationFrame
  var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (cb) { return setTimeout(cb, 1000/60); };

  function nextDir(direction) {
    switch (direction) {
      case '+x':
        return '-y';
      case '-x':
        return '+y';
      case '+y':
        return '+x';
      case '-y':
        return '-x';
      default:
        return '+x';
    }
  }
  function computeProgress(from, to, progress) {
    return from + (to - from) * progress;
  }

  /**
   * Configuration function.
   *
   * Example configuration: <pre><code>
   * {
   *   grid: 15,
   *   gridLineWidth: 5,
   *   stepDuration: 1000,
   *   images: {
   *     flankin: 'turtle.png',
   *     emily: 'turtle.png',
   *     tree1: 'tree.png'
   *   }
   * }
   * </code></pre>
   *
   * @param canvas the canvas element, example <code>$('#canvas')</code>.
   * @param config configuration to use.
   * @param initial the initial frame to display (see return function for format).
   * @return the animation function.
   */
  return function (canvas, config, initial) {
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var wstep = width / (config.grid + 1);
    var hstep = height / (config.grid + 1);
    var current = initial;
    var animations = {};
    var paused = true;//TODO get rid by counting animations keys

    // Launch images loading in parallel
    var images = {};
    var src = {};
    var fetchImage = function (file) {
      src[file] = new Image();
      src[file].onload = function () {
        if (paused) {
          animate();
        }
      };
      src[file].src = 'img/' + file;
    };
    var fetchImages = function (imgs) {
      for (var name in imgs) {
        if (imgs.hasOwnProperty(name)) {
          if (!src[imgs[name]]) {
            fetchImage(imgs[name]);
          }
          images[name] = src[imgs[name]];
        }
      }
    };
    fetchImages(config.images);

    // Drawing
    var clean = function () {
      ctx.clearRect(0, 0, width, height);
    };
    var drawGrid = function () {
      ctx.save();
      var wstart = Math.floor(wstep / 2);
      var hstart = Math.floor(hstep / 2);
      // Styling
      ctx.lineWidth = config.gridLineWidth;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'green';
      ctx.beginPath();
      for (var i = 1; i <= config.grid; i++) {
        // Horizontal
        ctx.moveTo(wstart, i * wstep);
        ctx.lineTo(width - wstart, i * wstep);
        // Vertical
        ctx.moveTo(i * hstep, hstart);
        ctx.lineTo(i * hstep, height - hstart);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };
    var drawImage = function (name, x, y, rotation) {
      ctx.save();
      ctx.translate((x + 1) * wstep, (config.grid - y) * hstep);
      ctx.rotate(rotation);
      ctx.drawImage(images[name], -wstep/2, -hstep/2, wstep, hstep);
      ctx.restore();
    };

    // Animate from frame to frame
    var animate = function () {
      var timestamp = Date.now();
      var name;
      var item;
      var animation;
      var animateMore = false;
      clean();
      drawGrid();
      for (name in animations) {
        if (animations.hasOwnProperty(name)) {
          animation = animations[name];
          if (animation.end < timestamp) {
            current[name] = animation.to;
            if (animation.cb) {
              setTimeout(animation.cb, 0);
            }
            delete animations[name];
          } else {
            animateMore = true;
            var progress = 1 - ((animation.end - timestamp) / config.stepDuration);
            var currentx = computeProgress(animation.from.x, animation.to.x, progress);
            var currenty = computeProgress(animation.from.y, animation.to.y, progress);
            drawImage(name, currentx, currenty, 0);//Can handle rotation too
          }
        }
      }
      for (name in current) {
        if (current.hasOwnProperty(name)) {
          item = current[name];
          drawImage(name, item.x, item.y, 0);//Can handle rotation too
        }
      }
      if (!animateMore) {
        paused = true;
      } else {
        requestAnimationFrame(animate);
      }
    };

    // Draw initial frame
    animate();

    var animateLater = function (name, to, callback) {
      var oldcb = animations[name].cb;
      var frame = {};
      frame[name] = to;
      animations[name].cb = function () {
        if (oldcb) {
          oldcb();
        }
        oneMoreStep(frame, callback);
      };
    };
    /**
     * Animation function.
     *
     * Example frame: <pre><code>
     * {
     *   flankin: { x: 1, y: 0, direction: '+x' },
     *   emily: { x: 3, y: 4, direction: '-y' }
     * }
     * </code></pre>
     *
     * Notes: positions are 0-indexed and y is the opposite of the US convention: 0 is bottom and grid size is top.
     *
     * @param frame the frame to draw (only differences from the previous frame are to be included).
     * @param cb callback called once animation is over.
     */
    var oneMoreStep = function (frame, callback) {
      var caller = null;
      for (var name in frame) {
        if (frame.hasOwnProperty(name)) {
          if (current.hasOwnProperty(name)) {
            // Currently present but not animated
            animations[name] = {
              from: current[name],
              to: frame[name],
              end: Date.now() + config.stepDuration
            };
            caller = animations[name];
            delete current[name];
          } else if (animations.hasOwnProperty(name)) {
            // Currently animated: add the step once this one is finished
            animateLater(name, frame[name], callback);
            callback = null;
            caller = {};
          } else {
            current[name] = frame[name];
          }
        }
      }
      animate();
      if (caller) {
        caller.cb = callback;
        paused = false;
      } else if (callback) {
        setTimeout(callback, 0);
      }
      return oneMoreStep;
    };
    /**
     * Winning animation
     *
     * @param x x position to start the animation at.
     * @param y y position to start the animation at.
     */
    oneMoreStep.win = function (x, y, callback) {
      var dist;
      var speed = 3;
      fetchImages({
        'winningHeart1': 'heart.png',
        'winningHeart2': 'heart.png',
        'winningHeart3': 'heart.png',
        'winningHeart4': 'heart.png'
      });
      var dirs = ['+x', '-x', '+y', '-y'];
      var max = Math.ceil((Math.max(Math.max(config.grid - x, x), Math.max(config.grid - y, y)) / speed) + 2);
      var i = 0;
      var iteration = function () {
        if (i < max) {
          dist = i * speed;
          oneMoreStep({
            winningHeart1: { x: x + dist, y: y       , direction: dirs[0] },
            winningHeart2: { x: x - dist, y: y       , direction: dirs[1] },
            winningHeart3: { x: x       , y: y + dist, direction: dirs[2] },
            winningHeart4: { x: x       , y: y - dist, direction: dirs[3] }
          }, iteration);
          for (var j = 0; j < dirs.length; j++) {
            dirs[j] = nextDir(dirs[j]);
          }
        }
        if (i == max) {
          if (callback) {
            setTimeout(callback, 0);
          }
        }
        i++;
      };
      oneMoreStep({}, iteration);
    };

    return oneMoreStep;
  };
}));
