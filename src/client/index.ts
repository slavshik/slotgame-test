import { GameOutcome } from "../shared/GameOutcome";

const spin = async () => {
    const port = 3000;
    const result = await fetch(`http://localhost:${port}/spin`, { method: "POST" });
    const data = await result.json();
    const outcome:GameOutcome = data;
    console.log("result ", outcome);
}

const init = () => {
    const spinButton = document.createElement("button");
    spinButton.innerText = "Spin Button";
    spinButton.addEventListener("click", spin);
    document.body.appendChild(spinButton)
}

init()
