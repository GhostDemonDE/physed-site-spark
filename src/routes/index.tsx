import { createFileRoute, Link } from "@tanstack/react-router";
import { Beer, Dice5, Music4 } from "lucide-react";
import familyPhoto from "@/assets/family.jpg";
import { useSitePrefs } from "@/hooks/use-site-prefs";
import { LangThemeToggle } from "@/components/lang-theme-toggle";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Didenko-Cherednichenko Family — Мюнхен" },
      {
        name: "description",
        content:
          "Ирина, Дмитрий и Костя: два программиста и ребёнок в Мюнхене. Настольные игры, домашняя пивоварня Geistbräu и шотландские танцы.",
      },
      { property: "og:title", content: "Didenko-Cherednichenko Family" },
      {
        property: "og:description",
        content: "Настольные игры, домашняя пивоварня Geistbräu и шотландские танцы.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});


const copy = {
  ru: {
    nav: { about: "О нас", doing: "Чем живём", links: "Ссылки" },
    kicker: "Мюнхен · с 2013",
    title: "Семья Диденко-Чередниченко",
    people: "Ирина Диденко · Дмитрий Чередниченко · Константин Диденко",
    lead: "Семья из двух разнополых программистов (Java и .NET) и ребёнка.",
    aboutTitle: "О нас",
    aboutText:
      "Живём в Мюнхене, пишем код, варим пиво, раскладываем на столе игры с сотней компонентов и иногда танцуем в килтах. Этот сайт — просто место, где всё это собрано вместе.",
    facts: [
      { k: "Языки", v: "Java · .NET" },
      { k: "Город", v: "München" },
      { k: "Пивоварня", v: "Geistbräu" },
      { k: "Хардкор", v: "Starcraft: TBG" },
    ],
    cards: [
      {
        icon: Dice5,
        title: "Настольные игры",
        text: "Играем много и иногда очень хардкорно. Коллекция и партии — на BoardGameGeek.",
        links: [
          {
            label: "Коллекция на BGG",
            href: "https://www.boardgamegeek.com/collection/user/GhostDemon?columns=title%7Cstatus%7Cversion%7Crating%7Cbggrating%7Cplays%7Ccomment%7Ccommands&own=1&ff=1",
          },
          { label: "Starcraft: The Board Game", href: "https://starcraft.dcfamily.net" },
        ],
      },
      {
        icon: Beer,
        title: "Geistbräu",
        text: "Дома работает домашняя пивоварня. Варим для себя и наших друзей.",
        links: [{ label: "Про пивоварню", href: "/geistbrau" }],
      },
      {
        icon: Music4,
        title: "Шотландские танцы",
        text: "Иногда танцуем с Munich Scottish Association.",
        links: [{ label: "Munich Scottish Association", href: "http://www.munichscottish.de" }],
      },
    ],
    linksTitle: "Куда ещё зайти",
    photoAlt: "Ирина, Дмитрий и Костя",
    footer: "Сделано дома, в Мюнхене.",
  },
  en: {
    nav: { about: "About", doing: "What we do", links: "Links" },
    kicker: "Munich · since 2013",
    title: "The Didenko-Cherednichenko Family",
    people: "Irina Didenko · Dmitry Cherednichenko · Konstantin Didenko",
    lead: "A family of two programmers (Java and .NET) and one kid.",
    aboutTitle: "About us",
    aboutText:
      "We live in Munich, write code, brew beer, spread hundred-component board games across the table and occasionally dance in kilts. This site is simply where all of that lives.",
    facts: [
      { k: "Stacks", v: "Java · .NET" },
      { k: "City", v: "München" },
      { k: "Brewery", v: "Geistbräu" },
      { k: "Hardcore", v: "Starcraft: TBG" },
    ],
    cards: [
      {
        icon: Dice5,
        title: "Board games",
        text: "We play a lot, sometimes very hardcore. Collection and plays live on BoardGameGeek.",
        links: [
          {
            label: "Collection on BGG",
            href: "https://www.boardgamegeek.com/collection/user/GhostDemon?columns=title%7Cstatus%7Cversion%7Crating%7Cbggrating%7Cplays%7Ccomment%7Ccommands&own=1&ff=1",
          },
          { label: "Starcraft: The Board Game", href: "https://starcraft.dcfamily.net" },
        ],
      },
      {
        icon: Beer,
        title: "Geistbräu",
        text: "A home brewery runs in our kitchen. We brew for ourselves and our friends.",
        links: [{ label: "About the brewery", href: "/geistbrau" }],
      },
      {
        icon: Music4,
        title: "Scottish dancing",
        text: "Now and then we dance with the Munich Scottish Association.",
        links: [{ label: "Munich Scottish Association", href: "http://www.munichscottish.de" }],
      },
    ],
    linksTitle: "Elsewhere",
    photoAlt: "Irina, Dmitry and Konstantin",
    footer: "Made at home, in Munich.",
  },
} as const;

function Index() {
  const { lang, dark, switchLang, toggleTheme } = useSitePrefs();
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-sm font-semibold tracking-tight">
          dcfamily<span className="text-primary">.net</span>
        </span>
        <div className="flex items-center gap-2">
          <nav className="mr-2 hidden gap-5 text-sm text-muted-foreground sm:flex">
            <a className="transition-colors hover:text-foreground" href="#about">
              {t.nav.about}
            </a>
            <a className="transition-colors hover:text-foreground" href="#doing">
              {t.nav.doing}
            </a>
          </nav>
          <LangThemeToggle lang={lang} dark={dark} switchLang={switchLang} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pb-24">
        <section className="pt-6 pb-14 sm:pt-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{t.kicker}</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">{t.people}</p>
          <p className="mt-2 max-w-xl text-lg">{t.lead}</p>

          <figure
            className="mt-10 overflow-hidden rounded-3xl border border-border"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <img
              src={familyPhoto}
              alt={t.photoAlt}
              width={1600}
              height={1066}
              className="w-full object-cover"
            />
          </figure>
        </section>

        <section id="about" className="grid gap-10 border-t border-border py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold">{t.aboutTitle}</h2>
            <p className="mt-4 max-w-prose text-muted-foreground">{t.aboutText}</p>
          </div>
          <dl className="grid grid-cols-2 gap-4 self-start">
            {t.facts.map((f) => (
              <div key={f.k} className="rounded-xl bg-secondary px-4 py-3">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{f.k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="doing" className="border-t border-border py-14">
          <h2 className="text-2xl font-semibold">{t.nav.doing}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
                >
                  <span
                    className="mb-5 inline-flex size-10 items-center justify-center rounded-xl text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-warm)" }}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{card.text}</p>
                  <ul className="mt-5 space-y-1.5 text-sm">
                    {card.links.map((l) =>
                      l.href === "/geistbrau" ? (
                        <li key={l.href}>
                          <Link
                            to="/geistbrau"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {l.label} →
                          </Link>
                        </li>
                      ) : (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            className="font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {l.label} →
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground">
          <span>{t.footer}</span>
          <span>© {new Date().getFullYear()} dcfamily.net</span>
        </div>
      </footer>
    </div>
  );
}
