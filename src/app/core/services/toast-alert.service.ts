import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastAlertService {

  onAlert = signal<{ type: 'success' | 'error' | 'info', summary: string, msg: string,  }>({
    summary: 'Alerta',
    type: 'success',
    msg: ''
  })

  setAlert(payload: { type: 'success' | 'error', msg: string, summary?: string }) {
    this.onAlert.set({ ...this.onAlert(), ...payload })
  }

  errorAlert(msg: string, summary: string = 'Error') {
    this.onAlert.set({ type: 'error', msg, summary })
  }

  successAlert(msg: string, summary: string = 'Ok') {
    this.onAlert.set({ type: 'success', msg, summary })
  }

  infoAlert(msg: string, summary: string = 'Info') {
    this.onAlert.set({ type: 'info', msg, summary })
  }

}
