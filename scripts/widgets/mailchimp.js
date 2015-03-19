require(['modules/jquery-mozu'],
    function ($) {
      $(document).ready(function () {
        var getUrlVars=function(){
          var vars = [], hash;
          var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
          for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
          }
          return vars;
        }

        var getUrlVar=function(name){
          return getUrlVars()[name];
        }

        var createCookie=function(name,value,days) {
	         if (days) {
		           var date = new Date();
		           date.setTime(date.getTime()+(days*24*60*60*1000));
		           var expires = "; expires="+date.toGMTString();
	         }
	         else
	             expires = "";

           document.cookie = name+"="+value+expires+"; path=/";
        }

        // Getting URL var by its name
        var mcCid = getUrlVar('mc_cid');
        var mcEid = getUrlVar('mc_eid');

        if(mcCid !==null && mcEid !==null && typeof mcCid !=="undefined" && typeof mcEid !=="undefined"){
          createCookie("mc_cid",mcCid,1);
          createCookie("mc_eid",mcEid,1);
        }
      });
});
