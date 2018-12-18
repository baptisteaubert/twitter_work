function redraw(){
  if (dataset_plot.length) {
    let w = div_plot.clientWidth;
    let h = 250

    const innerW = w - margin_plot.left - margin_plot.right;
    const innerH = h - margin_plot.top - margin_plot.bottom;

    //Create SVG element
    d3v4.select("#plot_chart_redraw").remove();
    svg_plot = svg_plot_init.attr("width", w+40) //Pour afficher les valeurs en fin de courbe
                            .attr("height", h)
                            .attr("id", "plot_chart")
                            .append("g")
                            .attr("id", "plot_chart_redraw")
                            .attr("transform", `translate(${margin_plot.left}, ${margin_plot.top})`);

    x_plot.range([0, innerW]);
    y_plot.range([innerH, 0]);
    draw(dataset_plot, innerW, innerH)

  }
}


function draw(data, innerW, innerH) {
      let valuelineDelivered = d3v4.line()
                                   .x(d => x_plot(d.Time))
                                   .y(d => y_plot(d.Positive))
                                   .curve(d3v4.curveCardinal);

      /* On ajoute groupé à la fenêtre initiale un axe à x au bon format (date) */
      svg_plot.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + innerH + ")")
              .call(d3v4.axisBottom(x_plot)
              .tickFormat(format_date))
              .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)");

      /* On ajoute groupé à la fenêtre initiale un axe à y */
      svg_plot.append("g")
              .attr("class", "axis")
              .call(d3v4.axisLeft(y_plot));

      /* On dessine la variable valuelineSales */
      // svg_plot.append("path")
      //         .data([data])
      //         .attr("class", "line")
      //         .attr("id", "sales")
      //         .attr("d",valuelineSales)
      //         .style("stroke", "red")
      //         .transition() // On ajoute ces lignes pour dessiner les courbes en direct
      //         .duration(2000)
      //         .attrTween("stroke-dasharray", function() {
      //             var len = this.getTotalLength();
      //             return function(t) { return (d3v4.interpolateString("0," + len, len + ",0"))(t) };
      //         });


      /* On dessine la variable valuelineDelivered */
      svg_plot.append("path")
              .data([data])
              .attr("class", "line")
              .attr("id", "deliveries")
              .attr("d", valuelineDelivered)
              .style("stroke", "blue")
              .transition() // On ajoute ces lignes pour dessiner les courbes en direct
              .duration(2000)
              .attrTween("stroke-dasharray", function() {
                  var len = this.getTotalLength();
                  return function(t) { return (d3v4.interpolateString("0," + len, len + ",0"))(t) };
              });


      /* Par dessus le chart, on ajoute un rectangle invisible */
      /* Une variable focus sera initialisée à null quand la souris sera sur le rectangle
      * puis mooifiée dans mousemove sinon elle sera null est donc non visible
      * Focus c'est le rond qu'on verra sur notre courbe */
      svg_plot.append("rect")
              .attr("class", "overlay")
              .attr("width", innerW)
              .attr("height", innerH)
              .on("mouseover", () => (focus_deliveries.style("display", null)))
              .on("mouseout", () => (focus_deliveries.style("display", "none")))
              .on("mousemove", mousemove);

      /* Initialisation de focus */
      let focus_deliveries = svg_plot.append("g")
                                     //.attr("class", "focus_deliveries")
                                     .style("stroke", "blue")
                                     .style("display", "none");

      /* Dessin de la variable focus comme étant un cercle de rayon 4.5 px */
      focus_deliveries.append("circle")
                      .attr("r", 4.5);

      /* Ajout d'un texte sur focus */
      focus_deliveries.append("text")
                      .attr("x", 9)
                      .attr("dy", ".35em");

      /* La fonction mousemove */
      function mousemove() {
          let x0 = x_plot.invert(d3v4.mouse(this)[0]),
              i = bisect_date_plot(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0.Time > d1.Time - x0 ? d1 : d0;

          focus_deliveries.attr("transform", "translate(" + x_plot(d.Time) + "," + y_plot(d.Positive) + ")");
          focus_deliveries.select("text").text(d.Positive);
      }

  }
