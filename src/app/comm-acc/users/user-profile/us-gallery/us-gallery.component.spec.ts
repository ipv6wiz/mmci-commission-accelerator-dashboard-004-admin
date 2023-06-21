import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsGalleryComponent } from './us-gallery.component';

describe('UsGalleryComponent', () => {
  let component: UsGalleryComponent;
  let fixture: ComponentFixture<UsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsGalleryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
