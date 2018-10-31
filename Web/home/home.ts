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
            const key = ['name', 'age', 'like', 'code', 'super'];
            data.data.map(arr => arr.map((v, i) => {
                let item: { [name: string]: any } = {};
                item[key[i]] = v;
                return item;
            }));
            
            return data.data.groupBy((a, b) => a[0] === b[0]);
        }
    }),
    columnDefs: [
        {
            title: "link",
            targets: [0],
            render: function (data: any, type: any, row: any, meta: any): any {
                return `<a href="${row[0][0]}">${row[0][0]}</a>`
            }
        },
        {
            title: "b",
            targets: [1],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0][1]
            }
        },
        {
            title: "c",
            targets: [2],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0][2]
            }
        },
        {
            title: "d",
            targets: [3],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0][3]
            }
        },
        {
            title: "e",
            targets: [4],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0][4]
            }
        },
        {
            title: "f",
            targets: [5],
            render: function (data: any, type: any, row: any, meta: any): any {
                return row[0][5]
            }
        },
        {
            title: "button",
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








