import { CommonModule } from "@angular/common";
import {
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { AD_CLIENT, GOOGLE_ANALYTICS_TRACKING_ID } from "@configuration";
import { AdsenseModule } from "ng2-adsense";
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from "ngx-google-analytics";
import { NgxLogglyModule } from "ngx-loggly-logger";
import { JsonLdModule } from "ngx-seo";
import {
  ConsoleWriter,
  ErrorHandlingService,
  FacebookService,
  InitLoggingAndWriters,
  LoggingService,
  LogglyWriter,
  InitFacebookPixel,
} from "@services";

@NgModule({
  imports: [
    CommonModule,
    NgxLogglyModule.forRoot(),
    NgxGoogleAnalyticsModule.forRoot(GOOGLE_ANALYTICS_TRACKING_ID),
    NgxGoogleAnalyticsRouterModule,
    JsonLdModule,
    AdsenseModule.forRoot({
      adClient: AD_CLIENT,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [LoggingService, ConsoleWriter, LogglyWriter],
      multi: true,
      useFactory: InitLoggingAndWriters,
    },
    {
      provide: APP_INITIALIZER,
      deps: [FacebookService],
      multi: true,
      useFactory: InitFacebookPixel,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlingService,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule is already loaded. Import it in the AppModule only.`
      );
    }
  }
}
