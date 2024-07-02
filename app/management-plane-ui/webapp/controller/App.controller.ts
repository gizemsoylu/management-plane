import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import Router, { Router$BeforeRouteMatchedEvent, Router$RouteMatchedEvent } from "sap/ui/core/routing/Router";
import JSONModel from "sap/ui/model/json/JSONModel";
import { FlexibleColumnLayout$StateChangeEvent } from "sap/f/FlexibleColumnLayout";

/**
 * @namespace com.ndbs.managementplaneui.controller
 */
export default class App extends Controller {
    private router: Router;
    private currentRouteName: string;

    /* ======================================================================================================================= */
    /* Lifecycle methods                                                                                                       */
    /* ======================================================================================================================= */

    public onInit(): void {
        this.router = (this.getOwnerComponent() as UIComponent).getRouter();
        this.router.attachRouteMatched(this.onRouteMatched, this);
        this.router.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
    }

    public onBeforeRouteMatched(event: Router$BeforeRouteMatchedEvent) {
        const component = this.getOwnerComponent() as Component;
        const layout = (event.getParameters().arguments as { layout?: string }).layout || "OneColumn";
        (component.getModel("flexibleColumnLayout") as JSONModel).setProperty("/layout", layout);
    }

    public onRouteMatched(event: Router$RouteMatchedEvent) {
        const routeName = event.getParameter("name");
        const routeArguments = event.getParameter("arguments");
        this.updateUIElements();

        this.currentRouteName = routeName as string;
    }

    public onStateChanged(event: FlexibleColumnLayout$StateChangeEvent) {
        const isNavigationArrow = event.getParameter("isNavigationArrow");
        const layout = event.getParameter("layout");

        this.updateUIElements();

        if (isNavigationArrow) {
            this.router.navTo(this.currentRouteName, {
                layout: layout
            });
        }
    }

    private updateUIElements() {
        const component = this.getOwnerComponent() as Component;
        const uiState = component.getHelper().getCurrentUIState();
        (component.getModel("flexibleColumnLayout") as JSONModel).setData(uiState);
    }
}