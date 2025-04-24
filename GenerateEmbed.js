export const GenerateEmbed = (mission) => {

    const { expiry, missions, modifiers } = mission

    return {
        title: "Stela Farm",
        description: "(Elite Deep Archimedia)",
        color: 16711680,
        thumbnail: {
            url: `https://yt3.googleusercontent.com/lLGvQmvfE-WB5RF2al4VPPgbeNxJUvd_wMEd9FLrJEC4pLiOh0mdGAm1DJR-t4Na7qmvgR5c=s900-c-k-c0x00ffffff-no-rj`
        },
        fields: [
            ...missions.flatMap(m => {
                return [
                    {
                        name: `**Mission${missions.indexOf(m) + 1}**\n\n${m.name.toUpperCase()}`,
                        value: `__${m.variant.name}__\n_${m.variant.description}_\n\n ${m.conditions.map(c => `__${c.name}__\n_${c.description}_\n\n`).join("")}`,
                        inline: true
                    },
                ]

            }),
            { name: '\u200B', value: '\u200B', inline: false },
            {
                name: "Elite Deep Archimedia Modifiers",
                value: modifiers.map(m => `__${m.name}__: _${m.description}_\n\n`).join(""),
                inline: false
            },
            {
                name: "Expiring at",
                value: `<t:${expiry}:t> (<t:${expiry}:R>)`,
                inline: false
            }
        ]
    }
}