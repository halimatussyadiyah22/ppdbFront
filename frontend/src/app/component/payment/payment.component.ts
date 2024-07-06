import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {StudentIdentity} from "../../model/student-identity.component";
import {PageResponse} from "../../model/page.response.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StudentIdentityService} from "../../service/studentIdentity/student-identity.service";
import {Payment} from "../../model/payment.component";
import {PaymentService} from "../../service/payment/payment.service";
import {UserAccount} from "../../model/user-account.component";
import {UserAccountService} from "../../service/userAccount/user-account.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  submitted: boolean = false;
  user$!: Observable<Array<UserAccount>>
  errorPaymentMessage!: string;
  pagePayment$!: Observable<PageResponse<Payment>>;
  searchFormGroup!: FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  errorMessage!:string;
  paymentFormGroup!: FormGroup;
  errorUserMessage!: string;
  updatePaymentFormGroup!: FormGroup;
  defaultUser!:UserAccount;

  constructor(private modalService: NgbModal,
              private paymentService: PaymentService,
              private userService:UserAccountService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    })
    this.paymentFormGroup = this.fb.group({
      secure_id:["",Validators.required],
      type_of_amount:["",Validators.required],
      date_payment:["",Validators.required],
      payment_amount:["",Validators.required],
      payment_receipt_url:["",Validators.required],
      description:["",Validators.required],
      user_account_id:[null,Validators.required]
    })
    this.handleSearchPayment();
  }
  getModal(content: any) {
    this.submitted = false;
    this.fetchPayment();
    this.modalService.open(content, {size: 'xl'})
  }
  fetchPayment(){
    this.user$ = this.userService.findAllUser()
        .pipe(
            catchError(err => {
              this.errorPaymentMessage= err.message;
              return throwError(err);
            })
        )
  }

  handleSearchPayment() {
    let keyword = this.searchFormGroup.value.keyword;
    this.pagePayment$ = this.paymentService.searchPayment(
        keyword,this.currentPage,this.pageSize)
        .pipe(
            catchError(err => {
                  this.errorMessage = err.message;
                  return throwError(err);
                }
            )
        )
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchPayment();
  }

  onCloseModal(modal: any) {
    modal.close();
    this.paymentFormGroup.reset();
  }

  onSaveCourse(modal: any) {
    this.submitted = true;
    console.log(this.paymentFormGroup)
    if (this.paymentFormGroup.invalid) return;
    this.paymentService.savePayment(this.paymentFormGroup.value).subscribe({
      next: ()=>{
        alert("sukses menyimpan data orangtua");
        this.handleSearchPayment();
        this.paymentFormGroup.reset();
        this.submitted = false;
        modal.close()
      },error: err => {
        alert(err.message);
      }
    })
  }

  getUpdateModel(sf: Payment, updateContent: any) {
    this.fetchPayment();
    this.updatePaymentFormGroup = this.fb.group({
      type_of_amount:[sf.type_of_amount,Validators.required],
      date_payment:[sf.date_payment,Validators.required],
      payment_amount:[sf.payment_amount,Validators.required],
      payment_receipt_url:[sf.payment_receipt_url,Validators.required],
      description:[sf.description,Validators.required],
      user_account_id:[sf.user_account_id,Validators.required]
    })
    this.defaultUser = this.updatePaymentFormGroup.controls['user_account_id'].value;
    this.modalService.open(updateContent,{size:'xl'})

  }

  onUpdate(updateModal: any) {
    this.submitted= true;
    if (this.updatePaymentFormGroup.invalid) return;
    this.paymentService.updatePayment(
        this.updatePaymentFormGroup.value,
        this.updatePaymentFormGroup.value.secure_id).subscribe({
      next:()=>{
        alert("Sukses mengedit data orangtua");
        this.handleSearchPayment();
        this.submitted=false;
        updateModal.close();
      },error:err => {
        alert(err.message)
      }
    })
  }

  handleDeletepayment(sf: Payment) {
    let conf= confirm("Apa anda yakin ingin menghapus data?")
    if (!conf) return;
    this.paymentService.deletePayment(sf.secure_id).subscribe({
      next:()=>{
        this.handleSearchPayment();
      },
      error:err=>{
        alert(err.message)
        console.log(err)
      }
    })
  }

}
