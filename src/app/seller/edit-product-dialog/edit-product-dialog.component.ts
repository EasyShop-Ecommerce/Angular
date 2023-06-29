import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css'],
})
export class EditProductDialogComponent {
  editedProduct: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Copy the original product to the editedProduct object
    // to prevent modifying the original product directly
    this.editedProduct = { ...data.product };
  }

  onSave(): void {
    this.dialogRef.close(this.editedProduct);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
