using ManagementPlane as service from '../../../srv/data-provider';

annotate service.VKPIs with {
    kpiChapterID @Common: {
        Text           : kpiChapterName,
        TextArrangement: #TextFirst
    }
};
