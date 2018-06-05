import { SwiperImageDirective } from './swiper-directive/swiper-image';
import { SwiperDotDirective } from './swiper-directive/swiper-dots';
import { SwiperItemDirective } from './swiper-directive/swiper-item';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperOutletComponent } from './swiper-outlet/swiper-outlet';

export const SwiperComponents = [
  SwiperOutletComponent
];

export const SwiperDevices = [
  SwiperItemDirective,
  SwiperDotDirective,
  SwiperImageDirective
];

@NgModule({
  imports: [
    CommonModule
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
