using ManagementPlane as service from '../../../srv/data-provider';

annotate service.VKPIStateCount with @(sap.semantics: 'aggregate') {
    kpiState      @sap.aggregation.role: 'dimension';
    kpiStateCount @sap.aggregation.role: 'measure';
};

annotate service.VKPIStateCount with @(UI.Chart: {
    Title      : '{i18n>kpisDistribution}',
    Description: '{i18n>kpisDistributionOverview}',
    ChartType  : #Pie,
    Measures   : [
        kpiStateCount,
    ],
    Dimensions : [kpiState]
});
