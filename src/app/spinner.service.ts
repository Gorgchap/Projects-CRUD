import { Component, Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({ template: '<mat-spinner></mat-spinner>' })
export class SpinnerComponent { }

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private counter = 0;
  private watchdog: any = null;
  private overlayRef: OverlayRef = null;
  private emitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private change: Observable<boolean> = this.emitter.pipe(
    map(value => !!(value ? ++this.counter : (this.counter > 0 ? --this.counter : 0))),
    distinctUntilChanged()
  );

  constructor(private overlay: Overlay) {
    this.change.subscribe(status => {
      if (this.watchdog) {
        clearTimeout(this.watchdog);
        this.watchdog = null;
      }
      if (status) {
        this.watchdog = setTimeout(() => {
          this.overlayRef = this.overlay.create(this.getOverlayConfig());
          this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
        }, 150);
      } else {
        if (this.overlayRef) {
          this.overlayRef.dispose();
          this.overlayRef = null;
        }
      }
    });
  }

  open() { this.emitter.next(true); }
  close() { this.emitter.next(false); }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    return new OverlayConfig({hasBackdrop: true, scrollStrategy: this.overlay.scrollStrategies.block(), positionStrategy});
  }
}
