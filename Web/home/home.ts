import './home.scss';
import { setupExtension } from '../../module/extensions';
import { setupDataTable } from '../../module/dataTable';

setupExtension();

class Person {
    partNumber : string = undefined;
    intCode : string = undefined;
    innerDiameter : string = undefined;
    outerDiameter : string = undefined;
    height : string = undefined;
    materialInfo : string = undefined;
    enquiry : string = undefined;
}

setupDataTable<Person>({
    elementId: 'example',
    config: {
        originalConfig : {
            dom: '<"top"i>rt<"bottom"i>',
            order: [],
            scrollY: '50vh',
            deferRender: false, //一定要false, 不然搜索后找不到eq，因为一开始只有很少的row element
            scroller: true,
            responsive: true,
        },
        ajaxUrl: '/data.json',
        //groupBy: (a, b) => a.name == b.name,
        columnDefs: [
            {  
                originalColumnDef: { 
                    title : 'part number',
                    targets: [0],
                    render:(data: any, type: any, row: Person, meta: any):any=>{
                        return row.partNumber
                    }
                },                
                filter: true
            },
            {  
                originalColumnDef: { 
                    title : 'int Code',
                    targets: [1],
                    render:(data: any, type: any, row: Person, meta: any):any=>{
                        return row.intCode
                    }
                },                
                filter: true
            },
            {  
                originalColumnDef: { 
                    title : 'inner diameter',
                    targets: [2],
                    render:(data: any, type: any, row: Person, meta: any):any=>{
                        return row.innerDiameter
                    }
                },                
                searchNearest: true
            },
            {  
                originalColumnDef: { 
                    title : 'outer diameter',
                    targets: [3],
                    render:(data: any, type: any, row: Person, meta: any):any=>{
                        return row.outerDiameter
                    }
                },                
                searchNearest: true
            },
            {  
                originalColumnDef: { 
                    title : 'height',
                    targets: [4],
                    render:(data: any, type: any, row: Person, meta: any):any=>{
                        return row.height
                    }
                },                
                searchNearest: true
            },
            {  
                originalColumnDef: { 
                    title : 'meterail',
                    targets: [5],
                    render:(data: any, type: any, row: Person, meta: any):any=>{
                        return `<a href="${row.materialInfo}">${row.materialInfo}</a>`;
                    }
                }               
            },
            {  
                originalColumnDef: { 
                    title : 'meterail',
                    targets: [6],
                    render:(data: any, type: any, row: any, meta: any):any=>{
                        return `<button data-row-data="${JSON.stringify(row).encodeHtml()}">button</button>`;
                    }
                },
                click : (row)=>{
                    console.log(row);
                }
            }
        ],
        objectForStructure: new Person()
    }
});






