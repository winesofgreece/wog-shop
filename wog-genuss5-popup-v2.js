(function () {
  'use strict';

  const KEY = 'wog_genuss5_popup_closed_until_v2';
  const HIDE_DAYS = 7;
  const DELAY_MS = 2200;

  function isHome() {
    const p = window.location.pathname.replace(/\/+$/, '');
    return p === '' || p === '/';
  }

  function hidden() {
    try {
      return Date.now() < parseInt(localStorage.getItem(KEY) || '0', 10);
    } catch (e) {
      return false;
    }
  }

  function remember() {
    try {
      localStorage.setItem(KEY, String(Date.now() + HIDE_DAYS * 86400000));
    } catch (e) {}
  }

  function closePopup() {
    const el = document.getElementById('wog-popup-overlay');
    if (el) el.remove();
    remember();
  }

  function init() {
    if (!isHome() || hidden() || document.getElementById('wog-popup-overlay')) return;

    const style = document.createElement('style');
    style.textContent = `
      #wog-popup-overlay{
        position:fixed;inset:0;z-index:2147483000;
        background:rgba(12,12,12,.72);
        display:flex;align-items:center;justify-content:center;
        padding:20px;box-sizing:border-box;
        backdrop-filter:blur(3px);
      }
      #wog-popup{
        position:relative;
        width:min(92vw,520px);
        box-sizing:border-box;
        padding:34px 34px 30px;
        border-radius:18px;
        border:1px solid rgba(202,168,105,.62);
        background:
          radial-gradient(circle at 50% 0%,rgba(199,163,96,.15),transparent 36%),
          linear-gradient(160deg,#171717 0%,#24211d 100%);
        color:#fff;
        box-shadow:0 28px 80px rgba(0,0,0,.48);
        text-align:center;
        font-family:Arial,Helvetica,sans-serif;
      }
      #wog-popup:before{
        content:'';
        display:block;
        width:64px;height:2px;
        margin:0 auto 20px;
        background:#c9a96b;
      }
      #wog-popup-close{
        position:absolute;top:12px;right:14px;
        width:34px;height:34px;
        border:0;background:transparent;color:#eee;
        font-size:27px;line-height:34px;cursor:pointer;opacity:.78;
      }
      #wog-popup-close:hover{opacity:1}
      .wog-eyebrow{
        margin-bottom:9px;
        color:#cdb078;
        font-size:11px;
        font-weight:700;
        letter-spacing:2.4px;
        text-transform:uppercase;
      }
      .wog-headline{
        margin:0;
        font-family:Georgia,'Times New Roman',serif;
        font-size:34px;
        line-height:1.12;
        font-weight:600;
        color:#fff;
      }
      .wog-subline{
        margin:12px auto 20px;
        max-width:420px;
        color:#ddd6cd;
        font-size:15px;
        line-height:1.5;
      }
      .wog-offer{
        margin:0 auto 8px;
        color:#d7b876;
        font-family:Georgia,'Times New Roman',serif;
        font-size:46px;
        line-height:1;
        font-weight:700;
      }
      .wog-condition{
        margin-bottom:19px;
        color:#f2eee8;
        font-size:14px;
      }
      .wog-codebox{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        flex-wrap:wrap;
        margin-bottom:18px;
      }
      .wog-code{
        min-width:160px;
        padding:11px 16px;
        border:1px dashed #cdb078;
        border-radius:9px;
        background:rgba(255,255,255,.035);
        color:#fff;
        font-size:20px;
        font-weight:800;
        letter-spacing:2px;
      }
      .wog-copy{
        border:1px solid #e3ded6;
        border-radius:9px;
        padding:11px 14px;
        background:#f0ece6;
        color:#1d1b18;
        font-weight:700;
        cursor:pointer;
      }
      .wog-cta{
        display:block;
        width:100%;
        box-sizing:border-box;
        margin:0 auto 12px;
        padding:14px 18px;
        border-radius:9px;
        background:linear-gradient(180deg,#d2b16d,#bc9550);
        color:#18130d!important;
        text-decoration:none!important;
        font-size:16px;
        font-weight:800;
        letter-spacing:.2px;
      }
      .wog-note{
        margin:0;
        color:#bfb7ad;
        font-size:11.5px;
        line-height:1.45;
      }
      .wog-skip{
        display:inline-block;
        margin-top:11px;
        color:#d8d2cb;
        font-size:12px;
        text-decoration:underline;
        cursor:pointer;
      }
      @media(max-width:600px){
        #wog-popup{padding:30px 20px 24px;border-radius:14px}
        .wog-headline{font-size:29px}
        .wog-offer{font-size:42px}
        .wog-subline{font-size:14px}
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'wog-popup-overlay';
    overlay.innerHTML = `
      <div id="wog-popup" role="dialog" aria-modal="true" aria-labelledby="wog-headline">
        <button id="wog-popup-close" type="button" aria-label="Fenster schlie&szlig;en">&times;</button>

        <div class="wog-eyebrow">Wines of Greece Genussbrief</div>

        <h2 class="wog-headline" id="wog-headline">
          Willkommen bei Wines of Greece
        </h2>

        <p class="wog-subline">
          Entdecken Sie Griechenlands Genusswelt und sichern Sie sich jetzt Ihren pers&ouml;nlichen Willkommensvorteil.
        </p>

        <div class="wog-offer">5 &euro; Rabatt</div>
        <div class="wog-condition">ab 59 &euro; Warenwert</div>

        <div class="wog-codebox">
          <span class="wog-code">GENUSS5</span>
          <button class="wog-copy" id="wog-copy" type="button">Code kopieren</button>
        </div>

        <a class="wog-cta" href="/newsletter">
          Jetzt Genussbrief abonnieren
        </a>

        <p class="wog-note">
          Gutschein einmal pro Kunde einl&ouml;sbar. Es gelten die Gutscheinbedingungen im Shop.
        </p>

        <span class="wog-skip" id="wog-skip">Weiter zum Shop</span>
      </div>`;

    document.body.appendChild(overlay);

    document.getElementById('wog-popup-close').onclick = closePopup;
    document.getElementById('wog-skip').onclick = closePopup;

    document.getElementById('wog-copy').onclick = function () {
      const btn = this;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('GENUSS5').catch(function(){});
      }
      btn.textContent = 'Kopiert';
      setTimeout(function(){ btn.textContent = 'Code kopieren'; }, 1500);
    };

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closePopup();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, DELAY_MS);
    });
  } else {
    setTimeout(init, DELAY_MS);
  }
})();
