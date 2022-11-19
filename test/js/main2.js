// global constants
margin = 150,
svg_width = 900,
svg_height =  900,
center_buffer = 50,
line_width = 10;
label_size = 14;
point_radius = 7;

// made global for convinence, I know this is bad style but who cares
country = "canada" // fixed for now, update to make dynamic
year = "2019" //fixed for now, update to make dynamic
gdp_max = "8000" //fixed for now, update to make dynamic
gdp_min = "4000" //fixed for now, update to make dynamic
gdp_list = [] //fixed for now, update to make dynamic
males_max = 100 //fixed for now, update to make dynamic
males_list = [] //fixed for now, update to make dynamic
females_list = [] //fixed for now, update to make dynamic
medals_max = 10 //fixed for now, update to make dynamic
medals_list = [] //fixed for now, update to make dynamic
gii_max = 0 // lower is better
gii_min = 1 // lower is better
gii_list = []
let gdp = 0;
let males_females = 0;
let medals = 0;
let gii = 0;


function main(){
    // create the height and width
    let svg = d3.select("svg")
        .attr("width",svg_width)
        .attr("height",svg_height);
    // define the margin excluded size
    let zone_width = svg.attr("width") - margin;
    let zone_height = svg.attr("height") - margin;
    d3.csv("test.csv", function(error, data) {
        if (error) {
            throw error;
        }

        // calculate values to display
        calculate_values(data)
        // render all the elements
        render(svg,zone_width,zone_height)
        
        // update button, will change to a slider later on
        d3.select("button")
            .on("click", function() {
                year = 2021
                clear_values()
                calculate_values(data)
                update_points(svg)
            });
    });
}
function clear_values(){
    for(var i = 0; i < gdp_list.length; i++){
        gdp_list.pop()
    }
    for(var i = 0; i < males_list.length; i++){
        males_list.pop()
        females_list.pop()
    }
    for(var i = 0; i < medals_list.length; i++){
        medals_list.pop()
    }
    for(var i = 0; i < gii_list.length; i++){
        gii_list.pop()
    }
}
function calculate_values(data){
    for (var i = 0; i < data.length; i++) {
        if(data[i].country == country && data[i].year == year){
            gdp_list.push(data[i].gdp)
            males_list.push(data[i].males)
            females_list.push(data[i].females)
            medals_list.push(data[i].gold)
            gii_list.push(data[i].gii)
        }
    }
}
function update_points(svg){
    //Update the gdp point
    svg.selectAll("#gdp_circle")
      .transition() // <---- Here is the transition
      .duration(1000) // 2 seconds
      .attr("cx",function(){
        // calculate how far on the scale the circle should appear
        let ratio = (gdp_list[0]-gdp_min)/(gdp_max-gdp_min)
        // invert for this line
        ratio = 1-ratio
        return ratio * (gdp.attr("x2")-margin/2) + margin/2;
    })
    .attr("id","gdp_circle")
    .attr("cy",gdp.attr("y1"))
    .attr("r",point_radius)
    .attr("fill","black")

    // update the males/females points
    svg.selectAll("#males_circle")
       .transition() // <---- Here is the transition
       .duration(1000) // 1 seconds
       .attr("cx",function(){
        // calculate how far on the scale the circle should appear
        let ratio = (males_list[0]-0)/(males_max-0)
        return males_females.attr("x1") - (-1*ratio * (males_females.attr("x2")-males_females.attr("x1")));// freaking doesn't work with plus
        })
        .attr("id","males_circle")
        .attr("cy",males_females.attr("y1"))
        .attr("r",point_radius)
        .attr("fill","Blue")
    svg.selectAll("#females_circle")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",function(){
            // calculate how far on the scale the circle should appear
            let ratio = (females_list[0]-0)/(males_max-0)
            return males_females.attr("x1") - (-1*ratio * (males_females.attr("x2")-males_females.attr("x1")));// freaking doesn't work with plus
        })
        .attr("id","females_circle")
        .attr("cy",males_females.attr("y1"))
        .attr("r",point_radius)
        .attr("fill","pink")
    svg.selectAll("#medals_circle")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",medals.attr("x1"))
        .attr("id","medals_circle")
        .attr("cy",function(){
            let ratio = (medals_list[0]-0)/(medals_max-0)
            // invert for this line
            ratio = 1-ratio
            return ratio * (medals.attr("y2")-margin/2) + margin/2;
        })
        .attr("r",point_radius)
        .attr("fill","Gold")
    svg.selectAll("#gii_circle")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",gii.attr("x1"))
        .attr("id","gii_circle")
        .attr("cy",function(){
            let ratio = (gii_list[0])
            // invert for this line
            return ratio * (gii.attr("y2")-gii.attr("y1")) - (-1*gii.attr("y1"));
        })
        .attr("r",point_radius)
        .attr("fill","Red")
    document.getElementById("country_name").textContent = country + ": " + year;
}

