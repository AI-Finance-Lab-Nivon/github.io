NIVON — AI FINANCE LAB
============================================================

Personal research blog for Nivon, focused on AI research tools, market
intelligence, automation and the future of finance.

PUBLIC REPOSITORY
-----------------
Owner: AI-Finance-Lab-Nivon
Repository: github.io
Repository URL: https://github.com/AI-Finance-Lab-Nivon/github.io
Target GitHub Pages URL after first deployment:
https://ai-finance-lab-nivon.github.io/github.io/

SITE STRUCTURE
--------------
index.html                    Home page.
about.html                    Profile and editorial principles.
articles.html                 Article archive and topic filters.
article.html                  Article detail view.
research.html                 Lab projects and research workflow.
contact.html                  Public GitHub contact paths.
data/profile.json             Nivon's public profile data.
data/articles.json            Published article content.
data/research.json            Research project records.
agent/                        Editorial, review and publishing metadata.

PUBLISHING
----------
The site is designed for GitHub Pages and must be published from the repository
root so index.html remains at the top level. The publishing target is recorded
in config.js and agent/publish-config.json.

FIRST DEPLOYMENT TO AN EMPTY REPOSITORY
--------------------------------------
1. Extract this ZIP.
2. Upload all extracted files and folders directly to the main branch root.
3. Confirm that index.html and agent/publish-config.json are at repository root.
4. In GitHub Settings > Pages, deploy from the main branch and / (root).
5. Wait for the target Pages URL above to become available.
6. Use item_github.py only after this first deployment is complete.

The plugin discovers this site through agent/publish-config.json and publishes
new entries to data/articles.json. The article archive renders every published
entry and its category filter from JSON automatically, while the home page sorts
published entries by date and displays the latest three. No article-list or
filter HTML update is required.

ARTICLE WORKFLOW
----------------
1. Draft the article and record all sources.
2. Check facts, calculations, uncertainty and limitations.
3. Complete human review.
4. Add the reviewed entry to data/articles.json with a unique id.
5. Validate the JSON before publishing.

Articles are educational and must not be presented as personalized investment
advice or as a promise of financial outcomes.
