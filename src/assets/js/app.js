let table = document.querySelector(".data-view");
let filterTable = document.querySelector(".ft-filter");
let apiData = [];
let tasksData = [];
let selectedFiltersArray =[];

var filterApp = {

    fetchData :async function(){
        const requestURL = 'database/demo-data.json';
        const request = new Request(requestURL);
        const response = await fetch(request);
        apiData = await response.json();
        tasksData = apiData.taskData;
        selectedFiltersArray = apiData.filterBy;
    },

    populateTable: function (tableData) {
        table.innerHTML = '';
        for (let data of tableData) {
            let row = table.insertRow(-1); 
            for(let key in data){
                if(key != "status"){
                    let td = row.insertCell();
                    td.innerHTML = data[key];
                }
            }
          }
          if($(".data-view").is(':empty')){
            $(".output-result .btn").removeClass("visible");
        } else{
            $(".output-result .btn").addClass("visible");
        }
    },

    populateFilterDropdowns: function(){  

        for(let k=0;k<selectedFiltersArray.length; k++){
            let labelValue = selectedFiltersArray[k].label;
            let selectValue = selectedFiltersArray[k].value;
            let defaultValue = selectedFiltersArray[k].defaultOption;
            let filterEnabled = selectedFiltersArray[k].enabled;
            if (filterEnabled){
                let div = document.createElement('div');
                div.classList.add('ft-filter__item');
                let labelElement = document.createElement('label');
                let select = document.createElement('select');
                select.classList.add('form-select');
                select.classList.add(selectValue);
                select[0] = new Option(defaultValue);
    
                let text = document.createTextNode(labelValue);
                labelElement.appendChild(text);
                div.appendChild(labelElement);
                div.appendChild(select);
                filterTable.appendChild(div);
                let dropDownArray =[];
    
                tasksData.forEach((myitem) => {
                    for(let key in myitem){
                        if(key == selectValue){
                            dropDownArray.push(myitem[key]);
                        }
                    }
                });
                dropDownArray = [...new Set(dropDownArray)];
                dropDownArray = dropDownArray.sort();
                dropDownArray.forEach((element,key) => {
                    select[key + 1] = new Option(element);
                });
            }  

        }

    },

    loadData:function(){
        this.populateTable(tasksData);
        this.populateFilterDropdowns();
    },

    populateFilteredData:function(data, filterArray){
        let fiteredData = data.taskData;
        for(let k=0;k<selectedFiltersArray.length; k++){
            let filterEnabled = selectedFiltersArray[k].enabled;
            if (filterEnabled){
            let dataValue = selectedFiltersArray[k].value;
            let defaultOption = selectedFiltersArray[k].defaultOption;
            if (filterArray[dataValue] && filterArray[dataValue] != defaultOption){
                fiteredData = fiteredData.filter((a)=>{if(a[dataValue] == filterArray[dataValue]){return a}});
            }
        }
        }
        filterApp.populateTable(fiteredData);
    },

    filterSelectHandler:function(data){
        let filterValueArray = [];
        $('select').on('change', function (e) {
           let selectClass = e.target.classList[1];
           let selectdValue = $(this).val();
           filterValueArray[selectClass]=selectdValue;
           filterApp.populateFilteredData(data, filterValueArray);
        });
    },
    dataPrint:function(){
        $('.print-data').on('click', function (e) {
            window.print();
         });

    },

    init: async function(){
        await this.fetchData();
        this.loadData(apiData);
        this.filterSelectHandler(apiData);
        this.dataPrint();
    }
}

filterApp.init();






