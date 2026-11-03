from django.db import models


# Create your models here.
class Project(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
    ]
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='frontend')
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True)
    tech_used = models.CharField(max_length=200, help_text="Comma se alag karo: HTML, CSS, Django")
    live_link = models.URLField(blank=True, help_text="Image par click karne par ye link khulega")
    github_link = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0, help_text="Chhota number pehle dikhega")

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title

    @property
    def main_link(self):
        return self.live_link or self.github_link

    def tech_list(self):
        return [t.strip() for t in self.tech_used.split(',') if t.strip()]


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

class Certificate(models.Model):
    title = models.CharField(max_length=150)
    issuer = models.CharField(max_length=100)
    date = models.CharField(max_length=30, help_text="Jaise: Aug 2026")
    image = models.ImageField(upload_to='certificates/')
    description = models.TextField(blank=True, help_text="1-2 line: isse kya seekha")
    verify_link = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0, help_text="Chhota number pehle dikhega")

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title    