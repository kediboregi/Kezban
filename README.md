you trying to test on browser, dont use chrome.
or you use at webserver

<h2>Sample1</h2>
<div id="durum1"></div>
<div id="durum11"></div>
<form id="id1">
	<input type="text" name="text">
	<button type="submit" id="submitb1">Submit</button>
</form>
Ajaxalake("write your button element or if here null ajax working(#submitb1)","url","method (get,post)","datatype (html,json,script)","optional extraquery (id=4&isim=name)").addDataFromFormid("serialize form(write formid)").loading("#durum1","Loading<hr>",(optional. if here true, you see first working time loadingtext)).addResponseToDivid("#durum11").ajax();
