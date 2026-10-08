(() => {
  const componentScript = document.currentScript;
  const banner = document.querySelector(".site-header");

  if (!componentScript || !banner) return;

  const componentUrl = new URL(componentScript.src, document.baseURI);
  const siteRoot = new URL("../", componentUrl);
  const currentUrl = new URL(window.location.href);
  const relativePath = decodeURIComponent(
    currentUrl.pathname.slice(siteRoot.pathname.length)
  ).replace(/^\/+/, "");

  const activeSection = relativePath.startsWith("characters/")
    ? "characters"
    : relativePath.startsWith("story/")
      ? "stories"
      : relativePath === "map.html"
        ? "map"
        : relativePath === "timeline.html"
          ? "timeline"
          : "home";

  const pageUrl = path => new URL(path, siteRoot).href;
  const navigation = [
    ["home", "index.html", "主页"],
    ["characters", "characters/index.html", "人物志"],
    ["stories", "story/index.html", "记闻"],
    ["map", "map.html", "地图"],
    ["timeline", "timeline.html", "时间线"],
    ["fanfic", "fanfic.html", "杂谈"]
  ];

  banner.id = "site-banner";
  banner.innerHTML = `
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="打开导航菜单">
      <span></span><span></span><span></span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="主导航">
      ${navigation.map(([key, path, label]) => `
        <a href="${pageUrl(path)}"${key === activeSection ? ' aria-current="page"' : ""}>${label}</a>
      `).join("")}
    </nav>
    <a class="account" href="${pageUrl("user.html")}" aria-label="泥的用户中心">泥</a>
  `;

  /* Banner 的配色与视觉细节继续由各页面原有的 CSS 控制，以保留角色页不同主题。 */
  /*
  const style = document.createElement("style");
  style.textContent = `
    #site-banner.site-header {
      position: sticky;
      top: 0;
      z-index: 20;
      height: 62px;
      padding: 0 102px;
      display: flex;
      align-items: center;
      background: var(--banner, var(--banner-bg, #8a7d70));
      border-bottom: 1px solid var(--banner-border, rgba(71, 61, 49, .22));
    }

    #site-banner .site-nav {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 48px;
      margin-right: auto;
    }

    #site-banner .site-nav a {
      position: relative;
      color: #fff;
      text-decoration: none;
      white-space: nowrap;
      font: 400 22px/1 Zhaohua, var(--serif, Georgia, serif);
      transition: opacity .2s ease, transform .2s ease;
    }

    #site-banner .site-nav a:hover,
    #site-banner .site-nav a:focus-visible,
    #site-banner .account:hover,
    #site-banner .account:focus-visible {
      opacity: .76;
      transform: scale(1.06);
    }

    #site-banner .site-nav a[aria-current="page"]::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: -8px;
      left: 0;
      height: 1px;
      background: rgba(255, 255, 255, .78);
    }

    #site-banner .account {
      position: relative;
      width: 40px;
      height: 40px;
      color: transparent;
      font-size: 0;
      text-decoration: none;
      transition: opacity .2s ease, transform .2s ease;
    }

    #site-banner .account::before,
    #site-banner .account::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border: 3px solid #fff;
    }

    #site-banner .account::before {
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    #site-banner .account::after {
      bottom: 4px;
      width: 24px;
      height: 12px;
      border-radius: 18px 18px 4px 4px;
    }

    #site-banner .menu-toggle {
      display: none;
    }

    @media (max-width: 1100px) {
      #site-banner.site-header {
        padding-inline: 34px;
      }

      #site-banner .site-nav {
        gap: 30px;
      }

      #site-banner .site-nav a {
        font-size: 21px;
      }
    }

    @media (max-width: 760px) {
      #site-banner.site-header {
        padding-inline: 18px;
        justify-content: space-between;
      }

      #site-banner .site-nav {
        position: absolute;
        top: 62px;
        right: 0;
        left: 0;
        height: auto;
        padding: 10px 18px 16px;
        display: none;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        background: var(--mobile-menu-bg, var(--banner, var(--banner-bg, #8a7d70)));
        box-shadow: 0 12px 24px var(--menu-shadow, rgba(71, 61, 49, .14));
      }

      #site-banner .site-nav.is-open {
        display: flex;
      }

      #site-banner .site-nav a {
        width: 100%;
        padding: 12px 14px;
        font-size: 20px;
        text-align: left;
      }

      #site-banner .site-nav a[aria-current="page"]::after {
        right: auto;
        bottom: 7px;
        left: 14px;
        width: 24px;
      }

      #site-banner .menu-toggle {
        width: 40px;
        height: 40px;
        padding: 9px 7px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border: 0;
        background: transparent;
        cursor: pointer;
      }

      #site-banner .menu-toggle span {
        width: 100%;
        height: 2px;
        display: block;
        background: #fff;
        transition: .2s ease;
      }

      #site-banner .menu-toggle.is-open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      #site-banner .menu-toggle.is-open span:nth-child(2) {
        opacity: 0;
      }

      #site-banner .menu-toggle.is-open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }

    @media (max-width: 480px) {
      #site-banner .account {
        display: none;
      }
    }
  `;
  document.head.append(style);
  */

  const menuButton = banner.querySelector(".menu-toggle");
  const siteNav = banner.querySelector(".site-nav");
  const closeMenu = () => {
    siteNav.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "打开导航菜单");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
  });

  siteNav.addEventListener("click", event => {
    if (event.target.closest("a") && window.innerWidth <= 760) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
})();
