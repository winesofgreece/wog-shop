(function () {
  'use strict';

  const KEY = 'wog_genuss5_popup_closed_until';
  const HIDE_DAYS = 7;
  const DELAY_MS = 2500;

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
    const el = document.getElementById('wog-genuss5-overlay');
    if (el) el.remove();
    remember();
  }

  function init() {
    if (!isHome() || hidden() || document.getElementById('wog-genuss5-overlay')) return;

    const style = document.createElement('style');
    style.textContent = `
      #wog-genuss5-overlay{position:fixed;inset:0;z-index:2147483000;background:rgba(15,15,15,.72);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box}
      #wog-genuss5-box{position:relative;width:min(92vw,560px);background:linear-gradient(145deg,#171717 0%,#24211d 100%);color:#fff;border:1px solid rgba(210,179,120,.55);border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.48);padding:38px 34px 30px;text-align:center;font-family:Arial,Helvetica,sans-serif}
      #wog-genuss5-box:before{content:'';display:block;width:72px;height:3px;margin:0 auto 22px;background:#c5a268;border-radius:2px}
      #wog-genuss5-close{position:absolute;top:10px;right:12px;width:36px;height:36px;border:0;background:transparent;color:#fff;font-size:28px;cursor:pointer}
      .wog-kicker{color:#d6b77d;text-transform:uppercase;letter-spacing:2px;font-size:12px;font-weight:700;margin-bottom:8px}
      .wog-title{margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.08;font-weight:700}
      .wog-value{font-size:46px;line-height:1;font-weight:800;margin:4px 0 8px;color:#d8bb83}
      .wog-lead{margin:0 auto 18px;max-width:440px;font-size:17px;line-height:1.55;color:#f1ede6}
      .wog-min{font-size:14px;color:#ddd4c7;margin-bottom:20px}
      .wog-codewrap{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin:0 0 20px}
      .wog-code{display:inline-block;padding:10px 16px;border:1px dashed #d8bb83;border-radius:8px;background:rgba(255,255,255,.05);letter-spacing:2px;font-size:21px;font-weight:800}
      .wog-copy{border:0;border-radius:7px;padding:10px 13px;background:#eee7dc;color:#1a1a1a;font-weight:700;cursor:pointer}
      .wog-cta{display:block;text-decoration:none!important;background:#c5a268;color:#16130f!important;font-weight:800;font-size:16px;padding:14px 18px;border-radius:8px;margin:0 auto 14px}
      .wog-note{margin:0;font-size:12px;line-height:1.45;color:#c9c1b7}
      .wog-skip{display:inline-block;margin-top:12px;color:#d6d0c8;font-size:12px;text-decoration:underline;cursor:pointer}
      @media(max-width:600px){#wog-genuss5-box{padding:30px 20px 24px}.wog-title{font-size:28px}.wog-value{font-size:40px}.wog-lead{font-size:16px}}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'wog-genuss5-overlay';
    overlay.innerHTML = `
      <div id="wog-genuss5-box" role="dialog" aria-modal="true" aria-labelledby="wog-title">
        <button id="wog-genuss5-close" type="button" aria-label="Fenster schlieÃen">&times;</button>
        <div class="wog-kicker">Wines of Greece Genussbrief</div>
        <h2 class="wog-title" id="wog-title">5 â¬ Genussvorteil sichern</h2>
        <div class="wog-value">5 â¬</div>
        <p class="wog-lead">Melden Sie sich jetzt zu unserem Genussbrief an und entdecken Sie griechische Weine, Spirituosen und besondere Angebote.</p>
        <div class="wog-min">5 â¬ Rabatt ab 59 â¬ Warenwert</div>
        <div class="wog-codewrap">
          <span class="wog-code">GENUSS5</span>
          <button class="wog-copy" id="wog-copy" type="button">Code kopieren</button>
        </div>
        <a class="wog-cta" href="/newsletter">Jetzt 5 â¬ sichern</a>
        <p class="wog-note">Gutschein einmal pro Kunde einlÃ¶sbar. Es gelten die Gutscheinbedingungen im Shop.</p>
        <span class="wog-skip" id="wog-skip">Nein danke, weiter zum Shop</span>
      </div>`;
    document.body.appendChild(overlay);

    document.getElementById('wog-genuss5-close').onclick = closePopup;
    document.getElementById('wog-skip').onclick = closePopup;
    document.getElementById('wog-copy').onclick = async function () {
      try { await navigator.clipboard.writeText('GENUSS5'); } catch (e) {}
      this.textContent = 'Kopiert â';
      setTimeout(() => this.textContent = 'Code kopieren', 1800);
    };
    overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, DELAY_MS));
  } else {
    setTimeout(init, DELAY_MS);
  }
})();
