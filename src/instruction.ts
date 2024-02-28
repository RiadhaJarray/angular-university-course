/** we an use the cli command : ng  generate @angular/core:stanalone
 *  1/converrt all component , directives and pipes to standalone
 *  2/remove unnecessary NgModule classes : will not always work as expected and needed
 *  3/Bootstrap tha application using standealone APIs
 * 
 * but you need to do some additionnal modification to get 100% standalone app
 * 
 * or do this manually : as follow  :
 * ***********make migration from non standalone to standalone************
 *  1/ add standalone : true ==> property to all component and directive and pipes ...
 *  2/ we get declaration error on "declarations" and "exports" properies : we delete these declarations (we remove tha stande alone elements)
 *  3/ explicitely import every thing you need : for example you need *ngIf dirctive in your component.html so you need to add ngIf to "imports" property on your compoennt.ts 
 *                                                  or when you need to call a component in div : you need to add it in imports property
 *  4/ remove the ng module one by one :  clear all the imports and then delete the unused module
 *  5/ change the bootstraping in main.ts ::=> replace "platformBrowserDynamic().bootstrapModule(AppModule)" by "bootstrapApplication(AppComponent, {
 *          providers : [ //the imports from app.module
 *              importProvidersFrom(BrowserModule),
 *              provideAnimations(),
 *              provideHttpClient(withInterceptorsFromDi())
 *          ]
 *      })"
 *  6/ delete the app.module
 */



/************************************************************************ */


/**
 * 
 */