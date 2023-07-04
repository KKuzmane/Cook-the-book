import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryComponent } from './recipe-category.component';

describe('RecipeCategoryComponent', () => {
  let component: RecipeCategoryComponent;
  let fixture: ComponentFixture<RecipeCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCategoryComponent]
    });
    fixture = TestBed.createComponent(RecipeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
