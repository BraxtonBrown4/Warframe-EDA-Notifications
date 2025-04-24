const bountyWebHook = process.env.BOUNTY_WEBHOOK_SECRET

export function WFMessage(message) {
    let payload = {
        embeds: [message],
    };

    (async () => {
        try {
            const response = await fetch(bountyWebHook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('\nMessage sent successfully!');
            } else {
                console.error(`Failed to send message. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}