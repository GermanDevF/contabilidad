# Cooming soon

# Componentes Reutilizables

Este documento detalla los componentes reutilizables desarrollados para la aplicación. Todos los componentes están diseñados con **React**, **TypeScript** y **TailwindCSS**, siguiendo principios de modularidad y reutilización.

---

## 1. Componentes para Formularios

### 1.1 **Input**

- **Descripción:** Campo de texto básico para capturar datos.
- **Props:**
  - `value`: Valor actual del input.
  - `onChange`: Función para manejar cambios.
  - `allowClear`: Habilita la limpieza del campo.

---

### 1.2 **Select / Dropdown**

- **Descripción:** Componente para seleccionar valores de una lista.
- **Props:**
  - `options`: Lista de opciones disponibles.
  - `value`: Valor seleccionado.
  - `onChange`: Función para manejar cambios.
  - `multiple`: Habilita la selección múltiple.

---

### 1.3 **Checkbox**

- **Descripción:** Componente para opciones booleanas.
- **Props:**
  - `checked`: Estado actual del checkbox.
  - `onChange`: Función para manejar cambios.
  - `label`: Texto asociado al checkbox.

---

### 1.4 **Radio Button**

- **Descripción:** Para seleccionar una opción de un grupo.
- **Props:**
  - `value`: Valor asociado al botón.
  - `onChange`: Función para manejar cambios.
  - `options`: Lista de opciones disponibles.

---

### 1.5 **TextArea**

- **Descripción:** Campo para texto multilinea.
- **Props:**
  - `rows`: Número de líneas visibles.
  - `maxLength`: Longitud máxima del texto.
  - `onChange`: Función para manejar cambios.

---

### 1.6 **Switch / Toggle**

- **Descripción:** Componente para estados activado/desactivado.
- **Props:**
  - `checked`: Estado actual del toggle.
  - `onChange`: Función para manejar cambios.

---

### 1.7 **DatePicker / TimePicker**

- **Descripción:** Componente para selección de fechas u horas.
- **Props:**
  - `value`: Fecha/hora seleccionada.
  - `onChange`: Función para manejar cambios.
  - `format`: Formato de la fecha/hora.

---

## 2. Componentes de UI General

### 2.1 **Button**

- **Descripción:** Botón reutilizable para acciones.
- **Props:**
  - `type`: Tipo del botón (primario, secundario).
  - `onClick`: Función al hacer clic.
  - `disabled`: Desactiva el botón.

---

### 2.2 **Modal / Dialog**

- **Descripción:** Para mostrar contenido en una superposición.
- **Props:**
  - `visible`: Controla si el modal está visible.
  - `onClose`: Función para cerrar el modal.
  - `title`: Título del modal.
  - `footer`: Contenido del pie.

---

### 2.3 **Alert / Notification**

- **Descripción:** Mensajes de error, éxito o información.
- **Props:**
  - `type`: Tipo de alerta (info, success, error).
  - `message`: Contenido del mensaje.

---

### 2.4 **Loader / Spinner**

- **Descripción:** Indicador de carga.
- **Props:**
  - `size`: Tamaño del loader.
  - `color`: Color del loader.

---

### 2.5 **Card**

- **Descripción:** Contenedor estructurado para mostrar contenido.
- **Props:**
  - `title`: Título de la tarjeta.
  - `description`: Descripción.
  - `actions`: Acciones asociadas.

---

## 3. Componentes de Layout

### 3.1 **Grid**

- **Descripción:** Sistema de cuadrículas para estructurar contenido.
- **Props:**
  - `columns`: Número de columnas.
  - `gap`: Espaciado entre elementos.

---

### 3.2 **Sidebar**

- **Descripción:** Contenedor lateral para navegación u opciones.
- **Props:**
  - `items`: Lista de elementos del sidebar.
  - `selectedItem`: Elemento actualmente seleccionado.

---

### 3.3 **Navbar**

- **Descripción:** Barra de navegación superior.
- **Props:**
  - `links`: Lista de enlaces.
  - `onLogout`: Función para cerrar sesión.

---

## 4. Componentes Avanzados

### 4.1 **Table**

- **Descripción:** Componente tabular para datos.
- **Props:**
  - `columns`: Configuración de columnas.
  - `data`: Datos a mostrar.
  - `pagination`: Configuración de paginación.

---

### 4.2 **File Upload**

- **Descripción:** Componente para carga de archivos.
- **Props:**
  - `onUpload`: Función al cargar archivos.
  - `accept`: Tipos de archivos permitidos.
  - `multiple`: Permite múltiples archivos.

---

### 4.3 **Stepper**

- **Descripción:** Proceso en pasos consecutivos.
- **Props:**
  - `steps`: Lista de pasos.
  - `currentStep`: Paso actual.

---

### 4.4 **Tabs**

- **Descripción:** Navegación en pestañas.
- **Props:**
  - `tabs`: Lista de pestañas.
  - `activeTab`: Pestaña activa.

---

### 4.5 **Pagination**

- **Descripción:** Control de paginación.
- **Props:**
  - `currentPage`: Página actual.
  - `totalPages`: Total de páginas.
  - `onChange`: Función para cambiar de página.

---

## 5. Componentes de Estado y Validación

### 5.1 **Tooltip**

- **Descripción:** Información adicional al pasar el cursor sobre un elemento.
- **Props:**
  - `content`: Contenido del tooltip.
  - `position`: Posición del tooltip.

---

### 5.2 **Badge**

- **Descripción:** Indicador visual de estado o conteo.
- **Props:**
  - `count`: Conteo a mostrar.
  - `color`: Color del badge.
  - `maxCount`: Conteo máximo.

---

### 5.3 **Progress Bar**

- **Descripción:** Indicador visual de progreso.
- **Props:**
  - `percentage`: Porcentaje completado.
  - `color`: Color del progreso.

---

## 6. Componentes para Formularios Complejos

### 6.1 **Dynamic Form**

- **Descripción:** Formularios dinámicos con campos agregables o eliminables.
- **Props:**
  - `fields`: Configuración de campos.
  - `onAddField`: Función para agregar campos.
  - `onRemoveField`: Función para eliminar campos.

---

### 6.2 **Autocomplete**

- **Descripción:** Sugerencias dinámicas mientras se escribe.
- **Props:**
  - `suggestions`: Lista de sugerencias.
  - `onSearch`: Función para buscar sugerencias.

---

### 6.3 **Masked Input**

- **Descripción:** Input con formato predefinido.
- **Props:**
  - `mask`: Patrón del input.
  - `onChange`: Función para manejar cambios.

---
