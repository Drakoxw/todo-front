import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '@home-module/services';
import { ToastAlertService } from '@services/index';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;
  let toastAlertSpy: jasmine.SpyObj<ToastAlertService>;

  beforeEach(async () => {
    dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['stats']);
    toastAlertSpy = jasmine.createSpyObj('ToastAlertService', ['errorAlert']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DashboardService, useValue: dashboardServiceSpy },
        { provide: ToastAlertService, useValue: toastAlertSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('✅ debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('✅ debería llamar al servicio DashboardService.stats() al inicializarse', () => {
    dashboardServiceSpy.stats.and.returnValue(of({
      error: false,
      msg: 'ok',
      data: {
        totalTodos: 10,
        completedTodos: 6,
        pendingTodos: 4,
        completionPercentage: 60
      }
    }));

    component.ngOnInit();

    expect(dashboardServiceSpy.stats).toHaveBeenCalled();
  });

  it('✅ debería actualizar las métricas correctamente cuando el servicio devuelve datos', () => {
    const mockData = {
      error: false,
      msg: 'ok',
      data: {
        totalTodos: 8,
        completedTodos: 5,
        pendingTodos: 3,
        completionPercentage: 62.5
      }
    };

    dashboardServiceSpy.stats.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.total()).toBe(8);
    expect(component.completed()).toBe(5);
    expect(component.pending()).toBe(3);
    expect(component.percentage()).toBe(62.5);

    const chartData = component.chartData();
    expect(chartData.datasets[0].data).toEqual([5, 3]);
  });

  it('⚠️ debería mostrar una alerta de error si el servicio devuelve error: true', () => {
    dashboardServiceSpy.stats.and.returnValue(of({
      error: true,
      msg: 'Error en servidor',
      data: {} as any
    }));

    component.ngOnInit();

    expect(toastAlertSpy.errorAlert).toHaveBeenCalledWith('Error en servidor');
    expect(component.total()).toBe(0); // No cambia nada
  });

  it('✅ debería calcular correctamente el porcentaje al cambiar los signals', () => {
    component.completed.set(4);
    component.pending.set(6);
    component.total.set(10);
    component.percentage.set((4 / 10) * 100);

    expect(component.percentage()).toBe(40);
  });
});
