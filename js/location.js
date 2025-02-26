    // 漢堡
    document.addEventListener('DOMContentLoaded', () => {
    // 獲取所需元素
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.querySelector('.close-btn');
    const menu = document.getElementById('hamburger-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const contentPanels = document.querySelectorAll('.content-panel');
    let activeItem = null;

    const adminMenuItem = document.querySelector('.menu-item[data-tab="6"] .highlight-bar');
    const siteMapMenuItem = document.querySelector('.menu-item[data-tab="7"] .highlight-bar');
    
    // 隐藏高亮条
    if (adminMenuItem) {
        adminMenuItem.style.display = 'none';
    }
    if (siteMapMenuItem) {
        siteMapMenuItem.style.display = 'none';
    }
    // 切換選單
    function toggleMenu() {
        const isOpen = menu.style.right === '0px';
        
        if (isOpen) {
            menu.style.right = '-100%';
            document.body.style.overflow = '';
            
            // 重置所有面板和選單項目
            contentPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.transform = 'translateX(30px)';
                panel.style.opacity = '0';
                panel.style.display = 'none';
                panel.style.height = '0';
                
                // 確保面板回到原始位置
                const panelParent = document.querySelector('.content-container');
                if (panelParent && panel.parentElement !== panelParent) {
                    panelParent.appendChild(panel);
                }
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.style.backgroundColor = '';
                const text = item.querySelector('.menu-text');
                if (text) text.style.color = 'white';
            });
            
            activeItem = null;
        } else {
            menu.style.right = '0';
            document.body.style.overflow = 'hidden';
            
            // 重新初始化第一個選項
            if (window.innerWidth > 480) {
                const firstItem = menuItems[0];
                if (firstItem) {
                    firstItem.click();
                }
            }
        }
    }

    // 桌面版選單切換
    function switchDesktopContent(item) {
        const tabId = item.getAttribute('data-tab');
        const isSpecialTab = tabId === '6' || tabId === '7';

        // 重置所有面板
        contentPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.style.transform = 'translateX(30px)';
            panel.style.opacity = '0';
            panel.style.display = 'none';
        });

        // 重置所有選單項目
        menuItems.forEach(menuItem => {
            menuItem.classList.remove('active');
            menuItem.style.backgroundColor = '';
            const text = menuItem.querySelector('.menu-text');
            if (text) text.style.color = 'white';
        });

        // 設置新的活動項目
        item.classList.add('active');
        item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        const itemText = item.querySelector('.menu-text');
        if (itemText) itemText.style.color = 'white';

        if (isSpecialTab) return;

        // 啟用對應的面板
        const selectedPanel = document.getElementById(`content${tabId}`);
        if (selectedPanel) {
            selectedPanel.style.display = 'block';
            selectedPanel.classList.add('active');

            // 重新計算位置
            const menuContainer = document.querySelector('.menu-container');
            if (menuContainer) {
                const containerRect = menuContainer.getBoundingClientRect();
                const contentItems = selectedPanel.querySelectorAll('.content-item');
                
                contentItems.forEach((contentItem, index) => {
                    const correspondingMenuItem = menuItems[index];
                    if (correspondingMenuItem) {
                        const menuRect = correspondingMenuItem.getBoundingClientRect();
                        contentItem.style.position = 'absolute';
                        contentItem.style.top = `${menuRect.top - containerRect.top}px`;
                    }
                });
            }

            // 動畫效果
            requestAnimationFrame(() => {
                selectedPanel.style.transform = 'translateX(0)';
                selectedPanel.style.opacity = '1';
            });
        }

        activeItem = item;
    }

    // 手機版選單切換
    function switchMobileContent(item) {
        const tabId = item.getAttribute('data-tab');
        if (tabId === '6' || tabId === '7') return;

        const panel = document.getElementById(`content${tabId}`);
        if (!panel) return;

        const isExpanded = item.classList.contains('active');

        // 重置所有面板和選單項目
        menuItems.forEach(menuItem => {
            menuItem.classList.remove('active');
            const otherPanel = document.getElementById(`content${menuItem.getAttribute('data-tab')}`);
            if (otherPanel) {
                otherPanel.style.display = 'none';
                otherPanel.style.height = '0';
                otherPanel.style.transform = 'none';
                otherPanel.style.opacity = '1';
                // 確保面板回到原始位置
                const panelParent = document.querySelector('.content-container');
                if (panelParent && otherPanel.parentElement !== panelParent) {
                    panelParent.appendChild(otherPanel);
                }
            }
        });

        // 如果當前項目已經展開，則只做重置
        if (isExpanded) {
            return;
        }

        // 設置當前項目和面板的狀態
        item.classList.add('active');
        panel.style.display = 'block';
        panel.style.height = 'auto';
        
        // 將面板插入到正確位置
        const itemParent = item.parentNode;
        if (itemParent) {
            itemParent.insertBefore(panel, item.nextSibling);
        }
    }

    // 事件監聽
    hamburgerBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    
    menu.addEventListener('click', (e) => {
        if (e.target === menu) {
            toggleMenu();
        }
    });

    // 選單項目點擊
    menuItems.forEach(item => {
        const menuText = item.querySelector('.menu-text');

        if (menuText) {
            menuText.addEventListener('mouseenter', () => {
                if (window.innerWidth > 480) {
                    menuText.style.transform = 'translateX(10px)';
                    menuText.style.color = '#FFEFCB';
                }
            });

            menuText.addEventListener('mouseleave', () => {
                if (window.innerWidth > 480) {
                    menuText.style.transform = '';
                    menuText.style.color = item === activeItem ? 'white' : 'white';
                }
            });
        }

        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 480) {
                switchMobileContent(item);
            } else {
                switchDesktopContent(item);
            }
        });
    });

    // 視窗大小變化處理
    window.addEventListener('resize', () => {
        const contentContainer = document.querySelector('.content-container');
        
        if (window.innerWidth <= 480) {
            // 重置所有狀態
            menuItems.forEach(item => {
                item.classList.remove('active');
                const panel = document.getElementById(`content${item.getAttribute('data-tab')}`);
                if (panel) {
                    panel.style.display = 'none';
                    panel.style.height = '0';
                    // 確保面板回到原始位置
                    if (contentContainer && panel.parentElement !== contentContainer) {
                        contentContainer.appendChild(panel);
                    }
                }
            });
        } else {
            // 桌面版初始化
            menuItems.forEach(item => {
                item.classList.remove('active');
                const panel = document.getElementById(`content${item.getAttribute('data-tab')}`);
                if (panel) {
                    panel.style.display = 'none';
                }
            });
            const firstItem = menuItems[0];
            if (firstItem) firstItem.click();
        }
    });

    // 初始化
    if (window.innerWidth > 480) {
        const firstItem = menuItems[0];
        if (firstItem) firstItem.click();
    }
});
