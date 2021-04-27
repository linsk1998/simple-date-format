import { prefixIntrger2,prefixIntrger3,escapeRegExp } from "sky-core";
function SimpleDateFormat(pattern){
	this.pattern=pattern;
}
SimpleDateFormat.prototype.format=function(date){
	return this.pattern.replace(/yyyy/g,date.getFullYear())
		.replace(/yy/g,prefixIntrger2(date.getYear()%100))
		.replace(/MM/g,prefixIntrger2(date.getMonth()+1))
		.replace(/M/g,date.getMonth()+1)
		.replace(/dd/g,prefixIntrger2(date.getDate()))
		.replace(/d/g,date.getDate())
		.replace(/HH/g,prefixIntrger2(date.getHours()))
		.replace(/H/g,date.getHours())
		.replace(/hh/g,date.getHours()<13?date.getHours():prefixIntrger2(date.getHours()%12))
		.replace(/h/g,date.getHours()<13?date.getHours():(date.getHours()%12))
		.replace(/mm/g,prefixIntrger2(date.getMinutes()))
		.replace(/m/g,date.getMinutes())
		.replace(/ss/g,prefixIntrger2(date.getSeconds()))
		.replace(/s/g,date.getSeconds())
		.replace(/a{1,3}/g,date.getHours()%12>1?"PM":"AM")
		.replace(/S{3}/g,prefixIntrger3(date.getMilliseconds()));
};
SimpleDateFormat.prototype.parse=function(dateString){
	var reg1=/(yyyy|yy|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s|aaa|a|SSS)/g;
	var keys=this.pattern.match(reg1);
	var date=new Date();
	if(!keys){
		return date;
	}
	var reg2Text=escapeRegExp(this.pattern).replace(reg1,function(word){
		if(word=="a"){
			return "(PM|AM)";
		}
		return "(\\d{"+word.length+",})";
	});
	reg2Text="^"+reg2Text+"$";
	var reg2=new RegExp(reg2Text);
	var values=dateString.match(reg2);
	if(!values) return NaN;
	date.setHours(0,0,0,0);
	var a12=false;
	var h12=false;
	for(var i=0;i<keys.length;i++){
		var key=keys[i];
		var value;
		if(!key.startsWith("a")){
			value=parseInt(values[i+1]);
			switch(key){
				case "yyyy":
					date.setFullYear(value);
					break;
				case "yy":
					date.setYear(value+Math.floor(date.getYear()/100)*100);
					break;
				case "MM":
				case "M":
					date.setMonth(value-1);
					break;
				case "dd":
				case "d":
					date.setDate(value);
					break;
				case "HH":
				case "H":
					date.setHours(value);
					h12=false;
					break;
				case "hh":
				case "h":
					h12=true;
					if(a12 && value<12){
						date.setHours(value+12);
					}else{
						date.setHours(value);
					}
					break;
				case "mm":
				case "m":
					date.setMinutes(value);
					break;
				case "ss":
				case "s":
					date.setSeconds(value);
					break;
				case "SSS":
					date.setMilliseconds(value);
					break;
				default:
			}
		}else{
			value=values[i+1];
			if(value=="PM"){
				a12=true;
				if(h12){
					var h=date.getHours();
					if(h<12){
						date.setHours(h+12);
					}
				}
			}
		}
	}
	return date;
};

export default SimpleDateFormat;