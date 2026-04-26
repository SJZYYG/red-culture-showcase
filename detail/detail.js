(function () {
  const data = window.RED_CULTURE_DATA;
  const items = data.items;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "event-red-boat";
  const item = items[slug] || items["event-red-boat"];

  const themeNames = {
    overview: "红色概览",
    history: "革命历史",
    meeting: "重要会议",
    event: "经典事件",
    spirit: "精神谱系",
    person: "人物群像",
    art: "红色文艺"
  };

  const summaryLabels = {
    overview: ["核心主题", "历史依据", "学习方向"],
    history: ["历史阶段", "主要矛盾", "阶段意义"],
    meeting: ["会议议题", "决策内容", "后续影响"],
    event: ["关键节点", "历史意义", "关联事件"],
    spirit: ["核心内涵", "代表事例", "时代启示"],
    person: ["关键贡献", "精神品格", "关联人物"],
    art: ["艺术特色", "传播影响", "学习价值"]
  };

  function safeRelated(list = []) {
    return list.map((relatedSlug) => items[relatedSlug]).filter(Boolean);
  }

  function buildSummary(itemData) {
    const labels = summaryLabels[itemData.theme] || ["重点一", "重点二", "重点三"];
    const source = itemData.modalSections || [];
    return source.slice(0, 3).map((section, index) => ({
      title: labels[index] || section.label,
      text: section.text
    }));
  }

  document.title = `${item.title} · 红色文化展馆`;

  document.getElementById("detail-root").innerHTML = `
    <div class="page">
      <header class="topbar">
        <a class="brand" href="../red-culture-showcase.html">
          <div class="brand-mark" aria-hidden="true">
            <img src="../nav-brand-icon.png" alt="" width="46" height="46" decoding="async" />
          </div>
          <div>
            <div class="brand-title">红色文化展馆</div>
            <div class="brand-sub">Spirit & Memory</div>
          </div>
        </a>
        <div class="topbar-actions">
          <a class="top-btn" href="../red-culture-showcase.html">返回首页</a>
          <a class="top-btn" href="#content">跳至正文</a>
        </div>
      </header>

      <section class="hero">
        <div class="hero-bg" style="background-image:url('../${item.cover}')"></div>
        <div class="hero-overlay"></div>
        <div class="hero-inner">
          <div class="crumb">${themeNames[item.theme]} · 展品详情</div>
          <div class="hero-title">${item.title}</div>
          <div class="hero-subtitle">${item.subtitle}</div>
          <div class="hero-meta">
            <div class="hero-chip">${item.year}</div>
            ${item.tags.map((tag) => `<div class="hero-chip">${tag}</div>`).join("")}
          </div>
          <div class="hero-summary">${item.summary}</div>
        </div>
      </section>

      <main class="main" id="content">
        <div class="theme-banner">
          <div>
            <div class="theme-name">${themeNames[item.theme]}</div>
            <div class="detail-title">${item.title}</div>
          </div>
          <div class="theme-year">${item.year}</div>
        </div>

        <div class="quote">${item.quote || ""}</div>

        <div class="content-grid">
          <aside class="summary-card">
            <div class="summary-title">重点摘记</div>
            <ul class="summary-list">
              ${buildSummary(item)
                .map(
                  (section) => `
                    <li>
                      <strong>${section.title}</strong>
                      <span>${section.text}</span>
                    </li>
                  `
                )
                .join("")}
            </ul>
          </aside>

          <section class="detail-stack">
            ${item.detailSections
              .map(
                (section) => `
                  <article class="detail-card">
                    <div class="detail-title">${section.title}</div>
                    <div class="detail-body">
                      ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
                    </div>
                  </article>
                `
              )
              .join("")}
          </section>
        </div>

        <section style="margin-top: 44px;">
          <div class="related-title">相关专题推荐</div>
          <div class="related-grid">
            ${safeRelated(item.related)
              .map(
                (related) => `
                  <a class="related-card" href="./index.html?slug=${related.slug}">
                    <strong>${related.title}</strong>
                    <span>${related.summary}</span>
                  </a>
                `
              )
              .join("")}
          </div>
          <div class="footer-actions">
            <a class="top-btn" href="../red-culture-showcase.html">返回首页</a>
            <a class="top-btn" href="../red-culture-showcase.html#columns">回到主题展厅</a>
          </div>
        </section>
      </main>
    </div>
  `;
})();
