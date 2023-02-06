from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer
from .models import Task


# Create your views here.

def renderReactFront(request):
    context = {}
    return render(request, "index.html")

@api_view(['GET'])
def allTasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def task(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def createTask(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def updateTask(request, pk):
    task = Task.objects.get(id = pk)
    task.isCompleted = not task.isCompleted
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


