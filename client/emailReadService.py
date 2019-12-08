
import imaplib
import email
import email.utils
from email.utils import parsedate_to_datetime
from conversations.utils import uploadToAwsBucket
import os
from inclyfy import settings


def read_email_from_gmail(projectInitiationDate):
    global message
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
                    email_arrival_date = msg['Date']
                    emailExistFlag = False
                    collabereMessagesFilterFlag = email_subject.split()[len(email_subject.split()) - 1] == "Collabere"
                    if collabereMessagesFilterFlag:
                        influencerUsername = email_subject.split()[3]
                        clientEmailId = email_from.split()[len(email_from.split()) - 1].replace('>', '').replace('<',
                                                                                                                 '')
                        projectInitiationDateFromEmail = email_subject.split()[len(email_subject.split()) - 3]
                        if msg.is_multipart():
                            for part in msg.walk():
                                ctype = part.get_content_type()
                                if ctype in {'image/jpeg', 'image/png', 'application/pdf',
                                             'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}:
                                    try:
                                        attachment = msg.get_payload()[1]
                                        open(part.get_filename(), 'wb').write(attachment.get_payload(decode=True))
                                        fileObject=open(part.get_filename(), 'r')
                                        if projectInitiationDateFromEmail == projectInitiationDate:
                                            uploadToAwsBucket(fileObject)
                                            os.remove(part.get_filename())
                                            fileUrlMessage=settings.FILE_URL_PREFIX+part.get_filename()
                                            return influencerUsername, clientEmailId, fileUrlMessage, parsedate_to_datetime(
                                                email_arrival_date)
                                    except Exception as e:
                                        print("Error occurred while uploading file to the bucket..")
                            message = msg.get_payload()[0].get_payload().split('\r\n\r\n', 1)[0]
                        if projectInitiationDateFromEmail == projectInitiationDate:
                            return influencerUsername, clientEmailId, message, parsedate_to_datetime(email_arrival_date)

            return emailExistFlag

    except Exception as e:
        print(str(e))





