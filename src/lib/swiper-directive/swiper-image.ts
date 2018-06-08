import { DomSanitizer } from '@angular/platform-browser';
import { HostBinding, Renderer2, ElementRef, Injector, Component, ViewChild } from '@angular/core';
import { Directive, Input } from '@angular/core';
import { Iwe7CoreComponent } from 'iwe7-core';

@Component({
    selector: '[swiperImage]',
    template: `
        <div class="swiper-image" #image>
            <ng-content></ng-content>
        </div>
    `
})
export class SwiperImageDirective extends Iwe7CoreComponent {
    @Input() swiperImage: string;
    @ViewChild('image') image: ElementRef;
    constructor(
        public render: Renderer2,
        public ele: ElementRef,
        public injector: Injector
    ) {
        super(injector);
        this.getCyc('ngOnChanges').subscribe(res => {
            this.render.setStyle(this.image.nativeElement, 'background-image', `url(${this.swiperImage})`);
        });
    }
}
