using {
    Sections  as DBSections,
    KPIs      as DBKPIs,
    Documents as DBDocuments
} from '../db/data-models';

@require: 'authenticated-user'
service ManagementPlane {
    entity Sections  as projection on DBSections;
    entity Documents as projection on DBDocuments;

    entity KPIs      as
        projection on DBKPIs {
            *,
            (
                subchapterID || ' para. ' || paragraph
            )     as subChapter : String,
            case
                when
                    chapterID like 'E%'
                then
                    'sap-icon://e-care'
                when
                    chapterID like 'S%'
                then
                    'sap-icon://jam'
                when
                    chapterID like 'G%'
                then
                    'sap-icon://official-service'
                else
                    'sap-icon://e-care'
            end   as sapIcon    : String,
            (
                    select count(
                        distinct state
                    ) from DBKPIs
                ) as stateCount : Integer

            };

    entity VKPIs as
        select from DBSections as sec
        left outer join DBKPIs as kpi
            on sec.ID = kpi.sectionID
        {
            
            key kpi.ID      as kpiID : UUID,
            kpi.sectionID   as sectionID: UUID,
            sec.type        as sectionType :String,
            sec.name        as sectionName :String,
            kpi.chapterID   as kpiChapterID :String,
            kpi.chapterName as kpiChapterName:String,
            kpi.state       as kpiState:String,
            kpi.reportDate as kpiReportDate:Date
        }

        entity VKPIStateCount as select  from VKPIs as kpi{
        key kpi.sectionID,
            kpi.sectionType,
            kpi.kpiState,
            count(kpi.kpiState) as kpiStateCount:Integer
             
        }group by kpi.sectionType,kpi.kpiState,kpi.sectionID ;

}