function render(svg,zone_width,zone_height){

    // render the squaress
    var background = svg.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("height",svg_height)
        .attr("width",svg_width)
        .attr("fill","purple")
    var zone = svg.append("rect")
        .attr("x",margin/2)
        .attr("y",margin/2)
        .attr("height",zone_height)
        .attr("width",zone_width)
        .attr("fill","#EAEAEA")

    // render gdp line, point and labels
    gdp = svg.append("line")
        .attr("x1",margin/2)
        .attr("y1",svg_height/2)
        .attr("x2",zone_width/2 + margin/2-center_buffer)
        .attr("y2",svg_height/2)
        .attr("stroke","red")
        .attr("stroke-width",10);
    var gdp_circle = svg.append("circle")
        .attr("cx",function(){
            // calculate how far on the scale the circle should appear
            let ratio = (gdp_list[0]-gdp_min)/(gdp_max-gdp_min)
            // invert for this line
            ratio = 1-ratio
            return ratio * (gdp.attr("x2")-margin/2) + margin/2;
        })
        .attr("id","gdp_circle")
        .attr("cy",gdp.attr("y1"))
        .attr("r",point_radius)
        .attr("fill","black")
    var gdp_max_text = svg.append("text")
        .attr("id","gdp_max")
        .text(gdp_max)
        .attr("x",gdp.attr("x1")-50)
        .attr("y",gdp.attr("y1")-(-1*line_width/2))
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var gdp_min_text = svg.append("text")
        .attr("id","gdp_min")
        .text(gdp_min)
        .attr("x",gdp.attr("x2")-(-10))// freaking doesn't work with plus
        .attr("y",gdp.attr("y1")-(-1*line_width/2))// freaking doesn't work with plus
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var gdp_label = svg.append("text")
        .attr("id","gdp_label")
        .text("GDP Per Capita")
        .attr("x",(gdp.attr("x2")-gdp.attr("x1"))/2)// freaking doesn't work with plus
        .attr("y",gdp.attr("y1")-(line_width*1.1))
        .attr("fill","Black")
        .attr("font-size",label_size+"px");

    // render the males and females 
    males_females = svg.append("line")
        .attr("x1",zone_width/2 + margin/2 + center_buffer)
        .attr("y1",svg_height/2)
        .attr("x2",zone_width + margin/2)
        .attr("y2",svg_height/2)
        .attr("stroke","Green")
        .attr("stroke-width",10);
    var males_circle = svg.append("circle")
        .attr("cx",function(){
            // calculate how far on the scale the circle should appear
            let ratio = (males_list[0]-0)/(males_max-0)
            return males_females.attr("x1") - (-1*ratio * (males_females.attr("x2")-males_females.attr("x1")));// freaking doesn't work with plus
        })
        .attr("id","males_circle")
        .attr("cy",males_females.attr("y1"))
        .attr("r",point_radius)
        .attr("fill","Blue")
    var female_circle = svg.append("circle")
        .attr("cx",function(){
            // calculate how far on the scale the circle should appear
            let ratio = (females_list[0]-0)/(males_max-0)
            return males_females.attr("x1") - (-1*ratio * (males_females.attr("x2")-males_females.attr("x1")));// freaking doesn't work with plus
        })
        .attr("id","females_circle")
        .attr("cy",males_females.attr("y1"))
        .attr("r",point_radius)
        .attr("fill","pink")
    var males_females_max_text = svg.append("text")
        .attr("id","males_females_max")
        .text(males_max)
        .attr("x",males_females.attr("x2")-(-10))
        .attr("y",males_females.attr("y1")-(-1*line_width/2))
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var males_females_min_text = svg.append("text")
        .attr("id","males_females_min")
        .text(0)
        .attr("x",males_females.attr("x1")-(20))// freaking doesn't work with plus
        .attr("y",males_females.attr("y1")-(-1*line_width/2))// freaking doesn't work with plus
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var males_females_label = svg.append("text")
        .attr("id","males_females_label")
        .text("# Of Male/Female Athletes")
        .attr("x",(males_females.attr("x2")-males_females.attr("x1"))/2 - (-1* males_females.attr("x1"))-50)// freaking doesn't work with plus
        .attr("y",males_females.attr("y1")-(line_width*1.1))
        .attr("fill","Black")
        .attr("font-size",label_size+"px");

    // render the medals
    medals = svg.append("line")
        .attr("x1",svg_width/2)
        .attr("y1",margin/2)
        .attr("x2",svg_width/2)
        .attr("y2",zone_height/2 + margin/2 - center_buffer)
        .attr("stroke","Blue")
        .attr("stroke-width",10);
    var medals_circle = svg.append("circle")
        .attr("cx",medals.attr("x1"))
        .attr("id","medals_circle")
        .attr("cy",function(){
            let ratio = (medals_list[0]-0)/(medals_max-0)
            // invert for this line
            ratio = 1-ratio
            return ratio * (medals.attr("y2")-margin/2) + margin/2;
        })
        .attr("r",point_radius)
        .attr("fill","Gold")
    var medals_max_text = svg.append("text")
        .attr("id","medals_max")
        .text(medals_max)
        .attr("x",medals.attr("x1")-line_width)
        .attr("y",medals.attr("y1") - 10)
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var medals_min_text = svg.append("text")
        .attr("id","medals_min")
        .text(0)
        .attr("x",medals.attr("x2")-line_width/2)// freaking doesn't work with plus
        .attr("y",medals.attr("y2")- (-1*label_size))// freaking doesn't work with plus
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var medals_label = svg.append("text")
        .attr("id","medals_label")
        .text("Gold Medal Count")
        .attr("x",(-1*medals.attr("y1") - (margin)))
        .attr("y",medals.attr("x1")-line_width)
        .attr("fill","Black")
        .attr("font-size",label_size+"px")
        .attr("transform", "translate(0,0) rotate(-90)" ); // hacky as heck
    
    // render gender inequality index
    gii = svg.append("line")
        .attr("x1",svg_width/2)
        .attr("y1",zone_height/2 + margin/2 + center_buffer)
        .attr("x2",svg_width/2)
        .attr("y2",zone_height + margin/2)
        .attr("stroke","Pink")
        .attr("stroke-width",10);
    var gii_circle = svg.append("circle")
        .attr("cx",gii.attr("x1"))
        .attr("id","gii_circle")
        .attr("cy",function(){
            let ratio = (gii_list[0])
            // invert for this line
            return ratio * (gii.attr("y2")-gii.attr("y1")) - (-1*gii.attr("y1"));
        })
        .attr("r",point_radius)
        .attr("fill","Red")
    var gii_max_text = svg.append("text")
        .attr("id","gii_max")
        .text(gii_max)
        .attr("x",gii.attr("x1")-line_width/2)
        .attr("y",gii.attr("y1") - 10)
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var gii_min_text = svg.append("text")
        .attr("id","gii_min")
        .text(gii_min)
        .attr("x",gii.attr("x2")-line_width/2)// freaking doesn't work with plus
        .attr("y",gii.attr("y2")- (-1*label_size))// freaking doesn't work with plus
        .attr("fill","Orange")
        .attr("font-size",label_size+"px");
    var gii_label = svg.append("text")
         .attr("transform", "translate(0,0) rotate(-90)" ) // hacky as heck
        .attr("id","gii_label")
        .text("Gender Inequality Index")
        .attr("x",(-1*gii.attr("y2")-(-1*margin/4))) // hacky as heck
        .attr("y",gii.attr("x1")-line_width)
        .attr("fill","Black")
        .attr("font-size",label_size+"px");
    // render the country name, will have to update later to make adaptive
    document.getElementById("country_name").style.color = "red";
    document.getElementById("country_name").style.width = svg_width + "px";
    document.getElementById("country_name").style.height = margin/4 + "px";
    document.getElementById("country_name").style.top = margin/4 + "px";
    document.getElementById("country_name").textContent = country + ": " + year;
}