# Generated by Django 2.1.7 on 2019-05-22 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conversations', '0003_auto_20190217_1759'),
    ]

    operations = [
        migrations.RenameField(
            model_name='messages',
            old_name='reciverId',
            new_name='clientId',
        ),
        migrations.RemoveField(
            model_name='messages',
            name='responderId',
        ),
        migrations.AddField(
            model_name='messages',
            name='influencerUsername',
            field=models.CharField(default='', max_length=50),
        ),
    ]