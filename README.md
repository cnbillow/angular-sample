# Angular Sample

* Progresive Web Apps
* Angular Universal
* Static files (only)  

## Configuration
Create a file `.env` and set your mongodb url

    MONGO_URI = [USER]:[PASS]@[HOST]:[PORT]
   example: 

    MONGO_URI = test:test@ds.mlab.com:313/heroku_32

Set build type: 
* mean -> create an app using just static files
* universal -> create app using angular universal
```
BUILD_TYPE = mean
```

## Instalation

    git clone https://github.com/mzavaletaglobant/angular-sample
    yarn install
    yarn build-bundles
    yarn build-server
    
   ## Run Server

    yarn start
    
## usefull Links
Playing with angular universal and progressive web apps

* https://material.angular.io/
* https://cli.angular.io/
* https://github.com/mzavaletavargas/angular-starter  

* https://angular.io/guide/universal
* https://blog.angularindepth.com/using-transferstate-api-in-an-angular-5-universal-app-130f3ada9e5b
* https://medium.com/google-developer-experts/angular-universal-for-the-rest-of-us-922ca8bac84
* https://github.com/ng-seed/universal


* https://slides.com/webmax/ngsw-ijs-2018/
* https://angular.io/guide/service-worker-intro
* https://developers.google.com/web/ilt/pwa/introduction-to-service-worker-slides


* https://expressjs.com/en/starter/generator.html
* http://mongoosejs.com/docs/index.html
* https://nodejs.org/en/

* https://www.npmjs.com/package/webpack-bundle-analyzer
