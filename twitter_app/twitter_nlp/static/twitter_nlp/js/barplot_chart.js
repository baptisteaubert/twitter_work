function redraw_barplot(){
    let div_barplot = document.getElementById("bar_plot");
    let w = div_barplot.clientWidth;
    let h = 250

    //Create SVG element
    d3v4.select("#bar_plot_redraw").remove();
    d3v4.select("#popup").remove();
    var multi_tooltip_bar = document.querySelectorAll('#popup'), i;
    for (i = 0; i < multi_tooltip_bar.length; ++i) {
      multi_tooltip_bar[i].remove()
    }
    svg_barplot = svg_barplot_init.attr("width", w+40) //Pour afficher les valeurs en fin de courbe
                              .attr("height", h)
                              .attr("id", "bar_plot")
                              .append("g")
                              .attr("id", "bar_plot_redraw")
                              .attr("transform", `translate(${margin_barplot.left}, ${margin_barplot.top})`);

    x.range([0, w])
     .domain([0, d3v4.max(dataset_barplot, function(d) { return d.value; }) + 8]);
    y.range([h, 0])
      .padding(0.4)
      .domain(dataset_barplot.map(function(d) { return d.trig; }));

    draw_barplot()
}

function draw_barplot(){
   svg_barplot.append("g")
           .call(d3v4.axisLeft(y));

   svg_barplot.selectAll(".bar")
           .data(dataset_barplot)
           .enter()
           .append("rect")
           .attr("class", "bar")
           .attr("fill", function(d) { return d.color })
           .attr("x", 0)
           .attr("height", y.bandwidth())
           .attr("y", function(d) { return y(d.trig) + 2 })
           .attr("width", function(d) { return 0 })
           .transition()
           .duration(2000)
           .attr("width", function(d){ return x(d.value) });

   svg_barplot.selectAll(".bar")
              .data(dataset_barplot)
              .on("mouseout", function() {return mouseout_bar()})
              .on("mousemove", function(d) {return mousemove_bar(d.value, d.key, d3v4.event.pageX, d3v4.event.pageY) });


    let text_country = svg_barplot.append("g")
                                  .attr("font-size", 15)
                                  .attr("font-family", "sans-serif");

    let text_description = svg_barplot.append("g")
                                   .attr("font-size", 15)
                                   .attr("font-family", "sans-serif");

    text_description.selectAll(".bar")
                    .data(dataset_barplot)
                    .enter()
                    .append("text")
                    .attr("x", 5)
                    .attr("y", function(d) { return y(d.trig) })
                    .text(" ")
                    .transition()
                    .duration(1500)
                    .attr("x", function(d) { return x(d.value) - 10 })
                    .attr("y", function(d) { return y(d.trig) })
                    .delay(1500)
                    .text(function(d) { return d.value + "%" });

    let div_popup_bar = d3v4.select("body")
                            .append("div")
                            .attr("id", "popup")
                            .attr("class", "tooltip")
                            .style("opacity", 0);

   function mousemove_bar(percent_value, country, x, y){
      div_popup_bar.transition()
                   .duration(200)
                   .style("height", "50px")
                   .style("width", "100px")
                   .style("opacity", .9);
      div_popup_bar.html("<img src='/static/twitter_nlp/img/flags/" + country + ".png' style='height:15px'/><br>" + country.charAt(0).toUpperCase() + country.slice(1) + "<br>" + percent_value + "%")
                   .style("left", x + "px")
                   .style("top", y + "px");
    }

    function mouseout_bar(){
      div_popup_bar.transition()
               .duration(500)
               .style("width", "0px")
               .style("height", "0px")
               .style("opacity", 0);
    }
}
