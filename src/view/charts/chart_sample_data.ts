import { BarChartData } from "../../BarChart"

export let populationData: BarChartData[] = [ // internal
    {
        referenceAxis: 'Germany',
        dataAxis: 80_000_000,        
        dataDisplay: "80,000,000.00",
        fillColor: 'primary'
    },
    {
        referenceAxis: 'Estonia',
        dataAxis: 1_300_000,
        dataDisplay: "1,300,000.00",
        fillColor: 'secondary'
    },
    {
        referenceAxis: 'Denmark',
        dataAxis: 5_000_000,
        dataDisplay: "5,000,000.00",
        fillColor: 'alert'
    },
    {
        referenceAxis: 'Sweden',
        dataAxis: 10_400_000,
        dataDisplay: "10,400,000.00"
    },
    {
        referenceAxis: 'Norway',
        dataAxis: 5_400_000,
        dataDisplay: "5,400,000.00"
    },
    {
        referenceAxis: 'UK',
        dataAxis: 67_200_000,
        dataDisplay: "67,200,000.00"
    }
]

export let revenueData: BarChartData[] = [ // internal
    {
        referenceAxis: '2010',
        dataAxis: 2.4,
        dataDisplay: "€2.4 M"
    },
    {
        referenceAxis: '2011',
        dataAxis: -0.14,
        dataDisplay: "- €0.14 M",
        fillColor: 'error'
    },
    {
        referenceAxis: '2012',
        dataAxis: 0.92,
        dataDisplay: "€0.92 M"
    },
    {
        referenceAxis: '2013',
        dataAxis: 1.8,
        dataDisplay: "€1.8 M"
    },
    {
        referenceAxis: '2014',
        dataAxis: 2.9,
        dataDisplay: "€2.9 M"
    },
    {
        referenceAxis: '2015',
        dataAxis: 1.9,
        dataDisplay: "€1.9 M"
    },
    {
        referenceAxis: '2016',
        dataAxis: -1.8,
        dataDisplay: "- €1.8 M",
        fillColor: 'error'
    }
]