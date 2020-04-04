import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private domSanitazer: DomSanitizer) {

  }

  transform( img: string): any {
    const domImg = `background-image: url('${ img }')`;
    return this.domSanitazer.bypassSecurityTrustStyle(domImg);
  }

}
