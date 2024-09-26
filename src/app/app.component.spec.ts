import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lc_F_end'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('lc_F_end');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Ensure the component template is rendered
  
    const compiled = fixture.nativeElement;
  
    // Ensure that 'h1' exists in the template before accessing textContent
    const h1 = compiled.querySelector('h1');
    expect(h1).not.toBeNull(); // Assert that the element exists
    expect(h1.textContent).toContain('lc_F_end'); // Check the actual title content
  });
  
});
