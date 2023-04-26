// Your code here

function createEmployeeRecord (employeeInfo) {

    let arr = {
        
            firstName : employeeInfo[0],
            familyName : employeeInfo[1], 
            title : employeeInfo[2], 
            payPerHour : employeeInfo[3],
            timeInEvents : [],
            timeOutEvents : []

    }

        return arr

}


function createEmployeeRecords (arr){

     return arr.map(element => {
        return createEmployeeRecord(element)
         
    });
}


function createTimeInEvent (employeeRecordObj, dateStamp) {

    //let newEmployeeRecordObj = {...employeeRecordObj}
   // let parsedHour = dateStamp.substring(11, 11 + dateStamp.length)


    employeeRecordObj.timeInEvents.push({
        type : "TimeIn",
        hour : parseInt(dateStamp.substring(11, 11 + dateStamp.length)),
        date : dateStamp.substring(0, 10)

    })

        return employeeRecordObj

}

//"YYYY-MM-DD HHMM"


function createTimeOutEvent(employeeRecordObj, dateStamp){

    
   employeeRecordObj.timeOutEvents.push({
        type : "TimeOut",
        hour : parseInt(dateStamp.substring(11, 11 + dateStamp.length)),
        date : dateStamp.substring(0, 10) 
    })

    return employeeRecordObj
}



function hoursWorkedOnDate(employeeRecordObj, date) {

    // return employeeRecordObj.timeOutEvents.hour - employeeRecordObj.timeInEvents.hour -> Stella's way - did not work 


    let timeInEvent = employeeRecordObj.timeInEvents.find(element => {
        return element.date === date})

    let timeOutEvent = employeeRecordObj.timeOutEvents.find(element => {
        return element.date === date})

    return (timeOutEvent.hour - timeInEvent.hour) / 100



    // const timeInEvent = employeeRecordObj.timeInEvents.find(function (e) {
    //     return e.date === date;
    //   });
    //   const timeOutEvent = employeeRecordObj.timeOutEvents.find(function (e) {
    //     return e.date === date;
    //   });
    //   const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    //   return hoursWorked;


}


//"YYYY-MM-DD HHMM"


function wagesEarnedOnDate(employeeRecordObj, date) {

   let payOwed = hoursWorkedOnDate(employeeRecordObj, date) * employeeRecordObj.payPerHour

    return payOwed
}


function allWagesFor(employeeRecordObj){

   // let payOwedAll = wagesEarnedOnDate(employeeRecordObj, date) * hoursWorkedOnDate(employeeRecordObj, date) -> Stella's way - wrong

   const gettingDatesToUseAsParameterOfWagesEarnedOnDate = employeeRecordObj.timeOutEvents.map(e => e.date) //Getting all dates of one employee

   return gettingDatesToUseAsParameterOfWagesEarnedOnDate.reduce(function (memo, e){
    return memo + wagesEarnedOnDate(employeeRecordObj, e)
   }, 0) 

   // return usingFunctionWagesEarnedOnDate


//    const datesWorked = employeeRecordObj.timeOutEvents.map(function (e) {
//     return e.date;
//   });
//   const wagesEarned = datesWorked.reduce(function (memo, d) {
//     return memo + wagesEarnedOnDate(employeeRecordObj, d);
//   }, 0);
//   return wagesEarned;


}




function calculatePayroll(arrEmployeeRecords){

    const gettingDatesOfAllEmployees = arrEmployeeRecords.map(employeeRecordObj => {
        return allWagesFor(employeeRecordObj)
    })

    const sumOfPayOwed = gettingDatesOfAllEmployees.reduce(function (wage, wages) {
        return wage + wages
    },0)
    
    return sumOfPayOwed

}










