$('#ex1').slider({
	tooltip: 'always',
	formatter: function(value) {
		return 'Date: ' + value;
	}
});

/*
$("#ex4").slider({
	reversed: true,
	tooltip: 'always',
	tooltip_position:'left',
	formatter: function(value) {
		return 'Max Value: ' + value;
	}
});

$("#ex5").slider({
	reversed: true,
	tooltip: 'always',
	formatter: function(value) {
		return 'MAE: ' + value;
	}
});

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var image = new Image();
image.src = "./prediction.jpg";
image.onload = function() {
    ctx.drawImage(image, 256, 0);
};
*/
var optionstwo = {
    width: 512, // required
    //img: "./inclination_pred.png",
    // more options here
    zoomWidth: 512,
    offset: {
      vertical: 0,
      horizontal: 10
    },
    zoomPosition: 'right'
};

var options = {
    width: 512, // required
    // more options here
    img: "./inclination_pred.png",
    zoomWidth: 512,
    offset: {
      vertical: 0,
      horizontal: 10
    },
    zoomPosition: 'left'
};
new ImageZoom(document.getElementById("img-container"), options);
new ImageZoom(document.getElementById("img-container"), optionstwo);
