import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `where is the path?\n\nexample:\n${usedPrefix + command} main.js`
    try {
    if (!m.quoted.text) throw `reply code`
    let path = `${text}`
    await fs.writeFileSync(path, m.quoted.text)
    await conn.reply(m.chat, `Saved ${path} to file!`, m)
  } catch (error) {
    console.log(error)
    m.reply("🐱 Reply Code Lol_-")
  }
}

handler.help = ['sf2'].map(v => v + ' <path>')
handler.tags = ['owner']
handler.command = ['sf2']
handler.rowner = true

export default handler