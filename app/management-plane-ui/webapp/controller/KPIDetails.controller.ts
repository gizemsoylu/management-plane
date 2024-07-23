import BaseController from "./BaseController";
import Route, { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import formatter from "../model/formatter";
import View from "sap/ui/core/mvc/View";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { IBindingParams, IKPIs, IUserAPI } from "com/ndbs/managementplaneui/types/global.types"
import Title from "sap/m/Title";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import SmartTable, { SmartTable$BeforeRebindTableEvent } from "sap/ui/comp/smarttable/SmartTable";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ShellBar from "sap/f/ShellBar";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import { Menu$ItemSelectEvent } from "sap/ui/unified/Menu";
import { LayoutType } from "sap/f/library";
import UserAPI from "../utils/session/UserAPI";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";

/**
 * @namespace com.ndbs.managementplaneui.controller
 */
export default class KPIDetails extends BaseController {
    /* ======================================================================================================================= */
    /* Lifecycle methods                                                                                                       */
    /* ======================================================================================================================= */
    public formatter = formatter;
    private sectionID: string;
    private kpiID: string;
    private subKPI: string;
    private paragraph:string;
    public subChapterName: string;
    public onInit() {
        (this.getRouter().getRoute("RouteKPIDetails") as Route).attachMatched(this.onObjectMatched, this);
    }

    /* ======================================================================================================================= */
    /* Event Handlers                                                                                                          */
    /* ======================================================================================================================= */

    public onNavToHomepage(): void {
        this.getRouter().navTo("RouteHomepage");
    }

    public onNavToKPIs() {
        this.getRouter().navTo("RouteKPIs", {
            sectionID: this.sectionID,
            kpiID: this.kpiID
        });
    }
    public onBeforeRebindTable(event: SmartTable$BeforeRebindTableEvent) {
        const binding = event.getParameter("bindingParams") as IBindingParams;
        const kpiFilters = new Filter("kpiID", FilterOperator.EQ, this.kpiID);
        binding.filters.push(kpiFilters);
    }

    /* ======================================================================================================================= */
    /* Private Functions                                                                                                       */
    /* ======================================================================================================================= */

    private onObjectMatched(event: Route$PatternMatchedEvent) {
        this.sectionID = (event.getParameters() as IBindingParams).arguments.sectionID;
        this.kpiID = (event.getParameters() as IBindingParams).arguments.kpiID;
        this.subKPI = (event.getParameters() as IBindingParams).arguments.subKPI;
        this.paragraph = (event.getParameters() as IBindingParams).arguments.paragraph;
        const navigation = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

        if (navigation.type == "reload") {
            this.onNavToKPIs();
        }
        this.setReportChangeHistory();

        (this.byId("kpiDetailTitle") as Title).setText(this.subKPI + "para." + this.paragraph);
        (this.byId("sfKPIsReport") as SmartForm).bindElement("/VKPIsReports(kpiID=guid'" + this.kpiID + "',kpiParagraph='" + this.paragraph + "')");

        ((this.getView() as View).getModel() as ODataModel).read("/KPIs(ID=guid'" + (this.kpiID) + "',paragraph='" + this.paragraph + "')", {
            urlParameters: {
                "$expand": "documents",
            },
            success: (data: IKPIs) =>  {
                this.subChapterName = data.subchapterName;
                (this.byId("sbKPIs") as ShellBar).setTitle("Details of " + this.subChapterName);
                (this.byId("oplKpi") as ObjectPageLayout).bindElement({
                    path: "/VKPIDocuments(ID=guid'" + (this.kpiID) + "',paragraph='" + this.paragraph + "')",
                    events: {
                        dataReceived: () => {
                            (this.byId("stDocuments") as SmartTable).rebindTable(true);
                        }
                    }
                });
            },
            error: () => {
                /**
                 * Add error messages
                 */
            }
        });
    }

    private onMenuAction(event: Menu$ItemSelectEvent){
        const action = ((event.getParameter("item")as any).getText()as string);
        if(action ==="Change History"){
            this.getRouter().navTo("RouteChangeHistory", {
            layout: LayoutType.ThreeColumnsMidExpanded,
            sectionID: this.sectionID,
            kpiID: this.kpiID,
            subKPI: this.subKPI,
            paragraph: this.paragraph
            });
        }

    }
    private async setReportChangeHistory() {
        const user = new UserAPI(this);
        const session = await user.getLoggedOnUser();
        const userSession :IUserAPI = {
            fullName: session.firstname + " "+session.lastname,
            modifiedType: "Regenerate the report",
            modifiedContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat.",
            avatar: session.firstname.substring(0, 1) + session.lastname.substring(0, 1) as string,
            iconType: "sap-icon://user-edit",
            firstname: session.firstname,
            lastname: session.firstname,
            email: session.firstname
        };
        const creator = new ODataCreateCL<IUserAPI>(this, "ReportHistory");

        creator.setData(userSession);
        creator.create();

    }
}

