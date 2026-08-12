document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('#article-list');
  const latestList = document.querySelector('#latest-articles');
  const filterRow = document.querySelector('#article-filters');

  const decode = value => {
    const element = document.createElement('textarea');
    element.innerHTML = String(value ?? '');
    return element.value;
  };

  const textElement = (tag, className, value) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = decode(value);
    return element;
  };

  const articleUrl = id => `article.html?id=${encodeURIComponent(id)}`;

  const createArticle = (article, index) => {
    const row = document.createElement('article');
    row.className = 'publication';
    row.dataset.category = decode(article.category);

    const visual = document.createElement('a');
    visual.className = `pub-visual visual-${(index % 4) + 1}`;
    visual.href = articleUrl(article.id);
    visual.setAttribute('aria-label', `Read ${decode(article.title)}`);
    visual.append(textElement('span', '', String(index + 1).padStart(2, '0')));
    visual.append(textElement('b', '', article.category));

    const copy = document.createElement('div');
    copy.className = 'pub-copy';
    copy.append(textElement('span', 'eyebrow', `${decode(article.category)} · ${article.date}`));

    const heading = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = articleUrl(article.id);
    titleLink.textContent = decode(article.title);
    heading.append(titleLink);
    copy.append(heading, textElement('p', '', article.summary));

    const meta = document.createElement('div');
    meta.className = 'pub-meta';
    meta.append(textElement('span', '', `${article.readTime} read`));
    (article.tags || []).forEach(tag => meta.append(textElement('span', '', tag)));
    copy.append(meta);

    const readLink = document.createElement('a');
    readLink.className = 'text-link';
    readLink.href = articleUrl(article.id);
    readLink.textContent = 'Read article →';
    copy.append(readLink);

    row.append(visual, copy);
    return row;
  };

  const applyFilter = filter => {
    [...document.querySelectorAll('.publication')].forEach(row => {
      row.hidden = filter !== 'all' && row.dataset.category !== filter;
    });
  };

  filterRow?.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filterRow.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    applyFilter(button.dataset.filter);
  });

  fetch(window.SITE_CONFIG.contentEndpoint)
    .then(response => {
      if (!response.ok) throw new Error('Content data unavailable');
      return response.json();
    })
    .then(articles => {
      const published = articles
        .filter(article => !article.status || article.status === 'published')
        .sort((left, right) => String(right.date).localeCompare(String(left.date)));
      document.documentElement.dataset.articleCount = String(published.length);
      if (filterRow) {
        const categories = [...new Set(published.map(article => decode(article.category)).filter(Boolean))];
        filterRow.replaceChildren(...['all', ...categories].map((category, index) => {
          const button = textElement('button', index === 0 ? 'active' : '', category === 'all' ? 'All' : category);
          button.dataset.filter = category;
          return button;
        }));
      }
      if (list && published.length) list.replaceChildren(...published.map(createArticle));
      if (latestList && published.length) {
        const latest = published.slice(0, 3);
        latestList.replaceChildren(...latest.map(createArticle));
      }
    })
    .catch(() => {
      document.documentElement.dataset.articleCount = 'static-fallback';
      if (list) list.innerHTML = '<p class="loading">Articles are temporarily unavailable.</p>';
      if (latestList) latestList.innerHTML = '<p class="loading">Latest articles are temporarily unavailable.</p>';
    });
});
