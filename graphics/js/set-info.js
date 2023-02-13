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

function doPorts(player, port){
	var classnames = ['port-1', 'port-2', 'port-3', 'port-4'];
	classnames.forEach((name) => {
		name.includes(port) ? $(`.${player}.${name}`).addClass('filled') : $(`.${player}.${name}`).removeClass('filled')
	})
}

$(() => {
	loadSmashControl();

	function loadSmashControl(){
		const bundle = 'nodecg-smashcontrol';
		var bracketlocation = $('.bracket-location');
		var player1char = $('.player1-char');
		var player1name = $('.player1-tag');
		// var player1pronouns = $('.player1-pronouns');
		var p1score = $('.player1-score');
		var player2char = $('.player2-char');
		var player2name = $('.player2-tag');
		// var player2pronouns = $('.player2-pronouns');
		var p2score = $('.player2-score');


		var player1score = nodecg.Replicant("player1Score", bundle);
		var player2score = nodecg.Replicant("player2Score", bundle);

		var setInfo = nodecg.Replicant("playerDataArray", bundle);
		setInfo.on('change', (newVal, oldVal) => {
			if (newVal)
				doPorts('p1', newVal.player1port);
				doPorts('p2', newVal.player2port);
				updateFields(newVal);
		});
		player1score.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});
		player2score.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});
		function updateFields(setData){	
			bracketlocation.text(setData.bracketlocation);
			player1name.text(setData.player1tag);
			// player1pronouns.text(setData.player1pronouns);
			player2name.text(setData.player2tag);
			// player2pronouns.text(setData.player2pronouns);
			NodeCG.waitForReplicants(player1score, player2score).then(() => {
				p1score.text(player1score.value);
				p2score.text(player2score.value);
			});
			var linkToImage = "../../nodecg-smashcontrol/dashboard/images/" + setData.game + "/";
            player1char.children().attr("src", (linkToImage + setData.player1character.split("[REMIX] ").at(-1) + ".png"));
            player2char.children().attr("src", (linkToImage + setData.player2character.split("[REMIX] ").at(-1) + ".png"));
			toFix = ['.player1-tag', '.player2-tag']
			toFix.map(FixSize)
		}
	}
})
