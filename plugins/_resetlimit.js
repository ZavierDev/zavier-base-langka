import cron from 'node-cron'

let messageSent = false

cron.schedule(
  '00 00 * * *',
  async () => {
    let users = global.db.data.users
    let resetUsers = Object.entries(users).filter(
      ([user, data]) => data.limit < 10000000
    )

    if (resetUsers.length > 0 && !messageSent) {
      resetUsers.forEach(([user, data]) => {
        data.limit = 20
      })

      const q = {
        key: {
          remoteJid: 'status@broadcast',
          participant: '0@s.whatsapp.net',
          fromMe: false,
          id: '',
        },
        message: { conversation: '📣 *[ BOT NOTIFIKASI ]*' },
      }

      let capt = `*Limit user telah direset ke default..*`

      conn.reply('6282322962313@s.whatsapp.net', capt, q)
      messageSent = true
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Jakarta',
  }
)