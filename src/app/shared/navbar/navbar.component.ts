import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Credencial } from '../../models/credencial';
import { logOut } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private credencial!: Credencial;

  constructor(
    private store: Store<{ auth: any }>
  ) {
    this.store.select('auth').subscribe((state) => {
      this.credencial = state.credencial;
    })

  }

  cerrarSesion(): void {
    // this.service.logOut();
    this.store.dispatch(logOut());
  }

  isAuth(): boolean {
    return this.credencial.isAuth;
  }
}
