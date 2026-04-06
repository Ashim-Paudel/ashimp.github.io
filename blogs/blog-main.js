document.addEventListener("DOMContentLoaded", () => {
    // --- 1. TABLE OF CONTENTS LOGIC ---
    const tocList = document.getElementById('toc-list');
    const articleBody = document.querySelector('.post-content');

    if (tocList && articleBody) {
        // Clear container to prevent any duplication
        tocList.innerHTML = '';

        const headings = articleBody.querySelectorAll('h2');
        const addedIds = new Set();

        headings.forEach((heading) => {
            const text = heading.textContent.trim();
            // Create a clean ID: lowercase, no special chars, dashes for spaces
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            
            // Safety check: avoid empty or duplicate IDs
            if (!id || addedIds.has(id)) return;

            heading.id = id;
            addedIds.add(id);

            const li = document.createElement('li');
            li.innerHTML = `<a href="#${id}">${text}</a>`;
            tocList.appendChild(li);
        });
    }

    // --- 2. SHARING LOGIC ---
    const shareBtn = document.getElementById('native-share-btn');
    const copyBtn = document.getElementById('copy-link-btn');

    // Consolidated Share Function
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } else {
                copyToClipboard();
            }
        } catch (err) {
            console.log('Share interaction ended');
        }
    };

    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => copyToClipboard());
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            
            // Visual Feedback
            const originalIcon = copyBtn.innerHTML;
            copyBtn.classList.add('copy-success');
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            
            setTimeout(() => {
                copyBtn.classList.remove('copy-success');
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
});