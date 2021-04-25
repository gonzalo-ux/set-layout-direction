//vars
const alignObjectsButton = document.querySelector("#align-objects");
const cancelButton = document.querySelector("#cancel");
const layoutMenu = document.querySelector("#layout");
const gapInput = document.querySelector("#gap");

//on load function
document.addEventListener("DOMContentLoaded", function () {
  formValidation();
});

//initialize select menu
selectMenu.init();

//event listeners
gapInput.oninput = () => {
  formValidation();
};
layoutMenu.onchange = () => {
  formValidation();
};
alignObjectsButton.onclick = () => {
  alignObjects();
};
cancelButton.onclick = () => {
  cancel();
};

//form validation
var formValidation = function (event) {
  if (layoutMenu.value === "" || gapInput.value === "") {
    alignObjectsButton.disabled = true;
  } else {
    alignObjectsButton.disabled = false;
  }
};

//functions
function alignObjects() {
  const definedGap = parseInt(gapInput.value, 10);
  parent.postMessage(
    {
      pluginMessage: {
        type: "align-objects",
        gap: gapInput.value,
        layout: layoutMenu.value,
        definedGap,
      },
    },
    "*"
  );
}
function cancel() {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
}
