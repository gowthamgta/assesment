import { ChangeDetectorRef, Component, EventEmitter, Inject, inject, Input, Optional, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateRange, MatCalendar, MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CustomDatepickerHeaderComponent } from '../../components/custom-datepicker-header/custom-datepicker-header.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import moment from 'moment';
import { Subscription } from 'rxjs';
export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD MM YYYY', // Parsing format (for input)
  },
  display: {
    dateInput: 'DD MMM yyyy', // **Desired Display Format**
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'DD MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },]
})

export class EmployeeFormComponent {
  @ViewChild('fromPicker') fromPicker!: MatDatepicker<Date>; // Reference to DatePicker
  @ViewChild('toPicker') toPicker!: MatDatepicker<Date>; // Reference to DatePicker
  customHeader = CustomDatepickerHeaderComponent;
  minDate = new Date();
  employeeForm: FormGroup;
  isEdit: boolean = false;
  employeeId: string = '';
  dateSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(MatCalendar) public calendar: MatCalendar<Date>
  ) {
    this.dateSubscription = this.employeeService.getDate().subscribe(data => {

      if (data?.date && data?.open) {
        if (this.fromPicker?.opened) {
          this.employeeForm.get('fromDate')?.setValue(data?.date);
          this.employeeForm.patchValue({ fromDate: data?.date });
          this.fromPicker.close();
        } else if (this.toPicker?.opened) {
          this.employeeForm.get('toDate')?.setValue(data?.date);
          this.employeeForm.patchValue({ toDate: data?.date });
          this.toPicker.close();
        }
      }
      if(data.open == false){
        this.fromPicker.close();
        this.toPicker.close();
      }
    });


    this.employeeForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      role: ['', Validators.required],
      fromDate: [new Date(), [Validators.required]],  // Ensure it's null to hold Date object
      toDate: [null, [Validators.required]]
    });


    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id') || '';
      if (this.employeeId) {
        this.isEdit = true;
        this.patchForm();
      }
    });
  }

  async patchForm() {
    let employee = await this.employeeService.getEmployeeById(this.employeeId);
    this.employeeForm.patchValue({
      id: employee?.id,
      name: employee?.name,
      role: employee?.role,
      fromDate: employee?.fromDate || null,  // Convert stored string to Date object
      toDate: employee?.toDate || null
    });
  }

  async onSubmit() {
    let formData = { ...this.employeeForm.value };
    if (this.employeeForm.valid) {

      // Convert Moment object to JavaScript Date before saving
      formData.fromDate = moment(formData.fromDate).toDate();
      formData.toDate = moment(formData.toDate).toDate();


      if (this.isEdit) {
        console.log(this.employeeForm.value)
        await this.employeeService.updateEmployee(formData);
      } else {
        let employeeData = formData;
        console.log(employeeData)

        // Generate Custom ID
        employeeData.id = this.generateEmployeeId(employeeData.name);

        await this.employeeService.addEmployee(employeeData);
      }
      this.router.navigate(['/employee/employees']);
      this.employeeForm.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  generateEmployeeId(name: string): string {
    const formattedName = name.replace(/\s+/g, '').toUpperCase();
    return `EMP_${formattedName}`;
  }

}
