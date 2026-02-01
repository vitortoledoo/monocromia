/* Components: renderização simples e segura (sem dependências) */
(function () {
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderSpecialtyCard(s) {
    return `
      <article class="card">
        <h3>${escapeHtml(s.name)}</h3>
        <p class="muted">${escapeHtml(s.shortDescription)}</p>
        <div class="card-actions">
          <a class="btn btn-secondary btn-block" href="${escapeHtml(s.page)}">Ver ${escapeHtml(s.name)}</a>
        </div>
      </article>
    `;
  }

  function renderWorkItem(work, { button = false } = {}) {
    const title = escapeHtml(work.title);
    const img = escapeHtml(work.image);
    const alt = escapeHtml(work.title);
    const tags = Array.isArray(work.tags) ? work.tags : [];
    const tagText = escapeHtml(tags.join(", "));

    if (button) {
      return `
        <figure class="work" data-work-id="${escapeHtml(work.id)}">
          <button class="work-btn" type="button" aria-label="Abrir ${title}" data-work-open>
            <img src="${img}" alt="${alt}" loading="lazy" width="800" height="800" />
          </button>
          <figcaption class="sr-only">${title}. Tags: ${tagText}</figcaption>
        </figure>
      `;
    }

    return `
      <figure class="work" data-work-id="${escapeHtml(work.id)}">
        <img src="${img}" alt="${alt}" loading="lazy" width="800" height="800" />
        <figcaption class="sr-only">${title}. Tags: ${tagText}</figcaption>
      </figure>
    `;
  }

  function renderChip(label) {
    return `<span class="chip">${escapeHtml(label)}</span>`;
  }

  function renderProCard(pro) {
    return `
      <article class="card pro-card" data-pro-category="${escapeHtml(pro.category || "all")}">
        <img class="avatar" src="${escapeHtml(pro.photo)}" alt="Foto de ${escapeHtml(pro.name)}" loading="lazy" width="400" height="400" />
        <h3>${escapeHtml(pro.name)}</h3>
        <p class="muted">${escapeHtml(pro.role)}</p>
        ${pro.callout ? `<p class="muted">${escapeHtml(pro.callout)}</p>` : ""}
        <div class="card-actions">
          <a class="btn btn-secondary" href="${escapeHtml(pro.page)}">Ver perfil</a>
          <a class="btn btn-primary" data-whatsapp-link data-wa-pro="${escapeHtml(pro.slug)}" data-wa-context="${escapeHtml(
            pro.category || ""
          )}" href="#">Agendar</a>
        </div>
      </article>
    `;
  }

  function renderAccordion(items) {
    const html = items
      .map((item, idx) => {
        const q = escapeHtml(item.q);
        const a = escapeHtml(item.a);
        const id = `acc-${idx + 1}`;
        return `
          <div class="accordion-item">
            <button
              class="accordion-trigger"
              type="button"
              aria-expanded="false"
              aria-controls="${id}"
              id="${id}-label"
              data-accordion-trigger
            >
              <span>${q}</span>
              <span class="accordion-icon" aria-hidden="true">+</span>
            </button>
            <div class="accordion-panel" id="${id}" role="region" aria-labelledby="${id}-label" hidden>
              <p>${a}</p>
            </div>
          </div>
        `;
      })
      .join("");

    return `<div class="accordion">${html}</div>`;
  }

  function renderModalContent(work) {
    const title = escapeHtml(work.title);
    const img = escapeHtml(work.image);
    const category = escapeHtml(work.category);
    const tags = (work.tags || []).map(renderChip).join("");

    return `
      <img src="${img}" alt="${title}" loading="lazy" />
      <div class="modal-meta">
        <h3 class="h3">${title}</h3>
        <p class="muted">Categoria: ${category}</p>
        <div class="modal-tags">${tags}</div>
      </div>
    `;
  }

  function renderRules(rules) {
    return `
      <h2 class="h3">Regras</h2>
      <ul class="list">
        <li><strong>Sinal:</strong> ${escapeHtml(rules.deposit)}</li>
        <li><strong>Cancelamento:</strong> ${escapeHtml(rules.cancellation)}</li>
        <li><strong>Idade:</strong> ${escapeHtml(rules.age)}</li>
        <li><strong>Cuidados:</strong> ${escapeHtml(rules.care)}</li>
      </ul>
    `;
  }

  function renderAftercare(aftercare) {
    const tattoo = aftercare.tattoo;
    const piercing = aftercare.piercing;

    return `
      <section id="tattoo" class="card">
        <h2 class="h3">${escapeHtml(tattoo.title)}</h2>
        <ul class="list">${tattoo.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
      </section>
      <section id="piercing" class="card">
        <h2 class="h3">${escapeHtml(piercing.title)}</h2>
        <ul class="list">${piercing.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
      </section>
    `;
  }

  function renderContact(brand) {
    return `
      <h2 class="h3">Dados</h2>
      <p><strong>${escapeHtml(brand.addressLine)}</strong> — ${escapeHtml(brand.neighborhood)}, ${escapeHtml(brand.city)}</p>
      <p class="muted">${escapeHtml(brand.hours)}</p>
      <div class="card-actions">
        <a class="btn btn-primary" data-whatsapp-link href="#">Escolher profissional</a>
        <a class="btn btn-secondary" data-instagram-link href="${escapeHtml(brand.socials.instagram)}" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
    `;
  }

  window.COMPONENTS = {
    escapeHtml,
    renderSpecialtyCard,
    renderWorkItem,
    renderProCard,
    renderChip,
    renderAccordion,
    renderModalContent,
    renderRules,
    renderAftercare,
    renderContact,
  };
})();
