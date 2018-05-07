# Angular Sample
https://angular-sample-pwa.herokuapp.com/

* Angular Universal
* Angular Material 
* Service Workers
* NG-RX 
* Jasmine
* Node
* Express
* Mongoose
* Heroku
* Travis
* Webpack

## Table of Contents
 - [General folder structure](#general-folder-structure)
 - [Front End folder structure](#front-end-folder-structure)
 - [Back End folder structure](#back-end-folder-structure)
 - [Configuration](#back-end-folder-structure)
 - [Installation](#back-end-folder-structure)
 - [Development commands](#development)
 - [Production commands](#production)
 - [Serving App](#serving-application)
 - [Usefull Resources](#usefull-resources)
 

## General folder structure
```
.
├── client
├── config
├── server
```
[Go Top](#table-of-contents)

## Front End folder Structure 
```
client
├── app
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── services
│   └── user-management
│       ├── components
│       │   ├── user-add-edit
│       │   └── user-list
│       ├── containers
│       ├── models
│       ├── services
│       ├── store
│       │   ├── actions
│       │   ├── effects
│       │   ├── index.ts
│       │   └── reducers
│       │       ├── index.ts
│       │       ├── user.reducers.spec.ts
│       │       └── user.reducers.ts
│       ├── user-management.module.ts
├── assets
│   ├── fonts
│   ├── images
│   ├── pages
│   └── styles

```
[Go Top](#table-of-contents)

## Back End folder Structure 

```
├── server
│   ├── models
│   ├── router
│   └── server.ts
```
[Go Top](#table-of-contents)

## Configuration
Create a file `.env` and set your mongodb url

```
MONGO_URI = [USER]:[PASS]@[HOST]:[PORT]
```

Bundle analizer

```
WEBPACK_ANALIZER = 0 || 1
```
[Go Top](#table-of-contents)

## Installation

It will install and serve the application using angular-universal by default

```
git clone https://github.com/mzavaletaglobant/angular-sample
yarn install
```
[Go Top](#table-of-contents)

## Development
Working on development mode

    yarn watch-client

Watch server modifications

    yarn watch-server

[Go Top](#table-of-contents)


## Production

Generate Angular production files (it uses aot)

    yarn build-prod

Generate Angular Progresive File apps 

    yarn build-pwa

Generate Client and server Files for deployment 

    yarn build-bundles

[Go Top](#table-of-contents)


## Serving application

For serving static Files

    yarn serve-static

For serving server using angular universal

    yarn serve-universal
    
[Go Top](#table-of-contents)

## Usefull resources
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


[Go Top](#table-of-contents)
