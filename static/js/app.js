function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}

//  Create initializing function
function init() {
    d3.json("data/samples.json").then((importedData) => {
        
        var data = importedData;
        var sampleData = data.samples
        var dropdownMenu = document.getElementById("selDataset"); 
        var ids = [];

        for (var i = 0; i < sampleData.length; i++) {
            
            var id = sampleData[i].id;
            ids.push(id);
            
            var ele = document.createElement("option");
            ele.textContent = ids[i];
            ele.value = ids[i];
            dropdownMenu.appendChild(ele);

        }

        var dataBar = [{
            x: [],
            y: []
        }];

        var layoutBar = {
            title: `Top 10 OTUs found for `,
            xaxis: { title: "Values" },
            yaxis: { title: "OTU IDs" }
        };

        Plotly.newPlot("bar", dataBar, layoutBar);

        console.log(data);
        console.log(ids);
    })
}

// When there's a change to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {

    d3.json("data/samples.json").then((importedData) => {

// Dropdown menu
        var data = importedData;
        var s = data.samples;
        var m = data.metadata;
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");

        console.log(m)

// Create lists
        var sampleIDs = [];
        var sampleOtuIDs = [];
        var sampleValues = [];
        var sampleOtuLabs = [];
        var sampOtuIdTen = [];
        var sampValTen = [];
        var sampOtuLabTen = [];

        var metaID = [];
        var metaEthnicity = [];
        var metaGender = [];
        var metaAge = [];
        var metaLocation = [];
        var metaBBType = [];
        var metaWfreq = [];
        
// Loop through data and select relevant values
        for (var i = 0; i < s.length; i++) {
            
            var sID = s[i].id;
            var mID = m[i].id;

            if (sID === dataset) {
                
                var oId = s[i].otu_ids;        
                var value = s[i].sample_values;
                var lab = s[i].otu_labels;
                var oIdTen = s[i].otu_ids.slice(0, 10);        
                var valueTen = s[i].sample_values.slice(0, 10);
                var labTen = s[i].otu_labels.slice(0, 10);
                
                sampleIDs.push(sID);
                sampleOtuIDs.push(oId);
                sampleValues.push(value);
                sampleOtuLabs.push(lab);
                sampOtuIdTen.push(oIdTen);
                sampValTen.push(valueTen);
                sampOtuLabTen.push(labTen);

            }

            if (mID == dataset && mID == sID) {
                
                var meEth = m[i].ethnicity;
                var meGen = m[i].gender;
                var meAge = m[i].age;
                var meLoc = m[i].location;
                var meBBT = m[i].bbtype;
                var meWfrq = m[i].wfreq;

                metaID.push(mID);
                metaEthnicity.push(meEth);
                metaGender.push(meGen);
                metaAge.push(meAge);
                metaLocation.push(meLoc);
                metaBBType.push(meBBT);
                metaWfreq.push(meWfrq);

            }
        }

// Check data import with console.log
        console.log(sampOtuIdTen.map(String));
        console.log(sampValTen);
        console.log(sampOtuLabTen);
        console.log(sampleValues);
        console.log(sampleOtuIDs),
        console.log(sampleOtuLabs)

        console.log(metaID);
        console.log(metaEthnicity);
        console.log(metaGender);
        console.log(metaAge);
        console.log(metaLocation);
        console.log(metaBBType);
        console.log(metaWfreq);
        console.log(sampOtuIdTen)

// Fill the demographic panel
        var p1 = document.getElementById("sample-id")
        p1.textContent = `id: ${metaID}`;

        var p2 = document.getElementById("sample-eth")
        p2.textContent = `ethnicity: ${metaEthnicity}`;

        var p3 = document.getElementById("sample-gen")
        p3.textContent = `gender: ${metaGender}`;

        var p4 = document.getElementById("sample-age")
        p4.textContent = `age: ${metaAge}`;

        var p5 = document.getElementById("sample-loc")
        p5.textContent = `location: ${metaLocation}`;

        var p6 = document.getElementById("sample-bbt")
        p6.textContent = `bbtype: ${metaBBType}`;
        
        var p7 = document.getElementById("sample-wfrq")
        p7.textContent = `wfreq: ${metaWfreq}`;

// Create chart traces

        var traceBar = {
            type: "bar",
            x: sampValTen[0],
            y: `${sampOtuIdTen.map(String)}`,
            text: sampOtuLabTen[0],
            marker: { 
                color: "#009999",
                line: {
                    width: 2
                },
            },
            orientation: "h",
        };

        var traceBubble = {

            x: sampleOtuIDs[0],
            y: sampleValues[0],
            mode: "markers",
            marker: {
                size: sampleValues[0],
                sizeref: 0.1,
                sizemode: "area"
            },
            text: sampleOtuLabs[0],
            type: "scatter"
        };

// Create chart datasets, labels
        var dataBar = [traceBar];
        var dataBubble = [traceBubble];
        
        var layoutBar = {
            title: `Top 10 OTUs found for ${dataset}`,
            xaxis: { 
                title: "Values",
                autorange: true
            },
    
        };

        var layoutBubble = {
            xaxis: {
                title: "OTU ID"
            }
        };

        Plotly.purge("bar");
        Plotly.newPlot("bar", dataBar, layoutBar);
        Plotly.newPlot("bubble", dataBubble, layoutBubble);
    });
}

init();