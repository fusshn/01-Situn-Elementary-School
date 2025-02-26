  // 西屯國小和校徽滾輪往下消失動畫
let lastScrollY = window.scrollY;
const title = document.querySelector('.fixed-title');
const hamburgerHeader = document.querySelector('.hamburger-header');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const bor1Element = document.querySelector('.bor1');
const banner = document.querySelector('.banner');
const navButtons = document.querySelector('.nav-buttons');
const newsButton = document.querySelector('.nav-button.news');
const calendarButton = document.querySelector('.nav-button.calendar');
const dividers = document.querySelectorAll('.divider');
const showThreshold = 100;

// 添加過渡效果
if (newsButton && calendarButton && navButtons) {
    [newsButton, calendarButton, ...dividers].forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
    navButtons.style.transition = 'all 0.3s ease';
}

// 平滑滾動效果
document.addEventListener('DOMContentLoaded', () => {
    const newsButton = document.querySelector('.nav-button.news');
    const calendarButton = document.querySelector('.nav-button.calendar');

    if (newsButton) {
        newsButton.addEventListener('click', (e) => {
            e.preventDefault();
            const newsSection = document.querySelector('#news');
            
            if (newsSection) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                const targetPosition = newsSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (calendarButton) {
        calendarButton.addEventListener('click', (e) => {
            e.preventDefault();
            const calendarSection = document.querySelector('.calendar-area');
            
            if (calendarSection) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                const targetPosition = calendarSection.offsetTop - navHeight - 100;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// 滾動處理
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const bor1Bottom = bor1Element?.getBoundingClientRect().bottom;
    const isMobile = window.innerWidth <= 480;

    if (currentScroll <= showThreshold) {
        // 展開狀態
        title.style.transform = 'translateY(0)';
        title.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
        logo.style.opacity = '1';

        if (newsButton && calendarButton && !isMobile) {
            newsButton.style.width = '180px';
            newsButton.style.opacity = '1';
            newsButton.style.padding = '';
            newsButton.style.margin = '';
            calendarButton.style.width = '180px';
            calendarButton.style.opacity = '1';
            calendarButton.style.padding = '';
            calendarButton.style.margin = '';
            
            dividers.forEach(divider => {
                divider.style.width = '34px';
                divider.style.opacity = '1';
                divider.style.margin = '';
            });

            navButtons.style.padding = '21px 60px 15px 20px';
            navButtons.style.backgroundColor = '#D70913a3';
            navButtons.style.marginRight = '-60px';
            navButtons.style.borderRadius = '0 0 0 60px';
            navButtons.style.position = 'relative';
            navButtons.style.top = 'auto';
            navButtons.style.right = 'auto';
            navButtons.style.width = 'auto';
        }
    } else {
        // 收縮狀態
        title.style.transform = 'translateY(-100%)';
        title.style.opacity = '0';
        logo.style.transform = 'translateY(-100%)';
        logo.style.opacity = '0';

        if (newsButton && calendarButton) {
            newsButton.style.width = '0';
            newsButton.style.opacity = '0';
            newsButton.style.padding = '0';
            newsButton.style.margin = '0';
            calendarButton.style.width = '0';
            calendarButton.style.opacity = '0';
            calendarButton.style.padding = '0';
            calendarButton.style.margin = '0';
            
            dividers.forEach(divider => {
                divider.style.width = '0';
                divider.style.opacity = '0';
                divider.style.margin = '0';
            });

            if (!isMobile) {
                navButtons.style.padding = '21px 20px';
                navButtons.style.backgroundColor = '#D70913a3';
                navButtons.style.marginRight = '0';
                navButtons.style.width = '120px';
                navButtons.style.minHeight = '80px';
                navButtons.style.display = 'flex';
                navButtons.style.justifyContent = 'center';
                navButtons.style.alignItems = 'center';
                navButtons.style.position = 'fixed';
                navButtons.style.top = '40px';
                navButtons.style.right = '-10px';
                navButtons.style.borderRadius = '0 0 0 15px';
                navButtons.style.padding = '11px 10px';
                navButtons.style.boxSizing = 'content-box';
            } else {
                navButtons.style.backgroundColor = 'transparent';
                navButtons.style.position = 'relative';
            }
        }
    }

    // 處理導航欄滾動隱藏
    if (bor1Bottom <= 0) {
        if (currentScroll > lastScrollY) {
            nav.style.transform = 'translateY(-100%)';
            nav.style.opacity = '0';
        } else if (bor1Bottom > -50) {
            nav.style.transform = 'translateY(0)';
            nav.style.opacity = '1';
        }
    } else {
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
    }

    lastScrollY = currentScroll;
}, { passive: true });

  


    // 貓頭鷹動畫
// 貓頭鷹動畫控制器
class OwlAnimationController {
    constructor() {
        this.owlContainer = document.querySelector("#owl-container");
        this.logo = document.querySelector("#logo");
        this.eyes = document.querySelectorAll('.eye');
        this.gsapTimeline = gsap.timeline();
        
        this.initializeAnimations();
        this.initializeEyeTracking();
    }

    // 初始化入場動畫
    initializeAnimations() {
        // 等待網頁載入完成後執行動畫
        window.addEventListener('load', () => {
            // 貓頭鷹飛入動畫
            this.gsapTimeline
                .fromTo(
                    "#owl-container",
                    {
                        left: '-200px',
                        rotation: -10,     // 初始旋轉角度
                        scale: 0.9         // 初始尺寸略小
                    },
                    {
                        left: '0px',
                        rotation: 0,       // 回正
                        scale: 1,          // 恢復原始大小
                        duration: 3,
                        ease: "elastic.out(1, 0.9)", // 回彈效果
                        transformOrigin: "center center"
                    }
                )
                // Logo 動畫
                .fromTo(
                    "#logo",
                    {
                        left: '-200px'
                    },
                    {
                        left: '80px',
                        duration: 3,
                        ease: "elastic.out(1, 0.9)", // 回彈效果
                    },
                    "-=3" // 與貓頭鷹同時開始
                );
        });
    }

    // 初始化眼睛追蹤
    initializeEyeTracking() {
        // 眼睛跟隨滑鼠移動
        document.addEventListener('mousemove', (event) => {
            this.eyes.forEach(eye => {
                const pupil = eye.querySelector('.pupil');
                if (!pupil) return;

                console.log(window.screen.width, window.screen.height);
                console.log(event.clientX, event.clientY);
                
                // 使用原始的計算方式
                let eyeCenterX = parseInt((event.clientX - window.screen.width / 2) / (window.screen.width / 2) * 17 - 50);
                let eyeCenterY = parseInt((event.clientY - window.screen.height / 2) / (window.screen.height / 2) * 17 - 50);
                
                // 使用原始的transform方式
                pupil.style.transform = `translate(calc(${eyeCenterX}%), calc(${eyeCenterY}%))`;
            });
        });
    }

    // 重置動畫
    reset() {
        this.gsapTimeline.clear();
        if (this.owlContainer) {
            gsap.set(this.owlContainer, { clearProps: "all" });
        }
        if (this.logo) {
            gsap.set(this.logo, { clearProps: "all" });
        }
    }
}

// 初始化動畫控制器
document.addEventListener('DOMContentLoaded', () => {
    const owlController = new OwlAnimationController();
});

// 最新消息 行事曆右上角平滑滾動效果
// 平滑滾動導航
document.addEventListener('DOMContentLoaded', () => {
    // 選擇導航按鈕
    const newsButton = document.querySelector('.nav-button.news');
    const calendarButton = document.querySelector('.nav-button.calendar');

    // 點擊最新消息按鈕的處理
    if (newsButton) {
        newsButton.addEventListener('click', (e) => {
            e.preventDefault();
            const newsSection = document.querySelector('#news');
            
            if (newsSection) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                const targetPosition = newsSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 點擊行事曆按鈕的處理
    if (calendarButton) {
        calendarButton.addEventListener('click', (e) => {
            e.preventDefault();
            // 修改選擇器，明確指向行事曆區塊
            const calendarSection = document.querySelector('.calendar-section');
            
            if (calendarSection) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                // 計算行事曆標題的位置
                const calendarTitle = document.querySelector('.calendar-area-title');
                const titleOffset = calendarTitle ? calendarTitle.offsetTop : 0;
                
                window.scrollTo({
                    top: calendarSection.offsetTop + titleOffset - navHeight - 100,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 移除原有的 href="#calendar" 行為
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#calendar') {
                e.preventDefault();
            }
        });
    });
});





// 連結網頁
document.querySelectorAll('.feature-content-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function() {
        if(this.classList.contains('bilingual')) {
            window.location.href = 'http://127.0.0.1:5500/%E5%B0%8F%E7%B5%84/FCU-11309-STES/Elementary%20school%20project/Xitun%20Elementary%20School/BilingualEducation.html';
        } else if(this.classList.contains('gifted')) {
            // 資優生頁面的連結
            window.location.href = '資優生頁面的URL';
        } else if(this.classList.contains('outstanding')) {
            // 傑出表現頁面的連結
            window.location.href = '傑出表現頁面的URL';
        }
    });
});















    
    //行事曆
const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");

// 活動資訊
const events = {
    "2025-01-13": [
        { title: "運動會", description: "運動會熱血沸騰，齊心協力，每一步都展現活力，為榮耀全力以赴！" },
        { title: "校慶", description: "校慶歡樂時光，全校師生齊聚一堂，共同回顧歷史，展望未來新篇章！" }
    ],
    "2025-01-26": [
        { title: "園遊會", description: "集美食、遊戲與表演活動的歡樂盛會，適合朋友們一同參與。" }
    ],
    "2025-02-28": [
        { title: "和平紀念日", description: "銘記歷史，珍惜和平，反思過去，邁向和諧共融的未來。" },
    ],
    "2025-03-08": [
        { title: "婦女節", description: "向所有女性致敬，感謝她們的付出與貢獻，祝福她們永遠健康快樂。" }
    ],
    "2025-03-12": [
        { title: "植樹節", description: "綠色環保，從我做起，讓我們一起為地球盡一份心力。" }
    ],
    "2025-04-01": [
        { title: "愚人節", description: "愚人節快樂！記得要提防身邊的小惡作劇哦！" }
    ],
    "2025-04-04": [
        { title: "清明節", description: "清明掃墓，緬懷先人，祭拜祖先，感恩生活。" }
    ],
    "2025-04-22": [
        { title: "地球日", description: "地球是我們共同的家園，讓我們一起守護地球，保護環境。" }
    ],
    "2025-05-01": [
        { title: "勞動節", description: "勞動最光榮，勞動最快樂，讓我們一起為美好生活努力奮鬥！" }
    ],
    "2025-05-31": [
        { title: "端午節", description: "吃粽子、賽龍舟，傳統節日樂無窮，祝大家端午節快樂！" }
    ],
    "2025-09-06": [
        { title: "中秋節中秋節", description: "賞月、吃月餅，團圓共度佳節，祝大家中秋節快樂！" }
    ],

    
};

// 當前日期
let currentDate = new Date();

// 更新活動詳情
function updateEventDetails(date) {
    if (events[date]) {
        eventTitle.textContent = date + " 的活動";
        eventDescription.innerHTML = events[date].map(event => `
            <div class="event">
                <h4>${event.title}</h4>
                <p>${event.description}</p>
            </div>
        `).join('');
    } else {
        eventTitle.textContent = "選擇日期以查看活動";
        eventDescription.textContent = "暫無活動資訊";
    }
}

// 更新月曆
let selectedDayElement = null;

function updateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    monthYear.textContent = `${year}年 ${month + 1}月`;
    daysContainer.innerHTML = "";

    // 填充空白格（上月）
    for (let i = firstDay - 1; i >= 0; i--) {
        const prevDate = prevLastDate - i;
        const fullDate = `${month === 0 ? year - 1 : year}-${month === 0 ? 12 : String(month).padStart(2, "0")}-${String(prevDate).padStart(2, "0")}`;
        const dayElement = document.createElement("div");
        dayElement.classList.add("empty-day");
        dayElement.innerHTML = `<div class="day-content">${prevDate}</div>`;
        daysContainer.appendChild(dayElement);
    }

    // 填充當月日期
    for (let day = 1; day <= lastDate; day++) {
        const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerHTML = `<div class="day-content">${day}</div>`;

        // 如果有活動，添加事件類名
        if (events[fullDate]) {
            dayElement.classList.add("event");
        }

        dayElement.addEventListener("click", () => {
            if (selectedDayElement) {
                selectedDayElement.classList.remove("selected-day");
            }
            dayElement.classList.add("selected-day");
            selectedDayElement = dayElement;
            updateEventDetails(fullDate);
        });

        daysContainer.appendChild(dayElement);
    }

    // 填充空白格（下月）
    const totalCells = daysContainer.children.length;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
        const nextDate = i;
        const fullDate = `${month === 11 ? year + 1 : year}-${month === 11 ? "01" : String(month + 2).padStart(2, "0")}-${String(nextDate).padStart(2, "0")}`;
        const dayElement = document.createElement("div");
        dayElement.classList.add("empty-day");
        dayElement.innerHTML = `<div class="day-content">${nextDate}</div>`;
        daysContainer.appendChild(dayElement);
    }
}

// 切換月份
prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar(currentDate);
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar(currentDate);
});

// 初始化
updateCalendar(currentDate);

 
 
 












 
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











  

    // Go-top 按鈕控制
    const goTopBtn = document.getElementById('goTop');
    const rightImage = document.querySelector('.right-image');
    const bor1 = document.querySelector('.bor');  // 選取城堡圖片元素

    // 監聽滾動事件
    window.addEventListener('scroll', () => {
        const rightImageRect = rightImage.getBoundingClientRect();
        const bor1Rect = bor1.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 檢查是否在有效的顯示範圍內：
        // 1. right-image 底部已進入視窗
        // 2. 城堡圖片底部還沒離開視窗
        if (rightImageRect.bottom <= windowHeight &&
            bor1Rect.bottom > windowHeight) {
            goTopBtn.classList.add('show');
        } else {
            goTopBtn.classList.remove('show');
        }
    });

    // 點擊按鈕滾動到頂部
    goTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });




    // 球動畫
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".school-info",
            start: "top 5%",     // 改為螢幕中心開始
            end: "bottom bottom",    // 延長到區塊底部
            scrub: 1,               // 降低 scrub 值讓動畫更跟隨滾動
            // markers: true,       // 需要調試時可以打開
            toggleActions: "play none none reverse"
        }
    });

    tl.to("#ball", {
        x: 735,
        y: 400,
        duration: 1,
        ease: "none",    // 使用 none 來更好地跟隨滾動
        zIndex: 5,
    })
        .to("#ball", {
            x: 1100,
            y: 750,
            duration: 1,
            ease: "none",
            zIndex: 5,
        })
        .to("#ball", {
            x: 150,
            y: 1700,
            duration: 1,
            ease: "none",
            zIndex: 5,
        });























  // 輪播動畫
