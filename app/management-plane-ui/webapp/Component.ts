import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import FlexibleColumnLayoutSemanticHelper from "sap/f/FlexibleColumnLayoutSemanticHelper";
import View from "sap/ui/core/mvc/View";
import { LayoutType } from "sap/f/library";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.ndbs.managementplaneui
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json"
	};

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
	public init() : void {
		// call the base component's init function
		super.init();

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(createDeviceModel(), "device");
        this.setModel(new JSONModel(), "flexibleColumnLayout");
	}

    public getHelper(): FlexibleColumnLayoutSemanticHelper {
        const flexibleColumnLayout = ((this.getRootControl() as View).byId("flexibleApp") as FlexibleColumnLayout),
            settings = {
                defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                maxColumnsCount: window.location.hash.includes("details") ? 2 : 1
            };

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(flexibleColumnLayout, settings);
    }
}