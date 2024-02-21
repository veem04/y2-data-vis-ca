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

    const groupedData = Object.groupBy(cleanData, ({ Label }) => Label);
    console.log(groupedData);



    // function getAverages(data){
    //     let dataWithAvgs = [];
    //     for(const [key] of Object.entries(data)){
    //         let sum = data[key].reduce(
    //             (accumulator, val) => accumulator + +val.VALUE, 0
    //         );
    //         avg = sum / data[key].length;
    //         dataWithAvgs.push({
    //             Reason: key,
    //             Total: avg,
    //         });
    //     }
    //     return dataWithAvgs;
    // }

    // const groupedData01 = Object.groupBy(cleanData, ({ Reason }) => Reason);
    // const dataWithAvgs = getAverages(groupedData01);

    // let barChart01 = {
    //     data: dataWithAvgs,
    //     xValue: "Reason",
    //     yValue: ["Total"],
    //     xPos: 75,
    //     yPos: 350,
    //     labelTextSize: 14,
    //     labelRotation: 35,
    // }

    

    // let barChart02 = {

    // }

    // barCharts.push(new BarChart(barChart01));
}

function draw() {
    background(50);
    // barCharts.forEach(chart => chart.render());
}