// 輪播照片處理器
class CarouselHandler {
    constructor() {
        this.photosGrid = document.querySelector('.photos-grid');
        this.items = [
            { image: "./img/輪播卡片1.png", description: "學校宣社區聯合運動會" },
            { image: "./img/輪播卡片2.png", description: "家長關懷" },
            { image: "./img/輪播卡片3.png", description: "國際躲避球競賽" },
            { image: "./img/輪播卡片4.png", description: "最優選班級" },
            { image: "./img/輪播照片5.png", description: "國際交換學生活動" }
        ];
        
        this.animation = null;
        this.isDown = false;
        this.startX = null;
        this.scrollLeft = null;
        this.isMobile = window.innerWidth <= 480;
    }

    init() {
        // 清理現有狀態
        this.destroy();
        
        if (this.isMobile) {
            this.initMobileView();
        } else {
            this.initDesktopView();
        }

        // 監聽視窗大小變化
        window.removeEventListener('resize', this.handleResize);
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initDesktopView() {
        // 生成多組輪播內容
        const allItems = [...this.items, ...this.items, ...this.items, ...this.items];
        const content = allItems.map((item, index) => `
            <div class="photo-card${index % 2 === 0 ? ' card-up' : ' card-down'}">
                <div class="photo-container">
                    <img src="${item.image}" alt="${item.description}" class="photo-img">
                </div>
                <p class="photo-description"><span>2024</span>&nbsp;${item.description}</p>
            </div>
        `).join('');

        this.photosGrid.innerHTML = content;
        
        // 設置桌面版動畫
        const cardWidth = document.querySelector('.photo-card').offsetWidth;
        const gap = parseInt(window.getComputedStyle(this.photosGrid).gap);
        const itemSetWidth = (cardWidth + gap) * this.items.length;

        gsap.set(this.photosGrid, { x: -itemSetWidth });

        this.animation = gsap.to(this.photosGrid, {
            x: `-=${itemSetWidth}`,
            duration: 20,
            ease: "none",
            repeat: -1,
            onRepeat: () => {
                gsap.set(this.photosGrid, { x: -itemSetWidth });
            }
        });

        // 桌面版事件綁定
        this.bindDesktopEvents(itemSetWidth);
    }

    initMobileView() {
        // 生成移動版內容
        const content = this.items.map(item => `
            <div class="photo-card">
                <div class="photo-container">
                    <img src="${item.image}" alt="${item.description}" class="photo-img">
                </div>
                <p class="photo-description"><span>2024</span>&nbsp;${item.description}</p>
            </div>
        `).join('');

        this.photosGrid.innerHTML = content;

        // 設置移動版樣式
        this.photosGrid.style.cssText = `
            display: flex;
            gap: 15px;
            padding: 20px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
        `;

        // 設置卡片樣式
        const cards = this.photosGrid.querySelectorAll('.photo-card');
        cards.forEach(card => {
            card.style.cssText = `
                flex: 0 0 280px;
                scroll-snap-align: start;
                transform: none !important;
            `;
        });

        // 綁定移動版事件
        this.bindMobileEvents();
    }

    bindDesktopEvents(itemSetWidth) {
        this.photosGrid.addEventListener('mouseenter', () => {
            if (this.animation) this.animation.pause();
        });

        this.photosGrid.addEventListener('mousemove', (e) => {
            if (this.isDown) return;

            const { x, totalWidth } = this.getRelativeMousePosition(e);
            const triggerZone = totalWidth * 0.25;

            if (this.animation) this.animation.kill();

            // 根據滑鼠位置決定動畫方向
            if (x < triggerZone) {
                this.animation = this.createAnimation(itemSetWidth, '+');
            } else if (x > totalWidth - triggerZone) {
                this.animation = this.createAnimation(itemSetWidth, '-');
            }
        });

        this.photosGrid.addEventListener('mouseleave', () => {
            if (!this.isDown) {
                if (this.animation) this.animation.kill();
                this.animation = this.createAnimation(itemSetWidth, '-');
            }
        });

        // 拖動功能
        this.bindDragEvents(itemSetWidth);
    }

    bindMobileEvents() {
    // 觸控事件
    this.photosGrid.addEventListener('touchstart', (e) => {
        this.startX = e.touches[0].clientX;
        this.scrollLeft = this.photosGrid.scrollLeft;
        this.photosGrid.style.cursor = 'grabbing';
    });

    this.photosGrid.addEventListener('touchmove', (e) => {
        if (!this.startX) return;
        e.preventDefault();
        const x = e.touches[0].clientX;
        const walk = (this.startX - x) * 1.5;
        this.photosGrid.scrollLeft = this.scrollLeft + walk;
    });

    this.photosGrid.addEventListener('touchend', () => {
        this.startX = null;
        this.photosGrid.style.cursor = 'grab';
    });

    // 滑鼠事件
    this.photosGrid.addEventListener('mousedown', (e) => {
        this.isDown = true;
        this.startX = e.pageX - this.photosGrid.offsetLeft;
        this.scrollLeft = this.photosGrid.scrollLeft;
        this.photosGrid.style.cursor = 'grabbing';
    });

    this.photosGrid.addEventListener('mousemove', (e) => {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.photosGrid.offsetLeft;
        const walk = (this.startX - x) * 2;
        this.photosGrid.scrollLeft = this.scrollLeft + walk;
    });

    this.photosGrid.addEventListener('mouseup', () => {
        this.isDown = false;
        this.photosGrid.style.cursor = 'grab';
    });

    this.photosGrid.addEventListener('mouseleave', () => {
        this.isDown = false;
        this.photosGrid.style.cursor = 'grab';
    });
}

    bindDragEvents(itemSetWidth) {
        this.photosGrid.addEventListener('mousedown', (e) => {
            this.isDown = true;
            this.photosGrid.style.cursor = 'grabbing';
            this.startX = e.pageX;
            this.startScrollLeft = gsap.getProperty(this.photosGrid, "x");
            if (this.animation) this.animation.kill();
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDown) return;
            e.preventDefault();

            const x = e.pageX;
            const walk = (x - this.startX);
            let newX = this.startScrollLeft + walk;

            if (newX > 0) {
                newX = -itemSetWidth * 2 + (newX % itemSetWidth);
            } else if (newX < -itemSetWidth * 3) {
                newX = -itemSetWidth + ((newX + itemSetWidth * 3) % itemSetWidth);
            }

            gsap.set(this.photosGrid, { x: newX });
        });

        document.addEventListener('mouseup', () => {
            if (!this.isDown) return;
            this.isDown = false;
            this.photosGrid.style.cursor = 'grab';

            this.animation = this.createAnimation(itemSetWidth, '-');
        });
    }

