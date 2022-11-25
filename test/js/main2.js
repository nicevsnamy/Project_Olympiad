// global constants
margin = 100,
svg_width = 500,
svg_height =  500,
center_buffer = 30,
line_width = 10;
label_size = 12;
point_radius = 7;

// made global for convinence, I know this is bad style but who cares
let country = "Brazil" // fixed for now, update to make dynamic
let year = "2016" //fixed for now, update to make dynamic
let season = "Summer"
let gdp_max = "100000" // max gdp range
let gdp_min = "0" //min range
let gdp_list = [] //fixed for now, update to make dynamic
let males_max = 478 //max num of male athletes
let males_max_summer = 478 //max num of male athletes
let males_max_winter = 210
let males_list = [] //fixed for now, update to make dynamic
let females_list = [] //fixed for now, update to make dynamic
let medals_max = 156 //max number of medals
let medals_max_summer = 156 //max number of medals
let medals_max_winter = 40
let medals_list = [] //fixed for now, update to make dynamic
let gii_max = 0 // lower is better
let gii_min = 1 // lower is better
let gii_list = []
let gdp = 0;
let males_females = 0;
let medals = 0;
let gii = 0;
let sliderTime = 0;

summer_years = [1980,1984,1988,1992,1996,2000,2004,2008,2012,2016]
winter_years = [1980,1984,1988,1992,1994,1998,2002,2006,2010,2014]


