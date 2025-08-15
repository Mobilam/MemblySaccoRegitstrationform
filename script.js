// Signature Pad logic for all signature fields
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.signature-pad').forEach(function(canvas) {
    let drawing = false;
    let ctx = canvas.getContext('2d');
    let last = {x:0, y:0};

    function getPos(e) {
      let rect = canvas.getBoundingClientRect();
      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: e.offsetX,
          y: e.offsetY
        };
      }
    }

    function start(e) {
      drawing = true;
      last = getPos(e);
    }
    function move(e) {
      if (!drawing) return;
      let pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      last = pos;
    }
    function end() {
      drawing = false;
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', move);
    canvas.addEventListener('touchend', end);

    // Clear button
    let clearBtn = canvas.parentElement.querySelector('.clear-signature');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
  });
});
