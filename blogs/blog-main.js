// Find the TOC container and all H2 headings in the post content

document.addEventListener("DOMContentLoaded", () => {
    const tocList = document.getElementById('toc-list');
    const headings = document.querySelectorAll('.post-content h2');

    headings.forEach((heading) => {
        // Create an ID for each heading if not already present
        const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        heading.id = id;

        // Create TOC Link
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
});