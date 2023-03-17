import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, finalize } from 'rxjs/operators';

import { InteractionService } from 'src/app/core/services/interaction.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private pendingRequests$: Observable<number> = this.loading$.pipe(
    scan((acc, curr) => {
      const total = curr ? acc + 1 : acc - 1;
      total === 0 ? this.interactionService.hideLoading() : this.interactionService.displayLoading();
      return total;
    }, 0)
  );

  constructor(private interactionService: InteractionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loading$.next(true);

    return next.handle(request).pipe(finalize(() => this.loading$.next(false)));
  }

}
