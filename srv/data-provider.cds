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
            )   as subChapter : String,
            case
                when
                    chapterID = 'E'
                then
                    'sap-icon://e-care'
                when
                    chapterID = 'S'
                then
                    'sap-icon://jam'
                when
                    chapterID = 'G'
                then
                    'sap-icon://official-service'
                else
                    'sap-icon://e-care'
            end as sapIcon    : String
        };
}
