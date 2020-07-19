import { Directive, AfterViewInit, HostBinding, Input, ElementRef } from "@angular/core";

@Directive({
  selector: 'img[appLazyLoad]'
})
export class ImageLazyLoadDirective implements AfterViewInit {
  @HostBinding('attr.src') srcAttr = '../../assets/none_image.png';
  @Input() src: string;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.srcAttr = this .src;
        }
      })
    })

    obs.observe(this.el.nativeElement);
  }
}