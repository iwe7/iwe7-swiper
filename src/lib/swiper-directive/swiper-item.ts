import { TemplateRef } from '@angular/core';
import { Injector } from '@angular/core';
import { NgForOf } from '@angular/common';

import { Directive } from '@angular/core';
import { Iwe7CoreComponent } from 'iwe7-core';
@Directive({ selector: '[swiperItem]' })
export class SwiperItemDirective<T> extends Iwe7CoreComponent {
    constructor(injector: Injector, public template: TemplateRef<NgForOf<T>>) {
        super(injector);
    }
}
