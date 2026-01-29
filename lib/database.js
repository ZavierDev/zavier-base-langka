export default function(m, conn) {
    try {
        const defaultUser = {
            name: m.name,
            exp: 0,
            money: 0,
            level: 1,
            limit: 20,
            age: -1,
            regTime: -1,
            afk: -1,
            afkReason: '',
            warn: 0,
            role: 'Newbie',
            pacar: '',
            premium: false,
            premiumTime: 0,
            registered: false,
            banned: false,
            autolevelup: false,
            lastclaim: 0,
            lastReminderGconly: 0,
        }

        const defaultChat = {
            sWelcome: '',
            sBye: '',
            sPromote: '',
            sDemote: '',
            antiLink: false,
            isBanned: false,
            welcome: true,
            detect: false,
            delete: false,
            lastReminderSewa: false,
            expired: 0
        }

        const defaultSettings = {
            public: true,
            autoread: true,
            anticall: true,
            gconly: true
        }

        if (m.sender.endsWith('@s.whatsapp.net')) {
            if (!global.db.data.users[m.sender])
                global.db.data.users[m.sender] = {
                    ...defaultUser
                }
            else
                Object.assign(defaultUser, global.db.data.users[m.sender]),
                global.db.data.users[m.sender] = defaultUser
        }

        if (m.isGroup) {
            if (!global.db.data.chats[m.chat])
                global.db.data.chats[m.chat] = {
                    ...defaultChat
                }
            else
                Object.assign(defaultChat, global.db.data.chats[m.chat]),
                global.db.data.chats[m.chat] = defaultChat
        }

        if (!global.db.data.settings[conn.user.jid])
            global.db.data.settings[conn.user.jid] = {
                ...defaultSettings
            }
        else
            Object.assign(defaultSettings, global.db.data.settings[conn.user.jid]),
            global.db.data.settings[conn.user.jid] = defaultSettings

    } catch (e) {
        console.error(e)
    }
}