# vuejs-chunks-upload
upload large files as chunks
#### *note: This package works well with [pionl laravel-chunk-upload](https://github.com/pionl/laravel-chunk-upload)

![image](https://cdn.iconscout.com/icon/free/png-256/vuejs-1175052.png)


## Installation:
Require this package with npm using the following command:

```sh
npm i --save vuejs-chunks-upload
```

## Usage
#### *note: this package used with `axios` So you have to install `axios` first

## Example:
```sh
import { uploadService } from 'vue-upload-chunks/dist';
.
.
.
.
methods: {
        upload() {
                this.progress = 0;
                this.result = null;
                uploadService.chunk('http://localhost/api/upload', this.file,
                    // Progress
                    percent => {
                        this.progress = percent;
                    },
                    // Success
                    res => {
                        console.log(res);
                    },
                    // Error
                    err => {
                        console.log(err);
                    }
                );
        },
}
```


### License
Laravel vuejs-chunks-upload is free software licensed under the MIT license.
