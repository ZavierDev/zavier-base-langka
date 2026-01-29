import fs from 'fs'

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Tolong berikan nama file yang akan dihapus\n\nPenggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} menu`
  const path = `plugins/${text}.js`
  if (!fs.existsSync(path)) throw `File plugin ${text}.js tidak ditemukan`
  fs.unlinkSync(path)
  m.reply(`File plugin ${text}.js berhasil dihapus`)
}

handler.help = ['df'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(df)$/i
handler.rowner = true

export default handler