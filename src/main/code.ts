figma.showUI(__html__, { width: 232, height: 254 });

let spacing: number;

/***** VERTICAL ALIGNMENT *****/
function alignVertical() {
  //check if there are enough objects selected
  if (figma.currentPage.selection.length < 2) {
    figma.notify("Select at least 2 Objects");
    return;
  }

  //1st item x and y
  let positionX = figma.currentPage.selection[0].x;
  let positionY = figma.currentPage.selection[0].y;

  //elements selected
  let nodeSelected = figma.currentPage.selection;

  for (const selected of nodeSelected) {
    let spacingY = selected.height + spacing;
    selected.x = positionX;
    selected.y = positionY;
    positionY += spacingY;
  }
  figma.notify("Objects vertically aligned!");
}

/***** HORIZONTAL ALIGNMENT *****/
function alignHorizontal() {
  //check if there are enough objects selected
  if (figma.currentPage.selection.length < 2) {
    figma.notify("Select at least 2 Objects");
    return;
  }

  //1st item x and y
  let positionX = figma.currentPage.selection[0].x;
  let positionY = figma.currentPage.selection[0].y;

  //elements selected
  let nodeSelected = figma.currentPage.selection;

  for (const selected of nodeSelected) {
    let spacingX = selected.width + spacing;
    selected.x = positionX;
    selected.y = positionY;
    positionX += spacingX;
  }
  figma.notify("Objects horizontally aligned!");
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "align-objects") {
    spacing = msg.definedSpacing;

    //determing the kind of layout
    if (msg.layout === "vertical") {
      alignVertical();
    } else if (msg.layout === "horizontal") {
      alignHorizontal();
    }
  }
  figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
  // figma.closePlugin();
};
