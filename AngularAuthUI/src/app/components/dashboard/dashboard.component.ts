import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any = [];
  fullName: string = "";
  role: string = "";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) {}
  ngOnInit(): void {
    this.api.getUsers().subscribe((response: any) => {
      this.users = response;
    });
    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName =  val || fullNameFromToken;
    })
    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role =  val || roleFromToken;
    })
  }
  logout() {
    this.auth.logout();
  }
}
