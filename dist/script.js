const rectDetails = [
  {
    x: 400,
    y: 60,
    width: 100,
    height: 80,
    color: "pink",
    id: "r1",
    line: [
      { id: "l1", coordinates: ["x1", "y1"] },
      { id: "l2", coordinates: ["x1", "y1"] },
      { id: "l3", coordinates: ["x1", "y1"] }
    ],
    children: ['rc1', 'rc2']
  },
  {
    x: 40,
    y: 270,
    width: 100,
    height: 80,
    color: "aquamarine",
    id: "r2",
    line: [{ id: "l1", coordinates: ["x2", "y2"] }]
  },
  {
    x: 300,
    y: 270,
    width: 100,
    height: 80,
    color: "yellow",
    id: "r3",
    line: [{ id: "l2", coordinates: ["x2", "y2"] }]
  },
  {
    x: 600,
    y: 270,
    width: 100,
    height: 80,
    color: "cyan",
    id: "r4",
    line: [{ id: "l3", coordinates: ["x2", "y2"] }]
  }, {
    x: 420,
    y: 90,
    width: 20,
    height: 20,
    color: "brown",
    id: 'rc1',
    child: true,
    parent: 'r1'
  }, {
    x: 460,
    y: 90,
    width: 20,
    height: 20,
    color: "black",
    id: 'rc2',
    child: true,
    parent: 'r1'
  }
];
const dragPadding = 5;

const lineDetails = [
  {
    id: "l1",
    x1: rectDetails[0].x + rectDetails[0].width / 2,
    y1: rectDetails[0].y + rectDetails[0].height / 2,
    x2: rectDetails[1].x + rectDetails[1].width / 2,
    y2: rectDetails[1].y + rectDetails[1].height / 2,
    stroke: "red"
  },
  {
    id: "l2",
    x1: rectDetails[0].x + rectDetails[0].width / 2,
    y1: rectDetails[0].y + rectDetails[0].height / 2,
    x2: rectDetails[2].x + rectDetails[2].width / 2,
    y2: rectDetails[2].y + rectDetails[2].height / 2,
    stroke: "orange"
  },
  {
    id: "l3",
    x1: rectDetails[0].x + rectDetails[0].width / 2,
    y1: rectDetails[0].y + rectDetails[0].height / 2,
    x2: rectDetails[3].x + rectDetails[3].width / 2,
    y2: rectDetails[3].y + rectDetails[3].height / 2,
    stroke: "blue"
  }
];

const dragging = (event, d) => {


  const xCoor = event.sourceEvent.clientX;
  const yCoor = event.sourceEvent.clientY;

  const index = rectDetails.findIndex(v => v.id === d.id);

  // check if the element is child or not
  if (d.child) {
    // if its a child element then it cant move outside parent boundary
    const parentIndex = rectDetails.findIndex(v => v.id === d.parent)



    if (xCoor > rectDetails[parentIndex].x + dragPadding && xCoor < rectDetails[parentIndex].x + rectDetails[parentIndex].width - dragPadding - d.width) {
      rectDetails[index].x = xCoor;

    }
    if (yCoor > rectDetails[parentIndex].y + dragPadding && yCoor < rectDetails[parentIndex].y + rectDetails[parentIndex].height - dragPadding - d.height) {
      rectDetails[index].y = yCoor;

    }
    if (xCoor <= rectDetails[parentIndex].x + dragPadding) {
      rectDetails[index].x = rectDetails[parentIndex].x + dragPadding;

    }
    if (yCoor > rectDetails[parentIndex].y + rectDetails[parentIndex].height - dragPadding) {
      rectDetails[index].y = rectDetails[parentIndex].y + rectDetails[parentIndex].height - d.height - dragPadding;
    }
  }
  else {
    // its a parent element, children if any should move with parent
    const parentPosition = {
      x: rectDetails[index].x,
      y: rectDetails[index].y
    };
    console.log(parentPosition)

    if (d.children) {
      d.children.forEach(childID => {
        const childIndex = rectDetails.findIndex(v => v.id === childID);

        // calculate offset with parent
        const childXOffset = rectDetails[childIndex].x - parentPosition.x;
        const childYOffset = rectDetails[childIndex].y - parentPosition.y;

        // update child position
        d3.select(`#${childID}`).attr("x", xCoor + childXOffset).attr("y", yCoor + childYOffset);

        rectDetails[index].x = xCoor;
        rectDetails[index].y = yCoor;
        rectDetails[childIndex].x = xCoor + childXOffset;
        rectDetails[childIndex].y = yCoor + childYOffset;
      })
    }
  }

  // setting the x and y coordinate of the rectangles
  d3.select(`#${d.id}`).attr("x", rectDetails[index].x).attr("y", rectDetails[index].y);


  //   updating the coordinates of the line
  if (d.line)
    d.line.forEach(({ id, coordinates }) => {
      const attrObj = {};
      d3.select(`#${id}`).attr(coordinates[0], xCoor + 40).attr(coordinates[1], yCoor + 20);
    });
};

d3.select("svg")
  .selectAll("line")
  .data(lineDetails)
  .join("line")
  .attr("stroke", (d) => d.stroke)
  .attr("id", (d) => d.id)
  .attr("x1", (d) => d.x1)
  .attr("y1", (d) => d.y1)
  .attr("x2", (d) => d.x2)
  .attr("y2", (d) => d.y2);

const parentRects = d3.select("svg")
  .selectAll("rect")
  .data(rectDetails)
  .join("rect");

parentRects.attr("stroke", "maroon")
  .attr("x", (d) => d.x)
  .attr("y", (d) => d.y)
  .attr("width", (d) => d.width)
  .attr("height", (d) => d.height)
  .attr("id", (d) => d.id)
  .style("fill", (d) => d.color)
  .call(
    d3.drag().on("start", dragStart).on("drag", dragging).on("end", dragEnd)
  );



function dragStart(event, d) {
  d3.select(this).style("stroke", "aquamarine");
}

function dragEnd(event, d) {
  d3.select(this).style("stroke", "maroon");
}