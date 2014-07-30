App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id'});
	});
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
})

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return posts;
	}
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', parseInt(params.post_id));
  }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

var posts = [
   {
      "id":0,
      "title":"LESS Variables, Mixins, & Nesting",
      "author":{
         "name":"James Futhey"
      },
      "date":"2014-07-25T00:00:00.000Z",
      "body":"<img src=\"http://designshack.net/wp-content/uploads/less-snippets-0.jpg\">\n\n#LESS Variables\n\nLess variables allow us to avoid writing duplicate code, and to make \"global\" changes quick & effortless. The most common use of LESS variables is for color theming.\n\nImagine your typical HTML5 webpage. Usually, you'll reuse a palette of 3-5 colors in a design, maybe with a few tints and shades of those base colors. But what happens if, for example, you want to change your maincolor? You could search and replace all occurences of that color, and then recalculate your tints and shades & varients of that color. Alternatively, using LESS, you could change them on the fly using variables.\n\nTypically, variables are located at the beginning of the document (so that future changes are quick and easy), but this is not a restriction of the LESS syntax. The syntax for creating a LESS variable is as follows:\n\n    @variable-name: #fff;\n\nNow, for example, you could replace all occurences of #fff in your code with @variable-name, and when you changed the variable at the top of your document, the changes would occur in multiple places.\n\n    @variable-name: #fff;\n    body {\n      background-color: @variable-name;\n    }\n    a:hover {\n      color: @variable-name;\n    }\n\n###LESS Mixins\n\nMixins are sets of properties which can be \"mixed in\" to other blocks of CSS (based on the DRY principal; Don't Repeat Yourself). If you've worked with classes and inheritance in other languages this will seem familiar.\n\nIn LESS, all we need to do to include one class (using the dot syntax) in another block of CSS is to reference it.\n\nFor Example:\n\n    .global-padding {\n      padding: 10px;\n    }\n    #my-div {\n      .global-padding;\n    }\n    .footer-div {\n      .global-padding;\n    }\n\nIn this example, we created a css class 'global-padding'. Then, we included it's as a default inside of two other DOM elements using straightforward syntax.\n\nNote: It does not matter if the DOM element exists or not, but beware that if the class was referenced in the DOM you would be making changes to the DOM itself.\n\n###LESS Nesting\n\nAnother timesaving feature of LESS that will help you write less code is nesting. In the following example, you'll see that we repeat <strong>#header</strong> several times:\n\n    #header {\n      color: black;\n    }\n    #header .navigation {\n      font-size: 12px;\n    }\n    #header .logo {\n      width: 300px;\n    }\n\nOne way we could refactor this code is through nesting. LESS by default assumes all nested elements are child elements. See the example below:\n\n    #header {\n    color: black;\n    .navigation {\n       font-size: 12px;\n    }\n    .logo {\n       width: 300px;\n    }\n    }\n\nThis LESS would compile to the same CSS, but the LESS file is much easier to work with.\n\nThat's 90% of what you need to know to make your lives more productive and make your CSS more efficient with LESS! Enjoy!\n\n"
   },
   {
      "id":1,
      "title":"GPU Accelerating your CSS Animations",
      "author":{
         "name":"James Futhey"
      },
      "date":"2014-07-12T00:00:00.000Z",
      "body":"<img src=\"http://blog.laptopmag.com/wpress/wp-content/uploads/2011/03/chrome-gpu-b4-and-after-i.jpg\">\n\n#Why do we need GPU acceleration?\n\nMany CSS animations, especially those that affect margin sizes, require massive amounts of the screen to be repainted for each and every frame that is generated. Worse, moving larger items or adjusting margins through CSS animations sometimes requires offscreen data to be recalculated as well. This can become overwhelming for our general purpose CPU thread, which is already doing the heavy lifting of rendering one or more pages, and running increasingly extensive amounts of JavaScript. And for technical reasons I won't get into, a general-purpose computing device such as the CPU is not well-suited for this task to begin with.\n\n###The Solution? GPU Acceleration\n\nIncreasingly, more and more PCs and Mobile devices, even on the low-end, are being shipped with powerful GPUs accessible by most modern browsers (including IE 10+!). These are the same chips capable of rendering complex animation for 2d and 3d gaming, and typically, when you're browsing the internet, they go completely unused. The browser, by default, does not make use of this hardware for most animations. Worse, even with only a few objects being animated, your CSS animations can bring your webpage to a crawl, cause frame-skipping, and just turn out to be super ugly. So, in many cases, you'll want to force GPU-accelerated animation.\n\n###But I heard this is why CSS animation is already faster than JavaScript animation.\n\nYes and no. Some browsers, such as firefox, perform a limited amount of GPU accelerated animation automatically. However, a majority of browsers (Webkit & IE) do not perform GPU acceleration on any 2d animations (transform, translate, scale, skew, rotate, etc). For other reasons, CSS animations rendered by the browser have had smoother performance than animations handled by JavaScript looping, such as jQuery.animate(), and this has led to the perception that CSS animations are always faster than those in JavaScript. Not only is this not true, but there are many limitations to what you can animate in CSS alone, and JavaScript events can be useful triggers for animations which can delight webpage visitors, and should not be dismissed.\n\n###A majority of my animations in CSS are 2d. Most browsers do not GPU accelerate 2d animations, how do I increase performance?\n\nA trick you can use to enable GPU acceleration on your webpages is to first apply a 3d transform (which does nothing) to your elements. You want to apply this to all elements, not just the elements you wish to apply 2d css animations to, because your animation may still cause these elements to be repainted by the browser. Look at the example CSS below:\n\n    * {\n        -webkit-transform: translate3d(0px,0px,0px);\n        -moz-transform: translate3d(0px,0px,0px);\n        -ms-transform: translate3d(0px,0px,0px);\n        -o-transform: translate3d(0px,0px,0px);\n        transform: translate3d(0px,0px,0px);\n    }\n\nIt performs a 3d translate function on each element of the DOM, which forces the browser to enable rendering (for that element) using the GPU. Now, when we apply 2d animations to that DOM element, it's changes will be rendered by the GPU, not the CPU, increasing performance on all modern browsers and devices (even IE!). This not only applies to CSS animations, but to JavaScript animations as well, since we are in essence forcing the GPU to render our elements each time the screen is repainted.\n\nHowever, this does not solve the root issue with using the jQuery.animate() function. That issue is not primarily caused by the CPU overhead of repainting our screen, since even trivial jQuery animations are affected. jQuery.animate() performs slowly because the jQuery loop itself is rather slow, as evinced by the slowness of other jQuery functions, such as dom element lookup and the jQuery.each() function. However, other libraries, such as <strong>velocity.js</strong>, can be used as a replacement for the jQuery.animate() function to provide much smoother animation."
   },
   {
      "id":2,
      "title":"Anatomy of an @font-face declaration",
      "author":{
         "name":"James Futhey"
      },
      "date":"2014-07-05T00:00:00.000Z",
      "body":"<img src=\"http://img.weburbanist.com/wp-content/uploads/2012/08/font-face-times-roman.jpg\">\n\n###First Things First: The @font-face declaration (basic syntax)\n\nBefore we can call a font that doesn't exist on the local machine, we have to use @font-face to load it off the interwebs.\n\n    @font-face {\n    font-family: 'Open Sans';\n    font-style: normal;\n    font-weight: 300;\n    src: local('Open Sans Light'), local('OpenSans-Light'), url(http://themes.googleusercontent.com/static/fonts/opensans/v8/DXI1ORHCpsQm3Vp6mXoaTXhCUOGz7vYGh680lGh-uXM.woff) format('woff');\n    }\n\nYou'll notice that several css properties are declared before the **src:** file is loaded. This is so that we can optionally load separate font files for multiple font weights and styles. Although the WOFF format can contain multiple weights and styles, the file we are using may not.\n\n###So, What happens when we call a web font?\n\nWhen we call a remote web font, our browser searches for an **EXACT MATCH** among our @font-face declarations, including weight, face, and style, for **EACH INDIVIDUAL GLYPH** or language family / character encoding.\n\nThis is important to remember when working with other languages (Especially Asian languages). For example, if you are working with Chinese or Japanese, there are only a few fonts in existence, and invariably, they all have terrible Roman lettering for English text. Most contain a wide monospaced font. So, generally, you'll want to declare your English-language webfonts before declaring a set of Windows and Macintosh system fonts.\n\n###So, What happens when we match a font face but not a specific style or weight?\n\nIn short, all hell breaks loose. Font-rendering engines <i>create</i> weight and style variations by stretching and resizing existing fonts. In web typography, this is probably the biggest sin of them all: letting your rendering-engine decide how to handle your kerning, weight sizing, or letting it render all of your letters at a 15 degree angle and call them <i>italic</i>.</i>\n\n<img src=\"http://www.stikoo.co.uk/files/large/a1ff4adb2e02f3a0f5c11cf173139b20.png\">\n\nIn the above image, you can see the original file, followed by a faux-italic version of the font, rendered by the system, followed by the tyopgrapher's intended italic styling. See a similar comparison in the following image:\n\n<img src=\"http://www.jamesfuthey.com/kidgodzilla.com/8_IE8and9.jpg\">\n\nMultiple source files can be defined in an @font-face declaration, and the last supported file type listed will be rendered by the user's browser. So, basically you're listing fonts in order from worst to best, and the browser will pick the best filetype it can work with. WOFF is supported by all current browsers, as of 2014. However, if you're ensuring compatibility with IE8 or Android 4.3 (Jelly Bean), you will want to first include an EOT file for IE, then a TTF or OTF font for Android 2+.\n\nAn interesting note is that you may want to purposefully force mobile users to fallback to system fonts when they are available, especially for body type, to save bandwidth and increase page rendering time.</p><p>For example, on older, underpowered Android devices, you can call **'Droid Sans'** in your font-family declaration, after calling your webfonts but before calling your fallback Macintosh and Windows system fonts. Then, if your browser fails to load the WOFF or EOT file, it will check for the Android-specific system font before falling back to other system fonts. This way, you can reduce both page load and render time for large blocks of body text.\n\nA careful understanding of how your fallback fonts cascade in different browsers can give you an enormous amount of control over the typography on your page.</p>"
   }
];

new WOW().init();