function main(){
    // create the height and width
    let svg = d3.select("svg")
        .attr("width",svg_width)
        .attr("height",svg_height);
    // define the margin excluded size
    let zone_width = svg.attr("width") - margin;
    let zone_height = svg.attr("height") - margin;
    d3.csv("every_stat_new2.csv", function(error, data) {
        if (error) {
            throw error;
        }
        // calculate values to display
        calculate_values(data)
        // render all the elements
        render(svg,zone_width,zone_height)

        var dataTime = []
        var dataTime2 = []
        
        // calculate the year values to store
        for(i = 0; i< summer_years.length;i++){
            dataTime[i] = new Date(summer_years[i],10,3)
            dataTime2[i] = new Date(winter_years[i],10,3)
        }

        // create the year slider for summer
        sliderTime = d3
          .sliderBottom()
          .min(d3.min(dataTime))
          .max(d3.max(dataTime))
          .step(4000 * 60 * 60 * 24 * 365)
          .width(900)
          .tickFormat(d3.timeFormat('%Y'))
          .tickValues(dataTime)
          .default(new Date(2016, 10, 3))
          .on('onchange', val => {
            temp = parseInt(document.getElementById("value-time").innerHTML)
            if (season == "Summer"){
                if(temp != year){
                    year = temp
                    country = translate_summer_host(country)
                    console.log(year)
                    clear_values()
                    calculate_values(data)
                    update_points(svg)
                }
            }else if (season == "Winter"){
                // map the temp year to the winter equivalent
                if(temp == 1996){
                    temp = 1994
                }else if(temp == 2000){
                    temp = 1998
                }else if(temp == 2004){
                    temp = 2002
                }else if(temp == 2008){
                    temp = 2006
                }else if(temp == 2012){
                    temp = 2010
                }else if(temp == 2016){
                    temp = 2014
                }

                if(temp != year){
                    year = temp
                    country = translate_winter_host(country)
                    console.log(year)
                    clear_values()
                    calculate_values(data)
                    update_points(svg)
                }
            }
            d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
          });
      
        var gTime = d3
          .select('div#slider-time')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 100)
          .append('g')
          .attr('transform', 'translate(30,30)');
      
        gTime.call(sliderTime);
      
        d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
        
        // input form to select countries
        
        // update button, will change to a slider later on
        d3.select("button")
            .on("click", function() {
                clear_values()
                calculate_values(data)
                update_points(svg)
            });
        var elem = document.getElementById('mySelect');
        var currElem = document.getElementById('current');

        currElem.innerHTML = elem.value;

        mySelect.onchange = function(e) {
            currElem.innerHTML = e.target.value;
            console.log(e.target.value)
            season = e.target.value
            if(season == "Summer"){
                medals_max = medals_max_summer;
                males_max = males_max_summer;
                year = translate_to_summer(year)
                country = translate_summer_host(country)
                clear_values()
                calculate_values(data)
                update_points(svg)
            }
            if(season == "Winter"){
                medals_max = medals_max_winter;
                males_max = males_max_winter;
                console.log(year)
                year = translate_to_winter(year)
                country = translate_winter_host(country)
                console.log(year)
                clear_values()
                calculate_values(data)
                update_points(svg)
            }
        }
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
        if(data[i].Country == country && data[i].Year == year && data[i].Season == season){
            gdp_list.push(data[i].Gdp)
            males_list.push(data[i].Males)
            females_list.push(data[i].Females)
            medals_list.push((parseInt(data[i].Gold) + parseInt(data[i].Silver) + parseInt(data[i].Bronze)))
            gii_list.push(data[i].Gii)
            console.log(gii_list[0])
            console.log(gdp_list[0])
            console.log(medals_list[0])
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
    .attr("fill",function(){
        if (parseInt(gdp_list[0]) == -1){
            return "red"
        }else{
            return "black"
        }
    })

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
    // update male female scale based on seaason
    if(season == "Winter"){
        svg.selectAll("#males_females_max")
            .text(males_max_winter);
    }else if(season == "Summer"){
        svg.selectAll("#males_females_max")
            .text(males_max);
    }
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
        .attr("fill","black")
    //update the max for winter
    if(season == "Winter"){
        svg.selectAll("#medals_max")
            .text(medals_max_winter);
    }
    if(season == "Summer"){
        svg.selectAll("#medals_max")
            .text(medals_max);
    }
    svg.selectAll("#gii_circle")
        .transition() // <---- Here is the transition
        .duration(1000) // 1 seconds
        .attr("cx",gii.attr("x1"))
        .attr("id","gii_circle")
        .attr("cy",function(){
            let ratio = (gii_list[0])
            // invert for this line
            if (parseInt(gii_list[0])==-1){
                ratio = 1
            }
            return ratio * (gii.attr("y1")-gii.attr("y2")) - (-1*gii.attr("y2"));
        })
        .attr("r",point_radius)
        .attr("fill",function(){
            if (gii_list[0] == -1){
                return "#ffce01"
            }else{
                return "Black"
            }
        })

    document.getElementById("country_name").textContent = "Host: "+country + ": " + year;
}

function render(svg,zone_width,zone_height){

    // render the squaress
    var background = svg.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("height",svg_height)
        .attr("width",svg_width)
        .attr("fill","#EAEAEA")
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
        .attr("fill","Black")
        .attr("font-size",label_size+"px");
    var gdp_min_text = svg.append("text")
        .attr("id","gdp_min")
        .text(gdp_min)
        .attr("x",gdp.attr("x2")-(-10))// freaking doesn't work with plus
        .attr("y",gdp.attr("y1")-(-1*line_width/2))// freaking doesn't work with plus
        .attr("fill","Black")
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
        .attr("stroke","#179a13")
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
        .attr("fill","Black")
        .attr("font-size",label_size+"px");
    var males_females_min_text = svg.append("text")
        .attr("id","males_females_min")
        .text(0)
        .attr("x",males_females.attr("x1")-(20))// freaking doesn't work with plus
        .attr("y",males_females.attr("y1")-(-1*line_width/2))// freaking doesn't work with plus
        .attr("fill","Black")
        .attr("font-size",label_size+"px");
    var males_females_label = svg.append("text")
        .attr("id","males_females_label")
        .text("Male/Female Athletes")
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
        .attr("fill","Black")
    var medals_max_text = svg.append("text")
        .attr("id","medals_max")
        .text(medals_max)
        .attr("x",medals.attr("x1")-line_width)
        .attr("y",medals.attr("y1") - 10)
        .attr("fill","Black")
        .attr("font-size",label_size+"px");
    var medals_min_text = svg.append("text")
        .attr("id","medals_min")
        .text(0)
        .attr("x",medals.attr("x2")-line_width/2)// freaking doesn't work with plus
        .attr("y",medals.attr("y2")- (-1*label_size))// freaking doesn't work with plus
        .attr("fill","Black")
        .attr("font-size",label_size+"px");
    var medals_label = svg.append("text")
        .attr("id","medals_label")
        .text("Medal Count")
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
        .attr("stroke","#ffce01")
        .attr("stroke-width",10);
    var gii_circle = svg.append("circle")
        .attr("cx",gii.attr("x1"))
        .attr("id","gii_circle")
        .attr("cy",function(){
            let ratio = (gii_list[0])
            // invert for this line
            if (parseInt(gii_list[0])==-1){
                ratio = 1
            }
            return ratio * (gii.attr("y1")-gii.attr("y2")) - (-1*gii.attr("y2"));
        })
        .attr("r",point_radius)
        .attr("fill",function(){
            if (gii_list[0] == -1){
                return "#ffce01"
            }else{
                return "Black"
            }
        })
    var gii_max_text = svg.append("text")
        .attr("id","gii_max")
        .text(gii_max)
        .attr("x",gii.attr("x2")-line_width/2)// freaking doesn't work with plus
        .attr("y",gii.attr("y2")- (-1*label_size))// freaking doesn't work with plus
        .attr("fill","Black")
        .attr("font-size",label_size+"px");
    var gii_min_text = svg.append("text")
        .attr("id","gii_min")
        .text(gii_min)
        .attr("x",gii.attr("x1")-line_width/2)
        .attr("y",gii.attr("y1") - 10)
        .attr("fill","Black")
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
    document.getElementById("country_name").style.color = "White";
    document.getElementById("country_name").style.width = 4+svg_width + "px";
    document.getElementById("country_name").style.height = margin/4 + "px";
    document.getElementById("country_name").textContent = "Host: "+country + ": " + year;
}
function translate_to_winter(temp){
    if(temp == 1996){
        temp = 1994
    }else if(temp == 2000){
        temp = 1998
    }else if(temp == 2004){
        temp = 2002
    }else if(temp == 2008){
        temp = 2006
    }else if(temp == 2012){
        temp = 2010
    }else if(temp == 2016){
        temp = 2014
    }
    return temp
}
function translate_winter_host(country){
    if(year == 1980){
        country = "USA"
    }
    if(year == 1984){
        country = "Yugoslavia"
    }
    if(year == 1988){
        country = "Canada"
    }
    if(year == 1992){
        country = "France"
    }
    if(year == 1994){
        country = "Norway"
    }
    if(year == 1998){
        country = "Japan"
    }
    if(year == 2002){
        country = "USA"
    }
    if(year == 2006){
        country = "Italy"
    }
    if(year == 2010){
        country = "Canada"
    }
    if(year == 2014){
        country = "Russia"
    }
    return country
}
function translate_to_summer(temp){
    if(temp == 1994){
        temp = 1996
    }else if(temp == 1998){
        temp = 2000
    }else if(temp == 2002){
        temp = 2004
    }else if(temp == 2006){
        temp = 2008
    }else if(temp == 2010){
        temp = 2012
    }else if(temp == 2014){
        temp = 2016
    }
    return temp
}
function translate_summer_host(country){
    if(year == 1980){
        country = "Russia"
    }
    if(year == 1984){
        country = "USA"
    }
    if(year == 1988){
        country = "South Korea"
    }
    if(year == 1992){
        country = "Spain"
    }
    if(year == 1996){
        country = "USA"
    }
    if(year == 2000){
        country = "Australia"
    }
    if(year == 2004){
        country = "Greece"
    }
    if(year == 2008){
        country = "China"
    }
    if(year == 2012){
        country = "UK"
    }
    if(year == 2016){
        country = "Brazil"
    }
    return country
}