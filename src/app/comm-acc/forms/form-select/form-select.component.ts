// angular import
import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService, Person } from './data.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule, SharedModule, NgSelectModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export default class FormSelectComponent implements OnInit {
  // public props
  people: Person[] = [];
  selectedPeople1 = [];

  people$: Observable<Person[]> | undefined;
  selectedPeople = [{ name: 'Karyn Wright' }];
  selectedPeople2 = [];

  githubUsers$!: Observable<object>;
  selectedUsers = ['anjmao'];

  heroForm!: FormGroup;
  ages = [
    { value: '<18', label: 'Under 18' },
    { value: '18', label: '18' },
    { value: '>18', label: 'More than 18' }
  ];

  customForm!: FormGroup;
  photos = [];

  // constructor
  constructor(private dataService: DataService, private fb: FormBuilder, private modalService: NgbModal) {}

  // life cycle event
  ngOnInit() {
    this.people$ = this.dataService.getPeople();
    this.githubUsers$ = this.dataService.getGithubAccounts('anjm');
    this.dataService
      .getPeople()
      .pipe(map((x) => x.filter((y) => !y.disabled)))
      .subscribe((res) => {
        this.people = res;
      });

    this.heroForm = this.fb.group({
      age: [null, Validators.required]
    });
    this.loadPhotos();
    this.customForm = this.fb.group({
      photo: ''
    });
  }

  // public method
  clearModel() {
    this.selectedPeople = [];
  }

  changeModel() {
    this.selectedPeople = [{ name: 'New person' }];
  }

  clearModel1() {
    this.selectedPeople2 = [];
  }

  showConfirm(content: ElementRef) {
    this.modalService.open(content);
  }

  selectFirstPhoto() {
    this.customForm.get('photo')?.patchValue(this.photos[0]);
  }

  openModal(content: ElementRef) {
    this.modalService.open(content);
  }

  changePhoto(photo: { thumbnailUrl: ElementRef }) {
    this.customForm.get('photo')?.patchValue(photo ? photo.thumbnailUrl : null);
  }

  togglePhotoDisabled() {
    const photo = this.customForm.get('photo');
    if (photo?.disabled) {
      photo?.enable();
    } else {
      photo?.disable();
    }
  }

  // private method
  private loadPhotos() {
    this.dataService.getPhotos().subscribe((photos) => {
      this.photos = photos;
      this.selectFirstPhoto();
    });
  }
}
