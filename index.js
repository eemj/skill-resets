module.exports = function SkillResets(dispatch) {
	let model;

	dispatch.hook('S_LOGIN', 1, event => {
		model = event.model;
	})

	function showMessage(message) {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
			unk1: 2,
			unk2: 0,
			unk3: 0,
			message: message
		})
	}

	dispatch.hook('S_CREST_MESSAGE', 1, event => {
		if(event.type !== 6) return;
		showMessage(`<img src="img://skill__0__${model}__${event.skillID}" width="48" height="48" vspace="-20" /><font size="24" color="#39FF14">&nbsp;Reset</font>`);
	})
}
