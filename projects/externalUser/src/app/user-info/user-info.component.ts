import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from '../../app/service/userInfo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Message } from 'primeng/api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  usrCretedBollean: boolean = false
  data: FormGroup;
  submitted = false;
  firstLoad = true;
  msgs: Message[] = [];
  phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  constructor(
    private userInfoService: UserInfoService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.data = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      telephone_number: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
      address: ['', Validators.required],
      ssn_number: ['', Validators.required],
    });
  }

  get h() { return this.data.controls; }

  ngOnInit(): void {
  }


  classForValidation(type) {
    if (this.firstLoad) {
      return
    }
    else if (this.submitted && this.h.first_name.errors && (type == 'first_name')) {
      return 'is-invalid';
    }
    else if (this.submitted && this.h.last_name.errors && (type == 'last_name')) {
      return 'is-invalid';
    }
    else if (this.submitted && this.h.telephone_number.errors && (type == 'telephone_number')) {
      return 'is-invalid';
    }
    else if (this.submitted && this.h.address.errors && (type == 'address')) {
      return 'is-invalid';
    }
    else if (this.submitted && this.h.ssn_number.errors && (type == 'ssn_number')) {
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
      this.spinner.hide();
      return;
    }
    this.userInfoService.userInfo(this.data.value).subscribe((response: any) => {
      if (response.response_code == 200) {
        this.usrCretedBollean = true;
        this.spinner.hide();
        this.firstLoad = true;
        setTimeout(() => {
          this.usrCretedBollean = false;
          this.data.reset()
          this.classForValidation("");
        }, 3000)
      } else if (response.response_code == 404) {
        this.spinner.hide();
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
    })
  }


}
