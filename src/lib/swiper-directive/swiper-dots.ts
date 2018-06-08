import { ElementRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, HostBinding, Input, ChangeDetectorRef, NgZone, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { SwiperOutletComponent } from '../swiper-outlet/swiper-outlet';
@Component({
    selector: '[swiperDots]',
    template: `
    <ng-container *ngFor="let item of dots|async;index as i;">
        <span [swiperDot]="i"></span>
    </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperDotsDirective {
    @HostBinding('class.dots') _dots: boolean = true;
    currentIndex: BehaviorSubject<number> = new BehaviorSubject(0);
    @Input() dots: Observable<any[]>;
    @Input()
    set outlet(val: SwiperOutletComponent) {
        val.ngSlide.subscribe(this.currentIndex);
        this.currentIndex.subscribe(res => {
            this.cd.markForCheck();
        });
        this.dots = val.getCyc('ngAfterContentInit').pipe(
            map(() => {
                const items = [];
                for (let key = 0; key < val.children.length; key++) {
                    items.push(key);
                }
                return items;
            })
        );
    }

    constructor(public cd: ChangeDetectorRef, public ngZone: NgZone) { }
}


import { Directive } from '@angular/core';
@Directive({ selector: '[swiperDot]' })
export class SwiperDotDirective {
    @HostBinding('class.dot') dot: boolean = true;
    @Input() swiperDot: number;
    constructor(public dots: SwiperDotsDirective, public render: Renderer2, public ele: ElementRef) {}

    ngOnInit() {
        this.dots.currentIndex.subscribe(res => {
            if (res === this.swiperDot) {
                this.render.addClass(this.ele.nativeElement, 'active');
            } else {
                this.render.removeClass(this.ele.nativeElement, 'active');
            }
        });
    }
}
