const Button = document.querySelector(".ModeButton");
const linkbody = "https://raw.githubusercontent.com/Warp-Core-PW/Impact/refs/heads/main/";

const penguinmod = (new URLSearchParams(window.location.search).get('OriginPM') === "true");

function CopyToPM(Url) {
    const messager = window.opener || window.parent;
    if (!messager) return alert("Failed to request to PenguinMod!");
    messager.postMessage({
        loadExt: Url
    }, "https://studio.penguinmod.com");
}

function downloadStringAsFile(content, fileName, contentType) {
    const blob = new Blob([content], { type: contentType });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function CopyToClipboard(Data) {
    navigator.clipboard.writeText(Data).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy text!");
        console.error(err);
    });
}

function CopyLinkToClipboard(ExtName) {
    const fullLink = linkbody + ExtName;
    CopyToClipboard(fullLink);
}

function ToggleToString(Bool) {
    return Bool === "true" ? "false" : "true";
}

function ToggleButton(ToggleValue, CopyValues) {
    if (CopyValues) {
        setCookie("PreferCopy", ToggleValue);
    }
    if (ToggleValue === "true") {
        Button.textContent = "Copy code";
        Button.dataset.toggle = true;
    } else {
        Button.textContent = "Download";
        Button.dataset.toggle = false;
    }
}

const getCookie = (name) => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))
        ?.split('=')[1];
};

function setCookie(name, value) {
    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

if (getCookie("PreferCopy") === undefined) {
    setCookie("PreferCopy", "false");
}

async function fetchData(FileName) {
    try {
        console.log(linkbody + FileName);
        const response = await fetch(linkbody + FileName);
        if (!response.ok) {
            alert(`Failed to fetch extension code for: ${FileName}`);
            return null;
        }
        return await response.text();
    } catch (error) {
        alert(`Failed to fetch extension code for: ${FileName}`);
        return null;
    }
}

async function Onclick(ExtName) {
    if (penguinmod) {
        CopyToPM(linkbody + ExtName);
    } else {
        const ExtData = await fetchData(ExtName);
        if (!ExtData) return;
        if (getCookie("PreferCopy") === "true") {
            CopyToClipboard(ExtData);
        } else {
            downloadStringAsFile(ExtData, ExtName, "text/javascript");
        }
    }
}

ToggleButton(getCookie("PreferCopy"), false);

if (penguinmod) {
    Button.disabled = true;
    Button.textContent = "Copy to PenguinMod";
} else {
    Button.style.cursor = "pointer";
    Button.addEventListener('click', () => ToggleButton(ToggleToString(getCookie("PreferCopy")), true));

    // Create "Copy Link" button
    const copyLinkButton = document.createElement("button");
    copyLinkButton.textContent = "Copy Link";
    copyLinkButton.classList.add("CopyLinkButton");
    copyLinkButton.style.marginLeft = "10px";
    copyLinkButton.style.cursor = "pointer";

    // Add event listener
    copyLinkButton.addEventListener("click", () => {
        const extName = prompt("Enter the extension filename:");
        if (extName) {
            CopyLinkToClipboard(extName);
        }
    });

    // Insert next to ModeButton
    Button.parentNode.insertBefore(copyLinkButton, Button.nextSibling);
}
