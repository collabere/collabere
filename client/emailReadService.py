import datetime
import smtplib
import time
import imaplib
import email
# from client.service import getClientIdByClientEmailId



def read_email_from_gmail():
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
                    collabereMessagesFilterFlag=email_subject.split()[len(email_subject.split())-1]=="Collabere"
                    if collabereMessagesFilterFlag:
                       influencerUsername = email_subject.split()[3]
                       clientEmailId=email_from.split()[len(email_from.split())-1].replace('>', '').replace('<', '')
                       projectInitiationDate=email_subject.split()[len(email_subject.split())-3]
                       if msg.is_multipart():
                         message=msg.get_payload()[0].get_payload().split('\r\n\r\n', 1)[0]
                return influencerUsername,clientEmailId,message,projectInitiationDate


    except Exception as e:
        print(str(e))


