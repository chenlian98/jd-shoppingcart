let main = document.querySelector('main') //获得到最大的父容器
let univalence; //单价
let subtotal;//subtotal 小计
let quantityForm;//数量的容器
let checks;//列表的孩子复选框
let check_all = document.querySelector('main .cart-thead  .check-all input[type]') //全选
let items //商品列表盒子
// items = [...main.children] //转成数组 使用扩展符 ...
// items.splice(0,1) //截取到所有的 item 盒子
// console.log(items)
let total_prices   //总价
let countShop     //总共的商品
function init() {
    let allNum = 0
    let allPrice = 0
    items = main.querySelectorAll('.item')
    quantityForm = main.querySelectorAll('.item .quantity-form') //数量的容器
    univalence  = main.querySelectorAll('.item .price'); //单价
    checks = main.querySelectorAll('.item .bill input[type]') //孩子复选框
    subtotal = main.querySelectorAll('.item .subtotal');// subtotal 小计
    let end_all  = document.body.querySelector('.end').children //获得总价 和总价商品的父容器
    total_prices  = end_all[1].children[0]    //总价
    countShop   =  end_all[0].children[0]        //总共的商品
    for( let i = 0; i < items.length; i++){
        let num = quantityForm[i].children[1].value; //数量
        let pri = univalence[i].children[0].innerHTML; //单价
        console.log()
        if (checks[i].checked){
            items[i].classList.add('bj')
            //计算小计
            let price = (parseInt(pri) * parseInt(num)).toFixed(2)
            subtotal[i].innerHTML = '¥' + price;
            allNum += Number(num)  //总共商品数
            allPrice += Number(price);     //总价的值
        }else{
            items[i].classList.remove('bj')
         }

    }
    countShop.innerHTML = '已选择 ' + allNum + ' 件商品'
    total_prices.innerHTML = '总价：¥ ' + allPrice.toFixed(2)
}
init()

for(let i = 0; i < quantityForm.length; i++){
     // - 符号
        let minus = quantityForm[i].children[1].previousElementSibling
        minus.addEventListener('click', function(){
             let numm = this.nextElementSibling
             if(numm.value <= 1) {
                 minus.style.cursor = 'not-allowed'
             }else{
                this.nextElementSibling.value -= 1
                init()
             }
        })
        // +  符号
        let add = minus.nextElementSibling.nextElementSibling
        let inputs  = minus.nextElementSibling //Num数字框
         //获得库存 默认类型为 string  +号转成 Number类型
         let data_inventory =  +inputs.getAttribute('data-inventory')
    add.addEventListener('click', function(){
              minus.style.cursor = 'pointer' //减号 >=1 的时候变回去
            if (inputs.value  >= data_inventory) {
                console.log('不能大于库存')
                inputs.value = data_inventory
            }else {
                inputs.value = Number(inputs.value) + 1
                init()
            }

        })
          //inputs 内容改变的时候 数量的输入框
    inputs.addEventListener( 'change',function (){
            let z = /^[1-9]\d{0,1}$/ //限制只能输入2位
            if (z.test(this.value)) {
                if(this.value < 1 ){
                    this.value = 1
                }else if (this.value > data_inventory){
                    console.log('不能大于库存')
                    this.value = data_inventory
                }else {
                    init()
                }
            }else {
                this.value = 1
            }

        })
}
// 子项全部选中 - 父亲选中
let count = 1 //计数
for (let i = 0; i < checks.length; i++) {
    checks[i].addEventListener('click', () => {
        console.log(count)
        if (checks[i].checked) {
            count += 1
        }
        check_all.checked = count === checks.length;
      init()
  })
}
//全选
check_all.onclick = function() {
    for(let i = 0; i < checks.length; i++){
        if (this.checked){
            checks[i].checked = true
            // debugger
            items[i].classList.add('bj')
            init()
        }else {
            count = 0 // 取消选择的时候 计数变为 0
            checks[i].checked = false
            items[i].classList.remove('bj')
            countShop.innerHTML = '已选择 0 件商品'
            total_prices.innerHTML = '总价： ¥  0'
        }

    }
}
// init()
let del = main.querySelectorAll('.item .del span'); //删除
for(let del_item of del) {
    del_item.addEventListener('click',function (){
         // debugger
         //每次删除一次的时候 重新调用一次方法
          this.parentNode.parentNode.remove()
           return  init()
     })
}


//点击按钮增加一个商品
// let add_commodity = document.querySelector('.box .add')
// add_commodity.addEventListener('click',function (){
//     let aa = items[0].cloneNode(true) //深度克隆一个item
//     main.append(aa)
//     // console.log(11)
//     init()
    // let box = document.createElement('div')
    //     box.className = 'item'
    //     main.append(box)
    //     box.innerHTML = `
    //      <div class="bill"><input type="checkbox" checked></div>
    //         <div class="p-img">
    //             <img src="img/pic1.jpg" alt="">
    //         </div>
    //         <div class="title">
    //             小米CC9 Pro 1亿像素 五摄四闪 10倍混合光学变焦 5260mAh 屏下指纹
    //         </div>
    //         <div class="price">¥<span>2000:00</span>
    //         </div>
    //         <div class="quantity-form">
    //             <span>-</span>
    //             <input type="number" value="2"  data-inventory="10">
    //             <span>+</span>
    //         </div>
    //         <div class="subtotal">
    //             ¥<span>00.00</span>
    //         </div>
    //         <div class="del">
    //             <span>删除</span>
    //         </div>`
       // let bill = document.createElement('div')
       //     bill.className = 'bill'
       // box.append(bill)
       // let checkbox = document.createElement('input')
       //     checkbox.setAttribute('type','checkbox')
       //   bill.append(checkbox)
       // let p_img = document.createElement('div')
       //     p_img.className = 'p-img'
       //  box.append(p_img)
       //  let img = document.createElement('img')
       //  img.setAttribute('src','img/pic3.jpg')
       //   p_img.append(img)
       //  let title = document.createElement('div')
       //  title.className = 'title'
       //  title.innerText = '华为 HUAWEI Mate 30 Pro 5G 麒麟990 OLED环幕屏双4000万徕卡电影'
       //  box.append(title)
       //  let price = document.createElement('div')
       //  price.className = 'price'
       //  price.innerHTML = `¥ <span>1000</span>`
       //  box.append(price)

    // let  i = items.slice(0,1)
       //  items.push(Array.from(i))
       //  console.log( items)
// })

