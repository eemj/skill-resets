const SHOW_SYSTEM_RESET_MESSAGE = false
const RESET_FONT_COLOR = '#FF4500' // https://www.google.com/search?q=colour+picker
const FLASHING_NOTIFICATION = false

module.exports = function SkillResets (dispatch) {
  let model = null

  dispatch.hook('S_LOGIN', 9, event => {
    ({ templateId: model } = event)
  })

  const showMessage = message => {
    dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
      message,
      unk1: FLASHING_NOTIFICATION ? 70 : 2,
      unk2: 0,
      unk3: 0
    })
  }

  dispatch.hook('S_CREST_MESSAGE', 1, ({ type, skillID }) => {
    if (type === 6) {
      showMessage(
        `<img src="img://skill__0__${model}__${
          skillID
        }" width="48" height="48" vspace="-20"/><font size="24" color="${
          RESET_FONT_COLOR
        }">&nbsp;Reset</font>`
      )
      if (!SHOW_SYSTEM_RESET_MESSAGE) return false
    }
  })
}
