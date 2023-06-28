import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/_Models/Category';
import { Shipper } from 'src/app/_Models/Shipper';
import { Subcategory } from 'src/app/_Models/Subcategory';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
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
  selectedCategoryName: string = '';
  images: FileList;
  availableColors: string[] = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Black',
    'White',
    'Mixed',
  ];
  selectedColor: string;
  constructor(
    private formBuilder: FormBuilder,
    private subcatService: SubSubcategoryService,
    private catService: CategoryService,
    private shipperservice: ShipperService,
    private productService: ProductService
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
      color: [''],
    });
  }

  submitProductForm(): void {
    this.submitted = true;

    if (this.productForm.valid) {
      // Process the form data and submit
      console.log(this.productForm.value);
      this.productService.addProduct(this.productForm.value).subscribe(
        (response) => {
          const productId = response['id'];
          console.log(productId);
          console.log(response.id);

          this.uploadImages(productId);
          console.log('Product added successfully:', response);
          // Reset the form or perform any other necessary actions
          Swal.fire({
            title: 'Product Added',
            text: 'The product has been added successfully.',
            icon: 'success',
            showCloseButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Close',
          });
          this.productForm.reset();
        },
        (error) => {
          console.error('Error adding product:', error);
          // Handle the error as needed
        }
      );
      // Show success alert
    }
  }

  // submitProductForm(): void {
  //   this.submitted = true;

  //   if (this.productForm.valid) {
  //     const colors: string[] = this.productForm.value.colors; // Get the selected colors from the form

  //     this.productService.addProduct(this.productForm.value).subscribe(
  //       (response) => {
  //         const productId = response['id'];
  //         console.log(productId);
  //         console.log(response.id);

  //         for (const color of colors) {
  //           this.uploadImages(productId, color); // Pass each color to the uploadImages method
  //         }

  //         console.log('Product added successfully:', response);
  //         // Reset the form or perform any other necessary actions
  //         Swal.fire({
  //           title: 'Product Added',
  //           text: 'The product has been added successfully.',
  //           icon: 'success',
  //           showCloseButton: true,
  //           confirmButtonColor: '#3085d6',
  //           confirmButtonText: 'Close',
  //         });
  //         this.productForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error adding product:', error);
  //         // Handle the error as needed
  //       }
  //     );
  //     // Show success alert
  //   }
  // }

  onCategoryChange(event: any): void {
    const categoryId = event.target['value'];
    console.log(categoryId);
    this.selectedCategoryId = categoryId;

    if (categoryId) {
      this.filteredSubCategories = this.subCategories.filter(
        (subCategory) => subCategory.categoryId == categoryId
      );
      console.log(this.filteredSubCategories);
    } else {
      this.filteredSubCategories = [];
    }
  }

  uploadImages(productId: number) {
    if (this.images && this.images.length > 0) {
      const color = this.productForm.get('color')?.value;

      this.productService.uploadImages(productId, color, this.images).subscribe(
        (response) => {
          console.log('Images uploaded successfully:', response);
        },
        (error) => {
          console.error('Error uploading images:', error);
        }
      );
    }
  }

  onFileChange(event: any) {
    console.log(event.target.files);
    this.images = event.target.files;
  }


}
