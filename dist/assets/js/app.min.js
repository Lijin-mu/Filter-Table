let table = document.querySelector(".data-view");
let userArray =[];
let statusArray=[];
let milestoneArray=[];
let priorityArray=[];
let tagsArray=[];

let mainData = [];

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

    addFilterOption: function (elem,selector,defaultValue) {
        let selectItem = document.querySelector(selector);
        selectItem[0] = new Option(defaultValue);
        elem.forEach(function(element,key) {
            selectItem[key + 1] = new Option(element);
        });
    },
    
    addFilterValue:function(item, array){
        array.push(item);
    },

    filterPopulate : function(tableData){
        tableData.forEach((value) => {
            filterApp.addFilterValue(value.asignee, userArray);
            filterApp.addFilterValue(value.status, statusArray);
            filterApp.addFilterValue(value.milestone, milestoneArray);
            filterApp.addFilterValue(value.priority, priorityArray);
            filterApp.addFilterValue(value.tags, tagsArray);
        });
        userArray = [...new Set(userArray)];
        statusArray = [...new Set(statusArray)];
        milestoneArray = [...new Set(milestoneArray)];
        priorityArray = [...new Set(priorityArray)];
        tagsArray = [...new Set(tagsArray)];

        userArray = userArray.sort();
        statusArray = statusArray.sort();
        milestoneArray = milestoneArray.sort();
        priorityArray = priorityArray.sort();
        tagsArray = tagsArray.sort();

        filterApp.addFilterOption(userArray, ".user", "None");
        filterApp.addFilterOption(statusArray, ".status", "Any");
        filterApp.addFilterOption(milestoneArray, ".milestone", "None");
        filterApp.addFilterOption(priorityArray, ".priority", "Any");
        filterApp.addFilterOption(tagsArray, ".tags", "None");
    },

    loadData:function(data){
        this.populateTable(data);
        this.filterPopulate(data);
    },

    FilterData:function(data){

        let filterArray = [];

        if (userFilter != "None"){
            filterArray.asignee = userFilter;
        }
        if (statusFilter != "Any"){
            filterArray.status = statusFilter;
        }
        if (milestoneFilter != "None"){
            filterArray.milestone = milestoneFilter;
        }
        if (priorityFilter != "Any"){
            filterArray.priority = priorityFilter;
        }
        if (tagsFilter != "None"){
            filterArray.tags = tagsFilter;
        }

        let fiteredData = data;

        if (filterArray.asignee){
            fiteredData = fiteredData.filter((a)=>{if(a.asignee == filterArray.asignee){return a}});
        }
        if (filterArray.status){
            fiteredData = fiteredData.filter((a)=>{if(a.status == filterArray.status){return a}});
        }
        if (filterArray.milestone){
            fiteredData = fiteredData.filter((a)=>{if(a.milestone == filterArray.milestone){return a}});
        }
        if (filterArray.priority){
            fiteredData = fiteredData.filter((a)=>{if(a.priority == filterArray.priority){return a}});
        }
        if (filterArray.tags){
            fiteredData = fiteredData.filter((a)=>{if(a.tags == filterArray.tags){return a}});
        }

        filterApp.populateTable(fiteredData);
    },

    filterSelectHandler:function(data){
        $('.user').on('change', function (e) {
            userFilter = $('.user').val();
            filterApp.FilterData(data);
        });
        $('.status').on('change', function (e) {
            statusFilter = $('.status').val();
            filterApp.FilterData(data);
        });
        $('.milestone').on('change', function (e) {
            milestoneFilter = $('.milestone').val();
            filterApp.FilterData(data);
        });
        $('.priority').on('change', function (e) {
            priorityFilter = $('.priority').val();
            filterApp.FilterData(data);
        });
        $('.tags').on('change', function (e) {
            tagsFilter = $('.tags').val();
            filterApp.FilterData(data);
        });
    },

    init: async function(){
        await this.fetchData();
        this.loadData(mainData);
        this.filterSelectHandler(mainData);
    }

}

filterApp.init();






