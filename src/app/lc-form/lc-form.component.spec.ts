import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LcFormComponent } from './lc-form.component';
import { LcServiceService } from '../lcservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from '../app.component';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LcFormComponent', () => {
  let component: LcFormComponent;
  let fixture: ComponentFixture<LcFormComponent>;
  let service: jasmine.SpyObj<LcServiceService>; // Ensure this is a Spy Object

  beforeEach(async () => {
    service = jasmine.createSpyObj('LcServiceService', ['crudPost', 'crudPut', 'crudGet', 'crudDelete']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      declarations: [LcFormComponent, AppComponent],
      providers: [{ provide: LcServiceService, useValue: service }],
    }).compileComponents();

    fixture = TestBed.createComponent(LcFormComponent);
    component = fixture.componentInstance;

    // Default return values for service methods
    service.crudPost.and.returnValue(of({}));
    service.crudPut.and.returnValue(of({}));
    service.crudGet.and.returnValue(of([]));
    service.crudDelete.and.returnValue(of({}));

    fixture.detectChanges();
  });

  afterEach(() => {
    service.crudPost.calls.reset();
    service.crudPut.calls.reset();
    service.crudGet.calls.reset();
    service.crudDelete.calls.reset();
  });

  it('should create the form with empty values', () => {
    expect(component.loginform).toBeTruthy();
    expect(component.loginform.controls['firstName'].value).toEqual('');
    expect(component.loginform.controls['lastName'].value).toEqual('');
    expect(component.loginform.controls['email'].value).toEqual('');
    expect(service.crudGet).toHaveBeenCalled(); // Ensure crudGet is called on component initialization
  });

  // it('should call crudPost on valid form submission when editingUserId is not set', () => {
  //   const crudPostSpy = spyOn(service, 'crudPost').and.returnValue(of({}));
  //   // Set form values
  //   component.loginform.setValue({
      
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     email: 'jane.doe@example.com'
  //   });

  //   // Ensure editingUserId is not set
  //   component.editinguserId = 10;

  //   // Trigger form submission
  //   component.submit();

  //   // Expect crudPost to be called
  //   expect(crudPostSpy).toHaveBeenCalledWith({
    
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     email: 'jane.doe@example.com'
  //   });
  // });

  it('should call crudPost with correct values when creating a new user', () => {
    const formValues = {
     
      firstName: 'Vaasud',
      lastName: 'Krishna',
      email: 'VaKri@gmail.com'
    };
    component.loginform.setValue({
      ...formValues,
      userId: null
    });
  
    component.loginform.setValue(formValues);
  
    const crudPostSpy = spyOn(service, 'crudPost').and.returnValue(of({}));
  
    component.submit();
  
    expect(crudPostSpy).toHaveBeenCalledWith(formValues);
  });
  

  it('should call crudPut on valid form submission when editingUserId is set', () => {
    // Set form values
    component.loginform.patchValue({
      userId: 12,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });

    // Set editingUserId to simulate edit mode
    component.editinguserId = 12;

    // Trigger form submission
    component.submit();

    // Expect crudPut to be called
    expect(service.crudPut).toHaveBeenCalledWith(123, {
      userId:12,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
  });

  it('should call crudDelete when delete method is invoked', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Mock confirm dialog
    component.delete(1);
    expect(service.crudDelete).toHaveBeenCalledWith(1);
  });

  it('should handle error on form submission', () => {
    spyOn(window, 'alert'); // Mock window.alert

    // Make sure the form is valid before submission
    component.loginform.controls['firstName'].setValue('ValidName');
    component.loginform.controls['lastName'].setValue('ValidName');
    component.loginform.controls['email'].setValue('valid@example.com');

    // Simulate error from the service
    service.crudPost.and.returnValue(throwError({ message: 'Error occurred' }));

    component.submit();

    expect(component.submitted).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith('Error occurred: Error occurred');
  });

  it('testing title', () => {
    expect(component.title).toEqual("lc_F_end");
  });
});
