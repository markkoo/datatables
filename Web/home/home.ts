import './home.scss';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-scroller';
import 'datatables.net-select';
import { setupExtension } from '../../module/extensions';

setupExtension();
function htmlEntities(str: string) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


interface SColumnDefsSettings<T> extends DataTables.ColumnDefsSettings {
    searchNearest? : boolean
    filter? : boolean
    click?: (row: T) => void
}

interface TableConfig<T> {
    ajaxUrl : string
    groupBy? : (a: T, b: T) => boolean
    columnDefs : SColumnDefsSettings<T>[]
}

function setupDataTable<T>(config : { elementId : string, config : TableConfig<T> }) {
    const tableConfig = config.config;
    $(document.getElementById(config.elementId)).DataTable({
        ajax: ({
            url: tableConfig.ajaxUrl,
            dataSrc: function (data: { data: string[][] }) {
                const datas = data.data;
                const result = datas.map((array) => {
                    let item: { [name: string]: T } = {};
                    array.forEach((value, index) => {
                        item[keys[index]] = value;
                    });
                    return item;
                }).groupBy((a, b) => a['name'] === b['name']);
                return result;
            }
        }),
    })
}

class Person {
    name : string
    age : number
    like : string
    code : string
    super : string
    lala : string
}

setupDataTable<Person>({
    elementId: 'asd',
    config: {
        ajaxUrl: '',
        groupBy: (a, b) => a.name == b.name,
        columnDefs : [{ targets : [0], searchable : true, filter : true, click : (row) => { row.name; } }]
    }
});






let config = {
    url: '/data.json',
    groupBy: (a: any, b: any) => a['name'] === b['name'],
    columnDefs: [
        {
            searchkajing : true,
            filterable : true,
            click : (row : any)=>{
                // popup()
            }
        }
    ]
}

const keys = ['name', 'age', 'like', 'code', 'super', 'lala'];
let $table = $('#example').DataTable({
    ajax: ({
        url: '/data.json',
        dataSrc: function (data: { data: string[][] }) {
            const datas = data.data;
            const result = datas.map((array) => {
                let item: { [name: string]: any } = {};
                array.forEach((value, index) => {
                    item[keys[index]] = value;
                });
                return item;
            }).groupBy((a, b) => a['name'] === b['name']);
            return result;
        }
    }),
    columnDefs: [
        {
            title: 'name',
            targets: [0],
            render: function (data: any, type: any, row: any, meta: any): any {
                if (row.length > 1) {
                    return `<button class="click" data-value="${htmlEntities(JSON.stringify(row[0]))}" >click 1</button>
                            <br>
                            <button class="click" data-value="${ htmlEntities(JSON.stringify(row[1]))}" >click 2</button>
                        `;
                }
                else {
                    return `<button>only 1</button>`;
                }
                return '';
            }
        },
        {
            title: 'age',
            targets: [1],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0]['age']
            }
        },
        {
            title: 'like',
            targets: [2],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0]['like']
            },
            orderable: false
        },
        {
            title: 'code',
            targets: [3],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0]['code']
            }
        },
        {
            title: 'super',
            targets: [4],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0]['super']
            },
            orderable: false
        },
        {
            title: 'lala',
            targets: [5],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0]['lala']
            }
        },
        {
            title: 'button',
            targets: [6],
            render: function (data: any, type: any, row: any, meta: any): any {
                return '<button class="enquiryButton">Enquiry</button>'
            }
        }
    ],
    initComplete: function (settings, json) {
        // search 
        // filter

        ['super', 'like'].forEach(key => {

            const thisColumnInput = document.createElement('input');
            thisColumnInput.type = 'text';
            thisColumnInput.addEventListener('input', e => {
                console.log(thisColumnInput.value);
            });
            thisColumnInput.addEventListener('focus', e => {
                document.querySelectorAll<HTMLInputElement>('#example th input').forEach(input => {
                    if (input !== thisColumnInput) input.value = '';
                });
                $table.column(keys.indexOf(key)).order('asc').draw();
            });
            document.querySelector(`#example th:nth-of-type(${keys.indexOf(key) + 1})`).appendChild(thisColumnInput);

        });



    }
});

document.getElementById('example').addEventListener('click', e => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('enquiryButton')) {
        let parent = element.parentElement;
        while (parent != null) {
            if (parent.tagName === 'TR') {
                console.log($table.rows(parent).data()[0]);
                break;
            }
            else {
                parent = parent.parentElement
            }
        }
    }
    else if (element.classList.contains('click')) {
        console.log(element.dataset['value']);
        console.log(JSON.parse(element.dataset['value']));
    }

});









