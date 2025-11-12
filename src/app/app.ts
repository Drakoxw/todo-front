import { Component, OnInit, Renderer2, Inject, signal, inject, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastAlertService } from '@services/toast-alert.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, ToastModule],
})
export class App implements OnInit {

  readonly #toastAlert = inject(ToastAlertService)
  private messageService = inject(MessageService)

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    effect(() => {
      const alert = this.#toastAlert.onAlert()
      this.messageService.add({
        severity: alert.type,
        summary: alert.summary,
        detail: alert.msg
      })
    })
  }

  ngOnInit() {
    this.renderer.removeClass(this.document.documentElement, '.app-dark');
    this.renderer.addClass(this.document.documentElement, 'light');
  }
}
