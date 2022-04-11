import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';

/* @Component({
    templateUrl: './create-new-product.component.html',
    providers: [MessageService]
})
export class FileUploadDemo {
    
    uploadedFiles: any[] = [];
    
    constructor(private messageService: MessageService) {}

    onUpload(event: any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
    
    onBasicUpload(event: any) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }
    
    onBasicUploadAuto(event: any) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
    
} */