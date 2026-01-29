import moment from 'moment-timezone'

let handler = async (m, { conn, args }) => {
    const groups = Object.values(await conn.groupFetchAllParticipating())
    const now = Date.now()

    if (!args.length) {
        let txt = `📋 *PILIH GRUP UNTUK DISEWA*\n`
        txt += `Format: *.setsewa <nomor> <hari>*\n\n`

        groups.forEach((g, i) => {
            const chat = db.data.chats[g.id] || {}
            const expired = chat.expired
                ? msToDate(chat.expired - now)
                : 'Belum Disewa'

            txt += `*${i + 1}. ${g.subject || 'Unknown Group'}*\n`
            txt += `   ⏳ Masa Sewa: ${expired}\n\n`
        })

        return m.reply(txt.trim())
    }

    const nomor = Number(args[0])
    const hari = Number(args[1])

    if (!nomor || !hari || hari <= 0)
        return m.reply('Format:\n.setsewa <nomor grup> <hari>')

    if (nomor < 1 || nomor > groups.length)
        return m.reply('Nomor grup tidak valid')

    const group = groups[nomor - 1]
    const chat = db.data.chats[group.id] || {}

    const durasi = hari * 86400000
    const expired = chat.expired && chat.expired > now
        ? chat.expired + durasi
        : now + durasi

    db.data.chats[group.id] = { ...chat, expired }

    m.reply(
`✅ *SEWA GRUP BERHASIL*
━━━━━━━━━━━━━━
🏷️ *Nama Grup:* ${group.subject}
📅 *Durasi:* ${hari} Hari
⏳ *Sisa Sewa:* ${msToDate(expired - now)}
📆 *Berlaku Sampai:* ${moment(expired).tz('Asia/Jakarta').format('DD MMM YYYY HH:mm')}
━━━━━━━━━━━━━━`
    )
}

handler.help = ['setsewa']
handler.tags = ['owner']
handler.command = /^setsewa$/i
handler.owner = true

export default handler

const msToDate = ms => {
    if (ms <= 0) return 'Expired'
    const d = Math.floor(ms / 86400000)
    const h = Math.floor(ms % 86400000 / 3600000)
    const m = Math.floor(ms % 3600000 / 60000)
    return `${d} Hari ${h} Jam ${m} Menit`
}