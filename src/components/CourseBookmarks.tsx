interface CourseBookmark {
  id: string;
  label: string;
}

interface CourseBookmarksProps {
  label: string;
  items: CourseBookmark[];
}

export default function CourseBookmarks({
  label,
  items,
}: CourseBookmarksProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        aria-label={label}
        className="sticky top-3 z-10 -mx-1 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 px-3 py-2 backdrop-blur lg:hidden"
      >
        <div className="flex min-w-max items-center gap-1.5">
          <span className="mr-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {label}
          </span>
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <span className="mr-1.5 font-mono text-xs text-purple-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        {isOpen && (
          <nav
            aria-label={label}
            className="absolute right-full top-1/2 mr-3 w-72 -translate-y-1/2 rounded-2xl border border-slate-700 bg-slate-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <div className="mb-2 flex items-center justify-between px-2 py-1">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {label}
              </span>
              <button
                aria-label={label}
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[70vh] space-y-1 overflow-y-auto pr-1">
              {items.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 rounded-xl px-3 py-2 text-sm leading-5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <span className="shrink-0 font-mono text-xs leading-5 text-purple-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
        <button
          aria-expanded={isOpen}
          aria-label={label}
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-2 rounded-l-xl border border-r-0 border-slate-700 bg-slate-950/95 px-3 py-3 text-sm font-semibold text-slate-300 shadow-xl shadow-black/30 backdrop-blur transition hover:bg-slate-800 hover:text-white"
        >
          <BookMarked className="h-4 w-4 text-purple-300" />
          <span className="[writing-mode:vertical-rl]">{label}</span>
        </button>
      </div>
    </>
  );
}
import { BookMarked, X } from "lucide-react";
import { useState } from "react";
