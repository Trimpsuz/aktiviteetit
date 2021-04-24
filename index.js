const DiscordJS = require('discord.js')
require('dotenv').config()

const guildId = ''
const client = new DiscordJS.Client()


const getApp = (guildId) => {
    const app = client.api.applications(client.user.id)
    if (guildId) {
        app.guilds(guildId)
    }
    return app
}

client.on('ready', async () => {

    console.log(`Logged in as ${client.user.tag}!`)

    client.user.setActivity('Trimpsuz | testausserveri.fi', { type: 'PLAYING' })

    const commands = await getApp(guildId).commands.get()

    /*client.api.applications(client.user.id).commands.post({
        data: {
            name: 'ping',
            description: 'Ping Pong',
        },
    })

    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'youtube',
            description: 'Aloita YouTube-katselusessio äänikanavalla!',
            options: [
                {
                name: "channel",
                type: 7,
                description: "Äänikanava",
                required: true,
                },
            ],
    }})

    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'fishing',
            description: 'Pelaa Fishington.io:ta äänikanavalla!',
            options: [
                {
                name: "channel",
                type: 7,
                description: "Äänikanava",
                required: true,
                },
            ],
    }})

    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'betrayal',
            description: 'Pelaa Betrayal.io:ta äänikanavalla!',
            options: [
                {
                name: "channel",
                type: 7,
                description: "Äänikanava",
                required: true,
                },
            ],
    }})

    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'poker',
            description: 'Pelaa Poker Night:ia äänikanavalla!',
            options: [
                {
                name: "channel",
                type: 7,
                description: "Äänikanava",
                required: true,
                },
            ],
    }})*/

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const command = interaction.data.name.toLowerCase()
        const channelId = interaction.data.options[0].value
        const channel = await client.channels.fetch(channelId)

        if (command === 'youtube') {
            // check that channel is a voice channel
            if (!channel || channel.type != "voice") {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `Kanava jonka valitsit ei ole äänikanava. Valitse äänikanava`
                    }
                }})
            }

            // create invite
            client.api
            .channels(channel.id)
            .invites.post({
                data: {
                    "max_age": 604800,
                    "max_uses": 0,
                    "target_application_id": "755600276941176913",
                    "target_type": 2,
                    "temporary": false,
                }
            })
            .then(invite => new DiscordJS.Invite(client, invite))
            .then((invite) => {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `[Klikkaa Tästä](<${invite.url}>) avataksesi YouTube-katselusession kanavalla ${channel.name}.`
                    }
                }})
            })
        }

        if (command === 'fishing') {
            // check that channel is a voice channel
            if (!channel || channel.type != "voice") {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `Kanava jonka valitsit ei ole äänikanava. Valitse äänikanava`
                    }
                }})
            }

            // create invite
            client.api
            .channels(channel.id)
            .invites.post({
                data: {
                    "max_age": 604800,
                    "max_uses": 0,
                    "target_application_id": "814288819477020702",
                    "target_type": 2,
                    "temporary": false,
                }
            })
            .then(invite => new DiscordJS.Invite(client, invite))
            .then((invite) => {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `[Klikkaa Tästä](<${invite.url}>) pelataksesi Fishington.io:ta kanavalla ${channel.name}.`
                    }
                }})
            })
        }

        if (command === 'betrayal') {
            // check that channel is a voice channel
            if (!channel || channel.type != "voice") {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `Kanava jonka valitsit ei ole äänikanava. Valitse äänikanava`
                    }
                }})
            }

            // create invite
            client.api
            .channels(channel.id)
            .invites.post({
                data: {
                    "max_age": 604800,
                    "max_uses": 0,
                    "target_application_id": "773336526917861400",
                    "target_type": 2,
                    "temporary": false,
                }
            })
            .then(invite => new DiscordJS.Invite(client, invite))
            .then((invite) => {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `[Klikkaa Tästä](<${invite.url}>) pelataksesi Betrayal.io:ta kanavalla ${channel.name}.`
                    }
                }})
            })
        }

        if (command === 'poker') {
            // check that channel is a voice channel
            if (!channel || channel.type != "voice") {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `Kanava jonka valitsit ei ole äänikanava. Valitse äänikanava.`
                    }
                }})
            }

            // create invite
            client.api
            .channels(channel.id)
            .invites.post({
                data: {
                    "max_age": 604800,
                    "max_uses": 0,
                    "target_application_id": "755827207812677713",
                    "target_type": 2,
                    "temporary": false,
                }
            })
            .then(invite => new DiscordJS.Invite(client, invite))
            .then((invite) => {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                    content: `[Klikkaa Tästä](<${invite.url}>) pelataksesi pokeria kanavalla ${channel.name}.`
                    }
                }})
            })
        }

        if (command === 'ping') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                      content: 'pong',
                    },
                },
            })
        }
    })
})

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.login(process.env.TOKEN);