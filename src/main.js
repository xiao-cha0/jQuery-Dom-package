//api申明后只用了一次，是可以省略的；但为了懂其含义我暂时保留
//const api = jQuery('.test');//返回一个api,不是返回元素们
//api.addClass('red')
  //.addClass('yellow')
 // .addClass('green');//遍历所有class为test的元素，然后给他们加上class = "red,yellow,green",继续返回api;
//api.addClass() === obj.fn
//obj.fn.call(this,'xxx') ==== obj.fn.call(obj,'xxx')
// api.addClass.fn(this,'red') ==== api.addClass(api,'red')
//api 就是 this
jQuery('.test')
  .addClass('blue')
  .find('.child')
  .addClass('red')
  .end()
  .addClass('green');