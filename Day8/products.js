angular.module("exampleApp",["increment","ngResource"])
.constant("baseUrl","http://localhost:5500/products/")
.controller("defaultCtrl", function($scope,$http,$resource,baseUrl){
	
	$scope.displayMode ="list";
	$scope.currentProduct = null;

	$scope.productsResource = $resource(baseUrl + ":id", {id: "@id"});

	$scope.listProducts = function(){
		$scope.products = $scope.productsResource.query();
		// $http.get(baseUrl).success(function(data){
  //          $scope.products = data;
		// });
		// $scope.products = [
  //         {id: 0, name: "Dummy1", category:"Test1", price: 100 },
  //         {id: 1, name: "Dummy2", category:"Test2", price: 200 },
  //         {id: 2, name: "Dummy3", category:"Test3", price: 300 },
		// ];
	}

	$scope.deleteProduct = function(product){
		//$scope.products.splice($scope.products.indexOf(product),1);

		$http({ 
			    url: baseUrl + product.id,
			    method: "DELETE",
                params: product

	    }).success(function(){

	    	//$scope.products.splice($scope.products.indexOf(product),1);
	    });
	}

	$scope.createProduct = function(product){
		// $http.post(baseUrl,product).success(function(newProduct){
  //          $scope.products.push(newproduct);
		//    $scope.displayMode = "list";
		// });

        new $scope.productsResource(product).$save().then(function(newProduct){
             $scope.products.push(newProduct);
             $scope.displayMode = "list";
        });
		
	}

	$scope.updateProduct = function(product){
		product.$save();
		product.displayMode = "list";
		// $http({
		// 	url: baseUrl + product.id,
		// 	method: "PUT",
		// 	data: product 
		// }).success(function (modifiedProduct){
  //          for(var i = 0; i < $scope.products.length; i++ ){
		// 	if($scope.products[i].id == product.id){
		// 		$scope.products[i] = product;
		// 		break;
		// 	}
		// }
		// $scope.displayMode = "list";
		// });
		
	}

	$scope.editOrCreateProduct = function (product) {        
		$scope.currentProduct = product ? angular.copy(product) : {};        
		$scope.displayMode = "edit";    
	} 
    $scope.saveEdit = function (product) {        
    	if (angular.isDefined(product.id)) {            
    		$scope.updateProduct(product);        
    	} else {            
    		$scope.createProduct(product);        
    	}    
    }

    $scope.cancelEdit = function () {        
    	$scope.currentProduct = {};        
    	$scope.displayMode = "list";    
    } 
    $scope.listProducts();  
})