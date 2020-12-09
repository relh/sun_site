$('#ex1').slider({
	tooltip: 'always',
	formatter: function(value) {
                date = yearputsfield[value].substring(0,8);
                date = date.slice(0, 4) + '/' + date.slice(4,6) + '/' + date.slice(6);
		return 'Date: ' + date ;
	}
});

$('#ex2').slider({
	tooltip: 'always',
	formatter: function(value) {
                date = monthputsfield[value].substring(0,15);
                date = date.slice(0, 4) + '/' + date.slice(4,6) + '/' + date.slice(6,8) + ' ' + date.slice(9,11) + ':' + date.slice(11,13);
		return 'Date: ' + date ;
	}
});

$('#ex3').slider({
	tooltip: 'always',
	formatter: function(value) {
                date = yearputsfield[value].substring(0,8);
                date = date.slice(0, 4) + '/' + date.slice(4,6) + '/' + date.slice(6);
		return 'Date: ' + date ;
	}
});

// Yearputs Initialization
var container = document.getElementById('img-container');
var containergt = document.getElementById('img-container-gt');

var pred_options = {
    width: 512, // required
    height: 512,
    img: "./full_prediction_thumb.jpg",
    // more options here
    //zoomWidth: 512,
    //scale: 1,
    offset: {
      vertical: 0,
      horizontal: 10
    },
    zoomPosition: 'right'
};
var gt_options = {
    width: 512, // required
    height: 512,
    // more options here
    img: "./inclination_pred.png",
    //zoomWidth: 512,
    //scale: 1,
    offset: {
      vertical: 0,
      horizontal: 10
    },
    zoomPosition: 'left'
};
target = document.querySelector('input[name="options"]:checked').id;
pred_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[7] + '_pred_image_thumb.jpg';
gt_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[7] + '_gt_image_thumb.jpg';
window.prediction_zoom = new ImageZoom(container, pred_options);
window.ground_truth_zoom = new ImageZoom(containergt, gt_options);
target = document.querySelector('input[name="options"]:checked').id;
preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[8] + '_pred_image_thumb.jpg');
preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[8] + '_gt_image_thumb.jpg');

function preloadImage(url)
{
    var img = new Image();
    img.src = url;
}

function radioClick(label, play) {
        //target = document.querySelector('input[name="options"]:checked').id;
        var input = label.getElementsByTagName('input')[0]
        var target = input.id;
	if (play == false) {
                var value = $('#ex1').slider('getValue');
		window['prediction_zoom'].kill();
		window['ground_truth_zoom'].kill();
		pred_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value] + '_pred_image_thumb.jpg';
		gt_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value] + '_gt_image_thumb.jpg';
		window.prediction_zoom = new ImageZoom(container, pred_options);
		window.ground_truth_zoom = new ImageZoom(containergt, gt_options);
	} else{
                var value = $('#ex3').slider('getValue');
                $('#playimage').attr('src', 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value] + '_pred_image_thumb.jpg');
                $('#playimagegt').attr('src', 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value] + '_gt_image_thumb.jpg');
        }

        var min = 0;
        var max = '5,000 Mx/cm^2';
        if (target == 'field') {
                min = '&emsp;&emsp;&ensp;0 Mx/cm^2'
        } else if (target == 'inclination' || target == 'azimuth') {
                min = '&emsp;&emsp;0 °';
                max = '180 °';
        } else if (target == 'vlos_mag'){
                min = '&ensp;-700,000 cm/s';
                max = '700,000 cm/s';
        } else if (target == 'eta_0') {
                min = '&emsp;&nbsp;0'
                max = '50';
        } else if (target == 'dop_width') {
                min = '&ensp;0 mÅ'
                max = '60 Å';
        } else if (target == 'src_continuum') {
                min = '&emsp;&emsp;&emsp;0 DN/s'
                max = '29,060 DN/s'; //.61;
        } else if (target == 'src_grad') {
                min = '&emsp;&emsp;&emsp;0 DN/s'
                max = '52,695 DN/s'; //.32;
        }

        if (play == false) {
                $('#cb1').attr('src', 'https://sunsite.s3.amazonaws.com/assets/' + target + '_colorbar.png');
                document.getElementById('min').innerHTML = min + '&nbsp;&nbsp;';
                document.getElementById('max').innerHTML = '&nbsp;&nbsp;' + max;
        } else {
                $('#cb3').attr('src', 'https://sunsite.s3.amazonaws.com/assets/' + target + '_colorbar.png');
                document.getElementById('min3').innerHTML = min + '&nbsp;&nbsp;';
                document.getElementById('max3').innerHTML = '&nbsp;&nbsp;' + max;
        }
}

function triggerOne(e, context) {
	var ne = new MouseEvent(e.type, e)
	container.dispatchEvent(ne, context);
}

