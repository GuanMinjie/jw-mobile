import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @Input('myHighlight') highlightColor: string;
  @Input() defaultColor: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.highLight(this.highlightColor || this.defaultColor ||'red')
  } 
  @HostListener('mouseleave') onMouserLeave() {
    this.highLight(null)
  }

  private highLight(color: string) {
    this.el.nativeElement.style.backgroundColor  =  color;
    this.el.nativeElement.style.color = 'white';
  }
}
