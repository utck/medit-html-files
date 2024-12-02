(function ($) {
  "use strict";

  const MEDIT_THEME = {
    init: function () {
      this.dom();
      this.pageLoading();
      this.lazyload();
      this.headerSticky();
      this.headerTransparent();
      this.headerHeightCalculate();

      this.toggleAnimation({
        containerClass: '.site-drawer',
        buttonClass: '.toggle-button',
        closeButtonClass: '.site-close a',
        overlayClass: '.site-drawer-overlay',
        activeBodyClass: 'drawer-open',
        buttonSuffix: '-toggle'
      });

      this.toggleAnimation({
        containerClass: '.site-holder',
        buttonClass: '.holder-button',
        closeButtonClass: '.site-close a',
        overlayClass: '.site-holder-overlay',
        activeBodyClass: 'holder-open',
        buttonSuffix: '-holder'
      });

      this.mobileDropdownMenu();
      this.megaMenuWrap();
      this.splittingAnimation();
      this.inviewAnimation();
      this.sliderAnimation();
      this.hoverGallerySlider();
      this.goToTop();
      this.productQuantity();
      this.loginPage();
      this.gdpr();
      this.lightBox();
      this.newsletterLightbox();
    },
    dom: function () {
      const { cubicBezier } = Motion;

      // Global variables
      this.loading = false;
      // Create split text
      const splitText = new SplitType('.split-text');

      // Motion easing animations
      this.easings = {
        // Power1
        power1: cubicBezier(0.55, 0.085, 0.68, 0.53),      // Power1.in
        power1Out: cubicBezier(0.25, 0.46, 0.45, 0.94),    // Power1.out
        power1InOut: cubicBezier(0.455, 0.03, 0.515, 0.955), // Power1.inOut

        // Power2
        power2: cubicBezier(0.55, 0.055, 0.675, 0.19),     // Power2.in
        power2Out: cubicBezier(0.215, 0.61, 0.355, 1),     // Power2.out
        power2InOut: cubicBezier(0.645, 0.045, 0.355, 1),  // Power2.inOut

        // Power3
        power3: cubicBezier(0.895, 0.03, 0.685, 0.22),     // Power3.in
        power3Out: cubicBezier(0.165, 0.84, 0.44, 1),      // Power3.out
        power3InOut: cubicBezier(0.77, 0, 0.175, 1),       // Power3.inOut

        // Power4
        power4: cubicBezier(0.755, 0.05, 0.855, 0.06),     // Power4.in
        power4Out: cubicBezier(0.23, 1, 0.32, 1),          // Power4.out
        power4InOut: cubicBezier(0.86, 0, 0.07, 1),        // Power4.inOut

        // Expo
        expoIn: cubicBezier(0.95, 0.05, 0.795, 0.035),     // Expo.in
        expoOut: cubicBezier(0.19, 1, 0.22, 1),            // Expo.out
        expoInOut: cubicBezier(1, 0, 0, 1),                // Expo.inOut

        // Back
        backIn: cubicBezier(0.6, -0.28, 0.735, 0.045),
        backOut: cubicBezier(0.175, 0.885, 0.32, 1.275),
        backInOut: cubicBezier(0.68, -0.55, 0.265, 1.55),

        // Circ
        circIn: cubicBezier(0.6, 0.04, 0.98, 0.335),
        circOut: cubicBezier(0.075, 0.82, 0.165, 1),
        circInOut: cubicBezier(0.785, 0.135, 0.15, 0.86),
      
        // Bounce
        bounceOut: cubicBezier(0.34, 1.56, 0.64, 1),
        
        // Custom
        smooth: cubicBezier(0.4, 0, 0.2, 1),
        smoothOut: cubicBezier(0, 0.7, 0.3, 1),

        // Smooth animasyonlar için
        smoothA: cubicBezier(0.35, 0.17, 0.3, 0.86),
        smoothB: cubicBezier(0.33, 1, 0.68, 1),
        smoothC: cubicBezier(0.65, 0, 0.35, 1),

        // Material Design easing
        material: cubicBezier(0.4, 0, 0.2, 1),
        materialAccelerate: cubicBezier(0.4, 0, 1, 1),
        materialDecelerate: cubicBezier(0, 0, 0.2, 1)
      }
    },
    pageLoading: function() {
      const { animate } = Motion;
      const easings = this.easings;
    
      const pageLoading = document.querySelector('.site-page-loading');
      if (!pageLoading) return;
    
      let isPageLoaded = false;
      let captionAnimationComplete = false;
    
      const animateCaption = async () => {
        const captionsInner = pageLoading.querySelector('.page-loading-captions-inner');
        if (!captionsInner) {
          captionAnimationComplete = true;
          return;
        }
    
        const captions = captionsInner.querySelectorAll('.page-loading-caption');
        const captionCount = captions.length;
        let currentIndex = 0;
    
        captionsInner.style.transform = 'translateY(0)';
    
        const animateNext = async () => {
          if (currentIndex === 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
    
          currentIndex++;
          if (currentIndex >= captionCount) {
            captionAnimationComplete = true;

            if (isPageLoaded) return;
            currentIndex = 0;
          }
    
          await animate(
            captionsInner,
            { transform: `translateY(-${(100 / captionCount) * currentIndex}%)` },
            { 
              duration: 0.8,
              ease: easings.power2InOut
            }
          ).finished;
    
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          if (isPageLoaded && currentIndex >= captionCount - 1) {
            captionAnimationComplete = true;
            return;
          }
    
          animateNext();
        };
    
        animateNext();
      };
    
      const loadPage = () => {
        return new Promise((resolve) => {
          const loadingCount = pageLoading.querySelector('.page-loading-count');
          if (!loadingCount) {
            resolve();
            return;
          }

          const images = Array.from(document.images)
            .filter(img => !img.loading || img.loading !== 'lazy');
          
          let loadedImages = 0;
          const totalImages = images.length;

          const minDuration = 1500; // Minimum 3 saniye
          const startTime = Date.now();

          loadingCount.textContent = "00%";

          const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const timeProgress = Math.min((elapsed / minDuration) * 100, 100);
            
            loadingCount.textContent = `${Math.floor(timeProgress).toString().padStart(2, '0')}%`;

            if (elapsed >= minDuration) {
              clearInterval(progressInterval);
              resolve();
            }
          };

          const progressInterval = setInterval(updateProgress, 30);

          images.forEach(img => {
            if (!img.complete) {
              img.onload = () => loadedImages++;
              img.onerror = () => loadedImages++;
            } else {
              loadedImages++;
            }
          });
        });
      };
    
      animateCaption();

      const closeLoading = async () => {
        try {
          const inner = pageLoading.querySelector('.site-page-loading-inner');
          const bg = pageLoading.querySelector('.site-page-loading-bg');
      
          inner.style.opacity = '1';
          bg.style.transform = 'translateY(0%)';
      
          animate([
            [inner, { opacity: 0 }, { duration: 0.6 }],
            [bg, { transform: 'translateY(-100%)' }, { duration: 1.6, at: 0.3 }]
          ], { 
            ease: easings.power3InOut,
            onComplete: () => {
              setTimeout(() => {
                pageLoading.remove();
              }, 100);
            }
          });
      
        } catch (error) {
          console.error('Loading close animation error:', error);
          pageLoading.remove();
        }
      };
      
      loadPage().then(() => {
        isPageLoaded = true;
        
        const captionsInner = pageLoading.querySelector('.page-loading-captions-inner');
        
        if (!captionsInner) {
          closeLoading();
          return;
        }

        const waitForCaption = () => {
          if (captionAnimationComplete) {
            closeLoading();
          } else {
            setTimeout(waitForCaption, 100);
          }
        };
        
        waitForCaption();
      });
    },
    lazyload: function () {
      // Global instance
      const lazyLoad = new LazyLoad({
        elements_selector: ".lazy",
        use_native: true, // Native lazy loading
        threshold: 0, // Loading distance
        callback_enter: (element) => {
          element.parentElement.classList.add('is-loading');
        },
        callback_loaded: (element) => {
          element.parentElement.classList.remove('is-loading');
          element.parentElement.classList.add('is-loaded');
        },
        callback_error: (element) => {
          // Loading error
        }
      });
    },
    createElement: function (value, tag, attributes) {
      const element = document.createElement(tag);
      Object.assign(element, attributes);
      element.innerHTML = value;

      return element.firstElementChild;
    },
    wrap: function(element, target) {
      if (!element || !target) return;
      let wrapper;

      if (typeof target === "object" && target.nodeType === 1) {
        wrapper = target;
      } else {
        wrapper = this.createElement(target);
      }
    
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
    
      return wrapper;
    },
    headerSticky: function() {
      const header = document.querySelector('.site-header');
      const pageContent = document.querySelector('.page-content');
      if (!header || !pageContent || !header.classList.contains('is-sticky')) return;

      // Header için wrapper oluştur
      const headerWrapper = document.createElement('div');
      headerWrapper.classList.add('sticky-header-wrapper');
      
      const updateHeaderHeight = () => {
        header.style.display = 'none';
        header.offsetHeight;
        header.style.display = '';
        
        const headerHeight = header.offsetHeight;
        headerWrapper.style.height = `${headerHeight}px`;
      };

      // Initial setup
      updateHeaderHeight();
      header.parentNode.insertBefore(headerWrapper, header);
      headerWrapper.appendChild(header);

      // Scroll pozisyonunu kontrol et
      const scrollThreshold = 10;
      let headerTop = headerWrapper.getBoundingClientRect().top;

      const handleScroll = () => {
        headerTop = headerWrapper.getBoundingClientRect().top;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (headerTop <= 0) {
          header.classList.add('is-fixed');
          header.style.position = 'fixed';
          header.style.width = '100%';
          header.style.top = '0';

          if (scrollTop > scrollThreshold) {
            header.classList.add('stuck');
            this.headerHeightCalculate();
          } else {
            header.classList.remove('stuck');
            this.headerHeightCalculate();
          }
        } else {
          header.classList.remove('is-fixed', 'stuck');
          header.style.position = 'relative';
          header.style.width = 'auto';
          header.style.top = '0';
          this.headerHeightCalculate();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      // Resize observers
      const resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
        handleScroll();
      });

      resizeObserver.observe(header);

      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          updateHeaderHeight();
          handleScroll();
        }, 250);
      });

      const mediaQueries = [
        window.matchMedia('(min-width: 1024.02px)'),
        window.matchMedia('(max-width: 1024px)'),
        window.matchMedia('(max-width: 767px)')
      ];

      mediaQueries.forEach(query => {
        query.addListener(() => {
          updateHeaderHeight();
          handleScroll();
        });
      });

      // Initial scroll check
      handleScroll();
    },
    headerTransparent: function() {
      const header = document.querySelector('.site-header.transparent');
      if (!header) return;

      const megaMenus = header.querySelectorAll('.menu-item-has-children.mega-menu');
      let isMegaMenuHovered = false;
    
      header.addEventListener('mouseenter', () => {
        header.classList.add('hover');
      });
    
      header.addEventListener('mouseleave', () => {
        if (isMegaMenuHovered) {
          setTimeout(() => {
            header.classList.remove('hover');
            isMegaMenuHovered = false;
          }, 230);
        } else {
          header.classList.remove('hover');
        }
      });
    
      // Mega menu hover kontrolü
      megaMenus.forEach(megaMenu => {
        megaMenu.addEventListener('mouseenter', () => {
          isMegaMenuHovered = true;
        });
      });
    },
    headerHeightCalculate: function() {
      const header = document.querySelector('.site-header');
      const announcement = document.querySelector('.site-announcement-bar');
      const subheader = document.querySelector('.site-subheader');
      const adminbar = document.querySelector('#wpadminbar');
      const root = document.documentElement;

      const mediaQuery = window.matchMedia('(min-width: 1024.02px)');

      const calculateHeight = () => {
        if (mediaQuery.matches) {
          let totalHeight = parseFloat(getComputedStyle(root).getPropertyValue('--theme-header-height-desktop'));

          if (!header.classList.contains('stuck')) {
            if (announcement) {
              totalHeight += announcement.offsetHeight;
            }
  
            if (subheader) {
              totalHeight += subheader.offsetHeight;
            }

            if (adminbar) {
              totalHeight += adminbar.offsetHeight;
            }
          }

          header.style.setProperty('--header-height-desktop', `${totalHeight}px`);
        } else {
          header.style.removeProperty('--header-height-desktop');
        }
      }

      calculateHeight();
      mediaQuery.addEventListener('change', calculateHeight);
    },
    toggleAnimation: function(config) {
      const defaults = {
        containerClass: '.site-drawer',
        buttonClass: '.toggle-button',
        closeButtonClass: '.site-close a',
        overlayClass: '.site-drawer-overlay',
        activeBodyClass: 'drawer-open',
        buttonSuffix: '-toggle'
      };
    
      const options = { ...defaults, ...config };
      
      const containers = document.querySelectorAll(options.containerClass);
      const toggleButtons = document.querySelectorAll(options.buttonClass);
      const closeButtons = document.querySelectorAll(options.closeButtonClass);
      const overlays = document.querySelectorAll(options.overlayClass);
    
      const closeActive = () => {
        containers.forEach(container => container.classList.remove('active'));
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        document.body.classList.remove(options.activeBodyClass);
      };
    
      toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          const buttonClasses = Array.from(button.classList);
          const toggleClass = buttonClasses.find(cls => 
            cls.endsWith(options.buttonSuffix)
          );
          const type = toggleClass.replace(options.buttonSuffix, '');
    
          closeActive();
          
          button.classList.add('active');
          
          const targetContainer = Array.from(containers).find(container => 
            container.classList.contains(`${type}-${options.containerClass.replace('.site-', '')}`)
          );
          
          if (targetContainer) {
            targetContainer.classList.add('active');
          }
    
          document.body.classList.add(options.activeBodyClass);
        });
      });
    
      closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeActive();
        });
      });
    
      overlays.forEach(overlay => {
        overlay.addEventListener('click', closeActive);
      });
    
      document.addEventListener('click', (e) => {
        if (!e.target.closest(options.containerClass) && 
            !e.target.closest(options.buttonClass)) {
          closeActive();
        }
      });
    },
    mobileDropdownMenu: function() {
      const mobileQuery = window.matchMedia('(max-width: 1023px)');

      function calculateTotalHeight(submenu) {
        let totalHeight = submenu.scrollHeight;
        
        const activeNestedSubmenus = submenu.querySelectorAll('.active > .sub-menu');
        activeNestedSubmenus.forEach(nestedSubmenu => {
          totalHeight += nestedSubmenu.scrollHeight;
        });
        
        return totalHeight;
      }

      function initMobileMenu(e) {
        cleanup();
        
        if (!e.matches) return;
      
        const dropdownIcon = `
          <svg class="dropdown-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
        const mobileMenu = document.querySelectorAll('.site-navigation.menu-vertical');
        mobileMenu.forEach((menu) => {
          const menuItemsWithChildren = menu.querySelectorAll('.menu-item-has-children');
      
          menuItemsWithChildren.forEach(menuItem => {
            const link = menuItem.querySelector('a');
            
            const wrapper = document.createElement('div');
            wrapper.className = 'menu-item-wrapper';
            
            link.parentNode.insertBefore(wrapper, link);
            wrapper.appendChild(link);
            
            const iconDiv = document.createElement('div');
            iconDiv.className = 'dropdown-icon-wrapper';
            iconDiv.innerHTML = dropdownIcon;
            wrapper.appendChild(iconDiv);
            
            const submenu = menuItem.querySelector('.sub-menu');
            
            const linkClickHandler = (e) => {
              if (link.getAttribute('href') === '#') {
                e.preventDefault();
                toggleSubmenu(menuItem, submenu);
              }
            };
            
            const iconClickHandler = (e) => {
              e.stopPropagation();
              toggleSubmenu(menuItem, submenu);
            };
        
            menuItem.mobileMenuHandlers = {
              link: linkClickHandler,
              icon: iconClickHandler
            };
        
            link.addEventListener('click', linkClickHandler);
            iconDiv.addEventListener('click', iconClickHandler);
          });
        })
      }

      function cleanup() {
        const mobileMenu = document.querySelectorAll('.site-navigation.menu-vertical');
        mobileMenu.forEach((menu) => {
          const menuItemsWithChildren = menu.querySelectorAll('.menu-item-has-children');
          
          menuItemsWithChildren.forEach(menuItem => {
            const wrapper = menuItem.querySelector('.menu-item-wrapper');
            if (wrapper) {
              const link = wrapper.querySelector('a');
              menuItem.insertBefore(link, wrapper);
              wrapper.remove();
            }

            if (menuItem.mobileMenuHandlers) {
              const link = menuItem.querySelector('a');
              link.removeEventListener('click', menuItem.mobileMenuHandlers.link);
              delete menuItem.mobileMenuHandlers;
            }

            menuItem.classList.remove('active');
            const submenu = menuItem.querySelector('.sub-menu');
            if (submenu) {
              submenu.style.maxHeight = '';
            }
          });
        });
      }

      function toggleSubmenu(menuItem, submenu) {
        if (!mobileQuery.matches) return;
      
        const isActive = menuItem.classList.contains('active');
        
        const activeSiblings = menuItem.parentElement.querySelectorAll('.menu-item.active');
        activeSiblings.forEach(sibling => {
          if (sibling !== menuItem) {
            sibling.classList.remove('active');
            const siblingSubmenu = sibling.querySelector('.sub-menu');
            if (siblingSubmenu) {
              siblingSubmenu.style.maxHeight = '0px';
            }
            const activeChildren = sibling.querySelectorAll('.active');
            activeChildren.forEach(child => {
              child.classList.remove('active');
              const childSubmenu = child.querySelector('.sub-menu');
              if (childSubmenu) {
                childSubmenu.style.maxHeight = '0px';
              }
            });
          }
        });
        
        if (!isActive) {
          menuItem.classList.add('active');
          if (submenu) {

            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            
            let parent = menuItem.parentElement.closest('.sub-menu');
            while (parent) {
              const totalHeight = calculateTotalHeight(parent);
              parent.style.maxHeight = totalHeight + 'px';
              parent = parent.parentElement.closest('.sub-menu');
            }
          }
        } else {
          menuItem.classList.remove('active');
          if (submenu) {
            submenu.style.maxHeight = '0px';
            
            let parent = menuItem.parentElement.closest('.sub-menu');
            while (parent) {
              const totalHeight = calculateTotalHeight(parent);
              parent.style.maxHeight = totalHeight + 'px';
              parent = parent.parentElement.closest('.sub-menu');
            }
          }
          const activeChildren = menuItem.querySelectorAll('.active');
          activeChildren.forEach(child => {
            child.classList.remove('active');
            const childSubmenu = child.querySelector('.sub-menu');
            if (childSubmenu) {
              childSubmenu.style.maxHeight = '0px';
            }
          });
        }
      }

      document.addEventListener('DOMContentLoaded', () => {
        initMobileMenu(mobileQuery);
        
        try {
          mobileQuery.addEventListener('change', initMobileMenu);
        } catch (e1) {
          try {
            mobileQuery.addListener(initMobileMenu);
          } catch (e2) {
            console.error('Could not add media query listener:', e2);
          }
        }
      });
    },
    megaMenuWrap: function() {
      const menu = document.querySelectorAll('.site-navigation.menu-horizontal .mega-menu > .sub-menu');

      if (menu !== null) {
        menu.forEach((item) => {
          this.wrap(item, "<div class='sub-menu mega-sub-menu'></div>");
        })
      }
    },
    splittingAnimation: function() {
      const { animate, inView, stagger } = Motion;
      const hasLoading = document.querySelector('.site-page-loading');

      const initSplitAnimations = () => {
        // Split text animation styles
        const splitAnimations = {
          'split-style-1': {
            initial: (elements, index, total) => ({
              opacity: 0,
              transform: `translateY(30px) rotate(${index <= total/2 ? -3 : 3}deg)`,
              transformOrigin: index <= total/2 ? '100% 100%' : '0% 100%'
            }),
            animate: {
              opacity: 1,
              transform: 'translateY(0) rotate(0deg)'
            }
          },
          'split-style-2': {
            initial: (elements, index, total) => ({
              opacity: 0,
              transform: 'scale(1.3)'
            }),
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          },
          'split-style-3': {
            initial: (elements, index, total) => ({
              opacity: 0,
              transform: 'scale(0.7)'
            }),
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          },
          'split-style-4': {
            initial: (elements, index, total) => ({
              opacity: 0,
              transform: 'translateY(50%) rotate(-5deg)',
              transformOrigin: '0% 50%',
            }),
            animate: {
              opacity: 1,
              transform: 'translateY(0) rotate(0deg)'
            }
          },
          'split-style-5': {
            initial: (elements, index, total) => ({
              opacity: 0,
              transform: 'translateX(-20%)',
            }),
            animate: {
              opacity: 1,
              transform: 'translateX(0%)',
            }
          },
          'split-style-6': {
            initial: (elements, index, total) => ({
              opacity: 0,
              transform: 'translateX(20%)',
            }),
            animate: {
              opacity: 1,
              transform: 'translateX(0%)',
            }
          },
          'split-style-7': {
            initial: (elements, index, total) => ({
              opacity: 0,
            }),
            animate: {
              opacity: 1,
            }
          }
        }

        // Prepare split text elements
        document.querySelectorAll('.split-text').forEach(element => {
          if (!element) return;

          const style = element.dataset.splitStyle;
          const animation = splitAnimations[style];
          const duration = Number(element.dataset.splitDuration) || 0.8;
          const selectedEasing = element.dataset.easings;

          if (!animation) return;

          // Choice of words or chars
          const type = element.dataset.splitType || 'words';
          let elements;
          switch(type) {
            case 'lines':
              elements = element.querySelectorAll('.line');
              break;
            case 'words':
              elements = element.querySelectorAll('.word');
              break;
            case 'chars':
              elements = element.querySelectorAll('.char');
              break;
            default:
              elements = element.querySelectorAll('.word'); // fallback to words
          }
          const total = elements.length;

          // Set initial states
          elements.forEach((el, index) => {
            const initialProps = animation.initial(el, index, total);
            Object.assign(el.style, {
              willChange: 'transform, opacity',
              ...initialProps
            });
          });

          // Default animation settings
          const animationSettings = {
            delay: stagger(0.05),
            duration: duration
          };

          // If selected easing exists, apply it
          if (selectedEasing && this.easings[selectedEasing]) {
            animationSettings.ease = this.easings[selectedEasing];
          }

          // Inview animation
          inView(element, () => {
            animate(elements, animation.animate, animationSettings);
          });
        });
      }

      if (hasLoading) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.removedNodes.length && Array.from(mutation.removedNodes).some(node => node === hasLoading)) {
              initSplitAnimations();
              observer.disconnect();
            }
          });
        });
    
        observer.observe(document.body, { childList: true });
      } else {
        // Loading yoksa hemen başlat
        initSplitAnimations();
      }
    },
    inviewAnimation: function() {
      const { animate, inView, stagger } = Motion;
      const easings = this.easings;

      const hasLoading = document.querySelector('.site-page-loading');

      const initInviewAnimations = () => {
        const inviewAnimations = {
          'fade': {
            animate: {
              opacity: 1
            }
          },
          'transformY': {
            animate: {
              opacity: 1,
              transform: 'translateY(0)'
            }
          },
          'transformYreverse': {
            animate: {
              opacity: 1,
              transform: 'translateY(0)'
            }
          },
          'transformX': {
            animate: {
              opacity: 1,
              transform: 'translateX(0)'
            }
          },
          'transformXreverse': {
            animate: {
              opacity: 1,
              transform: 'translateX(0)'
            }
          },
          'scaleUp': {
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          },
          'scaleDown': {
            animate: {
              opacity: 1,
              transform: 'scale(1)'
            }
          }
        }

        // Css variable for duration
        const rootStyles = getComputedStyle(document.documentElement);
        const defaultDuration = parseFloat(rootStyles.getPropertyValue('--theme-inview-animation-duration')) || 0.8;

        // Group elements by their viewport position
        const groupedElements = new Map();
        
        document.querySelectorAll('.inview-element').forEach(element => {
          if (!element) return;

          const animationType = element.dataset.inviewAnimation;
          const selectedEasing = element.dataset.easings;
          const animation = inviewAnimations[animationType];

          if (!animation) return;

          // Set initial state
          Object.assign(element.style, {
            ...animation.initial,
            willChange: 'transform, opacity'
          });

          // Get the element's position relative to viewport
          const rect = element.getBoundingClientRect();
          const viewportPosition = Math.floor(rect.top / 200); // Group elements by 200px segments
          
          if (!groupedElements.has(viewportPosition)) {
            groupedElements.set(viewportPosition, []);
          }
          groupedElements.get(viewportPosition).push({
            element,
            animation,
            easing: selectedEasing
          });
        });

        // Animate each group
        groupedElements.forEach((group) => {
          const elements = group.map(item => item.element);
          const firstElement = elements[0];
          
          inView(firstElement, () => {
            group.forEach((item, index) => {
              animate(
                item.element,
                item.animation.animate,
                {
                  duration: defaultDuration,
                  delay: index * 0.1, // Manual stagger delay
                  ease: item.easing && easings[item.easing] ? easings[item.easing] : undefined
                }
              );
            });
          }, {
            amount: 0, // Element must be 30% visible before animation triggers
            once: true
          });
        });
        

        /* const elements = document.querySelectorAll('.inview-element');

        elements.forEach((element, index) => {
          if (!element) return;
      
          const animationType = element.dataset.inviewAnimation;
          const selectedEasing = element.dataset.easings;
          const staggerDelay = 0.1;
          const animation = inviewAnimations[animationType];
      
          if (!animation) return;
      
          const animationSettings = {
            duration: defaultDuration,
            delay: index * staggerDelay
          };
      
          if (selectedEasing && easings[selectedEasing]) {
            animationSettings.ease = easings[selectedEasing];
          }
      
          inView(element, () => {
            animate(element, animation.animate, animationSettings);
          }, {
            amount: 0, 
            once: true
          });
        }); */
      }

      if (hasLoading) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.removedNodes.length && Array.from(mutation.removedNodes).some(node => node === hasLoading)) {
              initInviewAnimations();
              observer.disconnect();
            }
          });
        });
    
        observer.observe(document.body, { childList: true });
      } else {
        initInviewAnimations();
      }
    },
    sliderAnimation: function() {
      const slider = document.querySelectorAll('.site-slider-wrapper');

      slider.forEach((element) => {
        const slide = element.querySelector('.site-slider');
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        slide.appendChild(preloader);

        const items = Number(slide.dataset.items) || 1;
        const itemsTablet = Number(slide.dataset.itemsTablet) || 1;
        const itemsMobile = Number(slide.dataset.itemsMobile) || 1;

        const slidesPerGroup = Number(slide.dataset.slidesPerGroup) || 1;

        const spaceBetween = Number(slide.dataset.margin) || 0;
        const spaceBetweenTablet = Number(slide.dataset.marginTablet) || 0;
        const spaceBetweenMobile = Number(slide.dataset.marginMobile) || 0;

        const speed = Number(slide.dataset.speed) || 400;

        const direction = slide.dataset.direction || 'horizontal';
        const loop = slide.dataset.loop === 'true' ? true : false || false;

        const autoplay = slide.dataset.autoplay || false;
        const autoplaySpeed = Number(slide.dataset.autoplaySpeed) || 2000;

        const mousewheel = slide.dataset.mousewheel === 'true' ? true : false || false;
        const simulateTouch = slide.dataset.simulateTouch === 'true' ? true : false || false;

        const parallax = slide.dataset.parallax === 'true' ? true : false || false;

        const controls = element.querySelector('.swiper-controls');

        const args = {
          // Optional parameters
          slidesPerView: itemsMobile,
          slidesPerGroup: slidesPerGroup,

          direction: direction,
          loop: loop,
          speed: speed,
          spaceBetween: spaceBetweenMobile,

          parallax: parallax,

          observer: true,
          watchSlidesProgress: true,
          lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
          },
        
          // If we need pagination
          pagination: {
            el: controls ? controls.querySelector('.swiper-pagination') : '.swiper-pagination',
            clickable: true
          },
        
          // Navigation arrows
          navigation: {
            nextEl: controls ? controls.querySelector('.swiper-button-next') : '.swiper-button-next',
            prevEl: controls ? controls.querySelector('.swiper-button-prev') : '.swiper-button-prev',
          },

          mousewheel: mousewheel,
          simulateTouch: simulateTouch,

          slideVisibleClass: 'slide-on-visible',
        
          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },

          breakpoints: {
            // when window width is >= 320px
            567: {
              slidesPerView: itemsMobile,
              spaceBetween: spaceBetweenMobile
            },
            // when window width is >= 768px
            768: {
              slidesPerView: itemsTablet,
              spaceBetween: spaceBetweenTablet
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: items,
              spaceBetween: spaceBetween
            }
          },

          on: {
            init: function(el) {
              el.slides.forEach(slide => {
                if (!slide.classList.contains('slide-on-visible')) {
                  const firstChild = slide.children[0];
                  if (firstChild && firstChild.classList.contains('inview-element')) {
                    firstChild.classList.remove('inview-element');
                  }
                }
              });
              setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                  element.classList.add('slider-initialized');
                  preloader.remove();
                }, 300);
              }, 500);
            }
          }
        }

        if (autoplay === 'true') {
          args.autoplay = {
            delay: autoplaySpeed,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true
          }
        }
        
        const swiper = new Swiper(slide, args);
      })
    },
    hoverGallerySlider: function() {
      const container = document.querySelectorAll('.hover-gallery-slider');
      if (container !== null) {
        container.forEach(self => {
          const slider = new HoverSlider({
            selector: self,
            debug: false,
            duration: Number(0.4),
            delay: Number(0),
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          });
        });
      }
    },
    goToTop: function() {
      const goToTop = document.querySelector('.site-go-to-top');
      if (!goToTop) return;
    
      const button = goToTop.querySelector('.go-to-top-button');
      const circle = goToTop.querySelector('.progress-ring__circle');
      let circleMetrics = { circumference: 0, radius: 0 };
      
      const updateCircleSize = () => {
        const buttonSize = button.offsetWidth;
        const strokeWidth = 2;
        // Calculate radius to fit the button perfectly
        const radius = (buttonSize / 2) - (strokeWidth / 2);
        
        // Update SVG viewBox
        const svg = circle.closest('.progress-ring');
        svg.setAttribute('viewBox', `0 0 ${buttonSize} ${buttonSize}`);
        
        // Update circle attributes
        circle.setAttribute('r', radius);
        circle.setAttribute('cx', buttonSize / 2);
        circle.setAttribute('cy', buttonSize / 2);
        
        // Calculate progress ring metrics
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        // Update metrics
        circleMetrics = { circumference, radius };
      };
    
      const initCircle = () => {
        requestAnimationFrame(() => {
          updateCircleSize();
        });
      };
    
      initCircle();
    
      window.addEventListener('load', initCircle);
      
      // Resize event
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initCircle, 100);
      });
    
      function setProgress(percent) {
        const offset = circleMetrics.circumference - (percent / 100 * circleMetrics.circumference);
        circle.style.strokeDashoffset = offset;
      }
    
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    
        if (scrollTop > 200) {
          goToTop.classList.add('active');
        } else {
          goToTop.classList.remove('active');
        }
    
        setProgress(scrollPercent);
      });
    
      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    },
    productQuantity: function() {
      const themeAjaxQuantity = (event, target) => {
        const block = document.querySelectorAll('.cart-with-quantity');
    
        if (block !== null) {
          for( var i = 0; i < block.length; i++ ) {
            const self = block[i];
            const button = self.querySelector('.add-to-cart-quantity');
            const quantity = self.querySelector('.ajax-quantity');
    
            const addQty = () => {
              quantity.style.cssText = `display: flex`;
            }
    
            button.addEventListener('click', (e) => {
              e.preventDefault();
              e.target.closest('A').style.cssText = `display: none`;
              addQty();
            });
    
            if (Number(event) === 0) {
              const parentDiv = target.closest('.quantity.ajax-quantity');
              const targetCartButton = target.closest('.cart-with-quantity').querySelector('.add-to-cart-quantity');
              targetCartButton.style.cssText = `display: inline-flex`;
              parentDiv.style.cssText = `display: none !important`;
            }
          }
        }
      }
    
      const container = document.querySelectorAll('.quantity');
    
      if (container !== null) {
        for( var i = 0; i < container.length; i++ ) {
          const self = container[i];
          const changeQuantity = () => {
            const buttons = self.querySelectorAll('.quantity-button');
    
            if (buttons !== null) {
              buttons.forEach((button) => {
                const qty_input = self.querySelector('.input-text.qty');
                if (qty_input.disabled) return;
    
                let qty_step = parseFloat(qty_input.getAttribute('step'));
                let qty_min = parseFloat(qty_input.getAttribute('min'));
                let qty_max = parseFloat(qty_input.getAttribute('max'));
    
                button.addEventListener('click', (e) => {
                  if (e.target.closest('DIV').classList.contains('minus')) {
                    let oldValue = parseFloat(qty_input.value);
                    if (isNaN(oldValue)) {
                      qty_input.val = 0;
                    }
                    qty_input.value = ((oldValue - qty_step) < qty_min) ? qty_min : (oldValue - qty_step);
                  } else {
                    let oldValue = parseFloat(qty_input.value);
                    if (isNaN(oldValue)) {
                      qty_input.val = 0;
                    }
                    qty_input.value = ((oldValue + qty_step) > qty_max) ? qty_max : (oldValue + qty_step);
                  }
    
                  qty_input.addEventListener('change', () => {
                    themeAjaxQuantity(qty_input.value, e.target);
                    if (self.classList.contains('ajax-quantity') && qty_input.value === '0') {
                      qty_input.value = 1;
                    }
                  });
                  qty_input.dispatchEvent(new Event('change'))
                })
              })
            }
          }
    
          changeQuantity();
          if (!self.classList.contains('ajax-quantity')) {
            $('body').on( 'updated_cart_totals', changeQuantity );
          }
        }
      }
    },
    loginPage: function() {
      const tab = document.querySelectorAll('.login-page-tab li');
      const form = document.querySelector('.login-form-container');

      if (tab !== null && form !== null) {
        const removeClass = () => {
          for ( var i = 0; i < tab.length; i++ ) {
            if ( tab[i].children[0].classList.contains( 'active' ) ) {
              tab[i].children[0].classList.remove('active');
            }
          }
        }

        for ( var i = 0; i < tab.length; i++ ) {
          const button = tab[i].children[0];
          button.addEventListener( 'click', (event) => {
            event.preventDefault();
            if ( !event.target.classList.contains( 'active' ) ) {
              removeClass();
              event.target.classList.add( 'active' );
              form.classList.toggle( 'show-register-form' );
            }
          });
        }
      }
    },
    gdpr: function() {
      const { animate, inView, stagger } = Motion;
      const body = document.querySelector('body');
      const close = document.querySelector('.site-gdpr .btn');
      const gdpr = document.querySelector('.site-gdpr');

      if (!gdpr) return;

      const expiresDate = parseInt(gdpr.dataset.expires) || 30;

      // Initial state
      gdpr.style.opacity = '0';
      gdpr.style.visibility = 'hidden';
      gdpr.style.transform = 'translateY(100%)';

      const showGdpr = () => {
        animate(
          gdpr,
          { 
            opacity: 1,
            visibility: 'visible',
            transform: 'translateY(0)' 
          },
          { 
            duration: 0.3,
            ease: 'cubic-bezier(0.77, 0, 0.175, 1)' // power4.inOut easing equivalent
          }
        );
        gdpr.classList.add('active');
      };

      const hideGdpr = () => {
        animate(
          gdpr,
          { 
            opacity: 0,
            visibility: 'hidden',
            transform: 'translateY(100%)' 
          },
          { 
            duration: 0.3,
            ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
            onComplete: () => {
              gdpr.classList.remove('active');
            }
          }
        );
      };

      if (body.classList.contains('cookie-popup-enable') && !Cookies.get('cookie-popup-visible')) {
        window.addEventListener('DOMContentLoaded', showGdpr);
      }

      close.addEventListener('click', (e) => {
        e.preventDefault();
        Cookies.set('cookie-popup-visible', 'disable', { expires: expiresDate, path: '/' });
        hideGdpr();
      });
    },
    lightBox: function() {
      const gallery = document.querySelectorAll('.site-lightbox-gallery');
      if (gallery.length === 0) return;

      gallery.forEach(self => {
        const LeftArrow = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>';
        const RightArrow = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>';
        const ZoomIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fullscreen"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="8" x="7" y="8" rx="1"/></svg>';
        const CloseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        console.log(self);
        const lightbox = new PhotoSwipeLightbox({
          gallery: self,
          children: '.gallery-item',
          showHideAnimationType: "zoom",
          arrowPrevSVG: LeftArrow,
          arrowNextSVG: RightArrow,
          closeSVG: CloseIcon,
          zoomSVG: ZoomIcon,
          pswpModule: PhotoSwipe
        });

        lightbox.init();
      });
    },
    newsletterLightbox: function() {
      const lightbox = document.querySelector('.site-subscribe-lightbox');
      const body = document.querySelector('body');
      if (!lightbox) return;

      const expiresDate = parseInt(lightbox.dataset.expires) || 15;
      const lightboxClose = lightbox.querySelector('.close-popup-button');
      const closeButton = lightbox.querySelector('.site-close a');

      if (body.classList.contains('newsletter-lightbox-enable') && !Cookies.get('newsletter-lightbox-visible')) {
        window.addEventListener('DOMContentLoaded', () => {
          lightbox.classList.add('active');
        });

        [lightboxClose, closeButton].forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            Cookies.set('newsletter-lightbox-visible', 'disable', { expires: expiresDate, path: '/' });
            lightbox.classList.remove('active');
          });
        });
      }
    }
  };

  MEDIT_THEME.init();

}(jQuery));