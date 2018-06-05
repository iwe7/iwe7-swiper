import { BaseWithIcss } from 'iwe7-base';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { Iwe7CoreComponent } from 'iwe7-core';

@Injectable({
    providedIn: 'root'
})
export class SwiperConfig {
    _loop: boolean = true;
    _click: boolean = true;
    _autoPlay: boolean = true;
    _scrollX: boolean = true;
    _scrollY: boolean = false;
    slide: any;
    timer: any;
    currentPageIndex: number = 0;
    interval: number = 8000;
    threshold: number = 0.3;
    speed: number = 400;
    list: any[] = [];
    _hasDot: boolean = true;
}

export class SwiperBase extends BaseWithIcss {
    _loop: boolean = true;
    _click: boolean = true;
    _autoPlay: boolean = true;
    _scrollX: boolean = true;
    _scrollY: boolean = false;
    slide: any;
    timer: any;
    currentPageIndex: number = 0;
    interval: number = 4000;
    threshold: number = 0.3;
    speed: number = 400;
    list: any[] = [];
    cfg: any;
    _hasDot: boolean = true;
    height: string = '120px';
    constructor(injector: Injector) {
        super(injector);
        this.cfg = this.injector.get(SwiperConfig);
        Object.assign(this, this.cfg);
    }
    _play() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.slide.next();
        }, this.interval);
    }
    
}
