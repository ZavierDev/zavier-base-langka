import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime.startsWith('audio/')) throw '🎧 Reply audio untuk dijadikan audio menu!'
  m.react('🕑')
  const filePath = path.join(process.cwd(), 'media', 'menu.opus')
  const media = await q.download()
  fs.writeFileSync(filePath, media)
  m.reply('Audio menu sukes di ganti')
}

handler.help = ['setaudio']
handler.tags = ['owner']
handler.command = /^setaudio(menu)?$/i
handler.owner = true

export default handler