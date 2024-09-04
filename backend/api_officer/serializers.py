from rest_framework import serializers
from .models import Officer, MobileNumber, Punishments, Vacations, Promotions


class MobileNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileNumber
        fields = ('id', 'mobile_number')

class PunishmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Punishments
        fields = ('id', 'punishment', 'reason_for_punishment')

class VacationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacations
        fields = ('id', 'vacation_from', 'vacation_to')

class PromotionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotions
        fields = ('id', 'promotion_date', 'promotion_from', 'promotion_to')        

            
class OfficerSerializer(serializers.ModelSerializer):
    mobile_numbers = MobileNumberSerializer(many=True, read_only=True)
    punishments = PunishmentsSerializer(many=True, read_only=True)
    vacations = VacationsSerializer(many=True, read_only=True)
    promotions = PromotionsSerializer(many=True, read_only=True)
    class Meta:
        
        model = Officer
        fields = ('id', 'military_rank', 'name', 'seniority_number', 'militray_number', 'national_number', 'address',
                  'mobile_numbers', 'weapon_name', 'workshop_speciality', 'marital_status', 
                  'entering_army_date', 'exit_from_army_date', 'punishments', 'vacations', 'promotions',
                  'religion', 'blood_type'
        )