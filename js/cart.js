
new Vue({

    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag:false,
        curProduct:'',
    }, filters: {
        formatMoney: function (value) {
            return "¥ " + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        cartView: function () {
            this.$http.get("http://192.168.31.143:8000/data/cartData.json")
                .then(response => {
                    this.productList = response.data.result.list;
                  
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
        },
        //改变数量
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                if (product.productQuantity < 1) {
                    product.productQuantity == 1;
                } else {
                    product.productQuantity--;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {//判断实体是否存在checked字段
                // Vue.set(item,"checked",true);//不存在，则set该属性
                this.$set(item, "checked", true)//局部注册
            } else {
                item.checked = !item.checked
            }
            this.calcTotalPrice();
        },
        checkAll: function (ischeck) {
            this.checkAllFlag = ischeck;
            this.productList.forEach((value, index) => {
                if (typeof value.checked == 'undefined') {//判断实体是否存在checked字段
                    // Vue.set(item,"checked",true);//不存在，则set该属性
                    this.$set(value, "checked", this.checkAllFlag)//局部注册
                
                } else {
                    value.checked = this.checkAllFlag;
                }

            })
            this.calcTotalPrice();

        },
        calcTotalPrice:function(){
            this.totalMoney  =0;
            this.productList.forEach((value, index) => {
                if (value.checked) {
                  this.totalMoney += value.productPrice * value.productQuantity;
                }
            })
        },
        delConfirm:function(item){
            this.delFlag = true;
            this.curProduct = item;
        },
        delProdyct:function(item){
          var index =  this.productList.indexOf(this.curProduct);
          this.productList.splice(index,1);//对原生数组进行操作，而slice会返回新的数组
          this.delFlag = false;
        }
    }
});
Vue.filter("money", function (value, type) {
    return "¥ " + value.toFixed(2) + type;
})