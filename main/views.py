from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Project, Contact, Certificate

# Create your views here.
def home(request):
    featured = Project.objects.all()[:3]
    return render(request, 'index.html', {'projects': featured})
def about(request):
    return render(request, 'about.html')
def skills(request):
    return render(request, 'skills.html', {'certificates': Certificate.objects.all()})
def projects(request):
    return render(request, 'projects.html', {'projects': Project.objects.all()})
def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        message = request.POST.get('message', '').strip()
        if name and email and message:
            Contact.objects.create(name=name, email=email, message=message)
            messages.success(request,'Thank you! Your message has been received.')
            return redirect('contact')
        messages.error(request, 'Sabhi fields bharna zaroori hai.')
    return render(request, 'contact.html')