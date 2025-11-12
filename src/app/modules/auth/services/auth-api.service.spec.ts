import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthApiService } from './auth-api.service';
import { ResponseBase } from '@interfaces/index';
import { AuthResponse, LoginPayload } from '@auth-module/interfaces';
import { provideZonelessChangeDetection } from '@angular/core';
import { URL_API_BASE } from '@constants/index';
import { provideHttpClient } from '@angular/common/http';


describe('Service: AuthApi', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  const mockPayload: LoginPayload = {
    email: 'demo@example.com',
    password: 'Demo1234'
  };

  const mockSuccessResponse: ResponseBase<AuthResponse> = {
    success: true,
    message: 'Login correcto',
    data: {
      token: 'fake-jwt',
      id: 1,
      email: "demo@example.com",
      fullName: "Test User",
    }
  };

  const mockErrorResponse: ResponseBase<AuthResponse> = {
    success: false,
    message: 'Credenciales inválidas',
    data: undefined as any
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthApiService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('servicio montado', inject([AuthApiService], (service: AuthApiService) => {
    expect(service).toBeTruthy();
  }));

  it('✅ debería hacer login exitoso y retornar data', (done) => {
    service.login(mockPayload).subscribe((res) => {
      expect(res.error).toBeFalse();
      expect(res.msg).toBe('Login correcto');
      expect(res.data?.token).toBe('fake-jwt');
      done();
    });

    const req = httpMock.expectOne(`${URL_API_BASE}/api/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSuccessResponse);
  });

  it('✅ debería manejar login fallido (success=false)', (done) => {
    service.login(mockPayload).subscribe((res) => {
      expect(res.error).toBeTrue();
      expect(res.msg).toBe('Credenciales inválidas');
      expect(res.data).toBeUndefined();
      done();
    });

    const req = httpMock.expectOne(`${URL_API_BASE}/api/auth/login`);
    req.flush(mockErrorResponse);
  });

  it('✅ debería manejar errores HTTP (ej. 500)', (done) => {
    service.login(mockPayload).subscribe((res) => {
      expect(res.error).toBeTrue();
      expect(res.msg).toBeDefined();
      done();
    });

    const req = httpMock.expectOne(`${URL_API_BASE}/api/auth/login`);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
