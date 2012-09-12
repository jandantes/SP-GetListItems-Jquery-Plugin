(function($){
	$.fn.getListItems = function(opts){	 
		var defaults = {
			listId: "",
			fields: "",
			filter: "",
			rowLimit: null,
			custFunc: null,
			qOptions: "",
			siteURL: ""
			
		};
	  	var opts = $.extend(defaults,opts); 
   		$.ajax({
	    		url: opts.siteURL,
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
	$.fn.addListItems = function(opts){
		var defaults = {
			listId: "",
			fields: "",
			custFunc: null,
			siteURL: ""
		};
	  	var opts = $.extend(defaults,opts); 
		var batch =
			"<Batch OnError=\"Continue\"> \
            	<Method ID=\"1\" Cmd=\"New\">"+ opts.fields +"</Method> \
        	</Batch>";
	    	$.ajax({
	        	url: opts.siteURL,
	        	beforeSend: function(xhr) {
	            	xhr.setRequestHeader("SOAPAction",
	            	"http://schemas.microsoft.com/sharepoint/soap/UpdateListItems");
	        	},
	        	type: "POST",
	        	dataType: "xml",
	        	contentType: "text/xml; charset=\"utf-8\"",
	        	data: "<?xml version=\"1.0\" encoding=\"utf-8\"?> \
	        		<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" \
	            		xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" \
	            		xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> \
	          		<soap:Body> \
	            		<UpdateListItems xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\"> \
	              			<listName>" + opts.listId + "</listName> \
	              				<updates> " + batch + "</updates> \
	            		</UpdateListItems> \
	          		</soap:Body></soap:Envelope>",
	        	complete: opts.custFunc
	    	});
	
	};
	$.fn.filterNode= function(name) {
		return this.find('*').filter(function() {
			return this.nodeName === name;
		});
	};
})(jQuery);
