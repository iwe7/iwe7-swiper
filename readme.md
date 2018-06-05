### iwe7 swiper


| 组件            | 说明      | 类型        | 使用          |
|---------------|---------|-----------|-------------|
| swiper-outlet | 容器      | Component | element     |
| [swiperItem]  | slide模板 | Directive | ng-template |
| [swiperDot]   | dot模板   | Directive | ng-template |


##### swiper-outlet

* inputs

| 输入        | 默认    | 类型      |
|-----------|-------|---------|
| hasDot    | true  | boolean |
| loop      | true  | boolean |
| click     | true  | boolean |
| autoPlay  | true  | boolean |
| scrollX   | true  | boolean |
| scrollY   | false | boolean |
| interval  | 4000  | number  |
| threshold | 0.3   | number  |
| speed     | 400   | number  |
| list      | []    | array   |


```html
<swiper-outlet [list]="list"></swiper-outlet>

<button mat-flat-button (click)="showDialogX()">showDialogX</button>
<button mat-flat-button (click)="showDialogY()">showDialogY</button>

<ng-template #tplX>
  <swiper-outlet [list]="list"></swiper-outlet>
</ng-template>

<ng-template #tplY>
  <swiper-outlet scrollY [list]="list"></swiper-outlet>
</ng-template>
```

```ts
list: any[] = [{
    image: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg'
}, {
    image: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg'
}];

showDialogX() {
    this.getCyc('ngAfterViewInit').subscribe(res => {
        const dialogRef = this.dialog.open(this.tplX);
    });
}
showDialogY() {
    this.getCyc('ngAfterViewInit').subscribe(res => {
        const dialogRef = this.dialog.open(this.tplY);
    });
}
```

| 组件名                | 说明        | 地址                                         |
|--------------------|-----------|--------------------------------------------|
| iwe7-flex          | flex布局组件  | https://github.com/iwe7/iwe7-flex          |
| iwe7-map           | 百度地图组件    | https://github.com/iwe7/iwe7-map           |
| iwe7-im            | IM组件      | https://github.com/iwe7/iwe7-im            |
| iwe7-icss          | rxjs操作css | https://github.com/iwe7/iwe7-icss          |
| iwe7-core          | 核心库       | https://github.com/iwe7/iwe7-core          |
| iwe7-script        | 加载css和js  | https://github.com/iwe7/iwe7-script        |
| iwe7-util          | 工具        | https://github.com/iwe7/iwe7-util          |
| iwe7-square        | 正方形组件     | https://github.com/iwe7/iwe7-square        |
| iwe7-better-scroll | 滑动组件      | https://github.com/iwe7/iwe7-better-scroll |
| iwe7-web-storage   | 缓存相关      | https://github.com/iwe7/iwe7-web-storage   |
| iwe7-url           | api链接便签   | https://github.com/iwe7/iwe7-url           |
| iwe7-video         | 视频播放      | https://github.com/iwe7/iwe7-video         |
| iwe7-swiper        | 轮播组件      | https://github.com/iwe7/iwe7-swiper        |

