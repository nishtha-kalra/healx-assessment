# Generated by Django 3.2.5 on 2021-07-27 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=1000)),
                ('date', models.CharField(blank=True, max_length=100)),
                ('link', models.CharField(blank=True, max_length=100)),
                ('journal', models.CharField(blank=True, max_length=100)),
            ],
        ),
    ]
