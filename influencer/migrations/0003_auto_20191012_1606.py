# Generated by Django 2.2 on 2019-10-12 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('influencer', '0002_influencerpublicprofiledetails'),
    ]

    operations = [
        migrations.AlterField(
            model_name='influencerpublicprofiledetails',
            name='referralLink',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='influencerpublicprofiledetails',
            name='videoLink',
            field=models.CharField(max_length=500),
        ),
    ]
