let barCharts = [];
let data;
let cleanData=[];
let numRows;

function preload(){
    data = loadTable("data/disabilityShortNames.csv", "csv", "header");
}

function setup(){
    background(50);
    createCanvas(2000,1200)
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
        chartWidth:400,
        labelTextSize: 12,
        labelRotation: 40,
    }

    

    let barChart02 = {
        data: cleanData,
        title: "# of people with disabilities by extent",
        xValue: "Type",
        yValues: ["Some_Extent", "Great_Extent"],
        xPos: 800,
        yPos: 450,
        chartHeight: 400,
        labelTextSize: 12,
        labelRotation: 40,
    }

    let barChart03 = {
        data: cleanData,
        horizontal: true,
        title: "# of people with disabilities",
        xValue: "Type",
        yValues: ["Any_Extent"],
        xPos: 200,
        yPos: 1000,
        chartHeight: 400,
        labelTextSize: 12,
        labelRotation: 40,
    }

    let barChart04 = {
        data: cleanData,
        horizontal: true,
        title: "# of people with disabilities by extent",
        xValue: "Type",
        yValues: ["Some_Extent", "Great_Extent"],
        xPos: 750,
        yPos: 1000,
        chartWidth: 400,
        labelTextSize: 12,
        labelRotation: 40,
    }

    let barChart05 = {
        data: cleanData,
        fullBar: true,
        title: "# of people with disabilities by extent",
        xValue: "Type",
        yValues: ["Some_Extent", "Great_Extent"],
        xPos: 1500,
        yPos: 400,
        labelTextSize: 12,
        labelRotation: 40,
    }

    let barChart06 = {
        data: cleanData,
        horizontal: true,
        fullBar: true,
        title: "# of people with disabilities by extent",
        xValue: "Type",
        yValues: ["Some_Extent", "Great_Extent"],
        xPos: 1500,
        yPos: 1000,
        labelTextSize: 12,
        labelRotation: 40,
    }

    barCharts.push(new BarChart(barChart01));
    barCharts.push(new BarChart(barChart02));
    barCharts.push(new BarChart(barChart03));
    barCharts.push(new BarChart(barChart04));
    barCharts.push(new BarChart(barChart05));
    barCharts.push(new BarChart(barChart06));

}

function draw() {
    background(20);
    barCharts.forEach(chart => chart.render());
}

