import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { Category } from 'src/app/_Models/Category';
import { ProductSellers } from 'src/app/_Models/ProductSellers';
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
      quantity: ['', Validators.required],
      description: [''],
      operatingSystem: [''],
      specialFeatures: [''],
      memoryStorageCapacity: [''],
      subCategoryId: [null, Validators.required],
      shipperId: [null, Validators.required],
      hardDiskSize: [''],
      material: [''],
      color: [''],
    });
  }

  submitProductForm(): void {
    this.submitted = true;

    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService
        .addProduct(this.productForm.value)
        .pipe(
          concatMap((productResponse) => {
            const productId = productResponse.id;
            console.log(productId);

            const productSeller: ProductSellers = {
              quantity: this.productForm.get('quantity').value,
              price: this.productForm.get('price').value,
              productId: productId,
              sellerId: 5,
            };

            return this.productService.addProductSeller(productSeller);
          }),
          concatMap((sellerResponse) => {
            const sellerId = sellerResponse['sellerId'];
            console.log(sellerId);

            return this.productService.uploadImages(
              sellerResponse['productId'],
              this.productForm.get('color')?.value,
              this.images
            );
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Images uploaded successfully:', response);

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
          error: (error) => {
            console.error('Error adding product:', error);
            console.log(error);
          },
        });
    }
  }

  onCategoryChange(event: any): void {
    const categoryId = event.target.value;
    const selectedCategory = this.categories.find(
      (category) => category.id == categoryId
    );
    console.log(categoryId);
    console.log(selectedCategory);

    if (selectedCategory) {
      this.selectedCategoryName = selectedCategory.categoryName;
    } else {
      this.selectedCategoryName = '';
    }
    console.log(this.selectedCategoryName);
    if (categoryId) {
      this.filteredSubCategories = this.subCategories.filter(
        (subCategory) => subCategory.categoryId == categoryId
      );
      console.log(this.filteredSubCategories);
    } else {
      this.filteredSubCategories = [];
    }
  }

  onFileChange(event: any) {
    console.log(event.target.files);
    this.images = event.target.files;
  }
}
