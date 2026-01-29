let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user, days

    if (m.mentionedJid && m.mentionedJid[0]) {
        user = m.mentionedJid[0]
        days = text.split(' ').find(num => !isNaN(num))
    } else if (m.quoted) {
        user = m.quoted.sender
        days = text.split(' ')[0]
    } else {
        throw `Tag user atau reply pesannya!\nContoh: ${usedPrefix + command} @user 30`
    }

    if (!days) throw 'Masukkan jumlah hari!\nContoh: .addprem @user 30'
    days = parseInt(days)

    let userData = global.db.data.users[user]
    if (!userData) throw 'User tidak ditemukan di database'

    let addTime = 86400000 * days
    let now = Date.now()

    if (userData.premiumTime) {
        userData.premiumTime += addTime
    } else {
        userData.premiumTime = now + addTime
    }
    userData.premium = true

    let remaining = userData.premiumTime - now
    let daysLeft = Math.floor(remaining / 86400000)
    let hoursLeft = Math.floor((remaining % 86400000) / 3600000)

    m.reply(`Premium berhasil ditambahkan
Nama: ${userData.name}
Durasi: ${days} hari
Sisa: ${daysLeft} hari ${hoursLeft} jam`)
    
    
    const pesannya = `*👋 Yeay, premium kamu kini telah aktif!*

*spesifikasi premium kamu*
- *durasi:* ${days} hari
- *hitung mundur:* ${daysLeft} hari ${hoursLeft} jam

jangan lupa ya di follow saluranya :3 
https://whatsapp.com/channel/0029VbC7SGt65yDCUxYwUS3U`
    
    conn.reply(user, pesannya, null, {
        contextInfo: {
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.idch,
      serverMessageId: 103,
      newsletterName: 'Akira Official Saluran',
    },
            externalAdReply: {
                title: '👑 Premium Actived!',
                body: 'terimakasih ya mbut udah join premium >3<',
                thumbnailUrl: 'https://files.catbox.moe/y7xgjr.jpg'
            }
        }
    })
}

handler.help = ['addprem']
handler.tags = ['owner']
handler.command = /^addprem$/i
handler.owner = true

export default handler