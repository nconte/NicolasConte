javascript: (function() {

	function getCookie(name) {
		var re = new RegExp(name + "=([^;]+)");
		var value = re.exec(document.cookie);
		return (value != null) ? unescape(value[1]) : null;
	}

	var host_sara_rc = "http://cars.despegar.it";
	var host_sara_prod = "http://backoffice.despegar.com";

	var url_gui = document.createElement('a');
	url_gui.href = document.URL;

	var host_sara = null;
	if (url_gui.host.includes("rc.") || url_gui.host.includes("cars.")) {
	    host_sara = host_sara_rc;
	} else {
	    host_sara = host_sara_prod;
	}

	var match_data = url_gui.pathname.match(/\/cars\/shop\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\//);

	var pickup_iatatype = match_data[1];
	var pickup_iata = match_data[2];
	var pickup_date = match_data[3];
	var dropoff_iatatype = match_data[4];
	var dropoff_iata = match_data[5];
	var dropoff_date = match_data[6];

	var site = "INTL";
	if (url_gui.host.includes("decolar")) {
		site = "BR"
	} else {
		var paises = ["AR", "BO", "CL", "CO", "CR", "DO", "EC", "ES", "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "US", "UY", "VE"];
		var host = url_gui.host.toUpperCase();
		paises.some(function(v) {
			var regex = new RegExp("(\\." + v + "$)|(\\." + v + "\\.)");
			var match = host.match(regex) != null;
			if (match) {
				site = v;
			}
			return match;
		});
	}

	var lang = null;
	switch (site) {
		case "BR":
			lang = "PT";
			break;
		case "US":
			lang = "EN";
			break;
		default:
			lang = "ES";
	}

	var params = jQuery.param({
		pickup_iatatype: pickup_iatatype == "city" ? "any" : pickup_iatatype,
		pickup_iata: pickup_iata,
		pickup_date: pickup_date.replace(".", "T"),
		dropoff_iatatype: dropoff_iatatype == "city" ? "any" : dropoff_iatatype,
		dropoff_iata: dropoff_iata,
		dropoff_date: dropoff_date.replace(".", "T"),
		site: site,
		language: lang,
		channel: "site",
		user_id: getCookie("trackerid")
	});

	window.open(host_sara + "/cars-sara/availability/search/" + params, '_blank');
})();