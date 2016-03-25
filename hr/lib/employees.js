/*
 index.js 에 질의 모듈을 넣는 대신에 만들어진 DB 모듈
 	-직원 목록
 	-ID로 특정 직원 정보 검색 
 	--기능에 필요한 정보 캡슐화..
 */


var employeeDb = require('../database/employees.json');

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

function getEmployees (callback) {
  setTimeout(function () {
    callback(null, employeeDb);
  }, 1000);
}

function getEmployee (employeeId, callback) {
  getEmployees(function (error, data) {
    if (error) {
      return callback(error);
    }

    var result = data.find(function(item) {
      return item.id === employeeId;
    });

    callback(null, result);
  });
}
