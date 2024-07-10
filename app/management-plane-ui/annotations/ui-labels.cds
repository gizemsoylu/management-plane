using ManagementPlane as service from '../../../srv/data-provider';

annotate service.KPIs with {
    ID             @Common.Label: '{i18n>kpiID}';
    chapterID       @Common.Label: '{i18n>chapterID}';
    chapterName    @Common.Label: '{i18n>chapterName}';
    subChapter     @Common.Label: '{i18n>subChapter}';
    subchapterID   @Common.Label: '{i18n>subchapterID}';
    subchapterName @Common.Label: '{i18n>subchapterName}';
    subDescription @Common.Label: '{i18n>subDescription}';
    paragraph      @Common.Label: '{i18n>paragraph}';
    state          @Common.Label: '{i18n>state}';
    sectionID      @Common.Label: '{i18n>sectionID}';
    modifiedAt     @Common.Label: '{i18n>modifiedAt}';
    modifiedBy     @Common.Label: '{i18n>modifiedBy}';
    createdAt      @Common.Label: '{i18n>createdAt}';
    createdBy      @Common.Label: '{i18n>createdBy}';
    AIStatus       @Common.Label: '{i18n>AIStatus}';
    userStatus     @Common.Label: '{i18n>userStatus}';
    totalStatus    @Common.Label: '{i18n>totalStatus}';
}
annotate service.VKPIs with {
   
    kpiReportDate    @Common.Label: '{i18n>kpiReportDate}';
    kpiChapterID     @Common.Label: '{i18n>kpiChapterID}';
}

