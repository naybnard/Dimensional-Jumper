const grid = document.getElementById("slotGrid");
let balance = 100;
let currentBet = 0;

function initGrid() {
    for (let i = 0; i < 15; i++) {
        const slot = document.createElement("div");
        slot.innerHTML = `<img src="${symbols[0].src}" alt="slot">`;
        grid.appendChild(slot);
    }
}

function spin() {
    if (currentBet <= 0) {
        alert("Please select a bet!");
        return;
    }
    if (balance < currentBet) {
        alert("Not enough balance!");
        return;
    }

    balance -= currentBet;
    document.getElementById("balance").textContent = balance;

    const slots = grid.children;
    let scatterCount = 0;
    for (let i = 0; i < slots.length; i++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        slots[i].innerHTML = `<img src="${randomSymbol.src}" alt="${randomSymbol.name}">`;
        if (randomSymbol.name === "scatter") scatterCount++;
    }

    checkWins();
    if (scatterCount >= 3) {
        triggerDimensionJump();
    }
    if (Math.random() < 0.2) {
        collectArtifact();
    }
}

function checkWins() {
    if (Math.random() < 0.3) {
        const win = currentBet * 2;
        balance += win;
        document.getElementById("balance").textContent = balance;
        alert(`You win $${win}!`);
    }
}

function triggerDimensionJump() {
    const dimensions = ["Medieval Kingdom", "Futuristic Metropolis", "Underwater Abyss", "Jungle Realm", "Space Station"];
    const randomDimension = dimensions[Math.floor(Math.random() * dimensions.length)];
    alert(`Jumping to ${randomDimension}!`);
    const bonusWin = Math.floor(Math.random() * 100);
    balance += bonusWin;
    document.getElementById("balance").textContent = balance;
    alert(`Bonus Win: $${bonusWin}!`);
}

document.querySelectorAll(".bet-button").forEach(button => {
    button.addEventListener("click", () => {
        currentBet = parseInt(button.getAttribute("data-amount"));
        alert(`Bet set to $${currentBet}`);
    });
});

document.getElementById("spinButton").addEventListener("click", spin);

initGrid();
