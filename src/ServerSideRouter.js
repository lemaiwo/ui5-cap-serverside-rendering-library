sap.ui.define(["sap/ui/core/routing/Router", "be/wl/serversiderendering/library/ServerSideRoute"], function (Router, ServerSideRoute) {
    "use strict";


    return Router.extend("be.wl.serversiderendering.library.ServerSideRouter", {
        // fireRouteMatched: function (parameters) {
        //     Router.prototype.fireRouteMatched(parameters);
        //     return this;
        // },
        _createRoute: function (router, config, parent) {
            return new ServerSideRoute(router, config, parent, this._oOwner);
        }
    });
});