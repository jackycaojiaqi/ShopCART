
new Vue({

    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
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
                    this.totalMoney = response.data.result.totalMoney;
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
        },
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {//判断实体是否存在checked字段
                // Vue.set(item,"checked",true);//不存在，则set该属性
                this.$set(item, "checked", true)//局部注册
            } else {
                item.checked = !item.checked
            }
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

        }
    }
});
Vue.filter("money", function (value, type) {
    return "¥ " + value.toFixed(2) + type;
})