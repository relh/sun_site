$('#ex1').slider({
	tooltip: 'always',
	formatter: function(value) {
                date = yearputsfield[value].substring(0,8);
                date = date.slice(0, 4) + '/' + date.slice(4,6) + '/' + date.slice(6);
		return 'Date: ' + date ;
	}
});

var currentImage = 1;
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

// Initialization
target = document.querySelector('input[name="options"]:checked').id;
pred_options.img = './images/yearputs/' + target + '/' + yearputsfield[7] + '_pred_image.jpg';
gt_options.img = './images/yearputs/' + target + '/' + yearputsfield[7] + '_gt_image.jpg';
window.prediction_zoom = new ImageZoom(container, pred_options);
window.ground_truth_zoom = new ImageZoom(containergt, gt_options);

function radioClick(label) {
        //target = document.querySelector('input[name="options"]:checked').id;
        var input = label.getElementsByTagName('input')[0]
        var target = input.id;
        window['prediction_zoom'].kill();
        window['ground_truth_zoom'].kill();
        var value = $('#ex1').slider('getValue');
        pred_options.img = './images/yearputs/' + target + '/' + yearputsfield[value] + '_pred_image.jpg';
        gt_options.img = './images/yearputs/' + target + '/' + yearputsfield[value] + '_gt_image.jpg';
        window.prediction_zoom = new ImageZoom(container, pred_options);
        window.ground_truth_zoom = new ImageZoom(containergt, gt_options);
}

function triggerOne(e, context) {
	var ne = new MouseEvent(e.type, e)
	container.dispatchEvent(ne, context);
}

function triggerTwo(e, context) {
	var ne = new MouseEvent(e.type, e)
	containergt.dispatchEvent(ne, context);
}

$('#ex1').slider().on('slideStop', function(value) {
        console.log(value);
        window['prediction_zoom'].kill();
        window['ground_truth_zoom'].kill();
        target = document.querySelector('input[name="options"]:checked').id;

        pred_options.img = './images/yearputs/' + target + '/' + yearputsfield[value.value] + '_pred_image.jpg';
        gt_options.img = './images/yearputs/' + target + '/' + yearputsfield[value.value] + '_gt_image.jpg';

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
                $('#control').attr('src', './assets/pause.png');
                interval = setInterval(function() {
                    var value = $('#ex1').slider('getValue');
                    $('#ex1').slider('setValue', value+1, true, false);
                    $('#ex1').trigger({'type': 'slideStop', 'value': value+1});
                    global_play = 1;
                    console.log('time')
                }, 3000);
        } else {
                $('#control').attr('src', './assets/play.png');
                clearInterval(interval);
                global_play = 0;
        }
}
