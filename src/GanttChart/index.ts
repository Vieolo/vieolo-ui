import GanttChart, { 
    GanttChartColumnGroup as GCCG, 
    GanttChartColumnTitle as GCCT, 
    GanttChartContextMenuItem as GCCMI, 
    GanttChartRowType as GCRT, 
    GanttChartItemType as GCIT,
    GanttChartAuxiliaryItemType as GCAI
} from './gantt_chart';

export default GanttChart;

export type GanttChartColumnGroup = GCCG;
export type GanttChartColumnTitle = GCCT;
export type GanttChartContextMenuItem = GCCMI;
export type GanttChartRowType = GCRT;
export type GanttChartItemType = GCIT;
export type GanttChartAuxiliaryItemType = GCAI;