class BarChart{
    constructor(obj){
        // This defines the default values for if values aren't given
        const defaults = {
            horizontal: false,
            fullBar: false,
            title: "Chart title",
            titleSize: 16,
            chartWidth: 300,
            chartHeight: 300,
            axisLineColour: "#FFFFFF",
            labelTextSize: 16,
            labelPadding: 10,
            labelColour: "#FFFFFF",
            labelRotation: 45,
            barWidth: ((obj.chartWidth || 300) / obj.data.length) * (2/3),
            barColours: ["#e54537", "#4ee537", "#37dce5", "#c537e5"],
            gridLineColour: "#666666",
        }
        
        // https://stackoverflow.com/questions/46496245/how-to-supply-default-values-to-es6-class-properties
        // This creates a new object starting from an empty object
        // It assigns the default values, then overwrites them with the user's values where provided
        let opts = Object.assign({}, defaults, obj);
        this.data = opts.data;
        this.horizontal = opts.horizontal;
        this.fullBar = opts.fullBar;
        this.title = opts.title;
        this.titleSize = opts.titleSize;
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

        let totalValues = [];
        this.data.forEach(row => {
            let sum = 0;
            this.yValues.forEach(y => {
                sum += +row[y];
            })
            totalValues.push(sum)
        });
        console.log(totalValues);

        let maxValue = max(totalValues);
        let scale = this.chartHeight / maxValue

        push();

        this.horizontal ? translate(0, -gap) : translate(gap, 0);
        for(let i=0; i<this.data.length; i++){
            // bars
            noStroke();
            push();
            fill(this.barColours[i % this.barColours.length]);
            for(let j=0; j<this.yValues.length; j++){
                this.yValues.length > 1 ? fill(this.barColours[j % this.barColours.length]) : ''                
                if(this.horizontal){
                    rect(0,0,this.data[i][this.yValues[j]]*scale,-this.barWidth);
                    translate(this.data[i][this.yValues[j]]*scale,0);
                }else{
                    rect(0,0,this.barWidth,-this.data[i][this.yValues[j]]*scale);
                    translate(0,-this.data[i][this.yValues[j]]*scale);
                }
            }
            pop();

            

            // labels
            fill(this.labelColour);
            noStroke();
            textSize(this.labelTextSize);
            push();
            
            if(this.horizontal){
                translate(-this.labelPadding, -this.barWidth/2);
                textAlign(RIGHT, CENTER);
                rotate(-this.labelRotation);
            }else{
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
        let tickValue = maxValue/5

        // this draws the vertical elements
        for(let i=0;i<=5;i++){
            stroke(this.axisLineColour)
            fill(this.labelColour);
            textSize(this.labelTextSize);
            
            if(this.horizontal){
                line((i*tickGap),0,(i*tickGap),10);
                stroke(this.gridLineColour);
                line((i*tickGap),0,(i*tickGap),-this.chartHeight)
                noStroke();
                textAlign(CENTER);
                text(Math.round(tickValue*i*10,)/10,(i*tickGap),25)
            }else{
                line(0,-(i*tickGap),-10,-(i*tickGap));
                stroke(this.gridLineColour);
                line(0,-(i*tickGap),this.chartWidth,-(i*tickGap))
                noStroke();
                textAlign(RIGHT, CENTER);
                text(Math.round(tickValue*i*10,)/10,-15,-(i*tickGap))
            }

            
            

            
            
        }
        
        // title display
        push();
        translate(this.chartWidth/2,-this.chartHeight);
        textSize(this.titleSize);
        textAlign(CENTER)
        text(this.title, 0, -this.titleSize)
        pop();

        // legend display

        pop();
    }
}