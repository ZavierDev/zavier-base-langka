const EXCEPT = ['6281265868433']

function normalizeNumber(text) {
    if (!text) return null
    let number = text.replace(/\s+/g, '').replace(/[^0-9]/g, '')
    if (number.startsWith('0')) number = '62' + number.slice(1)
    return number + '@s.whatsapp.net'
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who
    if (m.mentionedJid[0]) who = m.mentionedJid[0]
    else if (m.quoted) who = m.quoted.sender
    else if (text) who = normalizeNumber(text)

    if (!who) return m.reply(`Tag / reply / isi nomor\n\nContoh:\n${usedPrefix + command} 628xxxx`)

    let numberOnly = who.split('@')[0]
    if (EXCEPT.includes(numberOnly)) return m.reply('❌ User ini tidak bisa di blacklist')

    global.db.data.chats[m.chat] ??= {}
    global.db.data.chats[m.chat].member ??= {}
    global.db.data.chats[m.chat].member[who] ??= { blacklist: false }
    global.db.data.users[who] ??= {}

    if (command === 'blacklist') {
        global.db.data.chats[m.chat].member[who].blacklist = true
        global.db.data.users[who].banned = true
        m.reply('✅ User berhasil di blacklist')
    }
    
    if (command === 'unblacklist') {
        global.db.data.chats[m.chat].member[who].blacklist = false
        global.db.data.users[who].banned = false
        m.reply('✅ User berhasil di unblacklist')
    }
}

handler.before = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (!chat?.member) return
    let user = chat.member[m.sender]
    if (user?.blacklist) await conn.sendMessage(m.chat, { delete: m.key }).catch(console.error)
}

handler.command = /^(blacklist|unblacklist)$/i
handler.owner = true
handler.group = true

export default handler
