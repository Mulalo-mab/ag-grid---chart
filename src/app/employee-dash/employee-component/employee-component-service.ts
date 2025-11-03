import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeData {
  employee: string;
  department: string;
  tasksCompleted: number;
  tasksPending: number;
}

export type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'donut';

@Injectable({
  providedIn: 'root',
})
export class EmployeeComponentService {

  constructor(private http: HttpClient) { }

  // Method to fetch employee data
  getEmployeeData(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>('assets/data.json');
  }

  // Method to get chart options based on type
  getChartOptions(type: ChartType, data: EmployeeData[]): any {
    switch (type) {
      case 'bar':
        return this.getBarChartOptions(data);
      case 'line':
        return this.getLineChartOptions(data);
      case 'area':
        return this.getAreaChartOptions(data);
      case 'pie':
        return this.getPieChartOptions(data);
      case 'donut':
        return this.getDonutChartOptions(data);
      default:
        return this.getBarChartOptions(data);
    }
  }

  private getBarChartOptions(data: EmployeeData[]): any {
    return {
      title: { text: 'Employee Tasks Performance' },
      data: data,
      series: [
        {
          type: 'bar',
          xKey: 'employee',
          yKey: 'tasksCompleted',
          yName: 'Tasks Completed',
          label: { enabled: true, color: 'black', fontWeight: 'bold', placement: 'outside-end', }
        },
        {
          type: 'bar',
          xKey: 'employee',
          yKey: 'tasksPending',
          yName: 'Tasks Pending',
          label: { enabled: true, color: 'black', fontWeight: 'bold', placement: 'outside-end', }
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

  private getLineChartOptions(data: EmployeeData[]): any {
    return {
      title: { text: 'Employee Tasks Trend' },
      data: data,
      series: [
        {
          type: 'line',
          xKey: 'employee',
          yKey: 'tasksCompleted',
          yName: 'Task Completed',
          marker: { enabled: true }
        },
        {
          type: 'line',
          xKey: 'employee',
          yKey: 'tasksPending',
          yName: 'Tasks Pending',
          marker: { enabled: true }
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

  private getAreaChartOptions(data: EmployeeData[]): any {
    return {
      title: { text: 'Employee Tasks Overview' },
      data: data,
      series: [
        {
          type: 'area',
          xKey: 'employee',
          yKey: 'tasksCompleted',
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

  private getPieChartOptions(data: EmployeeData[]): any {
    return {
      title: { text: 'Tasks Completed by Employee' },
      data: data,
      series: [
        {
          type: 'pie',
          angleKey: 'tasksCompleted',
          calloutLabelKey: 'employee',
          sectorLabelKey: 'tasksCompleted',
          sectorLabel: {
            formatter: ({ value }: { value: number }) => `${value} tasks`
          }
        }
      ]
    };
  }

  private getDonutChartOptions(data: EmployeeData[]): any {
    return {
      title: { text: 'Tasks Pending by Employee' },
      data: data,
      series: [
        {
          type: 'donut',
          angleKey: 'tasksPending',
          calloutLabelKey: 'employee',
          sectorLabelKey: 'tasksPending',
          sectorLabel: {
            formatter: ({ value }: { value: number }) => `${value} tasks`
          },
          innerRadiusOffset: -40
        }
      ]
    };
  }

  // Additional service methods
  getTotalTasksCompleted(data: EmployeeData[]): number {
    return data.reduce((total, employee) => total + employee.tasksCompleted, 0);
  }

  getTotalTasksPending(data: EmployeeData[]): number {
    return data.reduce((total, employee) => total + employee.tasksPending, 0);
  }

  getEmployeesByDepartment(data: EmployeeData[]): { [key: string]: EmployeeData[] } {
    return data.reduce((acc, employee) => {
      if (!acc[employee.department]) {
        acc[employee.department] = [];
      }
      acc[employee.department].push(employee);
      return acc;
    }, {} as { [key: string]: EmployeeData[] });
  }
}
