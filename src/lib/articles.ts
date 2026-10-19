import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "src", "articles");

export function getArticle(slug: string[]) {
    const filePath = path.join(ARTICLES_DIR, ...slug) + ".md";
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { meta: data, content};
}

function findMarkdownFiles(dir: string): string[] {
    const results: string[] = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true})) {
        const fullPath = path.join(dir, entry.name);
         
        if (entry.isDirectory()) {
            results.push(...findMarkdownFiles(fullPath));
        } else if (entry.name.endsWith(".md")) {
            results.push(fullPath);
        }
    }
    return results;
}

export function getAllSlugs(): string[][] {
    return findMarkdownFiles(ARTICLES_DIR).map((file) => 
    path
        .relative(ARTICLES_DIR, file)
        .replace(/\.md$/, "")
        .split(path.sep)
    );
}