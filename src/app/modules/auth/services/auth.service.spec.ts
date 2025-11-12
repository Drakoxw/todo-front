
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthApiService } from './auth-api.service';
import { AuthResponse, LoginPayload } from '@auth-module/interfaces';
import { of } from 'rxjs';
import { ResponseBase } from '@interfaces/index';

describe('Service: Auth', () => {
  let service: AuthService;
  let apiServiceSpy: jasmine.SpyObj<AuthApiService>;

  const mockPayload: LoginPayload = {
    email: 'demo@example.com',
    password: 'Demo1234'
  };

  const mockSuccessResponse = {
    error: false,
    msg: 'Loin correcto',

    data: {
      token: 'fake-jwt',
      id: 1,
      email: "demo@example.com",
      fullName: "Test User",
    }
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthApiService', ['login']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthApiService, useValue: spy }
      ],
      imports: []
    });
    service = TestBed.inject(AuthService);
    apiServiceSpy = TestBed.inject(AuthApiService) as jasmine.SpyObj<AuthApiService>;
  });

  it('servicio montado', () => {
    expect(service).toBeTruthy();
  });

  it('✅ debería llamar a AuthApiService.login() con el payload y retornar su respuesta', (done) => {

    apiServiceSpy.login.and.returnValue(of(mockSuccessResponse));

    service.login(mockPayload).subscribe((res) => {
      expect(apiServiceSpy.login).toHaveBeenCalledWith(mockPayload);
      expect(res).toEqual(mockSuccessResponse);
      done();
    });
  });
});
