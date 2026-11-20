/* ── 背景音樂播放器 ── */
(function () {
  const src = document.body.dataset.audio;
  if (!src) return;

  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.35;

  let started = false;
  let muted = false;

  /* ── 注入按鈕 CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    #music-btn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9000;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(230,244,240,.92);
      border: 1px solid rgba(42,157,143,.35);
      backdrop-filter: blur(8px);
      box-shadow: 0 2px 10px rgba(0,0,0,.12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.1rem;
      transition: transform .15s, background .15s;
      user-select: none;
    }
    #music-btn:hover { transform: scale(1.1); background: rgba(42,157,143,.15); }
    #music-btn.paused { opacity: .6; }
  `;
  document.head.appendChild(style);

  /* ── 注入按鈕 ── */
  const btn = document.createElement('div');
  btn.id = 'music-btn';
  btn.title = '背景音樂';
  btn.textContent = '🔇';
  document.body.appendChild(btn);

  /* ── 首次點擊任何地方開始播放 ── */
  function startOnce() {
    if (started) return;
    started = true;
    audio.play().then(() => {
      btn.textContent = '🔊';
      btn.classList.remove('paused');
    }).catch(() => {});
    document.removeEventListener('click', startOnce);
  }

  document.addEventListener('click', startOnce);

  /* ── 按鈕切換靜音 ── */
  btn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (!started) {
      startOnce();
      return;
    }

    muted = !muted;
    audio.muted = muted;
    btn.textContent = muted ? '🔇' : '🔊';
    btn.classList.toggle('paused', muted);
  });
})();
