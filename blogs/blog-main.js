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

// Share button logic

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Table of Contents Logic ---
    const toc = document.getElementById('toc-list');
    const content = document.querySelector('.post-content');
    if (toc && content) {
        content.querySelectorAll('h2').forEach(h => {
            const id = h.innerText.toLowerCase().replace(/\s+/g, '-');
            h.id = id;
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${id}">${h.innerText}</a>`;
            toc.appendChild(li);
        });
    }

    // --- 2. Classic Share Popup Logic ---
    const shareBtn = document.getElementById('native-share-btn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: document.title,
                text: 'Check out this engineering post by Ashim Paudel:',
                url: window.location.href
            };

            try {
                // Try to open the native share popup
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback: Copy to clipboard if native share isn't supported
                    await navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                }
            } catch (err) {
                console.log('Share failed or cancelled');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ... (TOC logic stays here) ...

    const shareBtn = document.getElementById('native-share-btn');
    const copyBtn = document.getElementById('copy-link-btn');

    // 1. Native Share Popup
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: document.title,
                        url: window.location.href
                    });
                } else {
                    copyToClipboard();
                }
            } catch (err) { console.log('Share dismissed'); }
        });
    }

    // 2. Copy Link Logic
    if (copyBtn) {
        copyBtn.addEventListener('click', () => copyToClipboard());
    }

    async function copyToClipboard() {
        await navigator.clipboard.writeText(window.location.href);
        
        // Visual Feedback
        copyBtn.classList.add('copy-success');
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        
        setTimeout(() => {
            copyBtn.classList.remove('copy-success');
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
    }
});