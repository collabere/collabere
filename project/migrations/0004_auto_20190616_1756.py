# Generated by Django 2.2 on 2019-06-16 17:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20190616_0616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='projectInitiationDate',
            field=models.DateTimeField(default=django.utils.timezone.now, primary_key=True, serialize=False),
        ),
    ]