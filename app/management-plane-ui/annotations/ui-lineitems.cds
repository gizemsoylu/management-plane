using ManagementPlane as service from '../../../srv/data-provider';

annotate service.KPIs @(UI: {
    SelectionFields: [
        AIStatus,
        userStatus,
        totalStatus
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: subChapter,
        },
        {
            $Type: 'UI.DataField',
            Value: state
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedAt,
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedBy,
        }
    ]
});

annotate service.VKPIs @(UI: {
    
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: kpiChapterID  
        },
        {
            $Type: 'UI.DataField',
            Value: kpiReportDate
        }
    ]
});
