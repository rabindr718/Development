import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss',
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  education: string[] = [
    'Matric',
    'Doploma',
    'Intermediate',
    'Graduation',
    'Post Graduation',
  ];
  console: any;

  //Used for take data from ANGULAR_FORM
  constructor(private _fb: FormBuilder, private _empService: EmployeeService) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  onFormSubmit = () => {
    if (this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value);
    }
  };
}
