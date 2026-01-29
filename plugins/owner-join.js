let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isOwner }) => {
  let [_, code] = text.match(linkRegex) || []
  if (!code) throw 'Link tidak valid!'

  let expiredStr = text.split(/\s+/).find(v => /^\d+$/.test(v))
  
  let res = await conn.groupAcceptInvite(code)
  let groupMeta = await conn.groupMetadata(res)
  let groupName = groupMeta.subject

  let expired = isNumber(expiredStr) ? parseInt(expiredStr) : (isOwner ? 0 : 3)
  expired = Math.max(1, Math.min(999, expired))

  let now = Date.now()
  let expiredTimestamp = now + (expired * 24 * 60 * 60 * 1000)

  let chats = global.db.data.chats[res]
  if (!chats) chats = global.db.data.chats[res] = {}
  chats.expired = expiredTimestamp

  m.reply(`✅ Sukses join grup *${groupName}* selama ${expired} hari`)
}

handler.help = ['join']
handler.tags = ['owner']
handler.command = /^join$/i
handler.rowner = true

export default handler

const isNumber = x => (x = parseInt(x), typeof x === 'number' && !isNaN(x))