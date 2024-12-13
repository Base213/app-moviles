import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs';
import { User } from 'src/app/model/user';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let mockDatabaseService: jasmine.SpyObj<DatabaseService>;

  beforeEach(waitForAsync(() => {
    mockDatabaseService = jasmine.createSpyObj('DatabaseService', ['getAllUsers', 'deleteUser']);
    
    mockDatabaseService.getAllUsers.and.returnValue(of([new User(), new User()]));

    TestBed.configureTestingModule({
      imports: [UsuariosComponent],
      providers: [
        { provide: DatabaseService, useValue: mockDatabaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    component.ngOnInit();  
    fixture.detectChanges();

    expect(mockDatabaseService.getAllUsers).toHaveBeenCalled();
    
    expect(component.usuarios.length).toBeGreaterThan(0);
  });

});
