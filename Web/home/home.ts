import './home.scss';
import { setupExtension } from '../../module/extensions';
import { setupDataTable } from '../../module/dataTable';

setupExtension();

class Person {
    partNumber: string = undefined;
    intCode: string = undefined;
    innerDiameter: string = undefined;
    outerDiameter: string = undefined;
    height: string = undefined;
    materialInfo: string = undefined;
    enquiry: string = undefined;
}

setupDataTable<Person>({
    elementId: 'example',
    config: {
        dom: '<"top"i>rt<"bottom"i>',
        order: [],
        scrollY: '50vh', 
        sAjaxUrl: '/data1.json',
        sGroupBy: (a, b) => a.partNumber == b.partNumber,
        columns: [
            {
                sKey: 'partNumber',
                sFilter: true, 
            },  
            {
                sKey : 'intCode', 
                sFilter: true
            },
            {
                sKey : 'innerDiameter', 
                sSearchNearest: true
            },
            {
                sKey: 'outerDiameter', 
                sSearchNearest: true
            },
            {
                sKey: 'height', 
                sSearchNearest: true
            },
            {
                title: 'meterail',
                sKey: 'materialInfo',
                render: (data: any): any => {
                    return `<a href="${data}">${data}</a>`;
                }
            },
            {
                sKey: 'enquiry',
                render: (data, type, row): any => {
                    // console.log(row);
                    return `<button data-row-data="${JSON.stringify(row).encodeHtml()}">button</button>`;
                },
                sClick: (row) => {
                    console.log(row);
                }
            }
        ],
        sObjectForStructure: new Person()
    }
});






