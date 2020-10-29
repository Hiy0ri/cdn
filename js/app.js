const find = (e) => {
    return document.querySelector(e)
}
const app = {
    update: () => {
        date.load()
        app.rotate(".second", date.sec, 6)
        app.rotate(".minute", date.sec + (date.min * 60), 0.1)
        app.rotate(".hour", date.sec + (date.min * 60) + (date.hr % 12 * 3600), 360 / 43200)
        // find(".date h2"). innerText = `${date.y}${(date.m < 10 ? "0" : "") + date.m}${(date.d < 10 ? "0" : "") + date.d}`
    },
    rotate: (el, value, distance) => {
        const gearTransition = 300
        if (value * distance == 0 || value * distance >= 360) {
            find(el).style.transform = `rotate(360deg)`
            setTimeout(() => {
                find(el).classList.remove("movement")
                find(el).style.transform = "rotate(0deg)"
                setTimeout(() => {
                    find(el).classList.add("movement")
                }, 100)
            }, gearTransition)
        } else {
            find(el).style.transform = `rotate(${value * distance}deg)`
        }
    }
}
const date = {
    "y": 0,
    "m": 0,
    "d": 0,
    "hr": 0,
    "min": 0,
    "sec": 0,
    "ms": 0,
    load: () => {
        const now = new Date
        date.y = now.getFullYear()
        date.m = now.getMonth() + 1
        date.d = now.getDate()
        date.hr = now.getHours()
        date.min = now.getMinutes()
        date.sec = now.getSeconds()
        date.ms = now.setMilliseconds()
    }

}
date.load()
setTimeout(() => {
    setInterval(() => {
        app.update()
    }, 1e3);
}, 1e3 - date.ms)