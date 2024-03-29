class BarChart{
    constructor(obj){
        // This defines the default values for if values aren't given
        const defaults = {
            horizontal: false,
            fullBar: false,
            stacked: obj.fullBar ? true : false,
            title: "Chart title",
            titleSize: 24,
            titleXOffset: 0,
            titleYOffset: 0,
            chartWidth: 300,
            chartHeight: 300,
            axisLineColour: "#FFFFFF",
            labelTextSize: 16,
            labelPadding: 10,
            labelColour: "#FFFFFF",
            labelRotation: 45,
            barWidth: !obj.horizontal ? ((obj.chartWidth || 300) / obj.data.length) * (2/3) : ((obj.chartHeight || 300) / obj.data.length) * (2/3),
            barColours: ["#e54537", "#4ee537", "#37dce5", "#c537e5"],
            barLineThickness: 0,
            barLineColour: "#FFFFFF",
            gridLineColour: "#666666",
            numOfTicks: 5,
            legendTextSize: 16,
            legendTextColour: "#FFFFFF",
            legendPadding: 30,
        }
        
        // https://stackoverflow.com/questions/46496245/how-to-supply-default-values-to-es6-class-properties
        // This creates a new object starting from an empty object
        // It assigns the default values, then overwrites them with the user's values where provided
        let opts = Object.assign({}, defaults, obj);
        this.data = opts.data;
        this.horizontal = opts.horizontal;
        this.fullBar = opts.fullBar;
        this.stacked = opts.stacked;
        this.title = opts.title;
        this.titleSize = opts.titleSize;
        this.titleXOffset = opts.titleXOffset;
        this.titleYOffset = opts.titleYOffset;
        this.xValue = opts.xValue;
        this.yValues = opts.yValues;
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
        this.barColours = opts.barColours;
        this.barLineThickness = opts.barLineThickness;
        this.barLineColour = opts.barLineColour;
        this.gridLineColour = opts.gridLineColour;
        this.numOfTicks = opts.numOfTicks;
        this.legendTextSize = opts.legendTextSize;
        this.legendTextColour = opts.legendTextColour;
        this.legendPadding = opts.legendPadding;
        this.font = opts.font;
    }

    render(){
        if(!this.stacked && this.fullBar){
            console.warn("Clustered chart is incompatible with 100% chart! Unexpected issues may arise.");
        }


        push();
        translate (this.xPos,this.yPos);
        stroke(this.axisLineColour)
        
        line(0,0,0,-this.chartHeight);
        line(0,0,this.chartWidth,0);

        let gap = !this.horizontal ? (this.chartWidth - (this.data.length * this.barWidth))/(this.data.length +1) : (this.chartHeight - (this.data.length * this.barWidth))/(this.data.length +1)
        let labels = this.data.map(d => d[this.xValue]);

        let totalValues = [];
        if(this.stacked){
            // add the y values together and push to the array
            this.data.forEach(row => {
                let sum = 0;
                this.yValues.forEach(y => {
                    sum += +row[y];
                })
                totalValues.push(sum)
            });
        }else{
            // push each of the y values individually
            this.data.forEach(row => {
                this.yValues.forEach(y => {
                    totalValues.push(+row[y]);
                })
            });
        }

        let maxValue = max(totalValues);
        let scale = this.horizontal ? this.chartWidth / maxValue : this.chartHeight / maxValue
    
        textFont(this.font);

        push();

        this.horizontal ? translate(0, -gap) : translate(gap, 0);
        let numYValues = this.yValues.length
        for(let i=0; i<this.data.length; i++){
            // bars
            push();
            fill(this.barColours[i % this.barColours.length]);
            stroke(this.barLineColour);
            strokeWeight(this.barLineThickness);

            if(this.fullBar){
                scale = !this.horizontal ? this.chartHeight / totalValues[i] : this.chartWidth / totalValues[i];
            }

            
            for(let j=0; j<numYValues; j++){
                numYValues > 1 ? fill(this.barColours[j % this.barColours.length]) : ''
                if(this.stacked){
                    if(this.horizontal){
                        // stacked horizontal bars
                        rect(0,0,this.data[i][this.yValues[j]]*scale,-this.barWidth);
                        translate(this.data[i][this.yValues[j]]*scale,0);
                    }else{
                        // stacked vertical bars
                        rect(0,0,this.barWidth,-this.data[i][this.yValues[j]]*scale);
                        translate(0,-this.data[i][this.yValues[j]]*scale);
                    }
                }else{
                    if(this.horizontal){
                        // clustered horizontal bars
                        rect(0,0,this.data[i][this.yValues[j]]*scale,-this.barWidth/numYValues);
                        translate(0,-this.barWidth/numYValues);
                    }else{
                        // clustered vertical bars
                        rect(0,0,this.barWidth/numYValues,-this.data[i][this.yValues[j]]*scale);
                        translate(this.barWidth/numYValues,0);
                    }
                }
            }
            pop();



            // labels
            fill(this.labelColour);
            noStroke();
            textSize(this.labelTextSize);
            
            push();
            
            if(this.horizontal){
                // horizontal labels
                translate(-this.labelPadding, -this.barWidth/2);
                textAlign(RIGHT, CENTER);
                rotate(-this.labelRotation);
            }else{
                // vertical labels
                translate(this.barWidth/2,this.labelPadding);
                textAlign(LEFT, CENTER);
                rotate(this.labelRotation);
            }
            text(labels[i],0,0)
            pop();
            
            this.horizontal ? translate(0, -gap-this.barWidth) : translate(gap+this.barWidth,0);
        }
        pop();
        

        let tickGap = (this.horizontal) ? this.chartWidth/5 : this.chartHeight/5;
        let tickValue = (this.fullBar) ? 100/this.numOfTicks : maxValue/this.numOfTicks;

        // this draws the vertical elements
        for(let i=1;i<=5;i++){
            stroke(this.axisLineColour)
            fill(this.labelColour);
            textSize(this.labelTextSize);
            
            if(this.horizontal){
                // horizontal ticks
                line((i*tickGap),0,(i*tickGap),10);
                stroke(this.gridLineColour);
                line((i*tickGap),0,(i*tickGap),-this.chartHeight)
                noStroke();
                textAlign(CENTER);

                // ticks for 100% or regular
                (this.fullBar) ? text(Math.round(tickValue*i*10,)/10+"%",(i*tickGap),25) : text(Math.round(tickValue*i*10,)/10,(i*tickGap),25)
            }else{
                // vertical ticks
                line(0,-(i*tickGap),-10,-(i*tickGap));
                stroke(this.gridLineColour);
                line(0,-(i*tickGap),this.chartWidth,-(i*tickGap))
                noStroke();
                textAlign(RIGHT, CENTER);

                // ticks for 100% or regular
                (this.fullBar) ? text(Math.round(tickValue*i*10,)/10+"%",-15,-(i*tickGap)) : text(Math.round(tickValue*i*10,)/10,-15,-(i*tickGap))
            }
            
        }
        
        // title display
        push();
        translate(this.chartWidth/2,-this.chartHeight);
        textSize(this.titleSize);
        textAlign(CENTER)
        text(this.title, this.titleXOffset, -this.titleSize+this.titleYOffset);
        pop();

        // legend display
        if(numYValues > 1){
            // translate to the right side of the chart
            translate(this.chartWidth+this.legendPadding, -this.chartHeight/2);
            textSize(this.legendTextSize);
            textAlign(LEFT, CENTER);
            rectMode(CENTER);

            for(let i=0;i<numYValues;i++){
                fill(this.barColours[i % this.barColours.length]);
                // offsets below or above zero depending on what the y value is
                let yOffset = (((numYValues-1)/-2)+i)*this.legendTextSize*2;
                rect(0, yOffset, this.legendTextSize, this.legendTextSize);
                fill(this.legendTextColour);
                text(this.yValues[i], this.legendTextSize, yOffset);
            }
        }
        pop();
    }
}