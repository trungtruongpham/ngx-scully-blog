import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';
import { Route } from '@model';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { SeoHelperService } from '@service';
import { Subscription } from 'rxjs';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit {
  private sub?: Subscription
  ngOnInit() {}

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    seo: SeoHelperService,
    scullyRoutes: ScullyRoutesService
  ) {
    this.sub = scullyRoutes.getCurrent().subscribe(
      (route) => seo.setData({
        // title: post?.title,
        // keywords: post?.keywords,
        // description: post?.description,
        // image: post?.image,
        // type: 'article'
      })
    )
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}