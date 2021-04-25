//vars
const alignObjectsButton = document.querySelector("#align-objects");
const cancelButton = document.querySelector("#cancel");
// const layoutMenu = document.querySelector("#layout");
const spacingInput = document.querySelector("#spacing");
// const layoutSelected = document.querySelector('input[name="radioGroup"]');

//on load function
document.addEventListener("DOMContentLoaded", function () {
  formValidation();
});

//initialize select menu
selectMenu.init();

//event listeners
spacingInput.oninput = () => {
  formValidation();
};
// layoutMenu.onchange = () => {
//   formValidation();
// };

alignObjectsButton.onclick = () => {
  alignObjects();
};
cancelButton.onclick = () => {
  cancel();
};

//form validation
var formValidation = function (event) {
  if (spacingInput.value === "") {
    alignObjectsButton.disabled = true;
  } else {
    alignObjectsButton.disabled = false;
  }
};

//functions
function alignObjects() {
  const definedSpacing = parseInt(spacingInput.value, 10);
  const layoutSelected = document.querySelector(
    'input[name="radioGroup"]:checked'
  ).value;

  parent.postMessage(
    {
      pluginMessage: {
        type: "align-objects",
        spacing: spacingInput.value,
        layout: layoutSelected,
        definedSpacing,
      },
    },
    "*"
  );
  console.log(layoutSelected.value);
}
function cancel() {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
}
