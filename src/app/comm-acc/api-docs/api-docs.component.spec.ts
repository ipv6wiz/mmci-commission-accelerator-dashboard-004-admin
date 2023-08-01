import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDocsComponent } from './api-docs.component';

describe('ApiDocsComponent', () => {
  let component: ApiDocsComponent;
  let fixture: ComponentFixture<ApiDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiDocsComponent]
    });
    fixture = TestBed.createComponent(ApiDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
