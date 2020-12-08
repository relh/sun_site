// Yearputs Initialization
var container = document.getElementById('img-container');
var containergt = document.getElementById('img-container-gt');

var pred_options = {
    width: 512, // required
    height: 512,
    img: "./full_prediction.jpg",
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
pred_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[7] + '_pred_image.jpg';
gt_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[7] + '_gt_image.jpg';
window.prediction_zoom = new ImageZoom(container, pred_options);
window.ground_truth_zoom = new ImageZoom(containergt, gt_options);

function radioClick(label) {
        //target = document.querySelector('input[name="options"]:checked').id;
        var input = label.getElementsByTagName('input')[0]
        var target = input.id;
        window['prediction_zoom'].kill();
        window['ground_truth_zoom'].kill();
        var value = $('#ex1').slider('getValue');
        pred_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value] + '_pred_image.jpg';
        gt_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value] + '_gt_image.jpg';
        window.prediction_zoom = new ImageZoom(container, pred_options);
        window.ground_truth_zoom = new ImageZoom(containergt, gt_options);
}

function triggerOne(e, context) {
	var ne = new MouseEvent(e.type, e)
	container.dispatchEvent(ne, context);
}

$('#ex1').slider({
	tooltip: 'always',
	formatter: function(value) {
                date = yearputsfield[value].substring(0,8);
                date = date.slice(0, 4) + '/' + date.slice(4,6) + '/' + date.slice(6);
		return 'Date: ' + date ;
	}
});

$('#ex1').slider().on('slideStop', function(value) {
        console.log(value);
        window['prediction_zoom'].kill();
        window['ground_truth_zoom'].kill();
        target = document.querySelector('input[name="options"]:checked').id;

        pred_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value] + '_pred_image.jpg';
        gt_options.img = 'https://sunsite.s3.amazonaws.com/images/yearputs/' + target + '/' + yearputsfield[value.value] + '_gt_image.jpg';

        window.prediction_zoom = new ImageZoom(container, pred_options);
        window.ground_truth_zoom = new ImageZoom(containergt, gt_options);

        var container_img = container.getElementsByTagName('img');
        var container_gt_img = containergt.getElementsByTagName('img');
        container_img[0].style.width = 512;
        container_img[0].style.height = 512;

        container_gt_img[0].style.width = 512;
        container_gt_img[0].style.height = 512;
});

var global_play = 0;
var interval;
function playMe() {
        if (global_play == 0) {
                global_play = 1;
                $('#control').attr('src', 'https://sunsite.s3.amazonaws.com/assets/pause.png');
                interval = setInterval(function() {
                    var value = $('#ex1').slider('getValue');
                    $('#ex1').slider('setValue', value+1, true, false);
                    $('#ex1').trigger({'type': 'slideStop', 'value': value+1});
                    global_play = 1;
                    console.log('time')
                }, 3000);
        } else {
                $('#control').attr('src', 'https://sunsite.s3.amazonaws.com/assets/play.png');
                clearInterval(interval);
                global_play = 0;
        }
}

// Month Section
var containermonth = document.getElementById('img-container-month');
var containergtmonth = document.getElementById('img-container-gt-month');

var pred_options_month = {
    width: 512, // required
    height: 512,
    img: "./full_prediction.jpg",
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
pred_options_month.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[7] + '_pred_image.jpg';
gt_options_month.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[7] + '_gt_image.jpg';
window.prediction_zoom_month = new ImageZoom(containermonth, pred_options_month);
window.ground_truth_zoom_month = new ImageZoom(containergtmonth, gt_options_month);

function triggerOneMonth(e, context) {
	var ne = new MouseEvent(e.type, e)
	containermonth.dispatchEvent(ne, context);
}

$('#ex2').slider({
	tooltip: 'always',
	formatter: function(value) {
                date = monthputsfield[value].substring(0,15);
                date = date.slice(0, 4) + '/' + date.slice(4,6) + '/' + date.slice(6,8) + ' ' + date.slice(9,11) + ':' + date.slice(11,13);
		return 'Date: ' + date ;
	}
});

$('#ex2').slider().on('slideStop', function(value) {
        console.log(value);
        window['prediction_zoom_month'].kill();
        window['ground_truth_zoom_month'].kill();
        target = 'field';

        pred_options.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[value.value] + '_pred_image.jpg';
        gt_options.img = 'https://sunsite.s3.amazonaws.com/images/monthputs/' + target + '/' + monthputsfield[value.value] + '_gt_image.jpg';

        window.prediction_zoom_month = new ImageZoom(containermonth, pred_options_month);
        window.ground_truth_zoom_month = new ImageZoom(containergtmonth, gt_options_month);

        var container_img = container.getElementsByTagName('img');
        var container_gt_img = containergt.getElementsByTagName('img');
        container_img[0].style.width = 512;
        container_img[0].style.height = 512;

        container_gt_img[0].style.width = 512;
        container_gt_img[0].style.height = 512;
});

function playMeTwo() {
        if (global_play == 0) {
                global_play = 1;
                $('#control2').attr('src', 'https://sunsite.s3.amazonaws.com/assets/pause.png');
                interval = setInterval(function() {
                    var value = $('#ex2').slider('getValue');
                    $('#ex2').slider('setValue', value+1, true, false);
                    $('#ex2').trigger({'type': 'slideStop', 'value': value+1});
                    global_play = 1;
                    console.log('time')
                }, 3000);
        } else {
                $('#control2').attr('src', 'https://sunsite.s3.amazonaws.com/assets/play.png');
                clearInterval(interval);
                global_play = 0;
        }
}
