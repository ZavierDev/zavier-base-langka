let handler = async (m, { text, conn, args, command, isGroup }) => {
  if (m.chat.endsWith('@g.us')) {
    await conn.groupLeave(m.chat)
  } else {
    const chats = await conn.groupFetchAllParticipating()
    const groups = Object.entries(chats)
      .map(([id, data]) => ({ id, name: data.subject }))
      .filter(g => g.id.endsWith('@g.us'))

    if (!text) {
      if (!groups.length) return m.reply('Bot tidak tergabung di grup manapun.')

      let list = groups.map((g, i) => `${i + 1}. ${g.name}`).join('\n')
      list += `\n\nKetik .out <nomor> untuk keluar dari grup tersebut.`
      return m.reply('*# DAFTAR GROUP*\n\n' + list)
    }

    const index = parseInt(text) - 1
    if (isNaN(index) || index < 0 || index >= groups.length) {
      return m.reply('Nomor tidak valid.')
    }

    const groupId = groups[index].id
    await conn.groupLeave(groupId)
    await m.reply(`Berhasil keluar dari grup *${groups[index].name}*`)
  }
}

handler.help = ['leavegc', 'out']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i
handler.owner = true

export default handler