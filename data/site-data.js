/* PERSONALIZE AQUI: altere nome, WhatsApp, endereço, horários, redes e conteúdos */
(function () {
  window.SITE_DATA = {
    brand: {
      name: "Monocromia Studio",
      slogan: "Minimalismo, técnica e cuidado",
      city: "Mogi Guaçu - SP",
      neighborhood: "Centro",
      addressLine: "Rua Chico de Paula, 213",
      addressFull: "Rua Chico de Paula, 213, Centro - Mogi Guaçu - SP",
      hours: "Seg–Sáb · 10h–19h (sob agendamento)",
      whatsapp: "+5511999999999", // placeholder exigido
      whatsappDefaultMessage:
        "Oi! Quero agendar um horário no Monocromia Studio. Serviço: [Tattoo/Piercing/Lash/Nails]. Referências: [link/fotos].",
      socials: {
        instagram: "https://www.instagram.com/__monocromia/", // PERSONALIZE AQUI
      },
      mapsQuery: "Rua Chico de Paula, 213, Centro - Mogi Guaçu - SP", // PERSONALIZE AQUI
    },

    specialties: [
      {
        name: "Tattoo",
        slug: "tattoo",
        shortDescription: "Do minimal ao autoral. Traga referências, tamanho e local.",
        cta: "Agendar Tattoo",
        page: "pages/service-tattoo.html",
      },
      {
        name: "Piercing",
        slug: "piercing",
        shortDescription: "Perfuração segura com orientação de cicatrização e joias selecionadas.",
        cta: "Agendar Piercing",
        page: "pages/service-piercing.html",
      },
      {
        name: "Lash & Brow",
        slug: "lash",
        shortDescription: "Realce natural: cílios e sobrancelhas com mapeamento personalizado.",
        cta: "Agendar Lash & Brow",
        page: "pages/service-lash.html",
      },
      {
        name: "Nails",
        slug: "nails",
        shortDescription: "Alongamento e manutenção com acabamento clean e durabilidade.",
        cta: "Agendar Nails",
        page: "pages/service-nails.html",
      },
    ],

    works: [
      {
        id: "work-01",
        category: "tattoo",
        title: "Fine line minimal",
        image: "assets/images/work-01.jpg",
        tags: ["fine line", "minimal", "ana", "tattoo"],
      },
      {
        id: "work-02",
        category: "tattoo",
        title: "Blackwork pequeno",
        image: "assets/images/work-02.jpg",
        tags: ["blackwork", "detalhe", "let", "tattoo"],
      },
      {
        id: "work-03",
        category: "tattoo",
        title: "Floral leve",
        image: "assets/images/work-03.jpg",
        tags: ["floral", "fine line", "ana", "tattoo"],
      },
      {
        id: "work-04",
        category: "tattoo",
        title: "Lettering clean",
        image: "assets/images/work-04.jpg",
        tags: ["lettering", "clean", "let", "tattoo"],
      },
      {
        id: "work-05",
        category: "piercing",
        title: "Helix com joia discreta",
        image: "assets/images/work-05.jpg",
        tags: ["helix", "joia", "nath", "piercing"],
      },
      {
        id: "work-06",
        category: "piercing",
        title: "Nostril clássico",
        image: "assets/images/work-06.jpg",
        tags: ["nostril", "joia", "nath", "piercing"],
      },
      {
        id: "work-07",
        category: "piercing",
        title: "Conch alinhado",
        image: "assets/images/work-07.jpg",
        tags: ["conch", "anatomia", "nath", "piercing"],
      },
      {
        id: "work-08",
        category: "piercing",
        title: "Tragus minimal",
        image: "assets/images/work-08.jpg",
        tags: ["tragus", "minimal", "nath", "piercing"],
      },
      {
        id: "work-09",
        category: "lash",
        title: "Volume leve natural",
        image: "assets/images/work-09.jpg",
        tags: ["natural", "volume leve", "vanne", "lash"],
      },
      {
        id: "work-10",
        category: "lash",
        title: "Brow design clean",
        image: "assets/images/work-10.jpg",
        tags: ["brow", "clean", "vanne", "lash"],
      },
      {
        id: "work-11",
        category: "lash",
        title: "Mapeamento personalizado",
        image: "assets/images/work-11.jpg",
        tags: ["mapeamento", "natural", "vanne", "lash"],
      },
      {
        id: "work-12",
        category: "nails",
        title: "Nails acabamento clean",
        image: "assets/images/work-12.jpg",
        tags: ["clean", "manutenção", "letxx", "nails"],
      },
    ],

    professionals: [
      {
        slug: "ana", // arquivo: pages/pro-ana.html
        name: "ANNA",
        role: "PIERCING",
        category: "piercing",
        bio: "TEXTO PRA BIO",
        styles: ["ESTILO 1", "ESTILO 2", "ESTILO 3"],
        photo: "assets/images/pro-ana.jpg",
        instagram: "https://www.instagram.com/_annapiercer/", // PERSONALIZE AQUI
        whatsapp: "https://api.whatsapp.com/send/?phone=19999969679&text&type=phone_number&app_absent=0&utm_source=ig", // opcional
        callout: "Piercing bem colocado e bem cuidado. Bora fazer certo.",
        page: "pages/pro-ana.html",
      },
      {
        slug: "let", // arquivo: pages/pro-let.html 
        name: "LETÍCIA",
        role: "LASH, SOBRANCELHAS, BROW",
        category: "Cílios e Sobrancelhas",
        bio: "TEXTO PRA BIO",
        styles: ["ESTILO 1", "ESTILO 2", "ESTILO 3"],
        photo: "assets/images/pro-let.jpg",
        instagram: "https://www.instagram.com/leticiadeoliveira.lash/", // PERSONALIZE AQUI
        whatsapp: "https://api.whatsapp.com/message/KZK6G3GYRTGUH1?autoload=1&app_absent=0&utm_source=ig",
        callout: "FRASE DE IMPACTO.",
        page: "pages/pro-let.html",
      },
      {
        slug: "vanne", // arquivo: pages/pro-vanne.html 
        name: "VANNE",
        role: "TATTO SÓLIDAS",
        category: "Tatuagem",
        bio: "TEXTO PRA BIO",
        styles: ["ESTILO 1", "ESTILO 2", "ESTILO 3"],
        photo: "assets/images/pro-vanne.jpg",
        instagram: "https://www.instagram.com/vanneink/", // PERSONALIZE AQUI
        whatsapp: "",
        callout: "FRASE DE IMPACTO.",
        page: "pages/pro-vanne.html",
      },
      {
        slug: "letxx", // arquivo: pages/pro-letxx.html 
        name: "LETXX",
        role: "TATTO",
        category: "TATTO",
        bio: "TEXTO PRA BIO.",
        styles: ["ESTILO 1", "ESTILO 2", "ESTILO 3"],
        photo: "assets/images/pro-letxx.jpg",
        instagram: "https://www.instagram.com/letxink/", // PERSONALIZE AQUI
        whatsapp: "https://api.whatsapp.com/message/GL6ARHITS2NKO1?autoload=1&app_absent=0&utm_source=ig",
        callout: "FRASE DE IMPACTO.",
        page: "pages/pro-letxx.html",
      },
      {
        slug: "nath", // arquivo: pages/pro-nath.html 
        name: "NATHNAILS",
        role: "UNHA",
        category: "NAIL",
        bio: "TEXTO PRA BIO",
        styles: ["ESTILO 1", "ESTILO 2", "ESTILO 3"],
        photo: "assets/images/pro-nath.jpg",
        instagram: "https://www.instagram.com/nathnails.designer/", // PERSONALIZE AQUI
        whatsapp: "",
        callout: "FRASE DE IMPACTO.",
        page: "pages/pro-nath.html",
      },
    ],

    faq: [
      { q: "Preciso dar sinal?", a: "Sim. O sinal confirma data e horário. O restante é pago no dia." },
      { q: "Posso reagendar?", a: "Sim, desde que avise com antecedência. Veja as regras de cancelamento." },
      { q: "Menor de idade pode?", a: "Depende do serviço e autorização. Chame no WhatsApp para orientarmos." },
      { q: "Quanto tempo dura?", a: "Varia por serviço e tamanho. Envie referências e te passamos uma estimativa." },
      { q: "Como envio referência?", a: "Pode mandar foto, print, link e explicar o que gostou: traço, tamanho, região." },
      { q: "Tem cuidados depois?", a: "Sim. Temos uma página de cuidados e também orientamos no dia." },
    ],

    rules: {
      deposit: "Sinal para confirmação do horário (valor combinado no atendimento).",
      cancellation: "Cancelamentos/reagendamentos com antecedência. Fora do prazo, o sinal pode ser retido.",
      age: "Documento obrigatório. Para menores, consultar regras por serviço.",
      care: "Siga os cuidados pós-procedimento. Dúvidas? Chame no WhatsApp.",
    },

    aftercare: {
      tattoo: {
        title: "Tattoo",
        items: [
          "Lave com sabonete neutro e água, 2–3x ao dia. Seque sem esfregar.",
          "Hidrate conforme orientação. Não arranque casquinhas.",
          "Evite sol, piscina e mar até cicatrizar.",
          "Use roupas leves e evite atrito na região.",
        ],
      },
      piercing: {
        title: "Piercing",
        items: [
          "Higienize com soro fisiológico/solução indicada.",
          "Evite tocar e girar a joia sem necessidade.",
          "Evite trauma e maquiagem na região.",
          "Sinais de alerta: dor intensa, secreção e febre — chame a gente.",
        ],
      },
    },
  };
})();
