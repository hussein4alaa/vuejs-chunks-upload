# vuejs-chunks-upload
upload large files as chunks

![image](![image](https://cdn.iconscout.com/icon/free/png-256/vuejs-1175052.png)


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
