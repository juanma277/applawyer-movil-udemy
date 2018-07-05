import { NgModule } from '@angular/core';
import { SplitPipe } from './split/split';
import { ImagenPipe } from './imagen/imagen';
import { ImagenUserPipe } from './imagen-user/imagen-user';

@NgModule({
	declarations: [SplitPipe,
    ImagenPipe,
    ImagenUserPipe],
	imports: [],
	exports: [SplitPipe,
    ImagenPipe,
    ImagenUserPipe]
})
export class PipesModule {}
