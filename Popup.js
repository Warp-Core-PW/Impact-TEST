function createPopup() {
    // Create overlay
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "999";
    overlay.id = "popupOverlay";

    // Create popup container
    let popup = document.createElement("div");
    popup.style.background = "#ff5733"; // Reddish-orange background
    popup.style.padding = "20px";
    popup.style.borderRadius = "8px";
    popup.style.textAlign = "center";
    popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.3)";
    popup.style.zIndex = "1000";
    popup.style.color = "white"; // White text for contrast

    // Create header
    let header = document.createElement("h2");
    header.textContent = "What's New!";
    header.style.marginBottom = "10px";
    header.style.color = "#fff"; // White text for visibility

    // Create Line 1
    let message = document.createElement("p");
    message.innerHTML = 'We Released Warper!';

    //Create Line 2
        let message = document.createElement("p");
    message.innerHTML = 'Check it out <a href="https://warper.warpcore.live" target="_blank" style="color: #ffcc00; text-decoration: none;">here</a>.';
    // Create close button
    let closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.marginTop = "10px";
    closeButton.style.padding = "8px 16px";
    closeButton.style.background = "#d84315"; // Darker reddish-orange for contrast
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "5px";
    closeButton.style.fontSize = "16px";

    closeButton.addEventListener("mouseover", function () {
        closeButton.style.background = "#bf360c"; // Even darker on hover
    });

    closeButton.addEventListener("mouseout", function () {
        closeButton.style.background = "#d84315";
    });

    closeButton.addEventListener("click", function () {
        document.body.removeChild(overlay);
    });

    // Append elements
    popup.appendChild(header);
    popup.appendChild(message);
    popup.appendChild(closeButton);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// Show popup after 2 seconds
setTimeout(createPopup, 1);
