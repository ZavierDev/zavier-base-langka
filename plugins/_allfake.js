import fs from 'fs'
import path from 'path'

let handler = m => m

handler.all = async function(m, { conn, __dirname }) {

  const thumbnail = fs.readFileSync(path.resolve(__dirname, '../media/thumbnail.jpg'))
  global.thumbnail = thumbnail

  global.pathResolve = (pth) => path.resolve(__dirname, pth)

  global.adReply = {
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.idch,
        serverMessageId: 103,
        newsletterName: 'Zavier Is Dev 😼',
      },
      externalAdReply: {
        title: '© Zavier Guru',
        body: 'Zavier Kece Bgt',
        description: 'anu',
        thumbnail
      }
    }
  }

  const mapFrom = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const mapTo = [
    'ᴀ','ʙ','ᴄ','ᴅ','ᴇ','ꜰ','ɢ','ʜ','ɪ','ᴊ','ᴋ','ʟ','ᴍ',
    'ɴ','ᴏ','ᴘ','q','ʀ','ꜱ','ᴛ','ᴜ','ᴠ','ᴡ','x','ʏ','ᴢ',
    '1','2','3','4','5','6','7','8','9','0'
  ]

  global.Styles = (text = '') =>
    text
      .toLowerCase()
      .split('')
      .map(c => {
        const i = mapFrom.indexOf(c)
        return i !== -1 ? mapTo[i] : c
      })
      .join('')
}

export default handler