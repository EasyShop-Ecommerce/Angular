import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/_Models/Category';
import { Shipper } from 'src/app/_Models/Shipper';
import { Subcategory } from 'src/app/_Models/Subcategory';
import { CategoryService } from 'src/app/_services/category.service';
import { ShipperService } from 'src/app/_services/shipper.service';
import { SubSubcategoryService } from 'src/app/_services/sub-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm!: FormGroup;
  submitted = false;
  subCategories: Subcategory[] = [];
  categories: Category[] = [];
  shippers: Shipper[] = [];
  filteredSubCategories: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private subcatService: SubSubcategoryService,
    private catService: CategoryService,
    private shipperservice: ShipperService
  ) {}
  // Dummy data for subCategories and shippers

  ngOnInit(): void {
    this.subcatService.getAllSubcategories().subscribe((data) => {
      this.subCategories = data;
      console.log(this.subCategories);
    });
    this.catService.getAllCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
    this.shipperservice.getAllShippers().subscribe((data) => {
      this.shippers = data;
      console.log(this.shippers);
    });
    this.buildForm();
  }

  buildForm(): void {
    this.productForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      title: ['', Validators.required],
      price: [null, Validators.required],
      description: [''],
      operatingSystem: [''],
      specialFeatures: [''],
      memoryStorageCapacity: [''],
      subCategoryId: [null],
      shipperId: [null],
      hardDiskSize: [''],
      material: [''],
    });
  }

  submitProductForm(): void {
    this.submitted = true;

    if (this.productForm.valid) {
      // Process the form data and submit
      console.log(this.productForm.value);

      // Show success alert
      Swal.fire({
        title: 'Product Added',
        text: 'The product has been added successfully.',
        icon: 'success',
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Close',
      });
    }
  }
  onCategoryChange(event: any): void {
    const categoryId = event.target['value'];
    console.log(categoryId)
    this.selectedCategoryId = categoryId;
    if (categoryId) {
      this.filteredSubCategories = this.subCategories.filter(subCategory => subCategory.categoryId == categoryId);
      console.log(this.filteredSubCategories)
    } else {
      this.filteredSubCategories = [];
    }
  }
}
