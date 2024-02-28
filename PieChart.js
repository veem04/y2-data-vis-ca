class PieChart {
    constructor(obj){
        // This defines the default values for if values aren't given
        const defaults = {
            title: "Chart title",
            titleSize: 24,
            titleXOffset: 0,
            titleYOffset: 0,
            chartWidth: 300,
            chartHeight: 300,
            sliceColours: ["#e54537", "#4ee537", "#37dce5", "#c537e5"],
            lineColour: "#FFFFFF",
            lineThickness: 2,
            legendTextSize: 16,
            legendTextColour: "#FFFFFF",
            legendPadding: 30,
        }
        
        // https://stackoverflow.com/questions/46496245/how-to-supply-default-values-to-es6-class-properties
        // This creates a new object starting from an empty object
        // It assigns the default values, then overwrites them with the user's values where provided
        let opts = Object.assign({}, defaults, obj);
        this.data = opts.data;
        this.title = opts.title;
        this.titleSize = opts.titleSize;
        this.titleXOffset = opts.titleXOffset;
        this.titleYOffset = opts.titleYOffset;
        this.values = opts.values
        this.xPos = opts.xPos;
        this.yPos = opts.yPos;
        this.chartWidth = opts.chartWidth;
        this.chartHeight = opts.chartHeight;
        this.sliceColours = opts.sliceColours;
        this.lineColour = opts.lineColour;
        this.lineThickness = opts.lineThickness;
        this.legendTextSize = opts.legendTextSize;
        this.legendTextColour = opts.legendTextColour;
        this.legendPadding = opts.legendPadding;
        this.font = opts.font;
    }

    render(){
        let totals = [];
        this.values.forEach((val) => {
            totals.push(this.data.reduce(
                (acc, curVal) => acc + +curVal[val], 0
            ))
        })
        // console.log(totals);
        let sum = totals.reduce(
            (acc, val) => acc + val, 0
        );
        // console.log(sum);
        let arcs = totals.map(val => (val/sum)*360);
        // console.log(arcs);

        textFont(font);

        let startPos = 0
        for(let i=0;i<arcs.length;i++){
            stroke(255)
            strokeWeight(2)
            fill(this.sliceColours[i % this.sliceColours.length]);
            arc(this.xPos, this.yPos, this.chartWidth, this.chartHeight, startPos, startPos+arcs[i], PIE)
            startPos += arcs[i];
        }

        translate(this.xPos,this.yPos)
        noStroke();

        // title display
        push();
        translate(0,-this.chartHeight/2);
        textSize(this.titleSize);
        textAlign(CENTER)
        fill("#FFFFFF")
        text(this.title, this.titleXOffset, -this.titleSize+this.titleYOffset)
        pop();


        // translate(this.xPos, this.yPos)
        translate(this.chartWidth/2+this.legendPadding, 0);
        textSize(this.legendTextSize);
        textAlign(LEFT, CENTER);
        rectMode(CENTER);
        let len = totals.length;
        // let len = 5;
        for(let i=0;i<len;i++){
            fill(this.sliceColours[i % this.sliceColours.length]);
            let yOffset = (((len-1)/-2)+i)*this.legendTextSize*2;
            console.log(yOffset)
            rect(0, yOffset, this.legendTextSize, this.legendTextSize);
            fill(this.legendTextColour);
            text(this.values[i], this.legendTextSize, yOffset);
        }
    }
}