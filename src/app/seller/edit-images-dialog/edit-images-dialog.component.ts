import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-images-dialog',
  templateUrl: './edit-images-dialog.component.html',
  styleUrls: ['./edit-images-dialog.component.css'],
})
export class EditImagesDialogComponent {
  selectedFiles: FileList;
  productId: number;
  color: string;

  constructor(
    public dialogRef: MatDialogRef<EditImagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.productId = data.id;
    this.color = 'white';
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  uploadImages() {
    // Validate if files are selected
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      return;
    }

    // Return the selected files, product ID, and color as the result
    this.dialogRef.close({
      productId: this.productId,
      color: this.color,
      files: this.selectedFiles,
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
