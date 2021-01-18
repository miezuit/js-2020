document.querySelector("div")
        .addEventListener("click", () => document.querySelector("div").classList.add("disappear")
        )

document.querySelector("div")
        .addEventListener("animationend", () =>
            document.querySelector("div").classList.remove("disappear"))