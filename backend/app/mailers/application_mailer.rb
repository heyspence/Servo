class ApplicationMailer < ActionMailer::Base
  default from: email_address_with_name('contact@bookservo.com', 'Servo Notifications')
  layout 'mailer'
end

