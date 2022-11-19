// d3.scaleLinear() to scale the data
/*
d3.json("data/age.json",function(d){
    var scale = d3.scaleLinear()
    .domain([500000,6000000])
    .range([50,500])

    var svg = d3.select("#graph").append('svg')
    .attr("height",300)
    .attr("width",800)
    .attr("style","background: blue");

    function render(data){
        var i = 0;
        var rects = svg.selectAll("rect")
        .data(data);

        //enter
        rects.enter()
        .append("rect")
        .attr("y",5)
        .attr("width",7)
        .attr("height", function(d){return scale(d["males"]); })
        .attr("x",function(d){return i+= 10;})

        //exit
        rects.exit().remove()
    }

    d.forEach( function(a){
        console.log("domain:" + a.total)
        console.log("domain:" + scale(a.total))
    })
    render(d)
});
*/

/*
Selecting DOM elements d3.select(), d3.selectAll()
*/
/*d3.select('h1').style('color','Blue')
    .style('color','Green')
    .style('font-size','32px')
    .attr('class','newClass')
    .text("New header text")
d3.select('body').append('button').text('Click Me')
d3.select('#graph').text("New graphs")
d3.csv("test.csv",function(d){
    console.log(d)
    console.log("hello")
    //let dataset = [1,2,3,4,5,6,7]
    d3.select('body')
        .selectAll('div')
        .data(d)
        .enter()
        .append('div')
        .text(function(d){return d;});

});*/
function main(){
    var dataset = [80,90,22,36]
    var svgWidth = 1000, svgHeight = 500, barPadding = 5
    var barWidth = (svgWidth/dataset.length);

    var svg = d3.select('svg')
        .attr('width',svgWidth)
        .attr('height',svgHeight);

    var yScale = d3.scaleLinear()
        .domain([0,100])
        .range([0,svgHeight]);

    var barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr('class',function(d,i){
            return "New Class" + i + "!"
        })
        .attr("y",function(d){
            //console.log(svgHeight-yScale(d))
            return svgHeight- yScale(d);
        })
        .attr("height",function(d){
            //console.log(yScale(d))
            return yScale(d);
        })
        .attr("width",barWidth-barPadding)
        .attr("transform", function(d,i){
            var translate = [barWidth * i,0];
            return "translate("+ translate + ")";
        });

    var text = svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("y",function(d,i){
            return 100;
        })
        .attr("x",function(d,i){
            return barWidth * i;
        })
        .attr("fill","Green")
        .attr("font-size","32px");
    var line = svg.append("line")
        .attr("x1",100)
        .attr("y1",30)
        .attr("x2",500)
        .attr("y2",300)
        .attr("stroke","red")
        .attr("stroke-width",20);
    var circle = svg.append("circle")
        .attr("cx",150)
        .attr("cy",300)
        .attr("r",40)
        .attr("fill","blue")
}