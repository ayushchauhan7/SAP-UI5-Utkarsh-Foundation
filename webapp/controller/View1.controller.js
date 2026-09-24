sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast"
], function (
    Controller,
    UIComponent,
    Filter,
    FilterOperator,
    Sorter,
    MessageToast
) {
    "use strict";

    return Controller.extend("project1.controller.View1", {

      onInit: function () {

    this._bSortAscending = true;

    this._loadTheme();

},

onAfterRendering: function () {

    this._updateStatistics();

    this._updateResultCount();

},

        /* =====================================================
           THEME
           ===================================================== */

        _loadTheme: function () {

            var sTheme = localStorage.getItem("project1-theme");

            if (!sTheme) {
                sTheme = "sap_horizon";
            }

            sap.ui.getCore().applyTheme(sTheme);

            this._updateThemeButton(sTheme);
        },


        onToggleTheme: function () {

            var sCurrentTheme = sap.ui.getCore().getConfiguration().getTheme();

            var sNewTheme =
                sCurrentTheme === "sap_horizon_dark"
                    ? "sap_horizon"
                    : "sap_horizon_dark";

            sap.ui.getCore().applyTheme(sNewTheme);

            localStorage.setItem(
                "project1-theme",
                sNewTheme
            );

            this._updateThemeButton(sNewTheme);

            MessageToast.show(
                sNewTheme === "sap_horizon_dark"
                    ? "Dark mode enabled"
                    : "Light mode enabled"
            );
        },


        _updateThemeButton: function (sTheme) {

            var oButton = this.byId("themeButton");

            if (!oButton) {
                return;
            }

            if (sTheme === "sap_horizon_dark") {

                oButton.setIcon("sap-icon://light-mode");
                oButton.setTooltip("Switch to Light Mode");

            } else {

                oButton.setIcon("sap-icon://dark-mode");
                oButton.setTooltip("Switch to Dark Mode");
            }
        },


        /* =====================================================
           SEARCH
           ===================================================== */

        onSearch: function (oEvent) {

            var sQuery = oEvent.getParameter("newValue");

            this._applyFilters(sQuery);
        },


        /* =====================================================
           STATUS FILTER
           ===================================================== */

        onStatusFilter: function () {

            var sQuery = this.byId("productSearch").getValue();

            this._applyFilters(sQuery);
        },


        _applyFilters: function (sQuery) {

            var aFilters = [];

            if (sQuery) {

                var aSearchFilters = [

                    new Filter(
                        "ProductId",
                        FilterOperator.Contains,
                        sQuery
                    ),

                    new Filter(
                        "Name",
                        FilterOperator.Contains,
                        sQuery
                    ),

                    new Filter(
                        "Category",
                        FilterOperator.Contains,
                        sQuery
                    ),

                    new Filter(
                        "SupplierName",
                        FilterOperator.Contains,
                        sQuery
                    )

                ];

                aFilters.push(
                    new Filter({
                        filters: aSearchFilters,
                        and: false
                    })
                );
            }


            var sStatus =
                this.byId("statusFilter").getSelectedKey();

            if (sStatus && sStatus !== "ALL") {

                aFilters.push(
                    new Filter(
                        "Status",
                        FilterOperator.EQ,
                        sStatus
                    )
                );
            }


            var oBinding =
                this.byId("productTable")
                    .getBinding("items");

            oBinding.filter(aFilters);

            this._updateResultCount();
        },


        /* =====================================================
           SORTING
           ===================================================== */

    onSort: function () {

    var oBinding = this.byId("productTable")
        .getBinding("items");

    var bDescending = this._bSortAscending;

    var oSorter = new Sorter(
        "ProductId",
        bDescending,
        false,

        function (a, b) {

            var iA = parseInt(
                String(a).replace(/\D/g, ""),
                10
            );

            var iB = parseInt(
                String(b).replace(/\D/g, ""),
                10
            );

            if (iA < iB) {
                return -1;
            }

            if (iA > iB) {
                return 1;
            }

            return 0;
        }
    );

    oBinding.sort(oSorter);

    // Toggle for next click
    this._bSortAscending = !this._bSortAscending;

    // Show what was actually applied
    var sMessage = bDescending
        ? "Sorted Product ID: Descending"
        : "Sorted Product ID: Ascending";

    MessageToast.show(sMessage);
},


        /* =====================================================
           RESET
           ===================================================== */

        onReset: function () {

    this.byId("productSearch").setValue("");

    this.byId("statusFilter").setSelectedKey("ALL");


    var oBinding = this.byId("productTable")
        .getBinding("items");


    // Remove filters
    oBinding.filter([]);


    // Remove sorting
    oBinding.sort([]);


    // Reset sorting state
    this._bSortAscending = true;


    // Update count
    this._updateResultCount();


    // Update statistics
    this._updateStatistics();


    MessageToast.show("Filters and sorting reset");

},


        /* =====================================================
           STATISTICS
           ===================================================== */

   _updateStatistics: function () {

    var oModel = this.getView().getModel("ProductMd1");

    if (!oModel) {
        return;
    }

    var aProducts = oModel.getProperty("/ProductCollection");

    if (!Array.isArray(aProducts) || aProducts.length === 0) {
        return;
    }

    // Total products
    var iTotal = aProducts.length;


    // Available products
    var iAvailable = aProducts.filter(function (oProduct) {
        return oProduct.Status === "Available";
    }).length;


    // Out of stock
    var iOutOfStock = aProducts.filter(function (oProduct) {
        return oProduct.Status === "Out of Stock";
    }).length;


    // Unique categories
    var aCategories = [];

    aProducts.forEach(function (oProduct) {

        if (
            oProduct.Category &&
            aCategories.indexOf(oProduct.Category) === -1
        ) {
            aCategories.push(oProduct.Category);
        }

    });


    // Update KPI cards
    this.byId("totalProductsNumber")
        .setNumber(iTotal);

    this.byId("availableProductsNumber")
        .setNumber(iAvailable);

    this.byId("outOfStockNumber")
        .setNumber(iOutOfStock);

    this.byId("categoriesNumber")
        .setNumber(aCategories.length);

},


_updateResultCount: function () {

    var oTable = this.byId("productTable");

    var oBinding = oTable.getBinding("items");

    if (!oBinding) {
        return;
    }

    var iCount = oBinding.getLength();

    this.byId("resultCount").setText(
        iCount + (iCount === 1 ? " product" : " products")
    );

},


        /* =====================================================
           ROW NAVIGATION
           ===================================================== */

        onItemPress: function (oEvent) {

            var oItem = oEvent.getSource();

            var oContext =
                oItem.getBindingContext("ProductMd1");

            var sProductId =
                oContext.getProperty("ProductId");

            var oRouter =
                UIComponent.getRouterFor(this);

            oRouter.navTo(
                "ProductDetails",
                {
                    ProductId: sProductId
                }
            );
        },


        /* =====================================================
           STATUS COLORS
           ===================================================== */

        formatStatusState: function (sStatus) {

            switch (sStatus) {

                case "Available":
                    return "Success";

                case "Out of Stock":
                    return "Error";

                case "Discontinued":
                    return "Warning";

                default:
                    return "None";
            }
        }

    });

});