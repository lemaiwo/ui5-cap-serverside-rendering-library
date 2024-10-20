sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit TestSuite for be.wl.serversiderendering.library",
		defaults: {
			bootCore: true,
			ui5: {
				libs: "sap.ui.core,be.wl.serversiderendering.library",
				theme: "sap_horizon",
				noConflict: true,
				preload: "auto"
			},
			qunit: {
				version: 2,
				reorder: false
			},
			sinon: {
				version: 4,
				qunitBridge: true,
				useFakeTimers: false
			},
			module: "./{name}.qunit",
			coverage: {
				only: ["be/wl/serversiderendering/library/"],
				never: ["test-resources/"]
			}
		},
		tests: {
			// test file for the Example control
			Example: {
				title: "QUnit Test for Example",
				_alternativeTitle: "QUnit tests: be.wl.serversiderendering.library.Example"
			}
		}
	};
});
