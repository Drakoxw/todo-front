import { ComponentFixture, TestBed } from '@angular/core/testing';
import TodoIndexComponent from './todo-index.component';
import { ConfirmationService } from 'primeng/api';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { ToastAlertService } from '@services/toast-alert.service';
import { TodoService } from '@todo-module/services';
import { MOCK_TODO } from '@mocks/index';
import { FilterStatus, TodoDataResponse } from '@todo-module/interfaces';

describe('TodoIndexComponent', () => {
  let component: TodoIndexComponent;
  let fixture: ComponentFixture<TodoIndexComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;
  let toastSpy: jasmine.SpyObj<ToastAlertService>;
  let confirmSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getAll', 'create', 'update', 'delete']);
    toastSpy = jasmine.createSpyObj('ToastAlertService', ['successAlert', 'errorAlert']);
    confirmSpy = jasmine.createSpyObj('ConfirmationService', ['confirm', 'close'], {
      requireConfirmation$: of(null) // evita el error de undefined.subscribe
    });

    await TestBed.configureTestingModule({
      imports: [TodoIndexComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: ToastAlertService, useValue: toastSpy },
        { provide: ConfirmationService, useValue: confirmSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoIndexComponent);
    component = fixture.componentInstance;
  });

  it('should ...', () => {
    expect(component).toBeTruthy();
  });

  it('✅ debería cargar las tareas al inicializarse (ngOnInit)', () => {
    const mockTasks: TodoDataResponse[] = [{ ...MOCK_TODO, id: 1, title: 'Test Task' }];
    todoServiceSpy.getAll.and.returnValue(of({ data: mockTasks, error: false, msg: 'ok' }));

    component.ngOnInit();

    expect(todoServiceSpy.getAll).toHaveBeenCalledWith('all');
    expect(component.todoData()).toEqual(mockTasks);
    expect(component.loading()).toBeFalse();
  });

  it('✅ openNew() debería abrir el diálogo con una nueva tarea vacía', () => {
    component.openNew();

    expect(component.showDialog()).toBeTrue();
    expect(component.editingTask().id).toBe(MOCK_TODO.id);
  });

  it('✅ editTask() debería abrir el diálogo con los datos de la tarea', () => {
    const task = { ...MOCK_TODO, id: 99, title: 'Editar Tarea' };
    component.editTask(task);

    expect(component.editingTask()).toEqual(task);
    expect(component.showDialog()).toBeTrue();
  });

  it('✅ saveTask() debería crear una nueva tarea si no tiene id', () => {
    const response = { error: false, msg: 'Creado correctamente' };
    todoServiceSpy.create.and.returnValue(of(response));
    spyOn(component as any, 'getAllTodo');

    component.editingTask.set({ ...MOCK_TODO, id: 0, title: 'Nueva tarea' });
    component.saveTask();

    expect(todoServiceSpy.create).toHaveBeenCalledWith('Nueva tarea');
    expect(toastSpy.successAlert).toHaveBeenCalledWith('Creado correctamente', 'Ok');
    expect((component as any).getAllTodo).toHaveBeenCalled();
  });

  it('✅ saveTask() debería actualizar una tarea si tiene id', () => {
    const response = { error: false, msg: 'Actualizado correctamente' };
    todoServiceSpy.update.and.returnValue(of(response));
    spyOn(component as any, 'getAllTodo');

    component.editingTask.set({ ...MOCK_TODO, id: 123, title: 'Actualizar tarea' });
    component.saveTask();

    expect(todoServiceSpy.update).toHaveBeenCalledWith(123, jasmine.any(Object));
    expect(toastSpy.successAlert).toHaveBeenCalledWith('Actualizado correctamente', 'Ok');
    expect((component as any).getAllTodo).toHaveBeenCalled();
  });

  it('⚠️ saveTask() debería mostrar error si la API devuelve error', () => {
    const response = { error: true, msg: 'Error al guardar' };
    todoServiceSpy.create.and.returnValue(of(response));

    component.editingTask.set({ ...MOCK_TODO, title: 'Nueva tarea' });
    component.saveTask();

    expect(toastSpy.errorAlert).toHaveBeenCalledWith('Error al guardar');
  });

  it('✅ toggleComplete() debería actualizar una tarea y recargar la lista', () => {
    const mockTask = { ...MOCK_TODO, id: 1, completed: true };
    todoServiceSpy.update.and.returnValue(of({ error: false, msg: 'Actualizado' }));
    spyOn(component as any, 'getAllTodo');

    component.toggleComplete(mockTask);

    expect(todoServiceSpy.update).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(toastSpy.successAlert).toHaveBeenCalledWith('Tarea actualizada', 'Ok');
    expect((component as any).getAllTodo).toHaveBeenCalled();
  });

  it('✅ onFilterChange() debería actualizar el filtro y recargar datos', () => {
    spyOn(component as any, 'getAllTodo');
    component.onFilterChange('completed');

    expect(component.filter()).toBe('completed');
    expect((component as any).getAllTodo).toHaveBeenCalled();
  });

  it('⚠️ onFilterChange() no debería recargar si el filtro no cambia', () => {
    spyOn(component as any, 'getAllTodo');
    component.filter.set('all');
    component.onFilterChange('all');

    expect((component as any).getAllTodo).not.toHaveBeenCalled();
  });
});
