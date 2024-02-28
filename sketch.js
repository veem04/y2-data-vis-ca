let barCharts = [];
let pieCharts = [];
let data;
let cleanData=[];
let cleanData2 = [];
let numRows;
let numRows2;
let font;

function preload(){
    data = loadTable("data/disabilityShortNames.csv", "csv", "header");
    data2 = loadTable("data/difficulties.csv", "csv", "header");
    font = loadFont("fonts/Ubuntu-Regular.ttf");
}

function setup(){
    background(50);
    createCanvas(2600,1200)
    angleMode(DEGREES);
    noLoop();

    numRows = data.rows.length;
    for(let i=0;i<numRows;i++){
        cleanData.push(data.rows[i].obj);
    }
    console.log(cleanData);

    numRows2 = data2.rows.length;
    for(let i=0;i<numRows2;i++){
        cleanData2.push(data2.rows[i].obj);
    }
    console.log(cleanData2);


    let barChart01 = {
        data: cleanData,
        title: "# of people with disabilities",
        titleYOffset: -10,
        xValue: "Type",
        yValues: ["Any Extent"],
        xPos: 75,
        yPos: 375,
        chartWidth:400,
        labelTextSize: 12,
        labelRotation: 40,
        barColours: ["#B5FFE1","#93E5AB","#65B891","#4E878C"],
        font: font,
    }

    

    let barChart02 = {
        data: cleanData,
        stacked: true,
        title: "# of people with disabilities by extent",
        titleYOffset: -10,
        xValue: "Type",
        yValues: ["Some Extent", "Great Extent"],
        xPos: 800,
        yPos: 475,
        chartHeight: 400,
        barLineThickness: 2,
        barLineColour: "#888",
        labelTextSize: 12,
        labelRotation: 40,
        font: font,
    }

    let barChart03 = {
        data: cleanData,
        horizontal: true,
        title: "# of people with disabilities",
        xValue: "Type",
        yValues: ["Any Extent"],
        xPos: 200,
        yPos: 1000,
        chartHeight: 400,
        labelTextSize: 12,
        labelRotation: 40,
        barColours: ["#FDE8E9","#E3BAC6","#BC9EC1","#8BAAAD"],
        font: font,
    }

    let barChart04 = {
        data: cleanData2,
        horizontal: true,
        title: "Lasting difficulties by extent",
        titleSize: 26,
        xValue: "Type of Difficulty or Condition",
        yValues: ["Some Extent", "Great Extent"],
        xPos: 750,
        yPos: 1000,
        chartWidth: 400,
        labelTextSize: 12,
        labelRotation: 40,
        barColours: ["#D9D0DE", "#BC8DA0"],
        font: font,
    }

    let barChart05 = {
        data: cleanData2,
        fullBar: true,
        title: "Lasting difficulties by extent",
        xValue: "Type of Difficulty or Condition",
        yValues: ["Some Extent", "Great Extent"],
        xPos: 1500,
        yPos: 400,
        labelTextSize: 12,
        labelRotation: 40,
        barColours: ["#00BFB2", "#1A5E63"],
        barLineThickness: 3,
        font: font,
    }

    let barChart06 = {
        data: cleanData,
        horizontal: true,
        fullBar: true,
        title: "# of people with disabilities by extent",
        xValue: "Type",
        yValues: ["Some Extent", "Great Extent"],
        xPos: 1500,
        yPos: 1000,
        labelTextSize: 12,
        labelRotation: 40,
        barColours: ["#91A6FF", "#FF88DC"],
        font: font,
    }

    barCharts.push(new BarChart(barChart01));
    barCharts.push(new BarChart(barChart02));
    barCharts.push(new BarChart(barChart03));
    barCharts.push(new BarChart(barChart04));
    barCharts.push(new BarChart(barChart05));
    barCharts.push(new BarChart(barChart06));

    let pieChart = {
        data: cleanData,
        title: "Extent of people's disabilities",
        titleYOffset: -10,
        values: ["Some Extent", "Great Extent"],
        xPos: 2150,
        yPos: 500,
        sliceColours: ["#5B507A", "#9AC6C5"],
        font: font,
    }

    pieCharts.push(new PieChart(pieChart));
}

function draw() {
    background(0);
    barCharts.forEach(chart => chart.render());
    pieCharts.forEach(chart => chart.render());
    
}

