import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent implements OnInit{

  sendMoneyForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sendMoneyForm = this.fb.group({
      userPhoneNumber: ['', [Validators.required]],
      recipientPhoneNumber: ['', [Validators.required]]
    });
  }

  sendMoney() {
    // Implement logic to send money here
    // You can use a service to handle the sending process
    console.log('Sending money:', this.sendMoneyForm.value);
  }

}
