from rest_framework import generics
from .models import Soldier, MobileNumber, Punishments, Vacations, Promotions
from .serializers import SoldierSerializer, MobileNumberSerializer, PunishmentsSerializer, PromotionsSerializer, VacationsSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

#soldier views
class SoldierListCreateView(generics.ListCreateAPIView) :
    queryset = Soldier.objects.all()
    serializer_class = SoldierSerializer
    
class SoldierRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView) :
    queryset = Soldier.objects.all()
    serializer_class = SoldierSerializer

#soldier's mobile numbers views
class UserMobileNumberListView(APIView) :
    def get(self, request, user_id) :
        mobile_numbers = MobileNumber.objects.filter(soldier_id=user_id)
        serializer = MobileNumberSerializer(mobile_numbers, many=True)
        return Response(serializer.data)
    def post(self, request, user_id) :
        serializer = MobileNumberSerializer(data=request.data)
        if serializer.is_valid() :
            serializer.save(soldier_id=user_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserMobileNumberDetailView(APIView) :
    def get(self, request, user_id, mobile_id) :
        mobile_number = get_object_or_404(MobileNumber, id=mobile_id, soldier_id=user_id)
        serializer = MobileNumberSerializer(mobile_number)
        return Response(serializer.data)
    def put(self, request, user_id, mobile_id) :
        mobile_number = get_object_or_404(MobileNumber, id=mobile_id, soldier_id=user_id)
        serializer = MobileNumberSerializer(mobile_number, data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, user_id, mobile_id) :
        mobile_number = get_object_or_404(MobileNumber, id=mobile_id, soldier_id=user_id)
        mobile_number.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#soldier's punishments views
class UserPunishmentsListView(APIView) :
    def get(self, request, user_id) :
        punishments = Punishments.objects.filter(soldier_id=user_id)
        serializer = PunishmentsSerializer(punishments, many=True)
        return Response(serializer.data)
    
    def post(self, request, user_id) :
        serializer = PunishmentsSerializer(data=request.data)
        if serializer.is_valid() :
            serializer.save(soldier_id=user_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPunishmentsDetailView(APIView) :
    def get(self, request, user_id, punishment_id) :
        punishment = get_object_or_404(Punishments, id=punishment_id, soldier_id=user_id)
        serializer = PunishmentsSerializer(punishment)
        return Response(serializer.data)
    def put(self, request, user_id, punishment_id) :
        punishment = get_object_or_404(Punishments, id=punishment_id, soldier_id=user_id)
        serializer = PunishmentsSerializer(punishment, data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, user_id, punishment_id) :
        punishment = get_object_or_404(Punishments, id=punishment_id, soldier_id=user_id)
        punishment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#soldier's vacations views
class UserVacationsListView(APIView) :
    def get(self, request, user_id) :
        vacations = Vacations.objects.filter(soldier_id=user_id)
        serializer = VacationsSerializer(vacations, many=True)
        return Response(serializer.data)
    
    def post(self, request, user_id) :
        serializer = VacationsSerializer(data=request.data)
        if serializer.is_valid() :
            serializer.save(soldier_id=user_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserVacationsDetailView(APIView) :
    def get(self, request, user_id, vacation_id) :
        vacation = get_object_or_404(Vacations, id=vacation_id, soldier_id=user_id)
        serializer = VacationsSerializer(vacation)
        return Response(serializer.data)
    def put(self, request, user_id, vacation_id) :
        vacation = get_object_or_404(Vacations, id=vacation_id, soldier_id=user_id)
        serializer = VacationsSerializer(vacation, data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, user_id, vacation_id) :
        vacation = get_object_or_404(Vacations, id=vacation_id, soldier_id=user_id)
        vacation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)   

#soldier's promotions views
class UserPromotionsListView(APIView) :
    def get(self, request, user_id) :
        promotions = Promotions.objects.filter(soldier_id=user_id)
        serializer = PromotionsSerializer(promotions, many=True)
        return Response(serializer.data)
    
    def post(self, request, user_id) :
        serializer = PromotionsSerializer(data=request.data)
        if serializer.is_valid() :
            serializer.save(soldier_id=user_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPromotionsDetailView(APIView) :
    def get(self, request, user_id, promotion_id) :
        promotion = get_object_or_404(Promotions, id=promotion_id, soldier_id=user_id)
        serializer = PromotionsSerializer(promotion)
        return Response(serializer.data)
    def put(self, request, user_id, promotion_id) :
        promotion = get_object_or_404(Promotions, id=promotion_id, soldier_id=user_id)
        serializer = PromotionsSerializer(promotion, data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, user_id, promotion_id) :
        promotion = get_object_or_404(Promotions, id=promotion_id, soldier_id=user_id)
        promotion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  