from django.contrib import admin
from .models import Soldier, MobileNumber, Punishments, Vacations, Promotions

admin.site.register(Soldier)
admin.site.register(MobileNumber)
admin.site.register(Punishments)
admin.site.register(Vacations)
admin.site.register(Promotions)
