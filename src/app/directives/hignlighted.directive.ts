import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';


//we can use this directive whenever we want
@Directive({
  selector: '[hignlighted]',
  //we declare the directive with name 'hl' to use it
  exportAs: 'hl',
  standalone: true
})
export class HignlightedDirective {

  //we add this input to permit the passig of the attribute directive with value
  @Input('hignlighted')
  isHighlighted;

  @Output()
  toggleHighlight = new EventEmitter();

  constructor() { 
    console.log("Directive created..");
  }


  //assign the "highlighted" css class to the element that have 'hignlighted' dirrecteive as attribute 
  @HostBinding('class.highlighted')
  get cssClasses() {
    //return true;
//depending on the value of "isHighlighted" even it was passed from app-component call or not
    return this.isHighlighted;
  }
  //second possibility 
  /*@HostBinding('className')
  get cssClasses() {
    return "highlighted";
  }*/

  //we awant here to assign a style to the host element
  @HostBinding('style.border')
  get cssClasses1() {
    return "1px solid blue";
  }


  //we set the attribute disabled
  @HostBinding('attr.disabled')
  get disabled(){
    return "true";
  }

  //"mouseover" this event is taken to apply the traitement 
  @HostListener('mouseover' ,  ['$event'])
  mouseOver($event){
    console.log($event);

    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave(){
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }


  toggle(){
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }


}
