let dataList = [
    {
        "title": "Task title 1",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Low",
        "milestone": "Milestone 1",
        "asignee": "Larry",
        "tags":"tag 1",
        "status" : "progress"
    },
    {
        "title": "Task title 2",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Low",
        "milestone": "Milestone 2",
        "asignee": "Baker",
        "tags":"tag 2",
        "status" : "progress"
    },
    {
        "title": "Task title 3",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Low",
        "milestone": "Milestone 4",
        "asignee": "Neone",
        "tags":"tag 1",
        "status" : "progress"
    },
    {
        "title": "Task title 4",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Low",
        "milestone": "Milestone 4",
        "asignee": "Baker",
        "tags":"tag 2",
        "status" : "progress"
    },
    {
        "title": "Task title 5",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Urgent",
        "milestone": "Milestone 3",
        "asignee": "Neone",
        "tags":"tag 1",
        "status" : "progress"
    },
    {
        "title": "Task title 6",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Urgent",
        "milestone": "Milestone 4",
        "asignee": "Larry",
        "tags":"tag 3",
        "status" : "pending"
    },
    {
        "title": "Task title 7",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Urgent",
        "milestone": "Milestone 3",
        "asignee": "Neone",
        "tags":"tag 1",
        "status" : "pending"
    },
    {
        "title": "Task title 8",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Low",
        "milestone": "Milestone 3",
        "asignee": "Larry",
        "tags":"tag 1",
        "status" : "done"
    },
    {
        "title": "Task title 9",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Low",
        "milestone": "Milestone 1",
        "asignee": "Neone",
        "tags":"tag 3",
        "status" : "done"
    },
    {
        "title": "Task title 10",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "Urgent",
        "milestone": "Milestone 3",
        "asignee": "Baker",
        "tags":"tag 1",
        "status" : "done"
    },
    {
        "title": "Task title 11",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "High",
        "milestone": "Milestone 4",
        "asignee": "Larry",
        "tags":"tag 3",
        "status" : "pending"
    },
    {
        "title": "Task title 12",
        "createdAt": "05/08/2022",
        "dueAt": "05/10/2022",
        "priority": "High",
        "milestone": "Milestone 5",
        "asignee": "Baker",
        "tags":"tag 1",
        "status" : "pending"
    }
];


var filterData = {

    createElement: function (elem) {
        $(".data-view").append(
          $(
            '<tr><td scope="col">' + elem.title + '</td><td scope="col">' + elem.createdAt + '</td><td scope="col">' + elem.dueAt + '</td><td scope="col">' + elem.priority + '</td><td scope="col">' + elem.milestone + '</td><td scope="col">' + elem.asignee + '</td><td scope="col">' + elem.tags + '</td></tr>'
          )
        );
      },

    listFilterData : function(data){
        data.forEach(function callback(value, index) {
            filterData.createElement(value);
          });
    },
    init: function(data){
        this.listFilterData(data);
    }

}

filterData.init(dataList);



