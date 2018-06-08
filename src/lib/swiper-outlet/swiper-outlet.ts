import { BetterManagerService, BetterScrollDirective } from 'iwe7-better-scroll';
import { Iwe7IcssService } from 'iwe7-icss';
import { SwiperDotDirective } from './../swiper-directive/swiper-dots';
import { SwiperItemDirective } from './../swiper-directive/swiper-item';
import { ElementRef, ViewChild, ContentChild, Renderer2 } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import {
    Component, Injector,
    ChangeDetectionStrategy, ViewEncapsulation,
    Input, TemplateRef
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import * as _ from 'lodash';
@Component({
    selector: 'swiper-outlet',
    templateUrl: 'swiper-outlet.html',
    styleUrls: ['./swiper-outlet.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.scroll-x]': '_scrollX',
        '[class.scroll-y]': '_scrollY',
        '[style.height]': 'height'
    },
    inputs: ['interval', 'threshold', 'speed', 'list'],
    providers: [Iwe7IcssService]
})
export class SwiperOutletComponent extends BetterScrollDirective {
    @Input() height = '100%';
    @Input()
    set hasDot(val: any) {
        this._hasDot = coerceBooleanProperty(val);
    }
    @Input()
    set loop(val: any) {
        this.options.loop = coerceBooleanProperty(val);
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


    _slide: TemplateRef<any>;
    @ContentChild(SwiperItemDirective)
    set swiperItem(val: any) {
        if (val) {
            this._slide = val.template;
        }
    }

    @ViewChild('slideItem')
    set slideItem(val: TemplateRef<any>) {
        if (val) {
            this._slide = val;
        }
    }
    _dot: TemplateRef<any>;
    // 替换模板
    @ContentChild(SwiperDotDirective)
    set swiperDot(val: any) {
        if (val) {
            this._dot = val.template;
        }
    }
    // 默认模板
    @ViewChild('dot')
    set dot(val: TemplateRef<any>) {
        if (!this._dot) {
            this._dot = val;
        }
    }

    constructor(
        injector: Injector,
        public ele: ElementRef,
        public render: Renderer2,
        public better: BetterManagerService
    ) {
        super(ele, injector, better);
        this.setStyleInputs(['height']);
        this.getCyc('betterScrollInited').subscribe(res => {
            console.log(res);
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
            this.currentPageIndex = this._scroll.pageX;
        } else {
            this.currentPageIndex = this._scroll.pageY;
        }
        if (this.options.autoPlay) {
            this._scroll.play();
        }
    }
}
