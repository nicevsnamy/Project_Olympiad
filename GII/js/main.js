let country = "Canada"
let gii_values = [-1,-1,-1,-1,-1,-1,-1,-1,-1]
let ratio_values = [2,2,2,2,2,2,2,2,2]
let count = 0
let year_width = 0
let margin = 0
let radius = 10
let start_year = 1994
let end_year = 2016
let border_colour = "Black"
let border_radius = 2

function main(){
    margin = {top: 10, right: 30, bottom: 40, left: 60},
        width = 900 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("every_stat_new2.csv", function(data) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain([start_year, end_year])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height + margin.top + 30)
        .text("Year");

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+20)
        .attr("x", -height/2 - (-50))
        .text("Gender Inequality Index")

    // calculate the values
    calculate_values(data)
    document.getElementById("current_country").innerHTML = "Current Country: "+ country;
    calculate_year_width()
    
    // render the circles
    render(data,svg)
    d3.select("button")
    .on("click", function() {
        calculate_values(data)
        update_points(data,svg)
    });

    })
}
function calculate_values(data){
    for (var i = 0; i < data.length; i++) {
        if(data[i].Country == country && data[i].Year == "1996"){
            gii_values[0] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[0] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[0] = 1.0;
                }else{
                    ratio_values[0] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2000"){
            gii_values[1] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[1] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[1] = 1.0;
                }else{
                    ratio_values[1] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2006"){
            gii_values[2] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[2] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[2] = 1.0;
                }else{
                    ratio_values[2] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2010"){
            gii_values[3] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[3] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[3] = 1.0;
                }else{
                    ratio_values[3] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2011"){
            gii_values[4] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[4] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[4] = 1.0;
                }else{
                    ratio_values[4] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2012"){
            gii_values[5] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[5] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[5] = 1.0;
                }else{
                    ratio_values[5] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2013"){
            gii_values[6] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[6] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[6] = 1.0;
                }else{
                    ratio_values[6] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2014"){
            gii_values[7] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[7] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[7] = 1.0;
                }else{
                    ratio_values[7] = 2.0;
                }
            }
        }
        if(data[i].Country == country && data[i].Year == "2016"){
            gii_values[8] = data[i].Gii
            // calculate the ratio
            if(data[i].females != 0){
                temp = data[i].Males/data[i].Females
                if(temp > 2){
                    temp = 2;
                }
                if (temp < 0.5){
                    temp = 0.5;
                }
                ratio_values[8] = temp
            }else{
                if(data[i].males == 0){
                    ratio_values[8] = 1.0;
                }else{
                    ratio_values[8] = 2.0;
                }
            }
        }
    }
}
function calculate_year_width(){
    year_range = end_year-start_year
    year_width = width / year_range
}
function render(data,svg){
    
    // create 1995
    let c_1995 = svg.append("circle")
        .attr("cx",year_width*(1995-start_year))
        .attr("id","c_1995")
        .attr("stroke", function(){
            if(is_valid(gii_values[0])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[0]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(1996);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[0]);
        })
    // create 2000
    let c_2000 = svg.append("circle")
        .attr("cx",year_width*(2000-start_year))
        .attr("id","c_2000")
        .attr("stroke", function(){
            if(is_valid(gii_values[1])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[1]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2000);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[1]);
        })
    // create 2005
    let c_2005 = svg.append("circle")
        .attr("cx",year_width*(2005-start_year))
        .attr("id","c_2005")
        .attr("stroke", function(){
            if(is_valid(gii_values[2])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[2]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2006);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[2]);
        })
    // create 2010
    let c_2010 = svg.append("circle")
        .attr("cx",year_width*(2010-start_year))
        .attr("id","c_2010")
        .attr("stroke", function(){
            if(is_valid(gii_values[3])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[3]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2010);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[3]);
        })
    // create 2011
    let c_2011 = svg.append("circle")
        .attr("cx",year_width*(2011-start_year))
        .attr("id","c_2011")
        .attr("stroke", function(){
            if(is_valid(gii_values[4])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[4]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2011);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[4]);
        })
    // create 2012
    let c_2012 = svg.append("circle")
        .attr("cx",year_width*(2012-start_year))
        .attr("id","c_2012")
        .attr("stroke", function(){
            if(is_valid(gii_values[5])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[5]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2012);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[5]);
        })
    // create 2013
    let c_2013 = svg.append("circle")
        .attr("cx",year_width*(2013-start_year))
        .attr("id","c_2013")
        .attr("stroke", function(){
            if(is_valid(gii_values[6])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[6]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2013);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[6]);
        })
    // create 2014
    let c_2014 = svg.append("circle")
        .attr("cx",year_width*(2014-start_year))
        .attr("id","c_2014")
        .attr("stroke", function(){
            if(is_valid(gii_values[7])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[7]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2014);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[7]);
        })
    // create 2015
    let c_2015 = svg.append("circle")
        .attr("cx",year_width*(2015-start_year))
        .attr("id","c_2015")
        .attr("stroke", function(){
            if(is_valid(gii_values[8])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[8]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2016);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[8]);
        })
    
}
function update_points(data,svg){
    // Update 1995
    svg.selectAll("#c_1995")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",year_width*(1995-start_year))
        .attr("id","c_1995")
        .attr("stroke", function(){
            if(is_valid(gii_values[0])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[0]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(1996);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[0]);
        })
    // Update 2000
    svg.selectAll("#c_2000")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",year_width*(2000-start_year))
        .attr("id","c_2000")
        .attr("stroke", function(){
            if(is_valid(gii_values[1])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[1]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2000);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[1]);
        })
    // Update 2005
    svg.selectAll("#c_2005")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",year_width*(2005-start_year))
        .attr("id","c_2005")
        .attr("stroke", function(){
            if(is_valid(gii_values[2])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[2]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2006);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[2]);
        })
    // Update 2010
    svg.selectAll("#c_2010")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",year_width*(2010-start_year))
        .attr("id","c_2010")
        .attr("stroke", function(){
            if(is_valid(gii_values[3])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[3]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2010);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[3]);
        })
    // Update 2011
    svg.selectAll("#c_2011")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",year_width*(2011-start_year))
        .attr("id","c_2011")
        .attr("stroke", function(){
            if(is_valid(gii_values[4])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[4]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2011);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[4]);
        })
    // Update 2012
    svg.selectAll("#c_2012")
        .transition() // <---- Here is the transition
        .attr("cx",year_width*(2012-start_year))
        .attr("id","c_2012")
        .attr("stroke", function(){
            if(is_valid(gii_values[5])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[5]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2012);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[5]);
        })
    // Update 2013
    svg.selectAll("#c_2013")
        .transition() // <---- Here is the transition
        .attr("cx",year_width*(2013-start_year))
        .attr("id","c_2013")
        .attr("stroke", function(){
            if(is_valid(gii_values[6])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[6]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2013);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[6]);
        })
    // Update 2014
    svg.selectAll("#c_2014")
        .transition() // <---- Here is the transition
        .attr("cx",year_width*(2014-start_year))
        .attr("id","c_2014")
        .attr("stroke", function(){
            if(is_valid(gii_values[7])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[7]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2014);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[7]);
        })
    // Update 2015
    svg.selectAll("#c_2015")
        .transition() // <---- Here is the transition
        .attr("cx",year_width*(2015-start_year))
        .attr("id","c_2015")
        .attr("stroke", function(){
            if(is_valid(gii_values[8])){
                return border_colour
            }else{
                return "White"
            }
        })
        .attr("stroke-width", border_radius)
        .attr("cy",function(){
            // get the value from the calculated value
            value = gii_values[8]
            // invert the value
            value = 1-value
            return value * height
        })
        .attr("r",function(){
            return check_host_radius(2016);
        })
        .attr("fill",function(){
            return ratio_to_colour(ratio_values[8]);
        })
}
function ratio_to_colour(ratio){
    // high males
    if(ratio >= 2){
        return "#5e4fa2" // dark blue
    }else if (ratio >= 1.775 && ratio < 2){
        return "#3288bd" // light blue
    }else if (ratio >= 1.55 && ratio < 1.775){
        return "#66c2a5" // bluey green
    }else if (ratio >= 1.3 && ratio < 1.55){
        return "#abdda4" // greeny blue
    }else if (ratio >= 1.1 && ratio < 1.3){
        return "#e6f598" // greeny yellow
    }else if (ratio >= 0.9 && ratio < 1.1){
        return "#ffffbf" // yellow
    }else if (ratio >= 0.8 && ratio < 0.9){
        return "#fee08b" // orangy yellow
    }else if (ratio >= 0.7 && ratio < 0.8){
        return "#fdae61" // light orange
    }else if (ratio >= 0.6 && ratio < 0.7){
        return "#f46d43" // orange
    }else if (ratio >= 0.5 && ratio < 0.6){
        return "#d53e4f" // reddy orange
    }else if (ratio < 0.5){
        return "#9e0142" // red
    }
}
function check_host_radius(year){
    if (year == 1996 && country == "USA"){
        return radius * 2;
    }
    if (year == 2000 && country == "Australia"){
        return radius * 2;
    }
    if (year == 2006 && country == "Italy"){
        return radius * 2;
    }
    if (year == 2010 && country == "Canada"){
        return radius * 2;
    }
    if (year == 2012 && country == "UK"){
        return radius * 2;
    }
    if (year == 2014 && country == "Russia"){
        return radius * 2;
    }
    if (year == 2016 && country == "Brazil"){
        return radius * 2;
    }
    return radius
}
function is_valid(data){
    if (data == "-1"){
        return false;
    }
    return true;
}
function input_country(){
    console.log("hi");
    country = document.getElementById("myInput").value;
    console.log(country);
    document.getElementById("myInput").value = "";
    document.getElementById("current_country").innerHTML = "Current Country: "+ country;
}