module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPriceCart = oldCart.totalPriceCart || 0;

    this.add = function (item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, PrPrice: 0};
        }
        storedItem.qty++;
        storedItem.totalPrice = storedItem.item.PrPrice * storedItem.qty;
        this.totalQty++;
        this.totalPriceCart += storedItem.item.PrPrice;
    };

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPriceCart = this.totalPriceCart - this.items[id].totalPrice;
        delete this.items[id];
    };

    this.removeAll = function () {
        this.totalQty = 0;
        this.totalPriceCart = 0;
        delete this.items;
    };

    this.generateArray = function () {
        const arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};