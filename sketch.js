let barCharts = [];
let data;
let cleanData=[];
let numRows;

function preload(){
    data = loadTable("data/disability.csv", "csv", "header");
}

function setup(){
    background(50)
    createCanvas(1500,900)
    angleMode(DEGREES);
    noLoop();

    numRows = data.rows.length;
    for(let i=0;i<numRows;i++){
        cleanData.push(data.rows[i].obj);
    }
    console.log(cleanData);


    let barChart01 = {
        data: cleanData,
        title: "# of people with disabilities",
        xValue: "Type",
        yValues: ["Any_Extent"],
        xPos: 75,
        yPos: 350,
        labelTextSize: 12,
        labelRotation: 40,
    }

    

    let barChart02 = {
        data: cleanData,
        title: "# of people with disabilities by extent",
        xValue: "Type",
        yValues: ["Some_Extent", "Great_Extent"],
        xPos: 600,
        yPos: 350,
        labelTextSize: 12,
        labelRotation: 40,
    }

    barCharts.push(new BarChart(barChart01));
    barCharts.push(new BarChart(barChart02));
}

function draw() {
    background(50);
    barCharts.forEach(chart => chart.render());
}

