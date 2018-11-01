import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-scroller';
import 'datatables.net-select';

interface SColumnDefsSettings<T> {
    searchNearest?: boolean
    filter?: boolean
    click?: (row: T) => void
    originalColumnDef: DataTables.ColumnDefsSettings
}

interface TableConfig<T> {
    ajaxUrl: string
    groupBy?: (a: T, b: T) => boolean
    columnDefs: SColumnDefsSettings<T>[],
    objectForStructure: T,
    originalConfig: DataTables.Settings
}

export function setupDataTable<T>(config: { elementId: string, config: TableConfig<T> }) {
    const tableConfig = config.config;
    tableConfig.columnDefs.forEach(c => {
        if (c.filter || c.searchNearest) {
            c.originalColumnDef.orderable = false;
        }
    });

    const tableElement = document.getElementById(config.elementId);
    tableElement.classList.add(config.elementId);
    const $table = $(tableElement).on('init.dt', function () {
        
        $table.row(':eq(10)').scrollTo();
        const searchNearestIndexes = tableConfig.columnDefs.filter(c => c.searchNearest).map(c => (c.originalColumnDef.targets as [number])[0]);
        const filterIndexes = tableConfig.columnDefs.filter(c => c.filter).map(c => (c.originalColumnDef.targets as [number])[0]);
        const createInput = (indexes: number[], type: 'searchNearest' | 'filter'): void => {
            
            indexes.forEach(columnIndex => {
                const thisColumnInput = document.createElement('input');
                thisColumnInput.type = 'text';
                thisColumnInput.addEventListener('input', e => {
                    if (type === 'searchNearest') { 
                        
                        const columnDatas = $table.column(columnIndex).data();
                        const mapedTableDatas = columnDatas.map(function (value) {
                            return Math.abs(value - +(thisColumnInput.value));
                        });
                        const nearestValue = Math.min.apply(null, mapedTableDatas);
                        const rowIndex = mapedTableDatas.indexOf(nearestValue);
                        
                        $table.row(':eq(' + ((rowIndex - 3 <= 0) ? 0 : rowIndex - 3) + ')').scrollTo();
                        $table.rows().deselect();
                        $table.row(':eq(' + rowIndex + ')').select();
                    }
                    else {
                        $table.column(columnIndex).search(thisColumnInput.value).draw();
                    }
                });
                thisColumnInput.addEventListener('focus', e => {
                    document.querySelectorAll<HTMLInputElement>(`table.${config.elementId} thead input`).forEach(input => {
                        if (input !== thisColumnInput) input.value = '';
                    });
                    $table.column(columnIndex).order('asc').draw();
                    $table.rows().deselect();
                });
                document.querySelector(`table.${config.elementId} thead th:nth-of-type(${columnIndex + 1})`).appendChild(thisColumnInput);
            })
        }

        createInput(searchNearestIndexes, 'searchNearest');
        createInput(filterIndexes, 'filter');
    }).DataTable({
        ...tableConfig.originalConfig,
        ...{
            ajax: {
                url: tableConfig.ajaxUrl,
                dataSrc: function (data: { data: any[][] }) {
                    const datas = data.data;
                    const datasAfterMap = datas.map<T>((array) => {
                        let item: any = {};
                        const keys = Object.keys(tableConfig.objectForStructure);
                        array.forEach((value, index) => {
                            item[keys[index]] = value;
                        });
                        return item;
                    });
                    return (tableConfig.groupBy) ? datasAfterMap.groupBy(tableConfig.groupBy) : datasAfterMap;
                }

            },
            columnDefs: tableConfig.columnDefs.map(columnDef => columnDef.originalColumnDef)
        }
    });

    const clickMethodVsIndex = tableConfig.columnDefs.filter(c => c.click).reduce<{ [name: number]: (row: T) => void }>((result, columnDef) => {
        result[(columnDef.originalColumnDef.targets as [number])[0]] = columnDef.click;
        return result;
    }, {});

    document.getElementById(config.elementId).addEventListener('click', e => {
        const targetElement = e.target as HTMLElement;
        let loopElement = targetElement;
        if (targetElement.dataset['rowData'] === undefined) {
            console.error('Jquery Datatable : click event missing dataset["rowData"]');
        }
        const rowData = JSON.parse(targetElement.dataset['rowData']);

        while (loopElement !== null) {
            if (loopElement.tagName === 'TD') {
                const columnIndex = $table.cell(loopElement).index().columnVisible;
                clickMethodVsIndex[columnIndex](rowData);
                break;
            }
            else {
                loopElement = loopElement.parentElement;
            }
        }
    });
}






