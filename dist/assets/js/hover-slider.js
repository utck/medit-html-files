class HoverSlider{constructor(t){this.selector=t.selector?t.selector:".hover-gallery",this.slideDuration=t.duration?t.duration:.4,this.debug=t.debug||!1,this.viewport=document.createElement("div"),this.slides=this.selector.children,this.firstSlide=this.slides.length>0?this.slides[0]:null,this.lastSlide=this.slides.length>0?this.slides[this.slides.length-1]:null,this.slideCount=this.slides.length,this.regions=this.slideCount-1,this.isLastRegion=!1,this.enteredInLastRegion=!1,this.currentTransition=null,this.checkScreenSize=()=>window.matchMedia("(max-width: 1024px)").matches,this.isMobile=this.checkScreenSize(),this.handleResize=this.handleResize.bind(this),this.init(),this.checkDeviceAndSetup(),this.setupResizeListener()}init(){this.selector.parentNode.classList.contains("hover-slider-viewport")||(this.viewport.className="hover-slider-viewport",this.selector.classList.add("hover-slider"),this.selector.parentNode.insertBefore(this.viewport,this.selector),this.viewport.appendChild(this.selector),this.setupSlides(),this.debug&&this.addRegionGuides())}addRegionGuides(){const t=document.createElement("div");t.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1000";for(let e=1;e<this.regions;e++){const i=document.createElement("div");i.style.cssText=`position:absolute;top:0;left:${e/this.regions*100}%;width:1px;height:100%;background-color:rgba(255,0,0,0.5);pointer-events:none`,t.appendChild(i)}this.viewport.appendChild(t)}setupResizeListener(){window.addEventListener("resize",this.handleResize)}handleResize(){const t=this.isMobile;this.isMobile=this.checkScreenSize(),t!==this.isMobile&&(this.cleanupCurrentMode(),this.checkDeviceAndSetup())}cleanupCurrentMode(){const t=this.selector.parentNode,e=t.querySelector(".hover-slider-dots"),i=t.querySelector(".hover-slider-arrows");e&&e.remove(),i&&i.remove(),this.setupSlides()}checkDeviceAndSetup(){this.isMobile?(this.createArrows(),this.setupMobileEvents()):(this.createDots(),this.sliderEvents())}createDots(){const t=document.createElement("div");t.className="hover-slider-dots";for(let e=1;e<this.slideCount;e++){const i=document.createElement("span");i.className="hover-slider-dot",1===e&&i.classList.add("active"),t.appendChild(i)}this.selector.parentNode.appendChild(t)}createArrows(){const t=document.createElement("div");t.className="hover-slider-arrows";const e=document.createElement("button");e.className="hover-slider-arrow hover-slider-arrow-left",t.appendChild(e);const i=document.createElement("button");i.className="hover-slider-arrow hover-slider-arrow-right",t.appendChild(i),this.selector.parentNode.appendChild(t)}setupSlides(){this.selector&&this.slides&&(this.selector.style.transform="translateX(0%)",Array.from(this.slides).forEach((t,e)=>{t&&(t.style.transform=`translateX(${e===this.slides.length-1?-100:100*e}%)`)}))}moveSlide(t){const e=Math.abs(this.getCurrentPosition()/100);let i=e+t;i<0&&(i=0),i>=this.slideCount&&(i=this.slideCount-1);const s=e===this.slideCount-1&&-1===t;i===this.slideCount-1?(this.firstSlide.style.transform=`translateX(${100*this.slideCount}%)`,this.lastSlide.style.transform=`translateX(${100*(this.slideCount-1)}%)`):s||(this.firstSlide.style.transform="translateX(0%)",this.lastSlide.style.transform="translateX(-100%)"),this.goToSlide(i,()=>{s&&(this.firstSlide.style.transform="translateX(0%)",this.lastSlide.style.transform="translateX(-100%)")})}updateMobileActiveSlide(t){const e=this.selector.parentNode.querySelectorAll(".hover-slider-arrow");e[0].style.opacity=0===t?.5:1,e[1].style.opacity=t===this.slideCount-1?.5:1}getCurrentPosition(){const t=window.getComputedStyle(this.selector),e=new WebKitCSSMatrix(t.transform);return e.m41/this.selector.offsetWidth*100}goToSlide(t,e){const i=-100*t,s=this.getCurrentPosition();let n,r;this.debug?(n=.1,r=.8):(n=.1*(.4/this.slideDuration),r=.8/Math.sqrt(.4/this.slideDuration));let o=0,l=s;this.currentTransition&&cancelAnimationFrame(this.currentTransition);const a=()=>{const t=i-l,s=t*n,h=o*r,d=s-h;o+=d,l+=o,this.selector.style.transform=`translate3d(${l.toFixed(2)}%,0,0)`,Math.abs(t)>.1||Math.abs(o)>.1?this.currentTransition=requestAnimationFrame(a):(this.selector.style.transform=`translateX(${i}%)`,e&&e())};this.currentTransition=requestAnimationFrame(a)}setupMobileEvents(){const t=this.selector.parentNode;t.querySelectorAll(".hover-slider-arrow").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const i=t.classList.contains("hover-slider-arrow-left");this.moveSlide(i?-1:1)})})}sliderEvents(){const t=this.viewport.querySelectorAll(".hover-slider-dot"),e=e=>{const i=this.viewport.getBoundingClientRect(),s=e.clientX-i.left,n=i.width/this.regions,r=Math.floor(s/n);this.isLastRegion=r===this.regions-1;const o=r+1,l=Math.max(1,Math.min(o,this.slideCount-1));t.forEach((t,e)=>{t.classList.toggle("active",e+1===l)}),this.isLastRegion?this.firstSlide.style.transform=`translateX(${100*this.slideCount}%)`:this.firstSlide.style.transform="translateX(0%)",this.goToSlide(l,()=>{this.debug&&console.log("transition end")})};this.viewport.addEventListener("mouseenter",i=>{const s=this.viewport.getBoundingClientRect(),n=i.clientX-s.left,r=s.width/this.regions,o=Math.floor(n/r);this.isLastRegion=o===this.regions-1,this.isLastRegion&&(this.selector.style.transform=`translateX(${-100*this.slideCount}%)`),this.lastSlide.style.transform=`translateX(${100*(this.slideCount-1)}%)`,this.viewport.addEventListener("mousemove",e)}),this.viewport.addEventListener("mouseleave",i=>{this.currentTransition&&cancelAnimationFrame(this.currentTransition),this.isLastRegion?this.goToSlide(this.slideCount,()=>{this.setupSlides()}):this.goToSlide(0,()=>{this.setupSlides()}),t.forEach((t,e)=>{t.classList.toggle("active",0===e)}),this.viewport.removeEventListener("mousemove",e)})}}