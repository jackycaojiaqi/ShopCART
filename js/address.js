
new Vue({
    el: ".container",
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    data: {
        addressList: [],
        limitNumber: 3,
        currentIndex: 0,
        isLoadMore: false,
        shippingMethead:1,
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNumber); //截取数组，返回全新的数组，不改变原来的数组
        }
    },
    methods: {
        getAddressList: function () {
            this.$http.get("http://192.168.31.143:8000/data/address.json")
                .then(response => {
                    var res = response.data;
                    if (res.status == 0) {
                        this.addressList = res.result;
                    }


                }).catch(function (error) {
                    console.log(error);
                });
        },
        loadMore: function (isLoad) {
            this.isLoadMore = isLoad;
            if (isLoad) {
               
                this.limitNumber = this.addressList.length;
            } else {
                this.limitNumber = 3;
              
            }

        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (address, index) {
                if (addressId == address.addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        }
    }
});