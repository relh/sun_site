$('#ex1').slider({
	tooltip: 'always',
	formatter: function(value) {
		return 'Date: ' + value;
	}
});

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
