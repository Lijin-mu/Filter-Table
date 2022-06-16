let userArray=["None"];
let statusArray=["Any"];
let milestoneArray=["None"];
let priorityArray=["Any"];
let tagsArray=["None"];


var filterData = {

    createElement: function (elem) {
        $(".data-view").append(
          $(
            '<tr><td scope="col">' + elem.title + '</td><td scope="col">' + elem.createdAt + '</td><td scope="col">' + elem.dueAt + '</td><td scope="col">' + elem.priority + '</td><td scope="col">' + elem.milestone + '</td><td scope="col">' + elem.asignee + '</td><td scope="col">' + elem.tags + '</td></tr>'
          )
        );
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
    filterHandler:function(data){
        data.forEach(function callback(value, index) {
            console.log(value.title);
        });
    },
    init: function(data){
        this.listFilterData(data);
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





