class BarChart{
    constructor(obj){
        // This defines the default values for if values aren't given
        const defaults = {
            chartType: "default",
            chartWidth: 300,
            chartHeight: 300,
            axisLineColour: "#FFFFFF",
            labelTextSize: 16,
            labelPadding: 10,
            labelColour: "#FFFFFF",
            labelRotation: 45,
            barWidth: ((obj.chartWidth || 300) / obj.data.length) * (2/3),
            gridLineColour: "#666666",
        }
        
        // https://stackoverflow.com/questions/46496245/how-to-supply-default-values-to-es6-class-properties
        // This creates a new object starting from an empty object
        // It assigns the default values, then overwrites them with the user's values where provided
        let opts = Object.assign({}, defaults, obj);
        this.data = opts.data;
        this.chartType = opts.chartType;
        this.xValue = opts.xValue;
        this.yValue = opts.yValue;
        this.xPos = opts.xPos;
        this.yPos = opts.yPos;
        this.chartWidth = opts.chartWidth;
        this.chartHeight = opts.chartHeight;
        this.axisLineColour = opts.axisLineColour;
        this.labelTextSize = opts.labelTextSize;
        this.labelPadding = opts.labelPadding;
        this.labelColour = opts.labelColour;
        this.labelRotation = opts.labelRotation;
        this.barWidth = opts.barWidth;
        this.gridLineColour = opts.gridLineColour;
    }

    render(){
        push();
        translate (this.xPos,this.yPos);
        stroke(this.axisLineColour)
        line(0,0,0,-this.chartHeight);
        line(0,0,this.chartWidth,0);

        let gap = (this.chartWidth - (this.data.length * this.barWidth))/(this.data.length +1)
        let labels = this.data.map(d => d[this.xValue]);
        let maxValue = max(this.data.map(d=>d[this.yValue]))
        // let maxValue = 100;
        let scale = this.chartHeight / maxValue

        push();
        translate(gap,0);
        for(let i=0; i<this.data.length; i++){
            // bars
            fill("#FFFFFF");
            noStroke();
            rect (0,0,this.barWidth, -this.data[i][this.yValue]*scale);

            // labels
            fill(this.labelColour);
            noStroke();
            textSize(this.labelTextSize);
            textAlign(LEFT, CENTER);
            push();
            translate(this.barWidth/2,this.labelPadding);
            rotate(this.labelRotation);
            text(labels[i],0,0)
            pop();
            
            translate(gap+this.barWidth,0);
        }
        pop();
        
        let tickGap = this.chartHeight / 5;
        let tickValue = maxValue/5

        // this draws the vertical elements
        for(let i=0;i<=5;i++){
            stroke(this.axisLineColour)
            line(0,-(i*tickGap),-10,-(i*tickGap));

            stroke(this.gridLineColour);
            line(0,-(i*tickGap),this.chartWidth,-(i*tickGap))

            fill(this.labelColour);
            noStroke();
            textSize(this.labelTextSize);
            textAlign(RIGHT, CENTER);
            text(Math.round(tickValue*i*10,)/10+"%",-15,-(i*tickGap))
        }

        pop();
    }
}