class ApplicationMailer < ActionMailer::Base
  default from: email_address_with_name('spencer@bookservo.com', 'Servo Team')
  layout 'mailer'
end

