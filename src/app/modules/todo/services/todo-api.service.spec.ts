
import { TestBed, inject } from '@angular/core/testing';
import { TodoApiService } from './todo-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Service: TodoApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
  });

  it('should ...', inject([TodoApiService], (service: TodoApiService) => {
    expect(service).toBeTruthy();
  }));
});
