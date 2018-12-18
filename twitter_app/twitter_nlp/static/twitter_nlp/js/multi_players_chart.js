function redraw_players(){
  if (dataset_players.length) {
    let w = div_players.clientWidth;
    let h = 500

    const innerW = w - margin_players.left - margin_players.right;
    const innerH = h - margin_players.top - margin_players.bottom;

    //Create SVG element
    d3v4.select("#plot_players_redraw").remove();
    d3v4.select("#ts_popup").remove();
    var multi_ts_tooltip = document.querySelectorAll('#ts_popup'), i;
    for (i = 0; i < multi_ts_tooltip.length; ++i) {
      multi_ts_tooltip[i].remove()
    }
    svg_players = svg_players_init.attr("width", w+40) //Pour afficher les valeurs en fin de courbe
                            .attr("height", h)
                            .attr("id", "players_chart")
                            .append("g")
                            .attr("id", "plot_players_redraw")
                            .attr("transform", `translate(${margin_players.left}, ${margin_players.top})`);

    x_players.range([0, innerW]);
    y_players.range([innerH, 0]);
    draw_players(dataset_players, innerW, innerH)
  }
}


function draw_players(data, innerW, innerH) {
      let dict_color = { "Switzerland":"red", "Germany":"#00ADB5", "England":"#CF081F", "Arabia":"#006C35", "Australia":"#003739", "Belgium":"#EF3340", "Brazil":"#002776", "Colombia":"#003893", "Costa":"#CE1126", "Denmark":"#C60C30", "Egypt":"#CE1126", "France":"#002395", "Iran":"#DA0000", "Morocco":"#C1272D", "Peru":"#D91023", "Poland":"crimson", "Portugal":"red", "Russia":"#D52B1E", "Spain":"#C60B1E", "Sweden":"#006BA8", "Tunisia":"#E70013", "Senegal": "#00853F", "Uruguay":"#84b0dc", "Argentina": "#75AADB", "Croatia": "red", "Mexico": "#006847", "Japan": "#0D3A5F"};

      let div_ts_popup = d3v4.select("body")
                  .append("div")
                  .attr("id", "ts_popup")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

      let valueline_Player1 = d3v4.line()
                                   .x(d => x_players(d.Time))
                                   .y(d => y_players(d.Percentage1))
                                   .curve(d3v4.curveCardinal);

      let valueline_Player2 = d3v4.line()
                                   .x(d => x_players(d.Time))
                                   .y(d => y_players(d.Percentage2))
                                   .curve(d3v4.curveCardinal);

      let valueline_Player3 = d3v4.line()
                                   .x(d => x_players(d.Time))
                                   .y(d => y_players(d.Percentage3))
                                   .curve(d3v4.curveCardinal);

      let valueline_Player4 = d3v4.line()
                                   .x(d => x_players(d.Time))
                                   .y(d => y_players(d.Percentage4))
                                   .curve(d3v4.curveCardinal);

      let valueline_Player5 = d3v4.line()
                                   .x(d => x_players(d.Time))
                                   .y(d => y_players(d.Percentage5))
                                   .curve(d3v4.curveCardinal);


      /* On ajoute groupé à la fenêtre initiale un axe à x au bon format (date) */
      svg_players.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + innerH + ")")
              .call(d3v4.axisBottom(x_players)
              .tickFormat(format_date))
              .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)");

      /* On ajoute groupé à la fenêtre initiale un axe à y */
      svg_players.append("g")
              .attr("class", "axis")
              .call(d3v4.axisLeft(y_players));

      /* On dessine la variable Player 1 */
      svg_players.append("path")
              .data([data])
              .attr("class", "line")
              .attr("id", "player1")
              .attr("d", valueline_Player1)
              .style("stroke", dict_color[Country_1])
              .transition() // On ajoute ces lignes pour dessiner les courbes en direct
              .duration(2000)
              .attrTween("stroke-dasharray", function() {
                  var len = this.getTotalLength();
                  return function(t) { return (d3v4.interpolateString("0," + len, len + ",0"))(t) };
              });

      /* On dessine la variable Player 2 */
      svg_players.append("path")
              .data([data])
              .attr("class", "line")
              .attr("id", "player2")
              .attr("d", valueline_Player2)
              .style("stroke", dict_color[Country_2])
              .transition() // On ajoute ces lignes pour dessiner les courbes en direct
              .duration(2000)
              .attrTween("stroke-dasharray", function() {
                  var len = this.getTotalLength();
                  return function(t) { return (d3v4.interpolateString("0," + len, len + ",0"))(t) };
              });

      /* On dessine la variable Player 3 */
      svg_players.append("path")
              .data([data])
              .attr("class", "line")
              .attr("id", "player3")
              .attr("d", valueline_Player3)
              .style("stroke", dict_color[Country_3])
              .transition() // On ajoute ces lignes pour dessiner les courbes en direct
              .duration(2000)
              .attrTween("stroke-dasharray", function() {
                  var len = this.getTotalLength();
                  return function(t) { return (d3v4.interpolateString("0," + len, len + ",0"))(t) };
              });

    /* On dessine la variable Player 4 */
    svg_players.append("path")
            .data([data])
            .attr("class", "line")
            .attr("id", "player4")
            .attr("d", valueline_Player4)
            .style("stroke", dict_color[Country_4])
            .transition() // On ajoute ces lignes pour dessiner les courbes en direct
            .duration(2000)
            .attrTween("stroke-dasharray", function() {
                var len = this.getTotalLength();
                return function(t) { return (d3v4.interpolateString("0," + len, len + ",0"))(t) };
            });

    /* On dessine la variable Player 5 */
    svg_players.append("path")
            .data([data])
            .attr("class", "line")
            .attr("id", "player5")
            .attr("d", valueline_Player5)
            .style("stroke", dict_color[Country_5])
            .transition() // On ajoute ces lignes pour dessiner les courbes en direct
            .duration(2000)
            .attrTween("stroke-dasharray", function() {
                var len = this.getTotalLength();
                return function(t) { return (d3v4.interpolateString("0," + len, len + ",0"))(t) };
            });

     let w_svg_in = document.getElementById("multi_playersChart")
     let position_image = w_svg_in.clientWidth


      /*MOUSEOVER*/
      svg_players.append("path")
                  .data([data])
                  .attr("class", "out-line")
                  .attr("id", "player1")
                  .attr("d", valueline_Player1)
                  .style("stroke", dict_color[Country_1])
                  .on("mousemove", function() {return mousemove_1(Country_1, Name_1, d3v4.event.pageX, d3v4.event.pageY)})
                  .on("mouseout", mouseout_1);

      svg_players.append("path")
                  .data([data])
                  .attr("class", "out-line")
                  .attr("id", "player2")
                  .attr("d", valueline_Player2)
                  .style("stroke", dict_color[Country_2])
                  .on("mousemove", function() {return mousemove_2(Country_2, Name_2, d3v4.event.pageX, d3v4.event.pageY)})
                  .on("mouseout", mouseout_2);

      svg_players.append("path")
                  .data([data])
                  .attr("class", "out-line")
                  .attr("id", "player3")
                  .attr("d", valueline_Player3)
                  .style("stroke", dict_color[Country_3])
                  .on("mousemove", function() {return mousemove_3(Country_3, Name_3, d3v4.event.pageX, d3v4.event.pageY)})
                  .on("mouseout", mouseout_3);

      svg_players.append("path")
                  .data([data])
                  .attr("class", "out-line")
                  .attr("id", "player4")
                  .attr("d", valueline_Player4)
                  .style("stroke", dict_color[Country_4])
                  .on("mousemove", function() {return mousemove_4(Country_4, Name_4, d3v4.event.pageX, d3v4.event.pageY)})
                  .on("mouseout", mouseout_4);

      svg_players.append("path")
                  .data([data])
                  .attr("class", "out-line")
                  .attr("id", "player5")
                  .attr("d", valueline_Player5)
                  .style("stroke", dict_color[Country_5])
                  .on("mousemove", function() {return mousemove_5(Country_5, Name_5, d3v4.event.pageX, d3v4.event.pageY)})
                  .on("mouseout", mouseout_5);


      let pos_player1 = svg_players.append("defs")
                          .attr("id", "imgdefs")

      x_circle_player = position_image-100 + (56/2)
      x_image_player = position_image-100

      let clipPath_player1 = pos_player1.append('clipPath')
                                  .attr('id', 'clip-circle_player1')
                                  .append("circle")
                                  .attr("r", - 5 + (56/2))
                                  .attr("cx", x_circle_player)
                                  .attr("cy", y_players(Percentage_1) -30 + (56/2));

     svg_players.append("circle")
              .style("fill", dict_color[Country_1])
              .attr("id", "circle1")
              .attr("r", -2 + (56/2))
              .attr("cx", x_circle_player)
              .attr("cy", y_players(Percentage_1) - 2);

      svg_players.append("image")
               .attr("x", x_image_player)
               .attr("y", y_players(Percentage_1) - 30)
               .attr('id', 'img-player1')
               .attr("height", 56)
               .attr("width", 56)
               .attr("xlink:href", "/static/twitter_nlp/img/players/" + Country_1 + "/" + Name_1 + ".jpg")
               .attr("clip-path", "url(#clip-circle_player1)")
               .on("mousemove", function() {return mousemove_1(Country_1, Name_1, d3v4.event.pageX, d3v4.event.pageY)})
               .on("mouseout", mouseout_1);


      let pos_player2 = svg_players.append("defs")
                          .attr("id", "imgdefs")
      let clipPath_player2 = pos_player2.append('clipPath')
                                  .attr('id', 'clip-circle_player2')
                                  .append("circle")
                                  .attr("r", - 5 + (56/2))
                                  //.attr("cx", x_players(older_date) - 100 + (56/2))
                                  .attr("cx", x_circle_player)
                                  .attr("cy", y_players(Percentage_2) -30 + (56/2));

     svg_players.append("circle")
              .style("fill", dict_color[Country_2])
              .attr("id", "circle2")
              .attr("r", -2 + (56/2))
              .attr("cx", x_circle_player)
              .attr("cy", y_players(Percentage_2) - 2);

      svg_players.append("image")
               .attr("x", x_image_player)
               .attr("y", y_players(Percentage_2) - 30)
               .attr('id', 'img-player2')
               .attr("height", 56)
               .attr("width", 56)
               .attr("xlink:href", "/static/twitter_nlp/img/players/" + Country_2 + "/" + Name_2 + ".jpg")
               .attr("clip-path", "url(#clip-circle_player2)")
               .on("mousemove", function() {return mousemove_2(Country_2, Name_2, d3v4.event.pageX, d3v4.event.pageY)})
               .on("mouseout", mouseout_2);



      let pos_player3 = svg_players.append("defs")
                          .attr("id", "imgdefs")
      let clipPath_player3 = pos_player3.append('clipPath')
                                  .attr('id', 'clip-circle_player3')
                                  .append("circle")
                                  .attr("r", - 5 + (56/2))
                                  .attr("cx", x_circle_player)
                                  .attr("cy", y_players(Percentage_3) -30 + (56/2));

     svg_players.append("circle")
              .style("fill", dict_color[Country_3])
              .attr("id", "circle3")
              .attr("r", -2 + (56/2))
              .attr("cx", x_circle_player)
              .attr("cy", y_players(Percentage_3) - 2);

      svg_players.append("image")
               .attr("x", x_image_player)
               .attr("y", y_players(Percentage_3) - 30)
               .attr('id', 'img-player3')
               .attr("height", 56)
               .attr("width", 56)
               .attr("xlink:href", "/static/twitter_nlp/img/players/" + Country_3 + "/" + Name_3 + ".jpg")
               .attr("clip-path", "url(#clip-circle_player3)")
               .on("mousemove", function() {return mousemove_3(Country_3, Name_3, d3v4.event.pageX, d3v4.event.pageY)})
               .on("mouseout", mouseout_3);



      let pos_player4 = svg_players.append("defs")
                          .attr("id", "imgdefs")
      let clipPath_player4 = pos_player4.append('clipPath')
                                  .attr('id', 'clip-circle_player4')
                                  .append("circle")
                                  .attr("r", - 5 + (56/2))
                                  .attr("cx", x_circle_player)
                                  .attr("cy", y_players(Percentage_4) -30 + (56/2));

     svg_players.append("circle")
              .style("fill", dict_color[Country_4])
              .attr("id", "circle4")
              .attr("r", -2 + (56/2))
              .attr("cx", x_circle_player)
              .attr("cy", y_players(Percentage_4) - 2);

      svg_players.append("image")
               .attr("x", x_image_player)
               .attr("y", y_players(Percentage_4) - 30)
               .attr('id', 'img-player4')
               .attr("height", 56)
               .attr("width", 56)
               .attr("xlink:href", "/static/twitter_nlp/img/players/" + Country_4 + "/" + Name_4 + ".jpg")
               .attr("clip-path", "url(#clip-circle_player4)")
               .on("mousemove", function() {return mousemove_4(Country_4, Name_4, d3v4.event.pageX, d3v4.event.pageY)})
               .on("mouseout", mouseout_4);


     let pos_player5 = svg_players.append("defs")
                         .attr("id", "imgdefs")
     let clipPath_player5 = pos_player5.append('clipPath')
                                 .attr('id', 'clip-circle_player5')
                                 .append("circle")
                                 .attr("r", - 5 + (56/2))
                                 .attr("cx", x_circle_player)
                                 .attr("cy", y_players(Percentage_5) -30 + (56/2));

    svg_players.append("circle")
             .style("fill", dict_color[Country_5])
             .attr("id", "circle5")
             .attr("r", -2 + (56/2))
             .attr("cx", x_circle_player)
             .attr("cy", y_players(Percentage_5) - 2);

     svg_players.append("image")
              .attr("x", x_image_player)
              .attr("y", y_players(Percentage_5) - 30)
              .attr('id', 'img-player5')
              .attr("height", 56)
              .attr("width", 56)
              .attr("xlink:href", "/static/twitter_nlp/img/players/" + Country_5 + "/" + Name_5 + ".jpg")
              .attr("clip-path", "url(#clip-circle_player5)")
              .on("mousemove", function() {return mousemove_5(Country_5, Name_5, d3v4.event.pageX, d3v4.event.pageY)})
              .on("mouseout", mouseout_5);

      /* La fonctions mousemove */
      function mousemove_1(country, name, x, y) {
        d3.select("#player1").attr("class", "hover-line")

        d3.select("#player2").style("opacity", "0.1")
        d3.select("#player3").style("opacity", "0.1")
        d3.select("#player4").style("opacity", "0.1")
        d3.select("#player5").style("opacity", "0.1")

        d3.select("#circle2").attr("cx", 2000)
        d3.select("#img-player2").attr("x", 2000)
        d3.select("#circle3").attr("cx", 2000)
        d3.select("#img-player3").attr("x", 2000)
        d3.select("#circle4").attr("cx", 2000)
        d3.select("#img-player4").attr("x", 2000)
        d3.select("#circle5").attr("cx", 2000)
        d3.select("#img-player5").attr("x", 2000)

        div_ts_popup.transition()
                 .duration(200)
                 .style("width", "100px")
                 .style("height", "50px")
                 .style("opacity", .9);
        div_ts_popup.html(name + "<br><center><img src='/static/twitter_nlp/img/flags/"+country+".png' style='height:15px'/></center>")
                 .style("left", x-50 + "px")
                 .style("top", y+20 + "px");
      }
      function mouseout_1(){
        d3.select("#player1").attr("class", "line")

        d3.select("#player2").style("opacity", "1")
        d3.select("#player3").style("opacity", "1")
        d3.select("#player4").style("opacity", "1")
        d3.select("#player5").style("opacity", "1")

        d3.select("#circle2").attr("cx", x_circle_player)
        d3.select("#img-player2").attr("x", x_image_player)
        d3.select("#circle3").attr("cx", x_circle_player)
        d3.select("#img-player3").attr("x", x_image_player)
        d3.select("#circle4").attr("cx", x_circle_player)
        d3.select("#img-player4").attr("x", x_image_player)
        d3.select("#circle5").attr("cx", x_circle_player)
        d3.select("#img-player5").attr("x", x_image_player)

        div_ts_popup.transition()
                 .duration(200)
                 .style("height", 0)
                 .style("opacity", 0);
      }


      function mousemove_2(country, name, x, y) {
        d3.select("#player2").attr("class", "hover-line")

        d3.select("#player1").style("opacity", "0.1")
        d3.select("#player3").style("opacity", "0.1")
        d3.select("#player4").style("opacity", "0.1")
        d3.select("#player5").style("opacity", "0.1")

        d3.select("#circle1").attr("cx", 2000)
        d3.select("#img-player1").attr("x", 2000)
        d3.select("#circle3").attr("cx", 2000)
        d3.select("#img-player3").attr("x", 2000)
        d3.select("#circle4").attr("cx", 2000)
        d3.select("#img-player4").attr("x", 2000)
        d3.select("#circle5").attr("cx", 2000)
        d3.select("#img-player5").attr("x", 2000)

        div_ts_popup.transition()
                 .duration(200)
                 .style("width", "100px")
                 .style("height", "50px")
                 .style("opacity", .9);
        div_ts_popup.html(name + "<br><center><img src='/static/twitter_nlp/img/flags/"+country+".png' style='height:15px'/></center>")
                 .style("left", x-50 + "px")
                 .style("top", y+20 + "px");
      }
      function mouseout_2(){
        d3.select("#player2").attr("class", "line")

        d3.select("#player1").style("opacity", "1")
        d3.select("#player3").style("opacity", "1")
        d3.select("#player4").style("opacity", "1")
        d3.select("#player5").style("opacity", "1")

        d3.select("#circle1").attr("cx", x_circle_player)
        d3.select("#img-player1").attr("x", x_image_player)
        d3.select("#circle3").attr("cx", x_circle_player)
        d3.select("#img-player3").attr("x", x_image_player)
        d3.select("#circle4").attr("cx", x_circle_player)
        d3.select("#img-player4").attr("x", x_image_player)
        d3.select("#circle5").attr("cx", x_circle_player)
        d3.select("#img-player5").attr("x", x_image_player)

        div_ts_popup.transition()
                 .duration(200)
                 .style("height", 0)
                 .style("opacity", 0);
      }


      function mousemove_3(country, name, x, y) {
        d3.select("#player3").attr("class", "hover-line")

        d3.select("#player1").style("opacity", "0.1")
        d3.select("#player2").style("opacity", "0.1")
        d3.select("#player4").style("opacity", "0.1")
        d3.select("#player5").style("opacity", "0.1")

        d3.select("#circle1").attr("cx", 2000)
        d3.select("#img-player1").attr("x", 2000)
        d3.select("#circle2").attr("cx", 2000)
        d3.select("#img-player2").attr("x", 2000)
        d3.select("#circle4").attr("cx", 2000)
        d3.select("#img-player4").attr("x", 2000)
        d3.select("#circle5").attr("cx", 2000)
        d3.select("#img-player5").attr("x", 2000)

        div_ts_popup.transition()
                 .duration(200)
                 .style("width", "100px")
                 .style("height", "50px")
                 .style("opacity", .9);
        div_ts_popup.html(name + "<br><center><img src='/static/twitter_nlp/img/flags/"+country+".png' style='height:15px'/></center>")
                 .style("left", x-50 + "px")
                 .style("top", y+20 + "px");
      }
      function mouseout_3(){
        d3.select("#player3").attr("class", "line")

        d3.select("#player1").style("opacity", "1")
        d3.select("#player2").style("opacity", "1")
        d3.select("#player4").style("opacity", "1")
        d3.select("#player5").style("opacity", "1")

        d3.select("#circle1").attr("cx", x_circle_player)
        d3.select("#img-player1").attr("x", x_image_player)
        d3.select("#circle2").attr("cx", x_circle_player)
        d3.select("#img-player2").attr("x", x_image_player)
        d3.select("#circle4").attr("cx", x_circle_player)
        d3.select("#img-player4").attr("x", x_image_player)
        d3.select("#circle5").attr("cx", x_circle_player)
        d3.select("#img-player5").attr("x", x_image_player)

        div_ts_popup.transition()
                 .duration(200)
                 .style("height", 0)
                 .style("opacity", 0);
      }


      function mousemove_4(country, name, x, y) {
        d3.select("#player4").attr("class", "hover-line")

        d3.select("#player1").style("opacity", "0.1")
        d3.select("#player2").style("opacity", "0.1")
        d3.select("#player3").style("opacity", "0.1")
        d3.select("#player5").style("opacity", "0.1")

        d3.select("#circle1").attr("cx", 2000)
        d3.select("#img-player1").attr("x", 2000)
        d3.select("#circle2").attr("cx", 2000)
        d3.select("#img-player2").attr("x", 2000)
        d3.select("#circle3").attr("cx", 2000)
        d3.select("#img-player3").attr("x", 2000)
        d3.select("#circle5").attr("cx", 2000)
        d3.select("#img-player5").attr("x", 2000)

        div_ts_popup.transition()
                 .duration(200)
                 .style("width", "100px")
                 .style("height", "50px")
                 .style("opacity", .9);
        div_ts_popup.html(name + "<br><center><img src='/static/twitter_nlp/img/flags/"+country+".png' style='height:15px'/></center>")
                 .style("left", x-50 + "px")
                 .style("top", y+20 + "px");
      }
      function mouseout_4(){
        d3.select("#player4").attr("class", "line")

        d3.select("#player1").style("opacity", "1")
        d3.select("#player2").style("opacity", "1")
        d3.select("#player3").style("opacity", "1")
        d3.select("#player5").style("opacity", "1")

        d3.select("#circle1").attr("cx", x_circle_player)
        d3.select("#img-player1").attr("x", x_image_player)
        d3.select("#circle2").attr("cx", x_circle_player)
        d3.select("#img-player2").attr("x", x_image_player)
        d3.select("#circle3").attr("cx", x_circle_player)
        d3.select("#img-player3").attr("x", x_image_player)
        d3.select("#circle5").attr("cx", x_circle_player)
        d3.select("#img-player5").attr("x", x_image_player)

        div_ts_popup.transition()
                 .duration(200)
                 .style("height", 0)
                 .style("opacity", 0);
      }


      function mousemove_5(country, name, x, y) {
        d3.select("#player5").attr("class", "hover-line")

        d3.select("#player1").style("opacity", "0.1")
        d3.select("#player2").style("opacity", "0.1")
        d3.select("#player3").style("opacity", "0.1")
        d3.select("#player4").style("opacity", "0.1")

        d3.select("#circle1").attr("cx", 2000)
        d3.select("#img-player1").attr("x", 2000)
        d3.select("#circle2").attr("cx", 2000)
        d3.select("#img-player2").attr("x", 2000)
        d3.select("#circle3").attr("cx", 2000)
        d3.select("#img-player3").attr("x", 2000)
        d3.select("#circle4").attr("cx", 2000)
        d3.select("#img-player4").attr("x", 2000)

        div_ts_popup.transition()
                 .duration(200)
                 .style("width", "100px")
                 .style("height", "50px")
                 .style("opacity", .9);
        div_ts_popup.html(name + "<br><center><img src='/static/twitter_nlp/img/flags/"+country+".png' style='height:15px'/></center>")
                  .style("left", x-50 + "px")
                  .style("top", y+20 + "px");
      }
      function mouseout_5(){
        d3.select("#player5").attr("class", "line")

        d3.select("#player1").style("opacity", "1")
        d3.select("#player2").style("opacity", "1")
        d3.select("#player3").style("opacity", "1")
        d3.select("#player4").style("opacity", "1")

        d3.select("#circle1").attr("cx", x_circle_player)
        d3.select("#img-player1").attr("x", x_image_player)
        d3.select("#circle2").attr("cx", x_circle_player)
        d3.select("#img-player2").attr("x", x_image_player)
        d3.select("#circle3").attr("cx", x_circle_player)
        d3.select("#img-player3").attr("x", x_image_player)
        d3.select("#circle4").attr("cx", x_circle_player)
        d3.select("#img-player4").attr("x", x_image_player)

        div_ts_popup.transition()
                 .duration(200)
                 .style("height", 0)
                 .style("opacity", 0);
      }


  }


