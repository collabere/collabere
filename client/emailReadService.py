import smtplib
import time
import imaplib
import email


def read_email_from_gmail():
    try:
        mail = imaplib.IMAP4_SSL('imap.gmail.com')
        mail.login('gsanskar@student.nitw.ac.in', 'torquerf1')
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
                    if msg.is_multipart():
                        for payload in msg.get_payload():
                            # if payload.is_multipart(): ...
                            print(payload.get_payload())
                    else:
                        print(msg.get_payload())
                    print('From : ' + email_from + '\n')
                    print('Subject : ' + email_subject + '\n')

    except Exception as e:
        print(str(e))


read_email_from_gmail()
