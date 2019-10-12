# Generated by Django 2.1.7 on 2019-10-12 06:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('influencer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='InfluencerPublicProfileDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('referralLink', models.CharField(max_length=50)),
                ('videoLink', models.CharField(max_length=50)),
                ('influencer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='influencer.Influencer')),
            ],
        ),
    ]