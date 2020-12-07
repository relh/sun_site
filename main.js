$('#ex1').slider({
	tooltip: 'always',
	formatter: function(value) {
		return 'Date: ' + value;
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

function triggerOne(e, context) {
	var ne = new MouseEvent(e.type, e)
	container.dispatchEvent(ne, context);
}

function triggerTwo(e, context) {
	var ne = new MouseEvent(e.type, e)
	containergt.dispatchEvent(ne, context);
}

function make_zoom_one() {
        window.ground_truth_zoom = new ImageZoom(container, gt_options);
        var all_img = container.getElementsByTagName('img');
        all_img[0].className = "image1";
        all_img[0].id = "top-image";
        all_img[0].style = "width: 512px; height: 512px;";
        //all_img[1].style = "margin-left: -512px; width: 512px; height:512px;";

}

function make_zoom_two() {
        window.prediction_zoom = new ImageZoom(containergt, pred_options);
        var all_img = containergt.getElementsByTagName('img');
        all_img[0].className = "image2";
        all_img[0].style = "width: 512px; height: 512px;";
}
window.prediction_zoom = new ImageZoom(container, pred_options);
window.ground_truth_zoom = new ImageZoom(containergt, gt_options);
//make_zoom_one();
//make_zoom_two();

//window['prediction_zoom'].kill();
//window['ground_truth_zoom'].kill();
//make_zoom_one();
//make_zoom_two();

$('#ex1').slider().on('slideStop', function(value) {
        console.log(value);

        window['prediction_zoom'].kill();
        window['ground_truth_zoom'].kill();

        pred_options.img = './inclination_pred.png';
        gt_options.img = './inclination_pred.png';

        window.prediction_zoom = new ImageZoom(container, pred_options);
        window.ground_truth_zoom = new ImageZoom(containergt, gt_options);
        //make_zoom_one();
        //make_zoom_two();


        var container_img = container.getElementsByTagName('img');
        var container_gt_img = containergt.getElementsByTagName('img');
        container_img[0].style.width = 512;
        container_img[0].style.height = 512;

        container_gt_img[0].style.width = 512;
        container_gt_img[0].style.height = 512;
        //all_img[0].src = './inclination_pred.png';
        //all_img[1].src = './inclination_pred.png';
        //all_img[1].parentNode.removeChild(all_img[0]);
        //all_img[1].parentNode.removeChild(all_img[0]);

        //var all_div = container.getElementsByTagName('div');
        //var one_old_style = all_div[1].style
        //var three_old_style = all_div[3].style

        //all_div[1].style.backgroundImage = 'url("file:///home/relh/Code/sun_site/inclination_pred.png");'
        //all_div[3].style.backgroundImage = 'url("file:///home/relh/Code/sun_site/inclination_pred.png");'

        //console.log(all_img);
        //window.ground_truth_zoom = new ImageZoom(container, gt_options);
        //window.prediction_zoom = new ImageZoom(container, pred_options);

        //$('#top-image').attr("src", "./inclination_pred.png");
        //var all_img = container.getElementsByTagName('img');
        //all_img[0].id = "top-image";
        //all_img[0].style = "width: 512px; height: 512px;";
        //all_img[1].style = "margin-left: -512px; width: 512px; height:512px;";
        //all_img[0].className = "image1";
        //all_img[1].className = "image2";
});
