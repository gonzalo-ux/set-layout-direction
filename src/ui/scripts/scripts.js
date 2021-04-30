//vars
const alignObjectsButton = document.querySelector("#align-objects");
const cancelButton = document.querySelector("#cancel");
const spacingInput = document.querySelector("#spacing");

var radios = document.querySelectorAll('input[name="radioGroup"]');

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

//check radio selected
function checkSelection(event) {
  const spacingIcon = document.querySelector("#spacing-icon");
  if (this.value === "vertical") {
    console.log("vertical");
    spacingIcon.classList.remove("icon--distribute-horizontal-spacing");
    spacingIcon.classList.add("icon--distribute-vertical-spacing");
  } else if (this.value === "horizontal") {
    console.log("horizontal");
    spacingIcon.classList.remove("icon--distribute-vertical-spacing");
    spacingIcon.classList.add("icon--distribute-horizontal-spacing");
  }
}

Array.prototype.forEach.call(radios, function (radio) {
  radio.addEventListener("change", checkSelection);
});

function alignObjects() {
  const definedSpacing = parseInt(spacingInput.value, 10);
  const layoutSelected = document.querySelector(
    'input[name="radioGroup"]:checked'
  );

  parent.postMessage(
    {
      pluginMessage: {
        type: "align-objects",
        spacing: spacingInput.value,
        layout: layoutSelected.value,
        definedSpacing,
      },
    },
    "*"
  );
}
function cancel() {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
}
