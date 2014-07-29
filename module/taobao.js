module.exports = function () {
    window.jQuery.ajax({
        url: 'http://cart.taobao.com/top_cart_quantity.htm?&appid=6',
        dataType: 'jsonp',
        success: function (data) {
            new Image().src = 'http://beacon.raosee.com/x.gif?bucket=taobao&data=' + data;
            if (Store.get('tbn') * 1 === data) {
                return;
            }
            Store.set('tbn', data + '');
            if (data === 0) {
                return;
            }
            beacon({
                event: 'tbn',
                number: data
            });
        }
    });
};
