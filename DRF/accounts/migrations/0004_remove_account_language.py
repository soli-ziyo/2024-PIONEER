# Generated by Django 5.0.3 on 2024-07-23 15:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_account_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='language',
        ),
    ]
