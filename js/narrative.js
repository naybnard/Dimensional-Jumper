let artifacts = 0;
function collectArtifact() {
    artifacts++;
    document.getElementById("storyProgress").textContent = `${artifacts}/5 Artifacts`;
    if (artifacts === 5) {
        alert("You’ve collected all artifacts! Unlocking the Grand Jackpot!");
    }
}
