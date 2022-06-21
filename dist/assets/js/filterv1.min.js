let table = document.querySelector(".data-view");
let filterTable = document.querySelector(".ft-filter");

let userArray =[];
let statusArray=[];
let milestoneArray=[];
let priorityArray=[];
let tagsArray=[];

let mainData = [];

let selectedFiltersArray = ["asignee","status","milestone","priority","tags"];
let filters = [];

let userFilter;
let statusFilter;
let milestoneFilter;
let priorityFilter;
let tagsFilter;

var filterApp = {

    fetchData :async function(){
        const requestURL = 'database/main-data.json';
        const request = new Request(requestURL);
        const response = await fetch(request);
        mainData = await response.json();
    },

    populateTable: function (tableData) {
        table.innerHTML = '';
        for (let data of tableData) {
            let row = table.insertRow(-1);
            let title = row.insertCell(0);
            title.innerHTML = data.title;
        
            let createdAt = row.insertCell(1);
            createdAt.innerHTML = data.createdAt;

            let dueAt = row.insertCell(2);
            dueAt.innerHTML = data.dueAt;

            let priority = row.insertCell(3);
            priority.innerHTML = data.priority;

            let milestone = row.insertCell(4);
            milestone.innerHTML = data.milestone;

            let asignee = row.insertCell(5);
            asignee.innerHTML = data.asignee;

            let tags = row.insertCell(6);
            tags.innerHTML = data.tags;
          }
    },
    populateFilter: function(tableData){  

        let fArray = [];

        for(let k=0;k<selectedFiltersArray.length; k++){
            let div = document.createElement('div');
            div.classList.add('ft-filter__item');
            let label = document.createElement('label');
            let select = document.createElement('select');
            select.classList.add('form-select');
            select.classList.add(selectedFiltersArray[k]);
            select[0] = new Option("select");

            let text = document.createTextNode(selectedFiltersArray[k]);
            label.appendChild(text);
            div.appendChild(label);
            div.appendChild(select);
            filterTable.appendChild(div);
            let fit =[];
            tableData.forEach((myitem) => {
                
                for(let key in myitem){
                    if(key == selectedFiltersArray[k]){
                        fit.push(myitem[key]);
                    }
                }
            });
            fit = [...new Set(fit)];
            fit = fit.sort();
            fit.forEach((element,key) => {
                select[key + 1] = new Option(element);
            });

            fArray.push(fit);

        }

    },


    loadData:function(data){
        this.populateTable(data);
        this.populateFilter(data);
    },

    filterData:function(data, filters){

        let fiteredData = data;

        if (filters.asignee ){
            if(filters.asignee != "select"){
                fiteredData = fiteredData.filter((a)=>{if(a.asignee == filters.asignee){return a}});
            } else {
                null;
            }
            
        }
        if (filters.status ){
            if(filters.status != "select"){
                fiteredData = fiteredData.filter((a)=>{if(a.status == filters.status){return a}});
            } else {
                null;
            }
            
        }
        if (filters.milestone ){
            if(filters.milestone != "select"){
                fiteredData = fiteredData.filter((a)=>{if(a.milestone == filters.milestone){return a}});
            } else {
                null;
            }
            
        }
        if (filters.priority ){
            if(filters.priority != "select"){
                fiteredData = fiteredData.filter((a)=>{if(a.priority == filters.priority){return a}});
            } else {
                null;
            }
            
        }
        if (filters.tags ){
            if(filters.tags != "select"){
                fiteredData = fiteredData.filter((a)=>{if(a.tags == filters.tags){return a}});
            } else {
                null;
            }
            
        }
        filterApp.populateTable(fiteredData);
    },

    filterSelectHandler:function(data){
        let mainFilter = [];
        $('select').on('change', function (e) {
           console.log("selected");
           let selectClass = e.target.classList[1];
           console.log(selectClass);
           let selectdValue = $(this).val();
           mainFilter[selectClass]=selectdValue;
           console.log(mainFilter);
           filterApp.filterData(data, mainFilter);
        });
    },

    init: async function(){
        await this.fetchData();
        this.loadData(mainData);
        this.filterSelectHandler(mainData);
    }

}

filterApp.init();






