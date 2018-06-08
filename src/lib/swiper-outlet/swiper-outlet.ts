import { BetterScrollCore } from 'iwe7-better-scroll';
import { Iwe7IcssService } from 'iwe7-icss';
import { SwiperDotDirective } from './../swiper-directive/swiper-dots';
import { SwiperBase } from './swiper-config';
import { SwiperItemDirective } from './../swiper-directive/swiper-item';
import { ElementRef, ViewChild, ContentChild, Renderer2, SkipSelf } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import {
    Component, Injector, Optional,
    ChangeDetectionStrategy, ViewEncapsulation,
    Input, TemplateRef
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
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
    providers: [Iwe7IcssService, BetterScrollCore]
})
export class SwiperOutletComponent extends SwiperBase {
    @Input() height = '100%';
    @Input()
    set hasDot(val: any) {
        this._hasDot = coerceBooleanProperty(val);
    }
    @Input()
    set loop(val: any) {
        this._loop = coerceBooleanProperty(val);
    }
    @Input()
    set click(val: any) {
        this._click = coerceBooleanProperty(val);
    }
    @Input()
    set autoPlay(val: any) {
        this._autoPlay = coerceBooleanProperty(val);
    }
    @Input()
    set scrollX(val: any) {
        this._scrollX = coerceBooleanProperty(val);
        this._scrollY = !this._scrollX;
    }
    @Input()
    set scrollY(val: any) {
        this._scrollY = coerceBooleanProperty(val);
        this._scrollX = !this._scrollY;
    }
    @ViewChild('group') group: ElementRef;

    _slide: TemplateRef<any>;
    @ContentChild(SwiperItemDirective)
    set swiperItem(val: any) {
        if (val) {
            this._slide = val.template;
        }
    }

    @ViewChild('slideItem')
    set slideItem(val: TemplateRef<any>) {
        if (!this._dot) {
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
        @Optional()
        public slide: BetterScrollCore,
        @SkipSelf()
        @Optional()
        public parent: BetterScrollCore,
    ) {
        super(injector);
        this.listChange();
        this.setStyleInputs(['height']);
    }
    // 数据源改变时
    private listChange() {
        this.runOutsideAngular(() => {
            this.getCyc('ngAfterViewInit').pipe(
                tap(res => {
                    this.initBetterScroll();
                }),
                switchMap((res: any) => {
                    return this.getCyc('ngOnChanges').pipe(
                        tap(res => {
                            if ('list' in res) {
                                if (this.slide) {
                                    this.updateBetterScroll();
                                }
                            }
                        })
                    );
                })
            ).subscribe();
        });
    }
    // 刷新slide
    private updateBetterScroll() {
        this.slide.refresh();
        this.updateStyle();
    }
    // 初始化slide
    private initBetterScroll() {
        this.runOutsideAngular(() => {
            const opt: any = {
                scrollX: this._scrollX,
                scrollY: this._scrollY,
                momentum: false,
                snap: {
                    loop: this._loop,
                    threshold: this.threshold,
                    speed: this.speed
                },
                bounce: true,
                stopPropagation: true,
                eventPassthrough: this._scrollX ? 'horizontal' : 'vertical',
                click: this._click
            };
            this.slide.init(this.ele.nativeElement, opt);
            console.log(this.slide);
            this.slide.on('scrollEnd', () => {
                this.run(() => {
                    this._onScrollEnd();
                });
            });
            this.slide.on('touchEnd', () => {
                if (this._autoPlay) {
                    this._play();
                }
            });
            this.slide.on('beforeScrollStart', () => {
                if (this._autoPlay) {
                    clearTimeout(this.timer);
                }
            });
            this.updateStyle();
        });
    }
    private updateStyle() {
        if (this._scrollX) {
            this.update('clientWidth', 'width');
        } else {
            this.update('clientHeight', 'height');
        }
        if (this._autoPlay) {
            this._play();
        }
    }
    private get children() {
        const ele: HTMLElement = this.group.nativeElement;
        return ele.children;
    }
    private update(name: string, val: string) {
        const slideWidth = this.ele.nativeElement[name];
        for (const key in this.children) {
            const item = this.children[key];
            if (item.classList) {
                this.render.addClass(item, 'slide-item');
            }
            _.set(item, 'style.' + val, slideWidth + 'px');
        }
        this.render.setStyle(this.group.nativeElement, val, slideWidth * this.children.length + 'px');
        this.render.setStyle(this.group.nativeElement, 'opacity', '1');
    }

    _onScrollEnd() {
        if (this._scrollX) {
            const pageIndex = this.slide.getCurrentPage().pageX;
            this.currentPageIndex = pageIndex;
        } else {
            const pageIndex = this.slide.getCurrentPage().pageY;
            this.currentPageIndex = pageIndex;
        }
        if (this._autoPlay) {
            this._play();
        }

        this._cd.markForCheck();
    }
}
