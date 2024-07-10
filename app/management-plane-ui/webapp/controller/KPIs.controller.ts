import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import SmartTable, { SmartTable$BeforeRebindTableEvent } from "sap/ui/comp/smarttable/SmartTable";
import { IBindingParams } from '../types/global.types'
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import { ListItemBase$PressEventParameters } from "sap/m/ListItemBase";
import ColumnListItem from "sap/m/ColumnListItem";
import Context from "sap/ui/model/Context";
import Event from "sap/ui/base/Event";
import { LayoutType } from "sap/f/library";

/**
 * @namespace com.ndbs.managementplaneui.controller
 */
export default class KPIs extends BaseController {

    private sectionID: string;
    private kpiID: string;
    /* ======================================================================================================================= */
    /* Lifecycle methods                                                                                                       */
    /* ======================================================================================================================= */

    public onInit() {
        this.getRouter().getRoute("RouteKPIs")!.attachMatched(this.onObjectMatched, this);
    }

    /* ======================================================================================================================= */
    /* Event Handlers                                                                                                          */
    /* ======================================================================================================================= */

    public onNavKPIsOverview(): void {
        this.getRouter().navTo("RouteKPIsOverview", {
            sectionID: this.sectionID
        });
    }

    public onBeforeRebindTable(event: SmartTable$BeforeRebindTableEvent) {
        const binding = event.getParameter("bindingParams") as IBindingParams;
        const filters = new Filter("sectionID", FilterOperator.EQ, this.sectionID);
        binding.filters.push(filters);
    }

    public onItemPressed(event: Event<ListItemBase$PressEventParameters, ColumnListItem>) {
        const subKPI: string = ((event.getSource().getBindingContext() as Context).getObject() as { subchapterID: string }).subchapterID;
        this.getRouter().navTo("RouteKPIDetails", {
            layout: LayoutType.TwoColumnsMidExpanded,
            sectionID: this.sectionID,
            kpiID: this.kpiID,
            subKPI: subKPI
        });
    }


    /* ======================================================================================================================= */
    /* Private Functions                                                                                                       */
    /* ======================================================================================================================= */

    private onObjectMatched(event: Route$PatternMatchedEvent) {
        this.sectionID = (event.getParameters().arguments as { sectionID: string }).sectionID;
        this.kpiID = (event.getParameters().arguments as { kpiID: string }).kpiID;
        const smartTable = this.byId("stKPIs") as SmartTable;

        if (smartTable.isInitialised()) {
            smartTable.rebindTable(true);
        }
    }
}

