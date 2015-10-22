var visitorCenter = angular.module('VisitorCenter', ['ngResource']);

visitorCenter.factory("Visitor", function($resource) {
  return $resource("visitors/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
})

visitorCenter.controller("visitorsController", function($scope, Visitor) {
  
  $scope.isEdit = false;
  $scope.visitors = Visitor.index()
  // console.log($scope.visitors)

  $scope.addVisitor = function() {
    $scope.isEdit = false;
    visitor = Visitor.save($scope.newVisitor)

    $scope.message = "Created Successfully"
    $scope.visitors.push(visitor)
    $scope.newVisitor = {}
  }

  $scope.deleteVisitor = function(index) {
    visitor = $scope.visitors[index]
    console.log(visitor);
    Visitor.delete(visitor)
    $scope.visitors.splice(index, 1);
  }

  $scope.editVisitor = function(index) {
    visitor = $scope.visitors[index]
    $scope.isEdit = true;
    $scope.updateVisitorfield = visitor;
  }

  $scope.updateVisitor = function() {
    visitor = Visitor.update($scope.updateVisitorfield)
  }
})