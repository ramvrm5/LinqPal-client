import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../app/services/oauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:boolean=false
  data: FormGroup;
  submitted = false;
  firstLoad = true;
  token;
  msgs: Message[] = [];

  constructor(
    private oauthService: OauthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.token = localStorage.getItem("token");
    this.data = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get h() { return this.data.controls; }

  ngOnInit(): void {
    if (this.token) {
      this.router.navigate(['usersList']);
    } else {
      this.router.navigate(['']);
      localStorage.removeItem("token");
    }
  }


  classForValidation(type) {
    if (this.firstLoad) {
      return
    }
    else if (this.submitted && this.h.email.errors && (type == 'email')) {
      return 'is-invalid';
    }
    else if (this.submitted && this.h.password.errors && (type == 'password')) {
      return 'is-invalid';
    } else {
      return 'is-valid';
    }
  }

  submit() {
    this.spinner.show();
    this.firstLoad = false;
    this.submitted = true;
    if (this.data.invalid) {
      return;
    }
    this.oauthService.loginAdmin(this.data.value).subscribe((response: any) => {
      if (response.responseCode == 200) {
        this.spinner.hide();
        var token = response['token'];
        localStorage.setItem("token", token);
        this.router.navigate(['usersList']);
      } else if (response.responseCode == 400) {
        this.spinner.hide();
        this.error = true
        setTimeout(() => {
          this.error = false;
        }, 3000)
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }
}
