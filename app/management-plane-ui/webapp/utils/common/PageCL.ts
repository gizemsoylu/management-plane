import BaseObject from "sap/ui/base/Object";
import Messaging from "sap/ui/core/Messaging";
import UIComponent from "sap/ui/core/UIComponent";
import View from "sap/ui/core/mvc/View";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { PageController, Routes } from "com/ndbs/managementplaneui/types/global.types";
import MenuItem from "sap/m/MenuItem";

/**
 * @namespace com.ndbs.managementplaneui.util.common
 */
export default class PageCL<T extends PageController> extends BaseObject {
    private pageInitialized: boolean;
    private pageRoute: Routes;
    private sourceController: T;
    private sourceView: View;
    private oDataModel: ODataModel;
    private readonly menuItems = [{
        route: "RouteHomepage",
        itemID: "mnitHomepage"
    },{
        route: "RoutePortletsConfiguration",
        itemID: "mnitPortletsConfiguration"
    }];

    constructor(sourceController: T, pageRoute: Routes) {
        super();
        this.sourceController = sourceController;
        this.pageRoute = pageRoute;
        this.pageInitialized = false;
        this.sourceView = sourceController.getView() as View;
        this.oDataModel = (sourceController.getOwnerComponent() as UIComponent).getModel() as ODataModel;
    }

    public isInitialized() {
        return this.pageInitialized;
    }

    public initialize() {
        // register message model
        const messageModel = Messaging.getMessageModel();
        this.sourceView.setModel(messageModel, "message");
        Messaging.registerObject(this.sourceView, true);

        // detach the request fail event handler before leaving the page
        this.sourceView.addEventDelegate({
            onBeforeHide: () => {
                this.oDataModel.detachRequestFailed(this.sourceController.onODataRequestFail, this.sourceController);
            }
        }, this.sourceController);

        // attach the object match handler
        const route = this.sourceController.getRouter().getRoute(this.pageRoute);

        if (route) {
            route.attachPatternMatched(this.sourceController.onObjectMatched, this.sourceController);
        }

        // this.setMenuItemVisibility();

        this.pageInitialized = true;
    }

    // private setMenuItemVisibility() {
    //     for (const item of this.menuItems) {
    //         if (this.pageRoute === item.route) {
    //             (this.sourceView.byId(item.itemID) as MenuItem).setVisible(false);
    //         } else {
    //             (this.sourceView.byId(item.itemID) as MenuItem).setVisible(true);
    //         }
    //     }
    // }
}