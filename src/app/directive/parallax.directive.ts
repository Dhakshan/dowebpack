import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
@Directive({
  selector: "[parallax]"
})
export class Parallax {
  constructor(
    private el: ElementRef,
    private renderer: Renderer) {
    var myfn = this.plugin({ el: this.el });
    myfn.init().start();
  }
  plugin(options: any = {}) {
    var fn = Object();
    fn.self = this;
    fn.timer = new Date().getTime();
    fn.init = function () {
      if (options.el)
        options.el.nativeElement.classList.add("parallax");
      options.el.nativeElement.classList.add("parallax" + this.timer);
      return this;
    }
    fn.start = function () {
      var speed = 0;
      window.addEventListener("scroll", function () {
        var wintop = window.scrollY, pct: any = wintop % 100, gb = options.el.nativeElement.getBoundingClientRect();
        if (options.el) {
          pct = (pct + speed) + "px";
          if (wintop < gb.top) {
            options.el.nativeElement.style.setProperty("top", 0);
          } else {
            options.el.nativeElement.style.setProperty("top", pct);
          }
        }
      });
      return this;
    }
    return fn;
  }

}