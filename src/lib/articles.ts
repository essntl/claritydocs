import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const articlesDirectory = path.join(process.cwd(), "articles");

export interface Article {
  slug: string[];
  content: string;
  htmlContent: string;
  title: string;
}

/**
 * Get all article slugs from the articles directory and its subdirectories
 */
export function getAllArticleSlugs(): string[][] {
  const slugs: string[][] = [];

  function walkDirectory(dir: string, basePath: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walkDirectory(entryPath, [...basePath, entry.name]);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const slug = entry.name.replace(/\.md$/, "");
        slugs.push([...basePath, slug]);
      }
    }
  }

  if (fs.existsSync(articlesDirectory)) {
    walkDirectory(articlesDirectory);
  }

  return slugs;
}

/**
 * Get article data by slug path
 */
export async function getArticleBySlug(
  slugParts: string[]
): Promise<Article | null> {
  const filePath = path.join(articlesDirectory, ...slugParts) + ".md";

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(gfm).use(html).process(content);
  const htmlContent = processedContent.toString();

  // Extract title from frontmatter or first heading
  let title = data.title as string | undefined;
  if (!title) {
    const headingMatch = content.match(/^#+\s+(.+)$/m);
    title = headingMatch ? headingMatch[1] : slugParts[slugParts.length - 1];
  }

  return {
    slug: slugParts,
    content,
    htmlContent,
    title,
  };
}
