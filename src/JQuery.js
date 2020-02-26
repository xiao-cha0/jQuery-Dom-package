//全局DOM后接的是一个对象；
//全局jQuery后接的是一个函数；
window.jQuery = function (selectorOrArray) {//接受selectorOrArray（选择器或数组）
  let elements;//申明一个空的elements
  if(typeof selectorOrArray === 'string'){//判断：如果selectorOrArray的类型是一个字符串
    elements = document.querySelectorAll(selectorOrArray);//获取到所有元素们并赋值给elements
  }else if (selectorOrArray instanceof Array){//判断：如果selectorOrArray的类型是一个数组
    elements = selectorOrArray; //直接将这个数组赋值给elements
  }

//需注意：我们获取到所有的元素后不是直接返回所有的元素们，而是返回一个对象（又称api);这个对象中保存可以用来操纵所有元素们的方法
  //这也就刚好构成了闭包
return {
    oldApi: selectorOrArray.oldApi,
  //给元素添加className属性
  addClass(className){
    //遍历获取到元素们（elements）
    for(let i = 0;i<elements.length;i++){
      //遍历得到每一个元素，对它进行添加className属性
      elements[i].classList.add(className);
    }
    return this;//this就是api
  },
  //查找所有元素
  find(selector){//selector是选择器
    let array = [];//申明一个空数组，用于放查找到的元素
    for(let i =0;i<elements.length;i++){//遍历获取到的元素们（elements）
      //遍历得到每一个元素，然后再通过querySelectorAll去获取到它对应的子代元素们;元素们是由一个伪数组组成，再通过
      //Array.from()转换成真正的数组；最后与空数组相连接（concat()）拿到所有的元素
       array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
    }
    array.oldApi = this;//this就是Api(api1)
    return jQuery(array);//返回新的api(api2)，用于操作array
  },
  end(){
    return this.oldApi; //(this就是api2)
  },
  //遍历elements
  each(fn) {//接受一个参数fn(fn是一个函数)
    for (let i = 0; i < elements.length; i++) {//遍历elements
      fn.call(null, elements[i], i)//遍历得到elements中的每一个元素及下标，并传给你fn
    }
    return this //this就是api
  },
  //查找爸爸
  parent() {
    let array = [];//声明一个空对象用于放元素的爸爸们
    //找到所有孩子们的爸爸，并添加到数组中
    this.each(node =>{
      if(array.indexOf(node.parentNode) === -1){
        //判断：如果数组中没有，就添加进去
        array.push(node.parentNode);
      }
    } );//this就是api(也可以说是当前return的这个对象，
    // 因为这个对象里封装了对elements操纵的所有方法；所以我们把这个对象统称为api)
    return jQuery(array);//返回api
  },
  //打印出所有的元素
  print(){
      console.log(elements);
  },
  //找所有孩子们
  children(){
      const array =[];//声明一个空对象用于放元素的孩子们
    //找到所有孩子们，并添加到数组中
      this.each((node)=>{
        if (array.indexOf(node.children) === -1){//判断：如果数组中没有，就添加进去
          array.push(...node.children)//'...'是展开操作符
        }
      });
    return jQuery(array)//返回api
  },
};
};