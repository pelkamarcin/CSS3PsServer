var server="css3.ps",generate=function(){},generate2=function(){},all_function=function(){var h="Trgt",g="Ordn",f="Lyr ",b="error",m="unsupported",l="undefined",k="Timeout during reading response from the server",c="\n",e="Illegal argument: ";function u(a){if(a>=55296&&a<=57343)throw new Error(e+a);if(a<0)throw new Error(e+a);if(a<=127)return 1;if(a<=2047)return 2;if(a<=65535)return 3;if(a<=2097151)return 4;if(a<=67108863)return 5;if(a<=2147483647)return 6;throw new Error(e+a);}function r(a){return a>=55296&&a<=56319}function K(a){return a>=56320&&a<=57343}function O(a,b){if(!r(a))throw new Error(e+a);if(!K(b))throw new Error(e+b);a=(1023&a)<<10;var c=a|1023&b;return c+65536}function M(c){for(var b=0,a=0;a<c.length;a++){var d=c.charCodeAt(a);if(r(d)){var e=d,f=c.charCodeAt(++a);b+=u(O(e,f))}else b+=u(d)}return b}function t(a){return a==" "||a=="\t"||a=="\r"||a==c}function v(a){while(a.length&&t(a.charAt(0)))a=a.substr(1);while(a.length&&t(a.charAt(a.length-1)))a=a.substr(0,a.length-1);return a}function w(e,f,d,g,i,h){var a="--"+d+c;a+='Content-Disposition: form-data; name="'+g+'"\n';a+="Content-Transfer-Encoding: binary\n";a+=c;a+=h;a+=c;a+="--"+d+"--\n";var b="POST http://"+e+f+" HTTP/1.1\n";b+="Host: "+e+c;b+="Content-Type: multipart/form-data; boundary="+d+c;b+="Content-Length: "+M(a)+"\n\n";return b+a}function E(c){var a="--boundary",b=0;while(c.indexOf(a)>=0){a+=b;++b}return a}function C(b,a){return w(server,"/Handler.ashx?id="+b+"&version=1.0.158",E(a),"xml","styles.xml",a)}function F(b){var d="",a=b.read(1);while(a!=c){if(a=="")throw new Error(k);d+=a;a=b.read(1)}return d}function y(d){var b=0;while(true){var a=F(d).toLowerCase();if(a==""){if(!b)throw new Error("Failed to read http-headers");return b}if(a.indexOf("content-length")>=0){var c=a.split(":");if(c.length!=2)throw new Error("Incorrect header content-length '"+a+"'");b=parseInt(v(c[1]))}}}function A(f,e){var a=0,d="";while(a<e){var b=f.read(1);if(b=="")throw new Error(k);d+=b;if(b==c)++a;++a}return d}function I(b,e,d){var a=new Socket;try{if(!a.open(b+":"+e,"UTF-8"))throw new Error("Failed to open socket with '"+b+"'");a.timeout=30;a.write(d);var c=y(a);return v(A(a,c))}catch(f){a.close();throw f;}}function R(b,a){return I(server,80,C(b,a))}function N(d,c){var b="css3ps-"+d+".url",a=new File(Folder.temp+"/"+b);a.open("w");a.writeln("[InternetShortcut]");a.writeln("URL="+c);a.writeln();a.close();a.execute()}XML.prettyPrinting=false;function a(b,c){var a=new XML("<"+b+"></"+b+">");a.appendChild(c);return a}var d=0;function j(b){if(typeof b==l){++d;return new XML("<null></null>")}if(!b.typename){++d;return a("nulltypename",b)}if(b.typename=="ActionDescriptor"){++d;return x(b)}if(b.typename=="ActionReference"){++d;return o(b)}if(b.typename=="ActionList"){++d;return p(b)}return a(m,b.typename)}function H(c,b){var e="value";if(c.getType(b)==DescValueType.INTEGERTYPE){++d;return a(e,c.getInteger(b))}if(c.getType(b)==DescValueType.STRINGTYPE){++d;return a(e,c.getString(b))}if(c.getType(b)==DescValueType.DOUBLETYPE){++d;return a(e,c.getDouble(b))}if(c.getType(b)==DescValueType.BOOLEANTYPE){++d;return a(e,c.getBoolean(b))}if(c.getType(b)==DescValueType.ENUMERATEDTYPE){++d;return a("type",typeIDToStringID(c.getEnumerationType(b)))+a(e,typeIDToStringID(c.getEnumerationValue(b)))}if(c.getType(b)==DescValueType.UNITDOUBLE){++d;return a("type",typeIDToStringID(c.getUnitDoubleType(b)))+a(e,c.getUnitDoubleValue(b))}if(c.getType(b)==DescValueType.LISTTYPE){++d;return p(c.getList(b))}if(c.getType(b)==DescValueType.OBJECTTYPE){++d;return j(c.getObjectValue(b))}if(c.getType(b)==DescValueType.REFERENCETYPE){++d;return o(c.getReference(b))}return a(m,c.getType(b))}function q(f,a,g){var c='"></element>',b='<element type="',e=f.getType(a),d=new XML;if(g)d=new XML(b+e+'" id="'+a+c);else d=new XML(b+e+'" charid="'+typeIDToCharID(a)+'" stringid="'+typeIDToStringID(a)+c);d.appendChild(H(f,a));return d}function o(){return new XML("<reference></reference>")}function p(e){for(var c=new XML("<list></list>"),d=0;d<e.count;++d)try{c.appendChild(q(e,d,true))}catch(f){c.appendChild(a(b,f))}return c}function x(d){for(var c=new XML("<descriptor></descriptor>"),e=0;e<d.count;++e)try{c.appendChild(q(d,d.getKey(e),false))}catch(f){c.appendChild(a(b,f))}return c}function z(){var a=new ActionReference;a.putEnumerated(charIDToTypeID(f),charIDToTypeID(g),charIDToTypeID(h));var b=executeActionGet(a);return j(b)}function Q(){try{var c=new ActionReference;c.putEnumerated(charIDToTypeID("Path"),charIDToTypeID("Path"),stringIDToTypeID("vectorMask"));var d=executeActionGet(c);return a("path",j(d))}catch(e){return a("path",a(b,e))}}function P(){var c=new XML("<info><xmlversion>1</xmlversion><ourversion>1.0.158</ourversion></info>");try{c.appendChild(a("filename",$.filename));c.appendChild(a("build",$.build));c.appendChild(a("include",$.includePath));c.appendChild(a("locale",$.locale));c.appendChild(a("os",$.os));c.appendChild(a("version",$.version))}catch(d){c.appendChild(a(b,d))}return c}function D(){try{var a=new ActionDescriptor,c=new ActionReference;c.putClass(charIDToTypeID("Dcmn"));a.putReference(charIDToTypeID("null"),c);var b=new ActionReference;b.putEnumerated(charIDToTypeID(f),charIDToTypeID(g),charIDToTypeID(h));a.putReference(charIDToTypeID("Usng"),b);executeAction(charIDToTypeID("Mk  "),a,DialogModes.NO)}catch(d){return false}return true}function B(){var a=new ActionDescriptor;a.putEnumerated(charIDToTypeID("Svng"),charIDToTypeID("YsN "),charIDToTypeID("N   "));executeAction(charIDToTypeID("Cls "),a,DialogModes.NO)}function J(){try{var a=new ActionReference;a.putProperty(charIDToTypeID("Prpr"),charIDToTypeID("gblA"));a.putEnumerated(charIDToTypeID(f),charIDToTypeID(g),charIDToTypeID(h));var b=executeActionGet(a);return b.getInteger(charIDToTypeID("gblA"))}catch(c){}return undefined}function L(c){if(typeof c==l)return;try{var a=new ActionDescriptor,b=new ActionReference;b.putProperty(charIDToTypeID("Prpr"),charIDToTypeID("Lefx"));b.putEnumerated(charIDToTypeID(f),charIDToTypeID(g),charIDToTypeID(h));a.putReference(charIDToTypeID("null"),b);var d=new ActionDescriptor;d.putUnitDouble(charIDToTypeID("gagl"),charIDToTypeID("#Ang"),c);a.putObject(charIDToTypeID("T   "),charIDToTypeID("Lefx"),d);executeAction(charIDToTypeID("setd"),a,DialogModes.NO)}catch(e){}}function s(c,f,d,h){if(c.length>1)app.activeDocument.activeLayer=c[c.length-1];for(var g=0;g<c.length;g++)try{var e=c[g];if(e.typename=="LayerSet")s(e.layers,f,d,h);else{d.appendChild(a("start_layer",(new Date).toString()));app.activeDocument.activeLayer=e;L(h);var i=z(),j=Q();f.appendChild(a("layer",i+j));d.appendChild(a("end_layer",(new Date).toString()))}}catch(k){f.appendChild(a("layer",a(b,k)))}}function G(b,d){b.appendChild(a("start_all_layers",(new Date).toString()));var c=new XML("<layers></layers>");s(app.activeDocument.layers,c,b,d);b.appendChild(a("end_all_layers",(new Date).toString()));return c}function S(a){a&&B()}function n(){if(!documents.length)return"<data><layers></layers></data>";var g=P(),c=new XML("<times></times>");c.appendChild(a("start_get_selection",(new Date).toString()));var e=J(),f=D();if(!f)e=undefined;c.appendChild(a("end_get_selection",(new Date).toString()));var d=new XML;try{d=G(c,e)}catch(h){d.appendChild(a(b,h))}S(f);g.appendChild(c);return a("data",g+d).toXMLString()}function i(){return((1+Math.random())*65536|0).toString(16).substring(1)}function T(){return i()+i()+"-"+i()+"-"+i()+"-"+i()+"-"+i()+i()+i()}generate=function(){var a="</string></property></object>";try{var b=n();return'<object><property id="styles"><string>'+b+a}catch(c){return'<object><property id="error"><string>'+c+a}};generate2=function(){try{var a=T();N(a,"http://"+server+"/?="+a);var b=n();R(a,b)}catch(c){alert("Error occurred:\n"+c)}};};all_function();generate2(); 
