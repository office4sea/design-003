  // 자동로그인 
  var la = $('#loginAuto');
	var inputCk = $('input[type="checkbox"]');

	la.on('click', function(e){
		var laAttr = la.is(':checked');

		if(laAttr){
			inputCk.addClass('check');
			inputCk.attr({'checked': true});
		}else{
			inputCk.removeClass('check');
			inputCk.attr({'checked': false});
		}	
	});

  // 로그인
  $("#login").click(function(){
		window.location.href  = "./page/main.html";
	});