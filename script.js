
const navItems = document.getElementById('navItems');
const dropdown = document.getElementById('dropdown');
const dropdownBtn = dropdown.querySelector('.dropdown-btn');
const dropdownContent = document.getElementById('dropdownContent');
const items = Array.from(navItems.children);
console.log(items)
dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !navItems.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        const navWidth = entry.contentRect.width;
        const itemWidths = items.map(item => item.offsetWidth);
        let totalWidth = 0;
        let visibleItems = items.length;

        for (let i = 0; i < items.length; i++) {
            totalWidth += itemWidths[i];
            if (totalWidth > navWidth) {
                visibleItems = i;
                break;
            }
        }

        items.forEach((item, index) => {
            if (index < visibleItems) {
                item.style.display = 'block';
                const dropdownItem = dropdownContent.querySelector(`[data-index="${index}"]`);
                if (dropdownItem) dropdownItem.remove();
            } else {
                item.style.display = 'none';
                if (!dropdownContent.querySelector(`[data-index="${index}"]`)) {
                    const clone = item.cloneNode(true);
                    clone.setAttribute('data-index', index);
                    dropdownContent.appendChild(clone);
                }
            }
        });

        // Show/hide dropdown based on hidden items
        dropdown.style.display = visibleItems < items.length ? 'block' : 'none';
    }
});

resizeObserver.observe(navItems);