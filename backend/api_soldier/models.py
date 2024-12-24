from django.db import models


class Soldier(models.Model):
    military_rank = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    militray_number = models.CharField(max_length=25, unique=True)
    national_number = models.CharField(max_length=25, unique=True)
    address = models.CharField(max_length=100)
    weapon_name = models.CharField(max_length=50)
    workshop_speciality = models.CharField(max_length=100)
    marital_status = models.CharField(max_length=20)
    entering_army_date = models.DateField()
    exit_from_army_date = models.DateField()
    religion = models.CharField(max_length=20)
    blood_type = models.CharField(max_length=20)

    def __str__(self) :
        return self.name
    
class MobileNumber(models.Model) :
    soldier = models.ForeignKey(Soldier, on_delete=models.CASCADE, related_name='mobile_numbers')
    mobile_number = models.CharField(max_length=11)

    def __str__(self) :
        return self.mobile_number
    
class Punishments(models.Model) :
    soldier = models.ForeignKey(Soldier, on_delete=models.CASCADE, related_name='punishments')
    punishment = models.CharField(max_length=100)
    reason_for_punishment = models.CharField(max_length=100)    

    def __str__(self) :
        return self.punishment
    
class Vacations(models.Model) :
    soldier = models.ForeignKey(Soldier, on_delete=models.CASCADE, related_name='vacations')
    vacation_from = models.DateField()
    vacation_to = models.DateField()

    def __str__(self) :
        return self.vacation_from + " to " + self.vacation_to
    
class Promotions(models.Model) :
    soldier = models.ForeignKey(Soldier, on_delete=models.CASCADE, related_name='promotions')
    promotion_date = models.DateField()
    promotion_from = models.CharField(max_length=20)
    promotion_to = models.CharField(max_length=20)

    def __str__(self) :
        return self.promotion_from + " to " + self.promotion_to


