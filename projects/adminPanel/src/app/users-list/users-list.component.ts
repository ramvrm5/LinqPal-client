import { Component, OnInit } from '@angular/core';
import { UserListService } from '../../app/services/userList.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  first_name: String
  last_name: String
  telephone: String
  address: String
  ssn: String
  nouseradded: boolean = true;
  arrayOfUsers: any = [];
  constructor(
    private userListService: UserListService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    var token = localStorage.getItem("token")
    this.userListService.userList(token).subscribe((response: any) => {
      if (response.response_code == 200) {
        this.spinner.hide();
        this.arrayOfUsers = response.result;
      } else if (response.response_code == 400) {
        this.spinner.hide();
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  logout() {
    this.router.navigate(['']);
    localStorage.removeItem("token");
  }
}
