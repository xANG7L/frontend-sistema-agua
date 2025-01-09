import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(
    private service: AuthService,
    private router: Router
  ){

  }
  ngOnInit(): void {
 //   if (!this.service.isAuthenticated()) {
   //   this.router.navigate(['/login'])
    //}
  //  window.location.reload();

  }

}
