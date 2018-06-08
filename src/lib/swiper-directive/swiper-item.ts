import { HostBinding } from '@angular/core';
import { Directive } from '@angular/core';
@Directive({ selector: '[swiperItem]' })
export class SwiperItemDirective {
    @HostBinding('class.swiper-item') item: boolean = true;
}
