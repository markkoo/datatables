import './home.scss';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-scroller';
import 'datatables.net-select';
import { setupExtension } from '../../module/extensions';

setupExtension();

let $table = $('#example').DataTable({
    ajax: ({
        url: '/data.json',
        dataSrc: function (data: { data: string[][] }) {
            // [['a','b'], []]
            // [{  }]

            const datas = data.data;
            const keys = ['name', 'age', 'like', 'code', 'super', 'lala'];
            return datas.map((array, index) => {
                let item: { [name: string ]: any } = {};
                item[keys[index]] = array[index];
                return item;
            }).groupBy((a, b) => a['name'] === b['name'] );
        }
    }),
    columnDefs: [
        {
            title: 'name',
            targets: [0],
            render: function (data: any, type: any, row: any, meta: any): any {
                return `<a href='${row[0]['name']}'>${row[0]['name']}</a>`
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
            }
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
            }
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
        //        
    }
});

document.getElementById('example').addEventListener('click', (e) => {
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

});









