import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgChartOptions } from 'ag-charts-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface EmployeeData {
  employee: string;
  department: string;
  tasksCompleted: number;
  tasksPending: number;
}

type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'donut';

@Component({
  selector: 'app-employee-component',
  standalone: false,
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent implements OnInit {
  rowData: EmployeeData[] = [];
  currentChartType: ChartType = 'bar';
  chartOptions: AgChartOptions = {}

  colDefs: ColDef[] = [
    { field: 'employee', headerName: 'Employee' },
    { field: 'department', headerName: 'Department' },
    { field: 'tasksCompleted', headerName: 'Tasks Completed' },
    { field: 'tasksPending', headerName: 'Tasks Pending' }
  ];


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<EmployeeData[]>('assets/data.json').subscribe({
      next: (data) => {
        this.rowData = data;
        this.updateChart(this.currentChartType);
      },
      error: (error) => {
        console.error('Error loading data from file, using hardcoded data:', error);
      }
    });
  }

  switchChart(type: ChartType) {
    this.currentChartType = type;
    this.updateChart(type);
  }

  isActiveChart(type: ChartType): boolean {
    return this.currentChartType === type;
  }


  private updateChart(type: ChartType) {
    switch (type) {
      case 'bar':
        this.chartOptions = this.getBarChartOptions();
        break;
      case 'line':
        this.chartOptions = this.getLineChartOptions();
        break;
      case 'area':
        this.chartOptions = this.getAreaChartOptions();
        break;
      case 'pie':
        this.chartOptions = this.getPieChartOptions();
        break;
      case 'donut':
        this.chartOptions = this.getDonutChartOptions();
        break;
    }
  }




  private getBarChartOptions(): AgChartOptions {
    return {
      title: { text: 'Employee Tasks Performance' },
      data: this.rowData,
      series: [
        {
          type: 'bar',
          xKey: 'employee',
          yKey: 'tasksCompleted',
          yName: 'Tasks Completed',
          label: { enabled: true, color: 'black', fontWeight: 'bold' }
        },
        {
          type: 'bar',
          xKey: 'employee',
          yKey: 'tasksPending',
          yName: 'Tasks Pending',
          label: { enabled: true, color: 'black', fontWeight: 'bold' }
        }
      ],
      axes: [
        {
          position: 'bottom',
          type: 'category',
          title: { text: 'Employee' }
        },
        {
          position: 'left',
          type: 'number',
          title: { text: 'Tasks' }
        }
      ]
    };
  }

  private getLineChartOptions(): AgChartOptions {
    return {
      title: { text: 'Employee Tasks Trend' },
      data: this.rowData,
      series: [
        {
          type: 'line',
          xKey: 'employee',
          yKey: 'tasksCompleted',
          yName: 'Task Completed',
          marker: { enabled: true}
        },
        {
          type: 'line',
          xKey: 'employee',
          yKey: 'tasksPending',
          yName: 'Tasks Pending',
          marker: { enabled: true}
        }
      ],
      axes: [
        {
          position: 'bottom',
          type: 'category',
          title: { text: 'Employee'}
        },
        {
          position: 'left',
          type: 'number',
          title: {text: 'Tasks'}
        }
      ]
    }
  }

  private getAreaChartOptions(): AgChartOptions {
    return {
      title: { text: 'Employee Tasks Overview' },
      data: this.rowData,
      series: [
        {
          type: 'area',
          xKey: 'employee',
          yKey: 'tasksComleted',
          yName: 'Tasks Completed',
          marker: { enabled: false },
        },
        {
          type: 'area',
          xKey: 'employee',
          yKey: 'tasksPending',
          yName: 'Tasks Pending',
          marker: { enabled: false }
        }
      ],
      axes: [
        {
          position: 'bottom',
          type: 'category',
          title: { text: 'Employee' }
        },
        {
          position: 'left',
          type: 'number',
          title: { text: 'Tasks' }
        }
      ]
    };
  }


  private getPieChartOptions(): AgChartOptions {
    return {
      title: { text: 'Tasks Completed by Employee' },
      data: this.rowData,
      series: [
        {
          type: 'pie',
          angleKey: 'tasksCompleted',
          calloutLabelKey: 'employee',
          sectorLabelKey: 'tasksCompleted',
          sectorLabel: {
            formatter: ({value}) => `${value} tasks` 
          }
        }
      ]
  };
  }

  private getDonutChartOptions(): AgChartOptions {
    return {
      title: { text: 'Tasks Pending by Employee' },
      data: this.rowData,
      series: [
        {
          type: 'donut',
          angleKey: 'tasksPending',
          calloutLabelKey: 'employee',
          sectorLabelKey: 'tasksPending',
          sectorLabel: {
            formatter: ({value}) => `${value} tasks`
          },
          innerRadiusOffset: -40
        }
      ]
    }
  }

 
  }



