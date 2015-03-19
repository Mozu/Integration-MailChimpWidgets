require(['modules/jquery-mozu',"modules/api", 'modules/models-orders'],
    function ($, api, OrderModels) {
      $(document).ready(function () {
        var readCookie = function (name) {
	         var nameEQ = name + "=";
	         var ca = document.cookie.split(';');
	         for(var i=0;i < ca.length;i++) {
		           var c = ca[i];
		           while (c.charAt(0)==' ') c = c.substring(1,c.length);
		           if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
	         }
	         return null;
        }

        var delete_cookie= function (cookie_name){
          document.cookie = cookie_name + "=; max-age=0; path=/";
        }

        var mcCid = readCookie("mc_cid");
        var mcEid = readCookie("mc_eid");

        if(mcCid !==null && mcEid !==null && typeof mcCid !=="undefined" && typeof mcEid !=="undefined"){
          var order = OrderModels.Order.fromCurrent().attributes;
          api.get('entityList', {listName: 'mailchimpEcommerceIdMapping@mzint',id: api.context.tenant}).then(function(){
            api.get('entity', {listName: 'mailchimpEcommerceIdMapping@mzint',id: order.orderNumber}).then(function(entity){
                api.update('entity', { listName: 'mailchimpEcommerceIdMapping@mzint',id:order.orderNumber,orderId:order.orderNumber,campaignId:mcCid,emailId:mcEid});
              },function(error){
                api.create('entity', { listName: 'mailchimpEcommerceIdMapping@mzint', orderId:order.orderNumber,campaignId:mcCid,emailId:mcEid});
              }
            );
          });

        delete_cookie("mc_cid");
        delete_cookie("mc_eid");
      }
    });
});
