sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("project1.controller.ProductDetails", {

        onInit: function () {
            // Get the router
            var oRouter = UIComponent.getRouterFor(this);

            // Listen for the ProductDetails route
            oRouter.getRoute("ProductDetails").attachPatternMatched(
                this._onObjectMatched,
                this
            );
        },

        _onObjectMatched: function (oEvent) {
            // Get the ProductId from the route
            var sProductId = oEvent.getParameter("arguments").ProductId;

            // Get the ProductMd1 model
            var oModel = this.getView().getModel("ProductMd1");

            // Get all products
            var aProducts = oModel.getProperty("/ProductCollection");

            // Find the selected product
            var oProduct = aProducts.find(function (oProduct) {
                return oProduct.ProductId === sProductId;
            });

            // Set the selected product as the view binding context
            if (oProduct) {
                var oContext = oModel.createBindingContext(
                    "/ProductCollection/" + aProducts.indexOf(oProduct)
                );

                this.getView().setBindingContext(oContext, "ProductMd1");
            }
        },

        onNavBack: function () {
            var oRouter = UIComponent.getRouterFor(this);

            oRouter.navTo("RouteView1");
        }

    });

});