    handleMouseDown(e) {
        this.isDown = true;
        this.startX = e.pageX - this.photosGrid.offsetLeft;
        this.scrollLeft = this.photosGrid.scrollLeft;
        this.photosGrid.style.cursor = 'grabbing';
    }

    handleMouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.photosGrid.offsetLeft;
        const walk = (this.startX - x) * 2;
        this.photosGrid.scrollLeft = this.scrollLeft + walk;
    }

    handleMouseUp() {
        this.isDown = false;
        this.photosGrid.style.cursor = 'grab';
    }

    handleMouseLeave() {
        this.isDown = false;
        this.photosGrid.style.cursor = 'grab';
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].pageX - this.photosGrid.offsetLeft;
        this.scrollLeft = this.photosGrid.scrollLeft;
    }

    handleTouchMove(e) {
        if (!this.startX) return;
        e.preventDefault();
        const x = e.touches[0].pageX - this.photosGrid.offsetLeft;
        const walk = (this.startX - x) * 1.5;
        this.photosGrid.scrollLeft = this.scrollLeft + walk;
    }

    handleTouchEnd() {
        this.startX = null;
    }

    getRelativeMousePosition(e) {
        const parentRect = this.photosGrid.parentElement.getBoundingClientRect();
        return {
            x: e.clientX - parentRect.left,
            totalWidth: parentRect.width
        };
    }

    createAnimation(itemSetWidth, direction) {
        return gsap.to(this.photosGrid, {
            x: `${direction}=${itemSetWidth}`,
            duration: 20,
            ease: "none",
            repeat: -1,
            onRepeat: () => {
                gsap.set(this.photosGrid, { x: -itemSetWidth });
            }
        });
    }

    handleResize() {
        const newIsMobile = window.innerWidth <= 480;
        if (this.isMobile !== newIsMobile) {
            this.isMobile = newIsMobile;
            this.init();
        }
    }

    destroy() {
        // 清理動畫
        if (this.animation) {
            this.animation.kill();
            this.animation = null;
        }

        // 清理事件監聽器
        this.photosGrid?.replaceWith(this.photosGrid.cloneNode(true));
        this.photosGrid = document.querySelector('.photos-grid');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new CarouselHandler();
    carousel.init();
});

