const PROFESSION_CATEGORIES = {
  "Finance & Banking": ["Finance", "Business"],
  Legal: ["Legal", "Policy"],
  Technology: ["Technology", "AI"],
  Healthcare: ["Healthcare", "Science"],
  Consulting: ["Business", "Finance"],
  "Marketing & Media": ["Culture", "Business"],
  "Government & Policy": ["Politics", "Policy"],
  "Real Estate": ["Business", "Finance"],
  Education: ["Science", "Culture"],
  "Founder / Builder": ["Startups", "Technology", "Business"],
};

const INTEREST_TAGS = {
  "AI & Technology": ["AI", "Technology"],
  "Financial Markets": ["Finance", "Markets"],
  "Indian Business": ["Business", "India"],
  "Global Politics": ["Politics", "Geopolitics"],
  Startups: ["Startups"],
  Science: ["Science"],
  Geopolitics: ["Geopolitics", "Politics"],
  "Health & Medicine": ["Healthcare", "Science"],
  "Climate & Energy": ["Climate", "Energy"],
  Sports: ["Sports"],
  "Culture & Arts": ["Culture"],
  "Legal & Policy": ["Legal", "Policy"],
};

const recencyBoost = (publishedAt) => {
  const ageMs = Date.now() - new Date(publishedAt).getTime();
  const days = ageMs / (1000 * 60 * 60 * 24);
  if (days <= 1) return 4;
  if (days <= 3) return 2;
  if (days <= 7) return 1;
  return 0;
};

export const scoreNews = (article, preference) => {
  let score = 0;
  const professionCats = PROFESSION_CATEGORIES[preference?.profession] || [];
  if (professionCats.includes(article.category)) score += 5;

  const interestTokens = (preference?.interests || []).flatMap(
    (interest) => INTEREST_TAGS[interest] || [interest]
  );

  const haystack = [
    article.category,
    ...(article.tags || []),
    article.title,
  ].map((v) => String(v).toLowerCase());

  for (const token of interestTokens) {
    const needle = token.toLowerCase();
    if (haystack.some((item) => item.includes(needle))) score += 3;
  }

  score += recencyBoost(article.publishedAt);
  return score;
};

export const personalizeNews = (articles, preference) =>
  [...articles]
    .map((article) => ({
      article,
      score: scoreNews(article, preference),
    }))
    .sort((a, b) => b.score - a.score || new Date(b.article.publishedAt) - new Date(a.article.publishedAt))
    .map(({ article }) => article);
