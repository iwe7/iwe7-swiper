import { SwiperDotDirective } from './../swiper-directive/swiper-dots';
import { SwiperBase } from './swiper-config';
import { SwiperItemDirective } from './../swiper-directive/swiper-item';
import { HostBinding, ElementRef, ViewChild, ContentChild, Renderer2 } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Iwe7CoreComponent } from 'iwe7-core';
import {
    Component, OnInit, Injector,
    ChangeDetectionStrategy, ViewEncapsulation,
    Input, AfterViewChecked, AfterContentChecked, AfterContentInit,
    TemplateRef
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BScroll } from '../util/better-scroll';
import * as _ from 'lodash';
@Component({
    selector: 'swiper-outlet',
    templateUrl: 'swiper-outlet.html',
    styleUrls: ['./swiper-outlet.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.scroll-x]': '_scrollX',
        '[class.scroll-y]': '_scrollY'
    },
    inputs: ['interval', 'threshold', 'speed', 'list']
})
export class SwiperOutletComponent extends SwiperBase {
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

    constructor(injector: Injector, public ele: ElementRef, public render: Renderer2) {
        super(injector);
        this.listChange();
    }
    // 数据源改变时
    private listChange() {
        this.runOutsideAngular(() => {
            this.getCyc('ngOnChanges').subscribe(res => {
                if ('list' in res) {
                    if (this.slide) {
                        this.updateBetterScroll();
                    } else {
                        this.initBetterScroll();
                    }
                }
            });
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
                bounce: false,
                stopPropagation: true,
                click: this.click
            };
            this.slide = new BScroll(this.ele.nativeElement, opt);
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
}
