(function($){
	$.fn.getListItems = function(options){	 
		var defaults = {
			listId: "",
			fields: "",
			filter: "",
			rowLimit: null,
			custFunc: null
		};
	  	var options = $.extend(defaults,options); 
   		$.ajax({
    		url: "/contents/_vti_bin/lists.asmx",
        	type: "POST",
        	dataType: "xml",        
        	contentType: "text/xml; charset=\"utf-8\"",
        	data: "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'><soapenv:Body>\
        	<GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>\
    			<listName>"+options.listId+"</listName>\
          		<viewFields><ViewFields>"+options.fields+"</ViewFields></viewFields>\
           		<query><Query>"+options.filter+"</Query></query>\
           		<rowLimit>"+options.rowLimit+"</rowLimit>\
			</GetListItems></soapenv:Body></soapenv:Envelope>", 
    		complete:	options.custFunc
    	});
	};
})(jQuery);
