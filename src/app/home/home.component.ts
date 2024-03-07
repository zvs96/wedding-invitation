import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { AsyncPipe, JsonPipe, isPlatformBrowser, NgForOf, NgIf, DOCUMENT } from "@angular/common";
import { Observable } from "rxjs";
import { CountdownPipe, ICountdown } from "./countdown.pipe";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    NgForOf,
    NgIf,
    MatIcon
  ],
  providers: [
    CountdownPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  countdown$!: Observable<ICountdown>;

  menuItems = [
    { title: 'Ծրագիր', href: '' },
    { title: 'Պսակադրություն', href: '' },
    { title: 'Հարսանյաց Հանդիսություն', href: '' },
    { title: 'Հետադարձ Կապ', href: '' },
  ]

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private countdownPipe: CountdownPipe,
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const date = new Date(2024, 9, 24);
      this.countdown$ = this.countdownPipe.transform(date);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const audio: HTMLAudioElement = this.renderer.createElement('audio');
      this.renderer.setAttribute(audio, 'src', 'assets/sound/bg.mp3');
      this.renderer.appendChild(this.elRef.nativeElement, audio);
      audio.play().catch(() => {
        this.renderer.listen(this.elRef.nativeElement, 'focus', () => {
          audio.play()
        })
      });
    }
  }
}
