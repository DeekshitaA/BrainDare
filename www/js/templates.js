angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("register.html","<div> HI There </div>\n");
$templateCache.put("welcome.html","<ion-pane id=\"welcome\" class=\"welcomePane\">\n    <h1 class=\"title\">Dare to Take the first step to changing your life!!</h1>\n\n   <ion-footer-bar>\n    <a class=\"button button-full button-calm button button-assertive\" ui-sref=\"register\">\n     Lets Go\n   </a>\n   </ion-footer-bar>\n\n</ion-pane>\n");}]);