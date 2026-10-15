# Konkani strings — family review before launch

Every Devanagari string used on this site is listed here. All are set in
`lang="kok"`, in Noto Serif Devanagari, with `line-height: 1.7` so matras never clip.
A native speaker in the family should read this list once before we go live.

| # | Where it appears | Devanagari | Rough transliteration | Meaning / intended use | Confidence |
|---|-----|---|---|---|---|
| 1 | Hero, beside the English headline (`site.js` → `hero.greeting`, `konkani.heroGreeting`) | नमस्कार | namaskār | Hello / greetings — used as the quiet welcome accent | High — used widely in Goan Konkani |
| 2 | Section kicker for food (`konkani.food`, used on the menu preview) | खाणं | khāṇ | Food / eating | High — standard Konkani |
| 3 | Section kicker for the story (`konkani.story`, Our Story) | आमची गोष्ट | āmchī goṣṭ | "Our story" (āmchī = our, goṣṭ = story/thing) | High — please confirm it reads naturally to you |
| 4 | Section kicker for the menu page (`konkani.menu`) | मेनू | menu | Menu (loanword, written in Devanagari) | High |
| 5 | Section kicker for Visit us (`konkani.visit`) | भेट | bheṭ | Visit / meeting | High — "visit us" reads as "भेट", please confirm |
| 6 | Footer sign-off (`konkani.signOff`), English next to it: "Eat well, and come back soon." | मन भरून खा | man bharūn khā | Eat to your heart's content | Medium — please confirm this is natural Konkani, or suggest a better sign-off |
| 7 | Dish-name ribbon (home) | मासें कर्री | māsēṁ karī | Fish curry | High |
| 8 | Dish-name ribbon (home) | शिरशी | śirśī | Kingfish (surmai) — "शिरशी Fry" | High — Goan Konkani name for kingfish, please confirm |
| 9 | Dish-name ribbon (home) | सोरपोटेल | sorpoṭel | Sorpotel (dish name transliteration) | High |
| 10 | Dish-name ribbon (home) | पाव | pāv | Bread roll (pão) | High |
| 11 | Dish-name ribbon (home) | भात | bhāt | Rice | High |

## Also to confirm (English, not Devanagari)

- `site.js` → `meaning`: "Nizachem means 'our own' in Konkani."
  Please confirm this is what the name actually means and how it is written.

## Rules the code follows

- Konkani appears only in: the hero greeting, four small section kickers, the dish
  ribbon, and the footer sign-off. Never in body paragraphs, never as decoration.
- Each Konkani string sits directly beside its English counterpart.
- Nothing Konkani is animated in a way that could clip matras (no scaleY, no
  clip-path reveals on `lang="kok"` spans).

If any string should change, edit `src/content/site.js` → `konkani` (and the ribbon
array) — the components read from there.
