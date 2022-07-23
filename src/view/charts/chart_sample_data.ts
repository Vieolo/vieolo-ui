import { BarChartData, StackedBarChartData } from "../../BarChart"

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
        dataDisplay: "1,300,000",
        fillColor: 'secondary'
    },
    {
        referenceAxis: 'Denmark',
        dataAxis: 5_000_000,
        dataDisplay: "5,000,000",
        fillColor: 'alert'
    },
    {
        referenceAxis: 'Sweden',
        dataAxis: 10_400_000,
        dataDisplay: "10,400,000"
    },
    {
        referenceAxis: 'Norway',
        dataAxis: 5_400_000,
        dataDisplay: "5,400,000"
    },
    {
        referenceAxis: 'UK',
        dataAxis: 67_200_000,
        dataDisplay: "67,200,000"
    },
    {
        referenceAxis: 'Moon',
        dataAxis: 0,
        dataDisplay: "0"
    }
]

export let cashReserveChangeData: BarChartData[] = [ // internal
    {
        referenceAxis: 'Mo',
        dataAxis: -1.3,        
        dataDisplay: "- %1.3",
        fillColor: 'error'
    },
    {
        referenceAxis: 'Tu',
        dataAxis: -2.1,        
        dataDisplay: "- %2.1",
        fillColor: 'error'
    },
    {
        referenceAxis: 'We',
        dataAxis: -0.3,        
        dataDisplay: "- %0.3",
        fillColor: 'error'
    },
    {
        referenceAxis: 'Th',
        dataAxis: -3.6,        
        dataDisplay: "- %3.6",
        fillColor: 'error'
    },
    {
        referenceAxis: 'Fr',
        dataAxis: -1.1,        
        dataDisplay: "- %1.1",
        fillColor: 'error'
    },
    {
        referenceAxis: 'Sa',
        dataAxis: -1.9,        
        dataDisplay: "- %1.9",
        fillColor: 'error'
    },
    {
        referenceAxis: 'Su',
        dataAxis: -2.4,        
        dataDisplay: "- %2.4",
        fillColor: 'error'
    },
]

export let revenueData: BarChartData[] = [ // internal
    {
        referenceAxis: '2009',
        dataAxis: 2.4,
        dataDisplay: "€2.4 M"
    },
    {
        referenceAxis: '2010',
        dataAxis: 0,
        dataDisplay: "€0 M"
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
    },
    {
        referenceAxis: '2017',
        dataAxis: -1.1,
        dataDisplay: "- €1.1 M",
        fillColor: 'error'
    }
]


export let weeklySalesBreakdown: StackedBarChartData[] = [ // internal
    {
        referenceAxis: "Mo",
        referenceAxisNumerical: 1,
        dataAxis: {
            "Mobile": 12_234,
            "Tablet": 987,
            "Laptop": 3_356,
            "Monitor": 488,
        },
    },
    {
        referenceAxis: "Tu",
        referenceAxisNumerical: 2,
        dataAxis: {
            "Mobile": 8_125,
            "Tablet": 336,
            "Laptop": 1_126,
            "Monitor": 245,
        },
    },
    {
        referenceAxis: "We",
        referenceAxisNumerical: 3,
        dataAxis: {
            "Mobile": 6_336,
            "Tablet": 1_156,
            "Laptop": 997,
            "Monitor": 178,
        },
    },
    {
        referenceAxis: "Th",
        referenceAxisNumerical: 4,
        dataAxis: {
            "Mobile": 7_354,
            "Tablet": 678,
            "Laptop": 1_898,
            "Monitor": 467,
        },
    },
    {
        referenceAxis: "Fr",
        referenceAxisNumerical: 5,
        dataAxis: {
            "Mobile": 14_356,
            "Tablet": 2_024,
            "Laptop": 5_356,
            "Monitor": 87,
        },
    },
    {
        referenceAxis: "Sa",
        referenceAxisNumerical: 6,
        dataAxis: {
            "Mobile": 15_235,
            "Tablet": 2_287,
            "Laptop": 5_002,
            "Monitor": 1_234,
        },
    },
    {
        referenceAxis: "Su",
        referenceAxisNumerical: 7,
        dataAxis: {
            "Mobile": 14_002,
            "Tablet": 1_958,
            "Laptop": 2_216,
            "Monitor": 154,
        },
    }
]