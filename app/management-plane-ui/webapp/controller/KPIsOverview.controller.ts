import View from "sap/ui/core/mvc/View";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import Card from "sap/f/Card";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import { Button$PressEvent } from "sap/ui/commons/Button";

/**
 * @namespace com.ndbs.managementplaneui.controller
 */
export default class KPIsOverview extends BaseController {

    private sectionID:string;
    /* ======================================================================================================================= */
    /* Lifecycle methods                                                                                                       */
    /* ======================================================================================================================= */

    public onInit() {
        this.getRouter().getRoute("RouteKPIsOverview")!.attachMatched(this.onObjectMatched, this);
    }

    /* ======================================================================================================================= */
    /* Event Handlers                                                                                                          */
    /* ======================================================================================================================= */

    public onNavToHomepage(): void {
        this.getRouter().navTo("RouteHomepage");
    }

    public onCardPress(event: Button$PressEvent) {
        const sectionID = event.getSource().getCustomData()[0].getValue();
        const kpiID = event.getSource().getCustomData()[1].getValue();
        this.getRouter().navTo('RouteKPIs', {
            sectionID:sectionID,
            kpiID:kpiID
        });
    } 

    /* ======================================================================================================================= */
    /* Private Functions                                                                                                       */
    /* ======================================================================================================================= */

    private onObjectMatched(event: Route$PatternMatchedEvent) {
        this.sectionID = (event.getParameters().arguments as { sectionID: string }).sectionID;
        this.applySectionFilter();
    }

    private applySectionFilter(): void {
        const tileBinding = (((this.getView() as View).byId("fbKPIsOverview") as Card).getBinding("items") as ListBinding);
        const filter = new Filter("sectionID", FilterOperator.EQ, this.sectionID);

        tileBinding.filter(filter);
    }
}

