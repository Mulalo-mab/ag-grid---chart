import { Component, OnInit } from '@angular/core';
import { EmployeeComponentService, EmployeeData, ChartType } from './employee-component-service';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgChartOptions } from 'ag-charts-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-employee-component',
  standalone: false,
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent implements OnInit {
  rowData: EmployeeData[] = [];
  currentChartType: ChartType = 'bar';
  chartOptions: AgChartOptions = {};

  colDefs: ColDef[] = [
    { field: 'employee', headerName: 'Employee' },
    { field: 'department', headerName: 'Department' },
    { field: 'tasksCompleted', headerName: 'Tasks Completed' },
    { field: 'tasksPending', headerName: 'Tasks Pending' }
  ];

  // Statistics properties
  totalCompleted: number = 0;
  totalPending: number = 0;
  employeesByDepartment: { [key: string]: EmployeeData[] } = {};

  constructor(private employeeService: EmployeeComponentService) { }

  ngOnInit() {
    this.loadEmployeeData();
  }

  private loadEmployeeData() {
    this.employeeService.getEmployeeData().subscribe({
      next: (data) => {
        this.rowData = data;
        this.updateChart(this.currentChartType);
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error loading data:', error);
        // No fallback data - just log the error
      }
    });
  }

  private calculateStatistics() {
    this.totalCompleted = this.employeeService.getTotalTasksCompleted(this.rowData);
    this.totalPending = this.employeeService.getTotalTasksPending(this.rowData);
    this.employeesByDepartment = this.employeeService.getEmployeesByDepartment(this.rowData);
  }

  switchChart(type: ChartType) {
    this.currentChartType = type;
    this.updateChart(type);
  }

  isActiveChart(type: ChartType): boolean {
    return this.currentChartType === type;
  }

  private updateChart(type: ChartType) {
    this.chartOptions = this.employeeService.getChartOptions(type, this.rowData);
  }

  // Utility methods for template
  getDepartmentNames(): string[] {
    return Object.keys(this.employeesByDepartment);
  }

  getEmployeeCountByDepartment(department: string): number {
    return this.employeesByDepartment[department]?.length || 0;
  }
}
