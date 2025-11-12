export const PATH = {
  HOME: 'home',
  ABOUT: 'about',
  TO_DO: 'to-do',
  AUTH: 'auth',
  LOGOUT: 'logout'
}

export const ROUTES = [
  {
    label: 'Inicio',
    path: `/${PATH.HOME}`,
    private: true
  },
  {
    label: 'Tareas',
    path: `/${PATH.TO_DO}`,
    private: true
  },
  {
    label: 'Acerca de',
    path: `/${PATH.ABOUT}`,
    private: true
  },
  {
    label: 'Iniciar Sesión',
    path: `/${PATH.AUTH}`,
    private: false
  },
  {
    label: 'Cerrar Sesión',
    path: `/${PATH.LOGOUT}`,
    private: true
  }
];

export const PRIVATES_ROUTES = ROUTES.filter((route) => route.private).map((route) => route.path)
export const PUBLIC_ROUTES = ROUTES.filter((route) => !route.private).map((route) => route.path)
