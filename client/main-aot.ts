/* import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';

enableProdMode();

const platform = platformBrowser();
platform.bootstrapModule(AppModule); */

/* import {platformBrowser} from '@angular/platform-browser';
import {enableProdMode} from "@angular/core";
import {AppModuleNgFactory} from '../factory/app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
 */
/* 

import {platformBrowser} from '@angular/platform-browser'
import {MyAppModuleNgFactory} from './app.ngfactory' //generated code
platformBrowser().bootstrapModuleFactory(MyAppModuleNgFactory); */



import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';



export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}


export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();