# test/mailers/previews/user_mailer_preview.rb
class UserMailerPreview < ActionMailer::Preview
    def welcome_email
      # Setup necessary data for the email
      user = User.first
      # Call the mailer method you want to preview
      UserMailer.welcome_email(user)
    end
end