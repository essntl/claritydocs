import Link from "next/link";
import { getAllArticleSlugs } from "@/lib/articles";

export default function Home() {
  const slugs = getAllArticleSlugs();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Claritydocs
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          A beginner-first technical encyclopedia
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">
          Articles
        </h2>
        <ul className="space-y-2">
          {slugs.map((slug) => (
            <li key={slug.join("/")}>
              <Link
                href={`/${slug.join("/")}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {slug.join(" / ")}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