$('#ex1').slider().on('slideStop', function(value) {
        console.log(value);
        window['prediction_zoom'].kill();
        window['ground_truth_zoom'].kill();
        target = document.querySelector('input[name="options"]:checked').id;

        pred_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value] + '_pred_image_thumb.jpg';
        gt_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value] + '_gt_image_thumb.jpg';

        window.prediction_zoom = new ImageZoom(container, pred_options);
        window.ground_truth_zoom = new ImageZoom(containergt, gt_options);

        var container_img = container.getElementsByTagName('img');
        var container_gt_img = containergt.getElementsByTagName('img');
        container_img[0].style.width = 512;
        container_img[0].style.height = 512;

        container_gt_img[0].style.width = 512;
        container_gt_img[0].style.height = 512;

        preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value+1] + '_pred_image_thumb.jpg');
        preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value+1] + '_gt_image_thumb.jpg');
});

// Play Section
var containerplay = document.getElementById('img-container-play');
var containergtplay = document.getElementById('img-container-gt-play');

target = document.querySelector('input[name="options"]:checked').id;
preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[9] + '_pred_image_thumb.jpg');
preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[9] + '_gt_image_thumb.jpg');

var global_play = 0;
var interval;
function playMe() {
        if (global_play == 0) {
                global_play = 1;
                $('#control').attr('src', 'https://sunsite.s3.amazonaws.com/assets/pause.png');
                interval = setInterval(function() {
                    var value = $('#ex3').slider('getValue');
                    $('#ex3').slider('setValue', value+1, true, false);
                    $('#ex3').trigger({'type': 'slideStop', 'value': value+1});
                    global_play = 1;
                    console.log('time')
                }, 2000);
        } else {
                $('#control').attr('src', 'https://sunsite.s3.amazonaws.com/assets/play.png');
                clearInterval(interval);
                global_play = 0;
        }
}

$('#ex3').slider().on('slideStop', function(value) {
        console.log(value);
        target = document.querySelector('input[name="optionsPlay"]:checked').id;

        $('#playimage').attr('src', 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value] + '_pred_image_thumb.jpg');
        $('#playimagegt').attr('src', 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value] + '_gt_image_thumb.jpg');

        preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value+1] + '_pred_image_thumb.jpg');
        preloadImage('https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value+1] + '_gt_image_thumb.jpg');
});

// Month Section
var containermonth = document.getElementById('img-container-month');
var containergtmonth = document.getElementById('img-container-gt-month');

var pred_options_month = {
    width: 512, // required
    height: 512,
    img: "./full_prediction_thumb.jpg",
    // more options here
    //zoomWidth: 512,
    //scale: 1,
    offset: {
      vertical: 0,
      horizontal: 10
    },
    zoomPosition: 'right'
};
var gt_options_month = {
    width: 512, // required
    height: 512,
    // more options here
    img: "./inclination_pred.png",
    //zoomWidth: 512,
    //scale: 1,
    offset: {
      vertical: 0,
      horizontal: 10
    },
    zoomPosition: 'left'
};

month_target = 'field';
pred_options_month.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[7] + '_pred_image_thumb.jpg';
gt_options_month.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[7] + '_gt_image_thumb.jpg';
window.prediction_zoom_month = new ImageZoom(containermonth, pred_options_month);
window.ground_truth_zoom_month = new ImageZoom(containergtmonth, gt_options_month);

function triggerOneMonth(e, context) {
	var ne = new MouseEvent(e.type, e)
	containermonth.dispatchEvent(ne, context);
}

$('#ex2').slider().on('slideStop', function(value) {
	var value = $('#ex2').slider('getValue');
	console.log(value)
        window['prediction_zoom_month'].kill();
        window['ground_truth_zoom_month'].kill();
        target = 'field';

        pred_options_month.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[value+12] + '_pred_image_thumb.jpg';
        gt_options_month.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[value+12] + '_gt_image_thumb.jpg';

        window.prediction_zoom_month = new ImageZoom(containermonth, pred_options_month);
        window.ground_truth_zoom_month = new ImageZoom(containergtmonth, gt_options_month);

        var container_img = containermonth.getElementsByTagName('img');
        var container_gt_img = containergtmonth.getElementsByTagName('img');
        container_img[0].style.width = 512;
        container_img[0].style.height = 512;

        container_gt_img[0].style.width = 512;
        container_gt_img[0].style.height = 512;

	var bluebar = document.getElementById('bluebar');
	console.log(bluebar);
	console.log(value);
	console.log(bluebar.style.left)
	new_left = 8.5 + value / 4;
	bluebar.style.left = new_left.toString() + '%';

        preloadImage('https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[value+24] + '_pred_image_thumb.jpg');
        preloadImage('https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[value+24] + '_gt_image_thumb.jpg');
});

function playMeTwo() {
        if (global_play == 0) {
                global_play = 1;
                $('#control2').attr('src', 'https://sunsite.s3.amazonaws.com/assets/pause.png');
                interval = setInterval(function() {
                    var value = $('#ex2').slider('getValue');
                    $('#ex2').slider('setValue', value+12, true, false);
                    $('#ex2').trigger({'type': 'slideStop', 'value': value+12});
                    global_play = 1;
                    console.log('time')
                }, 3000);
        } else {
                $('#control2').attr('src', 'https://sunsite.s3.amazonaws.com/assets/play.png');
                clearInterval(interval);
                global_play = 0;
        }
}

