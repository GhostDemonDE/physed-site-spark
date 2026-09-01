import { Moon, Sun } from "lucide-react";
import type { Lang } from "@/hooks/use-site-prefs";

export function LangThemeToggle({
  lang,
  dark,
  switchLang,
  toggleTheme,
}: {
  lang: Lang;
  dark: boolean;
  switchLang: (next: Lang) => void;
  toggleTheme: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex overflow-hidden rounded-full border border-border text-xs font-medium">
        {(["ru", "en"] as const).map((l) => (
          <button
            key={l}
            onClick={() => switchLang(l)}
            className={`px-3 py-1.5 uppercase transition-colors ${
              lang === l
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <button
        onClick={toggleTheme}
        aria-label="theme"
        className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </div>
  );
}
