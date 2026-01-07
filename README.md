# Claritydocs

Claritydocs is an open, self-hostable, community-driven encyclopedia for teaching technical concepts **beginner-first**.

It uses a **docs-as-code** workflow: articles are written in Markdown inside the Git repository, contributions happen through PRs, and Git history serves as the editorial record. Content is organized as a browsable knowledge hierarchy where the **site structure maps directly to the content folder tree**, and each page includes an **“Edit this page”** link back to GitHub.

## Goals

- Teach technical concepts with **clarity before correctness jargon**
- Stay **self-hostable** and **deployable anywhere**
- Encourage community contributions with a clean editorial workflow
- Keep builds **offline-capable** and resilient

## Key Features

- **Beginner-first writing style**
  - Understanding comes first (simple language, analogies, intuition)
  - Precise terms and details come next
  - Optional progression from beginner → advanced

- **Docs-as-code workflow**
  - Markdown files in a repo
  - PR-based contributions
  - Git history = transparent editorial record

- **Resilient by design**
  - Offline-capable builds
  - No required external database
  - No required external search service
  - No “phone home” dependencies

- **Browsable structure**
  - Folder tree = site navigation / hierarchy
  - “Edit this page” links to GitHub for quick contributions

## How It’s Organized

Claritydocs content lives in a folder structure like:

- `articles/`
  - `topic/`
    - `subtopic/`
      - `article.md`

That structure is intentionally mirrored by the site so people can browse topics naturally.

## Contributing

Contributions are welcome.

### Contribution Flow

1. Fork the repository
2. Create a branch for your changes
3. Add or edit Markdown articles in the content tree
4. Open a Pull Request
5. Discussion/review happens in the PR
6. Merge creates a permanent editorial record in Git history

### Writing Guidelines (Beginner-First)

When writing an article:

- Start with **what it is** and **why it matters**
- Prefer **plain language** over dense jargon
- Use **analogies** and simple mental models early
- Introduce precise terminology after the reader has intuition
- If relevant, add an optional **“Going deeper”** section for advanced details
- Keep paragraphs short and skimmable

## Self-Hosting

Claritydocs is designed to be self-hosted and portable.

