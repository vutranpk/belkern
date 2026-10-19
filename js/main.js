/**
 * =============================================================================
 * BELKERN GMBH — CORE APPLICATION JAVASCRIPT (js/main.js)
 * Vanilla JavaScript (100% dependency-free beyond Lucide Icons)
 * Shared interactive logic across the entire Belkern B2B platform
 * =============================================================================
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. LUCIDE ICONS INITIALIZATION
  // ---------------------------------------------------------------------------
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({
        attrs: {
          'stroke-width': 1.65
        }
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. DYNAMIC COPYRIGHT YEAR
  // ---------------------------------------------------------------------------
  function initCopyright() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ---------------------------------------------------------------------------
  // 3. FULL-SCREEN TAKEOVER MENU (Comaxx Architecture)
  // ---------------------------------------------------------------------------
  function toggleFullScreenMenu(open) {
    const menu = document.getElementById('fullScreenMenu');
    const content = document.getElementById('fullScreenMenuContent');
    if (!menu) return;

    if (open) {
      menu.classList.remove('opacity-0', 'pointer-events-none');
      menu.classList.add('opacity-100', 'pointer-events-auto');
      menu.scrollTop = 0; // Reset scroll position to summit
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');

      // Fluid scale & rise animation for inner container
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (content) {
            content.classList.remove('translate-y-6', 'scale-95', 'opacity-0');
            content.classList.add('translate-y-0', 'scale-100', 'opacity-100');
          }
        }, 40);
      });
      initIcons();
    } else {
      if (content) {
        content.classList.remove('translate-y-0', 'scale-100', 'opacity-100');
        content.classList.add('translate-y-6', 'scale-95', 'opacity-0');
      }
      setTimeout(() => {
        menu.classList.remove('opacity-100', 'pointer-events-auto');
        menu.classList.add('opacity-0', 'pointer-events-none');
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
      }, 220);
    }
  }
  // Expose globally for inline HTML onclick attributes
  window.toggleFullScreenMenu = toggleFullScreenMenu;

  // ---------------------------------------------------------------------------
  // 4. EXCLUSIVE ACCORDION MENU NAVIGATION (Single-Open Behavior)
  // ---------------------------------------------------------------------------
  function toggleMenuAccordion(id) {
    const target = document.getElementById(id);
    const targetIcon = document.getElementById(id + '-icon');
    if (!target) return;

    const isCurrentlyOpen = target.classList.contains('accordion-open');

    // Collapse all open accordions first
    const allContents = document.querySelectorAll('.menu-accordion-content');
    const allIcons = document.querySelectorAll('.menu-accordion-icon');

    allContents.forEach((el) => {
      el.classList.remove('accordion-open');
      el.style.maxHeight = '0px';
      el.classList.remove('opacity-100');
      el.classList.add('opacity-0');
    });

    allIcons.forEach((icon) => {
      icon.classList.remove('rotate-180');
    });

    // If clicked item was not already open, smoothly expand it
    if (!isCurrentlyOpen) {
      target.classList.add('accordion-open');
      target.classList.remove('opacity-0');
      target.classList.add('opacity-100');
      target.style.maxHeight = target.scrollHeight + 40 + 'px';
      if (targetIcon) {
        targetIcon.classList.add('rotate-180');
      }
      initIcons();
    }
  }
  // Expose globally for inline HTML onclick attributes
  window.toggleMenuAccordion = toggleMenuAccordion;

  // ---------------------------------------------------------------------------
  // 4.5. FOOTER MOBILE COLLAPSIBLE ACCORDION (< 1024px)
  // ---------------------------------------------------------------------------
  function toggleFooterAccordion(id) {
    if (window.innerWidth >= 1024) return; // Desktop is always fully expanded

    const target = document.getElementById(id);
    const targetIcon = document.getElementById(id + 'Icon');
    if (!target) return;

    const isOpen = target.classList.contains('footer-accordion-open');
    if (isOpen) {
      target.classList.remove('footer-accordion-open');
      target.style.maxHeight = '0px';
      target.classList.remove('opacity-100');
      target.classList.add('opacity-0');
      if (targetIcon) targetIcon.classList.remove('rotate-180');
    } else {
      target.classList.add('footer-accordion-open');
      target.classList.remove('opacity-0');
      target.classList.add('opacity-100');
      target.style.maxHeight = target.scrollHeight + 30 + 'px';
      if (targetIcon) targetIcon.classList.add('rotate-180');
    }
  }
  window.toggleFooterAccordion = toggleFooterAccordion;

  // Reset footer accordion inline styles when resizing across 1024px desktop breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      document.querySelectorAll('.footer-accordion-content').forEach((el) => {
        el.style.maxHeight = '';
      });
      document.querySelectorAll('#footerNavIcon, #footerCommoditiesIcon, #footerHeadquartersIcon').forEach((icon) => {
        icon.classList.remove('rotate-180');
      });
    }
  });

  // ---------------------------------------------------------------------------
  // 5. ATTACH MENU EVENT LISTENERS (Buttons, Links & Escape Key)
  // ---------------------------------------------------------------------------
  function initMenuListeners() {
    const navigationToggle = document.getElementById('navigationToggle');
    const closeFullScreenBtn = document.getElementById('closeFullScreenBtn');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (navigationToggle) {
      navigationToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFullScreenMenu(true);
      });
    }

    if (closeFullScreenBtn) {
      closeFullScreenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFullScreenMenu(false);
      });
    }

    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleFullScreenMenu(false);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleFullScreenMenu(false);
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 6. DYNAMIC HEADER SCROLL TRANSITION (Transparent -> Compact Sticky Navbar)
  // ---------------------------------------------------------------------------
  function initHeaderScroll() {
    const mainHeader = document.getElementById('mainHeader');
    const headerTopBar = document.getElementById('headerTopBar');
    const mainNavBar = document.getElementById('mainNavBar');
    const headerLogoDark = document.getElementById('headerLogoDark');
    const headerLogoLight = document.getElementById('headerLogoLight');
    const headerNavLinks = document.querySelectorAll('.header-nav-link');
    const headerHbgBars = document.querySelectorAll('.header-hbg-bar');
    const navigationToggle = document.getElementById('navigationToggle');

    if (!mainHeader) return;

    function handleHeaderScroll() {
      const isScrolled = window.scrollY > 25;
      if (isScrolled) {
        mainHeader.classList.remove('bg-transparent', 'border-transparent');
        mainHeader.classList.add('bg-white/95', 'backdrop-blur-md', 'border-slate-200/80', 'shadow-xs');

        if (headerTopBar) {
          headerTopBar.classList.add('max-h-0', 'opacity-0', 'py-0', 'border-transparent', 'pointer-events-none');
          headerTopBar.classList.remove('max-h-12', 'opacity-100', 'py-2.5', 'border-white/15');
        }
        if (mainNavBar) {
          mainNavBar.classList.remove('h-20');
          mainNavBar.classList.add('h-16');
        }
        // Swap to Light Mode Logo on solid white header
        if (headerLogoDark) {
          headerLogoDark.classList.add('hidden');
          headerLogoDark.classList.remove('block');
        }
        if (headerLogoLight) {
          headerLogoLight.classList.remove('hidden');
          headerLogoLight.classList.add('block');
        }
        headerNavLinks.forEach((link) => {
          link.classList.remove('text-white/90', 'hover:text-brand-gold');
          link.classList.add('text-slate-800', 'hover:text-brand-green');
        });
        headerHbgBars.forEach((bar) => {
          bar.classList.remove('bg-white');
          bar.classList.add('bg-brand-dark');
        });
        if (navigationToggle) {
          navigationToggle.classList.remove('hover:bg-white/10');
          navigationToggle.classList.add('hover:bg-slate-100');
        }
      } else {
        mainHeader.classList.add('bg-transparent', 'border-transparent');
        mainHeader.classList.remove('bg-white/95', 'backdrop-blur-md', 'border-slate-200/80', 'shadow-xs');

        if (headerTopBar) {
          headerTopBar.classList.remove('max-h-0', 'opacity-0', 'py-0', 'border-transparent', 'pointer-events-none');
          headerTopBar.classList.add('max-h-12', 'opacity-100', 'py-2.5', 'border-white/15');
        }
        if (mainNavBar) {
          mainNavBar.classList.remove('h-16');
          mainNavBar.classList.add('h-20');
        }
        // Swap to Dark Mode Logo over hero background
        if (headerLogoDark) {
          headerLogoDark.classList.remove('hidden');
          headerLogoDark.classList.add('block');
        }
        if (headerLogoLight) {
          headerLogoLight.classList.add('hidden');
          headerLogoLight.classList.remove('block');
        }
        headerNavLinks.forEach((link) => {
          link.classList.remove('text-slate-800', 'hover:text-brand-green');
          link.classList.add('text-white/90', 'hover:text-brand-gold');
        });
        headerHbgBars.forEach((bar) => {
          bar.classList.remove('bg-brand-dark');
          bar.classList.add('bg-white');
        });
        if (navigationToggle) {
          navigationToggle.classList.remove('hover:bg-slate-100');
          navigationToggle.classList.add('hover:bg-white/10');
        }
      }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // ---------------------------------------------------------------------------
  // 6.5. B2B TECHNICAL SPECIFICATION DATA & MODAL LOGIC (1-Click TDS Terminal)
  // ---------------------------------------------------------------------------
  const COMMODITY_SPECS = {
    arabica: {
      title: 'Vietnamese Arabica Specialty (Cau Dat)',
      botanical: 'Coffea Arabica (Catimor, Typica, Bourbon)',
      origin: 'Cau Dat, Da Lat Highland, Lam Dong (1,450m–1,650m MSL)',
      grade: 'Grade 1 · Specialty (SCA 82+)',
      moq: "1 x 20' FCL (19.2 MT / 320 Bags)",
      eudr: '100% Polygon Mapped & Traceable',
      packing: '60kg GrainPro hermetic bag inside jute bag · 20ft FCL = 19.2 MT palletized',
      terms: 'FOB Cat Lai, CIF European Ports (Hamburg, Rotterdam, Antwerp, Genoa)',
      dropdownValue: 'Arabica Coffee',
      table: [
        { param: 'Moisture Content', standard: 'Max. 12.0%', test: 'ISO 6673 / Farmex Lab' },
        { param: 'Screen Size', standard: 'Screen 18/16 (Min. 90% on screen)', test: 'ISO 4150' },
        { param: 'Defect Count', standard: 'Max. 1.5% (Specialty Grade)', test: 'SCA Defect Scale' },
        { param: 'Foreign Matter', standard: 'Max. 0.1%', test: 'Optical Color Sorter' },
        { param: 'Ochratoxin A (OTA)', standard: 'Max. 3.0 ppb (Strict EU MRL)', test: 'HPLC-FLD / ISO 17025' },
        { param: 'Cup Profile', standard: 'Citrus acidity, caramel body, floral jasmine aroma', test: 'Q-Grader Cupping' }
      ]
    },
    robusta: {
      title: 'Vietnamese Robusta Green Coffee Grade 1',
      botanical: 'Coffea Canephora',
      origin: 'Dak Lak, Dak Nong, Lam Dong (Central Highlands)',
      grade: 'Grade 1 · Screen 18 Wet Polished / Cleaned',
      moq: "1 x 20' FCL (19.2 MT) / 40' FCL (26.4 MT)",
      eudr: '100% Polygon Geolocation & Farm-Gate Audited',
      packing: '60kg Jute bags or 1,000kg Big Bags (Jumbo) · Palletized or Bulk in Container',
      terms: 'FOB Cat Lai / CIF European Main Ports (Hamburg, Bremen, Rotterdam, Antwerp)',
      dropdownValue: 'Robusta Coffee',
      table: [
        { param: 'Moisture Content', standard: 'Max. 12.5%', test: 'ISO 6673' },
        { param: 'Screen Size', standard: 'Screen 18 (7.1mm) ≥ 90%', test: 'ISO 4150' },
        { param: 'Black & Broken Beans', standard: 'Max. 0.5% black, Max. 0.5% broken', test: 'Visual Sorting' },
        { param: 'Foreign Matter', standard: 'Max. 0.1%', test: 'Gravity Destoner & Optical Sorter' },
        { param: 'Excelsa Beans', standard: 'Max. 0.2%', test: 'Botanical Inspection' },
        { param: 'Ochratoxin A (OTA)', standard: 'Max. 5.0 ppb (EU Reg. 2023/915)', test: 'ISO/IEC 17025 Accredited Lab' }
      ]
    },
    pepper: {
      title: 'Black Pepper Steam Sterilized (ASTA Quality)',
      botanical: 'Piper Nigrum L.',
      origin: 'Chu Se (Gia Lai), Dak Nong, Binh Phuoc',
      grade: 'ASTA Cleaned · 570 g/l · Steam Sterilized',
      moq: "1 x 20' FCL (15.0 – 16.5 MT)",
      eudr: 'Zero-Deforestation & Full Farm-Gate Traceability',
      packing: '25kg Multi-wall Kraft paper bags with PE liner · Shrink-wrapped on Euro pallets',
      terms: 'CIF Hamburg, Rotterdam, Antwerp / CFR / FOB Cat Lai',
      dropdownValue: 'Black Pepper Steam Sterilized',
      table: [
        { param: 'Bulk Density', standard: 'Min. 570 g/l (FAQ available: 500–550 g/l)', test: 'ISO 959-1' },
        { param: 'Moisture Content', standard: 'Max. 12.5%', test: 'Dean-Stark Toluene' },
        { param: 'Foreign Matter / Extraneous', standard: 'Max. 0.2% (ASTA Standard)', test: 'Manual inspection' },
        { param: 'Piperine Content', standard: 'Min. 4.0%', test: 'HPLC' },
        { param: 'Volatile Oil', standard: 'Min. 2.0% v/w', test: 'Steam Distillation' },
        { param: 'Salmonella', standard: 'ABSENT in 25g (5-Log reduction)', test: 'ISO 6579-1' },
        { param: 'E. Coli', standard: '< 10 cfu/g (Negative)', test: 'ISO 16649-2' },
        { param: 'Pesticide MRLs', standard: 'Strict compliance with EC 396/2005', test: 'GC-MS/MS & LC-MS/MS' }
      ]
    },
    chili: {
      title: 'Vietnamese Dried Chili (Whole & Crushed Flakes)',
      botanical: 'Capsicum Frutescens / Annuum',
      origin: 'Dong Thap, Tien Giang, Gia Lai',
      grade: 'Export Grade A · Stemless / With Stem',
      moq: "1 x 20' FCL (8.0 MT) / 40' HC (16.0 MT)",
      eudr: 'Traceable Farm Procurement',
      packing: '10kg / 20kg Carton boxes or PP woven bags with inner liner',
      terms: 'CIF European Ports / FOB Cat Lai Port',
      dropdownValue: 'Black Pepper Steam Sterilized',
      table: [
        { param: 'Pungency / Capsaicin', standard: 'Min. 60,000 – 90,000 SHU (Scoville)', test: 'HPLC' },
        { param: 'Moisture Content', standard: 'Max. 12.0%', test: 'Vacuum Oven' },
        { param: 'Aflatoxin (B1+B2+G1+G2)', standard: 'Max. 10.0 ppb (EU Regulation)', test: 'HPLC-FLD / ISO 17025' },
        { param: 'Ochratoxin A', standard: 'Max. 20.0 ppb (EU Limits)', test: 'ISO 17025 Verified' },
        { param: 'Foreign Matter', standard: 'Max. 0.5%', test: 'Optical Inspection' },
        { param: 'Microbiology (HTST)', standard: 'Salmonella Negative / 25g', test: 'ISO 6579-1' }
      ]
    },
    'star-anise': {
      title: 'Vietnamese Star Anise (Autumn Flower Prime)',
      botanical: 'Illicium Verum Hook. f.',
      origin: 'Lang Son, Cao Bang (Northern Highlands)',
      grade: 'Autumn Crop · Flower Diameter ≥ 2.5cm',
      moq: "1 x 20' FCL (6.8 MT) / 40' HC (15.5 MT)",
      eudr: 'Wild-Harvested Mountain Forest Agroforestry',
      packing: '10kg / 20kg Net Carton boxes with polybag liner',
      terms: 'CIF Hamburg, Rotterdam, Koper / FOB Hai Phong Port',
      dropdownValue: 'Star Anise',
      table: [
        { param: 'Whole Stars Percentage', standard: 'Min. 80.0% whole intact stars', test: 'Physical Count' },
        { param: 'Flower Diameter', standard: 'Min. 2.5 cm (Screen sorted)', test: 'Caliper measurement' },
        { param: 'Volatile Essential Oil', standard: 'Min. 6.0% (Anethole ≥ 85%)', test: 'Steam Distillation & GC-MS' },
        { param: 'Moisture Content', standard: 'Max. 13.5%', test: 'Dean-Stark Toluene' },
        { param: 'Foreign Matter', standard: 'Max. 1.0%', test: 'Visual Destoning' },
        { param: 'Sulfur Dioxide (SO2)', standard: 'FREE / Undetectable (No sulfur smoking)', test: 'Monier-Williams Method' }
      ]
    },
    turmeric: {
      title: 'Vietnamese Turmeric Finger & Powder',
      botanical: 'Curcuma Longa L.',
      origin: 'Gia Lai, Dak Lak, Nghe An',
      grade: 'Polished Export Grade · High Curcumin',
      moq: "1 x 20' FCL (15.0 MT)",
      eudr: 'Direct Farm Traceability',
      packing: '25kg / 50kg PP bags with PE liner or Kraft paper sacks',
      terms: 'CIF European Ports / FOB Cat Lai',
      dropdownValue: 'Turmeric',
      table: [
        { param: 'Curcumin Content', standard: 'Min. 5.0% (Natural Active)', test: 'Spectrophotometry / HPLC' },
        { param: 'Moisture Content', standard: 'Max. 10.0%', test: 'Air Oven Method' },
        { param: 'Total Ash', standard: 'Max. 7.0%', test: 'Muffle Furnace' },
        { param: 'Acid Insoluble Ash', standard: 'Max. 1.0%', test: 'Acid Digestion' },
        { param: 'Foreign Matter', standard: 'Max. 0.5%', test: 'Optical Inspection' },
        { param: 'Heavy Metals (Pb, Cd, As)', standard: 'Strictly below EU Food Safety MRLs', test: 'ICP-MS / ISO 17025' }
      ]
    },
    cinnamon: {
      title: 'Vietnamese Cassia Cinnamon (Yen Bai Split & Tube)',
      botanical: 'Cinnamomum Cassia Presl',
      origin: 'Van Yen, Yen Bai Province',
      grade: 'Split, Cigarette Tubes & Broken (Export Grade)',
      moq: "1 x 20' FCL (8.5 MT) / 40' HC (18.0 MT)",
      eudr: 'Sustainable Agroforestry Traceable',
      packing: '10kg / 20kg Carton boxes or 50kg Pressed Bales',
      terms: 'CIF Hamburg, Rotterdam, Antwerp / FOB Hai Phong',
      dropdownValue: 'Cassia Cinnamon',
      table: [
        { param: 'Volatile Essential Oil', standard: 'Min. 3.5% – 4.5% v/w (Cinnamaldehyde ≥ 85%)', test: 'Steam Distillation & GC-MS' },
        { param: 'Moisture Content', standard: 'Max. 13.5%', test: 'Toluene Distillation' },
        { param: 'Bark Thickness', standard: '1.2 mm – 2.5 mm', test: 'Digital Micrometer' },
        { param: 'Coumarin Content', standard: 'Monitored under EU Flavouring Reg. 1334/2008', test: 'HPLC Analysis' },
        { param: 'Sulfur Smoking', standard: '100% Sulfur-Free Natural Sun/Kiln Dried', test: 'Monier-Williams' },
        { param: 'Foreign Matter', standard: 'Max. 0.5%', test: 'Manual Sorting' }
      ]
    },
    cashews: {
      title: 'Vietnamese Raw Cashew Kernels (AFI Standard)',
      botanical: 'Anacardium Occidentale',
      origin: 'Binh Phuoc, Dong Nai (South Vietnam)',
      grade: 'WW240, WW320, LP, SP Grade',
      moq: "1 x 20' FCL (15.8 MT / 700 Cartons)",
      eudr: 'Zero-Deforestation Compliant',
      packing: '2 x 25 lbs (11.34 kg) Vacuum flexible pouches in export cartons with CO2/N2 flush',
      terms: 'CIF European Ports / FOB Cat Lai',
      dropdownValue: 'Cashews',
      table: [
        { param: 'Grade Classification', standard: 'White Wholes: 240 or 320 kernels/lb', test: 'AFI Quality Specification' },
        { param: 'Moisture Content', standard: 'Max. 5.0%', test: 'ISO 665' },
        { param: 'Broken / Splits', standard: 'Max. 5.0% in Whole grades', test: 'AFI Defect Scale' },
        { param: 'Spotted / Defective', standard: 'Max. 1.0%', test: 'Visual Quality Control' },
        { param: 'Infestation / Insects', standard: '0% Nil / Free from live or dead pests', test: 'Phytosanitary Inspection' },
        { param: 'Salmonella & E. Coli', standard: 'Negative in 25g (Food Safety AA)', test: 'ISO 17025 Accredited Lab' }
      ]
    },
    coconut: {
      title: 'High-Fat Desiccated Coconut (Fine & Medium)',
      botanical: 'Cocos Nucifera L.',
      origin: 'Ben Tre (Mekong Delta Region)',
      grade: 'High Fat Fine Grade & Medium Grade',
      moq: "1 x 20' FCL (12.5 MT) / 40' HC (26.0 MT)",
      eudr: 'Full Mekong Delta Farm Traceability',
      packing: '25kg multi-layer Kraft paper bag with inner food-grade PE liner',
      terms: 'CIF European Main Ports / FOB Cat Lai',
      dropdownValue: 'Desiccated Coconut',
      table: [
        { param: 'Natural Fat Content', standard: 'Min. 65.0% ± 2%', test: 'Soxhlet Extraction' },
        { param: 'Moisture Content', standard: 'Max. 3.0%', test: 'Moisture Balance' },
        { param: 'Free Fatty Acids (FFA)', standard: 'Max. 0.15% (as Lauric Acid)', test: 'Titration' },
        { param: 'Color & Aroma', standard: 'Natural white, fresh sweet coconut aroma', test: 'Organoleptic' },
        { param: 'Sulfur Dioxide (SO2)', standard: 'Max. 50 ppm or SO2-Free on request', test: 'ISO Method' },
        { param: 'Salmonella & Pathogens', standard: 'Absent in 25g (Steam Treated)', test: 'ISO 6579' }
      ]
    }
  };

  let activeModalCommodityKey = 'robusta';

  function openSpecModal(commodityKey) {
    const modal = document.getElementById('specSheetModal');
    const content = document.getElementById('specSheetModalContent');
    const spec = COMMODITY_SPECS[commodityKey] || COMMODITY_SPECS['robusta'];
    if (!modal || !content || !spec) return;

    activeModalCommodityKey = commodityKey;

    // Populate data
    const titleEl = document.getElementById('modalSpecTitle');
    const subEl = document.getElementById('modalSpecSubtitle');
    const originEl = document.getElementById('modalSpecOrigin');
    const gradeEl = document.getElementById('modalSpecGrade');
    const eudrEl = document.getElementById('modalSpecEUDR');
    const moqEl = document.getElementById('modalSpecMOQ');
    const packingEl = document.getElementById('modalSpecPacking');
    const termsEl = document.getElementById('modalSpecTerms');
    const tableBody = document.getElementById('modalSpecTableBody');

    if (titleEl) titleEl.textContent = spec.title;
    if (subEl) subEl.textContent = spec.botanical + ' · ' + spec.grade;
    if (originEl) originEl.textContent = spec.origin;
    if (gradeEl) gradeEl.textContent = spec.grade;
    if (eudrEl) eudrEl.textContent = spec.eudr;
    if (moqEl) moqEl.textContent = spec.moq;
    if (packingEl) packingEl.textContent = spec.packing;
    if (termsEl) termsEl.textContent = spec.terms;

    if (tableBody) {
      tableBody.innerHTML = spec.table.map((row, idx) => `
        <tr class="${idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-slate-50 transition-colors">
          <td class="py-3 px-4 font-bold text-slate-900 border-r border-slate-100 text-xs sm:text-sm">${row.param}</td>
          <td class="py-3 px-4 font-bold text-slate-900 border-r border-slate-100 text-xs sm:text-sm">${row.standard}</td>
          <td class="py-3 px-4 font-normal text-slate-600 text-xs">${row.test}</td>
        </tr>
      `).join('');
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    document.documentElement.classList.add('overflow-hidden');
    document.body.classList.add('overflow-hidden');

    requestAnimationFrame(() => {
      content.classList.remove('translate-y-4', 'scale-95', 'opacity-0');
      content.classList.add('translate-y-0', 'scale-100', 'opacity-100');
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Prepare printable document in background
    renderPrintableTds(commodityKey);
  }

  function renderPrintableTds(commodityKey) {
    const spec = COMMODITY_SPECS[commodityKey] || COMMODITY_SPECS['robusta'];
    const printDoc = document.getElementById('printableTdsDocument');
    if (!printDoc || !spec) return;

    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const cleanKey = (commodityKey || 'SPEC').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const docRef = `BLK-TDS-${cleanKey}-2026`;

    printDoc.innerHTML = `
      <div class="print-page bg-white text-slate-950 font-sans p-0 m-0">
        
        <!-- Corporate Letterhead (Clean, High-Contrast German Impressum) -->
        <div class="flex items-center justify-between border-b-2 border-slate-900 pb-3.5 mb-3.5">
          <div class="flex items-center gap-4">
            <img src="images/LM-Belkern-1.png" alt="Belkern GmbH" class="h-11 w-auto object-contain">
            <div class="border-l-2 border-slate-400 pl-3.5 py-0.5">
              <div class="text-[9.5px] font-black tracking-widest text-slate-950 uppercase">DIRECT ORIGIN SUPPLY TERMINAL</div>
              <div class="text-[8.5px] text-slate-800 font-bold">Frankfurt am Main · Germany</div>
            </div>
          </div>
          <div class="text-right text-[9px] leading-relaxed text-slate-800">
            <p class="font-black text-slate-950 text-[11.5px] tracking-tight uppercase">Belkern GmbH</p>
            <p class="font-medium text-slate-900">Melsunger Straße 15 · 60389 Frankfurt am Main, Germany</p>
            <p class="font-medium text-slate-900">Amtsgericht Frankfurt am Main: <strong class="text-slate-950 font-black">HRB 99468</strong> · USt-IdNr.: <strong class="text-slate-950 font-black">DE 298 174 135</strong></p>
            <p class="text-slate-800 font-bold">mail@belkern.com · +49 69 97 76 16 69 · www.belkern.com</p>
          </div>
        </div>

        <!-- Document Control & Status Ribbon -->
        <div class="bg-slate-950 text-white px-4 py-2 rounded-lg flex items-center justify-between text-[9px] mb-3.5 font-medium shadow-none">
          <div class="flex items-center gap-2.5">
            <span class="font-black tracking-wider text-amber-400 uppercase">OFFICIAL TECHNICAL DATA SHEET (TDS)</span>
            <span class="text-slate-400">|</span>
            <span>Ref: <strong class="text-white font-bold">${docRef}</strong></span>
          </div>
          <div class="flex items-center gap-3">
            <span>Issue Date: <strong class="text-white">${today}</strong></span>
            <span class="text-slate-400">|</span>
            <span class="text-emerald-400 font-bold">German Jurisdiction (HGB) · Eurofins / SGS Tested</span>
          </div>
        </div>

        <!-- Commodity Title & Botanical Identity -->
        <div class="mb-3.5 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-black text-slate-950 tracking-tight leading-tight">${spec.title}</h1>
            <p class="text-[11px] font-bold text-slate-800 italic mt-0.5">${spec.botanical} · <span class="font-bold text-amber-900 not-italic">${spec.grade}</span></p>
          </div>
          <div class="text-right shrink-0">
            <span class="inline-block px-3 py-1.5 rounded-lg bg-emerald-50 border-2 border-emerald-700 text-emerald-950 text-[9px] font-black uppercase tracking-wider">
              ✓ Verified Origin Batch
            </span>
          </div>
        </div>

        <!-- 4-Box Key Specification Matrix (Bold High-Contrast Borders) -->
        <div class="grid grid-cols-4 gap-2.5 mb-3.5 text-[9px]">
          <div class="p-2.5 rounded-xl bg-slate-50 border-2 border-slate-400">
            <span class="block text-slate-700 uppercase font-black text-[8.5px] tracking-wider mb-1">Origin Region</span>
            <span class="font-black text-slate-950 text-[10px] leading-snug">${spec.origin}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border-2 border-slate-400">
            <span class="block text-slate-700 uppercase font-black text-[8.5px] tracking-wider mb-1">Quality Grade</span>
            <span class="font-black text-slate-950 text-[10px] leading-snug">${spec.grade}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border-2 border-slate-400">
            <span class="block text-slate-700 uppercase font-black text-[8.5px] tracking-wider mb-1">EUDR Compliance</span>
            <span class="font-black text-emerald-900 text-[10px] leading-snug">${spec.eudr}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-50 border-2 border-slate-400">
            <span class="block text-slate-700 uppercase font-black text-[8.5px] tracking-wider mb-1">Minimum Order (MOQ)</span>
            <span class="font-black text-slate-950 text-[10px] leading-snug">${spec.moq}</span>
          </div>
        </div>

        <!-- Laboratory & Physical Specification Table (Solid Grids & Crisp Ink) -->
        <div class="mb-3.5">
          <div class="text-[9.5px] font-black text-slate-950 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Guaranteed Physical, Chemical &amp; Laboratory Benchmarks</span>
            <span class="text-[8.5px] font-bold text-slate-700 uppercase">ISO 17025 Accredited Laboratory Protocol</span>
          </div>
          <table class="w-full text-left border-collapse text-[9.5px] border-2 border-slate-700">
            <thead class="bg-slate-200 border-b-2 border-slate-700">
              <tr class="text-slate-950 font-black uppercase text-[8.5px] tracking-wider">
                <th class="py-2 px-3 w-5/12 border-r border-slate-400">Parameter</th>
                <th class="py-2 px-3 w-4/12 border-r border-slate-400">Guaranteed Benchmark</th>
                <th class="py-2 px-3 w-3/12">Testing Method / Protocol</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-400">
              ${spec.table.map((row, idx) => `
                <tr class="${idx % 2 === 1 ? 'bg-slate-100/70' : 'bg-white'} border-b border-slate-300">
                  <td class="py-1.5 px-3 font-bold text-slate-950 border-r border-slate-400">${row.param}</td>
                  <td class="py-1.5 px-3 font-black text-slate-950 border-r border-slate-400">${row.standard}</td>
                  <td class="py-1.5 px-3 font-semibold text-slate-900">${row.test}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Packaging, Delivery & Storage Protocol (Solid Borders) -->
        <div class="grid grid-cols-2 gap-3 mb-3.5 text-[9px]">
          <div class="p-3 rounded-xl bg-slate-50 border-2 border-slate-400">
            <span class="block text-slate-700 uppercase font-black text-[8.5px] tracking-wider mb-1">Export Packaging Standard</span>
            <p class="font-bold text-slate-950 text-[9.5px] leading-relaxed">${spec.packing}</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border-2 border-slate-400">
            <span class="block text-slate-700 uppercase font-black text-[8.5px] tracking-wider mb-1">Commercial Delivery Terms</span>
            <p class="font-bold text-slate-950 text-[9.5px] leading-relaxed">${spec.terms} (Incoterms® 2020)</p>
          </div>
        </div>

        <!-- Compliance & Regulatory Assurance Strip (Crisp Border & High-Contrast Typography) -->
        <div class="p-3 rounded-xl bg-amber-50 border-2 border-amber-600 mb-3.5 text-[9px] text-slate-950 leading-relaxed">
          <strong class="font-black text-slate-950 uppercase tracking-wide">EU Regulatory Alignment:</strong>
          Full compliance with Regulation (EU) 2023/1115 (EUDR Deforestation-Free), Regulation (EC) No 396/2005 (MRL Pesticide Limits), and Regulation (EC) No 1881/2006 (Heavy Metals &amp; Mycotoxins).
        </div>

        <!-- Official Sign-off & Legal Authentication Footer -->
        <div class="border-t-2 border-slate-800 pt-3 flex items-end justify-between text-[8.5px] text-slate-800">
          <div class="max-w-md leading-relaxed">
            <p class="font-black text-slate-950 text-[9px] mb-0.5 uppercase tracking-wide">Belkern GmbH · German Legal Guarantee</p>
            <p class="font-medium text-slate-800 leading-relaxed">Contractual fulfillment and specification warranty governed strictly under the German Commercial Code (Handelsgesetzbuch - HGB). Verified pre-shipment retain samples are stored in climate-controlled Frankfurt archives for 12 months post-clearance.</p>
          </div>
          <div class="text-right shrink-0">
            <div class="w-44 border-b-2 border-slate-800 pb-1 mb-1 text-center">
              <span class="italic font-bold text-slate-950 text-[11px]">Belkern Quality Assurance</span>
            </div>
            <p class="font-black text-slate-950 text-[9px]">Quality Assurance Directorate</p>
            <p class="font-bold text-slate-800">Belkern GmbH · Frankfurt am Main</p>
          </div>
        </div>

      </div>
    `;
  }

  function closeSpecModal() {
    const modal = document.getElementById('specSheetModal');
    const content = document.getElementById('specSheetModalContent');
    if (!modal || !content) return;

    content.classList.remove('translate-y-0', 'scale-100', 'opacity-100');
    content.classList.add('translate-y-4', 'scale-95', 'opacity-0');

    setTimeout(() => {
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    }, 200);
  }

  function printSpecSheet() {
    renderPrintableTds(activeModalCommodityKey);
    setTimeout(() => {
      window.print();
    }, 60);
  }

  function requestSampleFromModal() {
    const spec = COMMODITY_SPECS[activeModalCommodityKey];
    closeSpecModal();

    setTimeout(() => {
      const rfqSec = document.getElementById('rfq');
      if (rfqSec) {
        rfqSec.scrollIntoView({ behavior: 'smooth' });
      }

      // Check sample toggle and expand
      const sampleToggle = document.getElementById('sampleRequestToggle');
      if (sampleToggle) {
        sampleToggle.checked = true;
        toggleSampleFields(true);
      }

      // Preselect commodity in dropdown
      if (spec && spec.dropdownValue) {
        const option = document.querySelector(`.custom-dropdown-option[data-value="${spec.dropdownValue}"]`);
        if (option) {
          option.click();
        }
      }

      // Pulse sample container to highlight
      const sampleBox = document.getElementById('sampleRequestContainer');
      if (sampleBox) {
        sampleBox.classList.add('ring-2', 'ring-brand-gold', 'scale-[1.01]');
        setTimeout(() => sampleBox.classList.remove('ring-2', 'ring-brand-gold', 'scale-[1.01]'), 1200);
      }
    }, 250);
  }

  let sampleTransitionTimer = null;

  function toggleSampleFields(checked) {
    const fields = document.getElementById('sampleDeliveryFields');
    const addressInput = document.getElementById('sampleAddressInput');
    const submitBtn = document.getElementById('rfqSubmitBtn');
    
    if (fields) {
      if (sampleTransitionTimer) {
        clearTimeout(sampleTransitionTimer);
        sampleTransitionTimer = null;
      }

      if (checked) {
        // Ensure overflow is clipped during unfolding
        fields.classList.add('overflow-hidden');
        
        // Unfold using CSS Grid template rows and fade-in
        requestAnimationFrame(() => {
          fields.classList.remove('grid-rows-[0fr]', 'opacity-0');
          fields.classList.add('grid-rows-[1fr]', 'opacity-100');
        });

        if (addressInput) addressInput.setAttribute('required', 'true');
        if (submitBtn) {
          const btnText = submitBtn.querySelector('span');
          if (btnText) btnText.textContent = 'Transmit RFQ & Dispatch Sample (24h SLA)';
        }

        // After transition completes, release overflow-hidden so custom dropdown menus don't clip
        sampleTransitionTimer = setTimeout(() => {
          fields.classList.remove('overflow-hidden');
          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }
        }, 320);

      } else {
        // Before collapsing, immediately clip overflow
        fields.classList.add('overflow-hidden');
        
        // Fold back smoothly to 0 height
        requestAnimationFrame(() => {
          fields.classList.remove('grid-rows-[1fr]', 'opacity-100');
          fields.classList.add('grid-rows-[0fr]', 'opacity-0');
        });

        if (addressInput) addressInput.removeAttribute('required');
        if (submitBtn) {
          const btnText = submitBtn.querySelector('span');
          if (btnText) btnText.textContent = 'Transmit Container RFQ (24h SLA)';
        }
      }
    }
  }

  // Backdrop click & Escape key listeners for Spec Modal & Harvest Modal
  function openHarvestModal() {
    const modal = document.getElementById('harvestModal');
    const content = document.getElementById('harvestModalContent');
    if (!modal || !content) return;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');

    content.classList.remove('translate-y-4', 'scale-95', 'opacity-0');
    content.classList.add('translate-y-0', 'scale-100', 'opacity-100');

    document.documentElement.classList.add('overflow-hidden');
    document.body.classList.add('overflow-hidden');

    const modalBody = modal.querySelector('.overflow-y-auto');
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    const tableScroll = modal.querySelector('.overflow-x-auto');
    if (tableScroll) {
      tableScroll.scrollLeft = 0;
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function closeHarvestModal() {
    const modal = document.getElementById('harvestModal');
    const content = document.getElementById('harvestModalContent');
    if (!modal || !content) return;

    content.classList.remove('translate-y-0', 'scale-100', 'opacity-100');
    content.classList.add('translate-y-4', 'scale-95', 'opacity-0');

    setTimeout(() => {
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
      const specModal = document.getElementById('specSheetModal');
      const isSpecOpen = specModal && specModal.classList.contains('opacity-100');
      if (!isSpecOpen) {
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
      }
    }, 200);
  }

  function inquireFromHarvestModal() {
    closeHarvestModal();
    setTimeout(() => {
      const rfqSec = document.getElementById('rfq');
      if (rfqSec) {
        rfqSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  }

  document.addEventListener('click', (e) => {
    const specModal = document.getElementById('specSheetModal');
    if (specModal && e.target === specModal) {
      closeSpecModal();
    }
    const harvestModal = document.getElementById('harvestModal');
    if (harvestModal && e.target === harvestModal) {
      closeHarvestModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSpecModal();
      closeHarvestModal();
    }
  });

  window.openSpecModal = openSpecModal;
  window.closeSpecModal = closeSpecModal;
  window.printSpecSheet = printSpecSheet;
  window.requestSampleFromModal = requestSampleFromModal;
  window.toggleSampleFields = toggleSampleFields;
  window.openHarvestModal = openHarvestModal;
  window.closeHarvestModal = closeHarvestModal;
  window.inquireFromHarvestModal = inquireFromHarvestModal;

  // ---------------------------------------------------------------------------
  // 7. INTERACTIVE RFQ FORM & CUSTOM DROPDOWN SUITE
  // ---------------------------------------------------------------------------
  function initRFQForm() {
    const container = document.getElementById('inquiryFormContainer');
    if (!container) return;

    // Helper: Initialize all custom dropdowns
    function setupCustomDropdowns() {
      const dropdowns = container.querySelectorAll('.custom-dropdown');
      
      dropdowns.forEach((dd) => {
        const trigger = dd.querySelector('.custom-dropdown-trigger');
        const menu = dd.querySelector('.custom-dropdown-menu');
        const chevron = dd.querySelector('.custom-dropdown-chevron');
        const label = dd.querySelector('.custom-dropdown-label');
        const hiddenSelect = dd.querySelector('select');
        const options = dd.querySelectorAll('.custom-dropdown-option');

        if (!trigger || !menu) return;

        // Toggle Open/Close
        function toggle(open) {
          const isOpen = open !== undefined ? open : menu.classList.contains('hidden');
          if (isOpen) {
            // Close all other open dropdowns first
            document.querySelectorAll('.custom-dropdown-menu').forEach(m => {
              if (m !== menu) {
                m.classList.add('hidden', 'opacity-0', 'translate-y-1');
                const pChev = m.closest('.custom-dropdown')?.querySelector('.custom-dropdown-chevron');
                if (pChev) pChev.classList.remove('rotate-180');
              }
            });
            // Also close any open quick preset popups
            document.querySelectorAll('.quick-preset-popup').forEach(p => {
              p.classList.add('hidden', 'opacity-0', 'translate-y-1');
            });
            document.querySelectorAll('.quick-preset-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
            menu.classList.remove('hidden');
            requestAnimationFrame(() => {
              menu.classList.remove('opacity-0', 'translate-y-1');
            });
            if (chevron) chevron.classList.add('rotate-180');
            trigger.setAttribute('aria-expanded', 'true');
          } else {
            menu.classList.add('opacity-0', 'translate-y-1');
            setTimeout(() => {
              menu.classList.add('hidden');
            }, 150);
            if (chevron) chevron.classList.remove('rotate-180');
            trigger.setAttribute('aria-expanded', 'false');
          }
        }

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          toggle();
        });

        // Option Select
        options.forEach(opt => {
          opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = opt.getAttribute('data-value');
            const displayLabel = opt.getAttribute('data-label') || val;

            if (hiddenSelect) {
              hiddenSelect.value = val;
              hiddenSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }

            if (label) {
              label.textContent = displayLabel;
              label.classList.remove('text-slate-500');
              label.classList.add('text-slate-900', 'font-semibold');
            }

            // Update check indicators
            options.forEach(o => {
              const chk = o.querySelector('.custom-option-check');
              if (chk) chk.classList.add('hidden');
              o.classList.remove('bg-brand-gold/10');
            });
            const activeChk = opt.querySelector('.custom-option-check');
            if (activeChk) activeChk.classList.remove('hidden');
            opt.classList.add('bg-brand-gold/10');

            toggle(false);
          });
        });
      });

      // Global click outside to close dropdowns
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
          document.querySelectorAll('.custom-dropdown-menu').forEach(m => {
            m.classList.add('opacity-0', 'translate-y-1');
            setTimeout(() => m.classList.add('hidden'), 150);
            const pChev = m.closest('.custom-dropdown')?.querySelector('.custom-dropdown-chevron');
            if (pChev) pChev.classList.remove('rotate-180');
          });
        }
      });
    }

    // Helper: Setup Pre-selection from buttons across the page
    function setupExternalTriggers() {
      const triggers = document.querySelectorAll('a[href="#rfq"][data-commodity]');
      triggers.forEach(trig => {
        trig.addEventListener('click', () => {
          const comm = trig.getAttribute('data-commodity');
          if (comm) {
            const opt = container.querySelector(`.custom-dropdown-option[data-value="${comm}"]`);
            if (opt) opt.click();
          }
        });
      });
    }

    // Helper: Form Submit Handler & Comprehensive Validation Engine
    function setupFormSubmit() {
      const inquiryForm = document.getElementById('inquiryForm');
      if (!inquiryForm) return;

      // Ensure cached initial HTML exists for clean in-place reset
      if (!container._initialHTML) {
        container._initialHTML = container.innerHTML;
      }

      // DOM Elements
      const commoditySelect = document.getElementById('commoditySelect');
      const commodityDropdown = container.querySelector('[data-dropdown="commodity"]');
      const commodityTrigger = commodityDropdown?.querySelector('.custom-dropdown-trigger');
      const podInput = document.getElementById('podInput');
      const volumeInput = document.getElementById('volumeInput');
      const sampleToggle = document.getElementById('sampleRequestToggle');
      const sampleAddressInput = document.getElementById('sampleAddressInput');
      const companyInput = document.getElementById('companyInput');
      const emailInput = document.getElementById('emailInput');
      const privacyConsent = document.getElementById('privacyConsent');
      const submitBtn = document.getElementById('rfqSubmitBtn');

      // Helper: Show Pristine Inline Error
      function showFieldError(fieldEl, message, isDropdown = false, customAnchor = null, isCheckbox = false) {
        const anchor = customAnchor || fieldEl;
        const parent = anchor.parentElement;
        if (!parent) return;

        // Clean any existing error tip
        const existingTip = parent.querySelector('.rfq-error-tip');
        if (existingTip) existingTip.remove();

        // Style the input / trigger element
        if (isCheckbox) {
          fieldEl.classList.add('ring-2', 'ring-red-500', 'ring-offset-1');
        } else {
          fieldEl.classList.remove('border-slate-300', 'hover:border-brand-gold', 'focus:border-brand-gold', 'focus:ring-brand-gold/20', 'focus:ring-brand-gold/30');
          fieldEl.classList.add('border-red-500', 'ring-2', 'ring-red-500/20', 'bg-red-50/20');
        }

        // Render inline warning badge with icon
        const tip = document.createElement('div');
        tip.className = 'rfq-error-tip flex items-center gap-1.5 mt-1.5 text-[11px] font-semibold text-red-600 animate-fadeIn';
        tip.innerHTML = `
          <svg class="w-3.5 h-3.5 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>${message}</span>
        `;
        anchor.insertAdjacentElement('afterend', tip);
      }

      // Helper: Clear Error on User Correction
      function clearFieldError(fieldEl, isDropdown = false, customAnchor = null, isCheckbox = false) {
        const anchor = customAnchor || fieldEl;
        const parent = anchor?.parentElement;
        if (parent) {
          const tip = parent.querySelector('.rfq-error-tip');
          if (tip) tip.remove();
        }

        if (isCheckbox) {
          fieldEl.classList.remove('ring-2', 'ring-red-500', 'ring-offset-1');
        } else {
          fieldEl.classList.remove('border-red-500', 'ring-2', 'ring-red-500/20', 'bg-red-50/20');
          fieldEl.classList.add('border-slate-300');
          if (isDropdown) {
            fieldEl.classList.add('hover:border-brand-gold', 'focus:border-brand-gold', 'focus:ring-2', 'focus:ring-brand-gold/20');
          } else {
            fieldEl.classList.add('focus:ring-2', 'focus:ring-brand-gold/30', 'focus:border-brand-gold');
          }
        }
      }

      // Real-Time Event Listeners for Instant Feedback Dismissal
      if (commoditySelect && commodityTrigger && commodityDropdown) {
        commoditySelect.addEventListener('change', () => {
          if (commoditySelect.value.trim()) {
            clearFieldError(commodityTrigger, true, commodityDropdown);
          }
        });
      }

      if (podInput) {
        podInput.addEventListener('input', () => {
          if (podInput.value.trim()) clearFieldError(podInput);
        });
      }

      if (volumeInput) {
        volumeInput.addEventListener('input', () => {
          if (volumeInput.value.trim()) clearFieldError(volumeInput);
        });
      }

      if (sampleAddressInput) {
        sampleAddressInput.addEventListener('input', () => {
          if (sampleAddressInput.value.trim()) clearFieldError(sampleAddressInput);
        });
      }

      if (sampleToggle) {
        sampleToggle.addEventListener('change', () => {
          if (!sampleToggle.checked && sampleAddressInput) {
            clearFieldError(sampleAddressInput);
          }
        });
      }

      if (companyInput) {
        companyInput.addEventListener('input', () => {
          if (companyInput.value.trim()) clearFieldError(companyInput);
        });
      }

      if (emailInput) {
        emailInput.addEventListener('input', () => {
          const val = emailInput.value.trim();
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (val && regex.test(val)) {
            clearFieldError(emailInput);
          }
        });
      }

      if (privacyConsent) {
        privacyConsent.addEventListener('change', () => {
          if (privacyConsent.checked) {
            clearFieldError(privacyConsent, false, privacyConsent.closest('.flex'), true);
          }
        });
      }

      // Form Submit Event Handler
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let hasError = false;
        let firstInvalidElement = null;

        // 1. Validate Commodity Cargo Dropdown
        if (!commoditySelect || !commoditySelect.value.trim()) {
          hasError = true;
          if (commodityTrigger && commodityDropdown) {
            showFieldError(commodityTrigger, 'Please select an export commodity cargo from the catalogue.', true, commodityDropdown);
            if (!firstInvalidElement) firstInvalidElement = commodityTrigger;
          }
        }

        // 2. Validate European Destination Port
        if (!podInput || !podInput.value.trim()) {
          hasError = true;
          if (podInput) {
            showFieldError(podInput, 'Please specify European destination port (e.g. Hamburg, Rotterdam).');
            if (!firstInvalidElement) firstInvalidElement = podInput;
          }
        }

        // 3. Validate Target Volume
        if (!volumeInput || !volumeInput.value.trim()) {
          hasError = true;
          if (volumeInput) {
            showFieldError(volumeInput, "Please specify container volume or tonnage (e.g. 1 x 20' FCL).");
            if (!firstInvalidElement) firstInvalidElement = volumeInput;
          }
        }

        // 4. Validate Sample Address (Only if 500g physical sample is requested)
        const isSampleRequested = sampleToggle?.checked || false;
        if (isSampleRequested && (!sampleAddressInput || !sampleAddressInput.value.trim())) {
          hasError = true;
          if (sampleAddressInput) {
            showFieldError(sampleAddressInput, 'Please provide facility delivery address for 500g express sample dispatch.');
            if (!firstInvalidElement) firstInvalidElement = sampleAddressInput;
          }
        }

        // 5. Validate Corporate Entity Name
        if (!companyInput || !companyInput.value.trim()) {
          hasError = true;
          if (companyInput) {
            showFieldError(companyInput, 'Please enter your corporate company name.');
            if (!firstInvalidElement) firstInvalidElement = companyInput;
          }
        }

        // 6. Validate Corporate Email
        const emailVal = emailInput?.value.trim() || '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
          hasError = true;
          if (emailInput) {
            showFieldError(emailInput, 'Please enter corporate procurement email.');
            if (!firstInvalidElement) firstInvalidElement = emailInput;
          }
        } else if (!emailRegex.test(emailVal)) {
          hasError = true;
          if (emailInput) {
            showFieldError(emailInput, 'Please enter a valid business email address (e.g. name@company.eu).');
            if (!firstInvalidElement) firstInvalidElement = emailInput;
          }
        }

        // 7. Validate DSGVO Privacy Policy Consent
        if (!privacyConsent || !privacyConsent.checked) {
          hasError = true;
          if (privacyConsent) {
            const consentWrapper = privacyConsent.closest('.flex');
            showFieldError(privacyConsent, 'You must acknowledge the DSGVO Privacy Policy to transmit the inquiry.', false, consentWrapper, true);
            if (!firstInvalidElement) firstInvalidElement = privacyConsent;
          }
        }

        // Validation Failure Feedback: Button Shake + Auto Focus / Smooth Scroll
        if (hasError) {
          if (submitBtn) {
            submitBtn.classList.remove('animate-shake');
            void submitBtn.offsetWidth; // Force DOM reflow to re-trigger CSS keyframe
            submitBtn.classList.add('animate-shake');
            setTimeout(() => submitBtn.classList.remove('animate-shake'), 450);
          }

          if (firstInvalidElement) {
            firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (typeof firstInvalidElement.focus === 'function') {
              setTimeout(() => firstInvalidElement.focus(), 250);
            }
          }
          return;
        }

        // Validation Passed: Proceed to Transmitting Loading State
        const commodity = commoditySelect.value;
        const volume = volumeInput.value;
        const pod = podInput.value;
        const incoterm = document.getElementById('incotermSelect')?.value || 'CIF';
        const company = companyInput.value;
        const email = emailVal;
        const sampleAddress = sampleAddressInput?.value || '';
        const sampleObjective = document.getElementById('sampleObjectiveSelect')?.value || 'Cupping & Sensory Roasting Profile';
        const checkedCerts = Array.from(inquiryForm.querySelectorAll('input[name="certs"]:checked')).map(c => c.value);

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span class="inline-flex items-center gap-2.5">
              <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Transmitting RFQ to Frankfurt Desk...</span>
            </span>
          `;
        }

        setTimeout(() => {
          // Generate unique RFQ reference
          const refCode = 'BK-' + Math.floor(100000 + Math.random() * 900000);

          // Render pristine confirmation view inside the form card
          container.innerHTML = `
            <div class="py-4 text-center">
              
              <!-- Success Hallmark Icon -->
              <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 mx-auto flex items-center justify-center mb-4 shadow-xs">
                <i data-lucide="check-circle" class="w-7 h-7 stroke-[2]"></i>
              </div>

              <!-- Header Status Badge -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>RFQ Registered · Frankfurt Commercial Desk</span>
              </div>
              
              <h3 class="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight mb-2">
                ${isSampleRequested ? 'Container RFQ & Sample Request Transmitted' : 'Container RFQ Transmitted'}
              </h3>
              
              <p class="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-5">
                Thank you, <span class="font-bold text-slate-900">${company}</span>. Your container inquiry has been securely registered with our Frankfurt trading desk under German commercial jurisdiction.
              </p>

              <!-- Ingestion Summary Card -->
              <div class="bg-slate-50/80 rounded-xl border border-slate-200/90 p-4 sm:p-5 text-left mb-5 space-y-2.5">
                <div class="flex items-center justify-between pb-2.5 border-b border-slate-200/70 text-xs">
                  <span class="text-slate-500 font-medium">Tracking Reference:</span>
                  <span class="font-sans font-black text-brand-gold text-sm tracking-wider">${refCode}</span>
                </div>
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span class="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Commodity Cargo</span>
                    <span class="font-bold text-slate-800">${commodity}</span>
                  </div>
                  <div>
                    <span class="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Target Volume</span>
                    <span class="font-bold text-slate-800">${volume}</span>
                  </div>
                  <div>
                    <span class="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Destination Port (POD)</span>
                    <span class="font-bold text-slate-800">${pod} (${incoterm})</span>
                  </div>
                  <div>
                    <span class="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Corporate Contact</span>
                    <span class="font-bold text-slate-800 truncate block">${email}</span>
                  </div>
                </div>

                ${isSampleRequested ? `
                  <div class="mt-3 p-3.5 rounded-xl bg-amber-50/80 border border-brand-gold/40 text-amber-950 flex items-start gap-2.5 text-left text-xs">
                    <div class="w-6 h-6 rounded-lg bg-brand-gold text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <i data-lucide="flask-conical" class="w-3.5 h-3.5"></i>
                    </div>
                    <div>
                      <div class="font-bold text-slate-900">500g Courier Lab Sample Scheduled (48h Dispatch)</div>
                      <div class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        Facility: <span class="font-semibold text-slate-800">${sampleAddress || company}</span> · Objective: ${sampleObjective}. A DHL/FedEx tracking number will be issued to ${email}.
                      </div>
                    </div>
                  </div>
                ` : ''}

                ${checkedCerts.length > 0 ? `
                  <div class="pt-2 border-t border-slate-200/70 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span class="text-slate-500 font-medium">Requested Accreditations:</span>
                    ${checkedCerts.map(c => `<span class="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">${c}</span>`).join('')}
                  </div>
                ` : ''}
              </div>

              <!-- SLA Guarantee Banner -->
              <div class="flex items-center justify-center gap-2 p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-dark text-xs mb-5">
                <i data-lucide="shield-check" class="w-4 h-4 text-brand-gold shrink-0"></i>
                <span class="font-medium">Direct trader spec sheet & spot pricing dispatched within <span class="font-bold">24 business hours (CET)</span>.</span>
              </div>

              <!-- Reset / New Submission Action with Smooth In-Place Restore -->
              <div>
                <button type="button" id="resetRFQBtn" class="h-10 sm:h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl border border-slate-300 hover:border-brand-gold bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer shadow-2xs">
                  <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-slate-500"></i>
                  <span>Submit Another Container Inquiry</span>
                </button>
              </div>

            </div>
          `;

          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }

          // Reset Button Handler: Instant in-place reset without full page reload
          const resetBtn = document.getElementById('resetRFQBtn');
          if (resetBtn) {
            resetBtn.addEventListener('click', () => {
              if (container._initialHTML) {
                container.innerHTML = container._initialHTML;
                if (window.lucide && typeof window.lucide.createIcons === 'function') {
                  window.lucide.createIcons();
                }
                initRFQForm();
                container.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                location.reload();
              }
            });
          }

        }, 550);

      });
    }

    // Helper: Initialize Quick Presets Popups for Volume & Port
    function setupQuickPresets() {
      const triggers = container.querySelectorAll('.quick-preset-trigger');
      const popups = container.querySelectorAll('.quick-preset-popup');
      const items = container.querySelectorAll('.quick-preset-item');

      function closeAllPopups() {
        popups.forEach(p => {
          p.classList.add('hidden', 'opacity-0', 'translate-y-1');
        });
        triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
      }

      function openPopup(popup, trigger) {
        closeAllPopups();

        // Also close any open custom dropdowns
        document.querySelectorAll('.custom-dropdown-menu').forEach(m => {
          m.classList.add('hidden', 'opacity-0', 'translate-y-1');
          const pChev = m.closest('.custom-dropdown')?.querySelector('.custom-dropdown-chevron');
          if (pChev) pChev.classList.remove('rotate-180');
        });

        popup.classList.remove('hidden');
        // Force reflow for smooth transition
        void popup.offsetWidth;
        popup.classList.remove('opacity-0', 'translate-y-1');
        trigger.setAttribute('aria-expanded', 'true');
      }

      triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetPopupId = trigger.getAttribute('data-popup');
          const targetPopup = document.getElementById(targetPopupId);
          if (!targetPopup) return;

          const isCurrentlyOpen = !targetPopup.classList.contains('hidden');
          if (isCurrentlyOpen) {
            closeAllPopups();
          } else {
            openPopup(targetPopup, trigger);
          }
        });
      });

      items.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetInputId = item.getAttribute('data-target-input');
          const value = item.getAttribute('data-value');
          const input = document.getElementById(targetInputId);
          if (input && value) {
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.focus();
          }
          closeAllPopups();
        });
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.quick-preset-popup') && !e.target.closest('.quick-preset-trigger')) {
          closeAllPopups();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeAllPopups();
        }
      });
    }

    setupCustomDropdowns();
    setupQuickPresets();
    setupExternalTriggers();
    setupFormSubmit();
  }

  // ---------------------------------------------------------------------------
  // 8. MULTI-LAYER INTERACTIVE PARALLAX ENGINE (Mouse Cursor Tracking)
  // ---------------------------------------------------------------------------
  function initHeroParallax() {
    const hero = document.getElementById('heroSection');
    if (!hero) return;

    const layers = hero.querySelectorAll('.parallax-layer');
    if (!layers.length) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener(
      'mousemove',
      (e) => {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        targetX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        targetY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
      },
      { passive: true }
    );

    window.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function renderParallax() {
      // Buttery smooth lerp easing (0.075 factor)
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0.05;
        const shiftX = (currentX * depth * 140).toFixed(2);
        const shiftY = (currentY * depth * 100).toFixed(2);
        layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
      });

      requestAnimationFrame(renderParallax);
    }

    requestAnimationFrame(renderParallax);
  }

  // ---------------------------------------------------------------------------
  // 10. COMMODITY TRACK: DRAG-TO-SCROLL, STAGGERED REVEAL & BOTTOM CONTROLS
  // ---------------------------------------------------------------------------
  function initCommodityTrack() {
    const track = document.getElementById('commodityScrollTrack');
    const progressBar = document.getElementById('commodityProgressBar');
    const bottomPrevBtn = document.getElementById('commodityBottomPrevBtn');
    const bottomNextBtn = document.getElementById('commodityBottomNextBtn');

    if (!track) return;

    // --- A. Dynamic Progress Bar & Navigation Button States ---
    function updateControls() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      
      // Update Progress Bar
      if (progressBar) {
        if (maxScroll <= 0) {
          progressBar.style.width = '100%';
        } else {
          const ratio = track.scrollLeft / maxScroll;
          const pct = Math.min(100, Math.max(12, ratio * 100));
          progressBar.style.width = `${pct}%`;
        }
      }

      // Update Prev Button
      const atStart = track.scrollLeft <= 8;
      if (bottomPrevBtn) {
        bottomPrevBtn.disabled = atStart;
        if (atStart) {
          bottomPrevBtn.classList.add('opacity-20', 'pointer-events-none');
        } else {
          bottomPrevBtn.classList.remove('opacity-20', 'pointer-events-none');
        }
      }

      // Update Next Button
      const atEnd = track.scrollLeft >= maxScroll - 8;
      if (bottomNextBtn) {
        bottomNextBtn.disabled = atEnd;
        if (atEnd) {
          bottomNextBtn.classList.add('opacity-20', 'pointer-events-none');
        } else {
          bottomNextBtn.classList.remove('opacity-20', 'pointer-events-none');
        }
      }

      // Dynamic Ultra-Smooth Edge Fade Masks
      const fadeLeft = document.getElementById('commodityFadeLeft');
      const fadeRight = document.getElementById('commodityFadeRight');
      if (fadeLeft) {
        fadeLeft.style.opacity = atStart ? '0' : '1';
      }
      if (fadeRight) {
        fadeRight.style.opacity = atEnd ? '0' : '1';
      }
    }

    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();

    // --- B. Interactive Mouse Drag-to-Scroll (Strict Drag vs. Click Separation) ---
    let isDown = false;
    let startClientX = 0;
    let startClientY = 0;
    let startScrollLeft = 0;
    let hasDragged = false;
    let maxMovedDistance = 0;
    const DRAG_THRESHOLD_PX = 4;
    const cardLinks = track.querySelectorAll('.commodity-card-link, a');

    function setLinksInteractive(enabled) {
      cardLinks.forEach((link) => {
        link.style.pointerEvents = enabled ? '' : 'none';
      });
    }

    function endDrag() {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('cursor-grabbing');
      track.classList.add('cursor-grab', 'scroll-smooth');
      // Restore link pointer-events on next frame after mouseup/click cycle completes
      requestAnimationFrame(() => {
        setTimeout(() => {
          setLinksInteractive(true);
        }, 0);
      });
    }

    // 1. Block native browser HTML5 image/link ghost dragging
    track.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    // 2. Mousedown: initialize drag tracking (reset hasDragged ONLY on new press)
    track.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Left click only
      isDown = true;
      hasDragged = false;
      maxMovedDistance = 0;
      startClientX = e.clientX;
      startClientY = e.clientY;
      startScrollLeft = track.scrollLeft;
      track.classList.add('cursor-grabbing');
      track.classList.remove('cursor-grab', 'scroll-smooth');
    });

    // 3. Window-level mousemove: smooth dragging even if cursor leaves track bounds
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      if ((e.buttons & 1) !== 1) {
        endDrag();
        return;
      }

      const dx = e.clientX - startClientX;
      const dy = e.clientY - startClientY;
      const dist = Math.hypot(dx, dy);
      if (dist > maxMovedDistance) {
        maxMovedDistance = dist;
      }

      if (maxMovedDistance > DRAG_THRESHOLD_PX) {
        if (!hasDragged) {
          hasDragged = true;
          // Disable link hit-testing during active drag so release never navigates
          setLinksInteractive(false);
        }
        e.preventDefault();
        track.scrollLeft = startScrollLeft - dx * 1.35;
      }
    });

    // 4. Safe release listeners across window/document
    window.addEventListener('mouseup', endDrag);
    document.addEventListener('mouseup', endDrag);
    window.addEventListener('blur', endDrag);
    document.addEventListener('dragend', endDrag);

    // 5. Capture-phase click guard: 100% block any link navigation after a drag gesture
    track.addEventListener('click', (e) => {
      if (hasDragged || maxMovedDistance > DRAG_THRESHOLD_PX) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }, true);
  }

  // --- C. Step Navigation Button Handler ---
  function scrollCommodityTrack(direction) {
    const track = document.getElementById('commodityScrollTrack');
    if (!track) return;
    track.classList.add('scroll-smooth');
    const firstCard = track.querySelector('.commodity-showcase-card:not(.hidden)');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 24 : 360;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  window.scrollCommodityTrack = scrollCommodityTrack;

  // --- D. Staggered Delay Fade-in Reveal (Native Fallback when GSAP is not present) ---
  function initCommodityStaggerReveal() {
    // If GSAP + ScrollTrigger is loaded, it handles the stagger reveal with hardware acceleration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      return;
    }

    const track = document.getElementById('commodityScrollTrack');
    if (!track) return;
    const cards = track.querySelectorAll('.commodity-showcase-card');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-8');
                card.classList.add('opacity-100', 'translate-y-0');
              }, index * 100); // 100ms delay per product
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(track);
    } else {
      cards.forEach((card) => {
        card.classList.remove('opacity-0', 'translate-y-8');
        card.classList.add('opacity-100', 'translate-y-0');
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 11. WHO WE ARE: SCROLL-DRIVEN 5:2 TO FULL-SCREEN VIDEO EXPANSION (Light Theme)
  // ---------------------------------------------------------------------------
  function initWhoWeAreScrollExpansion() {
    const section = document.getElementById('whoWeAreSection');
    const header = document.getElementById('whoWeAreHeader');
    const videoContainer = document.getElementById('whoWeAreVideoContainer');
    const videoCaption = document.getElementById('whoWeAreVideoCaption');
    const videoControls = document.getElementById('whoWeAreVideoControls');
    const playPauseBtn = document.getElementById('whoWeArePlayPauseBtn');
    const soundBtn = document.getElementById('whoWeAreSoundBtn');
    const restartBtn = document.getElementById('whoWeAreRestartBtn');
    const scrollHint = document.getElementById('whoWeAreScrollHint');
    const videoDesktop = document.getElementById('whoWeAreVideoDesktop');
    const videoMobile = document.getElementById('whoWeAreVideoMobile');
    const mainHeader = document.getElementById('mainHeader');

    if (!section || !videoContainer) return;

    let lastScrollY = window.scrollY;
    let isHeaderAutoHidden = false;

    const iconPause = document.getElementById('whoWeAreIconPause');
    const iconPlay = document.getElementById('whoWeAreIconPlay');
    const iconMuted = document.getElementById('whoWeAreIconMuted');
    const iconUnmuted = document.getElementById('whoWeAreIconUnmuted');

    // Helper: Determine currently active video stream by 1024px design system breakpoint
    function getActiveVideo() {
      const isDesktop = window.innerWidth >= 1024;
      return isDesktop ? (videoDesktop || videoMobile) : (videoMobile || videoDesktop);
    }

    // Battery & bandwidth conservation: only play active stream
    function syncPlaybackStates() {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        if (videoMobile && !videoMobile.paused) videoMobile.pause();
        if (videoDesktop && videoDesktop.paused) videoDesktop.play().catch(() => {});
      } else {
        if (videoDesktop && !videoDesktop.paused) videoDesktop.pause();
        if (videoMobile && videoMobile.paused) videoMobile.play().catch(() => {});
      }
    }

    // Helper functions for instant, zero-latency icon state switching
    function updatePlayPauseIcon() {
      const activeVideo = getActiveVideo();
      if (!activeVideo) return;
      const isPaused = activeVideo.paused;
      if (iconPause && iconPlay) {
        iconPause.classList.toggle('hidden', isPaused);
        iconPause.classList.toggle('flex', !isPaused);
        iconPlay.classList.toggle('hidden', !isPaused);
        iconPlay.classList.toggle('flex', isPaused);
      }
    }

    function updateSoundIcon() {
      const activeVideo = getActiveVideo();
      if (!activeVideo) return;
      const isMuted = activeVideo.muted;
      if (iconMuted && iconUnmuted) {
        iconMuted.classList.toggle('hidden', !isMuted);
        iconMuted.classList.toggle('flex', isMuted);
        iconUnmuted.classList.toggle('hidden', isMuted);
        iconUnmuted.classList.toggle('flex', !isMuted);
      }
    }

    // Play / Pause toggle
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeVideo = getActiveVideo();
        if (!activeVideo) return;
        if (activeVideo.paused) {
          activeVideo.play().catch(() => {});
        } else {
          activeVideo.pause();
        }
        updatePlayPauseIcon();
      });

      [videoDesktop, videoMobile].forEach((v) => {
        if (v) {
          v.addEventListener('play', updatePlayPauseIcon);
          v.addEventListener('pause', updatePlayPauseIcon);
        }
      });
    }

    // Sound toggle (default is muted)
    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeVideo = getActiveVideo();
        if (!activeVideo) return;
        const newMuted = !activeVideo.muted;
        if (videoDesktop) videoDesktop.muted = newMuted;
        if (videoMobile) videoMobile.muted = newMuted;
        updateSoundIcon();
      });
    }

    // Restart video from beginning
    if (restartBtn) {
      restartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeVideo = getActiveVideo();
        if (!activeVideo) return;
        activeVideo.currentTime = 0;
        activeVideo.play().catch(() => {});
        updatePlayPauseIcon();
      });
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let isTicking = false;

    function calculateTargetProgress() {
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      const scrolled = -rect.top;
      return Math.min(1, Math.max(0, scrolled / totalScrollable));
    }

    function render(p) {
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const isMobileSmall = window.innerWidth < 640;
      const initialRadius = isDesktop ? 24 : 16;

      // 1. Precise Header Bottom Detection & Generous Button-to-Video Gap
      let headerBottom = 300;
      if (header) {
        headerBottom = header.offsetTop + header.offsetHeight;
      }
      // Guaranteed breathing room (whitespace) so button and video never touch:
      // Desktop: 48px, Tablet: 36px, Mobile: 28px
      const buttonToVideoGap = isDesktop ? 48 : (isTablet ? 36 : 28);

      // 2. Initial Specimen Frame Dimensions (5:2 on Desktop, 4:4 Square on Mobile)
      let initialW, initialH;
      const maxAllowedHeight = Math.max(160, window.innerHeight - headerBottom - buttonToVideoGap - (isDesktop ? 60 : 40));

      if (isDesktop) {
        // Desktop: 5:2 ratio, cinema specimen ticket
        initialH = Math.min(maxAllowedHeight, window.innerHeight * 0.30, 240);
        initialW = Math.min(window.innerWidth * 0.75, initialH * 2.5, 750);
      } else if (isTablet) {
        // Tablet: 4:4 (1:1 square)
        initialH = Math.min(maxAllowedHeight, window.innerHeight * 0.32, 280);
        initialW = Math.min(window.innerWidth * 0.60, initialH);
      } else {
        // Mobile (< 640px): 4:4 (1:1 square)
        const maxMobW = Math.min(window.innerWidth - 48, 250);
        initialH = Math.min(maxAllowedHeight, window.innerHeight * 0.28, maxMobW);
        initialW = initialH;
      }

      // 3. Initial Center Y vs Target Center Y
      // Initial: Top edge of video is EXACTLY headerBottom + buttonToVideoGap
      const initialCenterY = headerBottom + buttonToVideoGap + (initialH / 2);
      const targetCenterY = window.innerHeight * 0.50; // Exact center of screen (50% viewport)

      // 4. TIMELINE PHASES:
      // - Phase 1 (0.00 <= p <= CENTER_REACHED):
      //   Video glides upwards from initialCenterY to targetCenterY (center of screen).
      //   WIDTH & HEIGHT DO NOT EXPAND! They stay strictly at initialW, initialH.
      //   Header (title, subtitle, button) gently fades out and drifts upward.
      // - Phase 2 (CENTER_REACHED < p <= FULL_SCREEN_THRESHOLD):
      //   Now that the video is centered at 50%, it expands symmetrically outwards to 100vw x 100dvh!
      // - Phase 3 (p > FULL_SCREEN_THRESHOLD):
      //   Full-screen locked dwell phase (~35% of scroll travel) for video viewing & controls.
      const CENTER_REACHED = 0.28;
      const FULL_SCREEN_THRESHOLD = 0.66;

      // Header Fade & Lift
      if (header) {
        if (p <= 0.04) {
          header.style.opacity = '1';
          header.style.transform = 'translateY(0px)';
          header.style.visibility = 'visible';
          header.style.pointerEvents = 'auto';
        } else if (p < 0.22) {
          const headerProgress = (p - 0.04) / 0.18;
          const headerOpacity = Math.max(0, 1 - headerProgress);
          const headerY = -headerProgress * 35;
          header.style.opacity = headerOpacity.toFixed(3);
          header.style.transform = `translateY(${headerY.toFixed(1)}px)`;
          header.style.visibility = 'visible';
          header.style.pointerEvents = headerOpacity < 0.2 ? 'none' : 'auto';
        } else {
          header.style.opacity = '0';
          header.style.transform = 'translateY(-35px)';
          header.style.visibility = 'hidden';
          header.style.pointerEvents = 'none';
        }
      }

      // Scroll Hint Fade Out
      if (scrollHint) {
        if (p <= 0.03) {
          scrollHint.style.opacity = '1';
        } else if (p < 0.14) {
          scrollHint.style.opacity = Math.max(0, 1 - (p - 0.03) / 0.11).toFixed(3);
        } else {
          scrollHint.style.opacity = '0';
        }
      }

      // Video Container Positioning & Expansion Logic
      if (p <= CENTER_REACHED) {
        // STAGE 1: Glide to center of screen. NO EXPANSION.
        const glideProgress = Math.min(1, Math.max(0, p / CENTER_REACHED));
        // Silky cubic ease-in-out
        const easeGlide = glideProgress < 0.5
          ? 4 * glideProgress * glideProgress * glideProgress
          : 1 - Math.pow(-2 * glideProgress + 2, 3) / 2;
        const currentCenterY = initialCenterY + (targetCenterY - initialCenterY) * easeGlide;

        videoContainer.style.width = `${initialW.toFixed(1)}px`;
        videoContainer.style.height = `${initialH.toFixed(1)}px`;
        videoContainer.style.top = `${currentCenterY.toFixed(1)}px`;
        videoContainer.style.borderRadius = `${initialRadius}px`;
        videoContainer.style.borderWidth = '1px';
        videoContainer.style.borderColor = 'rgba(226, 232, 240, 0.9)';
        videoContainer.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
      } else if (p >= FULL_SCREEN_THRESHOLD) {
        // STAGE 3: Full-screen hold (100% x 100dvh)
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100dvh';
        videoContainer.style.top = '50%';
        videoContainer.style.borderRadius = '0px';
        videoContainer.style.borderWidth = '0px';
        videoContainer.style.borderColor = 'transparent';
        videoContainer.style.boxShadow = 'none';
      } else {
        // STAGE 2: Expands outward from the exact center (top: 50%)
        const expandRaw = (p - CENTER_REACHED) / (FULL_SCREEN_THRESHOLD - CENTER_REACHED);
        const expandProgress = Math.pow(Math.min(1, Math.max(0, expandRaw)), 1.25);

        const viewportW = document.documentElement.clientWidth || window.innerWidth;
        const viewportH = window.innerHeight;
        const currentW = initialW + (viewportW - initialW) * expandProgress;
        const currentH = initialH + (viewportH - initialH) * expandProgress;
        const currentRadius = Math.max(0, initialRadius * (1 - expandProgress));
        const currentBorderAlpha = Math.max(0, 0.9 * (1 - expandProgress));

        videoContainer.style.width = `${currentW.toFixed(1)}px`;
        videoContainer.style.height = `${currentH.toFixed(1)}px`;
        videoContainer.style.top = '50%';
        videoContainer.style.borderRadius = `${currentRadius.toFixed(1)}px`;
        videoContainer.style.borderWidth = '1px';
        videoContainer.style.borderColor = `rgba(226, 232, 240, ${currentBorderAlpha.toFixed(3)})`;
        videoContainer.style.boxShadow = expandProgress > 0.85 ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
      }

      // 5. Full-Screen Interactive Controls & Caption (Synchronized fade-in at full expansion)
      if (videoControls) {
        if (p >= 0.58) {
          const ctrlOpacity = Math.min(1, (p - 0.58) / 0.10);
          videoControls.style.opacity = ctrlOpacity.toFixed(3);
          videoControls.style.pointerEvents = 'auto';
        } else {
          videoControls.style.opacity = '0';
          videoControls.style.pointerEvents = 'none';
        }
      }

      if (videoCaption) {
        if (p >= 0.58) {
          const captionOpacity = Math.min(1, (p - 0.58) / 0.10);
          videoCaption.style.opacity = captionOpacity.toFixed(3);
        } else {
          videoCaption.style.opacity = '0';
        }
      }
    }

    // 60FPS / 120FPS SILKY SMOOTH LERP LOOP (Eliminates wheel notch stutter "giật giật")
    function tick() {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0003) {
        currentProgress += diff * 0.16;
        render(currentProgress);
        requestAnimationFrame(tick);
      } else {
        currentProgress = targetProgress;
        render(currentProgress);
        isTicking = false;
      }
    }

    function onScroll() {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      targetProgress = calculateTargetProgress();

      // CINEMATIC AUTO-HIDE & SMART REVEAL (Apple Style)
      if (mainHeader) {
        const isInsideCinematic = targetProgress > 0.10 && targetProgress < 0.98;

        if (isInsideCinematic) {
          // If scrolling down into the expanding/full-screen video -> auto-hide header
          if (scrollDelta > 3 && !isHeaderAutoHidden) {
            mainHeader.classList.add('-translate-y-full');
            isHeaderAutoHidden = true;
          } 
          // If user scrolls UP -> reveal header immediately so they can navigate
          else if (scrollDelta < -5 && isHeaderAutoHidden) {
            mainHeader.classList.remove('-translate-y-full');
            isHeaderAutoHidden = false;
          }
          // Initial trigger when video starts expanding
          else if (targetProgress > 0.28 && !isHeaderAutoHidden && scrollDelta >= 0) {
            mainHeader.classList.add('-translate-y-full');
            isHeaderAutoHidden = true;
          }
        } else {
          // Outside Who We Are video (Hero or subsequent sections) -> always restore header
          if (isHeaderAutoHidden) {
            mainHeader.classList.remove('-translate-y-full');
            isHeaderAutoHidden = false;
          }
        }
      }

      lastScrollY = currentScrollY;

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(tick);
      }
    }

    // Desktop bonus: If mouse moves within 35px of top edge of screen, reveal header
    window.addEventListener('mousemove', (e) => {
      if (mainHeader && isHeaderAutoHidden && e.clientY <= 35) {
        mainHeader.classList.remove('-translate-y-full');
        isHeaderAutoHidden = false;
      }
    }, { passive: true });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      syncPlaybackStates();
      targetProgress = calculateTargetProgress();
      currentProgress = targetProgress;
      render(currentProgress);
    });

    // Initial render & sync
    syncPlaybackStates();
    targetProgress = calculateTargetProgress();
    currentProgress = targetProgress;
    render(currentProgress);
  }

  // ---------------------------------------------------------------------------
  // 12. STANDARDS & CERTIFICATIONS: EDGE-TO-EDGE SPLIT PANORAMA (Zero Cards)
  // ---------------------------------------------------------------------------
  let certPanoramaCurrent = 0;
  let certPanoramaTimer = null;
  const CERT_PANORAMA_DURATION = 6500; // 6.5s per slide
  const CERT_STANDARDS = [
    '01 EUDR & Origin',
    '02 Food Safety & Steam',
    '03 In-House Laboratory',
    '04 ESG & Governance'
  ];

  function switchCertPanorama(index) {
    const showcase = document.getElementById('certPanoramaShowcase');
    const tabs = document.querySelectorAll('.cert-tab-btn');
    const currentStep = document.getElementById('certCurrentStep');

    const total = CERT_STANDARDS.length;
    certPanoramaCurrent = ((index % total) + total) % total;

    // 1. Update Story Segment Tabs (If present)
    if (tabs.length > 0) {
      tabs.forEach((tab, i) => {
        const numSpan = tab.querySelector('.tab-num');
        const titleSpan = tab.querySelector('.tab-title');
        const progressFill = tab.querySelector('.tab-progress');

        if (i === certPanoramaCurrent) {
          if (numSpan) {
            numSpan.classList.remove('text-slate-400');
            numSpan.classList.add('text-brand-gold');
          }
          if (titleSpan) {
            titleSpan.classList.remove('text-slate-500', 'font-medium');
            titleSpan.classList.add('text-brand-dark', 'font-bold');
          }
          if (progressFill) {
            progressFill.classList.remove('w-0');
            progressFill.classList.add('w-full');
          }
        } else {
          if (numSpan) {
            numSpan.classList.remove('text-brand-gold');
            numSpan.classList.add('text-slate-400');
          }
          if (titleSpan) {
            titleSpan.classList.remove('text-brand-dark', 'font-bold');
            titleSpan.classList.add('text-slate-500', 'font-medium');
          }
          if (progressFill) {
            progressFill.classList.remove('w-full');
            progressFill.classList.add('w-0');
          }
        }
      });
    }

    if (!showcase) return;
    const images = showcase.querySelectorAll('.cert-panorama-img');
    const contents = showcase.querySelectorAll('.cert-panorama-content');

    // 2. Update Images (100% stable, cross-fade with opacity-100 / opacity-0)
    images.forEach((img, i) => {
      if (i === certPanoramaCurrent) {
        img.classList.remove('opacity-0', 'pointer-events-none');
        img.classList.add('opacity-100');
      } else {
        img.classList.remove('opacity-100');
        img.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    // 3. Update Editorial Content (CSS Grid stack col-start-1 row-start-1: ZERO JITTER / ZERO HEIGHT JUMP)
    contents.forEach((c, i) => {
      if (i === certPanoramaCurrent) {
        c.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
        c.classList.add('opacity-100', 'pointer-events-auto', 'z-10');
      } else {
        c.classList.remove('opacity-100', 'pointer-events-auto', 'z-10');
        c.classList.add('opacity-0', 'pointer-events-none', 'z-0');
      }
    });

    // 4. Update Indicators with standard name and step
    if (currentStep && CERT_STANDARDS[certPanoramaCurrent]) {
      currentStep.textContent = CERT_STANDARDS[certPanoramaCurrent];
    }
  }

  function stepCertPanorama(delta) {
    switchCertPanorama(certPanoramaCurrent + delta);
    restartCertPanoramaTimer();
  }

  function restartCertPanoramaTimer() {
    if (certPanoramaTimer) clearInterval(certPanoramaTimer);
    certPanoramaTimer = setInterval(() => {
      switchCertPanorama(certPanoramaCurrent + 1);
    }, CERT_PANORAMA_DURATION);
  }

  window.switchCertPanorama = switchCertPanorama;
  window.stepCertPanorama = stepCertPanorama;

  function initCertPanorama() {
    const showcase = document.getElementById('certPanoramaShowcase');
    if (!showcase) return;

    // Pause on hover
    showcase.addEventListener('mouseenter', () => {
      if (certPanoramaTimer) clearInterval(certPanoramaTimer);
    });
    showcase.addEventListener('mouseleave', () => {
      restartCertPanoramaTimer();
    });

    // Touch swipe support on mobile
    let touchStartX = 0;
    showcase.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    showcase.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) stepCertPanorama(1);
        else stepCertPanorama(-1);
      }
    }, { passive: true });

    switchCertPanorama(0);
    restartCertPanoramaTimer();
  }

  // ---------------------------------------------------------------------------
  // 13. FLOATING BACK TO TOP SCROLL BEHAVIOR
  // ---------------------------------------------------------------------------
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    function handleScroll() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---------------------------------------------------------------------------
  // 14. INERTIAL MOMENTUM SCROLL ENGINE (Pure Vanilla JS · Hardware Accelerated)
  // Provides buttery-smooth, weighted inertial glide across all desktop wheels/trackpads
  // ---------------------------------------------------------------------------
  function initInertialScroll() {
    // Leave pure mobile touch devices to native hardware compositor (iOS/Android momentum)
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isMoving = false;
    let rafId = null;

    // Physics Tuning: Luxurious, weighted European Editorial Glide
    const EASE = 0.082; // Friction/damping factor
    const WHEEL_SPEED = 0.95; // Natural displacement multiplier

    function getMaxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function isInnerScrollable(target) {
      if (!target) return false;
      // Modals & Menu Takeover
      if (target.closest('#fullScreenMenu, #specSheetModal, #harvestModal, [role="dialog"], [data-no-smooth-scroll]')) {
        return true;
      }
      // Vertically scrollable inner containers
      let el = target;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    }

    function update() {
      const diff = targetY - currentY;

      if (Math.abs(diff) > 0.35) {
        currentY += diff * EASE;
        window.scrollTo(0, currentY);
        rafId = requestAnimationFrame(update);
      } else {
        currentY = targetY;
        window.scrollTo(0, targetY);
        isMoving = false;
        rafId = null;
      }
    }

    function onWheel(e) {
      // Respect inner scroll containers and full screen takeover states
      if (isInnerScrollable(e.target)) return;
      if (document.body.classList.contains('overflow-hidden')) return;

      // Prevent jerky native browser scroll step
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 24; // Lines mode
      else if (e.deltaMode === 2) delta *= window.innerHeight; // Pages mode

      // Dampen extreme trackpad/wheel flicks for natural weighted glide
      const clampedDelta = Math.sign(delta) * Math.min(Math.abs(delta), 180);

      const maxScroll = getMaxScroll();
      targetY = Math.max(0, Math.min(maxScroll, targetY + clampedDelta * WHEEL_SPEED));

      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(update);
      }
    }

    // Keep state perfectly synchronized if user drags native scrollbar
    function onNativeScroll() {
      if (!isMoving) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onNativeScroll, { passive: true });
    window.addEventListener('resize', () => {
      const maxScroll = getMaxScroll();
      if (targetY > maxScroll) {
        targetY = maxScroll;
        currentY = maxScroll;
      }
    });

    // Keyboard keys (ArrowUp, ArrowDown, PageUp, PageDown, Space)
    window.addEventListener('keydown', (e) => {
      if (isInnerScrollable(document.activeElement) || document.body.classList.contains('overflow-hidden')) return;
      const tag = (document.activeElement.tagName || '').toLowerCase();
      if (['input', 'textarea', 'select'].includes(tag) || document.activeElement.isContentEditable) return;

      let step = 0;
      if (e.key === 'ArrowDown') step = 90;
      else if (e.key === 'ArrowUp') step = -90;
      else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) step = window.innerHeight * 0.85;
      else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) step = -window.innerHeight * 0.85;

      if (step !== 0) {
        e.preventDefault();
        const maxScroll = getMaxScroll();
        targetY = Math.max(0, Math.min(maxScroll, targetY + step));
        if (!isMoving) {
          isMoving = true;
          rafId = requestAnimationFrame(update);
        }
      }
    });

    // Global programmatic smooth scroll function
    window.smoothScrollTo = function(destY) {
      const maxScroll = getMaxScroll();
      targetY = Math.max(0, Math.min(maxScroll, destY));
      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(update);
      }
    };

    // Smooth In-Page Anchor Links (#rfq, #commodities, #about, #certifications, etc.)
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 72; // Deduct compact sticky navbar height
        const destY = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.smoothScrollTo(destY);

        if (history.pushState) {
          history.pushState(null, '', href);
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 15. GSAP + SCROLLTRIGGER CHOREOGRAPHED ENTERPRISE MOTION SUITE
  // ---------------------------------------------------------------------------
  function initGsapScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Section Cinematic Stagger Entrance (Runs immediately on page load)
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
      const heroKicker = heroSection.querySelector('.text-brand-gold.uppercase');
      const heroH1 = heroSection.querySelector('h1');
      const heroDesc = heroSection.querySelector('p');
      const heroCtas = heroSection.querySelectorAll('.flex.flex-wrap.items-center.gap-3 a');
      const heroPillars = heroSection.querySelectorAll('a.group\\/pillar');

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (heroKicker) {
        heroTl.fromTo(heroKicker, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '+=0.1');
      }
      if (heroH1) {
        heroTl.fromTo(heroH1, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.45');
      }
      if (heroDesc) {
        heroTl.fromTo(heroDesc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 }, '-=0.6');
      }
      if (heroCtas && heroCtas.length) {
        heroTl.fromTo(heroCtas, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1 }, '-=0.45');
      }
      if (heroPillars && heroPillars.length) {
        heroTl.fromTo(heroPillars, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.35');
      }
    }

    // 2. Section Headings Stagger Reveal (Commodities, About, Certifications, RFQ)
    const majorSections = ['#commodities', '#about', '#certifications', '#rfq'];
    majorSections.forEach((sel) => {
      const sec = document.querySelector(sel);
      if (!sec) return;

      const kicker = sec.querySelector('.text-brand-gold');
      const heading = sec.querySelector('h2');
      const desc = sec.querySelector('p');
      const targets = [kicker, heading, desc].filter(Boolean);

      if (targets.length) {
        gsap.fromTo(targets, 
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // 3. Commodity Showcase Track (Wave Stagger Reveal on scroll)
    const commodityTrack = document.getElementById('commodityScrollTrack');
    if (commodityTrack) {
      const cards = commodityTrack.querySelectorAll('.commodity-showcase-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: commodityTrack,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }

    // 4. The Bilateral Model (Frankfurt am Main & Vietnam Origin Portals)
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const portals = aboutSection.querySelectorAll('.grid-cols-1.lg\\:grid-cols-2 > div');
      if (portals.length >= 2) {
        gsap.fromTo(portals[0],
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(portals[1],
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }

    // 5. Standards & Certifications 4 Metrics and Panorama Stage
    const certSection = document.getElementById('certifications');
    if (certSection) {
      const metrics = certSection.querySelectorAll('.group\\/metric');
      if (metrics.length) {
        gsap.fromTo(metrics,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: certSection,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      const panorama = document.getElementById('certPanoramaShowcase');
      if (panorama) {
        gsap.fromTo(panorama,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panorama,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }

    // 6. RFQ Procurement Form Card
    const rfqFormCard = document.getElementById('inquiryFormContainer');
    if (rfqFormCard) {
      gsap.fromTo(rfqFormCard,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#rfq',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  // ---------------------------------------------------------------------------
  // 16. BOOTSTRAP ALL MODULES ON DOM READY
  // ---------------------------------------------------------------------------
  function initApp() {
    initIcons();
    initCopyright();
    initMenuListeners();
    initHeaderScroll();
    initRFQForm();
    initHeroParallax();
    initWhoWeAreScrollExpansion();
    initCommodityTrack();
    initCommodityStaggerReveal();
    initCertPanorama();
    initBackToTop();
    initInertialScroll();
    initGsapScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
