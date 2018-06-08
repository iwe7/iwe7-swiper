import { BetterCoreModule } from 'iwe7-better-scroll';
import { SwiperImageDirective } from './swiper-directive/swiper-image';
import { SwiperDotsDirective, SwiperDotDirective } from './swiper-directive/swiper-dots';
import { SwiperItemDirective } from './swiper-directive/swiper-item';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperOutletComponent } from './swiper-outlet/swiper-outlet';
export const SwiperComponents = [
  SwiperOutletComponent
];

export const SwiperDevices = [
  SwiperItemDirective,
  SwiperImageDirective,
  SwiperDotsDirective,
  SwiperDotDirective
];

@NgModule({
  imports: [
    CommonModule,
    BetterCoreModule
  ],
  declarations: [
    ...SwiperComponents,
    ...SwiperDevices
  ],
  exports: [
    ...SwiperComponents,
    ...SwiperDevices
  ]
})
export class Iwe7SwiperModule { }
