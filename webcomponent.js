(function() {

  let count = 0;
  //let coreJS=document.createElement('script');
  //coreJS.src='https://www.amcharts.com/lib/4/core.js';
  //document.head.appendChild(coreJS);

  //let chartsJS=document.createElement('script');
  //chartsJS.src='https://www.amcharts.com/lib/4/charts.js';
  //document.head.appendChild(chartsJS);

  //let animatedJS=document.createElement('script');
  //animatedJS.src='https://www.amcharts.com/lib/4/themes/animated.js';
  //document.head.appendChild(animatedJS);

  const amchartscorejs = "https://cdn.amcharts.com/lib/4/core.js";
  const amchartschartsjs = "https://cdn.amcharts.com/lib/4/charts.js";
  const amchartsanimatedjs = "https://cdn.amcharts.com/lib/4/themes/animated.js"

  console.log("1-Step");

  //This function is used to load the library

  function loadScript(src) {

    console.log("Step-9");

    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        console.log("Load: " + src);
        resolve(script);
      }
      script.onerror = () => reject(new Error(`Script load error for ${src}`));

      document.head.appendChild(script)
    });
  }


  console.log("Step-2");

  let template = document.createElement('template');
  template.innerHTML = `
  <style>
#chartdiv {
  width: 100%;
  height:250px;
  margin:0em;
}
#legendContainer {
  width: 100%;
  height:20px;
  margin:0em;
}
</style>
  <div id="chartdiv"></div>
  <div id="legendContainer">
  
  </div>
  `;

  console.log("Step3");




  customElements.define('com-sap-sample-helloworld6', class HelloWorld extends HTMLElement {
    constructor() {
      super();

      console.log("step-4");
      let shadowRoot = this.attachShadow({
        mode: "open"
      });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this._firstConnection = false;
      this.target=0;
      this.achieved=0;




      this.addEventListener("click", event => {
        var event = new Event("onClick");
        this.dispatchEvent(event);
      });


    }

    //Fired when the widget is added to the html DOM of the page
    connectedCallback() {

      console.log("Step-5");
      this._firstConnection = true;

      async function LoadLibs(callme) {
        console.log("Step - 7");

        try {
          console.log("Step-8");
          await loadScript(amchartscorejs);
          await loadScript(amchartschartsjs);
          await loadScript(amchartsanimatedjs);

        } catch (e) {
          alert(e);
        } finally {
          console.log("Step-10");
          console.log(" execute kyun nahi ho raha");
          callme.redraw();
        }
      }

      console.log("Step-6");
      LoadLibs(this);
    }






    //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
    disconnectedCallback() {

    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function first
    onCustomWidgetBeforeUpdate(oChangedProperties) {



    }



    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
    onCustomWidgetAfterUpdate(oChangedProperties) {
      if (this._firstConnection) {
        this.redraw();
      }


    }

    //When the custom widget is removed from the canvas or the analytic application is closed
    onCustomWidgetDestroy() {

    }


    //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
    // Commented out by default
    /*
    onCustomWidgetResize(width, height){
    
    }
    */


   
    
     get target() {
      return this.target;
    }

    set target(value) {
      this.target = value;
    }
    
     get achieved() {
      return this.achieved;
    }

    set achieved(value) {
      this.achieved = value;
    }

    




    redraw() {
      let myChart = this.shadowRoot.getElementById('chartdiv');
      let legendContainer=this.shadowRoot.getElementById('legendContainer');
      console.log("Step-11");


      am4core.useTheme(am4themes_animated);
      // Themes end

      // create chart
      var chart = am4core.create(myChart, am4charts.GaugeChart);
      chart.hiddenState.properties.opacity = 0;

      var axis = chart.xAxes.push(new am4charts.ValueAxis());
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.renderer.inside = true;
      //axis.renderer.ticks.template.inside = true;
      //axis.stroke = chart.colors.getIndex(3);
      axis.renderer.radius = am4core.percent(80);
      //axis.renderer.radius = 80;
      axis.renderer.line.strokeOpacity = 1;
      axis.renderer.line.strokeWidth = 5;
      axis.renderer.line.stroke = chart.colors.getIndex(0);
      axis.renderer.ticks.template.disabled = false
      axis.renderer.ticks.template.stroke = chart.colors.getIndex(0);
      axis.renderer.labels.template.radius = 35;
      axis.renderer.ticks.template.strokeOpacity = 1;
      axis.renderer.grid.template.disabled = true;
      axis.renderer.ticks.template.length = 10;
      axis.hiddenState.properties.opacity = 1;
      axis.hiddenState.properties.visible = true;
      axis.setStateOnChildren = true;
      axis.renderer.hiddenState.properties.endAngle = 180;

      var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
      axis2.min = 0;
      axis2.max = 100;
      axis2.strictMinMax = true;

      axis2.renderer.line.strokeOpacity = 1;
      axis2.renderer.line.strokeWidth = 5;
      axis2.renderer.line.stroke = chart.colors.getIndex(3);
      axis2.renderer.ticks.template.stroke = chart.colors.getIndex(3);

      axis2.renderer.ticks.template.disabled = false
      axis2.renderer.ticks.template.strokeOpacity = 1;
      axis2.renderer.grid.template.disabled = true;
      axis2.renderer.ticks.template.length = 10;
      axis2.hiddenState.properties.opacity = 1;
      axis2.hiddenState.properties.visible = true;
      axis2.setStateOnChildren = true;
      axis2.renderer.hiddenState.properties.endAngle = 180;

      var hand = chart.hands.push(new am4charts.ClockHand());
      hand.fill = axis.renderer.line.stroke;
      hand.stroke = axis.renderer.line.stroke;
      hand.axis = axis;
      hand.pin.radius = 14;
      hand.startWidth = 10;

      var hand2 = chart.hands.push(new am4charts.ClockHand());
      hand2.fill = axis2.renderer.line.stroke;
      hand2.stroke = axis2.renderer.line.stroke;
      hand2.axis = axis2;
      hand2.pin.radius = 10;
      hand2.startWidth = 10;

      setInterval(function() {
        hand.showValue(this.achieved / 100, 1000, am4core.ease.cubicOut);
        label.text = Math.round(hand.value).toString();
        hand2.showValue(this.target / 100, 1000, am4core.ease.cubicOut);
        label2.text = Math.round(hand2.value).toString();
      }, 5000);

      var legend = new am4charts.Legend();
      legend.isMeasured = false;
      //legend.y = am4core.percent(100);
     // legend.x = am4core.percent(1.5);
     // legend.verticalCenter = "bottom";
      legend.parent = chart.legendContainer;
      legend.data = [{
        "name": "Target",
        "fill": chart.colors.getIndex(0)
      }, {
        "name": "Actual",
        "fill": chart.colors.getIndex(3)
      }];

      legend.itemContainers.template.events.on("hit", function(ev) {
        var index = ev.target.dataItem.index;

        if (!ev.target.isActive) {
          chart.hands.getIndex(index).hide();
          chart.xAxes.getIndex(index).hide();
          labelList.getIndex(index).hide();
        } else {
          chart.hands.getIndex(index).show();
          chart.xAxes.getIndex(index).show();
          labelList.getIndex(index).show();
        }
      });

      var labelList = new am4core.ListTemplate(new am4core.Label());
      labelList.template.isMeasured = false;
      labelList.template.background.strokeWidth = 2;
      labelList.template.fontSize = 10;
      labelList.template.padding(5, 10, 5, 10);
      labelList.template.y = am4core.percent(65);
      labelList.template.horizontalCenter = "middle";

      var label = labelList.create();
      label.parent = chart.chartContainer;
      label.x = am4core.percent(40);
      label.background.stroke = chart.colors.getIndex(0);
      label.fill = chart.colors.getIndex(0);
      label.text = "0";

      var label2 = labelList.create();
      label2.parent = chart.chartContainer;
      label2.x = am4core.percent(60);
      label2.background.stroke = chart.colors.getIndex(3);
      label2.fill = chart.colors.getIndex(3);
      label2.text = "0";







    }


  });


})();