function interaction(int_player) {

  if (int_player == 1){
    d3.select("#player1").attr("class", "hover-line")

    d3.select("#player2").style("opacity", "0.1")
    d3.select("#player3").style("opacity", "0.1")
    d3.select("#player4").style("opacity", "0.1")
    d3.select("#player5").style("opacity", "0.1")

    d3.select("#circle2").attr("cx", 2000)
    d3.select("#img-player2").attr("x", 2000)
    d3.select("#circle3").attr("cx", 2000)
    d3.select("#img-player3").attr("x", 2000)
    d3.select("#circle4").attr("cx", 2000)
    d3.select("#img-player4").attr("x", 2000)
    d3.select("#circle5").attr("cx", 2000)
    d3.select("#img-player5").attr("x", 2000)
  }

  if (int_player == 2){
    d3.select("#player2").attr("class", "hover-line")

    d3.select("#player1").style("opacity", "0.1")
    d3.select("#player3").style("opacity", "0.1")
    d3.select("#player4").style("opacity", "0.1")
    d3.select("#player5").style("opacity", "0.1")

    d3.select("#circle1").attr("cx", 2000)
    d3.select("#img-player1").attr("x", 2000)
    d3.select("#circle3").attr("cx", 2000)
    d3.select("#img-player3").attr("x", 2000)
    d3.select("#circle4").attr("cx", 2000)
    d3.select("#img-player4").attr("x", 2000)
    d3.select("#circle5").attr("cx", 2000)
    d3.select("#img-player5").attr("x", 2000)
  }

  if (int_player == 3){
    d3.select("#player3").attr("class", "hover-line")

    d3.select("#player1").style("opacity", "0.1")
    d3.select("#player2").style("opacity", "0.1")
    d3.select("#player4").style("opacity", "0.1")
    d3.select("#player5").style("opacity", "0.1")

    d3.select("#circle1").attr("cx", 2000)
    d3.select("#img-player1").attr("x", 2000)
    d3.select("#circle2").attr("cx", 2000)
    d3.select("#img-player2").attr("x", 2000)
    d3.select("#circle4").attr("cx", 2000)
    d3.select("#img-player4").attr("x", 2000)
    d3.select("#circle5").attr("cx", 2000)
    d3.select("#img-player5").attr("x", 2000)
  }

  if (int_player == 4){
    d3.select("#player4").attr("class", "hover-line")

    d3.select("#player1").style("opacity", "0.1")
    d3.select("#player2").style("opacity", "0.1")
    d3.select("#player3").style("opacity", "0.1")
    d3.select("#player5").style("opacity", "0.1")

    d3.select("#circle1").attr("cx", 2000)
    d3.select("#img-player1").attr("x", 2000)
    d3.select("#circle2").attr("cx", 2000)
    d3.select("#img-player2").attr("x", 2000)
    d3.select("#circle3").attr("cx", 2000)
    d3.select("#img-player3").attr("x", 2000)
    d3.select("#circle5").attr("cx", 2000)
    d3.select("#img-player5").attr("x", 2000)
  }

  if (int_player == 5){
    d3.select("#player5").attr("class", "hover-line")

    d3.select("#player1").style("opacity", "0.1")
    d3.select("#player2").style("opacity", "0.1")
    d3.select("#player3").style("opacity", "0.1")
    d3.select("#player4").style("opacity", "0.1")

    d3.select("#circle1").attr("cx", 2000)
    d3.select("#img-player1").attr("x", 2000)
    d3.select("#circle2").attr("cx", 2000)
    d3.select("#img-player2").attr("x", 2000)
    d3.select("#circle3").attr("cx", 2000)
    d3.select("#img-player3").attr("x", 2000)
    d3.select("#circle4").attr("cx", 2000)
    d3.select("#img-player4").attr("x", 2000)
  }
}

function init_draw_players(){
  d3.select("#player1").attr("class", "line")
  d3.select("#player2").attr("class", "line")
  d3.select("#player3").attr("class", "line")
  d3.select("#player4").attr("class", "line")
  d3.select("#player5").attr("class", "line")

  d3.select("#player1").style("opacity", "1")
  d3.select("#player2").style("opacity", "1")
  d3.select("#player3").style("opacity", "1")
  d3.select("#player4").style("opacity", "1")
  d3.select("#player5").style("opacity", "1")

  d3.select("#circle1").attr("cx", x_circle_player)
  d3.select("#img-player1").attr("x", x_image_player)
  d3.select("#circle2").attr("cx", x_circle_player)
  d3.select("#img-player2").attr("x", x_image_player)
  d3.select("#circle3").attr("cx", x_circle_player)
  d3.select("#img-player3").attr("x", x_image_player)
  d3.select("#circle4").attr("cx", x_circle_player)
  d3.select("#img-player4").attr("x", x_image_player)
  d3.select("#circle5").attr("cx", x_circle_player)
  d3.select("#img-player5").attr("x", x_image_player)
}
