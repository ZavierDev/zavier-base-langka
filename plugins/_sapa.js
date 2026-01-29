const handler = (m) => m

handler.before = async function (m, { conn, participants, isPrems }) {
  let name = m.sender
  let user = db.data.users[name]
  
  if (!conn.reyz_join) {
    conn.reyz_join = {
      join: false,
      time: 0
    }
  }

  const currentTime = Math.floor(Date.now() / 1000)
  if (!m.isGroup || conn.reyz_join.time > currentTime) {
    return
  }

  const isOwners = global.db?.data?.users[m.chat]?.owners
  let messageText = ""
  let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid)

  switch (m.sender) {
    case `62881026602593@s.whatsapp.net`:
      messageText = 'alo rei >.<'
      break
      break
    case `6285189774327s.whatsapp.net`:
      messageText = 'hadiah gw mana woi😹'
      break
    case `6285863223619@s.whatsapp.net`:
      messageText = 'Hai owner yang baik hati dan dermawan anti kikir'
      break
    default:
      if (isPrems) {
        messageText = `Halo user premium ( ${user.name} ) >.<`
      }
      break
  }

  if (messageText) {
    await conn.sendMessage(
      m.chat,
      {
        text: messageText
      },
      {
        quoted: m,
        mentions: mentionedUsers
      }
    )

    conn.reyz_join = {
      join: true,
      time: currentTime + 600
    }
  }
}

export default handler
