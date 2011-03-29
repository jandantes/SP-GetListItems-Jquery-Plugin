(function($){
	$.fn.getListItems = function(opts){	 
		var defaults = {
			listId: "",
			fields: "",
			filter: "",
			rowLimit: null,
			custFunc: null,
			qOptions: ""
		};
	  	var opts = $.extend(defaults,opts); 
   		$.ajax({
    		url: "/contents/_vti_bin/lists.asmx",
        	type: "POST",
        	dataType: "xml",        
        	contentType: "text/xml; charset=\"utf-8\"",
        	data: "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'><soapenv:Body>\
        	<GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>\
    			<listName>"+opts.listId+"</listName>\
          		<viewFields><ViewFields>"+opts.fields+"</ViewFields></viewFields>\
           		<query><Query>"+opts.filter+"</Query></query>"+
           		"<queryOptions><QueryOptions xmlns='' >" + opts.qOptions + "</QueryOptions></queryOptions>"
           		 + (opts.rowLimit ? "<rowLimit>"+opts.rowLimit+"</rowLimit>" : "") +
			"</GetListItems></soapenv:Body></soapenv:Envelope>", 
    		complete:opts.custFunc
    	});
	};
})(jQuery);
