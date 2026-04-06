import os
import markdown
import yaml
from pathlib import Path

# CONFIGURATION
BASE_DIR = Path(__file__).resolve().parent
SOURCE_DIR = BASE_DIR / "blogs" / "src"
OUTPUT_DIR = BASE_DIR / "blogs" / "posts"
PARTIALS_DIR = BASE_DIR / "blogs" / "partials"

def load_partial(name):
    path = PARTIALS_DIR / f"{name}.html"
    return path.read_text(encoding="utf-8") if path.exists() else ""

def build_blog():
    # 1. Load Skeletons and Global Components
    nav_posts = load_partial("nav")           # Standard nav for articles (Back to Blog)
    nav_list = load_partial("nav-blog-list")  # Special nav for index (Back to Portfolio)
    footer = load_partial("footer")
    sidebar_bio = load_partial("sidebar-bio")
    post_skeleton = load_partial("post-skeleton")
    list_skeleton = load_partial("list-skeleton")
    item_partial = load_partial("list-item")
    scripts = load_partial("scripts")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    all_posts_metadata = []

    # 2. Build Individual Articles
    for md_file in SOURCE_DIR.glob("*.md"):
        print(f"🔨 Building: {md_file.name}")
        raw_content = md_file.read_text(encoding="utf-8")

        if raw_content.startswith('---'):
            _, frontmatter, md_body = raw_content.split('---', 2)
            meta = yaml.safe_load(frontmatter)
        else:
            meta = {"title": md_file.stem, "date": "2026", "tag": ["eng"]}
            md_body = raw_content

        # Process Tags with your new Gradient Logic
        raw_tags = meta.get('tag', ['General'])
        if isinstance(raw_tags, str):
            raw_tags = [t.strip() for t in raw_tags.split(',')]
        
        tags_html = "".join([f'<span class="blog-tag">{t.strip().upper()}</span>' for t in raw_tags])

        # Convert Markdown
        html_content = markdown.markdown(md_body, extensions=['extra', 'codehilite'])

        # Create Article HTML
        final_post = post_skeleton.format(
            title=meta.get('title', 'Untitled'),
            date=meta.get('date', 'Recent'),
            description=meta.get('description', ''),
            tags_html=tags_html,
            html_content=html_content,
            nav=nav_posts,
            footer=footer,
            sidebar_bio=sidebar_bio
        )

        (OUTPUT_DIR / f"{md_file.stem}.html").write_text(final_post, encoding="utf-8")
        
        # Save Metadata for the Index Page
        all_posts_metadata.append({
            "title": meta.get('title'),
            "date": meta.get('date'),
            "tags_html": tags_html,
            "description": meta.get('description', ''),
            "slug": md_file.stem
        })

    # 3. Update the Blog Index (Listing Page)
    print("✨ Updating Blog Index...")
    
    # Sort posts: Newest (2026) first
    all_posts_metadata.sort(key=lambda x: str(x['date']), reverse=True)

    post_cards_html = ""
    for post in all_posts_metadata:
        post_cards_html += item_partial.format(
            title=post['title'],
            date=post['date'],
            tags_html=post['tags_html'],
            description=post['description'],
            slug=post['slug']
        )

        final_index_page = list_skeleton.format(
        nav=nav_list,
        footer=footer,
        post_cards=post_cards_html,
        scripts=scripts  # Inject it here
        )

    (BASE_DIR / "blogs" / "index.html").write_text(final_index_page, encoding="utf-8")
    
    print(f"\n🚀 Automation Complete! {len(all_posts_metadata)} posts synchronized.")

if __name__ == "__main__":
    build_blog()