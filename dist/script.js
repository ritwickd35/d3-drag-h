const rectDetails = [
  {
    x: 400,
    y: 60,
    width: 80,
    height: 40,
    color: "pink",
    id: "r1",
    line: [
      { id: "l1", coordinates: ["x1", "y1"] },
      { id: "l2", coordinates: ["x1", "y1"] },
      { id: "l3", coordinates: ["x1", "y1"] }
    ]
  },
  {
    x: 40,
    y: 270,
    width: 80,
    height: 40,
    color: "purple",
    id: "r2",
    line: [{ id: "l1", coordinates: ["x2", "y2"] }]
  },
  {
    x: 300,
    y: 270,
    width: 80,
    height: 40,
    color: "yellow",
    id: "r3",
    line: [{ id: "l2", coordinates: ["x2", "y2"] }]
  },
  {
    x: 600,
    y: 270,
    width: 80,
    height: 40,
    color: "cyan",
    id: "r4",
    line: [{ id: "l3", coordinates: ["x2", "y2"] }]
  }
];

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
  var xCoor = event.x;
  var yCoor = event.y;
  // setting the x and y coordinate of the rectangles
  d3.select(`#${d.id}`).attr("x", xCoor).attr("y", yCoor);

  //   updating the coordinates of the line
  d.line.forEach(({ id, coordinates }) => {
    const attrObj = {};
      d3.select(`#${id}`).attr(coordinates[0], xCoor+40).attr(coordinates[1], yCoor+20);
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

d3.select("svg")
  .selectAll("rect")
  .data(rectDetails)
  .join("rect")
  .attr("stroke", "maroon")
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
  console.log(event, d);
  d3.select(this).style("stroke", "aquamarine");
}

function dragEnd(event, d) {
  d3.select(this).style("stroke", "maroon");
}