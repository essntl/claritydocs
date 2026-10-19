import { getAllSlugs, getArticle } from "@/lib/articles";

export default function Home() {
  const { meta, content} = getArticle(["network", "how-do-ip-addresses-work"]);
  console.log(meta);
  console.log(getAllSlugs());
  return <pre className="whitespace-pre-wrap p-8">{content}</pre>;
}
