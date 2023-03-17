import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private matSnackBar: MatSnackBar) {}

  displaySnackBar(message: string, duration: number = 5000) {
    this.matSnackBar.open(message, "Got it", { duration });
  }

  displayLoading(){
    this.isLoading$.next(true);
  }

  hideLoading() {
    this.isLoading$.next(false);
  }

  getLoading() {
    return this.isLoading$;
  }


}
