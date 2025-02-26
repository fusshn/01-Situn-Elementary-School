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

    // -------音樂播放器-------
    const playPauseBtn = document.getElementById("playPauseBtn");
    const audio = document.getElementById("audio");
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.getElementById("progressContainer");
    const volumeControl = document.getElementById("volumeControl");
    const muteBtn = document.getElementById("muteBtn");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");
    const moreBtn = document.getElementById("moreBtn");
    const moreMenu = document.getElementById("moreMenu");
    const downloadBtn = document.getElementById("downloadBtn");

    // 播放/暫停功能
    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    // 更新進度條
    audio.addEventListener("timeupdate", function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + "%";

        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);

        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
        durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0" + durationSeconds : durationSeconds}`;
    });

    // 進度條拖動
    progressContainer.addEventListener("click", function (e) {
        const clickPosition = (e.offsetX / progressContainer.offsetWidth) * audio.duration;
        audio.currentTime = clickPosition;
    });

    // 音量控制
    volumeControl.addEventListener("input", function () {
        audio.volume = volumeControl.value;

        // 根據音量調整靜音/音量圖標
        if (audio.volume === 0) {
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // 當音量為0時顯示禁聲喇叭
        } else if (audio.volume === 1) {
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; // 當音量為最大時顯示正常喇叭
        } else {
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>'; // 當音量不為0或最大時顯示較小音量的喇叭
        }
    });

    // 靜音功能
    muteBtn.addEventListener("click", function () {
        if (audio.muted) {
            audio.muted = false;
            muteBtn.innerHTML = audio.volume === 0 ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        } else {
            audio.muted = true;
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // 按下靜音按鈕時顯示禁聲喇叭
        }
    });

    // 顯示/隱藏更多選項菜單
    moreBtn.addEventListener("click", function () {
        moreMenu.style.display = moreMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // 點擊下載按鈕進行下載
    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.href = audio.src; // 使用音頻的URL
        link.download = "school-song.mp3"; // 設定下載文件的名稱
        link.click(); // 觸發點擊下載
    });

    // -------左側導覽列隱藏-------
    window.addEventListener('scroll', function () {
        var leftSide = document.querySelector('.left-side');
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;
        var documentHeight = document.documentElement.scrollHeight;

        // 當滾動接近底部（離底部 300px 時），隱藏左側導覽列
        if (scrollPosition + windowHeight >= documentHeight - 300) {
            leftSide.style.opacity = '0';  // 導覽列完全透明
            leftSide.style.visibility = 'hidden';  // 完全隱藏導覽列
        } else {
            leftSide.style.opacity = '1';  // 恢復導覽列顯示
            leftSide.style.visibility = 'visible';  // 恢復可見性
        }
    });


