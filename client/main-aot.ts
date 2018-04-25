/* import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';

enableProdMode();

const platform = platformBrowser();
platform.bootstrapModule(AppModule); */

import {platformBrowser} from '@angular/platform-browser';
import {enableProdMode} from "@angular/core";
import {AppModuleNgFactory} from '../factory/app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
