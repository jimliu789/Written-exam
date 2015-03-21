	var container = document.getElementById('container');
	var oImg = document.getElementById('imgwrap');
	var dot = document.getElementById('dotted').getElementsByTagName('span');
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	var index = 1;
	var animated = false;
	var timer;


	//亮起小圆点
	function showfocus()
	{
		for(var i = 0; i<dot.length; i++)
		{
			if(dot[i].className == 'focus')
			{
				dot[i].className='';
				break;
			}
		}
		dot[index - 1].className = 'focus';
	}

	//无限滚动
	function animate(offset)
	{
		animated = true;
		var newLeft = parseInt(oImg.style.left) + offset;
		var time = 300;            //动画总时间
		var interval = 10;			// 位移间隔时间
		var speed = offset/30;		//每次位移量

		function go()
		{
			if((speed < 0 && parseInt(oImg.style.left)>newLeft)||(speed > 0 && parseInt(oImg.style.left)<newLeft))
			{
				oImg.style.left = parseInt(oImg.style.left) + speed +'px';
				setTimeout(go,interval);
			}
			else
			{
				animated = false
				oImg.style.left = newLeft + 'px';
				if(newLeft > -800)
				{
					oImg.style.left = -3200 + 'px';
				}
				if(newLeft < -3200)
				{
					oImg.style.left = -800 + 'px';
				}
			}
		}
		go();
	}

	left.onclick = function()
	{
		if (index == 1) {
		    index = 4;
		}
		else {
		    index -= 1;
		}
		if(!animated)
		{
			animate(800);
		}
		showfocus();
	}	

	right.onclick = function()
	{
		if (index == 4) {
		    index = 1;
		}
		else {
		    index += 1;
		}
		if(!animated)
		{
			animate(-800);
		}
		showfocus();
		
	}

	//按钮点击切换
	for(var i = 0; i<dot.length; i++)
	{
		dot[i].onclick = function()
		{
			if(this.className == 'focus')
			{
				return;
			}
			else
			{
				var myIndex = parseInt(this.getAttribute('index'));
				var offset = -800 * (myIndex-index);
				index = myIndex;
				if(!animated)
				{
					animate(offset);
				}
				showfocus();
			}
		}
	}
	//自动播放
	function play()
	{
		timer = setInterval(function()
			{
				right.onclick();
			},3000)
	}
	function stop()
	{
		clearTimeout(timer);
	}
	container.onmouseover = stop;
	container.onmouseout = play;
	play();