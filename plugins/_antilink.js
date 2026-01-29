const isLinkHttp = /chat\.whatsapp\.com|wa\.me/i

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true
    if (!m.isGroup) return false

    let chat = global.db.data.chats[m.chat]
    const isAntiLinkHttp = isLinkHttp.test(m.text || '')

    if (chat.antiLink && isAntiLinkHttp) {
        await conn.reply(
            m.chat,
            !isAdmin
                ? `*Tautan terdeteksi*

Kami tidak mengizinkan link dari grup lain
Maaf @${m.sender.split('@')[0]}
${!isBotAdmin ? '\n\nSaya bukan admin jadi tidak bisa menghapus pesan' : ''}`
                : 'lu admin lu aman 😹',
            null,
            { mentions: [m.sender] }
        )

        if (isBotAdmin && !isAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            return false
        }

        if (!isBotAdmin && !isAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key })
        }
    }

    return true
}