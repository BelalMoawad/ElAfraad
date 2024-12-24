from django.urls import path
from .views import (OfficerListCreateView, 
                    OfficerRetrieveUpdateDestroyView, 
                    UserMobileNumberListView,
                    UserMobileNumberDetailView,
                    UserPunishmentsListView,
                    UserPunishmentsDetailView,
                    UserVacationsListView,
                    UserVacationsDetailView,
                    UserPromotionsListView,
                    UserPromotionsDetailView
)

urlpatterns = [
    path('', OfficerListCreateView.as_view()),
    path('<int:pk>/', OfficerRetrieveUpdateDestroyView.as_view()),
    path('<int:user_id>/mobile_numbers/', UserMobileNumberListView.as_view(), name='user-mobile-number-list'),
    path('<int:user_id>/mobile_numbers/<int:mobile_id>/', UserMobileNumberDetailView.as_view(), name='user-mobile-number-detail'),
    path('<int:user_id>/punishments/', UserPunishmentsListView.as_view(), name='user-punishment-list'),
    path('<int:user_id>/punishments/<int:punishment_id>/', UserPunishmentsDetailView.as_view(), name='user-punishment-detail'),
    path('<int:user_id>/vacations/', UserVacationsListView.as_view(), name='user-vacation-list'),
    path('<int:user_id>/vacations/<int:vacation_id>/', UserVacationsDetailView.as_view(), name='user-vacation-detail'),
    path('<int:user_id>/promotions/', UserPromotionsListView.as_view(), name='user-promotion-list'),
    path('<int:user_id>/promotions/<int:promotion_id>/', UserPromotionsDetailView.as_view(), name='user-promotion-detail')
]


