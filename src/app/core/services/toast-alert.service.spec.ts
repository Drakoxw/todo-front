
import { TestBed, inject } from '@angular/core/testing';
import { ToastAlertService } from './toast-alert.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Service: ToastAlert', () => {
 let service: ToastAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastAlertService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ToastAlertService);
  });

  it('servicio montado', () => {
    expect(service).toBeTruthy();
  });

  it('✅ debería tener un valor inicial correcto', () => {
    const alert = service.onAlert();
    expect(alert.type).toBe('success');
    expect(alert.summary).toBe('Alerta');
    expect(alert.msg).toBe('');
  });

  it('✅ debería actualizar la alerta con setAlert()', () => {
    service.setAlert({ type: 'error', msg: 'Ocurrió un error', summary: 'Oops' });
    const alert = service.onAlert();

    expect(alert.type).toBe('error');
    expect(alert.msg).toBe('Ocurrió un error');
    expect(alert.summary).toBe('Oops');
  });

  it('✅ debería usar errorAlert() correctamente', () => {
    service.errorAlert('Algo falló');
    const alert = service.onAlert();

    expect(alert.type).toBe('error');
    expect(alert.summary).toBe('Error');
    expect(alert.msg).toBe('Algo falló');
  });

  it('✅ debería usar successAlert() correctamente', () => {
    service.successAlert('Todo salió bien');
    const alert = service.onAlert();

    expect(alert.type).toBe('success');
    expect(alert.summary).toBe('Ok');
    expect(alert.msg).toBe('Todo salió bien');
  });

  it('setAlert() debería mantener valores previos no modificados', () => {
    service.successAlert('Todo bien', 'Perfecto'); // se manda alerta inicial
    service.setAlert({ msg: 'Nuevo mensaje', type: 'error' });
    const alert = service.onAlert();

    expect(alert.type).toBe('error');
    expect(alert.msg).toBe('Nuevo mensaje');
    expect(alert.summary).toBe('Perfecto'); // conserva tipo anterior
  });
});
