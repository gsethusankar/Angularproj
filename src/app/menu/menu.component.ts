import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthGuard } from '../AuthGuard';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../model/user';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private destroy$ = new Subject<void>();


  currentUser: User;

  constructor(
    authGuard: AuthGuard,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.pipe(takeUntil(this.destroy$)).subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
  }



  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}