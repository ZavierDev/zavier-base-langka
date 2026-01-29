const handler = async (m, { text, usedPrefix, command }) => {
  if (!text.includes(' ')) throw `
Cara Penggunaan:
${usedPrefix + command} <kode> <jumlah> <expired> <hadiah>

Contoh:
${usedPrefix + command} reyzganteng 20 2 limit

Keterangan:
- <kode>     : kode yang bisa diklaim, contoh: reyzganteng
- <jumlah>   : maksimal orang yang bisa klaim, contoh: 20
- <expired>  : durasi aktif kode dalam jam, contoh: 2
- <hadiah>   : jenis hadiah: limit, money, exp, premium

Ketik ${usedPrefix}redeemcode <kode> untuk klaim
`

  let [code, max, expiredInHour, rewardType] = text.split(' ').map(v => v.trim())
  if (!code || isNaN(max) || isNaN(expiredInHour) || !rewardType) {
    throw `
Format salah!

Contoh:
${usedPrefix + command} reyzganteng 20 2 limit

Jenis hadiah yang tersedia:
- limit
- money
- exp
- premium
`
  }

  const now = Date.now()
  const expiredMs = parseInt(expiredInHour) * 60 * 60 * 1000
  const expiredAt = now + expiredMs

  const allowedTypes = ['limit', 'money', 'exp', 'premium']
  if (!allowedTypes.includes(rewardType)) throw `Hadiah hanya bisa: ${allowedTypes.join(', ')}`

  let reward = {}
  switch (rewardType) {
    case 'limit':
      reward.limit = Math.floor(Math.random() * (150 - 15 + 1)) + 15
      break
    case 'money':
      reward.money = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000
      break
    case 'exp':
      reward.exp = Math.floor(Math.random() * (50000 - 5000 + 1)) + 5000
      break
    case 'premium':
      const days = Math.floor(Math.random() * 30) + 1
      reward.premium = days * 86400000
      reward.premiumDays = days
      break
  }

  global.db.data.redeemCodes = global.db.data.redeemCodes || {}
  global.db.data.redeemCodes[code] = {
    code,
    max: parseInt(max),
    used: 0,
    createdAt: now,
    expiredAt,
    rewards: reward
  }

  m.reply(`Kode berhasil dibuat!

- Code: ${code}
- Max: ${max} orang
- Expired: ${expiredInHour} jam
- Hadiah: ${rewardType}

Cara Penggunaan:
Ketik ${usedPrefix}redeemcode ${code} di bot ${namebot}`)
}

handler.help = ['createcode']
handler.tags = ['owner']
handler.command = ['createcode']
handler.owner = true

export default handler