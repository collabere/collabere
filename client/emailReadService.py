import datetime
import smtplib
import time
import imaplib
import email
import email.utils
from email.utils import parsedate_to_datetime
# from client.service import getClientIdByClientEmailId



def read_email_from_gmail(projectInitiationDate):
    try:
        mail = imaplib.IMAP4_SSL('imap.gmail.com')
        mail.login('collabere.outbox1@gmail.com', 'Collabere@2019')
        mail.select('inbox')

        type, data = mail.search(None, 'ALL')
        mail_ids = data[0]

        id_list = mail_ids.split()
        first_email_id = int(id_list[0])
        latest_email_id = int(id_list[-1])

        for i in range(latest_email_id, first_email_id, -1):
            typ, data = mail.fetch(str(i), '(RFC822)')

            for response_part in data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_string(response_part[1].decode("utf-8"))
                    email_subject = msg['subject']
                    email_from = msg['from']
                    email_arrival_date=msg['Date']
                    collabereMessagesFilterFlag=email_subject.split()[len(email_subject.split())-1]=="Collabere"
                    if collabereMessagesFilterFlag:
                       influencerUsername = email_subject.split()[3]
                       clientEmailId=email_from.split()[len(email_from.split())-1].replace('>', '').replace('<', '')
                       projectInitiationDateFromEmail=email_subject.split()[len(email_subject.split())-3]
                       if msg.is_multipart():
                         message=msg.get_payload()[0].get_payload().split('\r\n\r\n', 1)[0]

                       if projectInitiationDateFromEmail==projectInitiationDate:
                             return influencerUsername,clientEmailId,message,parsedate_to_datetime(email_arrival_date)


    except Exception as e:
        print(str(e))






