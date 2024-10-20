sap.ui.define(["sap/ui/core/routing/Route", "sap/ui/base/EventProvider", "sap/ui/core/mvc/View", "sap/ui/core/Element"], function (Route, EventProvider, View, Element) {
    "use strict";

    return Route.extend("be.wl.serversiderendering.library.ServerSideRoute", {
        constructor: function (oRouter, oConfig, oParent, owner) {
            EventProvider.apply(this, arguments);


            this.owner = owner;

            this._validateConfig(oConfig);

            this._aPattern = [];
            this._aRoutes = [];
            this._oParent = oParent;
            this._oConfig = oConfig;
            this._oRouter = oRouter;

            const that = this;
            let vRoute = oConfig.pattern;

            if (!Array.isArray(vRoute)) {
                vRoute = [vRoute];
            }

            if (oConfig.pattern === undefined) {
                //this route has no pattern - it will not get a matched handler. Or a crossroads route
                return;
            }

            vRoute.forEach(function (sRoute, iIndex) {

                that._aPattern[iIndex] = sRoute;

                that._aRoutes[iIndex] = oRouter._oRouter.addRoute(sRoute);
                that._checkRoute(that._aRoutes[iIndex]);
                that._aRoutes[iIndex].greedy = oConfig.greedy;

                that._aRoutes[iIndex].matched.add(function () {
                    const oArguments = {};
                    Array.from(arguments).forEach(function (sArgument, iArgumentIndex) {
                        oArguments[that._aRoutes[iIndex]._paramsIds[iArgumentIndex]] = sArgument;
                    });
                    that._routeMatched(oArguments, true);
                });

                that._aRoutes[iIndex].switched.add(function () {
                    that._routeSwitched();
                });
            });
        },
        _routeMatched: async function (oArguments) {

            const oRouter = this._oRouter;
            let bInitial;

            oRouter._sRouteInProgress = null;
            oRouter._stopWaitingTitleChangedFromChild();

            if (oRouter._oMatchedRoute) {
                // clear the dynamicTarget of the previous matched route
                delete oRouter._oMatchedRoute._oConfig.dynamicTarget;
            }

            oRouter._oMatchedRoute = this;
            oRouter._bMatchingProcessStarted = true;

            const oConfig = { ...oRouter._oConfig, ...this._oConfig };

            // make a copy of arguments and forward route config to target
            const oTargetData = Object.assign({}, oArguments);
            oTargetData.routeConfig = oConfig;

            const oEventData = {
                name: oConfig.name,
                arguments: oArguments,
                config: oConfig
            };

            // fire the beforeMatched and beforeRouteMathced events
            this.fireBeforeMatched(oEventData);
            oRouter.fireBeforeRouteMatched(oEventData);

            let url = oConfig.url;
            for (const arg in oArguments) url = url.replaceAll(`{${arg}}`, oArguments[arg])
            const response = await fetch(url);
            const result = await response.text()
            const createView = new Promise((resolve, reject) => this.owner.runAsOwner(async () => {
                const view = await View.create({
                    type: 'XML',
                    definition: result
                });
                resolve(view);
            }));
            const view = await createView;
            //  var oViewContainingTheControl = oParentInfo.view;
            const controlView = Element.getElementById(oTargetData.routeConfig.targetParent);
            await controlView.loaded();

            // add oObject to oContainerControl's aggregation
            controlView.getContent()[0].removeAllPages()
            controlView.getContent()[0].addPage(view);

            this.fireEvent("matched", oEventData);
            oRouter.fireRouteMatched(oEventData);
            // skip this event in the recursion
            if (bInitial) {
                // Log.info("The route named '" + oConfig.name + "' did match with its pattern", this);
                this.fireEvent("patternMatched", oEventData);
                oRouter.fireRoutePatternMatched(oEventData);
            }

            return { view, control: controlView };
        }
    })
});