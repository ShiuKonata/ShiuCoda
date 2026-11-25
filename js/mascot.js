/* ── 蔻達吉祥物浮動元件 ── */
(function () {
  'use strict';

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5episszh6cvxAs2Cl3pnkhyQqnutjMisDDZ92mZFjOJVfcylD4JAbugtU-5cCzpo6/exec';

  const FORTUNES = [
    { num:'一',   level:'大大吉',         cls:'fl-top',     text:'大大吉！！這是最頂的！……等等，你是不是作弊了？這種運氣也太離譜了吧，是不是把阿統的陽壽拿走了!!咳咳咳咳咳🐸' },
    { num:'二',   level:'大吉',           cls:'fl-top',     text:'哇你運氣真好！……算了應該只是碰巧啦。阿統真的覺得只是碰巧🐸' },
    { num:'三',   level:'向大吉',         cls:'fl-top',     text:'向大吉——正在往大吉的路上！有進步嘛，繼續努力！……但還沒到大吉就別得意，阿統會盯著你🐸' },
    { num:'四',   level:'末大吉',         cls:'fl-top',     text:'末大吉！差一點點就是大吉了……像你平常做事一樣，總是差那麼一步。呱呱好好加油！🐸' },
    { num:'五',   level:'吉凶未分末大吉', cls:'fl-good',    text:'吉凶未分末大吉……這名字念起來阿統自己都嫌麻煩。總之就是有點好、有點不確定，注意一下就好🐸' },
    { num:'六',   level:'吉',             cls:'fl-good',    text:'平平穩穩的……聽起來很無聊？穩定就是一種幸福啦，呱民要懂得珍惜🐸' },
    { num:'七',   level:'中吉',           cls:'fl-good',    text:'還不錯嘛，有進步！雖然跟大統領比還差很遠就是了……繼續加油🐸' },
    { num:'八',   level:'小吉',           cls:'fl-good',    text:'還行還行，不上不下的，跟你平常的表現一樣🐸' },
    { num:'九',   level:'後吉',           cls:'fl-good',    text:'後吉！現在可能沒感覺，但後來會越來越好的。阿統說：要有耐心！……雖然我自己沒什麼耐心就是了🐸' },
    { num:'十',   level:'末吉',           cls:'fl-good',    text:'末吉……就是剛剛好及格的吉運。就像考了60分——有過就好啦，別太挑剔！🐸' },
    { num:'十一', level:'吉凶不分末吉',   cls:'fl-mixed',   text:'吉凶不分末吉……說真的阿統自己也搞不清楚這是好是壞。總之小心一點，但也別太緊張？嘿嘿🐸' },
    { num:'十二', level:'吉凶相交末吉',   cls:'fl-mixed',   text:'吉凶相交末吉——好壞事會交替出現的意思。有好有壞才叫人生嘛！阿統覺得這樣挺刺激的……對你來說🐸' },
    { num:'十三', level:'吉凶相半',       cls:'fl-mixed',   text:'吉凶相半！好的一半、壞的一半——所以看你自己怎麼選嘍？阿統說要選就是選好的那一半，嘿嘿🐸' },
    { num:'十四', level:'吉凶相央',       cls:'fl-mixed',   text:'吉凶相央……正正好好在中間，這個籤最難解釋了。阿統也只能說：看情況吧，呱民自己多注意🐸' },
    { num:'十五', level:'小凶後吉',       cls:'fl-reverse', text:'小凶後吉！先有一點點不順，但之後會好的——就像阿統有時候嘴硬，其實心裡是在為你好啦……才怪(吐)🐸' },
    { num:'十六', level:'凶後吉',         cls:'fl-reverse', text:'凶後吉！先壞後好——這種劇情最爽了！低谷之後就是高峰，呱民要撐住！阿統說你可以的🐸' },
    { num:'十七', level:'凶後大吉',       cls:'fl-reverse', text:'凶後大吉！！最戲劇性的逆轉——先跌到谷底，再飛上天！阿統最喜歡這種主角光環劇情了，你就是故事的主角🐸' },
    { num:'十八', level:'凶',             cls:'fl-low',     text:'哎呀抽到凶了……嘿嘿，別怕！阿統跟ㄋ說：跌倒了就爬起來，沒什麼大不了🐸' },
    { num:'十九', level:'大凶',           cls:'fl-low',     text:'大凶！……嘿嘿，恭喜你成功抽到最難抽的，你的手氣真是…獨特。阿統保佑你快買個開運道袍吧🐸' },
  ];

  const DRINK_MSGS = [
    '去喝水！蔻達說的 💧',
    '記得補水哦，乾燥的身體會影響心情的 💧',
    '現在就去喝一杯水！蔻達在看著你 💧',
    '你上次喝水是幾小時前了？💧',
    '喝水喝水！健康第一 💧',
    '愛喝水才能繼續應援蔻達喔 💧',
  ];

  /* ── 注入 CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    /* 籤等級色彩 */
    .fl-top     { color:#c8820a; background:rgba(200,130,10,.12); border-color:rgba(200,130,10,.3); }
    .fl-good    { color:#2a9d8f; background:rgba(42,157,143,.12); border-color:rgba(42,157,143,.3); }
    .fl-mixed   { color:#5a7fc0; background:rgba(90,127,192,.12); border-color:rgba(90,127,192,.3); }
    .fl-reverse { color:#9b59b6; background:rgba(155,89,182,.12); border-color:rgba(155,89,182,.3); }
    .fl-low     { color:#c0392b; background:rgba(192,57,43,.12);  border-color:rgba(192,57,43,.3); }

    #coda-mascot {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      user-select: none;
    }

    #coda-mascot-menu {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: flex-end;
      animation: coda-menu-in .2s ease;
    }

    #coda-mascot-menu.hidden { display: none; }

    @keyframes coda-menu-in {
      from { opacity:0; transform:translateY(10px); }
      to   { opacity:1; transform:translateY(0); }
    }

    .coda-menu-btn {
      background: rgba(230,244,240,.96);
      border: 1px solid rgba(42,157,143,.35);
      border-radius: 2rem;
      padding: .45rem 1rem;
      font-family: 'Noto Sans TC', sans-serif;
      font-size: .82rem;
      color: #1a3028;
      cursor: pointer;
      white-space: nowrap;
      backdrop-filter: blur(8px);
      transition: background .15s, transform .1s;
      box-shadow: 0 2px 10px rgba(0,0,0,.1);
    }

    .coda-menu-btn:hover {
      background: rgba(42,157,143,.15);
      transform: scale(1.04);
    }

    #coda-mascot-gif {
      position: relative;
      width: 90px;
      cursor: pointer;
      transition: transform .15s;
    }

    #coda-mascot-gif:hover { transform: scale(1.06); }
    #coda-mascot-gif:active { transform: scale(.96); }
    #coda-mascot-gif.shaking { animation: coda-shake .5s ease; }

    @keyframes coda-shake {
      0%,100%{ transform:translateX(0) rotate(0); }
      20%    { transform:translateX(-6px) rotate(-4deg); }
      40%    { transform:translateX(6px) rotate(4deg); }
      60%    { transform:translateX(-4px) rotate(-2deg); }
      80%    { transform:translateX(4px) rotate(2deg); }
    }

    #coda-mascot-gif img {
      width: 100%;
      display: block;
      pointer-events: none;
      -webkit-user-drag: none;
    }

    .coda-cover {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: transparent;
    }

    /* ── 抽籤 overlay ── */
    #coda-fortune-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.45);
      z-index: 9100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: coda-fade-in .2s ease;
    }

    #coda-fortune-overlay.hidden { display: none; }

    @keyframes coda-fade-in {
      from { opacity:0; } to { opacity:1; }
    }

    #coda-fortune-box {
      background: #e6f4f0;
      border: 1px solid rgba(42,157,143,.2);
      border-radius: 1rem;
      padding: 1.8rem;
      width: 100%;
      max-width: 420px;
      text-align: center;
      position: relative;
      animation: coda-box-in .25s ease;
      font-family: 'Noto Sans TC', sans-serif;
    }

    @keyframes coda-box-in {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }

    #coda-close-fortune {
      position: absolute;
      top: .8rem; right: .8rem;
      background: none;
      border: none;
      font-size: 1.1rem;
      color: #4a7a6e;
      cursor: pointer;
      line-height: 1;
    }

    #coda-draw-hint {
      font-size: .82rem;
      color: #4a7a6e;
      margin-bottom: .8rem;
      letter-spacing: .05em;
    }

    #coda-draw-btn {
      background: #2a9d8f;
      color: #fff;
      border: none;
      border-radius: 2rem;
      padding: .6rem 1.6rem;
      font-family: inherit;
      font-size: .9rem;
      cursor: pointer;
      transition: background .2s;
    }

    #coda-draw-btn:hover { background: #1f7a6e; }
    #coda-draw-btn:disabled { opacity: .5; cursor: default; background: #2a9d8f; }

    #coda-result-area { display: none; }
    #coda-result-area.show { display: block; animation: coda-box-in .3s ease; }

    #coda-result-num {
      font-size: .78rem;
      color: #4a7a6e;
      letter-spacing: .15em;
      margin-bottom: .4rem;
    }

    #coda-result-level {
      display: inline-block;
      font-size: 1.5rem;
      font-weight: 700;
      padding: .25rem 1.1rem;
      border-radius: 2rem;
      border: 1px solid;
      margin-bottom: .9rem;
    }

    #coda-result-text {
      font-size: .85rem;
      line-height: 1.8;
      color: #1a3028;
      background: #d4ece4;
      border-radius: .6rem;
      padding: .9rem 1rem;
      text-align: left;
      margin-bottom: 1rem;
    }

    #coda-result-actions { display: flex; gap: .5rem; justify-content: center; flex-wrap: wrap; margin-bottom: .6rem; }

    .coda-action-btn {
      border: none;
      border-radius: 2rem;
      padding: .45rem 1rem;
      font-family: inherit;
      font-size: .82rem;
      cursor: pointer;
      transition: opacity .15s;
    }

    .coda-action-btn:hover { opacity: .8; }
    .coda-btn-named { background: #2a9d8f; color: #fff; }
    .coda-btn-anon  { background: #c0e2d8; color: #1a3028; border: 1px solid rgba(42,157,143,.2); }
    .coda-btn-skip  { background: none; color: #4a7a6e; border: 1px solid rgba(42,157,143,.2); }

    #coda-draw-again {
      font-size: .75rem;
      color: #4a7a6e;
      cursor: pointer;
      text-decoration: underline;
      background: none;
      border: none;
      font-family: inherit;
    }

    /* ── 綁籤 modal ── */
    #coda-slip-modal {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.5);
      z-index: 9200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    #coda-slip-modal.hidden { display: none; }

    #coda-slip-box {
      background: #e6f4f0;
      border: 1px solid rgba(42,157,143,.2);
      border-radius: 1rem;
      padding: 1.6rem 1.4rem;
      width: 100%;
      max-width: 310px;
      font-family: 'Noto Sans TC', sans-serif;
      animation: coda-box-in .25s ease;
      display: flex;
      flex-direction: column;
      gap: .85rem;
      text-align: center;
    }

    #coda-slip-title {
      font-size: .88rem;
      font-weight: 500;
      color: #2a9d8f;
      letter-spacing: .15em;
    }

    #coda-slip-msg {
      font-size: .84rem;
      color: #1a3028;
      line-height: 1.65;
    }

    #coda-slip-btns { display: flex; gap: .6rem; justify-content: center; }

    .coda-form-input {
      width: 100%;
      background: #d4ece4;
      border: 1px solid rgba(42,157,143,.2);
      border-radius: .5rem;
      padding: .55rem .75rem;
      color: #1a3028;
      font-family: inherit;
      font-size: .85rem;
      outline: none;
      transition: border-color .2s;
      box-sizing: border-box;
    }

    .coda-form-input:focus { border-color: #2a9d8f; }

    /* ── 喝水 popup ── */
    #coda-drink-popup {
      position: fixed;
      bottom: 130px;
      right: 24px;
      z-index: 9100;
      background: rgba(230,244,240,.97);
      border: 1px solid rgba(42,157,143,.35);
      border-radius: 1rem;
      padding: 1rem 1.2rem;
      max-width: 220px;
      text-align: center;
      font-family: 'Noto Sans TC', sans-serif;
      box-shadow: 0 4px 20px rgba(0,0,0,.12);
      animation: coda-box-in .25s ease;
    }

    #coda-drink-popup.hidden { display: none; }

    #coda-drink-msg {
      font-size: .88rem;
      color: #1a3028;
      line-height: 1.6;
      margin-bottom: .8rem;
    }

    #coda-drink-ok {
      background: #2a9d8f;
      color: #fff;
      border: none;
      border-radius: 2rem;
      padding: .4rem 1.2rem;
      font-family: inherit;
      font-size: .82rem;
      cursor: pointer;
      transition: background .2s;
    }

    #coda-drink-ok:hover { background: #1f7a6e; }
  `;
  document.head.appendChild(style);

  /* ── 注入 HTML ── */
  const html = `
    <div id="coda-mascot">
      <div id="coda-mascot-menu" class="hidden">
        <button class="coda-menu-btn" id="coda-btn-draw">🎋 抽籤</button>
        <button class="coda-menu-btn" id="coda-btn-drink">💧 喝水</button>
      </div>
      <div id="coda-mascot-gif">
        <img src="images/mascot/coda_fortune.gif" draggable="false" oncontextmenu="return false" alt="蔻達">
        <div class="coda-cover" oncontextmenu="return false"></div>
      </div>
    </div>

    <div id="coda-fortune-overlay" class="hidden">
      <div id="coda-fortune-box">
        <button id="coda-close-fortune" title="關閉">✕</button>
        <div id="coda-draw-hint">點下方來抽一支籤吧！</div>
        <button id="coda-draw-btn">🎋 搖籤</button>
        <div id="coda-result-area">
          <div id="coda-result-num"></div>
          <div id="coda-result-level"></div>
          <div id="coda-result-text"></div>
          <div id="coda-result-actions">
            <button class="coda-action-btn coda-btn-named" id="coda-btn-bind">🎋 綁到籤牆</button>
            <button class="coda-action-btn coda-btn-skip"  id="coda-btn-skip">算了</button>
          </div>
          <button id="coda-draw-again">再抽一次</button>
        </div>
      </div>
    </div>

    <div id="coda-slip-modal" class="hidden">
      <div id="coda-slip-box">
        <div id="coda-slip-title">✦ 綁籤 ✦</div>
        <div id="coda-slip-msg"></div>
        <input class="coda-form-input" id="coda-slip-name" type="text" placeholder="呱民小花" maxlength="20">
        <div id="coda-slip-btns"></div>
      </div>
    </div>

    <div id="coda-drink-popup" class="hidden">
      <div id="coda-drink-msg"></div>
      <button id="coda-drink-ok">好的！</button>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  /* ── 狀態 ── */
  let menuOpen = false;
  let currentFortune = null;
  let drawing = false;

  /* ── 元素取用 ── */
  const gif       = document.getElementById('coda-mascot-gif');
  const menu      = document.getElementById('coda-mascot-menu');
  const overlay   = document.getElementById('coda-fortune-overlay');
  const slipModal = document.getElementById('coda-slip-modal');
  const drinkPopup = document.getElementById('coda-drink-popup');

  /* ── 選單開關 ── */
  gif.addEventListener('click', function () {
    menuOpen = !menuOpen;
    menu.classList.toggle('hidden', !menuOpen);
  });

  document.addEventListener('click', function (e) {
    if (!document.getElementById('coda-mascot').contains(e.target)) {
      menuOpen = false;
      menu.classList.add('hidden');
    }
  });

  /* ── 抽籤 ── */
  document.getElementById('coda-btn-draw').addEventListener('click', function () {
    menu.classList.add('hidden');
    menuOpen = false;
    overlay.classList.remove('hidden');
    resetFortune();
  });

  document.getElementById('coda-close-fortune').addEventListener('click', function () {
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) overlay.classList.add('hidden');
  });

  document.getElementById('coda-draw-btn').addEventListener('click', function () {
    if (drawing) return;
    drawing = true;

    if (window.codaMusic) window.codaMusic.duck();
    gif.classList.add('shaking');
    document.getElementById('coda-draw-hint').textContent = '搖籤中…';

    var fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    var sfxDone = false, minDone = false;

    /* 音效結束 + 最短動畫時間都到才顯示結果 */
    function tryShow() {
      if (!sfxDone || !minDone) return;
      gif.classList.remove('shaking');
      currentFortune = fortune;
      showFortune(fortune);
      drawing = false;
      if (window.codaMusic) window.codaMusic.unduck();
    }

    setTimeout(function () { minDone = true; tryShow(); }, 700);

    var sfx = new Audio('audio/sfx-draw.mp3');
    sfx.volume = 0.85;
    sfx.addEventListener('ended', function () { sfxDone = true; tryShow(); }, { once: true });
    sfx.play().catch(function () { sfxDone = true; tryShow(); });
  });

  function showFortune(f) {
    document.getElementById('coda-result-num').textContent = '第 ' + f.num + ' 籤';
    var lv = document.getElementById('coda-result-level');
    lv.textContent = f.level;
    lv.className = 'result-level ' + f.cls;
    document.getElementById('coda-result-text').textContent = f.text;
    document.getElementById('coda-draw-btn').style.display = 'none';
    document.getElementById('coda-draw-hint').style.display = 'none';
    document.getElementById('coda-result-area').classList.add('show');
  }

  function resetFortune() {
    currentFortune = null;
    var btn = document.getElementById('coda-draw-btn');
    btn.style.display = '';
    btn.disabled = false;
    var hint = document.getElementById('coda-draw-hint');
    hint.style.display = '';
    hint.textContent = '點下方來抽一支籤吧！';
    document.getElementById('coda-result-area').classList.remove('show');
    drawing = false;
  }

  document.getElementById('coda-draw-again').addEventListener('click', resetFortune);

  document.getElementById('coda-btn-skip').addEventListener('click', function () {
    overlay.classList.add('hidden');
  });

  document.getElementById('coda-btn-bind').addEventListener('click', function () {
    openSlipStep1();
  });

  /* ── 綁籤 dialog（二步驟，同追思會）── */
  function openSlipStep1() {
    var f = currentFortune;
    document.getElementById('coda-slip-title').textContent = '✦ 綁籤 ✦';
    document.getElementById('coda-slip-msg').textContent = '要將這支「' + f.level + '」籤綁到籤牆嗎？';
    document.getElementById('coda-slip-name').style.display = 'none';
    document.getElementById('coda-slip-name').value = '';

    var btns = document.getElementById('coda-slip-btns');
    btns.innerHTML = '';
    var yes = document.createElement('button');
    yes.className = 'coda-action-btn coda-btn-named';
    yes.textContent = '✦ 綁上去！';
    var no = document.createElement('button');
    no.className = 'coda-action-btn coda-btn-skip';
    no.textContent = '算了';
    yes.onclick = openSlipStep2;
    no.onclick = closeSlipModal;
    btns.appendChild(yes);
    btns.appendChild(no);

    slipModal.classList.remove('hidden');
    overlay.classList.add('hidden');
  }

  function openSlipStep2() {
    document.getElementById('coda-slip-msg').textContent = '要在籤上留下名字嗎？（選填）';
    var nameEl = document.getElementById('coda-slip-name');
    nameEl.style.display = 'block';
    nameEl.focus();

    var btns = document.getElementById('coda-slip-btns');
    btns.innerHTML = '';
    var confirm = document.createElement('button');
    confirm.className = 'coda-action-btn coda-btn-named';
    confirm.textContent = '確認';
    var anon = document.createElement('button');
    anon.className = 'coda-action-btn coda-btn-skip';
    anon.textContent = '匿名';
    confirm.onclick = function () {
      submitSlip(document.getElementById('coda-slip-name').value.trim() || '匿名呱民');
    };
    anon.onclick = function () { submitSlip('匿名呱民'); };
    btns.appendChild(confirm);
    btns.appendChild(anon);
  }

  async function submitSlip(name) {
    closeSlipModal();
    var f = currentFortune;
    try {
      var params = new URLSearchParams({
        action: 'addFortune',
        num: f.num, level: f.level, cls: f.cls, text: f.text,
        name: name, message: ''
      });
      await fetch(SCRIPT_URL + '?' + params.toString(), { mode: 'no-cors' });
      if (typeof window.loadWall === 'function') setTimeout(window.loadWall, 1500);
    } catch (e) {}
  }

  function closeSlipModal() {
    slipModal.classList.add('hidden');
  }

  slipModal.addEventListener('click', function (e) {
    if (e.target === slipModal) closeSlipModal();
  });

  /* ── 喝水 ── */
  document.getElementById('coda-btn-drink').addEventListener('click', function () {
    menu.classList.add('hidden');
    menuOpen = false;
    var msgs = DRINK_MSGS;
    document.getElementById('coda-drink-msg').textContent = msgs[Math.floor(Math.random() * msgs.length)];
    drinkPopup.classList.remove('hidden');
  });

  document.getElementById('coda-drink-ok').addEventListener('click', function () {
    drinkPopup.classList.add('hidden');
  });

  /* 防右鍵 GIF */
  document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('#coda-mascot-gif')) e.preventDefault();
  });

})();
