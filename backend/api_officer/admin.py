from django.contrib import admin
from .models import Officer, MobileNumber, Punishments, Vacations, Promotions

admin.site.register(Officer)
admin.site.register(MobileNumber)
admin.site.register(Punishments)
admin.site.register(Vacations)
admin.site.register(Promotions)