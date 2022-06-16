let userArray=["None"];
let statusArray=["Any"];
let milestoneArray=["None"];
let priorityArray=["Any"];
let tagsArray=["None"];

let userFilterDefault="None";
let statusFilterDefault="Any";
let milestoneFilterDefault="None";
let priorityFilterDefault="Any";
let tagsFilterDefault="None";

let userFilter="None";
let statusFilter="Any";
let milestoneFilter="None";
let priorityFilter="Any";
let tagsFilter="None";


var filterData = {

    createElement: function (elem) {
        $(".data-view").append(
          $(
            '<tr><td scope="col">' + elem.title + '</td><td scope="col">' + elem.createdAt + '</td><td scope="col">' + elem.dueAt + '</td><td scope="col">' + elem.priority + '</td><td scope="col">' + elem.milestone + '</td><td scope="col">' + elem.asignee + '</td><td scope="col">' + elem.tags + '</td></tr>'
          )
        );
    },

    removeElement:function(){
        $(".data-view").children().remove();
    },

    createFilter: function (elem,selector) {
        elem.forEach(function callback(value) {
            $(selector).append(
                $(
                  '<option>' + value + '</option>'
                )
              );
        });
    },
    
    itemArray:function(item, array){
        array.push(item);
    },

    listFilterData : function(data){
        data.forEach(function callback(value, index) {
            filterData.createElement(value);
            filterData.itemArray(value.asignee, userArray);
            filterData.itemArray(value.status, statusArray);
            filterData.itemArray(value.milestone, milestoneArray);
            filterData.itemArray(value.priority, priorityArray);
            filterData.itemArray(value.tags, tagsArray);
        });
        userArrayTrim = [...new Set(userArray)];
        statusArrayTrim = [...new Set(statusArray)];
        milestoneArrayTrim = [...new Set(milestoneArray)];
        priorityArrayTrim = [...new Set(priorityArray)];
        tagsArrayTrim = [...new Set(tagsArray)];
        userArray = userArrayTrim;
        statusArray = statusArrayTrim;
        milestoneArray = milestoneArrayTrim;
        priorityArray = priorityArrayTrim;
        tagsArray = tagsArrayTrim;
        filterData.createFilter(userArray, ".user");
        filterData.createFilter(statusArray, ".status");
        filterData.createFilter(milestoneArray, ".milestone");
        filterData.createFilter(priorityArray, ".priority");
        filterData.createFilter(tagsArray, ".tags");
    },
    filterHandler:function(data, filter, defaultValue){
       filterData.removeElement();
        data.forEach(function callback(value, index) {
            if(filter != defaultValue){
                if ((value.asignee) ==filter){
                    filterData.createElement(value);
                }
            }
            else{
                filterData.createElement(value);
            }
        });
    },

    multipleFilter:function(data){

        let filterArray = [];

        if (userFilter != userFilterDefault){
            filterArray.asignee = userFilter;
        }
        if (statusFilter != statusFilterDefault){
            filterArray.status = statusFilter;
        }
        if (milestoneFilter != milestoneFilterDefault){
            filterArray.milestone = milestoneFilter;
        }
        if (priorityFilter != priorityFilterDefault){
            filterArray.priority = priorityFilter;
        }
        if (tagsFilter != tagsFilterDefault){
            filterArray.tags = tagsFilter;
        }

        filterData.removeElement();

        function filterItems(data, filterArray) {

            let fdata = data;

            if (filterArray.asignee){
                fdata = fdata.filter((a)=>{if(a.asignee == filterArray.asignee){return a}});
            }
            if (filterArray.status){
                fdata = fdata.filter((a)=>{if(a.status == filterArray.status){return a}});
            }
            if (filterArray.milestone){
                fdata = fdata.filter((a)=>{if(a.milestone == filterArray.milestone){return a}});
            }
            if (filterArray.priority){
                fdata = fdata.filter((a)=>{if(a.priority == filterArray.priority){return a}});
            }
            if (filterArray.tags){
                fdata = fdata.filter((a)=>{if(a.tags == filterArray.tags){return a}});
            }

            fdata.forEach(function callback(value, index) {
                filterData.createElement(value);
            });
        
        }
        filterItems(data, filterArray);
    },

    filterSelectHandler:function(data){
        $('.user').on('change', function (e) {
            userFilter = $('.user').val();
            // filterData.filterHandler(data, userFilter, userFilterDefault);
            filterData.multipleFilter(data);
        });
        $('.status').on('change', function (e) {
            statusFilter = $('.status').val();
            filterData.multipleFilter(data);
        });
        $('.milestone').on('change', function (e) {
            milestoneFilter = $('.milestone').val();
            filterData.multipleFilter(data);
        });
        $('.priority').on('change', function (e) {
            priorityFilter = $('.priority').val();
            filterData.multipleFilter(data);
        });
        $('.tags').on('change', function (e) {
            tagsFilter = $('.tags').val();
            filterData.multipleFilter(data);
        });
    },

    init: function(data){
        this.listFilterData(data);
        this.filterSelectHandler(data);
    }

}

async function fetchData() {

    const requestURL = 'database/main-data.json';
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const dataFetch = await response.json();

    filterData.init(dataFetch);
}

fetchData();





