import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Beer } from "lucide-react";
import logo from "@/assets/geistbrau/logo.png";
import brewPhoto from "@/assets/geistbrau/brew.jpg";
import beer1 from "@/assets/geistbrau/beer1.jpg";
import beer2 from "@/assets/geistbrau/beer2.jpg";
import beer3 from "@/assets/geistbrau/beer3.jpg";
import beer4 from "@/assets/geistbrau/beer4.jpg";
import beer5 from "@/assets/geistbrau/beer5.jpg";
import { useSitePrefs } from "@/hooks/use-site-prefs";
import { LangThemeToggle } from "@/components/lang-theme-toggle";

export const Route = createFileRoute("/geistbrau")({
  component: Geistbrau,
  head: () => ({
    meta: [
      { title: "Geistbräu — домашняя пивоварня" },
      {
        name: "description",
        content:
          "Geistbräu — домашняя пивоварня в Мюнхене. Крепкие солодовые сорта: имперские стауты, барливайны, триппели.",
      },
      { property: "og:title", content: "Geistbräu" },
      {
        property: "og:description",
        content: "Домашняя пивоварня в Мюнхене: имперские стауты, барливайны, триппели.",
      },
      { property: "og:url", content: "/geistbrau" },
    ],
    links: [{ rel: "canonical", href: "/geistbrau" }],
  }),
});

const copy = {
  ru: {
    back: "На главную",
    kicker: "Домашняя пивоварня · с 2007",
    title: "Geistbräu",
    lead: "Домашним пивоварением я увлёкся в далёком уже 2007 году. И с тех пор варю почти без перерывов.",
    text: "В 2013 переехал в Германию и теперь могу называться немецким пивоваром :) Особенно люблю (и хорошо удаются) крепкие солодовые сорта — имперские стауты, барливайны, триппели.",
    untappdLabel: "Untappd",
    galleryTitle: "Пиво и процесс",
    footer: "Варим для себя и наших друзей.",
  },
  en: {
    back: "Back home",
    kicker: "Home brewery · since 2007",
    title: "Geistbräu",
    lead: "I got into home brewing back in 2007, and I've been brewing pretty much non-stop ever since.",
    text: "In 2013 I moved to Germany, so now I get to call myself a German brewer :) I especially love (and I'm pretty good at) strong malty styles — imperial stouts, barleywines, tripels.",
    untappdLabel: "Untappd",
    galleryTitle: "Beer & process",
    footer: "Brewed for ourselves and our friends.",
  },
} as const;

const gallery = [brewPhoto, beer1, beer2, beer3, beer4, beer5];

function Geistbrau() {
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
            <Link to="/" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ArrowLeft className="size-3.5" />
              {t.back}
            </Link>
          </nav>
          <LangThemeToggle lang={lang} dark={dark} switchLang={switchLang} toggleTheme={toggleTheme} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pb-24">
        <section className="pt-6 pb-14 sm:pt-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{t.kicker}</p>
          <div className="mt-4 flex items-center gap-4">
            <span
              className="inline-flex size-14 items-center justify-center rounded-2xl text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-warm)" }}
            >
              <Beer className="size-7" />
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">{t.title}</h1>
          </div>
          <p className="mt-6 max-w-xl text-lg">{t.lead}</p>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">{t.text}</p>

          <div className="mt-6 flex items-center gap-3">
            <img src={logo} alt="Geistbräu" className="h-16 w-16 rounded-xl object-contain" />
            <a
              href="https://untappd.com/GeistbrauHomebrew"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {t.untappdLabel} →
            </a>
          </div>
        </section>

        <section className="border-t border-border py-14">
          <h2 className="text-2xl font-semibold">{t.galleryTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map((src, i) => (
              <figure
                key={src}
                className="overflow-hidden rounded-2xl border border-border"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <img
                  src={src}
                  alt={`Geistbräu ${i + 1}`}
                  className="aspect-square w-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
              </figure>
            ))}
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
