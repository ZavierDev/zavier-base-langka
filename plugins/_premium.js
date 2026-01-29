let notified = {}

let handler = m => m

handler.before = async function (m) {
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let now = Date.now()
    
    if (user.premiumTime > now) {
        delete notified[id]
    }
    
    if (user.premiumTime > 0 && now > user.premiumTime) {
        user.premiumTime = 0
        user.premium = false
        user.limit = 20
        
        if (!notified[id]) {
            this.sendMessage(id, { text: 'mohon maaf, tetapi masa keanggotaan Premium kamu telah habis. Namun, jangan khawatir! Anda masih dapat menikmati sebagian besar fitur kami, dan jika kamu ingin memperpanjang keanggotaan Premium kamu, jangan ragu untuk menghubungi kami. Terima kasih telah menjadi bagian dari komunitas kami!' }).catch(() => null)
            notified[id] = true
            
            setTimeout(() => delete notified[id], 86400000)
        }
    }
}

export default handler