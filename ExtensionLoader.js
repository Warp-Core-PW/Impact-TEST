const apiUrl =
  "https://api.github.com/repos/Warp-Core-PW/Impact/contents/extensions";

const SearchField = document.querySelector(".SearchField");

function ReportErrorOnPage() {
  const ErrorMessage = document.createElement("h5");
  ErrorMessage.style =
    "color: #F54156; text-align: center; font-size: 30px; padding: 20px";
  ErrorMessage.textContent = "Failed to fetch extensions :(";
  document.body.insertBefore(ErrorMessage, document.querySelector(".Footer"));
}

async function fetchrepocontents(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    ReportErrorOnPage();
  }
}

// Helper to create and add a list item
function AddListItem(item, fileTree) {
  const listItem = document.createElement("li");
  listItem.classList.add(item.type);
  listItem.classList.add(item.type === "dir" ? "folder" : "file");
  listItem.textContent = item.name;
  listItem.id = item.path;

  if (item.type === "dir") {
    if (item.name === "Mio") {
      listItem.style.color = "black";
      listItem.style.cursor = "pointer";
      listItem.addEventListener("click", () => {
        window.open("https://gallery.miyo.lol/", "_blank");
      });
    } else {
      listItem.addEventListener("click", () => toggleFolder(listItem, listItem.id));
      const subfolder = document.createElement("ul");
      subfolder.classList.add("subfolder");
      listItem.appendChild(subfolder);
    }
  } else {
    listItem.addEventListener("click", () => Onclick(listItem.id));
    
    // Create and append the copy link button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy Link";
    copyButton.style.marginLeft = "10px";
    copyButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent triggering file click
      const fileUrl = `https://raw.githubusercontent.com/Warp-Core-PW/Impact/main/${item.path}`
      navigator.clipboard.writeText(fileUrl).then(() => {
        alert("Link copied to clipboard");
      });
    });
    listItem.appendChild(copyButton);
  }

  fileTree.appendChild(listItem);
}

// Fetch and display the directory structure
async function displayRepoContents(path = "extensions") {
  const data = await fetchrepocontents(
    "https://api.github.com/repos/Warp-Core-PW/Impact/contents/" + path
  );
  if (data === null) return;

  const fileTree = document.getElementById("file-tree");
  const spinner = document.getElementById("spinner");
  fileTree.innerHTML = "";

  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.type === "file" && item.name.endsWith(".author")) continue;
      AddListItem(item, fileTree);
    }
  }

  if (path !== "extensions") {
    const listItem = document.createElement("li");
    listItem.classList.add("backbutton");
    listItem.textContent = "Back";
    listItem.addEventListener("click", () => displayRepoContents("extensions"));
    fileTree.appendChild(listItem);
  }

  spinner.style.display = "none";
}

// Toggle folder visibility
function toggleFolder(folderElement, path) {
  folderElement.classList.toggle("expanded");
  const subfolder = folderElement.querySelector(".subfolder");
  if (subfolder) {
    displayRepoContents(path);
  }
}

function OnSearch() {
  const SearchQuery = SearchField.value.toLowerCase();
  const Items = document.getElementById("file-tree").children;
  Array.from(Items).forEach(function (listItem) {
    if (listItem.id.toLowerCase().includes(SearchQuery)) {
      listItem.hidden = false;
    } else {
      listItem.hidden = true;
    }
  });
}

SearchField.addEventListener("input", OnSearch);

displayRepoContents("extensions");
