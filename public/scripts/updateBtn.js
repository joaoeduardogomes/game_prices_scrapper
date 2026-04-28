const updateBtn = document.querySelector("button#update-btn")
const warningSpan = document.querySelector("span#warning")

updateBtn.addEventListener("click", async () => {
    warningSpan.textContent = "Please wait the scraping to complete. The data will update automatically."

    try {
        const res = await fetch("/api/games/update", { method: "POST" })
        if (!res.ok) throw new Error("Failed to update")
    } catch (err) {
        warningSpan.textContent = "Something went wrong!"
        return
    }

    location.reload()

})

