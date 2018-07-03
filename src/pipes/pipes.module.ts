import { NgModule } from '@angular/core';
import { SplitPipe } from './split/split';
import { ImagenPipe } from './imagen/imagen';

@NgModule({
	declarations: [SplitPipe,
    ImagenPipe],
	imports: [],
	exports: [SplitPipe,
    ImagenPipe]
})
export class PipesModule {}
