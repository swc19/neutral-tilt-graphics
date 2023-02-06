var thumbFileName;

function FixSize(selector){

	setTimeout(function(){
		var divWidth = $(selector + ":visible").width();
		var fontSize = 92;

		// Reset font to default size to start.
		$(selector).css("font-size", "");

		var text_org = $(selector + ":visible").html();
		var text_update = '<span style="white-space:nowrap;">' + text_org + '</span>';
		$(selector + ":visible").html(text_update);


		var childWidth = $(selector + ":visible").children().width();

		// console.log(childWidth + " " + divWidth);

		while ($(selector + ":visible").children().width() > divWidth){
			// console.log($(selector + ":visible").children().width() + " " + divWidth);
			$(selector).css("font-size", fontSize -= 1);
		}
		// console.log(fontSize)
	}, 500);
}
function takeScreen(){
	html2canvas($('.thumbnail').get(0), {width:1920, height:1080}).then(function(canvas) {
		var link = document.createElement('a');
		if (typeof link.download === 'string'){
			link.href = canvas.toDataURL();
			link.download = thumbFileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(canvas.toDataURL());
		}
	});
}
$(() => {
	loadSmashControl();

	function loadSmashControl(){
		const bundle = 'nodecg-smashcontrol';
		var bracketlocation = $('.bracket-location');
		var player1name = $('.player1-tag');
		var player1char = $('.player1-render');
		var player2name = $('.player2-tag');
		var player2char = $('.player2-render');
		var setInfo = nodecg.Replicant("playerDataArray", bundle);
		setInfo.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});

		function updateFields(setData){
			thumbFileName = setData.player1tag + "_" + setData.player2tag + "_" + setData.bracketlocation + ".png";
			bracketlocation.text(setData.bracketlocation);
			player1name.text(setData.player1tag);
			player2name.text(setData.player2tag);
			var linkToRender = "../../nodecg-smashcontrol/dashboard/images/" + setData.game + "/renders/";
			var p1char = setData.player1character.split("[REMIX] ").at(-1);
			var p2char = setData.player2character.split("[REMIX] ").at(-1);
			console.log(p1char, p2char);
			player1char.children().attr("src", (linkToRender + p1char + ".png"));
            player2char.children().attr("src", (linkToRender + p2char + ".png"));
			FixSize('.player1-tag');
			FixSize('.player2-tag');
			FixSize('.bracket-location');
		}
	}
})