(function () {
  const { COMPONENTS } = window;

  function $(sel, root = document) { return root.querySelector(sel); }
  function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  function getBase() {
    const base = document.body?.getAttribute("data-base");
    if (base) return base;
    return document.location.pathname.includes("/pages/") ? "../" : "./";
  }

  function resolvePath(path) {
    const base = getBase();
    if (!path) return path;
    if (/^(https?:|mailto:|tel:|#)/i.test(path)) return path;
    const clean = String(path).replace(/^\.?\/+/, "");
    return base + clean;
  }

  function normalizePhone(phone) {
    return String(phone || "").replace(/[^\d]/g, "");
  }

  function getProfessionalsFallback() {
    return document.location.pathname.includes("/pages/")
      ? "./professionals.html"
      : "./pages/professionals.html";
  }

  function makeWhatsAppUrl(phoneRaw, message) {
    const phone = normalizePhone(phoneRaw);
    const text = encodeURIComponent(message || "");
    return `https://wa.me/${phone}?text=${text}`;
  }

  function messageFor({ serviceName, proName }) {
    if (proName && serviceName) {
      return `Oi! Quero agendar com ${proName} para ${serviceName}. Referências: [link/fotos].`;
    }
    if (proName) return `Oi! Quero agendar com ${proName}. Referências: [link/fotos].`;
    if (serviceName) return `Oi! Quero agendar para ${serviceName}. Referências: [link/fotos].`;
    return "Oi! Quero agendar um horário. Referências: [link/fotos].";
  }

  function resolveServiceName(context, data) {
    if (!context) return "";
    const service = data.specialties.find((s) => s.slug === context);
    return service?.name || context;
  }

  function disableWhatsAppLink(link) {
    link.setAttribute("href", "#");
    link.setAttribute("aria-disabled", "true");
    link.removeAttribute("target");
    link.removeAttribute("rel");
    if (!link.__waDisabledBound) {
      link.__waDisabledBound = true;
      link.addEventListener("click", (e) => {
        if (link.getAttribute("aria-disabled") === "true") e.preventDefault();
      });
    }
  }

  function initYear() {
    const y = new Date().getFullYear();
    $all("[data-year]").forEach((el) => (el.textContent = String(y)));
  }

  function initHeader() {
    const header = $("[data-header]");
    const nav = $("[data-nav]");
    const toggle = $("[data-nav-toggle]");
    if (!header) return;

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!nav || !toggle) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.hidden = !open;
      if (open) nav.querySelector("a")?.focus();
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    document.addEventListener("click", (e) => {
      if (nav.hidden) return;
      if (e.target.closest("[data-nav]") || e.target.closest("[data-nav-toggle]")) return;
      setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!nav.hidden) setOpen(false);
    });
  }

  function renderWhatsAppChooser(data, context) {
    const serviceName = resolveServiceName(context, data);
    const esc = COMPONENTS.escapeHtml;

    const header = `
      <h2 class="h3">Com quem você quer agendar?</h2>
      ${serviceName ? `<p class="muted">Serviço: ${esc(serviceName)}</p>` : ""}
    `;

    const list = data.professionals
      .map((pro) => {
        const name = esc(pro.name);
        const role = esc(pro.role || "");
        const message = messageFor({ proName: pro.name, serviceName });
        const url = pro.whatsapp ? makeWhatsAppUrl(pro.whatsapp, message) : "";
        const action = pro.whatsapp
          ? `<a class="btn btn-primary" href="${esc(url)}" target="_blank" rel="noreferrer">Agendar</a>`
          : `<button class="btn btn-primary" type="button" disabled aria-disabled="true">Indisponível</button>`;

        return `
          <div class="modal-pro-row">
            <div>
              <strong>${name}</strong>
              ${role ? `<p class="muted">${role}</p>` : ""}
            </div>
            <div>${action}</div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="modal-pro-chooser">
        ${header}
        <div class="modal-pro-list">${list}</div>
      </div>
    `;
  }

  function openWhatsAppChooser(data, context) {
    const modal = getGlobalModal();
    if (!modal) return false;
    bindModalOnce();
    openModal(renderWhatsAppChooser(data, context));
    return true;
  }

  function initBrandLinks(data) {
    const brand = data.brand;
    const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(brand.mapsQuery || brand.addressFull)}`;
    const fallbackHref = getProfessionalsFallback();

    // WhatsApp
    $all("[data-whatsapp-link]").forEach((a) => {
      const context = a.getAttribute("data-wa-context");
      const proSlug = a.getAttribute("data-wa-pro");

      const pro = proSlug ? data.professionals.find((p) => p.slug === proSlug) : null;
      if (pro) {
        const serviceName = resolveServiceName(context, data);
        const proName = pro.name;
        if (!pro.whatsapp) {
          disableWhatsAppLink(a);
          return;
        }

        const msg = messageFor({ serviceName, proName });
        a.setAttribute("href", makeWhatsAppUrl(pro.whatsapp, msg));
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noreferrer");
        a.removeAttribute("aria-disabled");
        a.removeAttribute("data-wa-chooser");
        return;
      }

      a.setAttribute("href", fallbackHref);
      a.setAttribute("data-wa-chooser", "true");
      a.removeAttribute("target");
      a.removeAttribute("rel");
      if (!a.__waChooserBound) {
        a.__waChooserBound = true;
        a.addEventListener("click", (e) => {
          if (a.getAttribute("data-wa-chooser") !== "true") return;
          if (openWhatsAppChooser(data, context)) e.preventDefault();
        });
      }
    });

    // Instagram
    $all("[data-instagram-link]").forEach((a) => a.setAttribute("href", brand.socials.instagram));

    // Maps
    $all("[data-maps-link]").forEach((a) => {
      a.setAttribute("href", mapsUrl);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noreferrer");
    });
  }

  function initAccordion(root = document) {
    $all("[data-accordion-trigger]", root).forEach((btn) => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const panelId = btn.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;

        // fecha outros (single-open)
        $all("[data-accordion-trigger]", root).forEach((b) => {
          const pid = b.getAttribute("aria-controls");
          const p = pid ? document.getElementById(pid) : null;
          if (!p) return;
          b.setAttribute("aria-expanded", "false");
          p.hidden = true;
          const icon = b.querySelector(".accordion-icon");
          if (icon) icon.textContent = "+";
        });

        btn.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
        const icon = btn.querySelector(".accordion-icon");
        if (icon) icon.textContent = expanded ? "+" : "–";
      });
    });
  }

  // Modal with focus management
  let lastFocus = null;

  function getGlobalModal() { return $("[data-modal]"); }

  function getFocusable(container) {
    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ];
    return $all(selectors.join(","), container).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
  }

  function openModal(html) {
    const modal = getGlobalModal();
    if (!modal) return;

    lastFocus = document.activeElement;

    const content = $("[data-modal-content]", modal);
    if (content) content.innerHTML = html;

    modal.hidden = false;
    document.body.style.overflow = "hidden";

    $(".modal-close", modal)?.focus();
  }

  function closeModal() {
    const modal = getGlobalModal();
    if (!modal) return;

    modal.hidden = true;
    document.body.style.overflow = "";

    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastFocus = null;
  }

  function bindModalOnce() {
    const modal = getGlobalModal();
    if (!modal || modal.__bound) return;
    modal.__bound = true;

    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-modal-close]")) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!modal.hidden) closeModal();
        return;
      }

      if (e.key === "Tab" && !modal.hidden) {
        const focusables = getFocusable(modal);
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  function initModalGallery(data, root) {
    bindModalOnce();

    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-work-open]");
      if (!btn) return;

      const figure = btn.closest("[data-work-id]");
      const id = figure?.getAttribute("data-work-id");
      if (!id) return;

      const work = data.works.find((w) => w.id === id);
      if (!work) return;

      openModal(COMPONENTS.renderModalContent(work));
    });
  }

  // Renderers
  function withResolvedPaths(data) {
    // Clone shallow and resolve link/image paths according to current page base
    const resolved = { ...data };

    resolved.specialties = data.specialties.map((s) => ({ ...s, page: resolvePath(s.page) }));

    resolved.works = data.works.map((w) => ({ ...w, image: resolvePath(w.image) }));

    resolved.professionals = data.professionals.map((p) => ({
      ...p,
      page: resolvePath(p.page),
      photo: resolvePath(p.photo),
    }));

    return resolved;
  }

  function renderCommonSections(data) {
    // specialties cards
    const spec = $("[data-render='specialties']");
    if (spec) spec.innerHTML = data.specialties.map(COMPONENTS.renderSpecialtyCard).join("");

    // works grid (home)
    const works = $("[data-render='works']");
    if (works) works.innerHTML = data.works.slice(0, 12).map((w) => COMPONENTS.renderWorkItem(w)).join("");

    // professionals grid (home)
    const pros = $("[data-render='professionals']");
    if (pros) pros.innerHTML = data.professionals.map(COMPONENTS.renderProCard).join("");

    // faq
    const faq = $("[data-render='faq']");
    if (faq) {
      faq.innerHTML = COMPONENTS.renderAccordion(data.faq);
      initAccordion(faq);
    }

    // rules
    const rules = $("[data-render='rules']");
    if (rules) rules.innerHTML = COMPONENTS.renderRules(data.rules);

    // aftercare
    const aftercare = $("[data-render='aftercare']");
    if (aftercare) aftercare.innerHTML = COMPONENTS.renderAftercare(data.aftercare);

    // contact
    const contact = $("[data-render='contact']");
    if (contact) contact.innerHTML = COMPONENTS.renderContact(data.brand);
  }

  function initServicePage(data) {
    const cat = document.body.getAttribute("data-category");
    const container = $("[data-render='service-works']");
    if (!cat || !container) return;

    const items = data.works.filter((w) => w.category === cat).slice(0, 8);
    container.innerHTML = items.map((w) => COMPONENTS.renderWorkItem(w, { button: true })).join("");
    initModalGallery(data, container);
  }

  function initProPage(data) {
    const slug = document.body.getAttribute("data-pro");
    if (!slug) return;

    const pro = data.professionals.find((p) => p.slug === slug);
    if (!pro) return;

    const hero = $("[data-render='pro-hero']");
    if (hero) {
      const chips = (pro.styles || []).map(COMPONENTS.renderChip).join("");
      hero.innerHTML = `
        <img class="pro-photo" src="${COMPONENTS.escapeHtml(pro.photo)}" alt="Foto de ${COMPONENTS.escapeHtml(
        pro.name
      )}" loading="lazy" width="600" height="600" />
        <div class="pro-info">
          <h1>${COMPONENTS.escapeHtml(pro.name)}</h1>
          <p class="muted">${COMPONENTS.escapeHtml(pro.role)}</p>
          <p>${COMPONENTS.escapeHtml(pro.bio)}</p>
          <div class="chips">${chips}</div>
          <div class="pro-actions">
            <a class="btn btn-primary" data-whatsapp-link data-wa-pro="${COMPONENTS.escapeHtml(
              pro.slug
            )}" data-wa-context="${COMPONENTS.escapeHtml(pro.category)}" href="#">
              Agendar com ${COMPONENTS.escapeHtml(pro.name)}
            </a>
            <a class="btn btn-secondary" href="${COMPONENTS.escapeHtml(pro.instagram)}" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      `;
    }

    const grid = $("[data-render='pro-works']");
    if (!grid) return;

    const tagged = data.works.filter((w) => (w.tags || []).includes(slug)).slice(0, 12);
    const fallback = tagged.length ? tagged : data.works.filter((w) => w.category === pro.category).slice(0, 8);

    grid.innerHTML = fallback.map((w) => COMPONENTS.renderWorkItem(w, { button: true })).join("");
    initModalGallery(data, grid);
  }

  function initPortfolioPage(data) {
    const grid = $("[data-portfolio-grid]");
    const empty = $("[data-portfolio-empty]");
    const controls = $("[data-portfolio-controls]");
    const search = $("[data-portfolio-search]");
    if (!grid || !controls) return;

    let activeCategory = "all";
    let query = "";

    function matches(w) {
      const inCategory = activeCategory === "all" || w.category === activeCategory;
      if (!inCategory) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      const hay = [w.title, ...(w.tags || [])].join(" ").toLowerCase();
      return hay.includes(q);
    }

    function render() {
      const list = data.works.filter(matches);
      grid.innerHTML = list.map((w) => COMPONENTS.renderWorkItem(w, { button: true })).join("");
      if (empty) empty.hidden = list.length !== 0;
      initModalGallery(data, grid);
    }

    controls.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;

      activeCategory = btn.getAttribute("data-filter") || "all";
      $all("[data-filter]", controls).forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-filter") === activeCategory));
      render();
    });

    if (search) {
      search.addEventListener("input", () => {
        query = search.value || "";
        render();
      });
    }

    render();
  }

  function initProfessionalsPage(data) {
    const grid = $("[data-pro-grid]");
    const controls = $("[data-pro-controls]");
    const empty = $("[data-pro-empty]");
    if (!grid || !controls) return;

    let active = "all";

    function render() {
      const list = data.professionals.filter((p) => active === "all" || p.category === active);
      grid.innerHTML = list.map(COMPONENTS.renderProCard).join("");
      if (empty) empty.hidden = list.length !== 0;
      initBrandLinks(window.SITE_DATA); // re-hidrata links WA nos cards
    }

    controls.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-pro-filter]");
      if (!btn) return;

      active = btn.getAttribute("data-pro-filter") || "all";
      $all("[data-pro-filter]", controls).forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-pro-filter") === active));
      render();
    });

    render();
  }

  function init() {
    const raw = window.SITE_DATA;
    if (!raw || !COMPONENTS) return;

    initYear();
    initHeader();
    window.ROUTER?.initAnchorOffset?.();

    // Resolve paths to work both in / and /pages (file://)
    const data = withResolvedPaths(raw);

    initBrandLinks(raw);
    renderCommonSections(data);

    const page = document.body.getAttribute("data-page");
    if (page === "service") initServicePage(data);
    if (page === "portfolio") initPortfolioPage(data);
    if (page === "professionals") initProfessionalsPage(data);
    if (page === "pro") initProPage(data);
  }

  init();
})();
