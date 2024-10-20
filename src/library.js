/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library be.wl.serversiderendering.library.
 */
sap.ui.define([
	"sap/base/util/ObjectPath",
	"sap/ui/core/library"
], function (ObjectPath) {
	"use strict";

	// delegate further initialization of this library to the Core
	// Hint: sap.ui.getCore() must still be used to support preload with sync bootstrap!
	sap.ui.getCore().initLibrary({
		name: "be.wl.serversiderendering.library",
		version: "${version}",
		dependencies: [ // keep in sync with the ui5.yaml and .library files
			"sap.ui.core"
		],
		types: [
			"be.wl.serversiderendering.library.ExampleColor"
		],
		interfaces: [],
		controls: [
			"be.wl.serversiderendering.library.Example"
		],
		elements: [],
		noLibraryCSS: false // if no CSS is provided, you can disable the library.css load here
	});

	/**
	 * Some description about <code>be.wl.serversiderendering.library</code>
	 *
	 * @namespace
	 * @alias be.wl.serversiderendering.library
	 * @author lemaiwo
	 * @version ${version}
	 * @public
	 */
	const thisLib = ObjectPath.get("be.wl.serversiderendering.library");

	/**
	 * Semantic Colors of the <code>be.wl.serversiderendering.library.Example</code>.
	 *
	 * @enum {string}
	 * @public
	 */
	thisLib.ExampleColor = {

		/**
		 * Default color (brand color)
		 * @public
		 */
		Default : "Default",

		/**
		 * Highlight color
		 * @public
		 */
		Highlight : "Highlight"

	};

	return thisLib;

});
