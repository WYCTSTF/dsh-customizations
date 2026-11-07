window.__ModuleLoader__.load({
  id: 'dsh-whale-girl-decoration',
  factory(require) {
    const React = require('react');
    const { useState, useEffect } = require('react');
    const h = React.createElement;

    const THEME_KEY = 'rio-theme-mode'; // 'glass1' | 'glass2' | 'default'
    const THEMES = {
      glass1: { attr: 'glass-1', label: '理央主题 Ⅰ', bg: '/rio-theme/bg-1.jpg?v=1' },
      glass2: { attr: 'glass-2', label: '理央主题 Ⅱ', bg: '/rio-theme/bg-2.jpg?v=1' },
      default: { attr: 'default', label: '默认外观', bg: null },
    };

    // Build-hash class prefixes of the dsh web frontend. These change with
    // every frontend rebuild; when the theme visually breaks after a dsh
    // upgrade, re-locate them via docs/debug-recipes.md and update ONLY this
    // table. Readable-name selectors (composerSeat, bannerWrap, fade fallbacks)
    // are hash-independent and kept as extra fallbacks.
    const HASH = {
      layout: 'pI_x6G',        // shell frame / sidebarCol / centerCol / bottomRow (dsh-client-ui-layout)
      composer: 'uV2eYG',      // composer area root fade (chat UI)
      chatView: 'wSkVaW',      // chat view body / scrollBody (chat UI)
      sessionList: 'bhn1Oq',   // sidebar session-list bottom fade
      settingsAccount: 'yHnPSG', // sidebar settings footer (account module)
      settingsGeneral: 'VOzbGW', // sidebar settings trigger row (general module)
    };

    // Frosted-glass overrides. The app frame paints opaque backgrounds via
    // --dsw-alias-bg-base / --dsw-specific-sidebar-fill; we make them
    // translucent and blur whatever shows through. Panel classnames are build
    // hashes from dsh-client-ui-layout (pI_x6G_*); structural fallbacks cover
    // the same columns in case the hash changes between builds.
    const GLASS_VARS = (lightBase, lightSidebar, lightL1, lightL2, lightL3, darkBase, darkSidebar, darkL1, darkL2, darkL3) => `
      html[data-rio-theme="glass-1"] body, html[data-rio-theme="glass-2"] body {
        --dsw-alias-bg-base: color-mix(in srgb, ${lightBase} 55%, transparent);
        --dsw-specific-sidebar-fill: color-mix(in srgb, ${lightSidebar} 46%, transparent);
        --dsw-alias-bg-layer-1: color-mix(in srgb, ${lightL1} 55%, transparent);
        --dsw-alias-bg-layer-2: color-mix(in srgb, ${lightL2} 62%, transparent);
        --dsw-alias-bg-layer-3: color-mix(in srgb, ${lightL3} 70%, transparent);
        --dsw-alias-bg-module-platform: color-mix(in srgb, ${lightSidebar} 45%, transparent);
      }
      html[data-rio-theme="glass-1"] body[data-ds-dark-theme],
      html[data-rio-theme="glass-2"] body[data-ds-dark-theme] {
        --dsw-alias-bg-base: color-mix(in srgb, ${darkBase} 60%, transparent);
        --dsw-specific-sidebar-fill: color-mix(in srgb, ${darkSidebar} 54%, transparent);
        --dsw-alias-bg-layer-1: color-mix(in srgb, ${darkL1} 58%, transparent);
        --dsw-alias-bg-layer-2: color-mix(in srgb, ${darkL2} 66%, transparent);
        --dsw-alias-bg-layer-3: color-mix(in srgb, ${darkL3} 74%, transparent);
        --dsw-alias-bg-module-platform: color-mix(in srgb, ${darkSidebar} 50%, transparent);
      }
    `;

    const THEME_CSS = `
      ${GLASS_VARS('#f7f2f6', '#f6ecf3', '#f9f5f8', '#f9f5f8', '#f7f3f7', '#14121a', '#191522', '#17131f', '#17131f', '#191524')}
      html[data-rio-theme="glass-1"] body {
        background: url('${THEMES.glass1.bg}') center / cover no-repeat fixed;
      }
      html[data-rio-theme="glass-2"] body {
        background: url('${THEMES.glass2.bg}') center / cover no-repeat fixed;
      }
      html[data-rio-theme="glass-1"] .${HASH.layout}_sidebarCol,
      html[data-rio-theme="glass-1"] .${HASH.layout}_centerCol,
      html[data-rio-theme="glass-1"] .${HASH.layout}_bottomRow,
      html[data-rio-theme="glass-1"] [class*="sidebarCol"],
      html[data-rio-theme="glass-1"] [class*="centerCol"],
      html[data-rio-theme="glass-1"] [class*="bottomRow"],
      html[data-rio-theme="glass-2"] .${HASH.layout}_sidebarCol,
      html[data-rio-theme="glass-2"] .${HASH.layout}_centerCol,
      html[data-rio-theme="glass-2"] .${HASH.layout}_bottomRow,
      html[data-rio-theme="glass-2"] [class*="sidebarCol"],
      html[data-rio-theme="glass-2"] [class*="centerCol"],
      html[data-rio-theme="glass-2"] [class*="bottomRow"] {
        backdrop-filter: blur(26px) saturate(150%);
        -webkit-backdrop-filter: blur(26px) saturate(150%);
      }
      html[data-rio-theme="glass-1"] .${HASH.layout}_frame,
      html[data-rio-theme="glass-1"] [class*="_frame"],
      html[data-rio-theme="glass-2"] .${HASH.layout}_frame,
      html[data-rio-theme="glass-2"] [class*="_frame"] {
        background: transparent;
      }
      /* The bottom row spans the full window width; its own translucent
         background is what shows up as a white band over the wallpaper. Keep
         only the blur on it and let the composer card carry the fill. */
      html[data-rio-theme="glass-1"] .${HASH.layout}_bottomRow,
      html[data-rio-theme="glass-1"] [class*="bottomRow"],
      html[data-rio-theme="glass-2"] .${HASH.layout}_bottomRow,
      html[data-rio-theme="glass-2"] [class*="bottomRow"] {
        background: transparent !important;
        background-color: transparent !important;
      }
      html[data-rio-theme="glass-1"] [class*="bannerWrap"],
      html[data-rio-theme="glass-2"] [class*="bannerWrap"] {
        background-color: transparent !important;
      }
      /* Chat composer area root: paints a white fade-out gradient behind the
         input box; flatten it so the wallpaper shows through. The fade may
         live on the element itself or on its ::before/::after. */
      html[data-rio-theme="glass-1"] [class*="${HASH.composer}"],
      html[data-rio-theme="glass-2"] [class*="${HASH.composer}"] {
        background-image: none !important;
      }
      html[data-rio-theme="glass-1"] [class*="${HASH.composer}_root"],
      html[data-rio-theme="glass-2"] [class*="${HASH.composer}_root"] {
        background: transparent !important;
        background-image: none !important;
      }
      html[data-rio-theme="glass-1"] [class*="${HASH.composer}_root"]::before,
      html[data-rio-theme="glass-1"] [class*="${HASH.composer}_root"]::after,
      html[data-rio-theme="glass-2"] [class*="${HASH.composer}_root"]::before,
      html[data-rio-theme="glass-2"] [class*="${HASH.composer}_root"]::after {
        background: transparent !important;
        background-image: none !important;
      }
      /* Sidebar session-list bottom fade (transparent → sidebar-fill
         gradient strip): remove it so the wallpaper stays clean. */
      html[data-rio-theme="glass-1"] [class*="${HASH.sessionList}_fade"],
      html[data-rio-theme="glass-2"] [class*="${HASH.sessionList}_fade"] {
        background: transparent !important;
        background-image: none !important;
      }
      /* Sidebar settings-area footer (behind the theme switch button):
         flatten its resting background, keep a hover cue on the trigger. */
      html[data-rio-theme="glass-1"] [class*="${HASH.settingsAccount}_root"],
      html[data-rio-theme="glass-1"] [class*="${HASH.settingsGeneral}_triggerRow"],
      html[data-rio-theme="glass-1"] [class*="${HASH.settingsAccount}_trigger"],
      html[data-rio-theme="glass-2"] [class*="${HASH.settingsAccount}_root"],
      html[data-rio-theme="glass-2"] [class*="${HASH.settingsGeneral}_triggerRow"],
      html[data-rio-theme="glass-2"] [class*="${HASH.settingsAccount}_trigger"] {
        background: transparent !important;
        background-color: transparent !important;
      }
      html[data-rio-theme="glass-1"] [class*="${HASH.settingsAccount}_trigger"]:hover,
      html[data-rio-theme="glass-2"] [class*="${HASH.settingsAccount}_trigger"]:hover {
        background-color: var(--dsw-alias-interactive-bg-hover) !important;
      }
      /* Composer seat: full-width transparent-to-white gradient backing the
         input area — this is the white band over the wallpaper. */
      html[data-rio-theme="glass-1"] [class*="composerSeat"],
      html[data-rio-theme="glass-2"] [class*="composerSeat"] {
        background: transparent !important;
        background-image: none !important;
        background-color: transparent !important;
      }
      /* Composer scroll body: paints a white scroll-fade backing behind the
         input area (identified via elementsFromPoint). */
      html[data-rio-theme="glass-1"] [class*="${HASH.chatView}_body"],
      html[data-rio-theme="glass-1"] [class*="${HASH.chatView}_scrollBody"],
      html[data-rio-theme="glass-2"] [class*="${HASH.chatView}_body"],
      html[data-rio-theme="glass-2"] [class*="${HASH.chatView}_scrollBody"] {
        background: transparent !important;
        background-image: none !important;
        background-color: transparent !important;
      }
      html[data-rio-theme="glass-1"] [class*="${HASH.chatView}_body"]::before,
      html[data-rio-theme="glass-1"] [class*="${HASH.chatView}_body"]::after,
      html[data-rio-theme="glass-1"] [class*="${HASH.chatView}_scrollBody"]::before,
      html[data-rio-theme="glass-1"] [class*="${HASH.chatView}_scrollBody"]::after,
      html[data-rio-theme="glass-2"] [class*="${HASH.chatView}_body"]::before,
      html[data-rio-theme="glass-2"] [class*="${HASH.chatView}_body"]::after,
      html[data-rio-theme="glass-2"] [class*="${HASH.chatView}_scrollBody"]::before,
      html[data-rio-theme="glass-2"] [class*="${HASH.chatView}_scrollBody"]::after {
        background: transparent !important;
        background-image: none !important;
      }
    `;

    function WhaleGirl() {
      return h('img', {
        src: '/whale-girl/whale-girl.png?v=2',
        alt: '',
        'aria-hidden': true,
        draggable: false,
        style: {
          position: 'fixed',
          right: 8,
          bottom: 8,
          width: 200,
          height: 200,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1000,
          filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.20))',
        },
      });
    }

    function RioThemeSwitch() {
      const [mode, setMode] = useState(() => {
        try { return localStorage.getItem(THEME_KEY) || 'glass1'; } catch { return 'glass1'; }
      });
      const [open, setOpen] = useState(false);

      useEffect(() => {
        const theme = THEMES[mode] || THEMES.glass1;
        document.documentElement.setAttribute('data-rio-theme', theme.attr);
        try { localStorage.setItem(THEME_KEY, mode); } catch {}
        let style = document.getElementById('rio-theme-style');
        if (!style) {
          style = document.createElement('style');
          style.id = 'rio-theme-style';
          document.head.appendChild(style);
        }
        style.textContent = THEME_CSS;
      }, [mode]);

      useEffect(() => {
        if (!open) return;
        const close = () => setOpen(false);
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
      }, [open]);

      const current = THEMES[mode] || THEMES.glass1;
      const btn = {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 999,
        border: '1px solid rgba(255, 255, 255, 0.18)',
        background: 'rgba(20, 18, 24, 0.45)',
        color: '#f2eef4',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        boxShadow: 'none',
        cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
      };
      const wrap = {
        position: 'fixed', left: 12, bottom: 56, zIndex: 2000,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
      };
      const menu = {
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.35)',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.22)',
      };
      const item = (active) => ({
        padding: '8px 16px', border: 'none', textAlign: 'left',
        background: active ? 'rgba(244, 194, 218, 0.6)' : 'transparent',
        color: '#3d2434', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      });

      return h('div', { style: wrap, onClick: (e) => e.stopPropagation() },
        h('button', { style: btn, onClick: () => setOpen(!open), title: '切换外观主题' },
          '🖼️ ', current.label, ' ▾'),
        open && h('div', { style: menu },
          Object.entries(THEMES).map(([key, t]) => h('button', {
            key,
            style: item(key === mode),
            onClick: () => { setMode(key); setOpen(false); },
          }, t.label)),
        ),
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'whale-girl',
          order: 1000,
        }, WhaleGirl));
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'rio-theme-switch',
          order: 1001,
        }, RioThemeSwitch));
      },
    };
  },
});
