import fs from 'fs'

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `where is the path?\n\nexample:\n${usedPrefix + command} menu`
  try {
    if (!m.quoted.text) throw `reply code`
    const path = `plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    const name = m.sender
    const fkonn = { 
      key: { 
        fromMe: false, 
        participant: `0@s.whatsapp.net`, 
        ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) 
      }, 
      message: { 
        contactMessage: { 
          displayName: `${await conn.getName(name)}`, 
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
        }
      }
    }
    await conn.reply(m.chat, `Saved ${path} to file!`, fkonn)
  } catch (error) {
    console.log(error)
    m.reply("Reply codenya")
  }
}
handler.help = ['savefile', 'sf'].map(v => v + ' <path>')
handler.tags = ['owner']
handler.command = ['savefile', 'sf']
handler.rowner = true

export default handler