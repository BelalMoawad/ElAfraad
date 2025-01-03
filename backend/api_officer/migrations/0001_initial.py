# Generated by Django 5.0.4 on 2024-07-17 13:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Officer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('military_rank', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=100)),
                ('seniority_number', models.CharField(max_length=25, unique=True)),
                ('militray_number', models.CharField(max_length=25, unique=True)),
                ('national_number', models.CharField(max_length=25, unique=True)),
                ('address', models.CharField(max_length=100)),
                ('weapon_name', models.CharField(max_length=50)),
                ('workshop_speciality', models.CharField(max_length=100)),
                ('marital_status', models.CharField(max_length=20)),
                ('entering_army_date', models.DateField()),
                ('exit_from_army_date', models.DateField()),
                ('religion', models.CharField(max_length=20)),
                ('blood_type', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='MobileNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile_number', models.CharField(max_length=11)),
                ('officer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mobile_numbers', to='api_officer.officer')),
            ],
        ),
        migrations.CreateModel(
            name='Promotions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('promotion_date', models.DateField()),
                ('promotion_from', models.CharField(max_length=20)),
                ('promotion_to', models.CharField(max_length=20)),
                ('officer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='promotions', to='api_officer.officer')),
            ],
        ),
        migrations.CreateModel(
            name='Punishments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('punishment', models.CharField(max_length=100)),
                ('reason_for_punishment', models.CharField(max_length=100)),
                ('officer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='punishments', to='api_officer.officer')),
            ],
        ),
        migrations.CreateModel(
            name='Vacations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vacation_from', models.DateField()),
                ('vacation_to', models.DateField()),
                ('officer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vacations', to='api_officer.officer')),
            ],
        ),
    ]