// 影片區域處理器
class VideoSectionHandler {
    constructor() {
        this.videoGrid = document.querySelector('.video-grid');
        this.isMobile = window.innerWidth <= 480;
        this.isDown = false;
        this.startX = null;
        this.scrollLeft = null;
    }

    init() {
        if (this.isMobile) {
            this.setupMobileView();
        } else {
            this.setupDesktopView();
        }

        // 監聽視窗大小變化
        window.removeEventListener('resize', this.handleResize);
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupMobileView() {
        // 設置移動版樣式
        this.videoGrid.style.cssText = `
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 15px;
            padding: 10px 20px;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
            cursor: grab;
        `;

        // 設置卡片樣式
        const cards = this.videoGrid.querySelectorAll('.video-card');
        cards.forEach(card => {
            card.style.cssText = `
                flex: 0 0 280px;
                scroll-snap-align: start;
                width: 280px;
            `;
        });

        // 隱藏滾動條
        const style = document.createElement('style');
        style.textContent = `
            .video-grid::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(style);

        this.bindMobileEvents();
    }

    setupDesktopView() {
        // 重置為桌面版樣式
        this.videoGrid.style = '';
        const cards = this.videoGrid.querySelectorAll('.video-card');
        cards.forEach(card => {
            card.style = '';
        });
    }

    bindMobileEvents() {
        // 觸控事件
        this.videoGrid.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.videoGrid.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.videoGrid.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // 滑鼠事件
        this.videoGrid.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.videoGrid.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.videoGrid.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.videoGrid.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].pageX - this.videoGrid.offsetLeft;
        this.scrollLeft = this.videoGrid.scrollLeft;
    }

    handleTouchMove(e) {
        if (!this.startX) return;
        e.preventDefault();
        const x = e.touches[0].pageX - this.videoGrid.offsetLeft;
        const walk = (this.startX - x) * 1.5;
        this.videoGrid.scrollLeft = this.scrollLeft + walk;
    }

    handleTouchEnd() {
        this.startX = null;
    }

    handleMouseDown(e) {
        this.isDown = true;
        this.videoGrid.style.cursor = 'grabbing';
        this.startX = e.pageX - this.videoGrid.offsetLeft;
        this.scrollLeft = this.videoGrid.scrollLeft;
    }

    handleMouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.videoGrid.offsetLeft;
        const walk = (this.startX - x) * 2;
        this.videoGrid.scrollLeft = this.scrollLeft + walk;
    }

    handleMouseUp() {
        this.isDown = false;
        this.videoGrid.style.cursor = 'grab';
    }

    handleResize = () => {
        const newIsMobile = window.innerWidth <= 480;
        if (this.isMobile !== newIsMobile) {
            this.isMobile = newIsMobile;
            this.destroy();
            this.init();
        }
    }

    destroy() {
        // 移除所有事件監聽器
        this.videoGrid?.replaceWith(this.videoGrid.cloneNode(true));
        this.videoGrid = document.querySelector('.video-grid');

        // 清理樣式
        const existingStyle = document.querySelector('style[data-video-grid]');
        if (existingStyle) {
            existingStyle.remove();
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const videoSection = new VideoSectionHandler();
    videoSection.init();
});




