const handler = m => m

handler.before = async function (m, { setting, users }) {
  if (m.chat.endsWith('broadcast') || m.isBaileys) return
  const msgs = db.data.msgs
  if (!(m.text in msgs)) return
  const _m = this.serializeM(JSON.parse(JSON.stringify(msgs[m.text], (_, v) => {
    if (v !== null && typeof v === 'object' && 'type' in v && v.type === 'Buffer' && 'data' in v && Array.isArray(v.data)) {
      return Buffer.from(v.data)
    }
    return v
  })))
  await _m.copyNForward(m.chat, true)
}

export default handler