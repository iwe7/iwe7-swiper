import { BetterManagerService, BetterScrollDirective } from 'iwe7-better-scroll';
import { Iwe7IcssService } from 'iwe7-icss';
import { ElementRef, Renderer2 } from '@angular/core';
import {
    Component, Injector,
    ChangeDetectionStrategy, ViewEncapsulation,
    Input, Output, EventEmitter
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
@Component({
    selector: 'swiper-outlet',
    templateUrl: 'swiper-outlet.html',
    styleUrls: ['./swiper-outlet.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.scroll-x]': 'scrollX',
        '[class.scroll-y]': 'scrollY',
        '[style.height]': 'height'
    },
    inputs: ['interval', 'threshold', 'speed', 'list'],
    providers: [Iwe7IcssService],
    exportAs: 'swiperOutlet'
})
export class SwiperOutletComponent extends BetterScrollDirective {
    @Input() height = '100%';
    _hasDot: boolean = true;
    @Input()
    set hasDot(val: any) {
        this._hasDot = coerceBooleanProperty(val);
    }
    @Input()
    set loop(val: any) {
        (<any>this.options.snap).loop = coerceBooleanProperty(val);
    }
    @Input()
    set speed(val: any) {
        (<any>this.options.snap).speed = coerceNumberProperty(val);
    }
    // 自动轮播
    _autoPlay: boolean = true;
    @Input()
    set autoPlay(val: any) {
        this._autoPlay = coerceBooleanProperty(val);
    }

    _interval: number = 4000;
    @Input()
    set interval(val: any) {
        this._interval = coerceNumberProperty(val);
    }

    @Output()
    ngSlide: EventEmitter<number> = new EventEmitter();
    constructor(
        injector: Injector,
        public ele: ElementRef,
        public render: Renderer2,
        public better: BetterManagerService
    ) {
        super(ele, injector, better);
        this.options.scrollX = true;
        this.options.scrollY = false;
        this.snap = {} as any;
        this.click = true;
        this.autoPlay = true;
        this.setStyleInputs(['height']);
        this.getCyc('betterScrollInited').subscribe(res => {
            this.styleObj = {
                height: this.height
            };
            this.updateStyle(this.ele.nativeElement);
            this._scroll.autoPlay({
                interval: this._interval,
                autoPlay: this._autoPlay
            });
            const scrollEnd: any = () => {
                this.onScrollEnd();
            };
            this._scroll.on('scrollEnd', scrollEnd);
        });
    }

    currentPageIndex: number = 0;

    onScrollEnd() {
        if (this.options.scrollX) {
            this.currentPageIndex = this._scroll.getPageX();
        } else {
            this.currentPageIndex = this._scroll.getPageY();
        }
        this.ngSlide.emit(this.currentPageIndex);
        if (this._autoPlay) {
            this._scroll.play();
        }
    }

}

