from django.urls import path
from . import views

urlpatterns = [
    path('', views.renderReactFront, name="render-todo-list"),
    path('all-tasks', views.allTasks, name='all-tasks'),
    path('task/<str:pk>/', views.task, name="task"),
    path('create-task', views.createTask, name="create-task"),
    path('update-task/<str:pk>/', views.updateTask, name="update-task"),
]