/* Router utilitário (não SPA): scroll suave com offset do header */
(function () {
  function getHeaderHeight() {
    const header = document.querySelector("[data-header]");
    return header ? header.getBoundingClientRect().height : 0;
  }

  function smoothScrollToHash(hash) {
    const el = document.querySelector(hash);
    if (!el) return false;

    const top = el.getBoundingClientRect().top + window.scrollY - getHeaderHeight() - 12;
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  }

  function initAnchorOffset() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;

      const hash = a.getAttribute("href");
      if (!hash || hash.length < 2) return;

      const ok = smoothScrollToHash(hash);
      if (ok) e.preventDefault();
    });
  }

  window.ROUTER = { initAnchorOffset, smoothScrollToHash, getHeaderHeight };
})();
